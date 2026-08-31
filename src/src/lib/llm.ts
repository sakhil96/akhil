import { HUMANIZER_SYSTEM_RULES } from '@/lib/humanizer';
import { getKnowledgeContext } from '@/lib/chat-fallback';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type LlmProvider = 'openai' | 'groq' | 'pollinations';

type ProviderConfig = {
  name: LlmProvider;
  url: string;
  model: string;
  headers: Record<string, string>;
};

function providers(): ProviderConfig[] {
  const list: ProviderConfig[] = [];

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

  if (process.env.POLLINATIONS_API_KEY) {
    list.push({
      name: 'pollinations',
      url: 'https://text.pollinations.ai/openai',
      model: process.env.LLM_MODEL ?? 'openai',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.POLLINATIONS_API_KEY}`,
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

async function completeOnce(provider: ProviderConfig, history: ChatMessage[]): Promise<string | null> {
  const response = await fetch(provider.url, {
    method: 'POST',
    headers: provider.headers,
    body: JSON.stringify({
      model: provider.model,
      temperature: 0.55,
      max_tokens: 700,
      stream: false,
      messages: buildLlmMessages(history),
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content?.trim();
  return content || null;
}

export async function completeLlm(history: ChatMessage[]): Promise<{
  text: string;
  provider: LlmProvider;
} | null> {
  for (const provider of providers()) {
    try {
      const text = await completeOnce(provider, history);
      if (text) {
        return { text, provider: provider.name };
      }
    } catch {
      continue;
    }
  }
  return null;
}
