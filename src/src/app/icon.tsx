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
          background: 'linear-gradient(135deg, #07090f 0%, #101629 55%, #121b36 100%)',
          color: '#b9c7ff',
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
