import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { FormVisitasRoutingModule } from './form-visitas-routing.module';
import {SharedModule} from '../../../theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormVisitasRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: []
})
export class FormVisitasModule { }
