import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { RegistrarVisitasRoutingModule } from './registrar-visitas-routing.module';
import { RegistrarVisitasComponent } from './registrar-visitas.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RegistrarVisitasRoutingModule,
    SharedModule,
    NgbDropdownModule,
    HttpClientModule
  ],
  declarations: [RegistrarVisitasComponent]
})
export class RegistrarVisitasModule { }
