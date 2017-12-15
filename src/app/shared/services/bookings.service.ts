import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import ModelToJsonTransformers from '../../utils/model.to.json';
import JsonToModelTransformers from '../../utils/json.to.model';
import { Booking, BookingState, TimeFrame } from './../../models';

import { BackendService } from './backend.service';
import { SessionService } from './session.service';
import Utils from './../../utils/utils';

@Injectable()
export class BookingsService extends BackendService {

  static endpointName = '/organisations';

  bookings: Booking[];

  collection: ReplaySubject<Booking[]>;

  private cursor: string;

  private more: boolean;

  private fetching: boolean;

  constructor(
    http: Http,
    private sessionService: SessionService
  ) {
    super(http, BookingsService.endpointName);

    this.reset();

    this.sessionService.onReset.subscribe(() => this.reset());
  }

  reset() {
    this.bookings = [];

    this.collection = new ReplaySubject<Booking[]>(1);

    this.cursor = null;

    this.more = true;

    this.fetching = false;
  }

  list(): Observable<Booking[]> {
    this.fetch();

    return this.collection.asObservable();
  }

  fetch() {
    if (this.fetching) {
      return;
    }

    if (!this.more) {
      return;
    }

    const body: any = {
      'admin_key': this.sessionService.getUser().userKey,
      'cursor': this.cursor,
      'size': 20
    };

    this.fetching = true;
    this.post('/bookings/list', body)
      .map(response => {
        const jsonString = response.json();
        const bookings = jsonString.bookings ? jsonString.bookings : [];
        const transformedBookings = JsonToModelTransformers.jsonToBookings(bookings);
        this.bookings = this.bookings.concat(transformedBookings);

        this.cursor = jsonString.cursor;
        this.more = jsonString.more;

        return  this.bookings;
      })
      .subscribe(
        data => {
          this.collection.next(data);
          this.fetching = false;

          if (!this.more) {
            this.collection.complete();
          }
        },
        error => {
          console.log(error);
          this.fetching = false;
        }
      )
    ;
  }

  hasMore(): boolean {
    return this.more;
  }

  fetchActive(): Observable<Booking[]> {
    const body: any = {
      'admin_key': this.sessionService.getUser().userKey
    };

    return this.post('/active/bookings/list', body)
      .map(response => {
        const result: any = response.json();
        this.bookings = result.bookings ? JsonToModelTransformers.jsonToBookings(result.bookings) : [] ;
        return this.bookings;
      })
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

  draft(booking: Booking): Observable<any> {
    const body: any = ModelToJsonTransformers.draftBookingToJson(booking);

    return this.post('/bookings/draft', body)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

  confirm(booking: Booking): Observable<any> {
    const body: any = {
      'booking_key': booking.key
    };

    return this.post('/bookings/confirm', body)
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

  cancel(booking: Booking) {
    const body: any = {
      'booking_key': booking.key
    };
    return this.post('/bookings/cancel', body);
  }

  fetchByTimeFrame(timeFrame: TimeFrame): Observable<Booking[]> {
    const body: any = {
      admin_key: this.sessionService.getUser().userKey,
      time_frame: {
        start: Utils.formatDateUsingUTC(timeFrame.start),
        end: Utils.formatDateUsingUTC(timeFrame.end)
      }
    };

    return this.post('/bookings/list', body)
      .map(response => {
        const result = response.json();

        return result.bookings ? JsonToModelTransformers.jsonToBookings(result.bookings) : [];
      })
    ;
  }

}
