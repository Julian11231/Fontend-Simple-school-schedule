import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  LoginService,
  SalonesService,
  CursosService,
  LoginGuardGuard,
  VerificaTokenGuard,
  NoLoginGuardGuard,
} from './service.index'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ], providers: [
    LoginService,
    SalonesService,
    CursosService,
    LoginGuardGuard,
    VerificaTokenGuard,
    NoLoginGuardGuard
  ]
})
export class ServiceModule { }
