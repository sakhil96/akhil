import { generateFallbackReply } from '@/lib/chat-fallback';
import { sanitizeResponse } from '@/lib/humanizer';
import { completeLlm } from '@/lib/llm';

export const runtime = 'edge';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatRequest = {
  messages: ChatMessage[];
};

function sse(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function tokenizeForStream(text: string): string[] {
  return text.split(/(\s+)/).filter(Boolean);
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

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const send = (payload: unknown) => {
          controller.enqueue(encoder.encode(sse(payload)));
        };

        const llm = await completeLlm(messages.slice(-12));
        const text = sanitizeResponse(
          llm?.text ?? generateFallbackReply(lastMessage.content, messages.slice(0, -1)),
        );
        const mode = llm ? 'llm' : 'local';
        send({ mode, provider: llm?.provider ?? 'local' });

        for (const part of tokenizeForStream(text)) {
          send({ delta: part });
        }

        send({ done: true, mode, provider: llm?.provider ?? 'local' });
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch {
    return Response.json({ error: 'Chat failed' }, { status: 500 });
  }
}
