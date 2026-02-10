import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { ReportePendientesRoutingModule } from './reporte-pendientes-routing.module';
import { ReportePendientesComponent } from './reporte-pendientes.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule, NgbAccordionModule ,NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReportePendientesRoutingModule,
    SharedModule,
    NgbDropdownModule,
    HttpClientModule,
    NgbAccordionModule,
    NgbPopoverModule 
  ],
  declarations: [ReportePendientesComponent]
})
export class ReportePendientesModule { }
