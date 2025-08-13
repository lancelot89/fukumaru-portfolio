// v1は next/og を用いた簡易実装（Satoriベース）
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// フォントは将来 Noto Sans JP を同梱予定（現状はフォールバック）
async function renderPng({ title, tag }: { title: string; tag: string }) {
  const svg = await satori(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 64,
          background: '#0f172a',
          color: 'white'
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.8 }}>{tag}</div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.2 }}>{title}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: []
    }
  );

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return png;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Fukumaru Portfolio';
  const tag = searchParams.get('tag') || 'Blog';

  try {
    const png = await renderPng({ title, tag });
    const buf = (png as Uint8Array).buffer.slice(
      (png as Uint8Array).byteOffset,
      (png as Uint8Array).byteOffset + (png as Uint8Array).byteLength
    );
    return new NextResponse(buf as ArrayBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400, immutable'
      }
    });
  } catch {
    return new NextResponse('ok', { status: 200 });
  }
}
