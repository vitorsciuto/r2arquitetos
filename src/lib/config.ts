import type { ImageMetadata } from 'astro';

/** Prefixo de todas as rotas. Vazio: o site responde na raiz do domínio. */
export const BASE = '';

export const href = (caminho = '') => `${BASE}/${caminho}`.replace(/\/+$/, '/').replace(/\/\/+/g, '/');

/** Separador de metadados: espaço inflexível antes do ponto, para nunca abrir linha com "·". */
export const SEP = ' · ';
/** Nomes que nunca quebram no fim da linha (régua §9): "São Paulo" e "r2 arquitetos", com espaço inflexível. */
export const inseparavel = (t: string) => t.replace(/São Paulo/g, 'São Paulo').replace(/r2 arquitetos/g, 'r2 arquitetos');

export const meta = (itens: (string | undefined | null)[]) => inseparavel(itens.filter((t): t is string => !!t && t.trim() !== '').join(SEP));

/** Nome no índice: abrevia títulos longos para manter a leitura da grade. */
export const nomeIndice = (d: { titulo: string; tituloCurto: string }) => (d.titulo.length > 28 ? d.tituloCurto : d.titulo);

/** A fachada do Lausanne (capas-projetos/006_cff1282f.jpg) tem uma descrição só: abertura da home,
 *  cartão do índice, og:image:alt padrão e flyer (FOTO_ALT em gerar-flyer-r2.py). */
export const LEGENDA_LAUSANNE = 'Fachada do Edifício Lausanne, de Franz Heep: venezianas vinho, verdes e cinza';

/** Foto de cada obra nos índices (home e /projetos) e na imagem de compartilhamento da página do projeto. */
export interface Quadro { pasta: string; arquivo: string; posicao: string; legenda: string }
export const quadros: Record<string, Quadro> = {
  '01': { pasta: 'home', arquivo: '002_804b1d55.jpg', posicao: '50% 30%', legenda: 'Volume branco do pavimento superior sobre a base de tijolos aparentes e caixilhos de madeira' },
  // o apartamento, não o prédio: a capa mostra o projeto do escritório
  '02': { pasta: '02-louveira-1', arquivo: '005_81f5fe68.jpg', posicao: '50% 35%', legenda: 'Sala com caixilharia recuperada, tacos de peroba e vista para as copas das árvores' },
  '04': { pasta: 'capas-projetos', arquivo: '004_1039f688.jpg', posicao: '50% 50%', legenda: 'Porta de vidro do restaurante, balcão de mármore e piso xadrez verde e branco' },
  '05': { pasta: 'capas-projetos', arquivo: '005_4605555f.jpg', posicao: '45% 50%', legenda: 'Pergolado de madeira e aço sobre as floriculturas da nova praça' },
  '06': { pasta: 'capas-projetos', arquivo: '006_cff1282f.jpg', posicao: '50% 50%', legenda: LEGENDA_LAUSANNE },
  '08': { pasta: '08-studio-bh', arquivo: '002_992e4501.jpg', posicao: '50% 50%', legenda: 'Estante de madeira com cabideiro, nichos iluminados e cozinha compacta' },
  '07': { pasta: '07-cozinha-tremembe', arquivo: '006_ad101a9f.jpg', posicao: '50% 50%', legenda: 'A cozinha vista do ambiente vizinho, sob o forro de madeira' },
};

/** Decisões de edição da Opção B sobre a curadoria: hero por projeto e enquadramento (object-position) de fotos específicas. */
export const heroB: Record<string, string> = {
  '02-louveira-1': '005_81f5fe68.jpg', // o apartamento abre a página; a fachada e o jardim do prédio descem para o fim
  // régua §7, arquitetura antes de decoração: a fachada de venezianas (002, 1500×1125, a capa da
  // curadoria) abre a página; o interior que abria (008: TV, poltronas, forro com dominante lilás)
  // desce para o corpo. A 019 (caixilho) foi descartada: luminária, vaso e poltrona em primeiro plano.
  '06-lausanne': '002_c68f4a53.jpg',
};
export const posicoes: Record<string, string> = {
  '05-praca-roosevelt/016_a11690c2.jpg': '40% 50%',
  '02-louveira-1/005_81f5fe68.jpg': '50% 35%',
  '01-casa-de-praia/001_952ee7ff.jpg': '50% 40%',
};
export const posicao = (pasta: string, arquivo: string) => posicoes[`${pasta}/${arquivo}`];

/**
 * Crédito fotográfico (régua §6: "foto: Nome"), por pasta/arquivo. Louveira: digitalizações da
 * reportagem "Patrimônio paulistano" da revista Arquitetura & Construção, cuja página de abertura
 * (publicacoes/007_244ca33d.jpg) traz "Fotos Victor Affaro".
 */
export const creditos: Record<string, string> = {
  '02-louveira-1/005_81f5fe68.jpg': 'Victor Affaro',
  '02-louveira-1/006_66a840ec.jpg': 'Victor Affaro',
  '02-louveira-1/007_aa48a8f6.jpg': 'Victor Affaro',
  '02-louveira-1/008_e864d74a.jpg': 'Victor Affaro',
  '02-louveira-1/009_a884a917.jpg': 'Victor Affaro',
  '02-louveira-1/010_52de2295.jpg': 'Victor Affaro',
};
/** Crédito de uma pasta inteira (obra fotografada por um só fotógrafo). */
export const creditosPasta: Record<string, string> = {
  '07-cozinha-tremembe': 'Renato Stockler', // metadados dos arquivos: fotos de 18/02/2026
};
export const credito = (pasta: string, arquivo: string) => creditos[`${pasta}/${arquivo}`] ?? creditosPasta[pasta];

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

/**
 * Fator de recorte de uma foto com object-fit: cover numa caixa de outra proporção (largura/altura).
 * Foto mais larga que a caixa aparece mais larga que a caixa; o arquivo escolhido pelo navegador
 * precisa acompanhar (régua §7: nunca ampliar acima de 100%).
 */
export const fatorRecorte = (img: { width: number; height: number }, caixa: number) => Math.max(1, img.width / img.height / caixa);

/** Multiplica o tamanho de cada entrada de `sizes` pelo fator de recorte (as condições de mídia ficam como estão). */
export function sizesRecorte(sizes: string, k: number): string {
  if (k <= 1.001) return sizes;
  return sizes
    .split(',')
    .map((parte) => {
      const s = parte.trim();
      const m = s.match(/^(.*\s)?(\d+(?:\.\d+)?)(vw|px)$/);
      return m ? `${m[1] ?? ''}${Math.ceil(Number(m[2]) * k)}${m[3]}` : s;
    })
    .join(', ');
}

/** Larguras responsivas sem nunca ultrapassar o original. */
export function larguras(img: ImageMetadata, base: number[] = [480, 800, 1200, 1600]): number[] {
  const ok = base.filter((w) => w <= img.width);
  if (ok.length === 0 || ok[ok.length - 1] < img.width) ok.push(img.width);
  return ok;
}

/**
 * Ordem das obras nos índices e no anterior/próximo: da mais recente para a mais antiga, pelo
 * último ano de `anos`; no empate, pelo número. O número continua sendo o da obra (URL, ficha).
 */
export function ordenarObras<T extends { data: { anos: string; numero: string } }>(lista: T[]): T[] {
  const ultimoAno = (anos: string) => Math.max(...(anos.match(/\d{4}/g) ?? ['0']).map(Number));
  return [...lista].sort((a, b) => ultimoAno(b.data.anos) - ultimoAno(a.data.anos) || a.data.numero.localeCompare(b.data.numero));
}
