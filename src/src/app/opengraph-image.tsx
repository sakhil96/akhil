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
          background: 'linear-gradient(135deg, #07090f 0%, #101629 55%, #121b36 100%)',
          color: '#e8ecf5',
          fontSize: 48,
          letterSpacing: '-0.02em',
        }}
      >
        <div style={{ fontSize: 20, color: '#9aa5b1', marginBottom: 16 }}>
          {site.profile.role}
        </div>
        <div style={{ fontSize: 64, fontWeight: 600 }}>{site.profile.name}</div>
        <div style={{ fontSize: 36, marginTop: 16, color: '#b9c7ff' }}>
          {site.hero.headline}
        </div>
        <div style={{ marginTop: 40, fontSize: 20, color: '#7c8aa0' }}>
          Inference Control Room • AI-first products • Platform-grade execution
        </div>
      </div>
    ),
    size,
  );
}
