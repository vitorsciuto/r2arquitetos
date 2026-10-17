// Foto de compartilhamento de cada projeto: o quadro da obra nos índices, recortado na horizontal.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { quadros } from '../../lib/config';
import { recorteOg } from '../../lib/og';

export const getStaticPaths = (async () => {
  const projetos = await getCollection('projetos');
  return projetos.map((p) => ({ params: { slug: p.data.slug }, props: { quadro: quadros[p.data.numero] } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { quadro } = props as { quadro: (typeof quadros)[string] };
  const original = await readFile(path.join(process.cwd(), 'src/assets/fotos', quadro.pasta, quadro.arquivo));
  const orientada = await sharp(original).rotate().toBuffer(); // aplica a orientação EXIF antes de medir
  const { width = 0, height = 0 } = await sharp(orientada).metadata();
  const r = recorteOg(width, height, quadro.posicao);
  const jpg = await sharp(orientada)
    .extract({ left: r.left, top: r.top, width: r.width, height: r.height })
    .resize(r.saidaL, r.saidaA, { kernel: 'lanczos3' })
    .jpeg({ quality: 84, mozjpeg: true, progressive: true })
    .toBuffer();
  return new Response(new Uint8Array(jpg), { headers: { 'Content-Type': 'image/jpeg' } });
};
