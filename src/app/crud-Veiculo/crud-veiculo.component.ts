import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { VeiculoService } from '../services/time.service';

import { Veiculo } from '../shared/model/time.model';

@Component({
  selector: 'app-crud-veiculo',
  templateUrl: './crud-veiculo.component.html',
  styleUrls: ['./crud-veiculo.component.scss'],
})
export class VeiculoComponent implements OnInit {

  listaVeiculos: Veiculo[] = [];
  modalRef?: BsModalRef;
  formularioDeVeiculo!: FormGroup;
  formularioDeVeiculoCriar!: FormGroup;
  editarVeiculo: any;
  tipoRequest: any;
  filtroNaoEncotrado: boolean = false;
  filtroGrid: string = "";
  habilitarCampo: any = null;
  titudoModalCadastrarEditar: string = "";
  alertaCAmposEditar: boolean = false;
  alertaListaCadastro: string = "";
  

  constructor(private veiculoService: VeiculoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.buscarVeiculos();
    this.criarFormularioDeVeiculo();
  }

  filtrarGrid(chassi: string) {
    if (chassi != "") {
      chassi = chassi.toLocaleLowerCase();
      this.listaVeiculos = this.listaVeiculos.filter((v: Veiculo) => v.chassi == chassi);
      this.listaVeiculos.length == 0 ? this.filtroNaoEncotrado = true : this.filtroNaoEncotrado = false;
    } else { 
      this.filtroNaoEncotrado = false;
      this.buscarVeiculos();
     }
  }

  criarFormularioDeVeiculo() {   
    this.formularioDeVeiculo = this.fb.group({
      id: [''],
      chassi: ['', Validators.compose([
        Validators.required,
      ])],
      tipo: ['', Validators.compose([Validators.required])],
      numeroPassageiros: [''],
      cor: ['', Validators.compose([Validators.required])],
    });
  }

  buscarVeiculos() {
    this.veiculoService.buscarVeiculos().subscribe((veiculo: any) => {
      this.listaVeiculos = veiculo;
      this.listaVeiculos.length == 0 ? this.alertaListaCadastro = "Nenhum veículo cadastrado" : this.alertaListaCadastro = "";
    })
  }

  openModalAdd(template: TemplateRef<any>, veiculo?: Veiculo, tipoRequest?: string) {

    this.tipoRequest = tipoRequest;

    if (tipoRequest === "atualizar") {
      this.formularioDeVeiculo.get('id')?.setValue(veiculo?.id);
      this.formularioDeVeiculo.get('chassi')?.setValue(veiculo?.chassi);
      this.formularioDeVeiculo.get('tipo')?.setValue(veiculo?.tipo);
      this.formularioDeVeiculo.get('numeroPassageiros')?.setValue(veiculo?.numeroPassageiros);
      this.formularioDeVeiculo.get('cor')?.setValue(veiculo?.cor);
      this.titudoModalCadastrarEditar = "Editar Veículo";
      this.habilitarCampo = true;
      this.alertaCAmposEditar = true;
    } else {
      this.formularioDeVeiculo.reset();
      this.habilitarCampo = null;
      this.titudoModalCadastrarEditar = "Adicionar Novo Veículo";
      this.alertaCAmposEditar = false;
    }

    this.editarVeiculo = veiculo;
    this.modalRef = this.modalService.show(template);
  }


  openModalDeletarVeiculo(template: TemplateRef<any>, veiculo?: Veiculo) {
    this.editarVeiculo = veiculo;
    this.modalRef = this.modalService.show(template);
  }

  cadastrarVeiculo() {
    if (this.tipoRequest != "atualizar") {
      this.formularioDeVeiculo.get('id')?.setValue(0);
      this.veiculoService.cadastrarVeiculo(this.formularioDeVeiculo.value).subscribe((retorno: string) => {
        this.buscarVeiculos();
        this.formularioDeVeiculo.reset();
        this.modalService.hide();
        this.toastr.success(retorno);
      }, (error: any) => {
        this.toastr.error(error.error);
      })
    } else {
      this.veiculoService.atualizarVeiculo(this.formularioDeVeiculo.value).subscribe((retorno: string) => {
        this.buscarVeiculos();
        this.formularioDeVeiculo.reset();
        this.modalService.hide();
        this.toastr.success(retorno);
      }, (error: any) => {
        this.toastr.error(error.error);
      })
    }
  }

  deletarVeiculo(id: number) {
    this.veiculoService.deletarVeiculo(id).subscribe((retorno: any) => {
      this.buscarVeiculos();
      this.formularioDeVeiculo.reset();
      this.modalService.hide();
      this.toastr.success(retorno);
    }, (error: any) => {
      this.toastr.error(error.error);
    })
  }
  numeroPassageiros() {
    this.formularioDeVeiculo.get('tipo')?.value == "Ônibus"
      ? this.formularioDeVeiculo.get('numeroPassageiros')?.setValue(42) :
      this.formularioDeVeiculo.get('numeroPassageiros')?.setValue(2);
  }
}


