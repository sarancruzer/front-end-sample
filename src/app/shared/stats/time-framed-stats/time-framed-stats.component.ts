import { Subject, Subscription } from 'rxjs/Rx';

import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';

import { TimeFrame } from './../../../models';
import {
  NotificationService,
  LangService,
  StatisticsService,
} from './../../services';

@Component({
  selector: 'nb-time-framed-stats',
  templateUrl: './time-framed-stats.component.html',
  styleUrls: ['./time-framed-stats.component.css']
})
export class TimeFramedStatsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() timeFrame: TimeFrame;

  isBusy: boolean;

  protected subscription: Subscription;

  private timeFrameChange: Subject<TimeFrame>;

  constructor(
    protected lang: LangService,
    protected notificationService: NotificationService,
    protected statsService: StatisticsService
  ) {
    this.isBusy = false;
    this.timeFrameChange = new Subject<TimeFrame>();

    this.observeTimeFrame();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.timeFrame) {
      this.timeFrameChange.next(<TimeFrame>changes.timeFrame);
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected fetchData() {}

  protected onTimeFrameChange() {
    this.fetchData();
  }

  private observeTimeFrame() {
    this.timeFrameChange
      .asObservable()
      .distinctUntilChanged()
      .subscribe((timeFrame: TimeFrame) => {
        this.fetchData();
      })
    ;
  }
}
