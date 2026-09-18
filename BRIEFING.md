# r2arquitetos.com.br — Briefing do projeto

_Última atualização: 2026-09-17 (sessão 3: versão única escolhida, Instagram auditado)_

## Objetivo

Recriar o site do escritório **r2 arquitetos** (Rita Lo Sciuto e Rubens Reis, São Paulo) que
estava no Wix e saiu do ar quando o plano premium acabou. O novo site deve:

- Ter **identidade visual autoral**, inspirada nos melhores sites de escritórios de arquitetura
  do Brasil — arquitetura é arte e identidade; **não pode parecer template nem "site de IA"**.
- Ser hospedado **de graça** (Vercel / Netlify / Cloudflare Pages / GitHub Pages).
- Usar o domínio **r2arquitetos.com.br**, já registrado no **registro.br** (DNS apontado depois).
- Reaproveitar todo o conteúdo e imagens do site Wix antigo.

## Site antigo (fonte de conteúdo)

- Ainda acessível em: https://rubens572.wixsite.com/meusite-1
- Conteúdo completo já extraído em `_referencia-wix/conteudo-wix.md` (texto de todas as páginas
  + IDs de todas as imagens) e `_referencia-wix/wix-content.json` (mesmo conteúdo, bruto).
- Screenshots de referência do layout antigo: `_referencia-wix/r2-*.jpg|png`.
- Imagens originais em alta: `https://static.wixstatic.com/media/<ID>` (baixar todas para
  `public/img/` ou equivalente; são fotos de celular ~3264×2448, 2013 — não é fotografia
  profissional, o design precisa lidar bem com isso).

### Estrutura

Home · Projetos · Escritório · Publicações · 6 páginas de projeto · rodapé com contato.

### Os 6 projetos

| # | Projeto | Local | Ano | Nota |
|---|---------|-------|-----|------|
| 01 | Casa de Praia | Caraguatatuba – Mococa | 2013 / 2014 | casa nova, 2 pavimentos |
| 02 | Edifício Louveira 1 | Higienópolis – SP | 2013 / 2014 | Vilanova Artigas 1946, tombado CONDEPHAAT 1992 |
| 03 | Edifício Louveira 2 | Higienópolis – SP | 2015 | loft para músico, obra em andamento |
| 04 | Bar e Restaurante Guanabara | Av. São João – SP | 2013 – 2014 | fundado 1910, Casa José Moreira 1926 |
| 05 | Reestruturação Urbana – Praça Roosevelt | Consolação – SP | 2007 – 2012 | urbanismo, reinaugurada 2012 |
| 06 | Edifício Lausanne | Higienópolis – SP | 2006 | Franz Heep 1953–58, tombado CONPRESP 1991 |

### Escritório

- **Rita Lo Sciuto** — nascida em 1961, FAU Mackenzie 1984
- **Rubens Reis** — nascido em 1957, FAU Mackenzie 1988
- Foco: edifícios de valor histórico/cultural de São Paulo; readequação de apartamentos
  recuperando elementos originais. Texto institucional completo no `conteudo-wix.md`.

### Publicações

15 recortes de revistas/jornais (Revista Projeto, Arquitetura e Construção, Folha de S.Paulo,
"Jornais"). Só imagens, sem texto descritivo.

### Contato

Tel 11 3231-5532 · contato@r2arquitetos.com.br · Av. Higienópolis 101, Higienópolis – SP ·
facebook.com/r2arquitetos.com.br

### Identidade visual atual (Wix)

- Logo "r2" dentro de um quadrado + "ARQUITETURA URBANISMO"
- Paleta: cinza-claro (fundo) · marrom terroso/taupe (blocos e títulos) · preto (rodapé)
- Títulos em caixa-alta com tracking largo (fonte Lulo Clean One Bold); corpo em Avenir Light
- Layout: hero com foto, "Projetos em destaque", bloco marrom com serviços, rodapé preto com form

### Lixo do Wix que NÃO pode ir para o site novo

"I'm a paragraph. Click here…", "Sou um parágrafo…", "info@mysite.com", "OUR ARCHITECTS",
"PROJECTS", "View project", "Read more", "RECENT NEWS", "Verifique em breve", datas falsas
"11 / 06 / 2023", "02/23", "3/64", "Send", "< Back to Portfolio".

## Decisões tomadas

1. **Fazer DUAS versões do site para comparar — Opção A e Opção B.**
   - **A — Evolução da identidade atual:** manter logo r2, paleta cinza/terroso/preto, caixa-alta
     com tracking largo — mas com execução muito superior: grid rigoroso, hierarquia tipográfica,
     ritmo, respiro.
   - **B — Identidade a partir do foco do escritório (patrimônio moderno paulistano):** site
     editorial e tipográfico, com sabor de publicação de arquitetura; cada projeto contado como
     história (Artigas, Heep, Guanabara de 1910). Cores/proporções tiradas das próprias obras
     (venezianas do Lausanne, painéis amarelo/vermelho do Louveira). Mantém o logo r2 como base.
   - Descartada: **C — minimalismo fotográfico** (mk27/Bernardes), porque depende de fotografia
     profissional que o escritório não tem.
