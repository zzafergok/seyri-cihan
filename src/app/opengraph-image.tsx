import { ImageResponse } from 'next/og';

export const alt = 'Seyri Cihan — Etkileşimli Türk Tarihi Atlası';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#07101b',
        color: '#eee8db',
        padding: 80,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 22,
          letterSpacing: 7,
          color: '#d6b574',
        }}
      >
        BİR DÜNYA. BİNLERCE HİKÂYE.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', fontSize: 104, letterSpacing: -5 }}>
          Seyri Cihan
        </div>
        <div style={{ display: 'flex', fontSize: 32, color: '#c2cbd4' }}>
          Etkileşimli Türk Tarihi Atlası
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 24,
          color: '#d6b574',
          borderTop: '1px solid #34434f',
          paddingTop: 26,
        }}
      >
        552 — 1923 · Tarihin izinde, dünyanın üzerinde.
      </div>
    </div>,
    size,
  );
}
