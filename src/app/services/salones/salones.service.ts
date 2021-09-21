import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { URL_SERVICES } from '../../config/config';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SalonesService {

  constructor(private http: HttpClient) {}

  getSalones(){
    let url = URL_SERVICES + '/salon';
    return this.http.get(url);
  }

  postSalon(salon: any) {
    let url = URL_SERVICES + '/salon';
    return this.http.post(url, salon).pipe(map((resp: any) => {
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

  deleteSalon(id:number){
    let url = `${URL_SERVICES}/salon/${id}`;
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