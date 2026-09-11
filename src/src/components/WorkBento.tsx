import { GlassCard } from '@/components/GlassCard';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

export function WorkBento() {
  const [paypal, oracle, tcs] = site.experience;
  const seal = site.focusTiles.find((tile) => tile.id === 'seal');
  const aws = site.focusTiles.find((tile) => tile.id === 'aws');
  const agents = site.focusTiles.find((tile) => tile.id === 'agents');
  const java = site.focusTiles.find((tile) => tile.id === 'java');

  return (
    <section id="work" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12">
      <Reveal>
        <SectionHeading
          eyebrow={site.workIntro.eyebrow}
          title={site.workIntro.title}
          description={site.workIntro.body}
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12">
        <Reveal className="md:col-span-6 lg:col-span-7 lg:row-span-2" delay={0.05}>
          <GlassCard className="flex h-full min-h-[22rem] flex-col justify-between bg-ink/[0.03]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-sand">{paypal.company}</p>
              <h3 className="font-serif text-3xl leading-tight text-ink">{paypal.role}</h3>
              <p className="text-sm text-mute">{paypal.period}</p>
            </div>
            <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-mute">
              {paypal.highlights.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        {seal ? (
          <Reveal className="md:col-span-3 lg:col-span-5" delay={0.1}>
            <FocusTile tile={seal} />
          </Reveal>
        ) : null}

        {aws ? (
          <Reveal className="md:col-span-3 lg:col-span-5" delay={0.14}>
            <FocusTile tile={aws} />
          </Reveal>
        ) : null}

        {oracle ? (
          <Reveal className="md:col-span-3 lg:col-span-4" delay={0.08}>
            <RoleTile role={oracle} />
          </Reveal>
        ) : null}

        {tcs ? (
          <Reveal className="md:col-span-3 lg:col-span-4" delay={0.12}>
            <RoleTile role={tcs} />
          </Reveal>
        ) : null}

        {java ? (
          <Reveal className="md:col-span-3 lg:col-span-4" delay={0.16}>
            <FocusTile tile={java} />
          </Reveal>
        ) : null}

        {agents ? (
          <Reveal className="md:col-span-6 lg:col-span-5" delay={0.1}>
            <FocusTile tile={agents} className="min-h-[16rem]" />
          </Reveal>
        ) : null}

        <Reveal className="md:col-span-6 lg:col-span-7" delay={0.14}>
          <GlassCard className="h-full">
            <p className="text-xs uppercase tracking-[0.18em] text-mute">How I work</p>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {site.skills.map((group) => (
                <div key={group.group}>
                  <h3 className="text-sm text-ink">{group.group}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute">{group.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

function FocusTile({
  tile,
  className,
}: {
  tile: (typeof site.focusTiles)[number];
  className?: string;
}) {
  return (
    <GlassCard className={cn('flex h-full flex-col justify-between', className)}>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-sand">{tile.kicker}</p>
        <h3 className="mt-3 font-serif text-2xl text-ink">{tile.title}</h3>
      </div>
      <p className="mt-6 text-[15px] leading-relaxed text-mute">{tile.body}</p>
    </GlassCard>
  );
}

function RoleTile({ role }: { role: (typeof site.experience)[number] }) {
  return (
    <GlassCard className="flex h-full flex-col justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-mute">{role.company}</p>
        <h3 className="mt-3 font-serif text-2xl text-ink">{role.role}</h3>
        <p className="mt-2 text-sm text-mute">{role.period}</p>
      </div>
      <p className="mt-6 text-[15px] leading-relaxed text-mute">{role.highlights[0]}</p>
    </GlassCard>
  );
}
