import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../helpers/config.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private config: ConfigService, private http:  HttpClient) { }

  getmenu(): Observable<any>{
    console.log("se menu aallende");
   
     // aqui preparamos poara la cabecer
   return this.http.get(this.config.url+'getMenu');
   }
}
