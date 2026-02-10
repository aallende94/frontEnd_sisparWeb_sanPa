import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { ReporteEmitidasRoutingModule } from './reporte-emitidas-routing.module';
import { ReporteEmitidasComponent } from './reporte-emitidas.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule, NgbAccordionModule ,NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReporteEmitidasRoutingModule,
    SharedModule,
    NgbDropdownModule,
    HttpClientModule,
    NgbAccordionModule,
    NgbPopoverModule 
  ],
  declarations: [ReporteEmitidasComponent]
})
export class ReporteEmitidasModule { }
