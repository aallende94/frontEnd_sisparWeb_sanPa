import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReporteEmitidasComponent} from './reporte-emitidas.component';
//import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  {
    path: '',
    component: ReporteEmitidasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteEmitidasRoutingModule { }
