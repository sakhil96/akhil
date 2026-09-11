'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ParticleField } from '@/components/hero/ParticleField';
import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';

export function Hero() {
  const reduce = useReducedMotion();
  const [glow, setGlow] = useState({ x: 50, y: 40 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const hero = document.getElementById('hero');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      if (event.clientY < rect.top || event.clientY > rect.bottom) return;
      setGlow({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent('command-palette-open'));
  };

  return (
    <section id="hero" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 opacity-80">
        <ParticleField />
      </div>
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(520px circle at ${glow.x}% ${glow.y}%, rgba(139,124,255,0.16), transparent 55%)`,
        }}
      />

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-5 py-24 md:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl space-y-7"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-aqua/80">
            {site.hero.kicker}
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-medium tracking-tight text-fog sm:text-5xl md:text-6xl">
              {site.profile.name}
            </h1>
            <p className="font-serif text-3xl italic leading-tight text-gradient sm:text-4xl md:text-5xl">
              {site.hero.headline}
            </p>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-mist">{site.hero.subheadline}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="#work">See selected work</Button>
            <Button variant="ghost" onClick={openPalette}>
              Ask about my background
              <kbd className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-mist">
                ⌘K
              </kbd>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
