import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string | any;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {

    children: [

      {
        id: 'page-layouts',
        title: 'Page Layouts',
        type: 'collapse',
        icon: 'feather icon-layout',
        children: [
          {
            id: 'vertical',
            title: 'Vertical',
            type: 'item',
            url: '/layout/static',
            target: true
          },
          {
            id: 'horizontal',
            title: 'Horizontal',
            type: 'item',
            url: '/layout/horizontal',
            target: true
          }
        ]
      }
    ]
  },
  { 
    id: 'form_dash',
    title: 'DASHBOARD',
    type: 'item',
    class: 'nav-item',
    icon: 'feather icon-bar-chart-2',
    url: '/dashboard/dash',
  },
   { 
    id: 'form_participantes',
    title: 'PARTICIPACIÓN',
    type: 'item',
    class: 'nav-item',
    icon: 'feather icon-airplay',
    url: '/participantes/registrar',
  },
   { 
    id: 'form_control',
    title: 'CONTROL ADMIN',
    type: 'item',
    class: 'nav-item',
    icon: 'feather icon-shield',
    url: '/control/registrar',

  },
   { 
    id: 'form_visitas',
    title: 'OPERADORES',
    type: 'item',
    class: 'nav-item',
    icon: 'feather icon-home',
    url: '/visitas/registrar',
  },
  { 
    id: 'form_reportes_votantes',
    title: 'INFORMES',
    type: 'collapse',
    icon: 'feather icon-list',
    children: [
       {
        id: 'sub-menu-reportes_clientes',
        title: 'Participantes',
        type: 'collapse',
        icon: 'feather icon-users',
         children: [
               { 
                id: 'form_reportes_votantes',
                title: 'Emitidos',
                type: 'item',
                url: '/reportesVotantes/emitidas',
                class: 'nav-item',
                icon: 'feather icon-list'
              },
              { 
                id: 'form_reportes_votantes',
                title: 'Pendientes',
                type: 'item',
                url: '/reportesVotantes/pendientes',
                class: 'nav-item',
                icon: 'feather icon-list'
              },
              // { 
              //   id: 'form_reportes_votantes',
              //   title: 'Neutral',
              //   type: 'item',
              //   url: '/reportesVotantes/neutrales',
              //   class: 'nav-item',
              //   icon: 'feather icon-list'
              // }
           ]
      },
      {
        id: 'sub-menu-reportes_clientes',
        title: 'Visitas',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
               { 
                id: 'form_reportes_visitas',
                title: 'Confirmadas',
                type: 'item',
                url: '/reportesVisitas/confirmadas',
                class: 'nav-item',
                icon: 'feather icon-list'
              },
              { 
                id: 'form_reportes_visitas',
                title: 'Volver a Visitar',
                type: 'item',
                url: '/reportesVisitas/volver_visitar',
                class: 'nav-item',
                icon: 'feather icon-list'
              }
           ]
      }
      
     
    ]
  }

];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
