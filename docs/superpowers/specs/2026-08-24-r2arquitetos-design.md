# r2arquitetos.com.br — Especificação de design e construção

_2026-08-24 · aprovado pelo usuário: stack, hospedagem, contato, fotos, publicações, retratos, fundamentos A/B e Home A/B ("faça o resto, aprovado"). Esta spec incorpora a crítica adversarial dos revisores (template-smell, tipografia, fotografia, fidelidade ao briefing) — ver "Correções pós-crítica"._

## 1. Objetivo e regra inegociável

Recriar o site do escritório r2 arquitetos (Rita Lo Sciuto e Rubens Reis, Higienópolis, SP) em **duas versões completas, A e B**, para comparação lado a lado. Nada pode parecer template nem "site de IA". Referência de postura: mk27, Isay Weinfeld, Bernardes, Triptyque, Andrade Morettin, Brasil Arquitetura, MMBB, Una, Metro. Só português. Fotos: apenas as do Wix (celular, 2013) — o design assume isso.

## 2. Decisões fechadas

| Tema | Decisão |
|---|---|
| Stack | **Astro** (7.x), output estático. Uma camada de conteúdo, dois conjuntos de layouts. |
| Rotas | `/a/...` e `/b/...` durante a comparação; a escolhida vira raiz depois. `/` = página de escolha (só durante a comparação). |
| Hospedagem | **GitHub Pages** (repositório público; build por GitHub Actions). DNS fica no registro.br: 4 A + 4 AAAA no apex + CNAME `www`. MX do Google Workspace **não é tocado**; adicionar SPF/DKIM/DMARC. |
| Contato | **Sem formulário.** Bloco tipográfico estilo Una: minúsculas, linhas empilhadas, e-mail sublinhado (contato principal), telefone visível. No rodapé de todas as páginas + página `/contato` curta. |
| Fotos | Só as do Wix. 269 originais em `fotos-wix/` (arquivo, ignorado pelo git); cópias ≤ 2000 px em `src/assets/fotos/` (commitadas). Curadoria por projeto em `fotos-wix/curadoria/*.json`. |
| Publicações | Galeria de 14 recortes agrupados por veículo (Revista Projeto, Arquitetura & Construção, Folha/sãopaulo, jornais), legenda veículo + ano quando legível. |
| Retratos | Nenhum. Escritório é tipográfico. |
| Logo | O mesmo "r2" no quadrado, redesenhado em SVG. A: quadrado taupe; B: quadrado tinta. |

## 3. Conteúdo (fonte: `_referencia-wix/conteudo-wix.md`)

Páginas: Home · Projetos · 6 páginas de projeto · Escritório · Publicações · Contato.

Projetos (ordem e numeração são **estruturais** — URL, prev/próximo, número na página):

| Nº | slug | Título | Local | Original | r2 |
|---|---|---|---|---|---|
| 01 | `casa-de-praia` | Casa de Praia | Caraguatatuba, Praia da Mococa | casa nova | 2013–2014 |
| 02 | `louveira-1` | Edifício Louveira 1 | Higienópolis, São Paulo | Vilanova Artigas, 1946 · tombado Condephaat 1992 | 2013–2014 |
| 03 | `louveira-2` | Edifício Louveira 2 | Higienópolis, São Paulo | Vilanova Artigas, 1946 | 2015 (status "obra em andamento" do Wix é de 2015 — confirmar) |
| 04 | `guanabara` | Bar e Restaurante Guanabara | Av. São João, centro | Casa José Moreira, Ricardo Severo, 1926 · restaurante fundado em 1910 | 2013–2014 |
| 05 | `praca-roosevelt` | Praça Roosevelt | Consolação | praça de 1970 | reestruturação urbana 2007–2012 (estudos desde 1990) |
| 06 | `lausanne` | Edifício Lausanne | Higienópolis, São Paulo | Franz Heep, 1953–1958 · tombado Conpresp 1991 | 2006 |

