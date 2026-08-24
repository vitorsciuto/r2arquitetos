# r2arquitetos.com.br — Briefing do projeto

_Última atualização: 2026-08-23 (sessão 1: levantamento + decisão de direção)_

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
