/**
 * 14 recortes de publicações (src/assets/fotos/publicacoes/), agrupados por veículo, na ordem do Wix.
 * `ano` só quando legível no recorte ou conhecido com certeza; senão vazio.
 */
export interface Recorte { arquivo: string; titulo: string; ano: string; nota?: string }
export interface Veiculo { veiculo: string; descricao: string; recortes: Recorte[] }

export const pasta = 'publicacoes';

export const publicacoes: Veiculo[] = [
  {
    veiculo: 'Revista Projeto Design',
    descricao: 'nº 395 — Praça Roosevelt',
    recortes: [
      { arquivo: '001_5208156b.jpg', titulo: 'Capa da edição nº 395', ano: '' },
      { arquivo: '002_f08cdb3c.jpg', titulo: '“Firmeza que resiste ao tempo”', ano: '' },
      { arquivo: '003_3aef6697.jpg', titulo: '“Cicatrizes urbanas regeneradas” — Praça Roosevelt', ano: '' },
      { arquivo: '004_8dbb3889.jpg', titulo: 'Praça Roosevelt — vista noturna', ano: '' },
    ],
  },
  {
    veiculo: 'Revista Arquitetura & Construção',
    descricao: 'Edifício Louveira',
    recortes: [
      { arquivo: '005_613c0067.jpg', titulo: 'Capa da edição', ano: '' },
      { arquivo: '006_911df349.jpg', titulo: 'Carta do editor — “Criatividade responsável”', ano: '' },
      { arquivo: '007_244ca33d.jpg', titulo: '“Patrimônio paulistano”', ano: '' },
      { arquivo: '008_5d4c0941.jpg', titulo: '“História em três tempos” — o apartamento no Louveira', ano: '' },
    ],
  },
  {
    veiculo: 'Folha de S.Paulo — revista sãopaulo',
    descricao: 'Praça Roosevelt',
    recortes: [
      { arquivo: '009_41ab73b6.jpg', titulo: 'Capa — “À espera da Roosevelt”', ano: '2012' },
      { arquivo: '010_388d8b48.jpg', titulo: '“A praça é nova”', ano: '2012' },
      { arquivo: '011_b8cded95.jpg', titulo: '“A reforma” — o subsolo', ano: '2012' },
      { arquivo: '012_d0617da9.jpg', titulo: '“As mudanças no entorno”', ano: '2012' },
    ],
  },
  {
    veiculo: 'Jornais',
    descricao: 'Praça Roosevelt',
    recortes: [
      { arquivo: '013_ce1c177d.jpg', titulo: '“Renovada, Roosevelt já agrada aos vizinhos”', ano: '2012' },
      { arquivo: '014_62608643.jpg', titulo: 'Folha de S.Paulo, Cotidiano — “Reformada, Roosevelt reabrirá no sábado”', ano: '2012' },
    ],
  },
];
