import Link from 'next/link';
import { SiteFooter } from '@/components/ContactSection';

export default function NotFound() {
  return (
    <>
      <main className="mx-auto flex min-h-[80svh] w-full max-w-3xl flex-col justify-center px-5 pt-28 sm:px-8">
        <p className="font-serif text-6xl text-sand">404</p>
        <h1 className="mt-6 font-serif text-3xl text-ink">This page is not here.</h1>
        <p className="mt-4 max-w-md text-mute">The URL does not match anything on the site. Home is the safest next step.</p>
        <Link
          href="/"
          className="mt-10 inline-flex w-fit items-center rounded-full bg-ink px-5 py-2.5 text-sm text-obsidian"
        >
          Back home
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
