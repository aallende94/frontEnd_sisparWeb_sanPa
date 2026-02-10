import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportePendientesComponent} from './reporte-pendientes.component';
//import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  {
    path: '',
    component: ReportePendientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportePendientesRoutingModule { }
