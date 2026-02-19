import { Component, Input, OnChanges, OnInit, ViewChild, ElementRef, TemplateRef  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
//import { HttpClientModule } from "@angular/common/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { TokenService } from '../../../services/token.service';
import { CommonModule } from '@angular/common';
import 'datatables.net';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

import { ReportVisitas } from '../../../services/reportVisitas.service';
import { ExportExcelt } from '../../../helpers/ExportExcel';


@Component({
  selector: 'app-basic-elements',
  templateUrl: './reporte-volver_visitar.component.html',
  styleUrls: ['./reporte-volver_visitar.component.scss']
})
export class ReporteVolverVisitarComponent implements OnInit {

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

  listVolverVisitar : any[] =  [];

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

      this.title = 'Volver a Visitar';

    this.serviReportVisitas.getReportVolverVisitar().subscribe(
      data => {

        let result : any = data;

       let dataVolverVisitar = result.dataVolverVisitar;

       if (dataVolverVisitar) {
         this.mostrarMensaje_err = false;
         this.listVolverVisitar = dataVolverVisitar
      
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
      
   }, 1000);
  }

   export(form: any) {

    const fecha = new Date();
    let hoy = fecha.toLocaleDateString().split('/');
    let title = 'VisitasConfirmadas_'+hoy[2]+'-'+hoy[1]+'-'+hoy[0];
    let arrayDatos = [];

        arrayDatos = this.listVolverVisitar.map(
          x => ({
            Ci:              x.vis_ci,
            Nombre:          x.vis_nombre,
            Apellido:        x.vis_apellido,
            Sexo:            x.vis_sexo,
            Edad:            x.edad,
            Telefono:        x.vis_telefono,
            Barrio_Compania: x.barrio_cnia,
            Direccion:       x.vis_direccion,
            Comnentario:     x.vis_comentario,
          
          })
        );

    this.excelExport.exportArrayToExcel(arrayDatos, title);
  }



}
