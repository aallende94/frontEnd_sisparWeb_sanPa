import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrarParticipantesComponent} from './registrar-participantes.component';
//import { HttpClientModule } from "@angular/common/http";


const routes: Routes = [
  {
    path: '',
    component: RegistrarParticipantesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarParticipantesRoutingModule { }
