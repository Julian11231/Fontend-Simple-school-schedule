//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceModule } from './services/service.module';
import { AppRoutingModule } from './app-routing.module';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PanelPrincipalComponent } from './panel-principal/panel-principal.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AdminSalonesComponent } from './admin-salones/admin-salones.component';
import { AdminCursosComponent } from './admin-cursos/admin-cursos.component';
import { AdminHorariosComponent } from './admin-horarios/admin-horarios.component';
import { RegistroPorSalonComponent } from './registro-por-salon/registro-por-salon.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelPrincipalComponent,
    NavbarComponent,
    AdminSalonesComponent,
    AdminCursosComponent,
    AdminHorariosComponent,
    RegistroPorSalonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }