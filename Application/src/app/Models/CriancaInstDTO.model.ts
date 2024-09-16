export interface CriancaInstDTO {
  nome: string;
  sexo: string;
  nomeResp: string;
  cpf: string;
  endereco: string;
  cns: string;
  dataNascimento: string;
  rg: string;
  tel1: string;
  tel2: string;
  idSala: string;
  userInstId: string;
  sala?: {
    id: string;
    nome: string;
    capacidade: number;
  };
  jogadaInst?: {
    id: string;
    idJogo: number;
    idCrianca: string;
    pontuacao: number;
    dataJogo: string;
  }[];
}
