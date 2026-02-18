import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { UsersModule } from '../models/users/users.module';
import { ConfigService } from '../helpers/config.service';

@Injectable({
  providedIn: 'root'
})
export class ControlListService {


  constructor(private http: HttpClient,private config: ConfigService) { }

  dateDay(){
  
    let path = 'cliente/getParams';
    return this.http.get(this.config.url+path);
  }

   getParticDataToNameLast(dataSend: any){
    
    let dir = 'controlList/dataPartiToNameLast'; 
    return this.http.post(this.config.url+dir, dataSend)
  }

  postCiVotante(params: any){
  
    let dir = 'controlList/ciVotante';
    return this.http.post(this.config.url+dir, params);
  }

  //ActualizarTokenUser
  insDataVotante(params: any){

    console.log(params);
  
    let dir = 'controlList/insertData';
    return this.http.post(this.config.url+dir, params);
  }

  
  
  updDataCliente(params: any){
  
    let dir = 'controlList/actualizaData';
    return this.http.post(this.config.url+dir, params);
  }

   listDataCliente(params: any){
  
    let dir = 'controlList/listDataCliente';
    return this.http.get(this.config.url+dir, params);
  }

  

}
