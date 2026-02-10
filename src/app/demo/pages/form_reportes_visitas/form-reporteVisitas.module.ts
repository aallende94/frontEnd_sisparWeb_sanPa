import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { FormReporteVisitasRoutingModule } from './form-reporteVisitas-routing.module';
import {SharedModule} from '../../../theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormReporteVisitasRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: []
})

export class FormReporteVisitasModule { }
