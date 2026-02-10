import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'confirmadas',
        loadChildren: () => import('./reporte-confirmadas/reporte-confirmadas.module').then(module => module.ReporteConfirmadasModule)
      },
      {
        path: 'volver_visitar',
        loadChildren: () => import('./reporte-volver_visitar/reporte-volver_visitar.module').then(module => module.ReporteVolverVisitarModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormReporteVisitasRoutingModule { }
