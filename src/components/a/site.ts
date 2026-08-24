/** Helpers da Opção A — prefixo de rotas, separadores, capas do índice, legendas corrigidas. */
import type { CollectionEntry } from 'astro:content';

export const BASE = '/a';

/** href('') → '/a/' · href('projetos/louveira-1') → '/a/projetos/louveira-1/' */
export function href(caminho = ''): string {
  const limpo = caminho.replace(/^\/+|\/+$/g, '');
  return limpo ? `${BASE}/${limpo}/` : `${BASE}/`;
}

/** Separador de metadados: espaço inflexível antes do ponto — nunca abre linha com "·". */
export const SEP = ' · ';
export function meta(partes: (string | undefined | null)[]): string {
  return partes
    .filter((p): p is string => !!p && p.trim() !== '')
    .map(semQuebraEmDatas)
    .join(SEP);
}

/** "2013–2014" nunca quebra no travessão (word joiner dos dois lados). */
export function semQuebraEmDatas(texto: string): string {
  return texto.replace(/(\d)–(\d)/g, '$1⁠–⁠$2');
}

/** Troca ' · ' simples pelo separador inflexível (textos de src/data). */
export function fixarSep(texto: string): string {
  return texto.replace(/ · /g, SEP);
}

/** Aspas retas simples de legendas → aspas curvas. */
export function aspas(texto: string): string {
  return texto.replace(/'([^']+)'/g, '“$1”');
}

/** Nome usado no índice e no prev/próximo (títulos longos usam o título curto). */
export function nomeIndice(p: CollectionEntry<'projetos'>): string {
  return p.data.titulo.length > 32 ? p.data.tituloCurto : p.data.titulo;
}

/** "tombado pelo Condephaat em 1992" → "Condephaat em 1992" (corte, não reescrita). */
export function tombamentoCurto(t: string): string {
  return t.replace(/^tombad[oa] pel[oa] /i, '');
}

/** Título de capítulo da curadoria → sub-rótulo: "FASE DE OBRAS" → "Fase de obras"; "1990 / 2007" → "1990–2007". */
export function tituloCapitulo(t: string): string {
  let s = t.trim();
  if (s === s.toUpperCase()) s = s.charAt(0) + s.slice(1).toLowerCase();
  s = s.replace(/\s*\/\s*/g, '–').replace(/\s-\s/g, SEP);
  return s;
}

/** Capa de cada projeto no índice (Home e Projetos) — uma aparição por projeto, 5:4. */
export interface Capa { pasta: string; arquivo: string; legenda: string; posicao?: string }
export const capas: Record<string, Capa> = {
  'casa-de-praia': {
    pasta: '01-casa-de-praia', arquivo: '002_e334deef.jpg',
    legenda: 'Fachada frontal com porta pivotante de madeira, vidros e passeio de pedras sobre o gramado',
  },
  'louveira-1': {
    pasta: '02-louveira-1', arquivo: '002_be6b14ee.jpg',
    legenda: 'Letreiro “Louveira” na marquise revestida de pastilhas',
  },
  'louveira-2': {
    pasta: '03-louveira-2', arquivo: '017_a1c17070.jpg',
    legenda: 'Divisória de vidro com caixilhos pretos junto ao pilar revestido, vista para a rua', posicao: '50% 30%',
  },
  guanabara: {
    pasta: '04-guanabara', arquivo: '009_b66571d9.jpg',
    legenda: 'Salão com pilares e vigas recuperados, mesas de madeira e piso xadrez verde e branco', posicao: '50% 65%',
  },
  'praca-roosevelt': {
    pasta: 'capas-projetos', arquivo: '005_4605555f.jpg',
    legenda: 'Pergolado de madeira e aço com as floriculturas envidraçadas sob o vão',
  },
  lausanne: {
    pasta: '06-lausanne', arquivo: '002_c68f4a53.jpg',
    legenda: 'Fachada do Edifício Lausanne com as venezianas coloridas em contraplongée',
  },
};

/** Hero por projeto quando a curadoria pede recorte (Louveira 2: a foto 014 tem entulho; 017 é a imagem-síntese). */
export const heroOverride: Record<string, string> = {
  '03-louveira-2': '017_a1c17070.jpg',
};

/** Fotos fora da grade de destaques — a curadoria (src/data/curadoria) não é editada aqui, então o corte é local.
 *  Guanabara 014: “detalhe do balcão” tremida e estourada — sai da grade, sem reordenar o resto. */
export const destaquesExcluidos: Record<string, string[]> = {
  '04-guanabara': ['014_53fe2146.jpg'],
};

/** Legendas corrigidas pela spec (§3). Chave: pasta/arquivo. */
export const legendasCorrigidas: Record<string, string> = {
  '02-louveira-1/001_bf69186d.png':
    'Anúncio da Imobiliária Itaoca para o Condomínio Louveira, “2 apartamentos por andar” — sem data.',
};

export function legenda(pasta: string, arquivo: string, original: string): string {
  return legendasCorrigidas[`${pasta}/${arquivo}`] ?? aspas(original);
}

/** Largura mínima para uma foto entrar na grade de destaques (abaixo disso só em miniatura). */
export const LARGURA_MINIMA_DESTAQUE = 640;
