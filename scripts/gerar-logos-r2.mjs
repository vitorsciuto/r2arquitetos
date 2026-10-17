// Gera a assinatura e o símbolo a partir de dois arquivos:
//   marca/identidade-r2/logos/r2-mestre.svg  (vetor do monograma; só é lido, nunca reescrito)
//   marca/identidade-r2/tokens.json          (nome, cores, proporções e descritor)
// Regras: docs/marca/regua-da-marca.md, §2.
//
//   node scripts/gerar-logos-r2.mjs
//
// Saída em marca/identidade-r2/logos/:
//   r2-simbolo.svg + PNG 1080, 512, 180, 32         quadrado #858585 com o glifo branco
//   r2-assinatura-fundo-claro.svg + PNG 1080, 2160  símbolo + texto em tinta (#616161)
// Não há assinatura de texto branco: pela régua §3 o texto branco só vai sobre o fundo
// #858585 (tokens.json → lockup.textoSobreMarca). A antiga r2-assinatura-fundo-escuro foi
// para logos/historico/ em 16/10/2026.
// Os PNG têm fundo transparente. O texto da assinatura sai em curvas (Work Sans 400),
// para uso sem a fonte instalada. Pranchas de conferência vão para marca/identidade-r2/qa/.
//
// Também reescreve, no guia marca/identidade-r2/index.html, os elementos marcados com
// data-token / data-token-href (hoje só o rótulo e o link do Instagram), com os valores
// de tokens.json. Assim o guia mostra o mesmo valor aberto como arquivo ou por servidor.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { create as createFont } from 'fontkitten';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const kit = path.join(root, 'marca/identidade-r2');
const dir = path.join(kit, 'logos');
const qa = path.join(kit, 'qa');
await fs.mkdir(qa, { recursive: true });

const tokens = JSON.parse(await fs.readFile(path.join(kit, 'tokens.json'), 'utf8'));
const cor = tokens.colors;
const lockup = tokens.lockup;

// Monograma: só leitura. Tem de ser igual ao do site (src/assets/logo-r2.svg).
const masterPath = path.join(dir, 'r2-mestre.svg');
const master = await fs.readFile(masterPath, 'utf8');
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const masterHash = sha(master);
assert.equal(master, await fs.readFile(path.join(root, 'src/assets/logo-r2.svg'), 'utf8'),
  'r2-mestre.svg difere de src/assets/logo-r2.svg');
assert.equal(master.match(/viewBox="([^"]+)"/)?.[1], '0 0 256 256');
const geometry = master.replace(/^[\s\S]*?<svg\b[^>]*>/, '').replace(/<\/svg>\s*$/, '');
assert.ok(geometry.includes('<path') && !geometry.includes('<rect'));

const r = (n, d = 3) => Number(n.toFixed(d));

