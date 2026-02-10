import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  url = 'http://localhost:8000/api/';

constructor(private router: Router) { }

getApiPhat(): string{
  return  this.url;
}

redirectLogin(){
  this.router.navigate(['']);
}
}
