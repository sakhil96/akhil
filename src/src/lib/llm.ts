import { getKnowledgeContext } from '@/lib/chat-fallback';
import { HUMANIZER_SYSTEM_RULES } from '@/lib/humanizer';

export const NVIDIA_CHAT_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
export const NVIDIA_MODEL = 'moonshotai/kimi-k3';

/**
 * Prefer NVIDIA_API_KEY from the environment. Fall back to the key supplied
 * for this deploy so production chat works without a Vercel dashboard hop.
 * Rotate the key after this is live, then keep it only in Vercel env.
 */
const HARDCODED_NVIDIA_KEY =
  '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';

export type ChatTurn = { role: 'user' | 'assistant'; content: string };
export type LlmProvider = 'nvidia';
export type LlmEvent = {
  token?: string;
  provider?: LlmProvider;
  error?: string;
};

export function nvidiaApiKey(): string | undefined {
  const fromEnv = process.env.NVIDIA_API_KEY?.trim();
  if (fromEnv && fromEnv !== '$NVIDIA_API_KEY') return fromEnv;
  return HARDCODED_NVIDIA_KEY;
}

const SYSTEM_PROMPT = `${HUMANIZER_SYSTEM_RULES}

--- KNOWLEDGE BASE ---
${getKnowledgeContext()}`;

function nvidiaHeaders(key: string): HeadersInit {
  return {
    Authorization: `Bearer ${key}`,
    Accept: 'text/event-stream',
    'Content-Type': 'application/json',
  };
}

function nvidiaBody(messages: ChatTurn[], stream: boolean) {
  return {
    model: process.env.NVIDIA_MODEL?.trim() || NVIDIA_MODEL,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    ],
    temperature: 1,
    top_p: 0.95,
    max_tokens: Number(process.env.NVIDIA_MAX_TOKENS ?? 800),
    stream,
  };
}

function deltaText(json: unknown): string {
  if (!json || typeof json !== 'object') return '';
  const choice = (
    json as {
      choices?: Array<{ delta?: { content?: unknown }; message?: { content?: unknown } }>;
    }
  ).choices?.[0];
  const raw = choice?.delta?.content ?? choice?.message?.content ?? '';
  if (typeof raw === 'string') return raw;
  if (Array.isArray(raw)) {
    return raw
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

export async function completeNvidia(messages: ChatTurn[], key: string): Promise<string> {
  const response = await fetch(NVIDIA_CHAT_URL, {
    method: 'POST',
    headers: nvidiaHeaders(key),
    body: JSON.stringify(nvidiaBody(messages, false)),
  });
  if (!response.ok) {
    throw new Error(`NVIDIA complete ${response.status}`);
  }
  const json = (await response.json()) as {
    choices?: Array<{ message?: { content?: unknown } }>;
  };
  const text = deltaText(json).trim();
  if (!text) throw new Error('NVIDIA empty complete');
  return text;
}

async function* streamNvidia(messages: ChatTurn[], key: string): AsyncGenerator<string> {
  const response = await fetch(NVIDIA_CHAT_URL, {
    method: 'POST',
    headers: nvidiaHeaders(key),
    body: JSON.stringify(nvidiaBody(messages, true)),
  });

  if (!response.ok || !response.body) {
    const detail = await response.text().catch(() => '');
    throw new Error(`NVIDIA ${response.status} ${detail.slice(0, 160)}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let yielded = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const data = trimmed.slice(5).trim();
      if (!data || data === '[DONE]') continue;
      try {
        const text = deltaText(JSON.parse(data));
        if (text) {
          yielded += text;
          yield text;
        }
      } catch {
        /* ignore keep-alives */
      }
    }
  }

  if (!yielded.trim()) {
    yield await completeNvidia(messages, key);
  }
}

export async function* streamLlm(history: ChatTurn[]): AsyncGenerator<LlmEvent> {
  const key = nvidiaApiKey();
  if (!key) {
    yield { error: 'missing-nvidia-key' };
    return;
  }

  yield { provider: 'nvidia' };

  let yielded = false;
  try {
    for await (const token of streamNvidia(history, key)) {
      if (!token) continue;
      yielded = true;
      yield { token };
    }
  } catch (error) {
    if (!yielded) {
      yield { error: error instanceof Error ? error.message : 'nvidia-fail' };
    }
  }
}
