'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { ShowcaseProject } from '@/lib/site';
import { cn } from '@/lib/utils';

type HoverRevealCardProps = {
  project: ShowcaseProject;
};

export function HoverRevealCard({ project }: HoverRevealCardProps) {
  const [open, setOpen] = useState(false);

  const inner = (
    <article
      className={cn(
        'relative flex min-h-[18rem] flex-col justify-between overflow-hidden rounded-3xl p-6 md:min-h-[20rem] md:p-8',
        'glass transition-colors duration-500',
        open && 'border-sand/35',
      )}
    >
      <div
        className={cn(
          'transition-opacity duration-500',
          open ? 'md:pointer-events-none md:opacity-0' : 'opacity-100',
        )}
      >
        <p className="text-xs uppercase tracking-[0.16em] text-sand">{project.kicker}</p>
        <h3 className="mt-4 font-serif text-2xl leading-snug text-ink md:text-[1.7rem]">{project.name}</h3>
        <p className="mt-4 hidden max-w-lg text-sm leading-relaxed text-mute md:block">{project.problem}</p>
        <p className="mt-6 hidden text-xs text-mute md:block">Hover for build and result</p>
        <div className="mt-6 grid gap-4 md:hidden">
          <Field label="Problem" text={project.problem} />
          <Field label="Build" text={project.build} />
          <Field label="Result" text={project.result} />
        </div>
      </div>

      <div
        className={cn(
          'hidden gap-4 text-sm leading-relaxed transition-opacity duration-500 md:pointer-events-none md:absolute md:inset-0 md:flex md:flex-col md:justify-center md:bg-obsidian/90 md:p-8 md:backdrop-blur-xl',
          open ? 'md:opacity-100' : 'md:opacity-0',
        )}
      >
        <p className="text-xs uppercase tracking-[0.16em] text-sand">{project.kicker}</p>
        <h3 className="font-serif text-xl text-ink md:text-[1.35rem]">{project.name}</h3>
        <Field label="Problem" text={project.problem} />
        <Field label="Build" text={project.build} />
        <Field label="Result" text={project.result} />
        {project.href ? <p className="text-xs text-sand">Read the write-up →</p> : null}
      </div>
    </article>
  );

  const handlers = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
  };

  if (project.href) {
    return (
      <Link href={project.href} className="block h-full rounded-3xl focus-visible:outline-none" {...handlers}>
        {inner}
      </Link>
    );
  }

  return (
    <div className="h-full" {...handlers}>
      {inner}
    </div>
  );
}

function Field({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-sand">{label}</p>
      <p className="mt-2 text-[15px] text-ink/90">{text}</p>
    </div>
  );
}
