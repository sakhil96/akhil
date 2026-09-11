import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #05060b 0%, #1a1630 55%, #0b1c1c 100%)',
          color: '#f3efe6',
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        A
      </div>
    ),
    size,
  );
}