2. Nada de template pronto, nada com cara de "gerado por IA". Referências: sites de escritórios
   brasileiros (studio mk27, Isay Weinfeld, Bernardes, Triptyque, Andrade Morettin, Brasil
   Arquitetura, MMBB, Una, Metro) — pela postura, não para copiar.

## Em aberto (perguntar / decidir na próxima sessão)

- Stack: HTML/CSS/JS estático puro vs. Astro (recomendação: Astro só se valer a pena para
  gerenciar projetos/imagens; senão, estático puro — zero dependência, dura para sempre).
- Hospedagem gratuita: Vercel, Netlify, Cloudflare Pages ou GitHub Pages — e como apontar o
  domínio no registro.br (registro.br aceita A/AAAA/CNAME; apex precisa de registro A).
- Formulário de contato em hospedagem estática: Netlify Forms / Formspree / Web3Forms, ou
  substituir por e-mail + WhatsApp (muito comum em escritórios brasileiros).
- Existem fotos melhores dos projetos fora do Wix? Fotos novas mudam muito o resultado.
- Publicações: manter como galeria de recortes ou pedir os PDFs/links das matérias.
- Idioma: só português (o site antigo era só PT, com sobras em inglês do template).


## Estado em 2026-08-24 (sessão 2) — decisões fechadas e construção

**Questões em aberto — resolvidas:**
- Stack: **Astro 7** (output estático). Rotas `/a/` e `/b/` durante a comparação; `/` = página de escolha.
- Hospedagem: **GitHub Pages** (repo público, build por Actions em `.github/workflows/deploy.yml`). DNS fica no registro.br.
  O domínio hoje só tem **MX → Google Workspace** (`smtp.google.com`), sem A/www, sem SPF/DKIM/DMARC, DNSSEC ligado.
  Registros a criar no registro.br (modo avançado; aceita A, AAAA, CNAME, MX, TXT, TLSA; máx. 40):
  `A @ 185.199.108.153 / 109.153 / 110.153 / 111.153` · `AAAA @ 2606:50c0:8000::153 / 8001::153 / 8002::153 / 8003::153` ·
  `CNAME www → <usuario>.github.io` · manter o MX · `TXT @ "v=spf1 include:_spf.google.com ~all"` · DKIM (Google Admin) · `TXT _dmarc "v=DMARC1; p=none; rua=mailto:contato@r2arquitetos.com.br"`.
  Depois: Settings › Pages › custom domain `r2arquitetos.com.br` + Enforce HTTPS. Vercel Hobby descartado (proíbe uso comercial); Cloudflare Pages exigiria mover os nameservers; Netlify virou plano por créditos com limite duro.
- Contato: **sem formulário**; bloco tipográfico estilo Una Arquitetos (minúsculas, e-mail sublinhado como contato principal, telefone visível). CEP verificado: **01238-001**.
- Fotos: só as do Wix. **As galerias completas foram recuperadas (247 fotos + 22 outras)** a partir do JSON interno do Wix → `fotos-wix/` (originais, ignorado pelo git; `manifest.json` com ordem/dimensões) e `src/assets/fotos/` (cópias ≤ 2000 px). Curadoria por projeto em `fotos-wix/curadoria/*.json` (= `src/data/curadoria/`).
- Publicações: 14 recortes (o 15º era um feed vazio), agrupados por veículo, com legenda.
- Retratos: nenhum. Idioma: só PT.

**Design aprovado:** fundamentos A/B e Home A/B (mockups em `.superpowers/brainstorm/1841-1787541904/content/`). Spec completa em
`docs/superpowers/specs/2026-08-24-r2arquitetos-design.md`; brief dos construtores em `docs/superpowers/plans/2026-08-24-builder-brief.md`.
Crítica adversarial das Homes (template-smell, tipografia, fotos, fidelidade) incorporada na spec §6.

**Fatos verificados (para o texto do site):**
- Louveira: coautoria Artigas **e Carlos Cascaldi** confirmada; projeto 1946, obra 1948–1950; Condephaat 1992 (Res. 44/1992). O site usa "Vilanova Artigas, 1946" como o escritório escreve — creditar Cascaldi só se o escritório quiser.
- Lausanne: Adolf Franz Heep, 1953–1958; painel de Clóvis Graciano no hall; **endereço Av. Higienópolis, 101 e 111** — ou seja, o escritório (Av. Higienópolis 101) fica **no próprio Edifício Lausanne**. Confirmar com Rita/Rubens antes de dizer isso no site.
- Guanabara: fundado em 1910 (família Ângelo Martinez, Rua Boa Vista) — confirmado; mudou para a Av. São João 128 em 1968. A atribuição "Casa José Moreira, Ricardo Severo, 1926" é texto do escritório e **não foi confirmada** por fonte externa (a Prefeitura chama o prédio de "Edifício José Moreira").
- Praça Roosevelt: inaugurada 25/01/1970, reinaugurada 29/09/2012; a participação de Rubens Reis na equipe da Emurb é citada pela Câmara Municipal e pelo Vitruvius.
- Cores do Louveira: amarelo + vermelho são originais do projeto (fontes dizem "amarelo", não "ocre").

