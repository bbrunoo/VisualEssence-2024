export interface HistoricoJogadasDTO {
  nomeCrianca: string;
  nomeJogo: string;
  pontuacao: number;
  dataJogo: string;
}

export interface CriancaComJogosDTO {
  nomeCrianca: string;
  salaNome: string;
  jogos: HistoricoJogadasDTO[];
  totalRecords: number;
  foto: string;
  idCrianca: string;
}
