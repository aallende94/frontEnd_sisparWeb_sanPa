import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { FormReporteVotantesRoutingModule } from './form-reporteVotantes-routing.module';
import {SharedModule} from '../../../theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormReporteVotantesRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: []
})

export class FormReporteVotantesModule { }
