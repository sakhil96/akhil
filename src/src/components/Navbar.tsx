'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

function openPalette() {
  window.dispatchEvent(new CustomEvent('command-palette-open'));
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        scrolled ? 'border-b border-line bg-obsidian/70 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="text-sm tracking-tight text-ink">
          {site.profile.name}
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-mute md:flex">
          {site.sections.map((section) => (
            <Link key={section.id} href={`/#${section.id}`} className="transition-colors hover:text-ink">
              {section.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={openPalette}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-glass px-3 py-1.5 text-xs text-mute transition-colors hover:border-sand/40 hover:text-ink"
          aria-label="Open command palette"
        >
          Ask
          <kbd className="hidden font-mono text-[10px] text-sand sm:inline">⌘K</kbd>
        </button>
      </div>
    </header>
  );
}
