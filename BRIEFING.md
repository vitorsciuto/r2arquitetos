# r2arquitetos.com.br — Briefing do projeto

_Última atualização: 2026-10-03 (proposta de identidade unificada, ainda local; registro novo ao final)_

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


## DNS e hospedagem — decidido em 2026-09-17

**Correção importante sobre o e-mail.** O briefing dizia "MX → Google Workspace". O certo:
a caixa é **Google Workspace revendido pela Wix** — assinatura paga à parte, que sobreviveu à
queda do site porque são contratos separados. E o **MX mora no registro.br**, não na Wix:
o DNS do domínio sempre esteve sob controle do Vitor.

**Estado real do DNS em 2026-09-17** (medido, não presumido):
```
NS   a.sec.dns.br · c.sec.dns.br   (registro.br, zona assinada — DNSSEC ligado)
MX   1 smtp.google.com             (um único registro, não cinco)
A    nenhum · www nenhum           (por isso o domínio não responde)
TXT  nenhum                        (sem SPF, sem DKIM, sem DMARC)
```

**Hospedagem: GitHub Pages, repositório público.** O Cloudflare Pages foi descartado depois de
medir o custo real: exigiria desligar o DNSSEC e mover os nameservers do registro.br, arriscando
o e-mail do escritório — para manter privadas fotos que vão estar publicadas no site de qualquer
forma. O GitHub Pages não toca em nameserver nem no MX.

**Repositório:** `github.com/vitorsciuto/r2arquitetos` · branch **main** · 614 arquivos · 263 MB.
O acervo (`fotos-wix/`, 282 originais) e `_referencia-wix/` agora são versionados — eram o furo
do "backup de tudo". Auditado antes de publicar: sem segredos, e todas as fotos vieram de
galerias que já eram públicas no Wix.


## O que está e o que NÃO está no GitHub (2026-09-18)

**No repositório** (`github.com/vitorsciuto/r2arquitetos`, público, branch `main`):
todo o código, conteúdo, `fotos-wix/` (282 originais do acervo antigo),
`_referencia-wix/`, `marca/` (arquivos de avatar) e agora
`src/assets/fotos/07-cozinha-tremembe/` — 22 fotos, 7 MB.

**Fora do git, de propósito:**

| pasta | peso | por quê |
|---|---|---|
| `node_modules` | 455 MB | reinstala com `npm ci` |
| `dist` | 318 MB | é o build; regenera em 1 min |
| `.astro`, `graphify-out` | 273 KB | cache |
| `.claude` | 9 KB | configuração local |
| `.superpowers` | 26 MB | mockups das sessões de design (histórico) |
| **`fotos`** | **5,7 GB** | **não cabe: 22 TIFFs de 256 MB cada, e o limite rígido do GitHub é 100 MB por arquivo** |

Os 5,7 GB ficam no **Google Drive** (as pastas trazem a assinatura de exportação
dele) e o fotógrafo tem os masters — duas cópias fora daqui. O que o site usa
são as 22 `JPG_INTERNET`, reprocessadas para ≤ 2400 px com mozjpeg q86: 55 MB
viraram 7 MB sem perda visível (comparado a 100% lado a lado).

**Cozinha Tremembé** — primeiro projeto novo, fotografia profissional
(verticais corrigidas, luz controlada, tratamento de cor). Cliente e fotógrafo
autorizaram a publicação. Fotógrafo: **Renato Stockler** (renatostockler.com), fotos de 18/02/2026, conforme os metadados dos arquivos (17/10/2026).
As fotos estão versionadas mas ainda não entram em nenhuma página: falta o
texto do escritório (nome como o escritório chama, endereço/bairro, ano, o que
foi feito).

## Identidade unificada - proposta local de 03/10/2026

Pedido atual: usar o monograma enviado pelo usuário, criar aplicações e unificar
site e Instagram. A referência é uma imagem recortada de 206 x 206 pixels.

- Branch local: `codex/identidade-r2`, baseada em `origin/main` (d2a6120).
- Cinza medido na referência: `#858585`; neutros `#242424`, `#5B5B5B`,
  `#F2F2F2`, `#FAFAFA` e branco. Tokens do site em `src/styles/brand-tokens.css`.
- Monograma reconstituído por ajuste dos contornos existentes, sem texturas.
  As extremidades ausentes foram recuperadas do vetor anterior. Não é possível
  certificar essas extremidades contra um original oficial que não foi fornecido.
