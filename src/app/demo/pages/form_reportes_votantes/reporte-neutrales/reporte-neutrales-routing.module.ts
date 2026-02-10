import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReporteNeutralesComponent} from './reporte-neutrales.component';
//import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  {
    path: '',
    component: ReporteNeutralesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteNeutralesRoutingModule { }
