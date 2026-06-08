export interface Usuario {
  nome: string;
  email: string;
  senha: string;
  cargo: string;
  dataAdmissao: Date;
}

export const usuarios: Usuario[] = [];