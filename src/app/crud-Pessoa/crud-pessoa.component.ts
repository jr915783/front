import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Contato } from '../shared/model/contato.model';
import { ContatoService } from '../services/Contato.service';


@Component({
  selector: 'app-crud-pessoa',
  templateUrl: './crud-pessoa.component.html',
  styleUrls: ['./crud-pessoa.component.scss'],
})
export class PessoaComponent implements OnInit {

  listaCadastros: Contato[] = [];
  modalRef?: BsModalRef;
  formularioCadastro!: FormGroup;
  formularioDepessoaCriar!: FormGroup;
  editarCadastro: any;
  tipoRequest: any;
  filtroNaoEncotrado: boolean = false;
  filtroGrid: string = "";
  habilitarCampo: any = null;
  titudoModalCadastrarEditar: string = "";
  alertaCAmposEditar: boolean = false;
  alertaListaCadastro: string = "";
  mostrarSelecionar: boolean = false;


  constructor(private contatoService: ContatoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.buscarpessoas();
    this.criarFormularioDepessoa();
  }

  filtrarGrid(nome: string) {

    if (nome != "") {
      nome = nome.toLocaleLowerCase();
      this.listaCadastros = this.listaCadastros.filter((v: Contato) => v.pessoa.nome.toLocaleLowerCase().indexOf(nome) >= 0);
      this.listaCadastros.length == 0 ? this.filtroNaoEncotrado = true : this.filtroNaoEncotrado = false;
    } else {
      this.filtroNaoEncotrado = false;
      this.buscarpessoas();
    }
  }

  criarFormularioDepessoa() {
    this.formularioCadastro = this.fb.group({
      id: [''],
      nome: ['', Validators.compose([
        Validators.required,
      ])],
      telefone: ['', Validators.compose([Validators.required])],
      email: [''],
      whatsApp: ['', Validators.compose([Validators.required])],
    });
  }

  buscarpessoas() {
    this.contatoService.buscarContatos().subscribe((pessoa: any) => {
      this.listaCadastros = pessoa;
      this.listaCadastros.length == 0 ? this.alertaListaCadastro = "Nenhuma pessoa cadastrada" : this.alertaListaCadastro = "";
    })
  }

  openModalAdd(template: TemplateRef<any>, pessoa?: Contato, tipoRequest?: string) {

    this.tipoRequest = tipoRequest;

    if (tipoRequest === "atualizar") {
      this.formularioCadastro.get('id')?.setValue(pessoa?.id);
      this.formularioCadastro.get('nome')?.setValue(pessoa?.pessoa.nome);
      this.formularioCadastro.get('telefone')?.setValue(pessoa?.telefone);
      this.formularioCadastro.get('email')?.setValue(pessoa?.email);
      this.formularioCadastro.get('whatsApp')?.setValue(pessoa?.whatsApp);
      this.titudoModalCadastrarEditar = "Editar Cadastro";
      this.habilitarCampo = true;
      this.alertaCAmposEditar = true;
      this.mostrarSelecionar = false;
    } else {
      this.formularioCadastro.reset();
      this.habilitarCampo = null;
      this.titudoModalCadastrarEditar = "Adicionar novo cadastro";
      this.alertaCAmposEditar = false;
      this.mostrarSelecionar = true;
    }

    this.editarCadastro = pessoa;
    this.modalRef = this.modalService.show(template);
  }


  openModalDeletarPessoa(template: TemplateRef<any>, pessoa?: Contato) {
    this.editarCadastro = pessoa;
    this.modalRef = this.modalService.show(template);
  }

  cadastrarPessoa() {
    if (this.tipoRequest != "atualizar") {
      this.formularioCadastro.get('id')?.setValue(0);
      var pessoa: any = {
        id: 0,
        telefone: this.formularioCadastro.get('telefone')?.value,
        email: this.formularioCadastro.get('email')?.value,
        whatsApp: this.formularioCadastro.get('whatsApp')?.value,
        pessoaId: 0,
        pessoa: {
          id: 0,
          nome: this.formularioCadastro.get('nome')?.value
        }
      }

      this.contatoService.cadastrarContato(pessoa).subscribe((retorno: string) => {
        this.buscarpessoas();
        this.formularioCadastro.reset();
        this.modalService.hide();
        this.toastr.success(retorno);
      }, (error: any) => {
        this.toastr.error(error.error);
      })
    } else {

      var pessoa: any = {
        id: this.formularioCadastro.get('id')?.value,
        telefone: this.formularioCadastro.get('telefone')?.value,
        email: this.formularioCadastro.get('email')?.value,
        whatsApp: this.formularioCadastro.get('whatsApp')?.value,
        pessoaId: this.formularioCadastro.get('id')?.value,
        pessoa: {
          id: this.formularioCadastro.get('id')?.value,
          nome: this.formularioCadastro.get('nome')?.value
        }
      }
      this.contatoService.atualizarContato(pessoa).subscribe((retorno: string) => {
        this.buscarpessoas();
        this.formularioCadastro.reset();
        this.modalService.hide();
        this.toastr.success(retorno);
      }, (error: any) => {
        this.toastr.error(error.error);
      })
    }
  }

  deletarPessoa(id: number) {
    this.contatoService.deletarContato(id).subscribe((retorno: any) => {
      this.buscarpessoas();
      this.formularioCadastro.reset();
      this.modalService.hide();
      this.toastr.success(retorno);
    }, (error: any) => {
      this.toastr.error(error.error);
    })
  }
}


