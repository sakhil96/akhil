'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

const GAUGE_LEVELS = [92, 88, 84, 90];

const RADAR_NODES = [
  { label: 'Java', angle: 8, orbit: '-5.4rem' },
  { label: 'TypeScript', angle: 68, orbit: '-4.6rem' },
  { label: 'K8s', angle: 128, orbit: '-5.2rem' },
  { label: 'GCP', angle: 188, orbit: '-4.8rem' },
  { label: 'MLOps', angle: 248, orbit: '-5.1rem' },
  { label: 'Product', angle: 308, orbit: '-4.7rem' },
];

export function ControlHud() {
  const [clock, setClock] = useState('--:--:--');

  useEffect(() => {
    const tick = () => {
      setClock(
        new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        }),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <aside className="control-hud scanlines" aria-label="Live control HUD">
      <div className="hud-top">
        <span className="hud-live">
          <span className="pulse-dot" />
          Sys online
        </span>
        <span>IST {clock}</span>
      </div>

      <div className="hud-gauges">
        {site.systemSnapshot.map((item, index) => (
          <div key={item.label} className="hud-gauge">
            <span className="eyebrow">{item.label}</span>
            <div className="text-small" style={{ marginTop: '0.2rem' }}>
              {item.value}
            </div>
            <div className="hud-gauge-bar">
              <div
                className="hud-gauge-fill"
                style={{ width: `${GAUGE_LEVELS[index] ?? 80}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="radar-wrap" aria-hidden>
        <div className="radar-ring" />
        <div className="radar-ring" />
        <div className="radar-ring" />
        <div className="radar-sweep" />
        <div className="radar-core" />
        {RADAR_NODES.map((node) => (
          <span
            key={node.label}
            className="radar-node"
            style={{
              ['--angle' as string]: `${node.angle}deg`,
              ['--orbit' as string]: node.orbit,
            }}
          >
            {node.label}
          </span>
        ))}
      </div>
    </aside>
  );
}
