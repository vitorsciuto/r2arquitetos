import type { ImageMetadata } from 'astro';

/**
 * Todas as fotos do site (cópias ≤ 2000 px em src/assets/fotos/<pasta>/<arquivo>).
 * Uso: foto('02-louveira-1', '003_e088de5f.jpg') → ImageMetadata para <Image>/<Picture>.
 */
const glob = import.meta.glob<{ default: ImageMetadata }>('/src/assets/fotos/**/*.{jpg,jpeg,png}', { eager: true });

const porCaminho = new Map<string, ImageMetadata>();
for (const [caminho, mod] of Object.entries(glob)) {
  porCaminho.set(caminho.replace('/src/assets/fotos/', ''), mod.default);
}

export function foto(pasta: string, arquivo: string): ImageMetadata {
  const chave = `${pasta}/${arquivo}`;
  const img = porCaminho.get(chave);
  if (!img) throw new Error(`Foto não encontrada: src/assets/fotos/${chave}`);
  return img;
}

export function fotoOpcional(pasta: string, arquivo?: string | null): ImageMetadata | null {
  if (!arquivo) return null;
  return porCaminho.get(`${pasta}/${arquivo}`) ?? null;
}

/** Lista todos os arquivos de uma pasta, na ordem da galeria original (prefixo NNN_). */
export function fotosDaPasta(pasta: string): { arquivo: string; img: ImageMetadata }[] {
  return [...porCaminho.entries()]
    .filter(([k]) => k.startsWith(pasta + '/'))
    .map(([k, img]) => ({ arquivo: k.slice(pasta.length + 1), img }))
    .sort((a, b) => a.arquivo.localeCompare(b.arquivo));
}

export type Orientacao = 'paisagem' | 'retrato' | 'quadrado';
export function orientacao(img: ImageMetadata): Orientacao {
  const r = img.width / img.height;
  return r > 1.08 ? 'paisagem' : r < 0.92 ? 'retrato' : 'quadrado';
}

/** Curadoria por projeto (fotos-wix/curadoria/*.json copiada para src/data/curadoria). */
export interface FotoCurada { arquivo: string; legenda: string; orientacao: Orientacao; nota?: string }
export interface Documento extends FotoCurada { tipo: 'anuncio' | 'recorte-jornal' | 'foto-historica' | 'planta' | 'croqui' | 'render' | 'outro'; transcricao?: string }
export interface Capitulo { titulo: string; de: string; ate: string }
export interface Curadoria {
  pasta: string;
  capa: FotoCurada;
  hero: FotoCurada;
  destaques: FotoCurada[];
  documentos: Documento[];
  capitulos: Capitulo[];
  obra: FotoCurada[];
  descartadas: { arquivo: string; motivo: string }[];
  slides_titulo: { arquivo: string; texto: string }[];
}

const curadorias = import.meta.glob<{ default: Curadoria }>('/src/data/curadoria/*.json', { eager: true });
export function curadoria(pasta: string): Curadoria {
  const mod = curadorias[`/src/data/curadoria/${pasta}.json`];
  if (!mod) throw new Error(`Curadoria não encontrada: src/data/curadoria/${pasta}.json`);
  return mod.default;
}

/** Devolve as fotos de um capítulo (entre `de` e `ate`, inclusive), excluindo slides-título e descartadas. */
export function fotosDoCapitulo(pasta: string, cur: Curadoria, cap: Capitulo): FotoCurada[] {
  const todas = fotosDaPasta(pasta).map((f) => f.arquivo);
  const i0 = todas.indexOf(cap.de), i1 = todas.indexOf(cap.ate);
  if (i0 < 0 || i1 < 0) return [];
  const excluir = new Set([...cur.slides_titulo.map((s) => s.arquivo), ...cur.descartadas.map((d) => d.arquivo)]);
  const legendas = new Map<string, FotoCurada>();
  for (const f of [...cur.destaques, ...cur.obra, ...cur.documentos, cur.hero, cur.capa]) legendas.set(f.arquivo, f);
  return todas
    .slice(i0, i1 + 1)
    .filter((a) => !excluir.has(a))
    .map((a) => legendas.get(a) ?? { arquivo: a, legenda: '', orientacao: orientacao(foto(pasta, a)) });
}
