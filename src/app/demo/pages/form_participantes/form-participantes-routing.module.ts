import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'registrar',
        loadChildren: () => import('./registrar-participantes/registrar-participantes.module').then(module => module.RegistrarParticipantesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormParticipantesRoutingModule { }
