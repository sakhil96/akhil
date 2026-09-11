import Link from 'next/link';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/ContactSection';

type CaseStudyLayoutProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function CaseStudyLayout({ kicker, title, subtitle, children }: CaseStudyLayoutProps) {
  return (
    <>
      <article className="mx-auto w-full max-w-3xl px-5 pb-24 pt-28 sm:px-8">
        <Link href="/" className="text-sm text-mute transition-colors hover:text-sand">
          ← Home
        </Link>
        {kicker ? <p className="mt-10 text-xs uppercase tracking-[0.18em] text-sand">{kicker}</p> : null}
        <h1 className="mt-4 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl">{title}</h1>
        {subtitle ? <p className="mt-4 text-lg text-mute">{subtitle}</p> : null}
        <div className="mt-12 space-y-12">{children}</div>
      </article>
      <SiteFooter />
    </>
  );
}
