import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { URL_SERVICES } from '../../config/config';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: any;

  constructor(private http: HttpClient, private router:Router) {
  }

  logueado() {
    this.token = localStorage.getItem("token");
    if(this.token){
      return (this.token.length > 15) ? true : false;
    }else{
      return false;
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  olvidoClave(usuario:any){
    let url = `${URL_SERVICES}/login/olvidoClave`;
    return this.http.post(url, usuario).pipe(map((resp: any) => {
      return resp.ok;
    }),catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
        confirmButtonColor: '#8F141B'
      });
      return throwError(err);
    }));
  }


  login(usuario: any) {
    let url = URL_SERVICES + '/usuario/login';
    return this.http.post(url, usuario).pipe(map((resp: any) => {
        localStorage.setItem('user',JSON.stringify(resp));
        return true;
    }),catchError((err) => {
        Swal.fire({
          title: '¡Error!',
          text: err.error.details[0],
          icon: 'error',
          confirmButtonColor: '#8F141B'
        });
        return throwError(err);
      }));
  }
}
