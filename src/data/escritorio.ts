/** Textos institucionais — todos do escritório (conteudo-wix.md), só com correções de grafia. */

export const nome = 'r2 arquitetos';
export const nomeCompleto = 'r2 arquitetos — arquitetura · urbanismo';

export const contato = {
  endereco: ['av. higienópolis 101 · higienópolis', 'são paulo sp'],
  enderecoFormal: 'Av. Higienópolis, 101 — Higienópolis, São Paulo, SP',
  cep: '', // só entra depois de verificado
  telefone: '+55 11 3231 5532',
  telefoneHref: 'tel:+551132315532',
  email: 'contato@r2arquitetos.com.br',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Av.+Higien%C3%B3polis%2C+101+-+Higien%C3%B3polis%2C+S%C3%A3o+Paulo+-+SP',
  facebook: 'https://www.facebook.com/r2arquitetos.com.br',
};

/** Frase de posição — palavras do escritório, usada no lede (B) e na abertura (A). */
export const posicao =
  'Recuperar e requalificar os elementos arquitetônicos originais de edifícios de valor histórico e cultural de São Paulo, dentro de um novo programa que atenda às demandas atuais.';

export const foco =
  'O foco principal do escritório é a dedicação ao estudo de edifícios de valor histórico e cultural da cidade de São Paulo e ao desenvolvimento de readequação espacial de apartamentos pertencentes aos mesmos, procurando recuperar e requalificar os elementos arquitetônicos originais, dentro de um novo programa que atenda às demandas atuais dos clientes.';

export const sobre = [
  'O r2arquitetos tem profissionais que já atuaram nas áreas pública e privada, e com vasta experiência em projetos de arquitetura, urbanismo, obras e administração.',
  'O escritório tem como objetivo o atendimento das necessidades dos clientes, assessorando-os na concepção do programa de necessidades, levantamento de diretrizes, estudos de viabilidade, desenvolvimento do projeto de arquitetura, levantamento dos custos, organização dos cronogramas físico e financeiro, coordenação e compatibilização de todos os projetos complementares com o projeto de arquitetura e acompanhamento, fiscalização e administração da obra.',
  'Trabalhamos associados a empresas de engenharia e consultoria, o que garante um resultado mais abrangente e multidisciplinar.',
  foco,
];

export const servicos = {
  lista: [
    'Projetos residenciais, comerciais e urbanísticos.',
    'Reformas de apartamentos.',
    'Acompanhamento, fiscalização, administração e gerenciamento de obras.',
  ],
  diferencial: 'Nosso diferencial baseia-se na procura da valorização das características originais de edifícios históricos.',
  projeto: 'Programa de necessidades, diretrizes, estudos de viabilidade, projeto de arquitetura e coordenação e compatibilização dos projetos complementares.',
  obra: 'Levantamento de custos, cronogramas físico e financeiro, acompanhamento, fiscalização e administração da obra.',
};

export const arquitetos = [
  { nome: 'Rita Lo Sciuto', formacao: 'Faculdade de Arquitetura e Urbanismo da Universidade Mackenzie', ano: '1984', nascimento: '1961' },
  { nome: 'Rubens Reis', formacao: 'Faculdade de Arquitetura e Urbanismo da Universidade Mackenzie', ano: '1988', nascimento: '1957' },
];

export const menu = [
  { rotulo: 'Projetos', href: 'projetos' },
  { rotulo: 'Escritório', href: 'escritorio' },
  { rotulo: 'Publicações', href: 'publicacoes' },
  { rotulo: 'Contato', href: 'contato' },
];
