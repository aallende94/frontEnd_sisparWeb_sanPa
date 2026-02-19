import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

//import { ConfigService } from '../helpers/config.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, 
            //  private config: ConfigService
            ) { }

            
        login(email: string, password: string): Observable<any> {
          return this.http.post(`${this.apiUrl}/signin`, { email, password });
        }
        
        login2(email: string, password: string): Observable<any> {
          return this.http.post(`${this.apiUrl}/login2`, { email, password });
        }
        
        // login(email: string, password: string): Observable<any> {
        //   return this.http.post( this.config.url+"login", { email, password });
        // }
      
        // login2(email: string, password: string): Observable<any> {
        //   return this.http.post( this.config.url+"login2", { email, password });
        // }

}



