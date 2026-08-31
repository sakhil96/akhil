'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CHAT_SUGGESTIONS } from '@/lib/knowledge';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type InferenceConsoleProps = {
  variant?: 'embedded' | 'dock';
  className?: string;
};

function createId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function commandOutput(command: string): string[] | null {
  const map = new Map(site.terminal.commands.map((item) => [item.command, item.output]));
  const normalized = command === 'aiadapt' ? 'smartwealth' : command;
  return map.get(normalized) ?? null;
}

export function InferenceConsole({ variant = 'embedded', className }: InferenceConsoleProps) {
  const [open, setOpen] = useState(variant === 'embedded');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'local' | 'llm' | 'command'>('local');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: createId(),
      role: 'assistant',
      content:
        'Console live. Type a question, or run a command: help · wins · stack · contact · cursor · smartwealth',
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chips = useMemo(
    () => ['help', 'wins', 'stack', ...CHAT_SUGGESTIONS.slice(0, 2)],
    [],
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const runQuery = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { id: createId(), role: 'user', content: trimmed };
    setMessages((current) => [...current, userMessage]);
    setInput('');

    const cmd = commandOutput(trimmed.toLowerCase());
    if (cmd) {
      setMode('command');
      setMessages((current) => [
        ...current,
        { id: createId(), role: 'assistant', content: cmd.join('\n') },
      ]);
      return;
    }

    setLoading(true);
    try {
      const history = [...messages, userMessage].map(({ role, content }) => ({ role, content }));
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = (await response.json()) as { reply?: string; mode?: 'local' | 'llm' };
      if (data.mode) setMode(data.mode);
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: 'assistant',
          content: data.reply ?? 'Signal dropped. Try wins, stack, or a specific project.',
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { id: createId(), role: 'assistant', content: 'Uplink failed. Retry in a moment.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const panel = (
    <div
      className={cn('terminal font-mono console-shell', className)}
      onClick={() => inputRef.current?.focus()}
      role="region"
      aria-label="Inference console"
    >
      <div className="terminal-header">
        <span className="terminal-dot" style={{ background: 'var(--success)' }} />
        <span className="terminal-dot" style={{ background: 'var(--warning)' }} />
        <span className="terminal-dot" style={{ background: 'var(--accent)' }} />
        <span>akhil://inference-console</span>
        {variant === 'dock' && (
          <button type="button" className="console-close" onClick={() => setOpen(false)}>
            close
          </button>
        )}
      </div>

      <div className="terminal-body">
        <div className="console-messages">
          {messages.map((message) => (
            <div key={message.id} className={message.role === 'user' ? 'console-user' : 'console-bot'}>
              {message.role === 'user' ? (
                <>
                  <span className="text-accent">{site.terminal.prompt}</span> $ {message.content}
                </>
              ) : (
                <span style={{ whiteSpace: 'pre-wrap' }}>{message.content}</span>
              )}
            </div>
          ))}
          {loading && <div className="console-bot">querying kernel…</div>}
          <div ref={endRef} />
        </div>

        {messages.length <= 2 && (
          <div className="chat-suggestions" style={{ marginTop: '0.5rem' }}>
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                className="console-chip"
                onClick={() => runQuery(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        <form
          className="terminal-form"
          onSubmit={(event) => {
            event.preventDefault();
            runQuery(input);
          }}
        >
          <span className="text-accent">{site.terminal.prompt}</span>
          <span>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="terminal-input"
            placeholder="Ask anything, or type help"
            autoComplete="off"
            disabled={loading}
          />
        </form>

        <div className="console-status">
          <span>
            uplink: {mode === 'llm' ? 'llm' : mode === 'command' ? 'command' : 'local kernel'}
          </span>
          <span>latency: live</span>
          <span>kb: portfolio</span>
        </div>
      </div>
    </div>
  );

  if (variant === 'embedded') {
    return panel;
  }

  return (
    <>
      {open && <div className="dock-panel">{panel}</div>}
      <button
        type="button"
        className="chat-fab"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close console' : 'Open console'}
      >
        {open ? '×' : 'CMD'}
      </button>
    </>
  );
}