- Kit em `marca/identidade-r2/index.html`: SVGs, PNGs transparentes, assinaturas,
  avatares, cartão institucional PDF vetorial (90 x 50 mm, sangria 3 mm), três
  posts, um story, cinco capas de destaque, legendas e auditoria pública.
- Site: mesma estrutura, conteúdo e URLs; cor e logo atualizados. Archivo passou
  a ser hospedada localmente com licença OFL. Modo de design: evolução pontual;
  variância 5, movimento 2, densidade 3, priorizando o portfólio existente.
- Instagram @r2_arquitetos: avatar, bio e link verificados; grade de posts e
  destaques não renderizaram no acesso público. Não inferir frequência nem
  desempenho a partir desse acesso limitado. Auditoria nova substitui números
  e suposições do registro antigo para esta proposta.
- Verificação: Astro check sem erros/avisos, build com 11 páginas; cabeçalho
  inspecionado em desktop e 390 px. Cartão renderizado em PNG para revisão.
- Estado: arquivos locais, SEM push/deploy/alteração no Instagram. Aguardando
  revisão visual e projetos adicionais. A Cozinha Tremembé segue fora das
  páginas até chegar o conteúdo e o crédito fotográfico pendentes.

### Revisão de tipografia e contato (03/10/2026)

A logo foi aprovada pelo usuário. O usuário rejeitou a aparência da Archivo e o
preto intenso dos títulos. A prévia do site agora usa Work Sans (Wei Huang,
OFL1.1) regular, com corpo #616161, títulos #5F5F5F e secundário #6A6A6A.
Fonte hospedada localmente, sem alterar o monograma nem sua cor #858585.

Por pedido expresso: endereço público passa a ser Avenida Higienópolis, 101,
Higienópolis, São Paulo, SP. Contato principal e rodapé exibem apenas esse
endereço, e-mail e link rotulado Instagram. Saíram CEP, telefone, Google Maps,
Instagram duplicado e copyright. CEP e telefone também saíram dos metadados e
JSON-LD. O destino do Instagram continua sendo /r2_arquitetos/.

Astro check e build passaram; os 11 HTML foram verificados quanto aos dados
removidos. A revisão continua local. Os cartões e demais materiais da primeira
proposta aguardam a próxima orientação do usuário; não regenerar a arte nesta
rodada nem tratar as imagens antigas do guia como prova da nova tipografia.

### Refinamento e envio ao GitHub (03/10/2026)

O usuário aprovou a coerência da revisão do site e autorizou a publicação.
A direção pedida é artística e ligada à arquitetura, evitando repetições e
ornamentos acrescentados por fórmula. A tipografia, o cinza e o monograma
aprovados foram mantidos.

- O link de contato passou a exibir `@r2arquitetos`, por pedido expresso.
  O destino continua sendo o perfil verificado `instagram.com/r2_arquitetos/`.
- Os nomes dos arquitetos saíram da linha do título Escritório na home;
  continuam junto às respectivas formações.
- Saíram as amostras decorativas de materiais e as legendas redundantes da
  grade de projetos, os contadores de fotografias/documentos das galerias e
  a repetição de Diário de obra ao lado de Fase de obras.
- Astro check e build passaram. A revisão técnica confirmou que o site não
  depende dos arquivos de proposta em `marca/` nem dos geradores em `scripts/`.
- Commit `7ec65e02ddbda0ec6a6a138f35371e0b87119ea6` enviado a `origin/main`.
  O workflow `37171148820` terminou com sucesso: 11 páginas e 1.546 versões
  de imagens. Publicação verificada em `https://r2arquitetos.com.br/`, com
  Work Sans carregada, novo contato, link do perfil e título Escritório
  sem nomes repetidos.
- O kit de marca, os cartões e a fonte Archivo usada nos rascunhos continuam
  locais e aguardam a próxima decisão do usuário.

### Kit sincronizado com o site (03/10/2026)

O usuário pediu a atualização do guia e de todos os materiais após aprovar
o site. Este pedido substitui a orientação anterior de manter os rascunhos
na fonte antiga.

- Guia `marca/identidade-r2/index.html`, auditoria, tokens, instruções,
  assinaturas, cartões e modelos de Instagram atualizados para Work Sans
  regular e a paleta publicada. Fonte e licença em `fonts/` no kit.
- Monograma preservado, idêntico ao mestre do site. Os geradores de logos
  agora leem o mestre sem reescrever arquivos em `src/`.
