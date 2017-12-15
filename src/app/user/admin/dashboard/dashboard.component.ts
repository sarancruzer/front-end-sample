import { Component, OnInit, AfterViewChecked } from '@angular/core';

import { TimeFrame } from './../../../models';
import {
  LangService,
  StatisticsService,
  NotificationService,
} from './../../../shared/services';

@Component({
  selector: 'nb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewChecked {

  static PREDEFINED_TIME_FRAMES = [
    'LAST_30_DAYS',
    'LAST_7_DAYS',
    'LAST_3_MONTHS'
  ];

  timeFrame: TimeFrame;

  predefinedTimeFrame: string;

  /* Single Value Statistics */
  mostPopularBookingTimeCat: string;
  mostPopularBookingTime: string;
  mostPopularBookingTimeText: string;
  loadingMostPopularBookingTime: boolean;

  avgBookingDurationCat: string;
  avgBookingDuration: string;
  avgBookingDurationText: string;
  loadingAvgBookingDuration: boolean;
  avgBookingDurationTmpl: string;

  unusedVehiclesCountCat: string;
  unusedVehiclesCount: string;
  unusedVehiclesCountText: string;
  loadingUnusedVehiclesCount: boolean;
  /* END Single Value Statistics */

  constructor(
    private lang: LangService,
    private notificationService: NotificationService,
    private statsService: StatisticsService
  ) {
    this.timeFrame = {
      start: this.moveTimeBackByDays(new Date()),
      end: new Date()
    };
    this.predefinedTimeFrame = DashboardComponent.PREDEFINED_TIME_FRAMES[0];
    this.loadingMostPopularBookingTime = false;
    this.loadingAvgBookingDuration = false;
    this.loadingUnusedVehiclesCount = false;
    this.avgBookingDurationTmpl = '{__hours__}h {__minutes__}min';
  }

  ngOnInit() {
    this.mostPopularBookingTime = '??:??';
    this.avgBookingDuration = '?h ?min';
    this.unusedVehiclesCount = '0';
    this.updateStats();
  }

  ngAfterViewChecked() {
    this.mostPopularBookingTimeCat = this.lang.get('cat_most_popular_booking_time');
    this.mostPopularBookingTimeText = this.lang.get('msg_most_popular_booking_time_txt');
    this.avgBookingDurationCat = this.lang.get('cat_avg_booking_duration');
    this.avgBookingDurationText = this.lang.get('msg_avg_booking_duration_txt');
    this.unusedVehiclesCountCat = this.lang.get('cat_unused_vehicles_count');
    this.unusedVehiclesCountText = this.lang.get('msg_unused_vehicles_count_txt');
    this.avgBookingDurationTmpl = this.lang.get('avg_booking_duration_tmpl');
  }

  onStartTimeChange(time: Date) {
     this.timeFrame = {
      start: new Date(time),
      end: new Date(this.timeFrame.end)
    };
    this.updateStats();
  }

  onEndTimeChange(time: Date) {
    this.timeFrame = {
      start: new Date(this.timeFrame.start),
      end: new Date(time)
    };
    this.updateStats();
  }

  changeTimeFrame() {
    const now = new Date();
    switch (this.predefinedTimeFrame) {
      case 'LAST_30_DAYS':
        this.timeFrame = {
          start: this.moveTimeBackByDays(now),
          end: now
        };
        break;

      case 'LAST_7_DAYS':
        setTimeout(() => {
          this.timeFrame = {
            start: this.moveTimeBackByDays(now, 7),
            end: now
          };
        });
        break;

      case 'LAST_3_MONTHS':
        this.timeFrame = {
          start: this.moveTimeBackByDays(now, 30 * 3),
          end: now
        };
        break;

      default:
        // ignore
        break;
    }
  }

  private moveTimeBackByDays(time: Date, days: number = 30): Date {
    const newTime = new Date(time);

    return new Date(newTime.setDate(newTime.getDate() - days));
  }

  private updateStats() {
    this.loadingMostPopularBookingTime = true;
    this.loadingAvgBookingDuration = true;
    this.loadingUnusedVehiclesCount = true;

    const mpbtSubscription = this.statsService
      .getMostPopularBookingTime(this.timeFrame)
      .subscribe(
        data => {
          this.loadingMostPopularBookingTime = false;
          this.mostPopularBookingTime = `${data.getHours()}:${data.getMinutes()}`;

          if (mpbtSubscription) {
            mpbtSubscription.unsubscribe();
          }
        },
        err => {
          this.loadingMostPopularBookingTime = false;
          const msg = this.lang.get('err_most_popular_bookings_time');
          this.notificationService.notifyError(msg);

          if (mpbtSubscription) {
            mpbtSubscription.unsubscribe();
          }
        }
      )
    ;

    const abdSubscription = this.statsService
      .getAvgBookingDuration(this.timeFrame)
      .subscribe(
        data => {
          const hours = '' + Math.floor(data.valueOf() / 60);
          const minutes = '' + (data.valueOf() % 60);
          const value = this.avgBookingDurationTmpl
            .replace('{__hours__}', hours)
            .replace('{__minutes__}', minutes)
          ;
          this.avgBookingDuration = value;
          this.loadingAvgBookingDuration = false;

          if (abdSubscription) {
            abdSubscription.unsubscribe();
          }
        },
        err => {
          this.loadingAvgBookingDuration = false;
          const msg = this.lang.get('err_avg_booking_duration');
          this.notificationService.notifyError(msg);

          if (abdSubscription) {
            abdSubscription.unsubscribe();
          }
        }
      )
    ;

    const uvcSubscription = this.statsService
      .getUnusedVehiclesCount(this.timeFrame)
      .subscribe(
        data => {
          this.unusedVehiclesCount = '' + data.valueOf();
          this.loadingUnusedVehiclesCount = false;

          if (uvcSubscription) {
            uvcSubscription.unsubscribe();
          }
        },
        err => {
          this.loadingUnusedVehiclesCount = false;
          const msg = this.lang.get('err_unused_vehicles_count');
          this.notificationService.notifyError(msg);

          if (uvcSubscription) {
            uvcSubscription.unsubscribe();
          }
        }
      )
    ;
  }
}
