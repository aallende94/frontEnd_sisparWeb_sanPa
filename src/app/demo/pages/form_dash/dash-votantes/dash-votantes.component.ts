// import { Component, OnInit } from '@angular/core';

import { Component, AfterViewInit } from '@angular/core'; 
declare var $: any;
import * as echarts from 'echarts';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardService } from 'src/app/demo/services/dash.service';

@Component({
  selector: 'app-basic-elements',
  templateUrl: './dash-votantes.component.html',
  styleUrls: ['./dash-votantes.component.scss']
})
export class DashVotantesComponent implements AfterViewInit {


  constructor( private serviDash : DashboardService) { }

  countPadron: number = 0;
  countEmit: number = 0;
  countPend: number = 0;
  porcPadr: number = 0;
  porcEmit: number = 0;
  porcPend: number = 0;

  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
     (document.querySelector("#overlay") as HTMLElement).hidden = false;

     //this.getDashView();

    setTimeout(() => {
        (document.querySelector("#overlay") as HTMLElement).hidden = true;
      }, 1500);
   }


  ngAfterViewInit(): void {

     (document.querySelector("#overlay") as HTMLElement).hidden = false;

       this.serviDash.getDashView().subscribe(
        data => {
  
          let result : any = data;
          console.log(result);
      
           this.countPadron = result.dataDashViewPadron[0].cantPadron;
           this.countEmit = result.dataDashViewEmit[0].cantEmit;
           this.countPend = result.dataDashViewPend[0].pendientes;
           this.porcPadr = result.dataDashViewPorcen[0].porcentajePadron;
           this.porcEmit = result.dataDashViewPorcen[0].porcentajeEmitidos;
           this.porcPend = result.dataDashViewPorcen[0].porcentajePendientes;

           let chartDom = document.getElementById('m-piechart') as HTMLElement; 
          let doughnutChart = echarts.init(chartDom); 
          let option = { tooltip: { trigger: 'item', 
            formatter: "{a} <br/>{b} : {c} ({d}%)" }, 
            legend: { orient: 'horizontal', 
              x: 'center', 
              show: false, 
              y: 'bottom', 
              data: ['100', '60', '20', '140'] 
            }, 
            toolbox: { show: false, 
              feature: { dataView: { show: true, 
              readOnly: false }, 
              magicType: { show: false, 
              type: ['pie', 'funnel'], 
              option: { funnel: { x: '25%', 
                width: '50%', 
                funnelAlign: 'center', 
                max: 1548 } } }, 
              restore: { show: true }, 
              saveAsImage: { show: true } } 
            }, 
              color: ["#092bc7", "#1f9ed8"], 
              calculable: true, 
              series: [ 
                { name: 'Votos', 
                  type: 'pie', 
                  radius: ['80%', '90%'], 
                  itemStyle: { 
                    normal: { 
                      label: { 
                      show: false 
                    }, 
                     labelLine: { 
                      show: false 
                    } 
                  }, 
                    emphasis: { 
                      label: { 
                        show: true, 
                        position: 'center', 
                        textStyle: { 
                          fontSize: '30', 
                          fontWeight: 'bold' 
                         } 
                        } 
                      } 
                    }, 
                  data: [ 
                    { value: this.countEmit, name: `${this.porcEmit}%`}, 
                    { value: this.countPend, name: `${this.porcPend}%` }
                    ] 
                 
                } 
              ] 
            }; 
    
              console.log(option.series);
              doughnutChart.setOption(option);
    
              setTimeout(() => {
                (document.querySelector("#overlay") as HTMLElement).hidden = true;
              }, 1500);
    
      });
       
  }

}
