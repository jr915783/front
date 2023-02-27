import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GridTimesComponent } from './grid-times/grid-times.component';
import { VeiculoComponent } from './crud-Veiculo/crud-veiculo.component';

const routes: Routes = [
  {path:'tabela', component: VeiculoComponent},  
  {path:'', redirectTo:'tabela', pathMatch:'full'},
  {path:'**', redirectTo:'tabela', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
