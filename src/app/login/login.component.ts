import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/service.index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  usuario: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router:Router) { }

  ngOnInit(): void {}

  checkUsuario(){
    this.usuario = this.usuario.replace(/\D/g, '');
  }

  ingresar(){
    this.usuario = this.usuario.replace(/\D/g, '');
    let usuario = parseInt(this.usuario);
    let user = {identificacion: usuario, password: this.password}
    this.loginService.login(user).subscribe((resp:any)=>{
      this.router.navigate(['/matricula']);
    })
  }

  showPass(){
    let inputContra = document.getElementById('inputContra') as HTMLInputElement;
    let visibilityButton = document.getElementById('visibilityButton') as HTMLSpanElement;
    if(inputContra.type === 'password'){
      inputContra.setAttribute('type', 'text');
      visibilityButton.innerHTML = 'visibility_off';
    }else{
      inputContra.setAttribute('type', 'password');
      visibilityButton.innerHTML = 'visibility';
    }
  }

}
