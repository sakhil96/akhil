'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '◈' },
  { href: '/people', label: 'People', icon: '◉' },
  { href: '/teams', label: 'Teams', icon: '◎' },
  { href: '/services', label: 'Services', icon: '◇' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-info flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent-primary/25 group-hover:shadow-accent-primary/40 transition-shadow">
                EIP
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-info opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-text-primary font-semibold text-sm tracking-tight">
                Engineering Impact
              </span>
              <span className="text-text-muted text-[10px] uppercase tracking-wider font-medium">
                PayPal Internal
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1 bg-surface-tertiary/50 rounded-xl p-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2',
                    isActive
                      ? 'bg-gradient-to-r from-accent-primary/20 to-accent-secondary/10 text-accent-primary shadow-inner-glow'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50'
                  )}
                >
                  <span className={cn(
                    'text-xs transition-colors',
                    isActive ? 'text-accent-primary' : 'opacity-50'
                  )}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-text-primary">Akhil Adapala</div>
              <div className="text-xs text-text-muted">Sr Software Engineer</div>
            </div>
            <div className="relative group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-rose flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-accent-primary/20 group-hover:shadow-accent-primary/40 transition-all cursor-pointer">
                AA
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-primary to-accent-rose opacity-0 group-hover:opacity-30 blur-lg transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
