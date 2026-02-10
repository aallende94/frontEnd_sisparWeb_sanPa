import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { FormDashRoutingModule } from './form-dash-routing.module';
import {SharedModule} from '../../../theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormDashRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: []
})
export class FormDashModule { }
