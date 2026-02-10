import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { FormControlRoutingModule } from './form-control-routing.module';
import {SharedModule} from '../../../theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormControlRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: []
})
export class FormControlModule { }