// Borda visível do desenho, medida em render de 8192 px (precisão de 0,03 unidade em 256).
// A caixa do viewBox não serve: o desenho ocupa só x 33–222 e y 56–200.
async function bordaVisivel() {
  const N = 8192;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${N}" height="${N}" viewBox="0 0 256 256" fill="#000">${geometry}</svg>`;
  const { data, info } = await sharp(Buffer.from(svg)).ensureAlpha().extractChannel(3).raw()
    .toBuffer({ resolveWithObject: true });
  let x0 = N, x1 = -1, y0 = N, y1 = -1;
  for (let y = 0; y < info.height; y++) {
    const row = y * info.width;
    for (let x = 0; x < info.width; x++) {
      if (data[row + x] > 0) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
  }
  const u = 256 / N;
  return { x: x0 * u, y: y0 * u, w: (x1 + 1 - x0) * u, h: (y1 + 1 - y0) * u };
}
const borda = await bordaVisivel();

// Símbolo: quadrado de lado L = 256. O glifo ocupa glifoNoQuadrado (0,64) da largura
// e fica centrado nos dois eixos pela borda visível.
const L = 256;
const k = (lockup.glifoNoQuadrado * L) / borda.w;
const gx = (L - borda.w * k) / 2 - borda.x * k;
const gy = (L - borda.h * k) / 2 - borda.y * k;
const glifo = `<g fill="${cor.white}" transform="translate(${r(gx, 4)} ${r(gy, 4)}) scale(${r(k, 6)})">${geometry}</g>`;
const quadrado = `<rect width="${L}" height="${L}" fill="${cor.brand}"/>`;

// Texto da assinatura em curvas. Medidas do cabeçalho do site: quadrado de 56 px,
// 'r2 arquitetos' no corpo (16 px) e o descritor no pequeno (14 px), da escala em tokens.json.
const font = createFont(await fs.readFile(path.join(kit, tokens.typography.fontFile))).getVariation({ wght: tokens.typography.weight });
const QUADRADO_SITE = 56;
const [, , , CORPO, PEQUENO] = tokens.typography.webScalePx;
// Linhas de base no quadrado de 56 px, medidas no cabeçalho do site (site.css .cab-wm:
// linhas de 16 e 14 px, entrelinha 1,35, bloco centrado no quadrado por flex; Chromium,
// 16/10/2026). Assim as curvas repetem a montagem do site.
const BASES_SITE = [23.75, 42.34];
const u = L / QUADRADO_SITE;
// Kerning do GPOS da Work Sans 400 para os pares destes dois textos (fontTools; unidades de 1000).
// O fontkitten não aplica GPOS; par ausente daqui sai sem kerning.
const KERN = { rq: -16, et: -15, ra: -14, 'a ': -23 };

function linha(texto, tamanho) {
  const s = tamanho / font.unitsPerEm;
  let cursor = 0, minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const partes = [];
  [...texto].forEach((ch, i) => {
    const g = font.glyphForCodePoint(ch.codePointAt(0));
    if (g.path.commands.length) {
      const b = g.path.bbox;
      minX = Math.min(minX, cursor + b.minX * s); maxX = Math.max(maxX, cursor + b.maxX * s);
      minY = Math.min(minY, b.minY * s); maxY = Math.max(maxY, b.maxY * s);
      partes.push({ g, x: cursor });
    }
    cursor += (g.advanceWidth + (KERN[texto.slice(i, i + 2)] ?? 0)) * s;
  });
  // minY/maxY em coordenadas de fonte (y para cima): maxY é o topo, minY a descendente.
  return { partes, s, minX, maxX, topo: maxY, desc: -minY };
}
// Tamanho mínimo da assinatura (régua §2; tokens.json → lockup): no quadrado mínimo, o
// descritor (PEQUENO / QUADRADO_SITE do lado, 0,25) não pode ficar abaixo do menor tamanho
// da escala: 12 px na tela e 7 pt no papel.
{
  const frac = PEQUENO / QUADRADO_SITE;
  const minTela = Math.min(...tokens.typography.webScalePx);
  const minPapel = Math.min(...tokens.typography.printScalePt);
  const tela = frac * lockup.minimoAssinaturaTelaPx;
  const papel = frac * lockup.minimoAssinaturaPapelMm / 25.4 * 72;
  assert.ok(tela >= minTela - 1e-9, `descritor a ${tela} px no mínimo da assinatura`);
  assert.ok(papel >= minPapel - 1e-9, `descritor a ${papel.toFixed(2)} pt no mínimo da assinatura`);
  assert.ok(lockup.minimoAssinaturaTelaPx >= lockup.minimoTelaPx && lockup.minimoAssinaturaPapelMm >= lockup.minimoPapelMm);
  console.log(`Assinatura no mínimo (${lockup.minimoAssinaturaTelaPx} px / ${lockup.minimoAssinaturaPapelMm} mm): descritor a ${r(tela, 2)} px / ${r(papel, 2)} pt`);
}
const nome = linha(tokens.name, CORPO * u);
const descritor = linha(lockup.descritor, PEQUENO * u);
const [base1, base2] = BASES_SITE.map(b => b * u);
const xTexto = L + lockup.intervaloTexto * L; // borda visível da primeira letra
function curvas(l, baseline) {
  const dx = xTexto - l.minX;
  return l.partes.map(({ g, x }) =>
    g.path.transform(l.s, 0, 0, -l.s, dx + x, baseline).toSVG()
  ).join('').replace(/-?\d+\.\d+/g, n => String(r(Number(n))));
}
// Largura do viewBox: a borda direita do texto, arredondada para que o PNG de 1080 px
// tenha altura inteira (sem uma linha de pixel parcial embaixo).
const extensao = Math.max(xTexto + nome.maxX - nome.minX, xTexto + descritor.maxX - descritor.minX);
const larguraAssinatura = r(1080 * L / Math.floor(1080 * L / extensao), 4);
assert.ok(base2 + descritor.desc < L, 'descendente da linha 2 sai do quadrado');
const textoD = [curvas(nome, base1), curvas(descritor, base2)];

const titulo = `${tokens.name}, ${lockup.descritor}`;
const svg = (w, h, corpo, label = titulo) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${corpo}</svg>\n`;
const assinatura = tinta => svg(larguraAssinatura, L,
  `${quadrado}${glifo}<g fill="${tinta}"><path d="${textoD[0]}"/><path d="${textoD[1]}"/></g>`);

const arquivos = {
  'r2-simbolo': { conteudo: svg(L, L, quadrado + glifo, tokens.name), pngs: [1080, 512, 180, 32] },
  'r2-assinatura-fundo-claro': { conteudo: assinatura(cor.ink), pngs: [1080, 2160] },
};
// Renderiza o SVG já no tamanho final (sem ampliar um raster de 256 px).
const noTamanho = (conteudo, largura) => {
  const [, , w, h] = conteudo.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
  return Buffer.from(conteudo.replace('<svg ', `<svg width="${largura}" height="${Math.round(largura * h / w)}" `));
};
for (const [nomeArq, { conteudo, pngs }] of Object.entries(arquivos)) {
  await fs.writeFile(path.join(dir, `${nomeArq}.svg`), conteudo);
  for (const largura of pngs) {
    await sharp(noTamanho(conteudo, largura)).png().toFile(path.join(dir, `${nomeArq}-${largura}.png`));
  }
}

// Conferência: no PNG de 1080, o glifo branco tem de ficar centrado (±1 px) e com 0,64 da largura.
{
  const { data, info } = await sharp(path.join(dir, 'r2-simbolo-1080.png')).removeAlpha().greyscale().raw()
    .toBuffer({ resolveWithObject: true });
  let x0 = 1e9, x1 = -1, y0 = 1e9, y1 = -1;
  for (let i = 0; i < data.length; i++) if (data[i] > 200) {
    const x = i % info.width, y = Math.floor(i / info.width);
    x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
  }
  const esq = x0, dir_ = info.width - 1 - x1, topo = y0, base = info.height - 1 - y1;
  assert.ok(Math.abs(esq - dir_) <= 1 && Math.abs(topo - base) <= 1, `glifo descentrado: ${esq}/${dir_} ${topo}/${base}`);
  assert.ok(Math.abs((x1 - x0 + 1) / info.width - lockup.glifoNoQuadrado) < 0.005);
  console.log(`r2-simbolo-1080.png: margens do glifo ${esq}/${dir_} px (laterais), ${topo}/${base} px (topo/base); largura ${((x1 - x0 + 1) / info.width * 100).toFixed(1)}%`);
}

// Pranchas de conferência: assinatura grande e no mínimo (48 px), símbolo em 256, 180, 64 e
// 32 px (o mínimo) e no recorte circular do avatar.
const sim = (x, y, lado) => `<svg x="${x}" y="${y}" width="${lado}" height="${lado}" viewBox="0 0 ${L} ${L}">${quadrado}${glifo}</svg>`;
const ass = (x, y, altura, tinta) => `<svg x="${x}" y="${y}" width="${r(altura * larguraAssinatura / L)}" height="${altura}" viewBox="0 0 ${larguraAssinatura} ${L}">${quadrado}${glifo}<g fill="${tinta}"><path d="${textoD[0]}"/><path d="${textoD[1]}"/></g></svg>`;
const prancha = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900">
<rect width="1400" height="900" fill="${cor.paper}"/>
${ass(64, 80, 112, cor.ink)}
${ass(64, 300, lockup.minimoAssinaturaTelaPx, cor.ink)}
${sim(64, 560, 256)}${sim(368, 560, 180)}${sim(596, 560, 64)}${sim(708, 560, 32)}
<defs><clipPath id="c"><circle cx="128" cy="128" r="128"/></clipPath></defs>
<svg x="1080" y="560" width="256" height="256" viewBox="0 0 256 256"><g clip-path="url(#c)">${quadrado}${glifo}</g></svg>
</svg>`;
await sharp(Buffer.from(prancha)).png().toFile(path.join(qa, 'logos-prancha.png'));
const circular = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 256 256"><defs><clipPath id="c"><circle cx="128" cy="128" r="128"/></clipPath></defs><g clip-path="url(#c)">${quadrado}${glifo}</g></svg>`;
await sharp(Buffer.from(circular)).png().toFile(path.join(qa, 'avatar-crop-circular.png'));

// Guia: grava os valores de tokens.json nos elementos marcados com data-token (texto) e
// data-token-href (href). Cada marca tem de aparecer no guia; o arquivo só é reescrito se mudar.
{
  const guiaPath = path.join(kit, 'index.html');
  const guia = await fs.readFile(guiaPath, 'utf8');
  const ler = chave => {
    const v = chave.split('.').reduce((o, k) => (o == null ? o : o[k]), tokens);
    assert.equal(typeof v, 'string', `tokens.json não tem o texto ${chave}`);
    return v;
  };
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  let marcas = 0;
  const novo = guia.replace(/<a\b([^>]*\sdata-token="[^"]+"[^>]*)>([^<]*)<\/a>/g, (_, attrs, _texto) => {
    marcas++;
    const texto = ler(attrs.match(/\sdata-token="([^"]+)"/)[1]);
    const href = attrs.match(/\sdata-token-href="([^"]+)"/);
    const a = href ? attrs.replace(/\shref="[^"]*"/, ` href="${esc(ler(href[1]))}"`) : attrs;
    return `<a${a}>${esc(texto)}</a>`;
  });
  assert.equal(marcas, (guia.match(/\sdata-token="/g) || []).length, 'data-token fora de um <a> simples no guia');
  assert.ok(marcas >= 1, 'o guia não tem nenhum data-token');
  if (novo !== guia) await fs.writeFile(guiaPath, novo);
  console.log(`index.html: ${marcas} valor(es) de tokens.json ${novo !== guia ? 'gravado(s)' : 'já em dia'}`);
}

assert.equal(sha(await fs.readFile(masterPath, 'utf8')), masterHash, 'r2-mestre.svg mudou');
console.log(`Borda visível do glifo em 256: x ${r(borda.x, 2)}–${r(borda.x + borda.w, 2)}, y ${r(borda.y, 2)}–${r(borda.y + borda.h, 2)}`);
console.log(`Escala do glifo no símbolo: ${r(k, 4)}; assinatura ${larguraAssinatura} x ${L}`);
console.log(`Linhas de base da assinatura no quadrado de ${QUADRADO_SITE} px: ${r(base1 / u, 2)} e ${r(base2 / u, 2)}`);
console.log(`r2-mestre.svg intacto (sha256 ${masterHash.slice(0, 16)}…)`);
