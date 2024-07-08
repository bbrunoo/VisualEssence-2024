export class ContatoModel {
  constructor(
    public nome: string,
    public email: string,
    public assunto: string,
    public descricao: string,
    public dataEnvio: Date
  ) { }
}

