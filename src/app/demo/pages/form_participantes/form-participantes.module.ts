import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { FormParticipantesRoutingModule } from './form-participantes-routing.module';
import {SharedModule} from '../../../theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormParticipantesRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: []
})
export class FormParticipantesModule { }
