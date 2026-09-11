import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { site } from '@/lib/site';

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <Reveal>
        <SectionHeading eyebrow="Contact" title={site.contact.headline} description={site.contact.subheadline} />
      </Reveal>
      <Reveal delay={0.08}>
        <GlassCard className="mt-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div className="space-y-3 text-sm text-mist">
              <p>
                Email{' '}
                <Link href={`mailto:${site.profile.email}`} className="text-fog hover:text-white">
                  {site.profile.email}
                </Link>
              </p>
              <p>
                LinkedIn{' '}
                <Link
                  href={site.profile.links.linkedin}
                  className="text-fog hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  /akhil-adapala
                </Link>
              </p>
              <p>
                GitHub{' '}
                <Link
                  href={site.profile.links.github}
                  className="text-fog hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  /sakhil96
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={`mailto:${site.profile.email}`}>Email me</Button>
              <CopyButton value={site.profile.email} />
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  );
}
