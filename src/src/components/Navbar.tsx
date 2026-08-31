'use client';

import Link from 'next/link';
import { useConsole } from '@/components/ConsoleProvider';
import { site } from '@/lib/site';

export function Navbar() {
  const { openDock } = useConsole();

  const handleCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('command-palette-open'));
  };

  const handleAsk = () => {
    openDock();
    document.getElementById('console')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="font-display">
          {site.profile.name}
        </Link>
        <nav className="nav-links">
          {site.sections.map((section) => (
            <Link key={section.id} href={`/#${section.id}`} className="nav-link">
              {section.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <button type="button" onClick={handleAsk} className="nav-ask">
            Ask Akhil
          </button>
          <button
            type="button"
            onClick={handleCommandPalette}
            className="nav-command"
            aria-label="Open command palette"
          >
            ⌘K
          </button>
        </div>
      </div>
    </header>
  );
}
