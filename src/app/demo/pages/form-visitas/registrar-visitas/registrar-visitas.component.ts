import { Component, Input, OnChanges, OnInit, ViewChild, ElementRef, TemplateRef  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
//import { HttpClientModule } from "@angular/common/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { TokenService } from '../../../services/token.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jQuery from 'jquery'

import { VisitasService } from '../../../services/visitas.service';

@Component({
  selector: 'app-basic-elements',
  templateUrl: './registrar-visitas.component.html',
  styleUrls: ['./registrar-visitas.component.scss']
})
export class RegistrarVisitasComponent implements OnInit {


   @ViewChild('sexo_vis') sexo_vis!: ElementRef<HTMLInputElement>
   //@ViewChild('estadoCivil_vis') estadoCivil_vis!: ElementRef<HTMLInputElement>
   @ViewChild('barrio_vis') barrio_vis!: ElementRef<HTMLInputElement>
   @ViewChild('confir_vis') confir_vis!: ElementRef<HTMLInputElement>
   @ViewChild('volver_vis') volver_vis!: ElementRef<HTMLInputElement>
   @ViewChild('discap_vis') discap_vis!: ElementRef<HTMLInputElement>
   @ViewChild('coment_vis') coment_vis!: ElementRef<HTMLInputElement>
   @ViewChild('pasaje_vis') pasaje_vis!: ElementRef<HTMLInputElement>
   @ViewChild('intension_voto_vis') intension_voto_vis!: ElementRef<HTMLInputElement>
  
  constructor(private fb                : FormBuilder, 
              private serviVisitas : VisitasService,
              private modalService       : NgbModal
              ) { }

 
    ci_visita        : string = '';
    nombre_visita    : string = '';
    apellido_visita  : string = '';
    sexo_visita      : string = '';
    fechaNac_visita      : string = '';
    estadoCivil_visita      : string = '';
    telefono_visita  : string = '';
    barrio_visita  : string = '';
    direccion_visita : string = '';
    nroCasa_visita  : string = '';

    confirmar_visita  : string = '';
    volver_visita  : string = '';
    discap_visita  : string = '';
    pasaje_visita  : string = '';
    intension_voto_visita  : string = '';
    f_visita           : string = '';
    f_hora           : string = '';
    vis_comentario     : string = '';
    
   mensaje              : string = '';
   mensaje_error        : string = '';
   mostrarMensaje_true  : boolean = false;
   mostrarMensaje_err   : boolean = false;

   VIS_FECHA : boolean = false;
   VIS_HORA : boolean = false;
   REGISTRAR : boolean = true
   ACTUALIZAR : boolean = false
   VISITADOS : boolean = true
   PADRON : boolean = false

  currentYear: number = new Date().getFullYear();

    //Para el Modal
  btnVisitados      : boolean = true;
  btnDis           : boolean = true;
  closeResult      : string = '';

   listVisitados  : any;
   listPadron  : any;

  ngOnInit(): void {

    (document.querySelector("#overlay") as HTMLElement).hidden = false;

    this.getDateDay();

     setTimeout(() => {
        (document.querySelector("#overlay") as HTMLElement).hidden = true;
      }, 500);

  }    

  submit() {
    console.table("Form Submitted")
    
  }

   getDateDay(){

    this.serviVisitas.dateDay().subscribe(
        data => {
          let result: any = data;
          this.f_visita = result.hoy;
          this.coment_vis.nativeElement.value = '';
      });
  }

  onBuscarVisitadoNameLast(){
    
      let dataNameLast = $('#searchPrdo').val().toString();
    console.log(dataNameLast);

      if (dataNameLast != '') {
        //let nroDoc = dataProp.split(' ')[0];
        let nombreApe = dataNameLast.split(' ')[0] + '%' + dataNameLast.split(' ')[1];
      
        let dataSend = {nombreApellido: nombreApe};

        console.log(dataSend);
     
        this.serviVisitas.getVisitadoDataToNameLast(dataSend).subscribe(
            data => {
            let result: any = data;

           console.log(result);

            let listVisit = result.dataVisitado;
            let listPadrn   = result.dataPadron;

            if (listVisit) {
              
              (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = '';
              this.VISITADOS = true
              this.PADRON = false
              this.listVisitados = listVisit

               //this.VIS_HORA            = true;
              this.mostrarMensaje_err  = false
              this.ACTUALIZAR          = true
              this.REGISTRAR           = false

            }else if(listPadrn){

              (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = '';
              this.PADRON = true
              this.VISITADOS = false
              this.listPadron = listPadrn

               //this.VIS_HORA            = false;
              this.mostrarMensaje_err  = false
              this.ACTUALIZAR          = false
              this.REGISTRAR           = true

            }else{

              (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = 'No se ha encontrado Nombre y Apellido!!';
              this.listPadron = [];
               this.listVisitados = [];
            }
           
        });

      }else{
        (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = 'No se ingresaron datos de busqueda!!';
      }

    };

    selectVisitados(ci: string, nombres: string, ape:string, sex: string,
                  tel: string, barr:string, dir:string, nroCasa:string,
                  conf:string, volv:string, f_vis: string, hora_vis:string, coment: string ) {

         this.ci_visita        = ci;
          this.nombre_visita   = nombres;
          this.apellido_visita = ape;
          this.sexo_visita     = sex;
          this.telefono_visita                = tel;
          this.barrio_vis.nativeElement.value = barr;
          this.direccion_visita               = dir;
          this.nroCasa_visita                 = nroCasa;
      
          this.confir_vis.nativeElement.value = conf;
          this.volver_vis.nativeElement.value = volv;
          this.f_visita                       = f_vis
          this.f_hora                         = hora_vis
          this.coment_vis.nativeElement.value = coment;

      this.modalService.dismissAll();
    }

    selectPadron(ci: string, nombres: string, ape: string, sex: string, fec_nac){

         this.ci_visita        = ci;
          this.nombre_visita   = nombres;
          this.apellido_visita = ape;
          this.sexo_visita     = sex;
          this.fechaNac_visita     = fec_nac;

          this.telefono_visita = '';
          this.barrio_vis.nativeElement.value  = '';
          this.direccion_visita = '';
          this.nroCasa_visita   = '';
      
          this.confir_vis.nativeElement.value = '1';
          this.volver_vis.nativeElement.value = '0';
          this.f_visita 
          this.f_hora = ''
          this.coment_vis.nativeElement.value = '';

      this.modalService.dismissAll();
    }

 
  onCiVisita(nroCi: string): void{

    (document.querySelector("#overlay") as HTMLElement).hidden = false;

    if (nroCi != '') {
      
      let dataSend = {nroCi}
      console.log(dataSend);

      this.serviVisitas.postCiVisita(dataSend).subscribe(
        data => {

          let result: any = data;
          console.log(result);

          let dataVisitados = result.dataVisitados;
          let dataPadron = result.dataPadron;

          if (dataVisitados) {
              
            this.ci_visita        = dataVisitados[0].vis_ci;
            this.nombre_visita    = dataVisitados[0].vis_nombre;
            this.apellido_visita  = dataVisitados[0].vis_apellido;
            this.sexo_vis.nativeElement.value     = dataVisitados[0].vis_sexo;;
            this.fechaNac_visita                  = dataVisitados[0].vis_fecha_nac;
            this.telefono_visita                  = dataVisitados[0].vis_telefono;
            this.barrio_vis.nativeElement.value   = dataVisitados[0].vis_brrio_cnia;
            this.direccion_visita                 = dataVisitados[0].vis_direccion;
            this.nroCasa_visita                   = dataVisitados[0].vis_nro_casa;
            
            this.confir_vis.nativeElement.value   = dataVisitados[0].vis_confirmar;
            this.volver_vis.nativeElement.value   = dataVisitados[0].vis_volver;
            this.f_visita                         = dataVisitados[0].vis_fecha;
            this.f_hora                           = dataVisitados[0].vis_hora;
            this.coment_vis.nativeElement.value   = dataVisitados[0].vis_comentario;
            
           // this.VIS_HORA            = true;
            this.mostrarMensaje_err  = false
            this.ACTUALIZAR          = true
            this.REGISTRAR           = false
            
          }else if(dataPadron){
            
            this.ci_visita        = dataPadron[0].CEDULA;
            this.nombre_visita   = dataPadron[0].NOMBRE;
              this.apellido_visita = dataPadron[0].APELLIDO;
              this.sexo_visita     = dataPadron[0].SEXO;
              this.fechaNac_visita = dataPadron[0].FEC_NAC;
              this.telefono_visita = '';
             // this.estadoCivil_vis.nativeElement.value  = '';
             this.barrio_vis.nativeElement.value  = '';
              this.direccion_visita = '';
              this.nroCasa_visita = '';
          
              this.confir_vis.nativeElement.value = '1';
              this.volver_vis.nativeElement.value = '0';
              this.f_visita 
              this.f_hora = '0'
              this.coment_vis.nativeElement.value = '';

            
            // this.VIS_HORA = false;
               this.ACTUALIZAR = false
              this.REGISTRAR = true

              this.mostrarMensaje_err = false
               window.scroll(0,0);

          }else{
             let msg = 'Datos no registrado!!';
              this.mensaje_error = msg;
              this.mostrarMensaje_err = true
              this.mostrarMensaje_true = false;
              this.clearCamposVisita();
          }

           setTimeout(() => {
                (document.querySelector("#overlay") as HTMLElement).hidden = true;
              }, 1000);
         
      });
    }else{
   
      let msg = 'Debe ingresar CI del Visitado/a';
      this.mensaje_error = msg;
      this.mostrarMensaje_err = true
   //  this.clearCamposVisita();
     //this.REGISTRAR = true
     window.scroll(0,0);

    }
  }

  saveVisita() {

        // Aquí puedes llamar a un servicio para guardar en la base de datos
    let ci_visita           = this.ci_visita;
    let nombre_visita       = this.nombre_visita;
    let apellido_visita     = this.apellido_visita
    let sexo_visita         = this.sexo_vis.nativeElement.value;
    let fechaNac_visita     = this.fechaNac_visita;
    //let estadoCivil_visita  = this.estadoCivil_vis.nativeElement.value;
    let telefono_visita     = this.telefono_visita;
    let barrio_visita       = this.barrio_vis.nativeElement.value;
    let direccion_visita    = this.direccion_visita;
    let nroCasa_visita      = this.nroCasa_visita;

    let confirmar_visita    = this.confir_vis.nativeElement.value;
    let volver_visita       = this.volver_vis.nativeElement.value;
    let discap_visita       = this.discap_vis.nativeElement.value;
    let f_visita            = this.f_visita;
    let coment_visita       = this.coment_vis.nativeElement.value;
  
    let dataSend = {ci_visita, nombre_visita, apellido_visita, sexo_visita, fechaNac_visita, 
                     telefono_visita, barrio_visita, direccion_visita, 
                    nroCasa_visita, confirmar_visita, volver_visita, discap_visita, f_visita, coment_visita};

    console.log(dataSend);

    this.serviVisitas.insDataVisitas(dataSend).subscribe(
      data => {
         
        let result : any = data;
          console.log(result);

                if (!result.data.error) {
              
                    this.mensaje = result.data.msg;
                    this.mostrarMensaje_true = true;
                      this.mostrarMensaje_err = false;
                      this.clearCamposVisita();
                    window.scroll(0, 0);
                }else{

                   this.mensaje_error = result.data.error;
                   this.mostrarMensaje_true = false;
                    this.mostrarMensaje_err = true;
                    this.clearCamposVisita();
                    window.scroll(0, 0);

                }
        });
  }

   
  updVisita(){
    
    // Aquí puedes llamar a un servicio para guardar en la base de datos
    console.log('Visitante actualizado');

    let ci_visita           = this.ci_visita;
    let nombre_visita       = this.nombre_visita;
    let apellido_visita     = this.apellido_visita;
    let fechaNac_visita     = this.fechaNac_visita;
    let telefono_visita     = this.telefono_visita;
    let barrio_visita       = this.barrio_vis.nativeElement.value;
    let direccion_visita    = this.direccion_visita;
    let nroCasa_visita      = this.nroCasa_visita;

    let confirmar_visita    = this.confir_vis.nativeElement.value;
    let volver_visita       = this.volver_vis.nativeElement.value;
     let discap_visita       = this.discap_vis.nativeElement.value;
    let f_visita            = this.f_visita;
    let coment_visita       = this.coment_vis.nativeElement.value;

    let dataSend = {ci_visita, nombre_visita, apellido_visita, fechaNac_visita, 
                    telefono_visita,  barrio_visita, direccion_visita, 
                    nroCasa_visita, confirmar_visita, volver_visita, discap_visita,
                    f_visita, coment_visita};

    console.log(dataSend);

       this.serviVisitas.updDataVisitas(dataSend).subscribe(
      data => {
         
        let result : any = data;
          console.log(result.data);

                if (!result.data.error) {
              
                    this.mensaje = result.data.msg;
                    this.mostrarMensaje_true = true;
                      this.mostrarMensaje_err = false;
                     this.clearCamposVisita();
                    window.scroll(0, 0);

                }else{

                   this.mensaje_error = result.data.error;
                   this.mostrarMensaje_true = false;
                    this.mostrarMensaje_err = true;
                   this.clearCamposVisita();
                    window.scroll(0, 0);

                }
        });

  }

   clearCamposVisita() : void{

    this.ci_visita = '';
    this.nombre_visita = '';
    this.apellido_visita = '';
    this.sexo_vis.nativeElement.value = '';
    this.fechaNac_visita = '';
    this.telefono_visita = '';
    //this.estadoCivil_vis.nativeElement.value  = '';
   this.barrio_vis.nativeElement.value  = '';
    this.direccion_visita = '';
    this.nroCasa_visita = '';

    this.confir_vis.nativeElement.value = '1';
    this.volver_vis.nativeElement.value = '0';
    this.f_visita 
    this.f_hora = '0'
    this.coment_vis.nativeElement.value = '';
        
        
    }

     open(content,disable=true, long = 'lg', focus='x' ) {

      if(disable){
  
        if(long == 'sm'){
            this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:  'sm', backdrop: 'static'}).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
            //  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }
  
        if(long == 'lg'){
            this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:  'lg', backdrop: 'static'}).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
            //  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }
  
        // aqui agregamos el focus
        if(focus != 'x'){
          setTimeout(() => {
            (document.querySelector<HTMLInputElement>('#'+focus)).focus();
          }, 500);
  
        }
      }
    }

    



}
