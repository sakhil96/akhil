import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Mono, Source_Sans_3 } from 'next/font/google';
import { ChatBot } from '@/components/ChatBot';
import { Navbar } from '@/components/Navbar';
import { site } from '@/lib/site';
import './globals.css';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.meta.siteUrl),
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    type: 'website',
    url: site.meta.siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.meta.title,
    description: site.meta.description,
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${fraunces.variable} ${plexMono.variable} app-body`}>
        <div className="ambient ambient--one" aria-hidden />
        <div className="ambient ambient--two" aria-hidden />
        <Navbar />
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
