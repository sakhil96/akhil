'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { StoryCard } from '@/lib/site';
import { GlassCard } from '@/components/ui/GlassCard';

type HoverRevealCardProps = {
  story: StoryCard;
};

export function HoverRevealCard({ story }: HoverRevealCardProps) {
  const [revealed, setRevealed] = useState(false);

  const body = (
    <GlassCard
      className="h-full min-h-[26rem]"
      hover
    >
      <div
        className="flex h-full flex-col"
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
        onFocus={() => setRevealed(true)}
        onBlur={() => setRevealed(false)}
      >
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

        <p
          className={
            revealed
              ? 'hidden'
              : 'mt-6 hidden font-serif text-lg italic leading-relaxed text-fog/90 md:block'
          }
        >
          {story.result}
        </p>

        <div
          className={
            revealed
              ? 'mt-6 space-y-4 text-sm leading-relaxed text-mist'
              : 'mt-6 space-y-4 text-sm leading-relaxed text-mist md:hidden'
          }
        >
          <StoryBlock label="Problem" text={story.problem} />
          <StoryBlock label="Build" text={story.build} />
          <StoryBlock label="Result" text={story.result} />
        </div>

        {story.href ? (
          <span className="mt-auto pt-6 text-sm text-fog/80">Read the notes →</span>
        ) : (
          <span className="mt-auto hidden pt-6 text-xs text-mist md:block">
            {revealed ? '' : 'Hover for the story'}
          </span>
        )}
      </div>
    </GlassCard>
  );

  if (story.href) {
    return (
      <Link
        href={story.href}
        className="block h-full"
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
      >
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
