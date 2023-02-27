import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Veiculo } from '../shared/model/time.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  constructor(private http: HttpClient) { }
  configUrl = 'https://localhost:7176/api/Cadastro';

  buscarVeiculos(){   
    return this.http.get<Veiculo>(this.configUrl+'/ListaCadastros');
  }

  cadastrarVeiculo(veiculo : Veiculo){   
    return this.http.post(this.configUrl+'/Cadastrar', veiculo, {responseType: 'text'});
  }

  atualizarVeiculo(veiculo : Veiculo){    
    return this.http.put(`${this.configUrl}/AtualizarCadastro`, veiculo, {responseType: 'text'});
  }

  deletarVeiculo(id : number){    
    return this.http.delete(`${this.configUrl}/DeletarCadastro/${id}`, {responseType: 'text'});
  }
}
