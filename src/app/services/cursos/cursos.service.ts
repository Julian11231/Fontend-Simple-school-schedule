import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { URL_SERVICES } from '../../config/config';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) {}

  getCursos(){
    let url = URL_SERVICES + '/curso';
    return this.http.get(url);
  }

  postCurso(curso: any) {
    let url = URL_SERVICES + '/curso';
    return this.http.post(url, curso).pipe(map((resp: any) => {
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

  deleteCurso(id:number){
    let url = `${URL_SERVICES}/curso/${id}`;
    return this.http.delete(url).pipe(map((resp: any) => {
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