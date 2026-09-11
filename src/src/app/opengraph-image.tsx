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
          background: '#0c0b0a',
          color: '#f3eee6',
        }}
      >
        <div style={{ fontSize: 22, color: '#9a9287', marginBottom: 18 }}>{site.profile.role}</div>
        <div style={{ fontSize: 64, fontWeight: 500 }}>{site.profile.name}</div>
        <div style={{ fontSize: 34, marginTop: 18, color: '#c9ae8c', fontStyle: 'italic' }}>
          {site.hero.headlineLead}
        </div>
        <div style={{ marginTop: 36, fontSize: 20, color: '#9a9287' }}>{site.profile.location}</div>
      </div>
    ),
    size,
  );
}
