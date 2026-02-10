import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { UsersModule } from '../models/users/users.module';
import { ConfigService } from '../helpers/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: HttpClient,private config: ConfigService) { }

  getDashView(){
    
    let path = 'dashboard/getDahsView';
    return this.http.get(this.config.url+path);
  }
  
  
}
