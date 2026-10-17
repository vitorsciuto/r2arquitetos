/**
 * PNG do símbolo, gerado no build a partir do mesmo SVG do cabeçalho (lib/simbolo.ts).
 * Rasteriza em resolução alta e reduz, para o glifo sair nítido também em 32 px.
 */
import sharp from 'sharp';
import { simboloSvg } from './simbolo';

export async function simboloPng(lado: number): Promise<Response> {
  const densidade = Math.max(72, Math.ceil((72 * lado * 2) / 256)); // rasteriza a 2× do tamanho final
  const png = await sharp(Buffer.from(simboloSvg()), { density: densidade })
    .resize(lado, lado, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
