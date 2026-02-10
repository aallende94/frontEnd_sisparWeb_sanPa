import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { ReporteVolverVisitarRoutingModule } from './reporte-volver_visitar-routing.module';
import { ReporteVolverVisitarComponent } from './reporte-volver_visitar.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule, NgbAccordionModule ,NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReporteVolverVisitarRoutingModule,
    SharedModule,
    NgbDropdownModule,
    HttpClientModule,
    NgbAccordionModule,
    NgbPopoverModule 
  ],
  declarations: [ReporteVolverVisitarComponent]
})
export class ReporteVolverVisitarModule { }
