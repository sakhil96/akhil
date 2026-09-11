import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { AppChrome } from '@/components/AppChrome';
import { MeshBackground } from '@/components/layout/MeshBackground';
import { site } from '@/lib/site';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
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
      <body
        className={`${geist.variable} ${instrument.variable} ${geistMono.variable} min-h-screen bg-obsidian font-sans text-fog antialiased`}
      >
        <MeshBackground />
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
