import { Component, Input, OnChanges, OnInit, ViewChild, ElementRef, TemplateRef  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
//import { HttpClientModule } from "@angular/common/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { ConfigService } from '../../../helpers/config.service';
//import { TokenService } from '../../../services/token.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

import { ControlListService } from '../../../services/controlList.service';

@Component({
  selector: 'app-basic-elements',
  templateUrl: './registrar-control.component.html',
  styleUrls: ['./registrar-control.component.scss']
})
export class RegistrarControlComponent implements OnInit {


   @ViewChild('cod_voto_cli') cod_voto_cli!: ElementRef<HTMLInputElement>
   @ViewChild('cod_consejal') cod_consejal!: ElementRef<HTMLInputElement>
  
  constructor(private fb                : FormBuilder, 
              private serviControlList : ControlListService,
               private modalService       : NgbModal
              ) { }

 
    nombre_consejal    : string = '';
    cod_preCandidato   : any;
    
    ci_votante        : string = '';
    nombre_votante    : string = '';
    apellido_votante  : string = '';
    direccion_votante : string = '';
    sexo_votante      : string = '';
    //telefono_votante  : string = '';
    
    depar_votante     : string = '';
    distrito_votante  : string = '';
    seccional_votante : string = '';
    local_votante     : string = '';
    mesa_votante     : string = '';
    orden_votante     : string = '';
    voto_votante      : string = '1';
    medioP_votante    : string = '0';
    monto_votante     : string = '0';
    
   mensaje              : string = '';
   mensaje_error        : string = '';
   mostrarMensaje_true  : boolean = false;
   mostrarMensaje_err   : boolean = false;

   REGISTRAR  : boolean = true
   ACTUALIZAR : boolean = false
   PRECANDIDATO_1  : boolean = true
   PRECANDIDATO_2 : boolean = false
   PADRON : boolean = false;
   VIS_HORA   : boolean = false

  currentYear : number = new Date().getFullYear();

    //Para el Modal
  btnVisitados     : boolean = true;
  btnDis           : boolean = true;
  closeResult      : string = '';

   listPreCand_1  : any;
   listPreCand_2  : any;
   listPadron  : any;
   
   disableOpe  : boolean = false;
   estado : number

    arrayPreCandidatos   : any[] = [];
   selecPreCandidatos: any; 
   preCandidatos : string;
   codPreCandidatoSelec: number | null = null;

  ngOnInit(): void {

    (document.querySelector("#overlay") as HTMLElement).hidden = false;

     setTimeout(() => {
        (document.querySelector("#overlay") as HTMLElement).hidden = true;
      }, 500);

  }    

  submit() {
    console.table("Form Submitted")
  }

  onBuscarVisitadoNameLast(){
    
      let dataNameLast = $('#searchPrdo').val().toString();
        console.log(dataNameLast);

      if (dataNameLast != '') {
        //let nroDoc = dataProp.split(' ')[0];
        let nombreApe = dataNameLast.split(' ')[0] + '%' + dataNameLast.split(' ')[1];
      
        let dataSend = {nombreApellido: nombreApe};
        console.log(dataSend);
     
        this.serviControlList.getParticDataToNameLast(dataSend).subscribe(
            data => {
            let result: any = data;

             console.log(result);

             if (!result.SD) {

            let list_preCandid_1 = result.info_precandidato_1;
            let list_preCandid_2   = result.info_precandidato_2;
            let list_padron        = result.dataPadron;
            let arr_preCandidatos = result.arrPreCandidatos;   // todos los precandidatos
            let preCandidato = result.preCandidato;            // puede ser número o array
          
            this.condicionPreCandidatos(arr_preCandidatos, preCandidato);

            if (list_preCandid_1) {
              this.estado = 1
            }else if(list_preCandid_2){
              this.estado = 2
            }else if(list_padron){
                this.estado = 3
            }

              switch (this.estado) {
                case 1:

                (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = '';
                  this.PRECANDIDATO_1 = true
                  this.PRECANDIDATO_2 = false
                  this.PADRON = false
                  this.listPreCand_1 = list_preCandid_1
    
                  this.VIS_HORA            = true;
                  this.mostrarMensaje_err  = false
                  this.ACTUALIZAR          = false
                  this.REGISTRAR           = true
                  
                  break;

                case 2:

                 (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = '';
                  this.PRECANDIDATO_1 = false
                  this.PRECANDIDATO_2 = true
                  this.PADRON = false
                  this.listPreCand_2 = list_preCandid_2
    
                  this.VIS_HORA            = false;
                  this.mostrarMensaje_err  = false
                  this.ACTUALIZAR          = false
                  this.REGISTRAR           = true
                  
                  break;

                  case 3:

                     (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = '';
                      this.PRECANDIDATO_1 = false
                      this.PRECANDIDATO_2 = false
                      this.PADRON = true
                      this.listPadron = list_padron;
                      
                      this.VIS_HORA            = false;
                      this.mostrarMensaje_err  = false
                      this.ACTUALIZAR          = false
                      this.REGISTRAR           = true
                 
                  break;
              
                default:
                  break;
              }
              
             }else{

              (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = 'No se ha encontrado Nombre y Apellido!!';
                this.listPreCand_1 = [];
                this.listPreCand_2 = [];
                this.listPadron = [];

             }

           
           
        });

      }else{
        (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = 'No se ingresaron datos de busqueda!!';
      }

    };

    selectfvillalba(ci: string, nombres: string, ape: string, sex: string, dpto:string, 
                  dist:string, local: string) {

          this.ci_votante         = ci;
          this.nombre_votante     = nombres;
          this.apellido_votante   = ape;
          this.sexo_votante       = sex;
          this.direccion_votante  = '';
          this.depar_votante     = dpto;
          this.distrito_votante  = dist;
          this.local_votante     = local;

          this.mesa_votante      = '';
          this.orden_votante     = '';
          this.voto_votante      = '1';
          this.medioP_votante    = '0';
          this.monto_votante     = '0';
       
           this.ACTUALIZAR          = false
            this.REGISTRAR           = true

      this.modalService.dismissAll();
    }

    selectCcristaldo(ci: string, nombres: string, ape: string, sex: string, dpto:string, 
                  dist:string, local: string){

          this.ci_votante         = ci;
          this.nombre_votante     = nombres;
          this.apellido_votante   = ape;
          this.sexo_votante       = sex;
          this.direccion_votante  = '';
          this.depar_votante     = dpto;
          this.distrito_votante  = dist;
          this.local_votante     = local;

          this.mesa_votante      = '';
          this.orden_votante     = '';
          this.voto_votante      = '1';
          this.medioP_votante    = '0';
          this.monto_votante     = '0';

           this.ACTUALIZAR          = false
            this.REGISTRAR           = true
      
      this.modalService.dismissAll();
    }

  // onNroOrden(nroOrd: string){

  //   (document.querySelector("#overlay") as HTMLElement).hidden = false;

  //   if (nroOrd != '') {
      
  //     let dataSend = {nroOrd}
  //     console.log(dataSend);

  //     this.serviControlList.postNroOrdenParticip(dataSend).subscribe(
  //       data => {

  //         let result: any = data;
  //         console.log(result);

  //         let list_preCandid_1 = result.list_preCandid_1;
  //         let list_preCandid_2   = result.list_ccristaldo;
  //         let nombre_consejal   = result.consejal;

  //         if (list_preCandid_1) {

  //           this.nombre_consejal = nombre_consejal

  //          this.ci_votante        = list_preCandid_1[0].CEDULA;
  //           this.nombre_votante   = list_preCandid_1[0].NOMBRE;
  //           this.apellido_votante = list_preCandid_1[0].APELLIDO;
  //           this.sexo_votante     = list_preCandid_1[0].SEXO;
  //           this.direccion_votante = '';

  //           this.depar_votante     = list_preCandid_1[0].DEPART;
  //           this.distrito_votante  = list_preCandid_1[0].DISTRITO;
  //           this.local_votante     = list_preCandid_1[0].LOCAL;
  //           this.mesa_votante      = '';
  //           this.orden_votante     = '';
  //           this.voto_votante      = '1';
  //           this.medioP_votante    = '0';
  //           this.monto_votante     = '0';

  //           this.mostrarMensaje_err = false
  //           this.ACTUALIZAR = false
  //           this.REGISTRAR = true
  
  //         }else if(list_preCandid_2){

  //           this.nombre_consejal = nombre_consejal

  //           this.ci_votante        = list_preCandid_2[0].CEDULA;
  //           this.nombre_votante   = list_preCandid_2[0].NOMBRE;
  //           this.apellido_votante = list_preCandid_2[0].APELLIDO;
  //           this.sexo_votante     = list_preCandid_2[0].SEXO;
  //           this.direccion_votante = '';

  //           this.depar_votante     = list_preCandid_2[0].DEPART;
  //           this.distrito_votante  = list_preCandid_2[0].DISTRITO;
  //           this.local_votante     = list_preCandid_2[0].LOCAL;
  //           this.mesa_votante      = '';
  //           this.orden_votante     = '';
  //           this.voto_votante      = '1';
  //           this.medioP_votante    = '0';
  //           this.monto_votante     = '0';

  //           this.ACTUALIZAR          = false
  //           this.REGISTRAR           = true

  //         }else{

  //            //this.ruc_votante       = '';
  //            this.nombre_votante    = '';
  //             this.direccion_votante = '';
  //             this.voto_votante  = '1'

  //               let msg = 'Datos no encontrado!!';
  //               this.mensaje_error = msg;
  //               this.mostrarMensaje_err = true
  //            //  this.clearCamposCliente();
  //              this.ACTUALIZAR = false
  //             this.REGISTRAR = true
  //              window.scroll(0,0);

  //         }

  //          setTimeout(() => {
  //               (document.querySelector("#overlay") as HTMLElement).hidden = true;
  //             }, 1000);
         
  //     });
  //   }else{
   
  //     let msg = 'Debe ingresar CI del Votante!!';
  //     this.mensaje_error = msg;
  //     this.mostrarMensaje_err = true
  //  //  this.clearCamposCliente();
  //    //this.REGISTRAR = true
  //    window.scroll(0,0);

  //   }

  // }

  onCiVotante(nroCi: string): void{

    (document.querySelector("#overlay") as HTMLElement).hidden = false;

    if (nroCi != '') {
      
      let dataSend = {nroCi}
      console.log(dataSend);

      this.serviControlList.postCiVotante(dataSend).subscribe(
        data => {

          let result: any = data;
          console.log(result);

          if (!result.SD) {
            let list_preCandid_1   = result.info_precandidato_1;
            let list_preCandid_2   = result.info_precandidato_2;
            let list_padron        = result.dataPadron;
            let arr_preCandidatos = result.arrPreCandidatos;   // todos los precandidatos
              let preCandidato = result.preCandidato;            // puede ser número o array
              
             this.condicionPreCandidatos(arr_preCandidatos, preCandidato);
  
            // this.mensaje           = result.info;
            // this.mostrarMensaje_true = true;
  
            if (list_preCandid_1) {
              this.estado = 1
            }else if(list_preCandid_2){
              this.estado = 2
            }else if(list_padron){
                this.estado = 3
            }
  
            switch (this.estado) {
              case 1:

                  this.ci_votante        = list_preCandid_1[0].CEDULA;
                  this.nombre_votante   = list_preCandid_1[0].NOMBRE;
                  this.apellido_votante = list_preCandid_1[0].APELLIDO;
                  this.sexo_votante     = list_preCandid_1[0].SEXO;
                  this.direccion_votante = '';
      
                  this.depar_votante     = list_preCandid_1[0].DEPART;
                  this.distrito_votante  = list_preCandid_1[0].DISTRITO;
                  this.local_votante     = list_preCandid_1[0].LOCAL;
                  this.mesa_votante      = '';
                  this.orden_votante     = '';
                  this.voto_votante      = '1';
                  this.medioP_votante    = '0';
                  this.monto_votante     = '0';
      
                  this.mostrarMensaje_err = false
                  this.ACTUALIZAR = false
                  this.REGISTRAR = true
                
                break;
  
              case 2:
  
                  this.ci_votante        = list_preCandid_2[0].CEDULA;
                  this.nombre_votante   = list_preCandid_2[0].NOMBRE;
                  this.apellido_votante = list_preCandid_2[0].APELLIDO;
                  this.sexo_votante     = list_preCandid_2[0].SEXO;
                  this.direccion_votante = '';
      
                  this.depar_votante     = list_preCandid_2[0].DEPART;
                  this.distrito_votante  = list_preCandid_2[0].DISTRITO;
                  this.local_votante     = list_preCandid_2[0].LOCAL;
                  this.mesa_votante      = '';
                  this.orden_votante     = '';
                  this.voto_votante      = '1';
                  this.medioP_votante    = '0';
                  this.monto_votante     = '0';
      
                  this.ACTUALIZAR          = false
                  this.REGISTRAR           = true
                
                break;
  
              case 3:
  
                  this.ci_votante        = list_padron[0].CEDULA;
                  this.nombre_votante   = list_padron[0].NOMBRE;
                  this.apellido_votante = list_padron[0].APELLIDO;
                  this.sexo_votante     = list_padron[0].SEXO;
                  this.direccion_votante = '';
      
                  this.depar_votante     = list_padron[0].DEPART;
                  this.distrito_votante  = list_padron[0].DISTRITO;
                  this.local_votante     = list_padron[0].LOCAL;
                  this.mesa_votante      = '';
                  this.orden_votante     = '';
                  this.voto_votante      = '1';
                  this.medioP_votante    = '0';
                  this.monto_votante     = '0';
      
                  this.ACTUALIZAR          = false
                  this.REGISTRAR           = true
                
                break;
            
              // default:
  
              //     this.nombre_votante    = '';
              //     this.direccion_votante = '';
              //     this.voto_votante  = '1'
    
              //       let msg = 'Datos no encontrado!!';
              //       this.mensaje_error = msg;
              //       this.mostrarMensaje_err = true
              //    //  this.clearCamposCliente();
              //      this.ACTUALIZAR = false
              //     this.REGISTRAR = true
              //      window.scroll(0,0);
              //   break;
            }
  
            this.mostrarMensaje_err = false;
            
          }else{
            this.selecPreCandidatos = []
            let msg = 'No existe datos en la Base de Datos!!';
              this.mensaje_error = msg;
              this.mostrarMensaje_err = true
               this.clearCamposCliente();
                    window.scroll(0, 0);
          }

          

      });
    }else{
   
      let msg = 'Debe ingresar CI del Participante!!';
      this.mensaje_error = msg;
      this.mostrarMensaje_err = true
   //  this.clearCamposCliente();
     //this.REGISTRAR = true
     window.scroll(0,0);

    }

     setTimeout(() => {
          (document.querySelector("#overlay") as HTMLElement).hidden = true;
        }, 1000);
  }

   condicionPreCandidatos(arr_preCandidatos: any, preCandidato: any) {

       // Normalizamos: si es número, lo convertimos en array
            if (!Array.isArray(preCandidato)) {
              preCandidato = [preCandidato];
            }
            
            if (arr_preCandidatos && arr_preCandidatos.length > 0) {
              // Caso especial: si solo viene el valor 3
              if (preCandidato.length === 1 && preCandidato[0] === 3) {
                this.arrayPreCandidatos = arr_preCandidatos.filter((item: any) => item.cod_preCandidato === 3);
                this.selecPreCandidatos = [3];
              } else {
                // Filtramos los precandidatos que estén en el array preCandidato y que NO sean 3
                this.arrayPreCandidatos = arr_preCandidatos.filter((item: any) =>
                  preCandidato.includes(item.cod_preCandidato) && item.cod_preCandidato !== 3
                );
                this.selecPreCandidatos = this.arrayPreCandidatos.map((item: any) => item.cod_preCandidato);
              }
            } else {
              console.log("==No hay registros PreCandidatos==");
              this.selecPreCandidatos = [3]; // fallback a INTENDENCIA
            }

    }


  insVotante() {

    // Aquí puedes llamar a un servicio para guardar en la base de datos
    let ci_votante        = this.ci_votante;
    let nombre_votante    = this.nombre_votante;
    let apellido_votante  = this.apellido_votante
    let sexo_votante      = this.sexo_votante;
    let direccion_votante = this.direccion_votante;
    
    let depar_votante     = this.depar_votante
    let distrito_votante  = this.distrito_votante
    let local_votante     = this.local_votante
    let mesa_votante      = this.mesa_votante
    let orden_votante     = this.orden_votante
    let voto_votante      = this.cod_voto_cli.nativeElement.value;
    let medioP_votante    = this.medioP_votante;
    let monto_votante     = this.monto_votante.replace(/\./g, '');
    let cod_consejal      = this.cod_consejal.nativeElement.value;

      // this.preCandidatos = this.separadorRiesgos();
      let cod_pre_candidatos = this.preCandidatos
  
    let dataSend = {ci_votante, nombre_votante, apellido_votante, 
                    sexo_votante, direccion_votante, depar_votante,
                    distrito_votante, local_votante, mesa_votante,
                    orden_votante, voto_votante, medioP_votante, monto_votante, cod_pre_candidatos
                  };

    console.log(dataSend);

    this.serviControlList.insDataVotante(dataSend).subscribe(
      data => {
         
        let result : any = data;
          console.log(result);

                if (!result.data.error) {
              
                    this.mensaje = result.data.msg;
                    this.mostrarMensaje_true = true;
                      this.mostrarMensaje_err = false;
                      this.clearCamposCliente();
                    window.scroll(0, 0);
                }else{

                   this.mensaje_error = result.data.error;
                   this.mostrarMensaje_true = false;
                    this.mostrarMensaje_err = true;
                    this.clearCamposCliente();
                    window.scroll(0, 0);

                }
        });
  }


   NumberMiles(value:any, input: string = '', obj: any = ''): void{

      let num = value.replace(/\./g,'');
      if(!isNaN(num)){
  
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/,'');
  
        switch (input) {
            case 'montoVot':
              this.monto_votante = num;
            break;
          default:
  
            break;
        }
      }else{
        // alert('Solo se permiten numeros');
        // input.value = input.value.replace(/[^\d\.]*/g,'');
      }
  
    }

  updVotante(){
    
    // Aquí puedes llamar a un servicio para guardar en la base de datos
    console.log('Votante actualizado');

     let ci_votante        = this.ci_votante;
    let nombre_votante    = this.nombre_votante;
    let apellido_votante  = this.apellido_votante
    let sexo_votante      = this.sexo_votante;
    let direccion_votante = this.direccion_votante;
    
    let depar_votante     = this.depar_votante
    let distrito_votante  = this.distrito_votante
    let local_votante     = this.local_votante
    let mesa_votante      = this.mesa_votante
    let orden_votante     = this.orden_votante
    let voto_votante      = this.cod_voto_cli.nativeElement.value;
    let medioP_votante    = this.medioP_votante;
    let monto_votante     = this.monto_votante.replace(/\./g, '');

    let dataSend = {ci_votante, nombre_votante, apellido_votante, sexo_votante,
                     direccion_votante, depar_votante, distrito_votante,
                     local_votante, mesa_votante, orden_votante, voto_votante,
                     medioP_votante, monto_votante
                    };

    console.log(dataSend);

       this.serviControlList.updDataCliente(dataSend).subscribe(
      data => {
         
        let result : any = data;
          console.log(result.data);

                if (!result.data.error) {
              
                    this.mensaje = result.data.msg;
                    this.mostrarMensaje_true = true;
                      this.mostrarMensaje_err = false;
                      this.clearCamposCliente();
                    window.scroll(0, 0);
                }else{

                   this.mensaje_error = result.data.error;
                   this.mostrarMensaje_true = false;
                    this.mostrarMensaje_err = true;
                    this.clearCamposCliente();
                    window.scroll(0, 0);

                }
        });

  }

   clearCamposCliente() : void{

         this.ci_votante = '';
        this.nombre_votante = '';
        this.apellido_votante = '';
        this.direccion_votante = '';
        this.sexo_votante = '';
        // this.telefono_votante = '';

        this.depar_votante = ''
       this.distrito_votante = ''
       this.local_votante = ''
       this.mesa_votante = ''
       this.orden_votante = ''
        this.voto_votante  = '1'
        this.medioP_votante  = '0'
        this.monto_votante  = '0'
        
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
