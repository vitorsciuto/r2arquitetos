import type { ImageMetadata } from 'astro';

/** Prefixo de todas as rotas. Vazio: o site responde na raiz do domínio. */
export const BASE = '';

export const href = (caminho = '') => `${BASE}/${caminho}`.replace(/\/+$/, '/').replace(/\/\/+/g, '/');

/** Separador de metadados: espaço inflexível antes do ponto — nunca abre linha com "·". */
export const SEP = ' · ';
export const meta = (itens: (string | undefined | null)[]) => itens.filter((t): t is string => !!t && t.trim() !== '').join(SEP);

/** Nome no índice: o título completo, salvo quando não cabe em uma linha de Jost 22 px (05 → "Praça Roosevelt"). */
export const nomeIndice = (d: { titulo: string; tituloCurto: string }) => (d.titulo.length > 28 ? d.tituloCurto : d.titulo);

/** Recortes 1:1 do material de cada obra (40 px no índice), cortados das próprias fotos. */
const materiais = import.meta.glob<{ default: ImageMetadata }>('/src/lib/material/*.jpg', { eager: true });
export function material(numero: string): ImageMetadata {
  const mod = materiais[`/src/lib/material/${numero}.jpg`];
  if (!mod) throw new Error(`Recorte de material não encontrado: src/lib/material/${numero}.jpg`);
  return mod.default;
}

/** Quadro 4:5 de cada obra no índice da Home (pré-definido; troca com a linha ativa). */
export interface Quadro { pasta: string; arquivo: string; posicao: string; legenda: string }
export const quadros: Record<string, Quadro> = {
  '01': { pasta: 'home', arquivo: '002_804b1d55.jpg', posicao: '50% 30%', legenda: 'Volume branco do pavimento superior sobre a base de tijolos aparentes e caixilhos de madeira' },
  '02': { pasta: 'capas-projetos', arquivo: '003_0d0a1121.jpg', posicao: '50% 40%', legenda: 'Fachada do Edifício Louveira: venezianas amarelas e painéis vermelhos entre as árvores' },
  '03': { pasta: '03-louveira-2', arquivo: '017_a1c17070.jpg', posicao: '50% 45%', legenda: 'Divisória de vidro com caixilhos pretos junto ao pilar revestido, vista para a rua' },
  '04': { pasta: 'capas-projetos', arquivo: '004_1039f688.jpg', posicao: '50% 50%', legenda: 'Porta de vidro do restaurante, balcão de mármore e piso xadrez verde e branco' },
  '05': { pasta: 'capas-projetos', arquivo: '005_4605555f.jpg', posicao: '45% 50%', legenda: 'Pergolado de madeira e aço sobre as floriculturas da nova praça' },
  '06': { pasta: 'capas-projetos', arquivo: '006_cff1282f.jpg', posicao: '50% 50%', legenda: 'Fachada do Edifício Lausanne: venezianas vinho, verdes e cinza de Franz Heep' },
};

/** Decisões de edição da Opção B sobre a curadoria: hero por projeto e enquadramento (object-position) de fotos específicas. */
export const heroB: Record<string, string> = {
  '03-louveira-2': '017_a1c17070.jpg', // a única imagem quase concluída e icônica do loft (a 014 tem entulho e escada no canto)
};
export const posicoes: Record<string, string> = {
  '03-louveira-2/014_1eb3fc3a.jpg': '0% 50%',   // recorta o entulho da direita
  '05-praca-roosevelt/016_a11690c2.jpg': '40% 50%',
  '02-louveira-1/005_81f5fe68.jpg': '50% 35%',
  '01-casa-de-praia/001_952ee7ff.jpg': '50% 40%',
};
export const posicao = (pasta: string, arquivo: string) => posicoes[`${pasta}/${arquivo}`];

/** Capítulos: normaliza os títulos vindos da curadoria ("Nova praça - 2012" → "Nova praça, 2012"). */
export function tituloCapitulo(t: string): string {
  return t
    .toLowerCase()
    .replace(/^fase de obras$/, 'Fase de obras')
    .replace(/^nova praça - 2012$/, 'Nova praça, 2012')
    .replace(/^antiga praça - anos 70$/, 'Antiga praça, anos 1970')
    .replace(/^estudos e projetos 1990 \/ 2007$/, 'Estudos e projetos, 1990–2007')
    .replace(/^(\w)/, (c) => c.toUpperCase());
}

/** Larguras responsivas sem nunca ultrapassar o original. */
export function larguras(img: ImageMetadata, base: number[] = [480, 800, 1200, 1600]): number[] {
  const ok = base.filter((w) => w <= img.width);
  if (ok.length === 0 || ok[ok.length - 1] < img.width) ok.push(img.width);
  return ok;
}
