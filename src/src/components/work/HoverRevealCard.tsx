import Link from 'next/link';
import type { StoryCard } from '@/lib/site';
import { GlassCard } from '@/components/ui/GlassCard';

type HoverRevealCardProps = {
  story: StoryCard;
};

export function HoverRevealCard({ story }: HoverRevealCardProps) {
  const body = (
    <GlassCard className="group h-full min-h-[24rem]">
      <div className="flex h-full flex-col">
        <p className="text-[11px] uppercase tracking-[0.18em] text-aqua/80">{story.kicker}</p>
        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className="font-serif text-2xl leading-snug text-fog">{story.title}</h3>
          {story.year ? <span className="text-xs text-mist">{story.year}</span> : null}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {story.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-mist"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="relative mt-6 flex-1">
          <p className="hidden font-serif text-lg italic leading-relaxed text-fog/90 transition duration-300 md:block md:group-hover:opacity-0">
            {story.result}
          </p>
          <div className="space-y-4 text-sm leading-relaxed text-mist md:absolute md:inset-0 md:opacity-0 md:transition md:duration-300 md:group-hover:opacity-100">
            <StoryBlock label="Problem" text={story.problem} />
            <StoryBlock label="Build" text={story.build} />
            <StoryBlock label="Result" text={story.result} />
          </div>
        </div>

        {story.href ? (
          <span className="mt-6 text-sm text-fog/80">Read the notes →</span>
        ) : null}
      </div>
    </GlassCard>
  );

  if (story.href) {
    return (
      <Link href={story.href} className="block h-full">
        {body}
      </Link>
    );
  }

  return body;
}

function StoryBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-fog/70">{label}</p>
      <p className="mt-1">{text}</p>
    </div>
  );
}
