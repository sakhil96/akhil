'use client';

import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  cyan: boolean;
};

export function SignalBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrame = 0;
    const points: Point[] = [];
    const pointCount = 78;
    const maxDistance = 168;
    const pointer = { x: 0, y: 0, active: false };
    let t = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const initPoints = () => {
      points.length = 0;
      for (let i = 0; i < pointCount; i += 1) {
        points.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.55,
          r: Math.random() * 1.6 + 0.8,
          cyan: Math.random() > 0.45,
        });
      }
    };

    const draw = () => {
      t += 0.008;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const point of points) {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > window.innerWidth) point.vx *= -1;
        if (point.y < 0 || point.y > window.innerHeight) point.vy *= -1;

        const dx = pointer.x - point.x;
        const dy = pointer.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (pointer.active && dist < 160) {
          point.x -= dx * 0.003;
          point.y -= dy * 0.003;
        }

        const pulse = 0.55 + Math.sin(t * 3 + point.x * 0.01) * 0.45;
        context.fillStyle = point.cyan
          ? `rgba(69, 211, 255, ${0.12 + pulse * 0.22})`
          : `rgba(109, 92, 255, ${0.12 + pulse * 0.22})`;
        context.beginPath();
        context.arc(point.x, point.y, point.r + pulse * 0.6, 0, Math.PI * 2);
        context.fill();
      }

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.55;
            context.strokeStyle = a.cyan
              ? `rgba(69, 211, 255, ${alpha})`
              : `rgba(109, 92, 255, ${alpha})`;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onScroll = () => {
      pointer.active = false;
    };

    resize();
    initPoints();
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-canvas" aria-hidden />;
}
