import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(135deg, #05060b 0%, #12101f 55%, #0b1c1c 100%)',
          color: '#f3efe6',
          letterSpacing: '-0.03em',
        }}
      >
        <div style={{ display: 'flex', fontSize: 20, color: '#9b98a8', marginBottom: 16 }}>
          {site.profile.role} · {site.profile.location}
        </div>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 600 }}>{site.profile.name}</div>
        <div style={{ display: 'flex', fontSize: 34, marginTop: 18, color: '#c9c2ff' }}>
          {site.hero.headline}
        </div>
        <div style={{ display: 'flex', marginTop: 40, fontSize: 20, color: '#7c8aa0' }}>
          Model safety · Agentic workflows · Java systems
        </div>
      </div>
    ),
    size,
  );
}
