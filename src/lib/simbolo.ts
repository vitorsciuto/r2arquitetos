/**
 * Símbolo da marca: quadrado #858585 com o monograma branco (régua §2).
 *
 * O vetor do monograma (src/assets/logo-r2.svg = marca/identidade-r2/logos/r2-mestre.svg)
 * não muda. Aqui ele é só reposicionado: o desenho visível ocupa 64% da largura do
 * quadrado e fica centrado pela borda visível, não pela caixa do viewBox.
 *
 * Medidas do desenho no viewBox de 256 (getBBox dos dois traços, 16/10/2026):
 *   x 33,604–222,346 (largura 188,742) · y 55,800–200,204 · centro (127,975; 128,002)
 * No viewBox original ele ocupa 73,7% da largura; a escala abaixo leva a 64%.
 *
 * Usado no cabeçalho, no favicon e nos PNG do símbolo (/r2-simbolo.png,
 * /apple-touch-icon.png, /favicon-32.png), para que todos saiam do mesmo desenho.
 */
import logoRaw from '../assets/logo-r2.svg?raw';

/** Proporção do glifo no quadrado (tokens.json → lockup.glifoNoQuadrado). */
export const GLIFO_NO_QUADRADO = 0.64;

const LADO = 256;
const LARGURA_DESENHO = 188.742;
const CENTRO_X = 127.975;
const CENTRO_Y = 128.002;

const tracos = [...logoRaw.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
if (tracos.length !== 2) throw new Error('logo-r2.svg: esperava dois traços no monograma');

const escala = (GLIFO_NO_QUADRADO * LADO) / LARGURA_DESENHO;
const transformacao = `translate(${LADO / 2} ${LADO / 2}) scale(${escala.toFixed(5)}) translate(${-CENTRO_X} ${-CENTRO_Y})`;

interface Opcoes {
  /** cor do quadrado; aceita var(--marca) no HTML, hexadecimal nos arquivos */
  fundo?: string;
  /** cor do monograma */
  glifo?: string;
  /** atributos extras no <svg> (classe, aria) */
  atributos?: string;
}

/** SVG do símbolo, quadrado, sem medidas fixas (o tamanho vem do CSS ou do rasterizador). */
export function simboloSvg({ fundo = '#858585', glifo = '#FFFFFF', atributos = '' }: Opcoes = {}): string {
  const caminhos = tracos.map((d) => `<path d="${d}"/>`).join('');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LADO} ${LADO}"${atributos ? ' ' + atributos : ''}>` +
    `<rect width="${LADO}" height="${LADO}" style="fill:${fundo}"/>` +
    `<g style="fill:${glifo}" transform="${transformacao}">${caminhos}</g>` +
    `</svg>`
  );
}
