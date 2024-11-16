export interface JogadaDetalhadaDTO {
  id:string;
  nome: string;
  dataNascimento: string;
  nomeResponsavel: string;
  salaNome: string;
  foto: string;
  jogadas: JogadaGetDTO[];
}

export interface JogadaGetDTO {
  nomeJogo: string;
  pontuacao: number;
  dataJogo: string;
}