Regras de texto:
- Todo texto vem do escritório. **Nenhuma frase inventada.** As únicas reescritas permitidas são correções de grafia/gramática (EDiFÍCIO → Edifício; "Inaugura em 1970" → "Inaugurada em 1970"; "a lajes" → "as lajes") e cortes.
- Lede da Home B e frase de posição da Home A = palavras do escritório: "Recuperar e requalificar os elementos arquitetônicos originais de edifícios de valor histórico e cultural de São Paulo, dentro de um novo programa que atenda às demandas atuais."
- Remover todo o lixo do Wix (lista no BRIEFING.md) e "Verifique em breve".
- **Não usar** "View project / Read more / Continuar lendo / Ver todos": o nome do projeto é o link.
- Autoria do Louveira: "Vilanova Artigas, 1946" como o escritório escreve. Cascaldi só se o escritório confirmar.
- Legenda do anúncio do Louveira: "Anúncio da Imobiliária Itaoca para o Condomínio Louveira, '2 apartamentos por andar' — sem data." (o anúncio diz "já construído"; não é de lançamento; 1946 é a data do projeto).
- Frase "a três quadras do Louveira e do Lausanne": **removida** (invenção). Av. Higienópolis, 101 pode ser o próprio Edifício Lausanne — perguntar ao usuário; se confirmado, vira "no Edifício Lausanne".
- CEP: **01238-001** (verificado — lado ímpar da Av. Higienópolis). Entra na segunda linha do bloco de contato.
- Datas: travessão curto sem espaços, "2013–2014". Aspas curvas “ ”. Separador de metadados: " · " com espaço inflexível **antes** do ponto (nunca abre linha com "·").

Bloco de contato (ambas as opções, minúsculas, como a Una):
```
av. higienópolis 101 · higienópolis
são paulo sp · 01238-001
+55 11 3231 5532

contato@r2arquitetos.com.br   ← sublinhado, mailto
```

## 4. Opção A — Evolução da identidade atual

**Postura:** sóbrio, institucional, de Higienópolis; o mesmo escritório, feito com rigor.

- **Cores:** fundo `#E4E1DB` · superfície `#F5F4F1` · linhas `#C6C1B8` · taupe-claro (títulos, fios) `#9B8A72` · taupe (blocos) `#66574A` · preto (rodapé) `#161616`. Nenhuma cor nova.
- **Tipografia:** Figtree, uma família. Escala travada: **34 / 22 / 16 / 13 / 11 px**. Pesos: 300 só em 34 e 22 px; 400 no corpo ≤ 16 px; 500/600 nas caixas-altas. **Dois trackings**: títulos em caixa-alta `.14em`, rótulos/legendas em caixa-alta `.18em`. Sem opacidade em texto: rótulos e legendas em `#66574A` (contraste ≥ 4.5:1), metadados em `#161616` 13 px.
- **Rótulos:** um único estilo de rótulo, usado só onde a navegação não nomeia a seção. Nada de "eyebrow" sobre cada parágrafo.
- **Grid:** 12 colunas, gutter 24 px, margens 88 px em 1360 (6,5 %), máx. 1440, base 8 px. Seções: 96–112 px de respiro.
- **Fotos:** sempre dentro do grid, nunca em tela cheia; proporções **5:4 / 4:5** (documentos em proporção nativa). Sem filtros CSS. Uma foto de celular nunca ultrapassa 8 colunas, exceto imagens que sobrevivem à ampliação (fachada do Louveira, letreiros).
- **Home A:** cabeçalho (logo + "ARQUITETURA URBANISMO" + menu) → **foto de abertura: fachada do Louveira** (home-003), 5:4, colunas 1–8, com a frase de posição do escritório (34 px, 300) nas colunas 10–12 e legenda "Edifício Louveira 1 — Artigas, 1946" → **índice dos 6 projetos** (não "destaques": são só seis, não há "ver todos"), grade 3 + 3, foto 5:4, título em caixa-alta taupe 13 px `.14em`, metadados 13 px preto; cada projeto aparece **uma vez** → Escritório (parágrafo do foco a 22 px, nomes com formação) → **faixa taupe** com a lista de serviços do escritório em 16 px (o bloco marrom, evoluído) → rodapé preto com contato + menu.
- **Página de projeto A:** cabeçalho; número + local em rótulo; título em caixa-alta taupe (22–34 px); ficha (original · tombamento · intervenção · anos) em 13 px; foto hero 5:4 em 8 colunas + ficha nas 4 restantes; texto em 2 colunas de ~60 caracteres (cols 1–6 / 7–12) ou uma coluna de 7 se curto; **destaques** em grade 2 colunas 5:4 (com 4:5 ocupando 2 linhas quando retrato); **documentos** (anúncios, recortes, plantas) em proporção nativa, com legenda; **capítulos** quando existirem (Roosevelt: Nova praça 2012 / Antiga praça anos 70 / Estudos e projetos 1990–2007 / Fase de obras) como sub-rótulos; **obra** como tira de miniaturas 4:3 (até 12) em uma linha rolável; prev/próximo por número.
- **Projetos A:** mesma grade 3 + 3 da Home, com todos os 6 (a Home pode repetir a grade — mk27 faz isso).
- **Escritório A:** faixa taupe com "Sobre o escritório" → texto institucional em 2 colunas → "Arquitetos": Rita / Rubens, formação e ano, sem foto → serviços (Projeto / Obra) como texto corrido.
- **Publicações A:** grade 3 colunas de recortes em proporção nativa, agrupados por veículo com rótulo; legenda veículo · ano.
- **Contato A:** o bloco Una em escala grande (22 px), + link "Google Maps".

