import { Component, OnInit, Inject, LOCALE_ID, AfterViewInit } from '@angular/core';

import {
  User,
  Event,
} from '../../models';
import {
  SessionService,
  UsersService,
  NotificationService,
  LangService,
  WindowRefService,
} from '../../shared/services';

@Component({
  selector: 'nb-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  window: Window;

  calendarOptions: FC.Options;

  events: Event[];

  user: User;

  isBusy = false;

  calendar: any;

  constructor(
    private sessionService: SessionService,
    private notificationService: NotificationService,
    private usersService: UsersService,
    private lang: LangService,
    private windowRef: WindowRefService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.window = windowRef.nativeWindow;

    this.calendarOptions = {
      editable: false,
      eventLimit: true,
      header: {
        left: 'title',
        center: 'month,agendaWeek,agendaDay',
        right: 'prev,next,today'
      },
      defaultDate: new Date(),
      selectable: false,
      selectHelper: false,
      views: {
        month: {
          titleFormat: 'MMMM YYYY'
        },
        week: {
          titleFormat: ' MMMM D YYYY'
        },
        day: {
          titleFormat: 'D MMM, YYYY'
        }
      },
      weekNumberCalculation: 'ISO',
      viewRender: (view, element) => {
        // activate the perfect scrollbar when the view isn't on Month
        if (view.name !== 'month') {
            (<any>$(element).find('.fc-scroller')).perfectScrollbar();
        }
      },
      events: [],
    };
    this.calendarOptions['locale'] = this.locale ? this.resolveLocale(this.locale) : 'en';
  }

  ngOnInit() {
    this.user = this.sessionService.getUser();
    this.getEvents();
  }

  ngAfterViewInit() {
    this.buildCalendar();
  }

  getEvents() {
    this.events = this.usersService.events;
    if (!this.events || this.events.length === 0) {
      this.isBusy = true;
      this.usersService.listEvents(this.user).subscribe(
        events => {
          this.isBusy = false;
          this.events = events;
          this.renderEvents();
        },
        err => {
          this.isBusy = false;
          const error = this.lang.get('err_fetch_events_failed');
          this.notificationService.notifyError(error);
        }
      );
    } else if (this.events.length > 0) {
      this.calendarOptions.events = this.events;
    }
  }

  private renderEvents() {
    setTimeout(() => {
      if (!this.calendar) {
        return;
      }

      this.calendarOptions.events = this.events;
      this.calendar.fullCalendar('renderEvents', this.events, true);
    });
  }

  private buildCalendar() {
    setTimeout(() => {
      if (this.calendar) {
        return;
      }

      const $ = this.window['$'];
      if ($) {
        this.calendarOptions['buttonText'] = {
          today: this.lang.get('fc_today'),
          month: this.lang.get('fc_month'),
          week: this.lang.get('fc_week'),
          day: this.lang.get('fc_day'),
        };
        this.calendar = $('#calendar');
        this.calendar.fullCalendar(this.calendarOptions);
      }
    });
  }

  private resolveLocale(locale: string): string {
    if (locale.length === 2) {
      return locale;
    }

    return locale.substring(0, 2).toLowerCase();
  }

}
