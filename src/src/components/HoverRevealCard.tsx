import Link from 'next/link';
import type { ShowcaseProject } from '@/lib/site';
import { cn } from '@/lib/utils';

type HoverRevealCardProps = {
  project: ShowcaseProject;
};

export function HoverRevealCard({ project }: HoverRevealCardProps) {
  const inner = (
    <article
      className={cn(
        'group glass relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl p-6 md:p-8',
        'transition-colors duration-500 hover:border-sand/30',
      )}
    >
      <div className="transition-opacity duration-500 md:group-hover:opacity-0 md:group-focus-within:opacity-0">
        <p className="text-xs uppercase tracking-[0.16em] text-sand">{project.kicker}</p>
        <h3 className="mt-4 font-serif text-2xl leading-snug text-ink md:text-[1.7rem]">{project.name}</h3>
      </div>

      <div className="mt-8 grid gap-5 text-sm leading-relaxed md:pointer-events-none md:absolute md:inset-0 md:mt-0 md:flex md:flex-col md:justify-center md:bg-obsidian/88 md:p-8 md:opacity-0 md:backdrop-blur-xl md:transition-opacity md:duration-500 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
        <Field label="Problem" text={project.problem} />
        <Field label="Build" text={project.build} />
        <Field label="Result" text={project.result} />
        {project.href ? <p className="text-xs text-sand">Read the write-up →</p> : null}
      </div>
    </article>
  );

  if (project.href) {
    return (
      <Link href={project.href} className="block h-full rounded-3xl focus-visible:outline-none">
        {inner}
      </Link>
    );
  }

  return inner;
}

function Field({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-sand">{label}</p>
      <p className="mt-2 text-[15px] text-ink/90">{text}</p>
    </div>
  );
}
