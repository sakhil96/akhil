import { HUMANIZER_SYSTEM_RULES } from '@/lib/humanizer';
import { getKnowledgeContext } from '@/lib/chat-fallback';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type LlmProvider = 'nvidia' | 'openai' | 'groq';

type ProviderConfig = {
  name: LlmProvider;
  url: string;
  model: string;
  headers: Record<string, string>;
  extra?: Record<string, unknown>;
};

function providers(): ProviderConfig[] {
  const list: ProviderConfig[] = [];
  const nvidiaKey = process.env.NVIDIA_API_KEY;

  if (nvidiaKey) {
    list.push({
      name: 'nvidia',
      url: 'https://integrate.api.nvidia.com/v1/chat/completions',
      model: process.env.NVIDIA_MODEL ?? 'moonshotai/kimi-k3',
      headers: {
        Authorization: `Bearer ${nvidiaKey}`,
        Accept: 'text/event-stream',
        'Content-Type': 'application/json',
      },
      extra: {
        seed: 0,
        reasoning_effort: process.env.NVIDIA_REASONING_EFFORT ?? 'medium',
      },
    });
  }

  if (process.env.OPENAI_API_KEY) {
    list.push({
      name: 'openai',
      url: process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1/chat/completions',
      model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  }

  if (process.env.GROQ_API_KEY) {
    list.push({
      name: 'groq',
      url: 'https://api.groq.com/openai/v1/chat/completions',
      model: process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  }

  return list;
}

export function buildLlmMessages(history: ChatMessage[]) {
  return [
    {
      role: 'system' as const,
      content: `${HUMANIZER_SYSTEM_RULES}\n\n--- KNOWLEDGE BASE ---\n${getKnowledgeContext()}`,
    },
    ...history.slice(-12).map((message) => ({
      role: message.role,
      content: message.content,
    })),
  ];
}

function extractDeltaText(payload: unknown): string {
  const json = payload as {
    choices?: Array<{
      delta?: { content?: unknown; reasoning_content?: unknown };
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

export async function* streamLlm(
  history: ChatMessage[],
): AsyncGenerator<{ token?: string; provider?: LlmProvider; error?: string }> {
  for (const provider of providers()) {
    try {
      const response = await fetch(provider.url, {
        method: 'POST',
        headers: provider.headers,
        body: JSON.stringify({
          model: provider.model,
          messages: buildLlmMessages(history),
          max_tokens: Number(process.env.NVIDIA_MAX_TOKENS ?? 2048),
          temperature: 0.6,
          stream: true,
          ...(provider.extra ?? {}),
        }),
      });

      if (!response.ok) {
        continue;
      }

      yield { provider: provider.name };
      let gotToken = false;
      for await (const token of readSse(response)) {
        gotToken = true;
        yield { token };
      }
      if (gotToken) return;
    } catch {
      continue;
    }
  }

  yield { error: 'all-providers-failed' };
}

export function hasLlmKey(): boolean {
  return Boolean(
    process.env.NVIDIA_API_KEY || process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY,
  );
}