- Telefone e CEP removidos das aplicações. Cartão com endereço, e-mail,
  site e rótulo `@r2arquitetos`, mantendo o link real `/r2_arquitetos/`.
- PDF frente/verso e PNGs revisados. Fontes Archivo antigas removidas do
  kit vigente; o acervo histórico fora do kit continua identificado como tal.
- ZIP `marca/r2-identidade-2026-10-03.zip` regenerado com 69 arquivos.
- Guia conferido no navegador em tela ampla e 390 px, com Work Sans carregada
  e sem imagens quebradas ou transbordamento horizontal. O site publicado
  permaneceu intacto nesta etapa; cartões e posts aguardam decisões finais.

### Flyer institucional (03/10/2026)

Criado a pedido do usuário: flyer A5 vertical, uma face, em
`marca/identidade-r2/flyer/`, com PDF de corte 148 x 210 mm e sangria de 3 mm,
PNG digital de 1480 x 2100 px, prévia e SVG com textos editáveis.

Composição com logo aprovada, Work Sans 400, paleta vigente e fotografia do
Edifício Lausanne (`06-lausanne/008_0567613d.jpg`), aplicada inteira a 307 ppi.
Mensagem: Arquitetura e reforma; projetos residenciais e comerciais e
acompanhamento de obras. Contatos atuais, sem telefone ou CEP. QR code e link
levam a `/projetos/`; os links de e-mail, site e perfil estão no PDF.

PDF e SVG renderizados e revisados. QR decodificado nas duas imagens PNG,
caixas de corte/sangria e links validados. Flyer integrado ao guia e ao ZIP,
agora com 76 arquivos. O gerador fica em `scripts/gerar-flyer-r2.py` e no kit.
Nenhuma alteração no site publicado ou no Instagram.

### Identificação no cartão institucional (03/10/2026)

Confirmada a decisão de não incluir nenhum telefone no cartão. Acrescentada
a expressão “arquitetura e urbanismo” abaixo do monograma na frente e
padronizada a mesma expressão no verso. Mantidos endereço sem CEP, e-mail,
site e perfil. PDF de duas páginas e prévias regenerados; prévias mostram
o corte final de 90 x 50 mm. Guia atualizado com URLs versionadas dos
cartões para carregar a arte atual. ZIP do kit regenerado.

### Documentos de contratação (04/10/2026)

Criados seis documentos locais em `documentos-r2/`: reedição da referência,
proposta adaptada, modelo de contrato, minuta específica, conferência interna
e ficha de pré-contratação. PDFs A4 com Work Sans incorporada e HTMLs
autônomos editáveis; 29 páginas conferidas. Área local em 127.0.0.1:8766,
com cópias salvas sem substituir originais. Pacote em r2-documentos.zip.

Dados e condições pendentes permanecem em campos explícitos. Contratos
são minutas para preenchimento e revisão jurídica. Arquivos de clientes
e extrações foram excluídos localmente do Git em .git/info/exclude;
não integram o site público nem o kit de marca. Nenhum envio a clientes.

## Coerência da marca em todas as peças (16/10/2026)

Pedido do Vitor: coerência visual e de texto entre site, Instagram, cartão, flyer, propostas,
contratos e fichas, com a arquitetura tratada como arte, sem cara de IA e sem frases de IA.

- **Régua** em `docs/marca/regua-da-marca.md`. **Fonte única** em
  `marca/identidade-r2/tokens.json`. `node scripts/gerar-tokens-css.mjs` gera
  `src/styles/brand-tokens.css` e `src/data/marca.gerado.ts`. Cartão, flyer, Instagram e
  documentos leem o JSON.
