# Coerência da marca r2 arquitetos: a régua

_16/10/2026. Pedido do Vitor: coerência visual e de texto entre todas as peças (site, Instagram,
cartão, flyer, propostas, contratos, fichas), com a arquitetura tratada como arte, sem cara de IA
e sem frases de IA. Base: a auditoria de 16/10/2026, com 34 conflitos conferidos._

Os valores numéricos estão em `marca/identidade-r2/tokens.json`, que é a **fonte única**.
`src/styles/brand-tokens.css` é gerado dele por `node scripts/gerar-tokens-css.mjs`.
Todo gerador (cartão, flyer, Instagram, documentos) lê cores, contatos e formatos desse JSON e
não fixa valores no código.

## 1. O que muda e por quê, em uma linha

A base visual já era comum (Work Sans 400, cinzas, monograma). O problema era cada peça decidir
sozinha a assinatura, o descritor, os fios, a ficha e a voz, e o texto escrito na montagem soar
como folheto. Esta régua fixa essas decisões uma vez.

## 2. Assinatura e símbolo

- **Assinatura**: quadrado `#858585` com o monograma branco. À direita, a 0,25 do lado do
  quadrado, duas linhas em tinta: `r2 arquitetos` (corpo) e `arquitetura e urbanismo` (pequeno).
  O bloco de texto fica centrado na altura do quadrado. É a montagem do site publicado, que
  passa a valer para todas as peças.
- **Símbolo**: só o quadrado com o monograma. Para avatar, favicon, frente do cartão e marca
  pequena nos posts.
- O glifo ocupa 64% da largura do quadrado, centrado pela borda visível do desenho, não pela
  caixa do viewBox.
- Respiro mínimo ao redor: metade do lado do quadrado.
- Tamanho mínimo: o símbolo sozinho, quadrado de 32 px na tela e 8 mm no papel; a assinatura,
  quadrado de 48 px e 10 mm, para o descritor não ficar abaixo de 12 px ou 7 pt.
- No celular, a assinatura usa o quadrado de 48 px com as linhas a 14 px e 12 px (a mesma proporção
  do quadrado de 56 px com 16 px e 14 px no computador).
- **Descritor único**: `arquitetura e urbanismo`. Some `arquitetura · urbanismo` e qualquer outro.
- **Proibido**: monograma solto sem quadrado, `r2` digitado no lugar do desenho, outra cor de
  quadrado, contorno, sombra, textura.
- O vetor do monograma é `marca/identidade-r2/logos/r2-mestre.svg` (= `src/assets/logo-r2.svg`).
  Ele não muda.

## 3. Cor

| Token | Valor | Uso |
|---|---|---|
| tinta | `#616161` | **todo** texto: título, corpo, legenda, rótulo |
| marca | `#858585` | só gráfico: quadrado, fios estruturais, sublinhado de link; nunca texto |
| fio fraco | `#CCCCCC` | divisões internas, linhas de tabela |
| papel | `#F2F2F2` | fundo de tela, cartão, flyer, Instagram |
| branco | `#FFFFFF` | glifo; folha dos documentos A4 |

Um cinza de texto só. `#5F5F5F` e `#6A6A6A` deixam de existir; eram indistinguíveis de
`#616161` (1,03:1 e 1,15:1). A hierarquia vem do tamanho, da caixa e do espaço.
Única exceção: sobre o fundo `#858585` (frente do cartão, avatar) o texto é branco.

**Cor da obra**: cada obra tem a sua (`tokens.json → obras`). Ela aparece **só como fio** no
topo da ficha daquela obra (2 px na tela, 1 pt no papel, 6 px no Instagram), em qualquer peça que
apresente a obra: página de projeto, índice, post, flyer, referência em proposta. Nunca é texto
nem fundo.

## 4. Tipografia

Work Sans, peso 400, sem itálico, sem negrito.

| Papel | Tela | Papel | Instagram (1080) |
|---|---|---|---|
| título | 30 px (celular 26), tracking −0,02em | 20 pt | 64 px |
| subtítulo | 23 px (celular 21) | 13 pt | 48 px |
| leitura | 19 px | 11 pt | 36 px |
| corpo | 16 px, entrelinha 1,6 | 9,5 pt, entrelinha 1,45 | — |
| pequeno (legenda, ficha, navegação) | 14 px | 8 pt | 30 px |
| rótulo, caixa-alta, tracking 0,06em | 12 px | 7 pt | 26 px |

Não há outros tamanhos. O 13 px vira 14 ou 12, conforme o papel. O 32 px vira 30.

## 5. Fios, o único elemento gráfico

- Tela: 1 px `#858585` sob o cabeçalho; 2 px `#858585` no topo de cada seção; 1 px `#CCCCCC`
  entre itens.
