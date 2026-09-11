'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useConsole } from '@/components/ConsoleProvider';
import { CHAT_SUGGESTIONS } from '@/lib/knowledge';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

type JumpAction = {
  id: string;
  label: string;
  hint: string;
  href: string;
};

type AskAction = {
  id: string;
  label: string;
  hint: string;
};

type PaletteItem = JumpAction | AskAction;

function isJump(item: PaletteItem): item is JumpAction {
  return 'href' in item;
}

export function CommandPalette() {
  const router = useRouter();
  const { messages, loading, send, clear } = useConsole();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const jumps = useMemo<JumpAction[]>(() => {
    const sections = site.sections.map((section) => ({
      id: `section-${section.id}`,
      label: section.label,
      hint: 'Jump',
      href: `/#${section.id}`,
    }));
    const notes = site.caseStudies.map((study) => ({
      id: `case-${study.slug}`,
      label: study.title,
      hint: 'Notes',
      href: study.href,
    }));
    return [...sections, ...notes];
  }, []);

  const filteredJumps = jumps.filter((action) => {
    const hay = `${action.label} ${action.hint}`.toLowerCase();
    return hay.includes(query.toLowerCase().trim());
  });

  const askItem: AskAction | null = query.trim()
    ? { id: 'ask', label: `Ask: ${query.trim()}`, hint: 'Answer' }
    : null;

  const items: PaletteItem[] = askItem ? [askItem, ...filteredJumps] : filteredJumps;

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
      }
      if (event.key === 'Escape') setOpen(false);
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
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages, loading, open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const runJump = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const runAsk = (text: string) => {
    setQuery('');
    void send(text);
  };

  const onSubmit = () => {
    const item = items[active];
    if (item && isJump(item)) {
      runJump(item.href);
      return;
    }
    if (query.trim()) runAsk(query);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((current) => Math.min(current + 1, Math.max(items.length - 1, 0)));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, 0));
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit();
    }
  };

  const transcript = messages.filter((message) => message.id !== 'welcome');

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-obsidian/70 px-4 pt-[12vh] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Ask about Akhil"
            className="glass w-full max-w-xl overflow-hidden rounded-3xl"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <form
              className="shrink-0 border-b border-white/8 px-4 py-3"
              onSubmit={(event) => {
                event.preventDefault();
                onSubmit();
              }}
            >
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Ask about my background, or jump to a section…"
                className="w-full bg-transparent text-base text-fog outline-none placeholder:text-mist/70"
                autoComplete="off"
                disabled={loading}
              />
            </form>

            <div className="max-h-[22rem] overflow-auto px-2 py-2">
              {transcript.length > 0 || loading ? (
                <div className="space-y-3 px-3 py-2 text-sm">
                  {transcript.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'leading-relaxed',
                        message.role === 'user' ? 'text-fog' : 'text-mist',
                      )}
                    >
                      {message.role === 'user' ? (
                        <span className="text-aqua/80">You · </span>
                      ) : (
                        <span className="text-iris/80">Akhil’s notes · </span>
                      )}
                      <span className="whitespace-pre-wrap">
                        {message.content ? renderContent(message.content) : loading ? '…' : null}
                      </span>
                    </div>
                  ))}
                  <div ref={endRef} />
                </div>
              ) : (
                <div className="px-3 py-2">
                  <p className="px-1 pb-2 text-[11px] uppercase tracking-[0.16em] text-mist">Suggestions</p>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {CHAT_SUGGESTIONS.slice(0, 4).map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-left text-xs text-mist hover:border-iris/40 hover:text-fog"
                        onClick={() => runAsk(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-1">
                {items.length === 0 ? (
                  <p className="px-3 py-4 text-sm text-mist">No jumps. Press Enter to ask anyway.</p>
                ) : (
                  items.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      className={cn(
                        'flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm transition',
                        index === active ? 'bg-white/8 text-fog' : 'text-mist hover:bg-white/5 hover:text-fog',
                      )}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => {
                        if (isJump(item)) runJump(item.href);
                        else if (query.trim()) runAsk(query);
                      }}
                    >
                      <span>{item.label}</span>
                      <span className="text-[11px] uppercase tracking-[0.14em] text-mist/80">{item.hint}</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/8 px-4 py-2.5 text-[11px] text-mist">
              <span>Enter to run · Esc to close</span>
              <button type="button" className="hover:text-fog" onClick={() => clear()}>
                Clear
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function renderContent(content: string): ReactNode {
  const parts = content.split(/(https?:\/\/[^\s]+|\/case-studies\/[a-z0-9-]+)/gi);
  return parts.map((part, index) => {
    if (part.startsWith('/case-studies/')) {
      return (
        <Link key={`${part}-${index}`} href={part} className="text-aqua hover:text-fog">
          {part}
        </Link>
      );
    }
    if (part.startsWith('http')) {
      return (
        <a key={`${part}-${index}`} href={part} className="text-aqua hover:text-fog" target="_blank" rel="noreferrer">
          {part}
        </a>
      );
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
}
