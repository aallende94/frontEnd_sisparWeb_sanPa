import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReporteVolverVisitarComponent} from './reporte-volver_visitar.component';
//import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  {
    path: '',
    component: ReporteVolverVisitarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteVolverVisitarRoutingModule { }
