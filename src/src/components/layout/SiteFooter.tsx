import Link from 'next/link';
import { site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/6">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-mist md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          {site.profile.name} · {site.profile.location}
        </p>
        <div className="flex flex-wrap gap-5">
          <Link href={`mailto:${site.profile.email}`} className="hover:text-fog">
            Email
          </Link>
          <Link href={site.profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-fog">
            LinkedIn
          </Link>
          <Link href={site.profile.links.github} target="_blank" rel="noreferrer" className="hover:text-fog">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
