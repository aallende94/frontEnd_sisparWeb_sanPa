import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashVotantesComponent} from './dash-votantes.component';
//import { HttpClientModule } from "@angular/common/http";


const routes: Routes = [
  {
    path: '',
    component: DashVotantesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashVotantesRoutingModule { }
