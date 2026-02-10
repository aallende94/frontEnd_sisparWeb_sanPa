import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { UsersModule } from '../models/users/users.module';
import { ConfigService } from '../helpers/config.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {


  constructor(private http: HttpClient,private config: ConfigService) { }

  dateDay(){
  
    let path = 'cliente/getParams';
    return this.http.get(this.config.url+path);
  }

   getParticDataToNameLast(dataSend: any){
  
    let dir = 'participantes/dataPartiToNameLast'; 
    return this.http.post(this.config.url+dir, dataSend)
  }

  postNroOrdenParticip(params: any){
  
    let dir = 'participantes/nroOrdenParticipante';
    return this.http.post(this.config.url+dir, params);
  }
  
  postCiParticip(params: any){
  
    let dir = 'participantes/ciParticipante';
    return this.http.post(this.config.url+dir, params);
  }

  //ActualizarTokenUser
  insDataParticip(params: any){

    let dir = 'participantes/insertData';
    return this.http.post(this.config.url+dir, params);
  }

  updDataParticipante(params: any){
  
    let dir = 'participantes/actualizaData';
    return this.http.post(this.config.url+dir, params);
  }

   listDataParticipante(params: any){
  
    let dir = 'participantes/listDataParticipante';
    return this.http.get(this.config.url+dir, params);
  }

  

}
