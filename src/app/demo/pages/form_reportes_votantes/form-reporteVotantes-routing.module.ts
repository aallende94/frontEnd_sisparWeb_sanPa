import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'emitidas',
        loadChildren: () => import('./reporte-emitidas/reporte-emitidas.module').then(module => module.ReporteEmitidasModule)
      },
      {
        path: 'pendientes',
        loadChildren: () => import('./reporte-pendientes/reporte-pendientes.module').then(module => module.ReportePendientesModule)
      },
      // {
      //   path: 'neutrales',
      //   loadChildren: () => import('./reporte-neutrales/reporte-neutrales.module').then(module => module.ReporteNeutralesModule)
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormReporteVotantesRoutingModule { }
