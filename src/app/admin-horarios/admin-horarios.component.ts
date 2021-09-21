import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HorarioService, SalonesService, CursosService } from '../services/service.index';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-horarios',
  templateUrl: './admin-horarios.component.html'
})
export class AdminHorariosComponent implements OnInit {

  datePipe = new DatePipe('en-US');
  fecha:any = '';

  horarios:any = [];
  horarioSelected:any;

  cursos:any = [];
  salones:any = [];

  curso:string = '';
  salon:string = '';
  profesor:string = '';
  horas:number = 1;

  cursoEdit:string = '';
  salonEdit:string = '';
  profesorEdit:string = '';
  horasEdit:number = 1;

  constructor(
    private horarioService: HorarioService,
    private cursosService: CursosService,
    private salonesService: SalonesService
    ) { }

  ngOnInit(): void {

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    this.fecha = this.datePipe.transform(tomorrow, 'yyyy-MM-dd');


    this.getHorarios();
    this.getCursos();
    this.getSalones();
  }

  async getHorarios(){
    this.horarios = await this.horarioService.getHorarios().toPromise();
    for(let i=0; i < this.horarios.length;  i++){
      let fechaArray:any = this.horarios[i].fecha.split(/\D/);
      this.horarios[i].fechaTxt = this.datePipe.transform(this.horarios[i].fecha, 'mediumDate');
      this.horarios[i].horaInicio = `${fechaArray[3]}:00 a.m`;
      let horaFinal = parseInt(fechaArray[3])+this.horarios[i].horas;
      if(horaFinal < 10){
        horaFinal = "0"+horaFinal;
      }
      this.horarios[i].horaFinal = `${horaFinal}:00 a.m`;
    }
  }

  async getCursos(){
    this.cursos = await this.cursosService.getCursos().toPromise();
  }

  async getSalones(){
    this.salones = await this.salonesService.getSalones().toPromise();
  }

  getHorarioSelected(horario:any){
    this.horarioSelected = horario;
    this.cursoEdit = this.horarioSelected.curso.id;
    this.salonEdit = this.horarioSelected.salon.id;
    this.profesorEdit = this.horarioSelected.profesor;
    this.horasEdit = this.horarioSelected.horas;
    let fechaEdit = new Date(this.horarioSelected.fecha);
    let fechaValue:any = document.getElementById('fechaEdit') as HTMLInputElement;
    fechaValue.value = this.datePipe.transform(fechaEdit, 'yyyy-MM-dd');
    let fechaArray:any = this.horarioSelected.fecha.split(/\D/);
    let horaInicio = parseInt(fechaArray[3]);
    (document.getElementById('horaInicioEdit') as HTMLSelectElement).value = horaInicio.toString();
  }

  async checkCruce(horarioNuevoInicio:number, fechaNueva:Date){
    let seCruza = false;
    let horarioNuevoFinal = horarioNuevoInicio+this.horas;
    for(let i=0; i < this.horarios.length;  i++){
      if(this.horarios[i].salon.id == this.salon){
        let fechaArray:any = this.horarios[i].fecha.split(/\D/);
        if(
          fechaNueva.getFullYear() == parseInt(fechaArray[0]) &&
          fechaNueva.getMonth()+1 == parseInt(fechaArray[1]) &&
          fechaNueva.getDate() == parseInt(fechaArray[2])
        ){
          let horarioViejoInicio = parseInt(fechaArray[3]);
          let horarioViejoFinal = horarioViejoInicio+this.horarios[i].horas;
          let min = Math.min(horarioViejoFinal, horarioNuevoFinal);
          let max = Math.max(horarioNuevoInicio, horarioViejoInicio)
          if(max < min){
            if(horarioNuevoFinal == horarioViejoInicio){
              seCruza = false;
            }else{
              seCruza = true;
              return seCruza
            }
          }
        }
      }
    }
    return seCruza
  }

  async checkHoras(hora: number){
    if(hora > 12 ){ 
      return true
    }else{
      return false
    }
  }

  async postHorario(){
    let inputFecha = (document.getElementById("fecha") as HTMLInputElement).value;
    let horaInicio = (document.getElementById("horaInicio") as HTMLSelectElement).value;
    let fechaArray:any = inputFecha.split(/\D/);
    let fecha =  new Date(fechaArray[0], --fechaArray[1], fechaArray[2], parseInt(horaInicio)-5);
    let seCruza = await this.checkCruce(parseInt(horaInicio), fecha);
    let outOfTime = await this.checkHoras(parseInt(horaInicio)+this.horas);
    if(seCruza){
      Swal.fire({
        title:'Se cruza con otro horario',
        icon: 'error',
        timer: 2000,
        showConfirmButton:false
      });
    }else if(outOfTime){
      Swal.fire({
        title:'Se pasa de las 12:00 p.m',
        icon: 'error',
        timer: 2000,
        showConfirmButton:false
      });
    }else{
      let horario = {
        "fecha": fecha.toISOString(),
        "horas": this.horas,
        "profesor": this.profesor
      }
      this.horarioService.postHorario(horario, parseInt(this.salon), parseInt(this.curso)).subscribe((resp:any)=>{
        this.getHorarios();
        this.resetDataAdd();
        (document.getElementById("btnCerrarModalAdd") as HTMLButtonElement).click();
        Swal.fire({
          title:'Horario creado correctamente',
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
  }

  async putHorario(){
    let inputFecha = (document.getElementById("fechaEdit") as HTMLInputElement).value;
    let horaInicio = (document.getElementById("horaInicioEdit") as HTMLSelectElement).value;
    let fechaArray:any = inputFecha.split(/\D/);
    let fecha =  new Date(fechaArray[0], --fechaArray[1], fechaArray[2], parseInt(horaInicio)-5);
    let seCruza = await this.checkCruce(parseInt(horaInicio), fecha);
    let outOfTime = await this.checkHoras(parseInt(horaInicio)+this.horas);
    if(seCruza){
      Swal.fire({
        title:'Se cruza con otro horario',
        icon: 'error',
        timer: 2000,
        showConfirmButton:false
      });
    }else if(outOfTime){
      Swal.fire({
        title:'Se pasa de las 12:00 p.m',
        icon: 'error',
        timer: 2000,
        showConfirmButton:false
      });
    }else{
      let horario = {
        "id": this.horarioSelected.id,
        "fecha": fecha.toISOString(),
        "horas": this.horasEdit,
        "profesor": this.profesorEdit
      }
      this.horarioService.postHorario(horario, parseInt(this.cursoEdit), parseInt(this.salonEdit)).subscribe((resp:any)=>{
        this.getHorarios();
        (document.getElementById("btnCerrarModalEdit") as HTMLButtonElement).click();
        Swal.fire({
          title:'Horario editado correctamente',
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
  }

  deleteHorario(id:number){
    Swal.fire({
      title:'¿Eliminar horario?',
      html: '<b>Esta acción no se puede deshacer!<b>',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#dc3545",
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.horarioService.deleteHorario(id).subscribe((resp) => {
          this.getHorarios();
          Swal.fire({
            title:'Horario eliminado correctamente',
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

  resetDataAdd(){
    this.curso = '';
    this.salon = '';
    this.profesor = '';
    this.horas = 1;
    (document.getElementById('fecha') as HTMLInputElement).value = "";
  }

}
