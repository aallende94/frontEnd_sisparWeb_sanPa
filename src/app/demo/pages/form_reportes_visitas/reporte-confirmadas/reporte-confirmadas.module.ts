import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { ReporteConfirmadasRoutingModule } from './reporte-confirmadas-routing.module';
import { ReporteConfirmadasComponent } from './reporte-confirmadas.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule, NgbAccordionModule ,NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReporteConfirmadasRoutingModule,
    SharedModule,
    NgbDropdownModule,
    HttpClientModule,
    NgbAccordionModule,
    NgbPopoverModule 
  ],
  declarations: [ReporteConfirmadasComponent]
})
export class ReporteConfirmadasModule { }
