import { Component, Input, OnChanges, OnInit, ViewChild, ElementRef, TemplateRef  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
//import { HttpClientModule } from "@angular/common/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { TokenService } from '../../../services/token.service';
import { CommonModule } from '@angular/common';

import { ReportVisitas } from '../../../services/reportVisitas.service';

@Component({
  selector: 'app-basic-elements',
  templateUrl: './reporte-neutrales.component.html',
  styleUrls: ['./reporte-neutrales.component.scss']
})
export class ReporteNeutralesComponent implements OnInit {

  constructor(private fb                : FormBuilder, 
              private serviFactVentas : ReportVisitas
              ) { }

ventas: any[] = [];

filtroMetodo = '';
ventasFiltradas: any[] = [];

 CREDITO : boolean 

  ngOnInit(): void {

     (document.querySelector("#overlay") as HTMLElement).hidden = false;

     this.getReporteVentasCredito();

       setTimeout(() => {
        (document.querySelector("#overlay") as HTMLElement).hidden = true;
      }, 1500);
  
  }    

  submit() {
    console.table("Form Submitted")
    
  } 

   getReporteVentasCredito(){

    this.serviFactVentas.getReportVisitasConfirm().subscribe(
      data => {

          console.log(data);
        let resultReportVentas : any = data;
       this.ventas = resultReportVentas.data;

        this.CREDITO = true

      });
  }

  isVencida(fecha: string): boolean {
  return new Date(fecha) < new Date();
}

}
