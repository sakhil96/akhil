import { generateFallbackReply } from '@/lib/chat-fallback';
import { sanitizeResponse } from '@/lib/humanizer';
import { streamLlm } from '@/lib/llm';

export const runtime = 'nodejs';
export const maxDuration = 60;

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

        let provider = 'local';
        let assembled = '';

        try {
          for await (const event of streamLlm(messages.slice(-12))) {
            if (event.provider) {
              provider = event.provider;
              send({ mode: 'llm', provider });
            }
            if (event.token) {
              assembled += event.token;
              send({ delta: event.token });
            }
            if (event.error) {
              throw new Error(event.error);
            }
          }

          if (!assembled.trim()) {
            throw new Error('empty-llm');
          }

          send({ done: true, mode: 'llm', provider });
        } catch {
          const fallback = sanitizeResponse(
            generateFallbackReply(lastMessage.content, messages.slice(0, -1)),
          );
          send({ mode: 'local', provider: 'local' });
          for (const part of tokenizeForStream(fallback)) {
            send({ delta: part });
          }
          send({ done: true, mode: 'local', provider: 'local' });
        }

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
