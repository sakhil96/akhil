'use client';

import Link from 'next/link';
import { site } from '@/lib/site';

export function Navbar() {
  const handleCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('command-palette-open'));
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="font-display">
          {site.profile.name}
        </Link>
        <nav className="nav-links">
          <Link href="/jobs" className="nav-link">
            Jobs
          </Link>
          {site.sections.map((section) => (
            <Link key={section.id} href={`/#${section.id}`} className="nav-link">
              {section.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={handleCommandPalette}
          className="nav-command"
          aria-label="Open command palette"
        >
          ⌘K
        </button>
      </div>
    </header>
  );
}
