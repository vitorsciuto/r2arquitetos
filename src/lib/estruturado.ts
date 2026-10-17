/**
 * Dados estruturados (JSON-LD), schema.org.
 *
 * Servem para o Google entender que existe um escritório de arquitetura num
 * endereço, com dois sócios e um perfil no Instagram, em vez de só um site com
 * fotos. O `ArchitecturalFirm` alimenta o bloco de mapa nas buscas locais; a
 * trilha alimenta o caminho que aparece abaixo do título no resultado.
 *
 * Tudo aqui sai de `data/escritorio.ts`; nenhum dado é repetido à mão.
 * `logo` e `image` são o símbolo em PNG (/r2-simbolo.png, gerado no build de lib/simbolo.ts).
 * Nenhuma foto de obra entra aqui: ao lado do endereço, ela daria a entender que o
 * escritório fica naquele edifício.
 */
import { arquitetos, contato, endereco, foco, nome, nomeCompleto, servicos } from '../data/escritorio';

const SITE = 'https://r2arquitetos.com.br';

/** URL absoluta de um arquivo (imagem): preservada como está. */
const absArquivo = (caminho: string) => new URL(caminho, SITE).href;

/** URL absoluta de uma página: sempre com barra final, igual ao <link rel="canonical">. */
const absPagina = (caminho: string) => new URL(caminho.endsWith('/') ? caminho : `${caminho}/`, SITE).href;

/** O escritório. Vai em toda página: é a mesma entidade, identificada por @id. */
export function escritorioJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ArchitecturalFirm',
    '@id': `${SITE}/#escritorio`,
    name: nome,
    alternateName: nomeCompleto,
    description: foco,
    url: SITE,
    logo: absArquivo('/r2-simbolo.png'),
    image: absArquivo('/r2-simbolo.png'),
    email: contato.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: endereco.logradouro,
      addressLocality: endereco.cidade,
      addressRegion: endereco.uf,
      addressCountry: endereco.pais,
    },
    areaServed: { '@type': 'City', name: endereco.cidade },
    // nas palavras do escritório: o foco e a lista de serviços
    knowsAbout: [
      'estudo de edifícios de valor histórico/cultural da cidade de São Paulo',
      'readequação espacial de apartamentos',
      ...servicos.lista.map((s) => s.replace(/\.$/, '')),
    ],
    founder: arquitetos.map((a) => ({
      '@type': 'Person',
      name: a.nome,
      jobTitle: a.cargo,
      alumniOf: { '@type': 'CollegeOrUniversity', name: a.formacao },
    })),
    sameAs: [contato.instagram, contato.facebook],
  };
}

/** Trilha de navegação: só nas páginas internas; a home não tem trilha. */
export function trilhaJsonLd(itens: { nome: string; caminho: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nome,
      item: absPagina(item.caminho),
    })),
  };
}