## 5. Opção B — Editorial · patrimônio moderno paulistano

**Postura:** uma publicação sobre o patrimônio moderno de São Paulo, escrita por quem o restaura. A lista é o site.

- **Cores:** papel `#F3EFE6` · tinta `#1B1B1B` · concreto `#B9B6AE`. **Cor de cada obra**, tirada da foto, com função estrutural: 01 Casa de Praia madeira `#8A5A2B` · 02 Louveira ocre `#D4A33A` · 03 Louveira 2 preto-caixilho `#2B2B2B` · 04 Guanabara verde `#1F6B4A` · 05 Roosevelt roxo `#6E2A72` · 06 Lausanne vinho `#5A2A31`. Onde a cor trabalha: fio da seção e do cabeçalho da página do projeto, sublinhado dos links dessa página, faixa de hover/ativo da linha do índice, o número. **Nada de swatch decorativo**: no índice, o "quadrado" é um **recorte real 1:1 do material** (veneziana ocre, veneziana vinho, piso verde, pergolado…), 40 px.
- **Tipografia:** Jost (caixa-alta) + Newsreader (leitura). Escala travada: **46 / 30 / 20 / 16 / 13 / 11 px**. Jost sempre peso 400. **Trackings:** título de projeto 30 px `.08em`; nomes no índice 22 px `.10em`; rótulos/ficha 11 px `.18em`; wordmark `.18em`. Newsreader 400 no corpo (18 px / 1.6, coluna de 64 caracteres) e 46 px no lede. **Itálico só uma vez por página** (nunca em metadados); legendas em romano 13 px com rótulo Jost. Sem capitular. Sem "Fig. n" (a legenda basta). Sem folio decorativo.
- **Grid:** mancha máx. 1180 px; **7/5** (colunas 7fr / 5fr, gap 56 px) mantido em todas as seções; margens 96 px em 1360.
- **Fotos:** 5:4 paisagem / 4:5 retrato; documentos em proporção nativa, **preto e branco + `mix-blend-mode: multiply`** sobre o papel (sem sépia, sem moldura). Sem filtros de cor. Fotos de obra em tira "diário de obra" em preto e branco, pequenas.
- **Home B:** cabeçalho com fio duplo (logo + "r2 arquitetos / arquitetura · urbanismo", wordmark `.18em`) → linha sob o fio: "Higienópolis, São Paulo" · "edifícios de valor histórico e cultural · projeto e obra" → **lede** = frase do escritório, Newsreader 46 px, largura da coluna 7 (sem itálico) → **índice dos 6 projetos** (7 colunas): número · recorte 1:1 do material · nome em Jost 22 px `.10em` · metadados em romano 16 px (original, ano, bairro, intervenção, anos; sem quebrar antes de "·"); **a foto (5 colunas, 4:5) troca com a linha ativa** — hover no desktop, toque no celular; 6 recortes 4:5 pré-definidos: 01 volume branco (cp-034/home-002), 02 fachada (capa-003), 03 interior pronto do loft (lv2-014/017), 04 fachada/salão do Guanabara, 05 pergolado (capa-005), 06 venezianas (capa-006) → **Em destaque**: Louveira com **foto de interior** (tacos/pastilhas — o que o texto conta), texto em 20 px, e o anúncio da Itaoca em multiply, legenda correta; sem "continuar lendo" (título é o link); o fio da seção na cor ocre → Escritório (parágrafo do escritório + colofão com os dois nomes) → rodapé com fio duplo e contato Una.
- **Página de projeto B:** número + local em rótulo Jost; título Jost 30 px `.08em`; ficha em 11 px `.18em` (uma linha; quebra permitida só depois de "·"); fio do cabeçalho **na cor da obra**; hero 5:4 na largura das 7 colunas ou 4:5 nas 5 colunas conforme a foto; texto em Newsreader 18 px, coluna de 64 caracteres, com **figuras** intercaladas (documentos e destaques) — figura grande = largura 7+5, figura de margem = 5 colunas; **capítulos** como títulos de seção Jost 11 px sobre fio (Roosevelt tem 4); **diário de obra**: tira p&b; prev/próximo por número com a cor do próximo.
- **Projetos B:** o mesmo índice da Home, com todas as 6 fotos visíveis (grade 3 colunas 4:5 + legenda), sem hover.
- **Escritório B:** texto do escritório em coluna de leitura (lede a 20 px), colofão com formação, serviços como parágrafo.
- **Publicações B:** "hemeroteca": por veículo, lista tipográfica (veículo · título legível · ano) com o recorte ao lado em multiply.
- **Contato B:** bloco Una em Newsreader 20 px, Google Maps como link.

