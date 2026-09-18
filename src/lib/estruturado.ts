/**
 * Dados estruturados (JSON-LD) — schema.org.
 *
 * Servem para o Google entender que existe um escritório de arquitetura num
 * endereço, com dois sócios e um perfil no Instagram, em vez de só um site com
 * fotos. O `ArchitecturalFirm` alimenta o bloco de mapa nas buscas locais; a
 * trilha alimenta o caminho que aparece abaixo do título no resultado.
 *
 * Tudo aqui sai de `data/escritorio.ts` — nenhum dado é repetido à mão.
 */
import { arquitetos, contato, endereco, foco, nome, nomeCompleto } from '../data/escritorio';

const SITE = 'https://r2arquitetos.com.br';

/** URL absoluta de um arquivo (imagem): preservada como está. */
const absArquivo = (caminho: string) => new URL(caminho, SITE).href;

/** URL absoluta de uma página: sempre com barra final, igual ao <link rel="canonical">. */
const absPagina = (caminho: string) => new URL(caminho.endsWith('/') ? caminho : `${caminho}/`, SITE).href;

/** O escritório. Vai em toda página: é a mesma entidade, identificada por @id. */
export function escritorioJsonLd(logo?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ArchitecturalFirm',
    '@id': `${SITE}/#escritorio`,
    name: nome,
    alternateName: nomeCompleto,
    description: foco,
    url: SITE,
    ...(logo ? { logo: absArquivo(logo), image: absArquivo(logo) } : {}),
    email: contato.email,
    telephone: contato.telefone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: endereco.logradouro,
      addressLocality: endereco.cidade,
      addressRegion: endereco.uf,
      postalCode: endereco.cep,
      addressCountry: endereco.pais,
    },
    areaServed: { '@type': 'City', name: endereco.cidade },
    knowsAbout: [
      'Patrimônio arquitetônico moderno paulistano',
      'Readequação de apartamentos em edifícios tombados',
      'Restauro e requalificação de elementos originais',
      'Arquitetura e urbanismo',
    ],
    founder: arquitetos.map((a) => ({
      '@type': 'Person',
      name: a.nome,
      jobTitle: 'Arquiteto',
      alumniOf: { '@type': 'CollegeOrUniversity', name: a.formacao },
    })),
    sameAs: [contato.instagram, contato.facebook],
  };
}

/** Trilha de navegação — só nas páginas internas; a home não tem trilha. */
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
