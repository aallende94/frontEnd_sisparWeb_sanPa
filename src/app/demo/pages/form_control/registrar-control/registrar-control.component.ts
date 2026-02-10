import { Component, Input, OnChanges, OnInit, ViewChild, ElementRef, TemplateRef  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
//import { HttpClientModule } from "@angular/common/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { ConfigService } from '../../../helpers/config.service';
//import { TokenService } from '../../../services/token.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ParticipanteService } from '../../../services/participantes.service';
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
   FVILLALBA  : boolean = true
   CCRISTALDO : boolean = false
   VIS_HORA   : boolean = false

  currentYear : number = new Date().getFullYear();

    //Para el Modal
  btnVisitados     : boolean = true;
  btnDis           : boolean = true;
  closeResult      : string = '';

   listFvillalba  : any;
   listCcristaldo : any;

   disableOpe  : boolean = false;
   estado : number

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

           //console.log(result);

            let list_fvillalba = result.list_fvillalba;
            let list_ccristaldo   = result.list_ccristaldo;
            let nombre_consejal   = result.consejal;

            if (list_fvillalba) {
              
              (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = '';
              this.FVILLALBA = true
              this.CCRISTALDO = false
              this.listFvillalba = list_fvillalba
              this.nombre_consejal = nombre_consejal

               this.VIS_HORA            = true;
              this.mostrarMensaje_err  = false
              this.ACTUALIZAR          = false
              this.REGISTRAR           = true

            }else if(list_ccristaldo){

              (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = '';
              this.FVILLALBA = false
              this.CCRISTALDO = true
              this.listCcristaldo = list_ccristaldo
              this.nombre_consejal = nombre_consejal

               this.VIS_HORA            = false;
              this.mostrarMensaje_err  = false
              this.ACTUALIZAR          = false
              this.REGISTRAR           = true

            }else{

              (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = 'No se ha encontrado Nombre y Apellido!!';
              this.listFvillalba = [];
               this.listCcristaldo = [];
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

  //         let list_fvillalba = result.list_fvillalba;
  //         let list_ccristaldo   = result.list_ccristaldo;
  //         let nombre_consejal   = result.consejal;

  //         if (list_fvillalba) {

  //           this.nombre_consejal = nombre_consejal

  //          this.ci_votante        = list_fvillalba[0].CEDULA;
  //           this.nombre_votante   = list_fvillalba[0].NOMBRE;
  //           this.apellido_votante = list_fvillalba[0].APELLIDO;
  //           this.sexo_votante     = list_fvillalba[0].SEXO;
  //           this.direccion_votante = '';

  //           this.depar_votante     = list_fvillalba[0].DEPART;
  //           this.distrito_votante  = list_fvillalba[0].DISTRITO;
  //           this.local_votante     = list_fvillalba[0].LOCAL;
  //           this.mesa_votante      = '';
  //           this.orden_votante     = '';
  //           this.voto_votante      = '1';
  //           this.medioP_votante    = '0';
  //           this.monto_votante     = '0';

  //           this.mostrarMensaje_err = false
  //           this.ACTUALIZAR = false
  //           this.REGISTRAR = true
  
  //         }else if(list_ccristaldo){

  //           this.nombre_consejal = nombre_consejal

  //           this.ci_votante        = list_ccristaldo[0].CEDULA;
  //           this.nombre_votante   = list_ccristaldo[0].NOMBRE;
  //           this.apellido_votante = list_ccristaldo[0].APELLIDO;
  //           this.sexo_votante     = list_ccristaldo[0].SEXO;
  //           this.direccion_votante = '';

  //           this.depar_votante     = list_ccristaldo[0].DEPART;
  //           this.distrito_votante  = list_ccristaldo[0].DISTRITO;
  //           this.local_votante     = list_ccristaldo[0].LOCAL;
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

          let list_fvillalba = result.list_fvillalba;
          let list_ccristaldo   = result.list_ccristaldo;
          let list_padron   = result.dataPadron;
          let nombre_consejal   = result.consejal;

          if (list_fvillalba) {
            this.estado = 1
          }else if(list_ccristaldo){
            this.estado = 2
          }else if(list_padron){
              this.estado = 3
          }

          console.log(this.estado);

          switch (this.estado) {
            case 1:

                this.nombre_consejal = nombre_consejal
               this.ci_votante        = list_fvillalba[0].CEDULA;
                this.nombre_votante   = list_fvillalba[0].NOMBRE;
                this.apellido_votante = list_fvillalba[0].APELLIDO;
                this.sexo_votante     = list_fvillalba[0].SEXO;
                this.direccion_votante = '';
    
                this.depar_votante     = list_fvillalba[0].DEPART;
                this.distrito_votante  = list_fvillalba[0].DISTRITO;
                this.local_votante     = list_fvillalba[0].LOCAL;
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

                 this.nombre_consejal = nombre_consejal

                this.ci_votante        = list_ccristaldo[0].CEDULA;
                this.nombre_votante   = list_ccristaldo[0].NOMBRE;
                this.apellido_votante = list_ccristaldo[0].APELLIDO;
                this.sexo_votante     = list_ccristaldo[0].SEXO;
                this.direccion_votante = '';
    
                this.depar_votante     = list_ccristaldo[0].DEPART;
                this.distrito_votante  = list_ccristaldo[0].DISTRITO;
                this.local_votante     = list_ccristaldo[0].LOCAL;
                this.mesa_votante      = '';
                this.orden_votante     = '';
                this.voto_votante      = '1';
                this.medioP_votante    = '0';
                this.monto_votante     = '0';
    
                this.ACTUALIZAR          = false
                this.REGISTRAR           = true
              
              break;

            case 3:

                 this.nombre_consejal = nombre_consejal

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
  
    let dataSend = {ci_votante, nombre_votante, apellido_votante, 
                    sexo_votante, direccion_votante, depar_votante,
                    distrito_votante, local_votante, mesa_votante,
                    orden_votante, voto_votante, medioP_votante, monto_votante, cod_consejal
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
