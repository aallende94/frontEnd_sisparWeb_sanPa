import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/signin',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminComponent,
    children: [

      {
        path: 'dashboard',
        loadChildren: () => import('./demo/pages/form_dash/form-dash.module').then(module => module.FormDashModule)
       },
      {
        path: 'participantes',
        loadChildren: () => import('./demo/pages/form_participantes/form-participantes.module').then(module => module.FormParticipantesModule)
       },
       {
        path: 'control',
        loadChildren: () => import('./demo/pages/form_control/form-control.module').then(module => module.FormControlModule)
       },
       {
        path: 'visitas',
        loadChildren: () => import('./demo/pages/form-visitas/form-visitas.module').then(module => module.FormVisitasModule)
      },
      {
        path: 'reportesVotantes',
        loadChildren: () => import('./demo/pages/form_reportes_votantes/form-reporteVotantes.module').then(module => module.FormReporteVotantesModule)
      },
      {
        path: 'reportesVisitas',
        loadChildren: () => import('./demo/pages/form_reportes_visitas/form-reporteVisitas.module').then(module => module.FormReporteVisitasModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      }
    ]
  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
