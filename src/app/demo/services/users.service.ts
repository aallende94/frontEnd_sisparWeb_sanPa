import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { UsersModule } from '../models/users/users.module';
import { ConfigService } from '../helpers/config.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient,private config: ConfigService) { }

  //ActualizarTokenUser
  updtaUser(params: any){
  
    let dir = 'user/Editar';
    return this.http.post(this.config.url+dir, params);
  }

  //ActualizarTokenPass
  udptaPass(params: any){
    let dir = 'user/EditarPass';
    return this.http.post(this.config.url+dir, params);

  }

  getUsuariosData(){
    let dir = 'user/listUserData';
    return this.http.get(this.config.url+dir);
  }

 

}