**Perguntas pendentes para o usuário:** (1) o escritório fica no Edifício Lausanne? (2) creditar Cascaldi no Louveira? (3) Louveira 2 ainda "obra em andamento" (status de 2015)? (4) existe WhatsApp/celular do escritório? (5) usuário/organização do GitHub para criar o repositório.

**Estado da construção:** A e B prontas e revisadas (23 páginas, commit 0dbaaff, 2026-08-24); aguardando a escolha A×B e as respostas pendentes acima.

**Como rodar:** `npm ci` · `npm run dev` · `npm run build` · `npm run preview`. Screenshots de verificação: `scratchpad/shot.js` (playwright-core + Chromium local).

## Arquivos

```
r2 arquitetos/
├── BRIEFING.md                  ← este arquivo
└── _referencia-wix/
    ├── conteudo-wix.md          ← TODO o texto + IDs de imagem, legível
    ├── wix-content.json         ← mesmo conteúdo, bruto
    ├── r2-home-full.png         ← screenshot home (layout antigo)
    ├── r2-projetos-full.jpg
    ├── r2-proj1-full.jpg        ← página de projeto (Casa de Praia)
    └── r2-escritorio-full.jpg
```


## Estado em 2026-09-17 (sessão 3) — escolha feita, versão única

**A escolha A × B foi resolvida: venceu a estrutura editorial da B com a paleta da A.**
Motivo: a diagramação editorial é o que demonstra o repertório de patrimônio (autoria e datas
no índice, anúncio de época do Louveira, texto longo por projeto); a paleta da A é a identidade
que Rita e Rubens já reconhecem. Uma versão só, daqui para a frente.

**O que mudou no código:**
- `A` foi removida por inteiro (`pages/a/`, `components/a/`, `layouts/A.astro`, `styles/a.css`),
  junto com a página de escolha e o comparador `/comparar`.
- A B foi promovida à raiz: `pages/b/*` → `pages/*`, `BASE = ''`. O site responde em `/`,
  `/projetos`, `/projetos/<slug>`, `/escritorio`, `/publicacoes`, `/contato` — 11 páginas.
- O sufixo `b` saiu dos nomes: `components/b/` → `components/`, `lib/b/` → `lib/`,
  `styles/b.css` → `styles/site.css`, `layouts/B.astro` → `layouts/Base.astro`.
- A paleta virou o `:root` do `site.css`, sem tema e sem JS: fundo `#E4E1DB`, corpo `#161616`,
  taupe `#66574A` em títulos, rótulos, legendas e fios estruturais, marca em quadrado taupe
  com glifo `#F5F4F1`. Taupe mede **5,32:1** sobre o fundo (AA para texto normal).
  `--taupe2 #9B8A72` (2,6:1) e `--fio-fraco #C6C1B8` (1,4:1) seguem só como fio, nunca texto.
- **A cor de cada obra foi preservada** (`--cor`): taupe por padrão, e a cor da obra nas páginas
  de projeto — amarelo `#D4A33A` no Louveira, etc. Ela só aparece em fio, sublinhado e fundo a
  9%, nunca como texto, então não há risco de contraste.
- Favicon embutido (a B não tinha; a A já tinha).

**Instagram — auditoria de 2026-09-17 (leitura pública, sem login; confirmar os números):**
- Perfil: **@r2_arquitetos** · 338 seguidores · seguindo 1.140.
- Bio: "arquitetura, decoração, reforma e obras" + `contato@r2arquitetos.com.br` · São Paulo, SP.
- **Link na bio: `www.r2arquitetos.com.br` — hoje MORTO** (caiu junto com o Wix). Prioridade máxima.
- Posts: um em 19/08/2026; antes disso março/2023, fevereiro/2023, junho/2021.
- Dois problemas de posicionamento: a bio descreve prestador de serviço genérico, sem nada de
  patrimônio moderno paulistano; e seguir 1.140 para 338 é padrão de segue-de-volta.

**Decisões pendentes:** hospedagem no **Cloudflare Pages** (escolhida na sessão 3 — exige mover
os nameservers do registro.br, **recriando os MX do Google Workspace na Cloudflare ANTES da troca**
e desligando o DNSSEC, senão o e-mail do escritório cai). O `.github/workflows/deploy.yml` ainda
é o de GitHub Pages e dispara em `main`, enquanto o branch local é `master` — resolver junto com
a decisão de hospedagem.

**Pendências de conteúdo (só Rita e Rubens respondem):** (1) o escritório fica dentro do Edifício
Lausanne? (2) creditar Cascaldi no Louveira? (3) Louveira 2 ainda é "obra em andamento"?
(4) existe WhatsApp/celular do escritório?

**Ainda não feito:** rollout de 52 posts (2×/semana, 6 meses), cadastro nas plataformas de
captação, push para o repositório `github.com/vitorsciuto/r2arquitetos` (privado, hoje vazio),
e backup dos originais em `fotos-wix/` (156 MB, ignorados pelo git).
