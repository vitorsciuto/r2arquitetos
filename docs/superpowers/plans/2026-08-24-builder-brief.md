# Brief de construção — versões A e B (Astro 7)

Você constrói **uma** das duas versões do site r2arquitetos.com.br (a que o seu prompt indica: A ou B). A outra está sendo construída em paralelo por outro agente; **não toque nos arquivos dela nem nos arquivos compartilhados**.

## Leia antes de escrever qualquer código (nesta ordem)

1. `docs/superpowers/specs/2026-08-24-r2arquitetos-design.md` — a especificação. A seção da sua opção (4 ou 5) e a seção 6 ("Correções pós-crítica") mandam.
2. `.superpowers/brainstorm/1841-1787541904/content/01-fundamentos-v3.html` e `02-home.html` — os mockups aprovados pelo cliente (HTML/CSS reais; abra e leia o CSS da sua opção). São a referência visual — **mas onde a spec §6 corrige o mockup, a spec vence** (ex.: A não usa hero 21:9; B não usa capitular, "Fig. n", "continuar lendo", folio decorativo, itálico em metadados).
3. `BRIEFING.md` — contexto, lixo do Wix a excluir, referências.
4. Os dados: `src/content/projetos/*.md` (coleção `projetos`), `src/data/escritorio.ts`, `src/data/publicacoes.ts`, `src/data/curadoria/*.json` (hero, capa, destaques, documentos, capitulos, obra por projeto) e o helper `src/lib/fotos.ts` (`foto(pasta, arquivo)`, `curadoria(pasta)`, `fotosDoCapitulo`, `orientacao`).
5. `src/styles/base.css`, `src/assets/logo-r2.svg` (usa `currentColor` no quadrado e `--logo-fg` no "r2"), `src/pages/index.astro` (página de escolha, não mexer).

## O que entregar (só nestes caminhos — X = a ou b)

```
src/styles/X.css                       tokens (cores, escala tipográfica travada, trackings), tipografia, grid, utilitários da opção
src/layouts/X.astro                    <html lang="pt-BR">, <head> (charset, viewport, title, description, og:title/description/image, link Google Fonts com preconnect, sitemap), skip-link, cabeçalho, <main>, rodapé com o bloco de contato estilo Una
src/components/X/*.astro               Cabecalho, Rodape, Contato (bloco Una), Figura (Picture + legenda), IndiceProjetos, DiarioObra, Capitulo, PrevProximo, etc.
src/pages/X/index.astro                Home (conforme spec §4/§5, com as correções §6)
src/pages/X/projetos/index.astro       lista dos 6 projetos
src/pages/X/projetos/[slug].astro      getStaticPaths pela coleção; texto completo (render(entry)); hero; ficha; destaques; documentos; capítulos; diário de obra; prev/próximo por número
src/pages/X/escritorio.astro
src/pages/X/publicacoes.astro          14 recortes, agrupados por veículo, legenda veículo · título · ano (quando houver)
src/pages/X/contato.astro
```

Links internos sempre com o prefixo da opção (`/a/...` ou `/b/...`); defina uma constante `BASE = '/a'` no layout/lib da sua opção. O logo do cabeçalho leva à Home da opção.

## Regras técnicas

- Astro 7.2, output estático. Coleções: `getCollection('projetos')`, ordenar por `numero`; corpo com `render(entry)` → `<Content />`.
- Imagens: `import { Picture } from 'astro:assets'` com `src={foto(pasta, arquivo)}`, `widths={[480, 800, 1200, 1600]}`, `formats={['avif', 'webp']}`, `sizes` coerente com o slot, `alt={legenda}`, `loading="lazy"` (hero: `loading="eager"` e `fetchpriority="high"`). Nunca ampliar acima do original (as cópias têm ≤ 2000 px). Recortes 5:4 / 4:5 via CSS (`aspect-ratio` + `object-fit: cover`); documentos em proporção nativa. Na B, documentos em p&b com `mix-blend-mode: multiply` sobre o papel (sem sépia, sem moldura).
- Tipografia: só as fontes da spec (A: Figtree; B: Jost + Newsreader), via Google Fonts com `display=swap`. Escala travada e dois trackings — nada fora da escala. Sem `opacity` em texto. Corpo ≤ 16 px em peso 400.
- Separadores de metadados: " · " com `&nbsp;` antes do ponto (ou `<span class="sep">`), nunca abrindo linha. Datas com travessão curto sem espaços. Aspas curvas.
- Zero JavaScript no cliente, exceto (só na B) a troca da foto do índice ao passar o mouse/tocar na linha — vanilla, progressivo (sem JS a foto do 02 fica fixa), ≤ 30 linhas.
- CSS: um arquivo `X.css` global importado no layout + `<style>` escopado nos componentes quando fizer sentido. Mobile first; breakpoints em 720 e 1080 px; em telas estreitas o grid vira 1 coluna, fotos ocupam a largura, o índice da B empilha (foto acima da lista). Nada de frameworks CSS.
- Acessibilidade: contraste ≥ 4.5:1 em todo texto; `alt` = legenda; foco visível; hierarquia de headings correta (um `h1` por página); `<nav aria-label>`; links de prev/próximo com o nome do projeto.
- Conteúdo: **nenhuma frase inventada** — só o que está em `src/content`, `src/data` e na spec. Nada de "Ver todos / Read more / Continuar lendo / View project". Sem retratos. Sem formulário. Só português.
- Não edite: `src/content/**`, `src/data/**`, `src/lib/**`, `src/styles/base.css`, `src/assets/**`, `astro.config.mjs`, `src/pages/index.astro`, nem nada da outra opção. Se precisar de um helper novo, crie em `src/components/X/` ou `src/lib/X/`.

## Verificação (obrigatória antes de devolver)

1. `npx astro check` sem erros nos seus arquivos e `npx astro build` concluído (a primeira build gera centenas de variantes de imagem: pode levar alguns minutos — é normal).
2. Sirva o build (`npx astro preview --port 4331` para A, `4332` para B — em background) e tire screenshots de **todas as suas páginas** em 1360 px e em 390 px com:
   `node "C:/Users/Vitor/AppData/Local/Temp/claude/C--Users-Vitor-Documents-Rita-r2-arquitetos/bb4b39da-bf7b-4a40-8431-11b3a31de157/scratchpad/shot.js" <url> <saida.png> <largura> 1`
   (salve em `.screens/` dentro do seu diretório de trabalho — está no .gitignore). Páginas: home, projetos, os 6 projetos, escritório, publicações, contato → 22 screenshots.
3. **Olhe os screenshots** (Read) e corrija: quebras feias, linhas iniciando com "·", fotos esticadas/ampliadas demais, contraste, hierarquia, espaçamento inconsistente, textos fora da escala. Faça pelo menos duas rodadas de correção. Pergunte-se a cada tela: "isso parece template ou site de IA?" — se sim, conserte (ver critérios em `docs/superpowers/specs/...` §6 e no arquivo de crítica `C:/Users/Vitor/AppData/Local/Temp/claude/C--Users-Vitor-Documents-Rita-r2-arquitetos/bb4b39da-bf7b-4a40-8431-11b3a31de157/scratchpad/critica-home.txt`).
4. Ao final, mate o preview e devolva: lista de arquivos criados, resultado de `astro check`/`build`, caminhos dos screenshots finais, e uma lista honesta de pendências/limitações.
