import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    HttpClientModule
  ],
  declarations: []
})
export class AuthenticationModule { }
