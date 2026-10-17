// Carrossel do Instagram da Cozinha Tremembé (fotos de Renato Stockler).
// Fonte: JPG_INTERNET do fotógrafo (Adobe RGB, 2800 px), convertidas para sRGB.
// Formato da régua: 1080 x 1350, papel #F2F2F2, margem 72 px, foto inteira, sem recorte.
// Uso: node scripts/gerar-carrossel-tremembe.cjs
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BASE = 'projetos/2026-cozinha-tremembe';
const ORIGEM = path.join(BASE, 'fotos-internet');
const SAIDA = path.join(BASE, 'instagram', 'carrossel');
const W = 1080, H = 1350, M = 72, PAPEL = '#F2F2F2';

// Ordem: a casa antes da cozinha, o espaço antes do detalhe.
const ORDEM = ['4215', '4385', '4357', '4231', '4271', '4179', '4319', '4227', '4311', '4329'];

(async () => {
  fs.mkdirSync(SAIDA, { recursive: true });
  const miniaturas = [];
  for (const [i, n] of ORDEM.entries()) {
    const foto = await sharp(path.join(ORIGEM, `_TO_${n}.jpg`))
      .resize(W - 2 * M, H - 2 * M, { fit: 'inside', kernel: 'lanczos3' })
      .toColourspace('srgb')
      .toBuffer({ resolveWithObject: true });
    const { width, height } = foto.info;
    const nome = `${String(i + 1).padStart(2, '0')}-tremembe-${n}.jpg`;
    const arte = await sharp({ create: { width: W, height: H, channels: 3, background: PAPEL } })
      .composite([{ input: foto.data, left: Math.round((W - width) / 2), top: Math.round((H - height) / 2) }])
      .withIccProfile('srgb')
      .jpeg({ quality: 92, chromaSubsampling: '4:4:4', mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(path.join(SAIDA, nome), arte);
    miniaturas.push(await sharp(arte).resize(270, 338).toBuffer());
    console.log(nome, `${width}x${height}`);
  }
  // prévia: os dez lado a lado, em duas linhas
  const cols = 5, cw = 270, ch = 338, g = 12;
  await sharp({ create: { width: cols * cw + (cols + 1) * g, height: 2 * ch + 3 * g, channels: 3, background: '#FFFFFF' } })
    .composite(miniaturas.map((input, i) => ({ input, left: g + (i % cols) * (cw + g), top: g + Math.floor(i / cols) * (ch + g) })))
    .jpeg({ quality: 88 })
    .toFile(path.join(BASE, 'instagram', 'previa-carrossel.jpg'));
})();
