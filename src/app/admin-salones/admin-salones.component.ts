import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SalonesService } from '../services/service.index';

@Component({
  selector: 'app-admin-salones',
  templateUrl: './admin-salones.component.html'
})
export class AdminSalonesComponent implements OnInit {

  salones:any = [];
  salonSelected:any;

  nombre:string = '';
  ubicacion:string = '';
  capacidad:number = 15;

  nombreEdit:string = '';
  ubicacionEdit:string = '';
  capacidadEdit:number = 15;
  estadoEdit:boolean = true;

  constructor(private salonesService: SalonesService) { }

  ngOnInit(): void {
    this.getSalones();
  }

  async getSalones(){
    this.salones = await this.salonesService.getSalones().toPromise();
  }

  getSalonSelected(salon:any){
    this.salonSelected = salon;
    this.nombreEdit = this.salonSelected.nombre;
    this.ubicacionEdit = this.salonSelected.ubicacion;
    this.capacidadEdit = this.salonSelected.capacidad;
    this.estadoEdit = this.salonSelected.estado;
  }

  postSalon(){
    let salon = {nombre: this.nombre, ubicacion: this.ubicacion, capacidad: this.capacidad, estado:true } 
    this.salonesService.postSalon(salon).subscribe((resp:any)=>{
      this.getSalones();
      this.nombre = '';
      this.ubicacion = '';
      this.capacidad = 15;
      (document.getElementById("btnCerrarModalAdd") as HTMLButtonElement).click();
      Swal.fire({
        title:'Salón creado correctamente',
        icon: 'success',
        iconColor: 'white',
        background: '#a5dc86',
        toast: true,
        position: 'top-right',
        timer: 2000,
        showConfirmButton:false
      })
    });
  }

  putSalon(){
    let salon = {id: this.salonSelected.id, nombre: this.nombreEdit, ubicacion: this.ubicacionEdit, capacidad: this.capacidadEdit, estado: this.estadoEdit } 
    this.salonesService.postSalon(salon).subscribe((resp:any)=>{
      this.getSalones();
      (document.getElementById("btnCerrarModalEdit") as HTMLButtonElement).click();
      Swal.fire({
        title:'Salón editado correctamente',
        icon: 'success',
        iconColor: 'white',
        background: '#3fc3ee',
        toast: true,
        position: 'top-right',
        timer: 2000,
        showConfirmButton:false
      })
    });
  }

  deleteSalon(id:number){
    Swal.fire({
      title:'¿Eliminar salón?',
      html: '<b>Esta acción no se puede deshacer!<b>',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#dc3545",
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.salonesService.deleteSalon(id).subscribe((resp) => {
          this.getSalones();
          Swal.fire({
            title:'Salón eliminado correctamente',
            icon: 'success',
            iconColor: 'white',
            background: '#f27474',
            toast: true,
            position: 'top-right',
            timer: 2000,
            showConfirmButton:false
          });
        });
      }
    })
  }

}
