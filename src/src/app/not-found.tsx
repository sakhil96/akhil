import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="text-center">
        <p className="font-serif text-6xl text-gradient">404</p>
        <h1 className="mt-4 text-2xl text-fog">This page isn’t here.</h1>
        <p className="mt-2 text-sm text-mist">The URL may have moved with the redesign.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-white/12 px-5 py-2.5 text-sm text-fog hover:border-iris/50"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
