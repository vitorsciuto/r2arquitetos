/**
 * Textos institucionais. Os parágrafos (`foco`, `sobre`, `servicos`) são do escritório
 * (_referencia-wix/conteudo-wix.md), só com correções de grafia e pontuação.
 * `posicao` é um recorte literal de `foco` (só supressão de trechos).
 */

import { marca } from './marca.gerado';
import { inseparavel } from '../lib/config';

export const nome = 'r2 arquitetos';
/** Descritor único da assinatura (régua §2), lido de tokens.json → lockup.descritor. */
export const descritor = marca.descritor;
export const nomeCompleto = `${nome} · ${descritor}`;

/**
 * Contatos (régua §9). Vêm de tokens.json → contact através de src/data/marca.gerado.ts,
 * gerado por scripts/gerar-tokens-css.mjs (o site não lê marca/identidade-r2/, que está fora do git).
 */
export const contato = {
  enderecoFormal: marca.enderecoLinhas.join(', '),
  /** endereço em duas linhas, sem quebrar "São Paulo" (espaço inflexível) */
  enderecoLinhas: marca.enderecoLinhas.map(inseparavel),
  email: marca.email,
  facebook: 'https://www.facebook.com/r2arquitetos.com.br',
  instagram: marca.instagram,
  instagramRotulo: marca.instagramRotulo,
};

/** Endereço em partes, para os dados estruturados (JSON-LD). */
export const endereco = {
  logradouro: 'Avenida Higienópolis, 101',
  bairro: 'Higienópolis',
  cidade: 'São Paulo',
  uf: 'SP',
  pais: 'BR',
};

export const foco =
  'O foco principal do escritório é a dedicação ao estudo de edifícios de valor histórico/cultural da cidade de São Paulo e ao desenvolvimento de readequação espacial de apartamentos pertencentes aos mesmos, procurando recuperar e requalificar os elementos arquitetônicos originais, dentro de um novo programa que atenda às demandas atuais dos clientes.';

/**
 * Frase de abertura da home e descrição da home: recorte literal de `foco` (o trecho final foi
 * suprimido, nenhuma palavra trocada). É o mesmo recorte do flyer (FOCO em gerar-flyer-r2.py).
 */
export const posicao =
  'O foco principal do escritório é a dedicação ao estudo de edifícios de valor histórico/cultural da cidade de São Paulo e ao desenvolvimento de readequação espacial de apartamentos pertencentes aos mesmos, procurando recuperar e requalificar os elementos arquitetônicos originais.';

export const sobre = [
  'O r2 arquitetos tem profissionais que já atuaram nas áreas pública e privada, e com vasta experiência em projetos de arquitetura, urbanismo, obras e administração.',
  'O escritório tem como objetivo o atendimento das necessidades dos clientes, assessorando-os na concepção do programa de necessidades, levantamento de diretrizes, estudos de viabilidade, desenvolvimento do projeto de arquitetura, levantamento dos custos, organização dos cronogramas físico e financeiro, coordenação e compatibilização de todos os projetos complementares com o projeto de arquitetura e acompanhamento, fiscalização e administração da obra.',
  'Trabalhamos associados a empresas de engenharia e consultoria, o que garante um resultado mais abrangente e multidisciplinar.',
  foco,
];

/** Serviços: o bloco da home do Wix. */
export const servicos = {
  lista: [
    'Projetos residenciais, comerciais e urbanísticos.',
    'Reformas de apartamentos.',
    'Acompanhamento, fiscalização, administração e gerenciamento de obras.',
  ],
  diferencial: 'Nosso diferencial baseia-se na procura da valorização das características originais de edifícios históricos.',
};

/**
 * Sócios. O site mostra só a formação, sem o ano, como as propostas: o ano de formatura de
 * Rubens Reis diverge entre as fontes (régua §6). `ano` fica guardado e não é exibido.
 */
export const arquitetos = [
  { nome: 'Rita Lo Sciuto', cargo: 'Arquiteta', formacao: 'Faculdade de Arquitetura e Urbanismo da Universidade Mackenzie', ano: '1984', nascimento: '1961' },
  { nome: 'Rubens Reis', cargo: 'Arquiteto', formacao: 'Faculdade de Arquitetura e Urbanismo da Universidade Mackenzie', ano: '1988', nascimento: '1957' },
];

export const menu = [
  { rotulo: 'Projetos', href: 'projetos' },
  { rotulo: 'Escritório', href: 'escritorio' },
  { rotulo: 'Publicações', href: 'publicacoes' },
  { rotulo: 'Contato', href: 'contato' },
];
