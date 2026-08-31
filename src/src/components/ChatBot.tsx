'use client';

import { useEffect, useRef, useState } from 'react';
import { CHAT_SUGGESTIONS } from '@/lib/knowledge';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type ChatBotProps = {
  variant?: 'floating' | 'embedded';
  className?: string;
};

function createId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function ChatBot({ variant = 'floating', className }: ChatBotProps) {
  const [open, setOpen] = useState(variant === 'embedded');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: createId(),
      role: 'assistant',
      content:
        "Hey — I'm Akhil's assistant. Ask about his work at PayPal, hackathon wins, projects, or how to reach him.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { id: createId(), role: 'user', content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };
      const reply =
        data.reply ??
        "Sorry, I couldn't pull that up right now. Try asking about experience, hackathons, or contact info.";

      setMessages((current) => [
        ...current,
        { id: createId(), role: 'assistant', content: reply },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: 'assistant',
          content: 'Connection issue — try again in a moment.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const panel = (
    <div className={cn('chat-panel', variant === 'embedded' && 'chat-panel--embedded', className)}>
      <div className="chat-header">
        <div>
          <p className="chat-title">Ask about Akhil</p>
          <p className="chat-subtitle">Experience · wins · stack · contact</p>
        </div>
        {variant === 'floating' && (
          <button
            type="button"
            className="chat-close"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            ×
          </button>
        )}
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn('chat-bubble', message.role === 'user' ? 'chat-bubble--user' : 'chat-bubble--bot')}
          >
            {message.content}
          </div>
        ))}
        {loading && <div className="chat-bubble chat-bubble--bot chat-typing">Thinking…</div>}
        <div ref={endRef} />
      </div>

      {messages.length <= 1 && (
        <div className="chat-suggestions">
          {CHAT_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="chat-suggestion"
              onClick={() => sendMessage(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form
        className="chat-form"
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          className="chat-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask anything about Akhil…"
          disabled={loading}
        />
        <button type="submit" className="btn btn--primary chat-send" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );

  if (variant === 'embedded') {
    return panel;
  }

  return (
    <>
      {open && panel}
      <button
        type="button"
        className="chat-fab"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? '×' : 'Chat'}
      </button>
    </>
  );
}
