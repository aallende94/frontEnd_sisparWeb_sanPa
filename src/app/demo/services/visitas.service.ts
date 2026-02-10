import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { UsersModule } from '../models/users/users.module';
import { ConfigService } from '../helpers/config.service';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {


  constructor(private http: HttpClient,private config: ConfigService) { }

  dateDay(){
  
    let path = 'visitas/getParams';
    return this.http.get(this.config.url+path);
  }

   getVisitadoDataToNameLast(dataSend: any){
  
    let dir = 'visitas/dataVisistadoToNameLast'; 
    return this.http.post(this.config.url+dir, dataSend)
  }

  postCiVisita(params: any){
    
      let dir = 'visitas/ciVisita';
      return this.http.post(this.config.url+dir, params);
    }
  
  insDataVisitas(params: any){
  
    let dir = 'visitas/insertaData';
    return this.http.post(this.config.url+dir, params);
  }

  updDataVisitas(params: any){
  
    let dir = 'visitas/updData';
    return this.http.post(this.config.url+dir, params);
  }

   listDataVisitas(params: any){
  
    let dir = 'visitas/listDataVisitas';
    return this.http.get(this.config.url+dir, params);
  }

  

}
