import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { DashVotantesRoutingModule } from './dash-votantes-routing.module';
import { DashVotantesComponent } from './dash-votantes.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    DashVotantesRoutingModule,
    SharedModule,
    NgbDropdownModule,
    HttpClientModule
  ],
  declarations: [DashVotantesComponent]
})
export class DashVotantesModule { }
