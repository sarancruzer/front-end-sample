import { Injectable } from '@angular/core';

@Injectable()
export class ChartistService {

  constructor() { }

  createLineChart(id: string, data: any, options: any): any {
    return new Chartist.Line(id, data, options);
  }

  animateChart(chart: any) {
    const delays = 80;
    const durations = 500;
    let seq = 0;

    chart.on('draw', (data) => {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });
  }

  createPieChart(id: string, data: any, options: any): any {
    return new Chartist.Pie(id, data, options);
  }

}
