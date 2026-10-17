# Marca r2 arquitetos

O kit vigente está em `identidade-r2/`. O guia `identidade-r2/index.html` reúne as
regras para qualquer peça.

- Fonte única dos valores: `identidade-r2/tokens.json`. O CSS do site sai dele por
  `node scripts/gerar-tokens-css.mjs`; a assinatura e o símbolo, por
  `node scripts/gerar-logos-r2.mjs`, que também grava no guia o rótulo e o link do
  Instagram. O guia repete os outros valores à mão: conferir depois de cada mudança.
- Regras completas: `docs/marca/regua-da-marca.md`.
- Logos: `identidade-r2/logos/` (assinatura e símbolo). As versões que deixaram de
  valer estão em `identidade-r2/logos/historico/`.
- Pacote para enviar: `r2-identidade-2026-10-16.zip`, com `identidade-r2/` sem `qa/` e
  sem `logos/historico/`. Depois de regerar qualquer peça, montar um pacote novo.

O pacote de 03/10/2026 (`r2-identidade-2026-10-03.zip`) saiu desta pasta e está em
`tmp/antes-coerencia-20261016/`. Os avatares soltos nesta pasta (`r2-avatar-*`) são
acervo de 03/10/2026. Não usar em peça nova.
