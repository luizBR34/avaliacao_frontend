import { Component, OnInit } from '@angular/core';
import { Dados, Risco } from '../model/dados';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackService } from '../servicos/back.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  form: FormGroup;
  dados: Dados;
  dadosGRavados: Dados[];
  risco = Risco;
  msgError: string;

  constructor(private fb: FormBuilder,
    private service: BackService) {
    this.criaForm();
  }


  atualizaListaRegistros() {
    setTimeout (() => {
      this.service.getDados()
      .subscribe((registros) => this.dadosGRavados = registros,
      msgError => this.msgError = <any>msgError);
    }, 500);
  }


  ngOnInit() {
    this.atualizaListaRegistros();
  }


  criaForm() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      limite: [0, Validators.required],
      risco: 'A',
      taxaJuros: 0
    });
  }


  onSelect(r: any) {

    if (r == 'B') {

      this.form.patchValue({taxaJuros: 10});
  
    } else if(r == 'C') {
  
      this.form.patchValue({taxaJuros: 20});
  
    } else {
  
      this.form.patchValue({taxaJuros: 0});
    }

  }


  salvar() {

    this.dados = this.form.value;

    this.service.postCadastraDados(this.dados)
    .subscribe(msgError => this.msgError = <any>msgError);

    this.form.reset({
      nome: '',
      limite: 0,
      risco: 'A',
      taxaJuros: 0
    });

    this.atualizaListaRegistros();
  }

}