- Papel: 0,5 pt `#858585` sob o cabeçalho; 1 pt `#858585` no topo de cada seção; 0,5 pt
  `#CCCCCC` entre linhas de tabela.
- Fios sempre na largura da mancha, nunca da página ou da janela.
- Tabelas só com fios horizontais. Sem grade, sem célula com fundo cinza, sem caixa.
- Sem cantos arredondados, sombras, gradientes, ícones, emojis, botões pílula.

## 6. Ficha de obra e legenda

**Ficha** é o modelo de voz da marca. Formato:

`Edifício Lausanne · Franz Heep, 1953–1958 · tombado pelo Conpresp em 1991 · reforma de apartamento, projeto e obra em quatro meses · 2006`

- **Fonte única**: os campos `original`, `tombamento`, `intervencao` e `anos` de
  `src/content/projetos/<pasta>.md`. Site, flyer, Instagram e documentos leem dali; nenhum gerador
  escreve a ficha à mão.
- **Quebra**: a ficha só quebra depois de um separador, que fica no fim da linha. Um item nunca se
  parte ao meio. Exceção: um item sozinho mais largo que a coluna (no celular, numa coluna estreita)
  quebra depois da sua própria vírgula.
- **Forma curta**: só no Instagram, quando a ficha passaria de três linhas. A intervenção vai até a
  primeira vírgula (recorte literal) e a legenda traz a ficha completa.

- Ordem: obra · autor, anos · tombamento (órgão e ano) · intervenção · ano(s) da intervenção.
  O que não se aplica sai (a Casa de Praia não tem autor externo nem tombamento).
- Separador ` · ` com espaço inflexível antes. Meia-risca (–) nos intervalos de anos. Sem ponto
  final.
- Só fatos já verificados. **Não** usar em peça nova: a atribuição "Casa José Moreira, Ricardo
  Severo, 1926" (não confirmada), o ano de formatura de Rubens Reis (as fontes divergem), a ideia
  de que o escritório fica no Edifício Lausanne.

**Legenda de foto**: o que se vê, curto, sem ponto final. Crédito quando houver
(`foto: Nome`). Foto de origem desconhecida não entra.

## 7. Fotografia

- Cores originais. Nenhum filtro P&B em foto colorida. Documento de época que já é P&B fica como é.
- Correções permitidas: balanço de branco, verticais, recorte.
- Nunca ampliar acima de 100% na tela. No papel, mínimo de 240 ppi efetivos.
- Arquitetura antes de decoração: fachada, estrutura, material, luz. Evitar primeiro plano com
  objetos pessoais (TV, banqueta, vaso, revistas).
- Preferir as fotos que a curadoria do site já escolheu (`src/data/curadoria/*.json`).

## 8. Voz

**Texto de Rita e Rubens não é reescrito.** Origem: `_referencia-wix/conteudo-wix.md` e
`wix-content.json`. Mesmo quando soa genérico ("vasta experiência", "Nosso diferencial…"), é a voz
deles; só grafia e pontuação se corrigem. Se algo deles precisar mudar, vai para a lista de
perguntas, não para o arquivo. Para saber se um trecho é deles: procurar a frase nesses dois
arquivos.

**Texto novo** (escrito na montagem) segue estas regras:

