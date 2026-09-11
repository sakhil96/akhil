import Link from 'next/link';
import { CopyButton } from '@/components/CopyButton';
import { Reveal } from '@/components/Reveal';
import { site } from '@/lib/site';

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.18em] text-mute">Contact</p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.12] text-ink sm:text-5xl md:text-6xl">
          {site.contact.headline}
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-mute">{site.contact.subheadline}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Link
            href={`mailto:${site.profile.email}`}
            className="font-serif text-2xl text-sand decoration-sand/30 underline-offset-8 transition-colors hover:text-ink hover:underline sm:text-3xl"
          >
            {site.profile.email}
          </Link>
          <div className="flex flex-wrap gap-3">
            <CopyButton value={site.profile.email} />
            <Link
              href={site.profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-sand/50"
            >
              LinkedIn
            </Link>
            <Link
              href={site.profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-sand/50"
            >
              GitHub
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t border-line px-5 py-10 text-xs text-mute sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
      <p>
        {site.profile.name} · {site.profile.location}
      </p>
      <p>© {new Date().getFullYear()}</p>
    </footer>
  );
}