## 6. Correções pós-crítica (aplicadas nesta spec)

1. A e B: escala de tamanhos travada; dois trackings por opção; sem opacidade em texto; peso 400 em corpo ≤ 16 px.
2. A: hero deixa de ser Casa de Praia 21:9 (recorte apaga a arquitetura); passa a Louveira 5:4 em 8 colunas. Casa de Praia aparece uma vez (no índice). Sem "destaques + ver todos": a Home lista os seis. Sem "Nosso diferencial". Serviços vão para a faixa taupe e para Escritório.
3. B: sem capitular, sem "Fig. n", sem "continuar lendo", sem folio decorativo; itálico só no lede... e o lede passa a ser frase do escritório, sem itálico. Cores das obras com função (fios, hover, recorte de material). Índice com troca de foto. Louveira em destaque com interior. Anúncio em multiply, sem sépia, legenda correta.
4. Conteúdo: "a três quadras" removido; Cascaldi removido até confirmação; CEP condicionado à verificação; datas com travessão curto; nbsp antes de "·".
5. Proporções: 5:4 / 4:5 em todo o site; documentos nativos.

## 7. Arquitetura do projeto

```
r2 arquitetos/                      ← raiz do repositório (git)
├── astro.config.mjs                 site: https://r2arquitetos.com.br
├── package.json                     astro, sharp
├── src/
│   ├── content.config.ts            coleção `projetos` (glob de src/content/projetos/*.md)
│   ├── content/projetos/NN-slug.md  frontmatter (numero, slug, titulo, local, bairro, original, tombamento, intervencao, anos, cor) + texto
│   ├── data/
│   │   ├── escritorio.ts            textos institucionais, arquitetos, contato
│   │   ├── publicacoes.ts           14 recortes: veículo, título, ano?, arquivo
│   │   └── curadoria/*.json         cópia da curadoria (hero, capa, destaques, documentos, capitulos, obra) por projeto
│   ├── assets/fotos/<pasta>/        cópias ≤ 2000 px (Astro/sharp gera variantes)
│   ├── assets/logo-r2.svg
│   ├── lib/fotos.ts                 import.meta.glob das fotos + helper que resolve `arquivo` → ImageMetadata
│   ├── styles/base.css              reset mínimo, fontes (Google Fonts), utilitários comuns
│   ├── layouts/A.astro  layouts/B.astro
│   ├── components/a/*  components/b/*   (cabeçalho, rodapé, contato, figura, índice, diário de obra…)
│   └── pages/
│       ├── index.astro              página de escolha A | B (temporária)
│       ├── a/{index, projetos/index, projetos/[slug], escritorio, publicacoes, contato}.astro
│       └── b/{idem}.astro
├── public/CNAME                     r2arquitetos.com.br (depois da escolha)
├── .github/workflows/deploy.yml     withastro/action → GitHub Pages
├── docs/superpowers/specs/          esta spec
├── BRIEFING.md
├── fotos-wix/  _referencia-wix/  .superpowers/   ← gitignored
```

- Imagens: `<Picture>`/`<Image>` de `astro:assets` com `widths=[480, 800, 1200, 1600]`, formatos `avif, webp`, `loading="lazy"` exceto hero, `sizes` por slot. Documentos: `format="webp"` sem recorte.
- Zero JS por padrão. Único script: troca de foto do índice (B) — progressivo: sem JS, a foto fixa é a do 02.
- Acessibilidade: `alt` = legenda; contraste ≥ 4.5:1 em texto; foco visível; `lang="pt-BR"`.
- SEO: `<title>` por página, `description`, `og:image` (capa), sitemap.
- Sem analytics, sem cookies, sem fontes de terceiros além do Google Fonts (ou self-host se o usuário preferir).

## 8. Verificação

- Build local (`astro build`) sem erros; `astro preview` para comparação.
- Screenshots de todas as páginas de A e B em 1360 e 390 px (mobile) → revisão visual minha + rodada de críticos (template-smell, tipografia, fotos, fidelidade).
- Checklist de conteúdo: nenhum texto-modelo do Wix; todas as 6 páginas de projeto com texto completo; 14 recortes; contato correto em todas as páginas; nenhum fato não verificado (Cascaldi/CEP/Lausanne 101) publicado sem confirmação.
- Lighthouse ≥ 95 em performance/acessibilidade nas páginas de projeto (fotos pesadas).

## 9. Depois da escolha

Promover a versão escolhida para a raiz (`/`), remover a outra e a página de escolha, `public/CNAME`, workflow de deploy, registros DNS no registro.br (documentados no BRIEFING), SPF/DKIM/DMARC.
