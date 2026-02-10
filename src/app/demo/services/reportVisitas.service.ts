import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { UsersModule } from '../models/users/users.module';
import { ConfigService } from '../helpers/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportVisitas {


  constructor(private http: HttpClient,private config: ConfigService) { }

  getReportVisitasConfirm(){
    
    let path = 'report_visitas/reporteVisitasConfirm';
    return this.http.get(this.config.url+path);
  }
  
  getReportVolverVisitar(){
    
    let path = 'report_visitas/reporteVolverVisitar';
    return this.http.get(this.config.url+path);
  }
  
  getReportPartEmitidas(){
    
    let path = 'report_participacion/reportePartEmitidas';
    return this.http.get(this.config.url+path);
  }
 
  getReportPartPendientes(){
    
    let path = 'report_participacion/reportePartPendientes';
    return this.http.get(this.config.url+path);
  }
}
