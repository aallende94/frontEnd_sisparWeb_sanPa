import { Component, Input, OnChanges, OnInit, ViewChild, ElementRef, TemplateRef  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
//import { HttpClientModule } from "@angular/common/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { TokenService } from '../../../services/token.service';
import { CommonModule } from '@angular/common';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';


import { ReportVisitas } from '../../../services/reportVisitas.service';
import { ExportExcelt } from '../../../helpers/ExportExcel';

@Component({
  selector: 'app-basic-elements',
  templateUrl: './reporte-pendientes.component.html',
  styleUrls: ['./reporte-pendientes.component.scss']
})
export class ReportePendientesComponent implements OnInit {

  constructor(private fb                : FormBuilder, 
               private serviReportVisitas : ReportVisitas,
                            private excelExport : ExportExcelt
              ) { }

 exportAsConfig: ExportAsConfig = {
      type: 'xlsx', // the type you want to download
      elementId: 'libro', // the id of html/table element
      }

    title: string;
   tipo: string;
   boOperador: boolean = true;

   tabla: any[] = [];

   searchTerm: string;
   page = 1;
   pageSize = 10;
   collectionSize: number = 0;
   currentRate = 8; 

  listPartPend : any[] =  [];

  mensaje_error : string = '';
  mostrarMensaje_err : boolean = false

  ngOnInit(): void {

     (document.querySelector("#overlay") as HTMLElement).hidden = false;

    this.buscartabla();

       setTimeout(() => {
        (document.querySelector("#overlay") as HTMLElement).hidden = true;
      }, 1500);
  
  }    

  submit() {
    console.table("Form Submitted")
    
  } 

   buscartabla(){

    this.title = 'Participación Pendientes';

    this.serviReportVisitas.getReportPartPendientes().subscribe(
      data => {

        let result : any = data;
    
       let dataPartPend = result.dataPartPend;

        if (dataPartPend) {

         this.mostrarMensaje_err = false;
         this.listPartPend = dataPartPend;
         console.log(this.listPartPend);
      
        }else{
          let msg = 'No hay datos disponibles para este informe.';
            this.mensaje_error = msg;
            this.mostrarMensaje_err = true
           window.scroll(0,0);
        }

      });
       this.rerender();
  }

   rerender(): void {

    console.log("confirmar si entra aqui");
    $('#table1').DataTable().destroy();
    
    setTimeout(() => {
      $("#table1").DataTable({
        ordering: true
      });
      
   }, 1500);
  }

   export(form: any) {

    const fecha = new Date();
    let hoy = fecha.toLocaleDateString().split('/');
    let title = 'ParticipacionPend_'+hoy[2]+'-'+hoy[1]+'-'+hoy[0];
    let arrayDatos = [];

        arrayDatos = this.listPartPend.map(
          x => ({
            Ci:              x.CEDULA,
            Nombre:          x.NOMBRE,
            Apellido:        x.APELLIDO,
            Sexo:            x.SEXO,
            Direccion:       x.DIRECC,
            Local:           x.vot_loc,
            Mesa:             x.MESA,
            Orden:           x.ORDEN
          })
        );

    this.excelExport.exportArrayToExcel(arrayDatos, title);
  }

}
