import { HUMANIZER_SYSTEM_RULES } from '@/lib/humanizer';
import { getKnowledgeContext } from '@/lib/chat-fallback';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type LlmProvider = 'nvidia' | 'openai' | 'groq';

type TextPart = {
  type: 'text';
  text: string;
};

function nvidiaKey(): string | undefined {
  const key = process.env.NVIDIA_API_KEY?.trim();
  if (!key || key === '$NVIDIA_API_KEY') return undefined;
  return key;
}

export function buildLlmMessages(history: ChatMessage[]) {
  const systemText = `${HUMANIZER_SYSTEM_RULES}\n\n--- KNOWLEDGE BASE ---\n${getKnowledgeContext()}`;

  return [
    {
      role: 'system' as const,
      content: [{ type: 'text' as const, text: systemText }] satisfies TextPart[],
    },
    ...history.slice(-12).map((message) => ({
      role: message.role,
      content: [{ type: 'text' as const, text: message.content }] satisfies TextPart[],
    })),
  ];
}

function extractDeltaText(payload: unknown): string {
  const json = payload as {
    choices?: Array<{
      delta?: { content?: unknown };
      message?: { content?: unknown };
    }>;
  };
  const delta = json.choices?.[0]?.delta?.content ?? json.choices?.[0]?.message?.content;
  if (typeof delta === 'string') return delta;
  if (Array.isArray(delta)) {
    return delta
      .map((part) => {
        if (typeof part === 'string') return part;
        if (part && typeof part === 'object' && 'text' in part) {
          return String((part as { text?: string }).text ?? '');
        }
        return '';
      })
      .join('');
  }
  return '';
}

async function* readSse(response: Response): AsyncGenerator<string> {
  const reader = response.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === '[DONE]') {
        if (payload === '[DONE]') return;
        continue;
      }
      try {
        const text = extractDeltaText(JSON.parse(payload));
        if (text) yield text;
      } catch {
        // ignore a partial frame
      }
    }
  }
}

async function* streamNvidia(
  history: ChatMessage[],
): AsyncGenerator<{ token?: string; provider?: LlmProvider; error?: string }> {
  const key = nvidiaKey();
  if (!key) {
    yield { error: 'missing-nvidia-key' };
    return;
  }

  const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      Accept: 'text/event-stream',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: buildLlmMessages(history),
      model: process.env.NVIDIA_MODEL ?? 'moonshotai/kimi-k3',
      max_tokens: Number(process.env.NVIDIA_MAX_TOKENS ?? 4096),
      seed: 0,
      stream: true,
      temperature: 1,
      reasoning_effort: process.env.NVIDIA_REASONING_EFFORT ?? 'max',
    }),
  });

  if (!response.ok) {
    yield { error: `nvidia-${response.status}` };
    return;
  }

  yield { provider: 'nvidia' };
  let gotToken = false;
  for await (const token of readSse(response)) {
    gotToken = true;
    yield { token };
  }
  if (!gotToken) {
    yield { error: 'nvidia-empty' };
  }
}

export async function* streamLlm(
  history: ChatMessage[],
): AsyncGenerator<{ token?: string; provider?: LlmProvider; error?: string }> {
  try {
    let nvidiaFailed = false;
    for await (const event of streamNvidia(history)) {
      if (event.error) {
        nvidiaFailed = true;
        break;
      }
      yield event;
      if (event.token) nvidiaFailed = false;
    }
    if (!nvidiaFailed) return;
  } catch {
    // fall through
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey) {
    try {
      const response = await fetch(
        process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${openaiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `${HUMANIZER_SYSTEM_RULES}\n\n--- KNOWLEDGE BASE ---\n${getKnowledgeContext()}`,
              },
              ...history.slice(-12),
            ],
            max_tokens: 700,
            temperature: 0.6,
            stream: true,
          }),
        },
      );
      if (response.ok) {
        yield { provider: 'openai' };
        let gotToken = false;
        for await (const token of readSse(response)) {
          gotToken = true;
          yield { token };
        }
        if (gotToken) return;
      }
    } catch {
      // fall through
    }
  }

  yield { error: 'all-providers-failed' };
}
