import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrarControlComponent} from './registrar-control.component';
//import { HttpClientModule } from "@angular/common/http";


const routes: Routes = [
  {
    path: '',
    component: RegistrarControlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarControlRoutingModule { }
