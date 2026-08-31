import { generateFallbackReply, getKnowledgeContext } from '@/lib/chat-fallback';
import { HUMANIZER_SYSTEM_RULES, sanitizeResponse } from '@/lib/humanizer';

export const runtime = 'edge';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatRequest = {
  messages: ChatMessage[];
};

async function callOpenAI(messages: ChatMessage[]): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
  const knowledge = getKnowledgeContext();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      max_tokens: 400,
      messages: [
        {
          role: 'system',
          content: `${HUMANIZER_SYSTEM_RULES}\n\n--- KNOWLEDGE BASE ---\n${knowledge}`,
        },
        ...messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return data.choices?.[0]?.message?.content ?? null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;
    const messages = body.messages?.filter((message) => message.content?.trim()) ?? [];

    if (messages.length === 0) {
      return Response.json({ error: 'Message required' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') {
      return Response.json({ error: 'Last message must be from user' }, { status: 400 });
    }

    const llmReply = await callOpenAI(messages.slice(-8));
    const reply = sanitizeResponse(
      llmReply ?? generateFallbackReply(lastMessage.content, messages.slice(0, -1)),
    );

    return Response.json({
      reply,
      mode: llmReply ? 'llm' : 'local',
    });
  } catch {
    return Response.json({ error: 'Chat failed' }, { status: 500 });
  }
}
