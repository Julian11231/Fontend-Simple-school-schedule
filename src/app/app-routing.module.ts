import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { LoginComponent } from './login/login.component';
import { LoginGuardGuard, NoLoginGuardGuard, VerificaTokenGuard } from './services/service.index';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PanelPrincipalComponent } from './panel-principal/panel-principal.component';
import { AdminSalonesComponent } from './admin-salones/admin-salones.component';
import { AdminCursosComponent } from './admin-cursos/admin-cursos.component';
import { AdminHorariosComponent } from './admin-horarios/admin-horarios.component';
import { RegistroPorSalonComponent } from './registro-por-salon/registro-por-salon.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, data: {titulo: 'login'}, canActivate: [NoLoginGuardGuard]},
  {path: 'panel-principal', component: PanelPrincipalComponent, data: {titulo: 'Panel principal'}},
  {path: 'administracion-salones', component: AdminSalonesComponent, data: {titulo: 'Administración de salones'}},
  {path: 'administracion-cursos', component: AdminCursosComponent, data: {titulo: 'Administración de cursos'}},
  {path: 'administracion-horarios', component: AdminHorariosComponent, data: {titulo: 'Administración de horarios'}},
  {path: 'registro-por-salon', component: RegistroPorSalonComponent, data: {titulo: 'Administración de horarios'}},
  { path: '**' , component: NopagefoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash:false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
