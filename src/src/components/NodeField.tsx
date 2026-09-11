'use client';

import { useEffect, useRef } from 'react';

type Node = {
  x: number;
  y: number;
  r: number;
};

const NODES: Node[] = [
  { x: 0.12, y: 0.22, r: 2.4 },
  { x: 0.23, y: 0.48, r: 1.8 },
  { x: 0.18, y: 0.74, r: 2.1 },
  { x: 0.34, y: 0.18, r: 1.6 },
  { x: 0.41, y: 0.41, r: 2.8 },
  { x: 0.38, y: 0.68, r: 1.7 },
  { x: 0.52, y: 0.28, r: 2.0 },
  { x: 0.58, y: 0.55, r: 2.5 },
  { x: 0.54, y: 0.82, r: 1.5 },
  { x: 0.71, y: 0.2, r: 1.9 },
  { x: 0.76, y: 0.44, r: 2.2 },
  { x: 0.69, y: 0.71, r: 1.8 },
  { x: 0.86, y: 0.32, r: 1.6 },
  { x: 0.88, y: 0.62, r: 2.6 },
  { x: 0.81, y: 0.86, r: 1.7 },
  { x: 0.08, y: 0.58, r: 1.4 },
];

function edgesFor(nodes: Node[]) {
  const edges: Array<[number, number]> = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 0.28) edges.push([i, j]);
    }
  }
  return edges;
}

const EDGES = edgesFor(NODES);

export function NodeField() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pointer = useRef({ x: 0.5, y: 0.5, active: false });
  const offsets = useRef(NODES.map(() => ({ x: 0, y: 0 })));

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    let frame = 0;

    const circles = Array.from(svg.querySelectorAll<SVGCircleElement>('[data-node]'));
    const lines = Array.from(svg.querySelectorAll<SVGLineElement>('[data-edge]'));

    const onMove = (event: PointerEvent) => {
      const box = wrap.getBoundingClientRect();
      const inside =
        event.clientX >= box.left &&
        event.clientX <= box.right &&
        event.clientY >= box.top &&
        event.clientY <= box.bottom;
      pointer.current = {
        x: (event.clientX - box.left) / box.width,
        y: (event.clientY - box.top) / box.height,
        active: inside,
      };
    };

    const onLeave = () => {
      pointer.current.active = false;
    };

    const tick = () => {
      const { width, height } = wrap.getBoundingClientRect();
      const mouse = pointer.current;

      NODES.forEach((node, index) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy) || 0.001;
        const pull = mouse.active ? Math.max(0, 0.22 - dist) : 0;
        const targetX = mouse.active ? -dx * pull * 48 : 0;
        const targetY = mouse.active ? -dy * pull * 48 : 0;
        const current = offsets.current[index];
        current.x += (targetX - current.x) * 0.08;
        current.y += (targetY - current.y) * 0.08;

        const cx = node.x * width + current.x;
        const cy = node.y * height + current.y;
        const circle = circles[index];
        if (circle) {
          circle.setAttribute('cx', String(cx));
          circle.setAttribute('cy', String(cy));
        }
      });

      EDGES.forEach(([a, b], index) => {
        const line = lines[index];
        if (!line) return;
        const na = NODES[a];
        const nb = NODES[b];
        const oa = offsets.current[a];
        const ob = offsets.current[b];
        line.setAttribute('x1', String(na.x * width + oa.x));
        line.setAttribute('y1', String(na.y * height + oa.y));
        line.setAttribute('x2', String(nb.x * width + ob.x));
        line.setAttribute('y2', String(nb.y * height + ob.y));
      });

      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <svg ref={svgRef} className="h-full w-full">
        {EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            data-edge
            x1={`${NODES[a].x * 100}%`}
            y1={`${NODES[a].y * 100}%`}
            x2={`${NODES[b].x * 100}%`}
            y2={`${NODES[b].y * 100}%`}
            stroke="rgba(201, 174, 140, 0.22)"
            strokeWidth="1"
          />
        ))}
        {NODES.map((node, index) => (
          <circle
            key={`${node.x}-${node.y}`}
            data-node
            cx={`${node.x * 100}%`}
            cy={`${node.y * 100}%`}
            r={node.r}
            fill={index % 3 === 0 ? '#c9ae8c' : index % 3 === 1 ? '#b58363' : '#6d7c86'}
            opacity="0.85"
          />
        ))}
      </svg>
    </div>
  );
}
