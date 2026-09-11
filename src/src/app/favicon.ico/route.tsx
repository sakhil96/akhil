import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0c0b0a',
          color: '#c9ae8c',
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        A
      </div>
    ),
    size,
  );
}
