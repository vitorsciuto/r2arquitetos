// Gera src/styles/brand-tokens.css a partir de marca/identidade-r2/tokens.json,
// a fonte única da identidade. Rodar depois de qualquer mudança nos tokens:
//   node scripts/gerar-tokens-css.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(await fs.readFile(path.join(root, 'marca/identidade-r2/tokens.json'), 'utf8'));
const c = tokens.colors;
const t = tokens.typography;

const css = `/* Gerado por scripts/gerar-tokens-css.mjs a partir de marca/identidade-r2/tokens.json.
   Não editar à mão. Um cinza de texto (--tinta); o cinza da marca é só gráfico. */
:root {
  --marca: ${c.brand};
  --papel: ${c.paper};
  --sur: ${c.surface};
  --branco: ${c.white};
  --tinta: ${c.ink};
  --titulo: var(--tinta);
  --cinza: var(--tinta);
  --cinza-texto: var(--tinta);
  --fio-fraco: ${c.line};
  --rotulo-tracking: ${t.labelLetterSpacing};
  --sans: '${t.family}', ${t.fallback};
}
`;

await fs.writeFile(path.join(root, 'src/styles/brand-tokens.css'), css, 'utf8');
console.log('src/styles/brand-tokens.css atualizado');

// Contatos e descritor para o site, que não pode ler marca/ (fora do git).
const k = tokens.contact;
const ts = `// Gerado por scripts/gerar-tokens-css.mjs a partir de marca/identidade-r2/tokens.json.
// Não editar à mão.
export const marca = {
  descritor: ${JSON.stringify(tokens.lockup.descritor)},
  email: ${JSON.stringify(k.email)},
  site: ${JSON.stringify(k.website)},
  siteRotulo: ${JSON.stringify(k.websiteLabel)},
  instagram: ${JSON.stringify(k.instagramUrl)},
  instagramRotulo: ${JSON.stringify(k.instagramLabel)},
  enderecoLinhas: ${JSON.stringify(k.addressLines)},
} as const;
`;
await fs.writeFile(path.join(root, 'src/data/marca.gerado.ts'), ts, 'utf8');
console.log('src/data/marca.gerado.ts atualizado');
