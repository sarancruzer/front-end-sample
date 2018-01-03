import { Component } from '@angular/core';

import { ChartPoint } from './../../../models';
import { ChartBasedStatsComponent } from './../chart-based-stats/chart-based-stats.component';

@Component({
  selector: 'nb-bookings-per-day',
  templateUrl: './bookings-per-day.component.html',
  styleUrls: ['./bookings-per-day.component.css']
})
export class BookingsPerDayComponent extends ChartBasedStatsComponent {

  fetchData() {
    this.isBusy = true;
    this.subscription = this.statsService.getBookingsPerDay(this.timeFrame)
      .subscribe(
        data => {
          this.isBusy = false;
          if (data.length === 0) {
            return;
          }

          setTimeout(() => {
            this.buildData(data);
            this.drawChart();
          });
        },
        err => {
          this.isBusy = false;
          this.notificationService.notifyError(this.lang.get('err_failed_fetching_bookings'));
        }
      )
    ;
  }

  private buildData(dataPoints: ChartPoint[]) {
    this.data = {
      labels: [],
      series: [
        []
      ]
    };
    const maxLength = 6;

    if (dataPoints.length <= maxLength) {
      dataPoints.forEach(point => {
        this.data.labels.push(this.buildLabelFromDate(<Date>point.x));
        this.data.series[0].push(point.y);
      });

      return;
    }

    const mergeSize = Math.floor(dataPoints.length / maxLength);
    for (let i = 0; i < (maxLength * mergeSize); i += mergeSize) {
      let y = 0;
      for (let j = 0; j < mergeSize; j++) {
        y += <number>dataPoints[i + j].y;
      }
      const start = dataPoints[i];
      const end = dataPoints[i + mergeSize - 1];
      const label = this.buildLabelFromDate(<Date>start.x) + ' - ' + this.buildLabelFromDate(<Date>end.x);

      this.data.labels.push(label);
      this.data.series[0].push(y);
    }
  }

  private buildLabelFromDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}`;
  }

  private drawChart() {
    this.options = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: this.getMaxY(),
      chartPadding: { top: 0, right: 8, bottom: 0, left: 0},
      classNames: {
        point: 'ct-point ct-white',
        line: 'ct-line ct-white'
      },
      axisX: {
        labelOffset: { x: -32, y: 8 }
      },
      height: '262px'
    };

    this.chart = this.chartistService.createLineChart('#bookingsPerDayChart', this.data, this.options);
    this.chartistService.animateChart(this.chart);
  }

  private getMaxY(): number {
    let max = 0;
    this.data.series[0].forEach(y => { max = y > max ? y : max; });

    return Math.round(max * 1.25);
  }
}
