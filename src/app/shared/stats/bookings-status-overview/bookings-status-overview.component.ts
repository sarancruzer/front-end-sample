import { Component } from '@angular/core';

import { ChartPoint } from './../../../models';
import { ChartBasedStatsComponent } from './../chart-based-stats/chart-based-stats.component';

@Component({
  selector: 'nb-bookings-status-overview',
  templateUrl: './bookings-status-overview.component.html',
  styleUrls: ['./bookings-status-overview.component.css']
})
export class BookingsStatusOverviewComponent extends ChartBasedStatsComponent {

  fetchData() {
    this.isBusy = true;
    this.subscription = this.statsService.getBookingsByStates(this.timeFrame)
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
      series: []
    };

    let total = 0;
    dataPoints.forEach(point => { total += <number>point.y; });

    dataPoints.forEach(point => {
      const n = <number>point.y;
      if (n === 0) {
        return;
      }

      const label = `${point.x} ${Math.round(n / total * 100)}%`;
      this.data.labels.push(label);
      this.data.series.push(n);
    });
  }

  private drawChart() {
    this.options = {
      height: '230px'
    };

    this.chart = this.chartistService.createPieChart(
      '#bookingsStatusOverviewChart',
      this.data,
      this.options
    );
  }

}
