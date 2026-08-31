'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useConsole } from '@/components/ConsoleProvider';
import { CONSOLE_COMMANDS } from '@/lib/knowledge';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

type InferenceConsoleProps = {
  variant?: 'embedded' | 'dock';
  className?: string;
};

function renderContent(content: string): ReactNode {
  const parts = content.split(/(https?:\/\/[^\s]+|\/case-studies\/[a-z0-9-]+)/gi);
  return parts.map((part, index) => {
    if (part.startsWith('/case-studies/')) {
      return (
        <Link key={`${part}-${index}`} href={part} className="text-accent">
          {part}
        </Link>
      );
    }
    if (part.startsWith('http')) {
      return (
        <a key={`${part}-${index}`} href={part} className="text-accent" target="_blank" rel="noreferrer">
          {part}
        </a>
      );
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export function InferenceConsole({ variant = 'embedded', className }: InferenceConsoleProps) {
  const { messages, loading, mode, latencyMs, suggestions, history, send, clear } = useConsole();
  const [open, setOpen] = useState(variant === 'embedded');
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const query = input.trim().toLowerCase();
    if (!query) return CONSOLE_COMMANDS.slice(0, 6);
    return CONSOLE_COMMANDS.filter(
      (item) => item.command.startsWith(query) || item.hint.includes(query),
    ).slice(0, 6);
  }, [input]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (variant === 'embedded') {
      inputRef.current?.focus();
    }
  }, [variant, open]);

  const submit = (text: string) => {
    setInput('');
    setHistoryIndex(-1);
    setAutocompleteOpen(false);
    void send(text);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (history[next]) {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = historyIndex - 1;
      if (next < 0) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    }
    if (event.key === 'Tab' && matches[0]) {
      event.preventDefault();
      setInput(matches[0].command);
      setAutocompleteOpen(false);
    }
    if (event.key === 'Escape') {
      setAutocompleteOpen(false);
      if (variant === 'dock') setOpen(false);
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      clear();
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
        <span className="console-mode">{mode === 'idle' ? 'ready' : mode}</span>
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
                <span style={{ whiteSpace: 'pre-wrap' }}>
                  {message.content ? renderContent(message.content) : loading ? (
                    <span className="console-caret">querying uplink</span>
                  ) : null}
                  {loading && message.content && message.id === messages[messages.length - 1]?.id ? (
                    <span className="console-caret">▍</span>
                  ) : null}
                </span>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="chat-suggestions">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="console-chip"
              onClick={() => submit(suggestion)}
              disabled={loading}
            >
              {suggestion}
            </button>
          ))}
        </div>

        <form
          className="terminal-form console-input-wrap"
          onSubmit={(event) => {
            event.preventDefault();
            if (input.trim()) submit(input);
          }}
        >
          <span className="text-accent">{site.terminal.prompt}</span>
          <span>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setAutocompleteOpen(true);
            }}
            onFocus={() => setAutocompleteOpen(true)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            placeholder="Ask anything about Akhil — or type help"
            autoComplete="off"
            disabled={loading}
          />
          <button type="submit" className="console-send" disabled={loading || !input.trim()}>
            run
          </button>
          {autocompleteOpen && input && matches.length > 0 && (
            <div className="console-autocomplete">
              {matches.map((item) => (
                <button
                  key={item.command}
                  type="button"
                  className="console-autocomplete-item"
                  onClick={() => submit(item.command)}
                >
                  <span>{item.command}</span>
                  <span className="text-muted">{item.hint}</span>
                </button>
              ))}
            </div>
          )}
        </form>

        <div className="console-status">
          <span>uplink: {mode}</span>
          <span>{latencyMs != null ? `${latencyMs}ms` : 'live'}</span>
          <span>tab · ↑ history · ctrl+l clear</span>
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
