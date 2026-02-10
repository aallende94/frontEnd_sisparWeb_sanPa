import { Component, Input, OnChanges, OnInit, ViewChild, ElementRef, TemplateRef  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
//import { HttpClientModule } from "@angular/common/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { ConfigService } from '../../../helpers/config.service';
//import { TokenService } from '../../../services/token.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ParticipanteService } from '../../../services/participantes.service';

@Component({
  selector: 'app-basic-elements',
  templateUrl: './registrar-participantes.component.html',
  styleUrls: ['./registrar-participantes.component.scss']
})
export class RegistrarParticipantesComponent implements OnInit {


   @ViewChild('cod_voto_cli') cod_voto_cli!: ElementRef<HTMLInputElement>
  
  constructor(private fb                : FormBuilder, 
              private serviParticip : ParticipanteService,
               private modalService       : NgbModal
              ) { }

 
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

   disableOpe        : boolean = false;

   REGISTRAR : boolean = true
   ACTUALIZAR : boolean = false
  VOTANTES : boolean = true
   PADRON : boolean = false
    VIS_HORA : boolean = false

    currentYear: number = new Date().getFullYear();

    //Para el Modal
  btnVisitados      : boolean = true;
  btnDis           : boolean = true;
  closeResult      : string = '';

   listVotantes  : any;
   listPadron  : any;

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
     
        this.serviParticip.getParticDataToNameLast(dataSend).subscribe(
            data => {
            let result: any = data;

           console.log(result);

            let listVotant = result.dataVotante;
            let listPadrn   = result.dataPadron;

            if (listVotant) {
              
              (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = '';
              this.VOTANTES = true
              this.PADRON = false
              this.listVotantes = listVotant

              this.disableOpe = true
               this.VIS_HORA            = true;
              this.mostrarMensaje_err  = false
              this.ACTUALIZAR          = true
              this.REGISTRAR           = false

            }else if(listPadrn){

              (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = '';
              this.PADRON = true
              this.VOTANTES = false
              this.listPadron = listPadrn

               this.disableOpe = false
               this.VIS_HORA            = false;
              this.mostrarMensaje_err  = false
              this.ACTUALIZAR          = false
              this.REGISTRAR           = true

            }else{

              (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = 'No se ha encontrado Nombre y Apellido!!';
              this.listPadron = [];
               this.listVotantes = [];
            }
           
        });

      }else{
        (document.querySelector<HTMLInputElement>('#error_sinDatosName')).innerHTML = 'No se ingresaron datos de busqueda!!';
      }

    };

    selectVotantes(ci: string, nombres: string, ape:string, sex: string, dir: string, dpto:string, 
                  dist:string, local: string, mesa: string, orden: string, conf: string, 
                  medPago: string, mont: string ) {

         this.ci_votante          = ci;
          this.nombre_votante     = nombres;
          this.apellido_votante   = ape;
          this.sexo_votante       = sex;
          // this.telefono_votante   = tel;
          this.direccion_votante  = dir;
          this.depar_votante      = dpto;
          this.distrito_votante   = dist;
          this.local_votante      = local;
          this.mesa_votante       = mesa;
          this.orden_votante      = orden;
          this.medioP_votante     = medPago;
          this.monto_votante      = mont;
          this.cod_voto_cli.nativeElement.value = conf;
       
           this.disableOpe = true;
           this.ACTUALIZAR          = true
            this.REGISTRAR           = false

      this.modalService.dismissAll();
    }

    selectPadron(ci: string, nombres: string, ape: string, sex: string, dpto:string, 
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

           this.disableOpe = false;
           this.ACTUALIZAR          = false
            this.REGISTRAR           = true
      
      this.modalService.dismissAll();
    }

    onNroOrden(nroOrden: string): void{
  
      (document.querySelector("#overlay") as HTMLElement).hidden = false;
  
      if (nroOrden != '') {
        
        let dataSend = {nroOrden}
        console.log(dataSend);
  
        this.serviParticip.postNroOrdenParticip(dataSend).subscribe(
          data => {
  
            let result: any = data;
            console.log(result);
  
            let dataVotantes = result.dataVotantes;
            let dataPadron = result.dataPadron;
  
            if (dataVotantes) {
  
              this.ci_votante        = dataVotantes[0].vot_ci;
              this.nombre_votante    = dataVotantes[0].vot_nombre;
              this.apellido_votante  = dataVotantes[0].vot_apellido;
              this.sexo_votante      = dataVotantes[0].vot_sexo;
              this.direccion_votante = dataVotantes[0].vot_direccion;
  
              this.depar_votante     = dataVotantes[0].vot_dpto
              this.distrito_votante  = dataVotantes[0].vot_dist
              this.local_votante     = dataVotantes[0].vot_local
              this.mesa_votante      = dataVotantes[0].vot_mesa
              this.orden_votante     = dataVotantes[0].vot_orden
              this.voto_votante      = dataVotantes[0].vot_confirma_voto;
              this.medioP_votante    = dataVotantes[0].vot_medio_pago;
              this.monto_votante     = dataVotantes[0].vot_monto;
  
              this.disableOpe = true

               let msg = 'El registro ya existe. No se puede duplicar.';
              this.mensaje = msg;

              this.mostrarMensaje_err = false
              this.mostrarMensaje_true = true
              this.ACTUALIZAR = true
              this.REGISTRAR = false
    
            }else if(dataPadron){
  
              this.ci_votante        = dataPadron[0].CEDULA;
              this.nombre_votante   = dataPadron[0].NOMBRE;
              this.apellido_votante = dataPadron[0].APELLIDO;
              this.sexo_votante     = dataPadron[0].SEXO;
              this.direccion_votante = '';
  
              this.depar_votante     = dataPadron[0].DEPART;
              this.distrito_votante  = dataPadron[0].DISTRITO;
              this.local_votante     = dataPadron[0].LOCAL;
              this.mesa_votante      = '';
              this.orden_votante     = '';
              this.voto_votante      = '1';
              this.medioP_votante    = '0';
              this.monto_votante     = '0';
  
              this.disableOpe = false;
              this.ACTUALIZAR          = false
              this.REGISTRAR           = true
               this.mostrarMensaje_true = false
            this.mostrarMensaje_err = false
  
  
            }else{
  
               //this.ruc_votante       = '';
               this.nombre_votante    = '';
                this.direccion_votante = '';
                this.voto_votante  = '1'
  
                  let msg = 'Datos no encontrado!!';
                  this.mensaje_error = msg;
                    this.mostrarMensaje_err = true
                this.mostrarMensaje_true = false
                 this.clearCamposCliente();
                 this.ACTUALIZAR = false
                this.REGISTRAR = true
                 window.scroll(0,0);
  
            }
  
           
           
        });
      }else{
     
        let msg = 'Debe ingresar Nro de Orden.';
        this.mensaje_error = msg;
        this.mostrarMensaje_err = true
         this.mostrarMensaje_true = false
         this.clearCamposCliente();
       //this.REGISTRAR = true
       window.scroll(0,0);
  
      }
        setTimeout(() => {
                  (document.querySelector("#overlay") as HTMLElement).hidden = true;
                }, 1000);
    }

    onCiVotante(nroCi: string): void{

    (document.querySelector("#overlay") as HTMLElement).hidden = false;

    if (nroCi != '') {
      
      let dataSend = {nroCi}
      console.log(dataSend);

      this.serviParticip.postCiParticip(dataSend).subscribe(
        data => {

          let result: any = data;
          console.log(result);

          let dataVotantes = result.dataVotantes;
          let dataPadron = result.dataPadron;

          if (dataVotantes) {

            this.ci_votante        = dataVotantes[0].vot_ci;
            this.nombre_votante    = dataVotantes[0].vot_nombre;
            this.apellido_votante  = dataVotantes[0].vot_apellido;
            this.sexo_votante      = dataVotantes[0].vot_sexo;
            this.direccion_votante = dataVotantes[0].vot_direccion;

            this.depar_votante     = dataVotantes[0].vot_dpto
            this.distrito_votante  = dataVotantes[0].vot_dist
            this.local_votante     = dataVotantes[0].vot_local
            this.mesa_votante      = dataVotantes[0].vot_mesa
            this.orden_votante     = dataVotantes[0].vot_orden
            this.voto_votante      = dataVotantes[0].vot_confirma_voto;
            this.medioP_votante    = dataVotantes[0].vot_medio_pago;
            this.monto_votante     = dataVotantes[0].vot_monto;

            this.disableOpe = true

             let msg = 'El registro ya existe. No se puede duplicar.';
              this.mensaje = msg;

            this.mostrarMensaje_err = false
            this.mostrarMensaje_true = true
            this.ACTUALIZAR = true
            this.REGISTRAR = false
  
          }else if(dataPadron){

            this.ci_votante        = dataPadron[0].CEDULA;
            this.nombre_votante   = dataPadron[0].NOMBRE;
            this.apellido_votante = dataPadron[0].APELLIDO;
            this.sexo_votante     = dataPadron[0].SEXO;
            this.direccion_votante = '';

            this.depar_votante     = dataPadron[0].DEPART;
            this.distrito_votante  = dataPadron[0].DISTRITO;
            this.local_votante     = dataPadron[0].LOCAL;
            this.mesa_votante      = '';
            this.orden_votante     = '';
            this.voto_votante      = '1';
            this.medioP_votante    = '0';
            this.monto_votante     = '0';

            this.disableOpe = false;
            this.ACTUALIZAR          = false
            this.REGISTRAR           = true
            this.mostrarMensaje_true = false
            this.mostrarMensaje_err = false


          }else{

             //this.ruc_votante       = '';
             this.nombre_votante    = '';
              this.direccion_votante = '';
              this.voto_votante  = '1'

                let msg = 'Datos no encontrado!!';
                this.mensaje_error = msg;
                this.mostrarMensaje_err = true
                this.mostrarMensaje_true = false
              this.clearCamposCliente();
               this.ACTUALIZAR = false
              this.REGISTRAR = true
               window.scroll(0,0);

          }

       
      });
    }else{
   
      let msg = 'Debe ingresar CI del Participante.';
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
    let monto_votante     = this.monto_votante.replace(/\./g, '');;
  
    let dataSend = {ci_votante, nombre_votante, apellido_votante, 
                    sexo_votante, direccion_votante, depar_votante,
                    distrito_votante, local_votante, mesa_votante,
                    orden_votante, voto_votante, medioP_votante, monto_votante
                  };

    //console.log(dataSend);

    this.serviParticip.insDataParticip(dataSend).subscribe(
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

       this.serviParticip.updDataParticipante(dataSend).subscribe(
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
       //this.orden_votante = ''
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
