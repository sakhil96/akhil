'use client';

import Link from 'next/link';
import { site } from '@/lib/site';

export function SiteHeader() {
  const openPalette = () => {
    window.dispatchEvent(new CustomEvent('command-palette-open'));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-obsidian/55 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="font-medium tracking-tight text-fog">
          {site.profile.name}
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-mist md:flex">
          {site.sections.map((section) => (
            <Link
              key={section.id}
              href={`/#${section.id}`}
              className="transition hover:text-fog"
            >
              {section.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={openPalette}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-mist transition hover:border-iris/40 hover:text-fog"
          aria-label="Open command palette"
        >
          Ask
          <kbd className="rounded-md border border-white/10 bg-obsidian/60 px-1.5 py-0.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
}
