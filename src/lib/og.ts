/**
 * Recorte horizontal das fotos de compartilhamento (og:image), na proporção 1200×630.
 * Recorta o maior retângulo possível no enquadramento pedido (object-position em %)
 * e só reduz: a saída nunca passa da resolução do original (régua §7).
 */
export interface Recorte { left: number; top: number; width: number; height: number; saidaL: number; saidaA: number }

const PROPORCAO = 630 / 1200;

function percentuais(posicao?: string): [number, number] {
  const m = (posicao ?? '').match(/(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/);
  return m ? [Number(m[1]) / 100, Number(m[2]) / 100] : [0.5, 0.5];
}

export function recorteOg(largura: number, altura: number, posicao?: string): Recorte {
  let width = largura;
  let height = Math.round(largura * PROPORCAO);
  if (height > altura) { height = altura; width = Math.round(altura / PROPORCAO); }
  const [px, py] = percentuais(posicao);
  const left = Math.round((largura - width) * px);
  const top = Math.round((altura - height) * py);
  const saidaL = Math.min(1200, width);
  const saidaA = Math.round(saidaL * PROPORCAO);
  return { left, top, width, height, saidaL, saidaA };
}
