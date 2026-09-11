'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/Button';
import { NodeField } from '@/components/NodeField';
import { site } from '@/lib/site';

function openPalette() {
  window.dispatchEvent(new CustomEvent('command-palette-open'));
}

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? undefined
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center px-5 pb-24 pt-28 sm:px-8 lg:px-12">
      <NodeField />
      <div className="relative mx-auto w-full max-w-6xl">
        <motion.p className="text-sm text-mute" {...fade(0.05)}>
          {site.hero.kicker}
        </motion.p>
        <motion.h1
          className="mt-6 max-w-4xl font-serif text-[2.6rem] leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.6rem]"
          {...fade(0.12)}
        >
          {site.hero.headlineLead}
          <span className="mt-2 block italic text-sand">{site.hero.headlineEmphasis}</span>
        </motion.h1>
        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-mute sm:text-lg"
          {...fade(0.22)}
        >
          {site.hero.subheadline}
        </motion.p>
        <motion.div className="mt-10 flex flex-wrap items-center gap-3" {...fade(0.32)}>
          <Button onClick={openPalette}>{site.hero.primaryCta}</Button>
          <Button href="#projects" variant="ghost">
            {site.hero.secondaryCta}
          </Button>
          <span className="hidden items-center gap-2 pl-2 text-xs text-mute sm:inline-flex">
            or press
            <kbd className="rounded-md border border-line bg-glass px-1.5 py-0.5 font-mono text-[10px] text-sand">
              ⌘K
            </kbd>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
