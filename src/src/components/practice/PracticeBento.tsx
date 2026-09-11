import { GlassCard } from '@/components/ui/GlassCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { site } from '@/lib/site';

export function PracticeBento() {
  const [paypal, oracle, tcs] = site.experience;

  return (
    <section id="practice" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Practice"
          title="Infrastructure, safety, and the product path between them."
          description="A bento of how I actually spend time: PayPal-scale Java systems, AWS-shaped AI architectures, and evals that look at a whole trajectory — not one lucky prompt."
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
        <Reveal className="md:col-span-6 lg:col-span-7 lg:row-span-2" delay={0.05}>
          <GlassCard className="h-full min-h-[22rem]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-aqua/80">Now</p>
            <h3 className="mt-3 font-serif text-3xl text-fog">{paypal.company}</h3>
            <p className="mt-1 text-sm text-mist">
              {paypal.role} · {paypal.period}
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-mist">
              {paypal.highlights.map((item) => (
                <li key={item} className="border-l border-iris/40 pl-4">
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>

        <Reveal className="md:col-span-6 lg:col-span-5" delay={0.1}>
          <GlassCard className="h-full bg-gradient-to-br from-iris/15 via-transparent to-aqua/10">
            <p className="text-[11px] uppercase tracking-[0.18em] text-iris">AWS architectures</p>
            <h3 className="mt-3 font-serif text-2xl text-fog">{site.aws.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">{site.aws.body}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {site.aws.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-fog"
                >
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal className="md:col-span-3 lg:col-span-5" delay={0.12}>
          <GlassCard className="h-full">
            <p className="text-[11px] uppercase tracking-[0.18em] text-mist">Home</p>
            <h3 className="mt-3 font-serif text-2xl text-fog">{site.profile.location}</h3>
            <p className="mt-2 text-sm text-mist">
              {site.systemSnapshot[0].value} across public-sector Java, Oracle, and PayPal AI Tech.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal className="md:col-span-6 lg:col-span-7" delay={0.14}>
          <GlassCard className="h-full">
            <p className="text-[11px] uppercase tracking-[0.18em] text-aqua/80">Model safety</p>
            <h3 className="mt-3 font-serif text-2xl text-fog">Project Seal, red-teaming, trajectories</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              Single-turn scores lie. I care about how a model behaves across a session — where it
              drifts, overreaches, or goes quiet — so safety review sits next to latency and cost.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal className="md:col-span-3 lg:col-span-5" delay={0.16}>
          <GlassCard className="h-full">
            <p className="text-[11px] uppercase tracking-[0.18em] text-mist">Agentic systems</p>
            <h3 className="mt-3 font-serif text-2xl text-fog">Workflows, not chat skins</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              Tools, memory, and eval harnesses. The agent is the loop around the model, not a text box.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal className="md:col-span-3 lg:col-span-4" delay={0.18}>
          <GlassCard className="h-full">
            <p className="text-[11px] uppercase tracking-[0.18em] text-mist">{oracle.company}</p>
            <h3 className="mt-2 text-lg text-fog">{oracle.role}</h3>
            <p className="mt-1 text-xs text-mist">{oracle.period}</p>
            <p className="mt-3 text-sm leading-relaxed text-mist">{oracle.highlights[0]}</p>
          </GlassCard>
        </Reveal>

        <Reveal className="md:col-span-3 lg:col-span-4" delay={0.2}>
          <GlassCard className="h-full">
            <p className="text-[11px] uppercase tracking-[0.18em] text-mist">{tcs.company}</p>
            <h3 className="mt-2 text-lg text-fog">{tcs.role}</h3>
            <p className="mt-1 text-xs text-mist">{tcs.period}</p>
            <p className="mt-3 text-sm leading-relaxed text-mist">{tcs.highlights[0]}</p>
          </GlassCard>
        </Reveal>

        <Reveal className="md:col-span-6 lg:col-span-4" delay={0.22}>
          <GlassCard className="h-full">
            <p className="text-[11px] uppercase tracking-[0.18em] text-mist">Java backends</p>
            <h3 className="mt-2 text-lg text-fog">Spring, SQL, services that last</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              The unfashionable half of ML products: APIs, persistence, and rollouts you can reverse.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal className="md:col-span-6 lg:col-span-12" delay={0.24}>
          <GlassCard>
            <p className="text-[11px] uppercase tracking-[0.18em] text-mist">Stack</p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {site.skills.map((group) => (
                <div key={group.group}>
                  <h3 className="text-sm font-medium text-fog">{group.group}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{group.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
