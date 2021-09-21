import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CursosService } from '../services/service.index';

@Component({
  selector: 'app-admin-cursos',
  templateUrl: './admin-cursos.component.html',
  styles: [
  ]
})
export class AdminCursosComponent implements OnInit {

  cursos:any = [];
  cursoSelected:any;

  nombre:string = '';

  nombreEdit:string = '';
  estadoEdit:boolean = true;

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    this.getCursos();
  }

  async getCursos(){
    this.cursos = await this.cursosService.getCursos().toPromise();
  }

  getSalonSelected(salon:any){
    this.cursoSelected = salon;
    this.nombreEdit = this.cursoSelected.nombre;
    this.estadoEdit = this.cursoSelected.estado;
  }

  postCurso(){
    let curso = {nombre: this.nombre, estado: true}
    this.cursosService.postCurso(curso).subscribe((resp:any)=>{
      this.getCursos();
      this.nombre = '';
      (document.getElementById("btnCerrarModalAdd") as HTMLButtonElement).click();
      Swal.fire({
        title:'Curso creado correctamente',
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

  putCurso(){
    let curso = {id:this.cursoSelected.id, nombre: this.nombreEdit, estado: this.estadoEdit} 
    console.log(curso)
    this.cursosService.postCurso(curso).subscribe((resp:any)=>{
      this.getCursos();
      (document.getElementById("btnCerrarModalEdit") as HTMLButtonElement).click();
      Swal.fire({
        title:'Curso editado correctamente',
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

  deleteCurso(id:number){
    Swal.fire({
      title:'¿Eliminar Curso?',
      html: '<b>Esta acción no se puede deshacer!<b>',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#dc3545",
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.cursosService.deleteCurso(id).subscribe((resp) => {
          this.getCursos();
          Swal.fire({
            title:'Curso eliminado correctamente',
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
