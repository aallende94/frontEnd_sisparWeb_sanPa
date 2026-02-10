import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReporteConfirmadasComponent} from './reporte-confirmadas.component';
//import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  {
    path: '',
    component: ReporteConfirmadasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteConfirmadasRoutingModule { }
