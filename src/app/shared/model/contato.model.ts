import { Pessoa } from "./pessoa.model";

export interface Contato {
  id: number;
  Nome: string; 
  telefone:string; 
  email: string,
  whatsApp: string,
  pessoaId: number,
  pessoa: Pessoa
}
