'use client';

import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
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
    const pointCount = 48;
    const maxDistance = 140;
    const pointer = { x: 0, y: 0, active: false };

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
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        });
      }
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = 'rgba(109, 92, 255, 0.08)';
      context.strokeStyle = 'rgba(69, 211, 255, 0.12)';

      for (const point of points) {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > window.innerWidth) point.vx *= -1;
        if (point.y < 0 || point.y > window.innerHeight) point.vy *= -1;

        const dx = pointer.x - point.x;
        const dy = pointer.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (pointer.active && dist < 140) {
          point.x -= dx * 0.002;
          point.y -= dy * 0.002;
        }

        context.beginPath();
        context.arc(point.x, point.y, 2, 0, Math.PI * 2);
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
            context.globalAlpha = 1 - dist / maxDistance;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }
      context.globalAlpha = 1;

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

  return (
    <canvas
      ref={canvasRef}
      className="signal-canvas"
      aria-hidden
    />
  );
}
