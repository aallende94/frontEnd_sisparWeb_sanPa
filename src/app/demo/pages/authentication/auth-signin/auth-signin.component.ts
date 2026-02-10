import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.css']
})

export class AuthSigninComponent implements OnInit {

  usuario: any = {
    user_web: null,
    password: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  avisoMessage = '';
  atencionMessage = '';
  
  //usuario: UsersModule = new UsersModule()
  constructor (private authService: AuthService, 
                private router: Router, 
                private tokenStorage : TokenService){}

                
  ngOnInit() {
  }

  login(f: NgForm): void {

    const { email, password } = this.usuario;

   //console.log(this.usuario);
   if (f.invalid) {
    this.errorMessage = 'Los Campos son Obligatorios.';
    return;
  }
  
   
   this.authService.login2(email, password).subscribe(
     data => {
       console.log(data);

       if(data.access_token){

         this.isSuccessful = true;
         this.isSignUpFailed = false;

         // aqui guardamos los datos el usuario y el  token
          this.tokenStorage.saveToken(data.access_token);
         this.tokenStorage.saveUser(data.user);

         this.router.navigate(['/dashboard/dash']);

       }else{
         this.errorMessage = 'Error de Autenticacion';
       }
     },
     err => {
       this.errorMessage = err.error.message;
       this.isSignUpFailed = true;
     }
   ); 
    
  }
}