- Parte de um fato verificável: obra, autor, ano, material, medida, etapa, prazo.
- Sem adjetivo de marketing (único, exclusivo, sofisticado, atemporal, harmonioso, icônico).
- Sem tríade ritmada, sem par de frases nominais com ponto ("Materiais recuperados. Memória
  preservada."), sem slogan.
- Sem pergunta retórica, sem "Conheça", "Descubra", "Explore", sem "não é só X, é Y", sem fecho
  motivacional.
- Sem travessão como pausa; usar vírgula, dois-pontos ou parênteses. Título sem ponto final.
- Sem emoji. Hashtag só de lugar ou obra, no máximo três.
- **Nome**: `r2 arquitetos`, sempre em minúsculas, com artigo masculino como no texto do
  escritório ("o r2 arquitetos", "do r2 arquitetos"). `R2 Arquitetos Ltda.` só na qualificação
  jurídica e nas assinaturas de contratos e aceites. Para retomar: "o escritório".
- **Documento de cliente fala com o cliente** ("você"). Exceção: escopo e condições de proposta que
  vêm de documento do próprio escritório têm efeito quase contratual e ficam no texto literal dele. Nota interna, de conferência ou de
  revisão nunca aparece em documento de cliente. Pendência vira campo marcado `[a confirmar: …]`.
- Quando faltar uma frase, um recorte literal do texto do escritório (supressão de trechos, sem
  trocar palavras) é melhor que uma frase nova.

Bons exemplos já existentes:

- "Franz Heep, 1953–1958 · tombado pelo Conpresp em 1991 · reforma de apartamento, projeto e obra em quatro meses · 2006"
- "Tijolos maciços com marca 'M9B' retirados da demolição"
- "o projeto propôs a construção de um grande balcão de 13 metros de comprimento"
- "Tacos de peroba · pastilhas · caixilhos"
- "Se ainda não tiver alguma informação, indique 'a confirmar'."

Exemplos a eliminar: "A mesma marca, em cada aplicação."; "Recuperar. Requalificar. Habitar.";
"Arquitetura e reforma."; "Conheça os projetos."; "Materiais recuperados. Memória preservada.";
"Pensando em construir, reformar ou transformar um ambiente?"; "arquitetura, decoração, reforma e
obras."; "Referência visual de interiores" (foto anônima).

## 9. Contatos

- `contato@r2arquitetos.com.br`
- `r2arquitetos.com.br` (sem www; sem https no impresso)
- Instagram: `@r2_arquitetos`, igual ao perfil real (decisão do Vitor em 16/10/2026). Todas as
  peças leem o rótulo de `contact.instagramLabel` e o link de `contact.instagramUrl`.
- Endereço em duas linhas: `Avenida Higienópolis, 101` / `Higienópolis, São Paulo, SP`. Nunca
  quebrar "São Paulo".
- Sem telefone e sem CEP.

## 10. Peças

**Site.** Assinatura com o descritor novo. Um cinza de texto. Escala única (§4), com tokens de
nome igual ao valor. Rótulo com tracking 0,06em. Cor da obra reativada como fio da ficha (página
do projeto e índice). Sem filtro P&B em foto colorida. Fios na mancha. Texto da montagem que
alterou o texto do escritório volta ao original. JSON-LD com o símbolo como `logo`. `og:image`
horizontal, `og:image:alt`, página 404 da marca, `apple-touch-icon`. A fonte Archivo, rejeitada,
sai de `public/`.

**Cartão (90 × 50 mm).** Frente: símbolo grande sobre `#858585` sangrado e o descritor. Verso:
assinatura pequena, fio, contatos.

**Flyer (A5).** Assinatura; foto de arquitetura com fio da cor da obra e ficha completa; recorte
literal do texto-foco do escritório; contatos; QR para `/projetos/`. Sem título-slogan, sem
"Conheça".

**Instagram.** Uma família de modelos: margem de 72 px; foto que não passa de 100%; faixa de
papel com fio da cor da obra, rótulo, nome da obra e ficha; símbolo no canto inferior direito,
alinhado à margem. Story com zonas seguras de 250 px. Capas de destaque com o nome do destaque em tinta, 48 px,
sobre papel, com fio de 6 px `#858585`; o símbolo fica só no avatar e nos posts.
Legendas: começam pelo fato e terminam na ficha. Bio: sugestão em texto para o Vitor aplicar; nada
é publicado.

**Documentos A4.** Um modelo para todos: folha branca, margens 16/20/18 mm, coluna 170 mm.
Cabeçalho com assinatura (quadrado de 12 mm) e rótulo do tipo à direita (PROPOSTA, CONTRATO,
MODELO DE CONTRATO, FICHA, USO INTERNO). Fio sob o cabeçalho, título, linha de referência, seções com fio e rótulo,
tabelas com fios horizontais. Rodapé `r2 arquitetos · contato@r2arquitetos.com.br` e
`referência · n/N`.
- Propostas: prosa para o cliente na voz do escritório. Bloco "O escritório" com o texto-foco
  (recorte literal) e Rita e Rubens com formação, sem ano. Duas ou três obras com foto e ficha.
  Nenhuma foto anônima.
- Contratos 03 e 04: **só o visual muda**. O texto das cláusulas fica idêntico; conferir por
  extração de texto antes e depois. O 04 é documento de cliente editado à mão: não regenerar do
  gerador, ajustar no próprio HTML e reimprimir.
- Conferência 05: marcada como uso interno e superada nos pontos em que contradiz os contratos
  atuais. A revisão jurídica não é refeita.
- Pacotes: cada cliente no seu; material interno à parte.

**Guia.** Vira a régua: marca, cor, tipo, fios, rótulo, ficha, fotografia, voz, contatos,
documentos, Instagram, impressão. Títulos são nomes de seção, não frases de efeito. Exemplos
certos e errados lado a lado.

## 11. Fora do escopo (só Rita, Rubens ou o Vitor decidem)

- Publicar o site (push em `main` dispara o deploy), mexer no Instagram, enviar qualquer coisa a
  cliente.
- Fatos não confirmados (§6) e a página da Cozinha Tremembé (falta texto do escritório e crédito
  do fotógrafo).
- Qualquer mudança em texto de Rita e Rubens.
