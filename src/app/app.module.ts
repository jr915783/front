import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NavComponent } from './shared/nav/nav/nav.component';
import { FooterComponent } from './shared/footer/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { PessoaComponent } from './crud-Pessoa/crud-pessoa.component';




@NgModule({
  declarations: [
    AppComponent,
    PessoaComponent,
    NavComponent,
    FooterComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
