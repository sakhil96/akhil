'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useConsole } from '@/components/ConsoleProvider';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

const JUMPS = [
  { id: 'work', label: 'Work & experience', href: '/#work' },
  { id: 'projects', label: 'Selected work', href: '/#projects' },
  { id: 'contact', label: 'Write to Akhil', href: '/#contact' },
  { id: 'smartwealth', label: 'SmartWealth', href: '/case-studies/smartwealth' },
  { id: 'cursor', label: 'Cursor hackathon', href: '/case-studies/cursor-hackathon' },
];

function renderContent(content: string): ReactNode {
  const parts = content.split(/(https?:\/\/[^\s]+|\/case-studies\/[a-z0-9-]+)/gi);
  return parts.map((part, index) => {
    if (part.startsWith('/case-studies/')) {
      return (
        <Link key={`${part}-${index}`} href={part} className="text-sand underline-offset-4 hover:underline">
          {part}
        </Link>
      );
    }
    if (part.startsWith('http')) {
      return (
        <a
          key={`${part}-${index}`}
          href={part}
          className="text-sand underline-offset-4 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          {part}
        </a>
      );
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export function CommandPalette() {
  const router = useRouter();
  const { messages, loading, suggestions, send, clear, history } = useConsole();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('command-palette-open', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('command-palette-open', onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = previous;
      window.clearTimeout(id);
    };
  }, [open]);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, loading, open]);

  const jumpMatches = JUMPS.filter((item) => {
    if (!query.trim()) return true;
    return `${item.label} ${item.id}`.toLowerCase().includes(query.toLowerCase());
  });

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setQuery('');
    setHistoryIndex(-1);
    void send(trimmed);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' && !query) {
      event.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (history[next]) {
        setHistoryIndex(next);
        setQuery(history[next]);
      }
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = historyIndex - 1;
      if (next < 0) {
        setHistoryIndex(-1);
        setQuery('');
      } else {
        setHistoryIndex(next);
        setQuery(history[next]);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-obsidian/70 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Ask about Akhil"
        className="glass flex w-full max-w-xl flex-col overflow-hidden rounded-3xl shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3 text-xs text-mute">
          <span>Ask about {site.profile.name}</span>
          <button type="button" className="hover:text-ink" onClick={() => setOpen(false)}>
            Esc
          </button>
        </div>

        <div className="max-h-[42vh] min-h-[8rem] space-y-4 overflow-y-auto px-5 py-4">
          {messages.map((message) => (
            <div key={message.id} className={cn(message.role === 'user' ? 'text-sand' : 'text-[15px] leading-relaxed text-ink/90')}>
              {message.role === 'user' ? (
                <p className="text-sm">{message.content}</p>
              ) : (
                <p className="whitespace-pre-wrap">
                  {message.content ? renderContent(message.content) : loading ? (
                    <span className="text-mute">Looking it up…</span>
                  ) : null}
                </p>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form
          className="border-t border-line px-5 py-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (query.trim()) submit(query);
          }}
        >
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-mute"
            placeholder="PayPal, Project Seal, stack, fit for a role…"
            autoComplete="off"
            disabled={loading}
          />
        </form>

        <div className="flex flex-wrap gap-2 border-t border-line px-5 py-3">
          {suggestions.slice(0, 4).map((item) => (
            <button
              key={item}
              type="button"
              disabled={loading}
              onClick={() => submit(item)}
              className="rounded-full border border-line px-3 py-1 text-[11px] text-mute transition-colors hover:border-sand/40 hover:text-ink disabled:opacity-40"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3">
          <div className="flex min-w-0 flex-wrap gap-x-4 gap-y-1">
            {jumpMatches.slice(0, 4).map((item) => (
              <button
                key={item.id}
                type="button"
                className="truncate text-[11px] text-mute hover:text-sand"
                onClick={() => {
                  setOpen(false);
                  router.push(item.href);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button type="button" className="shrink-0 text-[11px] text-mute hover:text-ink" onClick={clear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
