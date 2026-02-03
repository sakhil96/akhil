'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

type Action = {
  id: string;
  label: string;
  href: string;
  keywords?: string[];
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const actions = useMemo<Action[]>(() => {
    const sectionActions = site.sections.map((section) => ({
      id: `section-${section.id}`,
      label: section.label,
      href: `/#${section.id}`,
      keywords: ['section', 'jump'],
    }));
    const caseStudyActions = site.caseStudies.map((study) => ({
      id: `case-${study.slug}`,
      label: study.title,
      href: study.href,
      keywords: study.tags,
    }));
    return [
      ...sectionActions,
      ...caseStudyActions,
      { id: 'contact', label: 'Contact', href: '/#contact', keywords: ['email'] },
    ];
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    const openHandler = () => setOpen(true);
    window.addEventListener('keydown', handler);
    window.addEventListener('command-palette-open', openHandler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('command-palette-open', openHandler);
    };
  }, []);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const filtered = actions.filter((action) => {
    const haystack = `${action.label} ${action.keywords?.join(' ') ?? ''}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      className="command-overlay"
      onClick={() => setOpen(false)}
    >
      <div
        className="command-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="command-input"
          placeholder="Jump to a section or case study..."
        />
        <div className="command-list">
          {filtered.length === 0 ? (
            <div className="command-empty">
              No matches. Try "wins" or "case studies."
            </div>
          ) : (
            filtered.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => handleSelect(action.href)}
                className={cn('command-item')}
              >
                <span>{action.label}</span>
                <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {action.href}
                </span>
              </button>
            ))
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="command-close"
        >
          Press Esc to close
        </button>
      </div>
    </div>
  );
}
