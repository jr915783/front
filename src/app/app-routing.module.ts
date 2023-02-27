import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VeiculoComponent } from './crud-Veiculo/crud-veiculo.component';

const routes: Routes = [
  {path:'home', component: VeiculoComponent},  
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'**', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
