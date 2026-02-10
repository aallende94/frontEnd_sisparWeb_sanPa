import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { RegistrarParticipantesRoutingModule } from './registrar-participantes-routing.module';
import { RegistrarParticipantesComponent } from './registrar-participantes.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RegistrarParticipantesRoutingModule,
    SharedModule,
    NgbDropdownModule,
    HttpClientModule
  ],
  declarations: [RegistrarParticipantesComponent]
})
export class RegistrarParticipantesModule { }
