import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HorarioService, SalonesService, CursosService } from '../services/service.index';
import { DatePipe } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-registro-por-salon',
  templateUrl: './registro-por-salon.component.html'
})
export class RegistroPorSalonComponent implements OnInit {

  datePipe = new DatePipe('en-US');
  contador!: Subscription;

  horarios:any = [];

  cursos:any = [];
  salones:any = [];
  fecha:Date = new Date;
  fechaTxt:string = '';

  constructor(
    private horarioService: HorarioService,
    private cursosService: CursosService,
    private salonesService: SalonesService
    ) { }

  ngOnInit(): void {

    this.getCursos();
    this.getSalones();

    let currentDate = new Date();
    this.fechaTxt = this.datePipe.transform(currentDate, 'mediumDate') +" "+this.datePipe.transform(currentDate, 'shortTime');

    this.contador = interval(1000*60).subscribe((n) => {
      let currentDate = new Date();
      this.fechaTxt = this.datePipe.transform(currentDate, 'mediumDate') +" "+this.datePipe.transform(currentDate, 'shortTime');
    });
    
  }

  async getHoraiosSalon(){
    if((document.getElementById("salonSelect") as HTMLSelectElement).selectedIndex > 0){
      let id = parseInt((document.getElementById("salonSelect") as HTMLSelectElement).value);
      this.horarios = await this.horarioService.getHorariosSalon(id).toPromise();
      for(let i=0; i < this.horarios.length;  i++){
        let fecha = Date.parse(this.horarios[i].fecha);
        if(fecha > this.fecha.getTime()){
          this.horarios[i].color = "bg-success";
        }else{
          this.horarios[i].color = "bg-warning";
        }
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
  }

  async getCursos(){
    this.cursos = await this.cursosService.getCursos().toPromise();
  }

  async getSalones(){
    this.salones = await this.salonesService.getSalones().toPromise();
  }

}
