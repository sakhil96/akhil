'use client';

import Link from 'next/link';
import { site } from '@/lib/site';

export function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="brand">
          <span className="brand-mark">AA</span>
          <span className="brand-name">{site.profile.name.split(' ')[0]}</span>
        </Link>
        <nav className="nav-links">
          {site.sections.map((section) => (
            <Link key={section.id} href={`/#${section.id}`} className="nav-link">
              {section.label}
            </Link>
          ))}
        </nav>
        <Link href="#chat" className="btn btn--primary nav-cta">
          Ask me anything
        </Link>
      </div>
    </header>
  );
}
