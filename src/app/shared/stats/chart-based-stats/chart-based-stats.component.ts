import { Component } from '@angular/core';

import {
  NotificationService,
  LangService,
  StatisticsService,
  ChartistService,
} from './../../services';
import { TimeFramedStatsComponent } from './../time-framed-stats/time-framed-stats.component';

@Component({
  selector: 'nb-chart-based-stats',
  templateUrl: './chart-based-stats.component.html',
  styleUrls: ['./chart-based-stats.component.css']
})
export class ChartBasedStatsComponent extends TimeFramedStatsComponent {

  protected data: any;

  protected options: any;

  protected chart: any;

  constructor(
    protected lang: LangService,
    protected notificationService: NotificationService,
    protected statsService: StatisticsService,
    protected chartistService: ChartistService
  ) {
    super(lang, notificationService, statsService);
  }
}
