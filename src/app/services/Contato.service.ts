import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contato } from '../shared/model/contato.model';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http: HttpClient) { }
  configUrl = 'https://localhost:7176/api/Contato';

  buscarContatos(){   
    return this.http.get<Contato>(this.configUrl+'/ListaCadastros');
  }

  cadastrarContato(Contato : Contato){   
    console.log(Contato);
    return this.http.post(this.configUrl+'/Cadastrar', Contato, {responseType: 'text'});
  }

  atualizarContato(Contato : Contato){    
    return this.http.put(`${this.configUrl}/AtualizarCadastro`, Contato, {responseType: 'text'});
  }

  deletarContato(id : number){    
    return this.http.delete(`${this.configUrl}/DeletarCadastro/${id}`, {responseType: 'text'});
  }
}
