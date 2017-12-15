import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { BackendService } from './backend.service';
import { SessionService } from './session.service';
import { User, Booking, BookingState, Event } from '../../models';
import JsonToModelTransformers from '../../utils/json.to.model';
import ModelToJsonTransformers from '../../utils/model.to.json';

@Injectable()
export class UsersService extends BackendService {

  static endpointName = '/organisations/users';

  collection: ReplaySubject<User[]>;

  users: User[];

  bookings: any;

  events: Event[];

  private cursor: string;

  private more: boolean;

  private fetching: boolean;

  constructor(
    http: Http,
    private sessionService: SessionService
  ) {
    super(http, UsersService.endpointName);

    this.reset();

    this.sessionService.onReset.subscribe(item => this.reset());
  }

  reset() {
    this.users = [];

    this.collection = new ReplaySubject<User[]>(1);

    this.cursor = null;

    this.more = true;

    this.fetching = false;

    this.bookings = {
      scheduled: [],
      history: []
    };

    this.events = [];
  }

  update(user: User) {
    const body: any = ModelToJsonTransformers.userToJson(user);

    return this.post('/profile/update', body)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

  updateUser(user: User): Observable<any> {
    const body: any =  ModelToJsonTransformers.userToJson(user);
    body.admin_key = this.sessionService.getUser().userKey;

    return this.post('/update', body)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

  delete(user: User): Observable<any> {
    const body: any = ModelToJsonTransformers.userToJson(user);
    body.admin_key = this.sessionService.getUser().userKey;

    return this.post('/delete', body)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

  create(user: User) {
    const body: any =  ModelToJsonTransformers.userToJson(user);
    body.admin_key = this.sessionService.getUser().userKey;

    return this.post('/create', body)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

  changePassword(userKey: string, password: string) {
    const body: any = { 'user_key': userKey, 'password': password };

    return this.post('/password/change', body)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

  list(): Observable<User[]> {
    this.fetch();

    return this.collection.asObservable();
  }

  fetch() {
    if (this.fetching) { return; }

    if (!this.more) { return; }

    const body: any = {
      'admin_key': this.sessionService.getUser().userKey,
      'cursor': this.cursor,
      'size': 20
    };

    this.fetching = true;
    this.post('/list', body)
      .map(response => {
        const jsonString = response.json();
        const users = jsonString.users ? jsonString.users : [];
        const transformedUsers = JsonToModelTransformers.jsonToUsers(users);
        this.users = this.users.concat(transformedUsers);

        this.cursor = jsonString.cursor;
        this.more = jsonString.more;

        return  this.users;
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

  listBookings(user: User, cursor?: string, size?: number): Observable<any> {
    const body: any = {
      'user_key': user.userKey,
      'cursor': cursor,
      'size': size
    };

    return this.post('/bookings/list', body)
      .map(response => {
        let bookings: any = JsonToModelTransformers.jsonToBookings(response.json().bookings, user);

        // filter drafted bookings from the list
        bookings = bookings.filter(booking => booking.state !== BookingState.Draft);

        // put active bookings under scheduled list
        this.bookings.scheduled = bookings.filter(booking => booking.state === BookingState.Active);

        // put none active bookings under history list
        this.bookings.history = bookings.filter(booking => booking.state !== BookingState.Active);

        return this.bookings;
      })
      .catch(error => Observable.throw(error))
    ;
  }

  listEvents(user: User, cursor?: string, size?: number): Observable<Event[]> {

    return this.listBookings(user, cursor, size)
      .map(response => {
        let events: any = [];
        events = JsonToModelTransformers.bookingsToEvents(<Booking[]>this.bookings.scheduled);
        events = events.concat(JsonToModelTransformers.bookingsToEvents(<Booking[]>this.bookings.history));
        this.events = events;
        return this.events;
      }).catch(error => {
        return Observable.throw(error);
      })
    ;
  }

  sendPasswordResetLink(email: string): Observable<any> {
    const body: any = {
      'email': email,
    };

    return this.post('/password/reset', body)
      .map(response => {
        return true;
      })
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

}
