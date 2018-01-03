/* tslint:disable:component-class-suffix */
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';

import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  Organisation,
  AdminRegistrationData,
  User,
  Vehicle,
  Booking,
  ChartPoint,
} from '../app/models';

@Component({selector: 'nb-organisation-form', template: ''})
export class OrganisationFormComponentStub {

  @Input() organisation: Organisation;

  @Input() submitName = 'Save Changes';

  @Output() done: EventEmitter<Organisation> = new EventEmitter();

}

@Component({selector: 'nb-admin-form', template: ''})
export class AdminFormComponentStub {

  @Input() admin: AdminRegistrationData;

  @Output() done: EventEmitter<AdminRegistrationData> = new EventEmitter<AdminRegistrationData>();

}

export class SessionServiceStub {
  onReset: Subject<number>;

  constructor() {
    this.onReset = new Subject<number>();
  }

  getUser() { return { userKey: 'foo' }; }

  getOrganisation() {}
}

export class OrganisationServiceStub {
  listBookings() {}
}

export class WialonServiceStub {
  getLoginUrl() {}
  loginToken() {}
  loadLibrary() {}
  fetchUnits() {}
  fetchUnitById() {}
  logout() {}
  isLoggedIn() {}
}

export class VehiclesServiceStub {
  collection: ReplaySubject<Vehicle[]>;

  constructor() {
    this.collection = new ReplaySubject<Vehicle[]>(1);
  }

  list() {}
  fetch() { return this.collection.asObservable(); }
  hasMore() {}
}

export class DepartmentsServiceStub {
  list() {}
}

export class LocationsServiceStub {
  locations: Location[] = [];
  list() {}
}

export class UsersServiceStub {
  collection: ReplaySubject<User[]>;

  constructor() {
    this.collection = new ReplaySubject<User[]>();
  }

  sendPasswordResetLink() { }
  listEvents() { return Observable.from([]); }
  fetch() { }
}

export class LeafletServiceStub {
  init() {}
  showMarker() {}
  buildIcon() {}
  setView() {}
}

export let wialonMock: any = {
  core: {
    Session: {
      getInstance: function() {}
    },

    Errors: {
      getErrorText: function() {}
    }
  },

  item: {
    Item: {
      dataFlag: {
        base: 1
      }
    },
    Unit: {
      dataFlag: {
        lastMessage: 42
      }
    }
  }
};

export let leafletMock: any = {};

export class WindowRefServiceStub {
  get nativeWindow(): any {
    return {
      wialon: wialonMock,
      L: leafletMock
    };
  }
}

export class UploadServiceStub {}

export class BookingsServiceStub {
  collection: ReplaySubject<Booking[]>;

  constructor() {
    this.collection = new ReplaySubject<Booking[]>();
  }

  list() {}
  fetch() {}
  fetchByTimeFrame() {}
}

export class StatisticsServiceStub {

  getMostBookedVehicles(): Observable<Vehicle[]> {
    return Observable.of([]);
  }

  getMostActiveUsers(): Observable<User[]> {
    return Observable.of([]);
  }

  getBookingsPerDay(): Observable<ChartPoint[]> {
    return Observable.of([]);
  }

  getBookingsByStates(): Observable<ChartPoint[]> {
    return Observable.of([]);
  }

  getMostPopularBookingTime(): Observable<Date> {
    return Observable.of(new Date());
  }

  getAvgBookingDuration(): Observable<Number> {
    return Observable.of(142);
  }

  getUnusedVehiclesCount(): Observable<Number> {
    return Observable.of(42);
  }
}
