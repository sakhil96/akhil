'use client';

import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0, active: false };
    const points: Point[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    const parent = canvas.parentElement;

    const resize = () => {
      const nextWidth = parent?.clientWidth ?? window.innerWidth;
      const nextHeight = parent?.clientHeight ?? window.innerHeight;
      const ratio = window.devicePixelRatio || 1;
      width = nextWidth;
      height = nextHeight;
      canvas.width = nextWidth * ratio;
      canvas.height = nextHeight * ratio;
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const seed = () => {
      points.length = 0;
      const count = Math.max(28, Math.floor((width * height) / 28000));
      for (let i = 0; i < count; i += 1) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.6 + 0.7,
        });
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const point of points) {
        if (!reduce) {
          point.x += point.vx;
          point.y += point.vy;
        }

        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;

        if (pointer.active) {
          const dx = pointer.x - point.x;
          const dy = pointer.y - point.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 0.001) {
            point.x += (dx / dist) * 0.35;
            point.y += (dy / dist) * 0.35;
          }
        }

        const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, 10);
        glow.addColorStop(0, 'rgba(139, 124, 255, 0.9)');
        glow.addColorStop(1, 'rgba(94, 234, 212, 0)');
        context.fillStyle = glow;
        context.beginPath();
        context.arc(point.x, point.y, point.r + 1.2, 0, Math.PI * 2);
        context.fill();
      }

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 130) {
            context.strokeStyle = `rgba(94, 234, 212, ${0.16 * (1 - dist / 130)})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      if (!reduce) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onLeave = () => {
      pointer.active = false;
    };

    const onResize = () => {
      resize();
      seed();
      if (reduce) draw();
    };

    resize();
    seed();
    draw();

    window.addEventListener('resize', onResize);
    parent?.addEventListener('pointermove', onMove);
    parent?.addEventListener('pointerleave', onLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      parent?.removeEventListener('pointermove', onMove);
      parent?.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
