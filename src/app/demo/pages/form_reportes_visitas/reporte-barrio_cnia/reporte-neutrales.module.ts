import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { ReporteNeutralesRoutingModule } from './reporte-neutrales-routing.module';
import { ReporteNeutralesComponent } from './reporte-neutrales.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule, NgbAccordionModule ,NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReporteNeutralesRoutingModule,
    SharedModule,
    NgbDropdownModule,
    HttpClientModule,
    NgbAccordionModule,
    NgbPopoverModule 
  ],
  declarations: [ReporteNeutralesComponent]
})
export class ReporteNeutralesModule { }
