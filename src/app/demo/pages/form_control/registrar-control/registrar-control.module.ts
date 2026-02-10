import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { RegistrarControlRoutingModule } from './registrar-control-routing.module';
import { RegistrarControlComponent } from './registrar-control.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RegistrarControlRoutingModule,
    SharedModule,
    NgbDropdownModule,
    HttpClientModule
  ],
  declarations: [RegistrarControlComponent]
})
export class RegistrarControlModule { }
