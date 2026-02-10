import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrarVisitasComponent} from './registrar-visitas.component';
//import { HttpClientModule } from "@angular/common/http";


const routes: Routes = [
  {
    path: '',
    component: RegistrarVisitasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarVisitasRoutingModule { }
