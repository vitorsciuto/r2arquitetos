import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projetos = defineCollection({
  loader: glob({ base: './src/content/projetos', pattern: '*.md' }),
  schema: z.object({
    numero: z.string(), // "01".."06" — estrutural: URL, prev/próximo, número na página
    slug: z.string(),
    titulo: z.string(),
    tituloCurto: z.string(),
    subtitulo: z.string().optional(),
    local: z.string(),
    bairro: z.string(),
    cidade: z.string(),
    tipo: z.string(),
    original: z.string().default(''), // "Vilanova Artigas, 1946"
    autorOriginal: z.string().default(''),
    anoOriginal: z.string().default(''),
    tombamento: z.string().default(''),
    intervencao: z.string(),
    anos: z.string(), // "2013–2014"
    cor: z.string(), // cor da obra (Opção B)
    corNome: z.string(),
    pasta: z.string(), // src/assets/fotos/<pasta>
    resumo: z.string(),
  }),
});

export const collections = { projetos };