- **Decisões**:
  - Assinatura única em todas as peças: quadrado #858585 com o monograma a 64%, mais
    "r2 arquitetos" e "arquitetura e urbanismo".
  - Um cinza de texto (#616161); o #858585 só aparece no grafismo.
  - Escala de tamanhos única para tela, papel e Instagram.
  - O fio é o único grafismo. A cor de cada obra só aparece como fio sobre a ficha dela.
  - A ficha de obra vem dos `.md` de projeto e só quebra depois de um separador.
  - Texto de Rita e Rubens fica intacto; o texto escrito na montagem saiu ou virou recorte
    literal deles.
- **Site** (local, não publicado):
  - Assinatura e ficha seguem a régua; a cor da obra voltou como fio.
  - Saíram o filtro P&B das fotos coloridas e os travessões da montagem.
  - A abertura do Lausanne passou a ser a fachada (002_c68f4a53).
  - Entraram 404, ícones, og:image e o símbolo no JSON-LD.
  - A fonte Archivo saiu de `public/`; as amostras em `src/lib/material/` foram apagadas.
- **Cartão e flyer**:
  - Verso do cartão com a assinatura.
  - O flyer agora usa a fachada do Lausanne com ficha completa e um recorte literal do
    texto-foco do escritório, sem slogan.
- **Instagram**:
  - Família de modelos com fio da obra e ficha.
  - Capas de destaque com nome.
  - Legendas que partem de fatos e terminam na ficha.
  - Sugestão de bio no LEIA-ME. Nada foi publicado.
- **Documentos**:
  - Modelo A4 único e tabelas só com fios horizontais.
  - Contratos 03 e 04: cláusulas idênticas às de antes, conferidas cláusula a cláusula.
  - Propostas com bloco "O escritório" e obras com ficha; as condições da 064BR ficam
    literais.
  - Pacotes separados por cliente e um interno, em `documentos-r2/pacotes/`.
- **Kit**:
  - Guia reescrito como régua.
  - Logos novas; as antigas foram para `logos/historico/`.
  - Zip `marca/r2-identidade-2026-10-16.zip`; o de 03/10 foi para o backup.
- **Backup** de tudo antes das mudanças: `tmp/antes-coerencia-20261016/` (fora do git).
- **Rótulo do Instagram**: decidido em 16/10/2026, passa a ser `@r2_arquitetos`, igual ao perfil
  real, em todas as peças (site, cartão, flyer, propostas, guia).
- **Pendente com o Vitor**:
  - Publicar o site.
  - Aplicar a bio no app.
- **Pendente com Rita e Rubens**:
  - Atribuição Casa José Moreira / Ricardo Severo 1926.
  - Ano de formatura do Rubens (1988 ou 1989).
  - Três concordâncias e "Ou em como em" no texto deles.
  - Créditos fotográficos; no Louveira 1, "Victor Affaro" foi deduzido do recorte da revista.
  - Direito de usar o recorte da Folha de 1980 no Instagram.
  - "Etapas do projeto" da proposta 02: manter ou trocar por um recorte do "Serviços".
  - De que obra é a foto de interiores tirada do 02.
  - Datas vencidas da proposta 01.
  - A ficha 06 ainda serve no pacote do Barô?
  - Duração da obra: "90 dias" no 02 e "90 dias corridos" no 04.
  - Revisão 01 ou 03 do contrato 04.
- **Ajuste menor em aberto**: no celular, a página do Instagram e o índice dos documentos ainda
  usam a assinatura de 56 px com margem de 20 px. Site e guia já usam 48 px com margem de 24 px.

## Desenho inspirado no Estúdio Cedo e página da Cozinha Tremembé (17/10/2026)

Pedido: site inspirado em estudiocedo.com. Aplicado dentro da régua (Work Sans 400,
#616161, papel #F2F2F2, assinatura com respiro, ficha em toda obra, escala até 32 px).

- Cabeçalho em faixa de ponta a ponta, fixo no computador, menu em caixa-alta.
- Home: frase curta centrada (servicos.diferencial, texto do escritório), foto de abertura
  sangrando (a obra mais recente: Cozinha Tremembé, 022), grade de três colunas em retrato,
  bloco do escritório com `posicao`. O "Em destaque" do Louveira 1 saiu da home.
  O flyer continua com a frase `posicao` e a fachada do Lausanne: site e flyer não
  dividem mais a abertura.
- Índices e anterior/próximo: da obra mais recente para a mais antiga (`ordenarObras`).
  Número da obra só na URL e no arquivo; saiu dos cartões.
- Página de projeto: foto de abertura sangrando até a largura do original (régua §7),
  título e ficha lado a lado, texto à direita, figuras de margem à esquerda, galeria.
- **07 Cozinha Tremembé no ar (local)**: 14 fotos de Renato Stockler na galeria,
  crédito na ficha. **Texto provisório** (`textoProvisorio: true`), escrito a partir das
  fotos; não é texto de Rita e Rubens e não deve servir de base para legendas como se fosse.
  Trocar quando a Rita mandar o texto.
- Cópia do `src/` anterior em `tmp/antes-cedo-20261017/`.
