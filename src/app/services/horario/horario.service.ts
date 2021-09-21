import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { URL_SERVICES } from '../../config/config';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private http: HttpClient) {}

  getHorarios(){
    let url = URL_SERVICES + '/horario';
    return this.http.get(url);
  }

  getHorariosSalon(salon:number){
    let url = `${URL_SERVICES}/horario/salon/${salon}`;
    return this.http.get(url);
  }

  postHorario(horario: any, salon_id:number, curso_id:number) {
    let url = `${URL_SERVICES}/horario?salon_id=${salon_id}&curso_id=${curso_id}`;
    return this.http.post(url, horario).pipe(map((resp: any) => {
        return true;
    }),catchError((err) => {
      console.log(err)
        Swal.fire({
          title: '¡Error!',
          text: err.error.details[0],
          icon: 'error',
          confirmButtonColor: '#8F141B'
        });
        return throwError(err);
      }));
  }

  deleteHorario(id:number){
    let url = `${URL_SERVICES}/horario/${id}`;
    return this.http.delete(url).pipe(map((resp: any) => {
        return true;
    }),catchError((err) => {
      console.log(err)
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