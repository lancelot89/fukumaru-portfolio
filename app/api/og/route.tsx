// v1は next/og を用いた簡易実装（Satoriベース）
import { Resvg } from '@resvg/resvg-js';
import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';

export const runtime = 'nodejs';

// 公開フォントディレクトリの想定パス
const PUBLIC_DIR = process.cwd();
const FONT_DIR = path.join(PUBLIC_DIR, 'public', 'fonts');

// フォントは初回のみ読み込み（以後はメモリにキャッシュ）
// weight はリテラル型で指定（satori の型に合わせる）
type FontDef = { name: string; data: ArrayBuffer; weight?: 400 | 700; style?: 'normal' | 'italic' };
let cachedFonts: FontDef[] | null = null;
async function loadFonts() {
  if (cachedFonts) return cachedFonts;
  const candidates: { file: string; weight: 400 | 700 }[] = [
    { file: 'NotoSansJP-Regular.ttf', weight: 400 },
    { file: 'NotoSansJP-Bold.ttf', weight: 700 },
  ];

  const fonts: FontDef[] = [];
  for (const c of candidates) {
    try {
      const buf = await fs.readFile(path.join(FONT_DIR, c.file));
      // Node.js Buffer -> ArrayBuffer（SharedArrayBuffer にならないよう Uint8Array 経由で切り出し）
      const u8 = new Uint8Array(buf);
      const data = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength) as ArrayBuffer;
      fonts.push({ name: 'Noto Sans JP', data, weight: c.weight, style: 'normal' });
    } catch {
      // ない場合はスキップ（フォールバックに任せる）
    }
  }

  cachedFonts = fonts;
  return cachedFonts;
}

// フォントは将来 Noto Sans JP を同梱予定（現状はフォールバック）
async function renderPng({ title, tag }: { title: string; tag: string }) {
  const svg = await satori(
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
        color: 'white',
      }}
    >
      <div style={{ fontSize: 28, opacity: 0.8 }}>{tag}</div>
      <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.2 }}>{title}</div>
    </div>,
    {
      width: 1200,
      height: 630,
      // 可能なら Noto Sans JP を使用（未配置なら空配列でフォールバック）
      fonts: await loadFonts(),
    },
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
      (png as Uint8Array).byteOffset + (png as Uint8Array).byteLength,
    );
    return new NextResponse(buf as ArrayBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch {
    // 失敗時も 200 を返しヘルスチェック互換を保つ
    return new NextResponse('ok', { status: 200 });
  }
}
