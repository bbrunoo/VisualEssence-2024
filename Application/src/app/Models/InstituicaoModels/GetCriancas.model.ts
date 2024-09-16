export interface Sala {
  id: string;
  nome: string;
  capacidade: number;
}

export interface GetCriancas {
  id: string;
  nome: string;
  nomeResp: string;
  sexo: string;
  cpf: string;
  cns: string;
  dataNascimento: string;
  rg: string;
  tel1: string;
  tel2: string;
  endereco: string;
  idSala: string;
  sala: Sala;
}
