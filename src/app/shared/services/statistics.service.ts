import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import {
  TimeFrame,
  User,
  Vehicle,
  ChartPoint,
  Booking,
  BookingState,
} from './../../models';
import { BookingsService } from './bookings.service';
import { VehiclesService } from './vehicles.service';

@Injectable()
export class StatisticsService {

  protected timeFrameChange: Subject<TimeFrame>;

  protected bookingsChange: Subject<Booking[]>;

  protected vehiclesSubject: ReplaySubject<Vehicle[]>;

  constructor(
    private bookingsService: BookingsService,
    private vehiclesService: VehiclesService
  ) {
    this.timeFrameChange = new Subject<TimeFrame>();
    this.bookingsChange = new Subject<Booking[]>();
    this.vehiclesSubject = new ReplaySubject<Vehicle[]>(1);

    this.observeTimeFrame();
    this.fetchAllVehicles();
  }

  getMostBookedVehicles(timeFrame: TimeFrame): Observable<Vehicle[]> {
    this.timeFrameChange.next(timeFrame);

    return this.bookingsChange
      .asObservable()
      .map((bookings: Booking[]) => {
        const vehicles: Vehicle[] = [];
        const vehiclesLookup: any = {};

        bookings.forEach(booking => {
          if (!(booking.vehicle.key in vehiclesLookup)) {
            booking.vehicle.numberOfBookings = 0;
            vehiclesLookup[booking.vehicle.key] = booking.vehicle;
            vehicles.push(booking.vehicle);
          }

          vehiclesLookup[booking.vehicle.key].numberOfBookings++;
        });

        return vehicles;
      })
    ;
  }

  getMostActiveUsers(timeFrame: TimeFrame): Observable<User[]> {
    this.timeFrameChange.next(timeFrame);

    return this.bookingsChange
      .asObservable()
      .map((bookings: Booking[]) => {
        const users: User[] = [];
        const usersLookup: any = {};

        bookings.forEach(booking => {
          if (!(booking.owner.userKey in usersLookup)) {
            booking.owner.numberOfBookings = 0;
            usersLookup[booking.owner.userKey] = booking.owner;
            users.push(booking.owner);
          }

          usersLookup[booking.owner.userKey].numberOfBookings++;
        });

        return users;
      })
    ;
  }

  getBookingsPerDay(timeFrame: TimeFrame): Observable<ChartPoint[]> {
    this.timeFrameChange.next(timeFrame);

    return this.bookingsChange
      .asObservable()
      .map((bookings: Booking[]) => {
        // build a lookup table as {date => #bookings}
        const bookingsPerDay: any = {};
        bookings.forEach((booking: Booking) => {
          const st = booking.startTime;
          const key = `${st.getFullYear()}${st.getMonth()}${st.getDate()}`;
          if (!(key in bookingsPerDay)) {
            bookingsPerDay[key] = 0;
          }

          bookingsPerDay[key]++;
        });

        // build a list of points for each day in the time frame
        const tf: TimeFrame = { start: new Date(timeFrame.start), end: new Date(timeFrame.end) };
        const points: ChartPoint[] = [];
        const current = tf.start;
        while (!this.hasReachedEndDay(current, tf.end)) {
          const key = `${current.getFullYear()}${current.getMonth()}${current.getDate()}`;
          let count = 0;
          if (key in bookingsPerDay) {
            count = bookingsPerDay[key];
          }
          points.push({ x: new Date(current), y: count });

          current.setDate(current.getDate() + 1);
        }

        return points;
      })
    ;
  }

  getBookingsByStates(timeFrame: TimeFrame): Observable<ChartPoint[]> {
    this.timeFrameChange.next(timeFrame);

    return this.bookingsChange
      .asObservable()
      .map((bookings: Booking[]) => {
        // build a lookup table as {state => #bookings}
        const bookingsPerState: any = {};
        bookings.forEach((booking: Booking) => {
          const key = BookingState[booking.state];
          if (!(key in bookingsPerState)) {
            bookingsPerState[key] = 0;
          }

          bookingsPerState[key]++;
        });

        return [
          { x: 'Active', y: bookingsPerState['Active'] ? bookingsPerState['Active'] : 0 },
          { x: 'Completed', y: bookingsPerState['Completed'] ? bookingsPerState['Completed'] : 0 },
          { x: 'Cancelled', y: bookingsPerState['Cancelled'] ? bookingsPerState['Cancelled'] : 0 }
        ];
      });
  }

  getMostPopularBookingTime(timeFrame: TimeFrame): Observable<Date> {
    this.timeFrameChange.next(timeFrame);

    return this.bookingsChange
      .asObservable()
      .map((bookings: Booking[]) => {
        let hours: number[] = [];
        let minutes: number[] = [];
        bookings.forEach((booking: Booking) => {
          hours.push(booking.startTime.getHours());
          minutes.push(booking.startTime.getMinutes());
        });

        hours = hours.sort();
        minutes = minutes.sort();

        const hoursMedianIdx = Math.floor(hours.length / 2);
        const minutesMedianIdx = Math.floor(minutes.length / 2);

        const medianHour = hours.length ? hours[hoursMedianIdx] : 0;
        const medianMinute = minutes.length ? minutes[minutesMedianIdx] : 0;

        return new Date(0, 0, 0, medianHour, medianMinute);
      })
    ;
  }

  getAvgBookingDuration(timeFrame: TimeFrame): Observable<Number> {
    this.timeFrameChange.next(timeFrame);

    return this.bookingsChange
      .asObservable()
      .map((bookings: Booking[]) => {
        if (bookings.length === 0) {
          return 0;
        }

        const durations: number[] = [];
        bookings.forEach((booking: Booking) => {
          let startTime: number, endTime: number;
          [endTime, startTime] = [booking.endTime.getTime(), booking.startTime.getTime()];
          const duration = (endTime - startTime) / (60 * 1000);
          durations.push(duration);
        });

        const sum = durations.reduce((prev, current) => prev + current);

        return Math.round(sum / durations.length);
      })
    ;
  }

  getUnusedVehiclesCount(timeFrame: TimeFrame): Observable<Number> {
    this.timeFrameChange.next(timeFrame);

    return this.bookingsChange
      .asObservable()
      .withLatestFrom(
        this.vehiclesSubject.asObservable(),
        (bookings: Booking[], vehicles: Vehicle[]) => [bookings, vehicles]
      )
      .map((result: [Booking[], Vehicle[]]) => {
        const bookings: Booking[] = result[0];
        const vehicles: Vehicle[] = result[1];

        if (bookings.length === 0) {
          return vehicles.length;
        }

        let unusedVehicles = 0;
        vehicles.forEach((vehicle: Vehicle) => {
          const bookedVehicle = bookings.find((booking: Booking) => booking.vehicle.key === vehicle.key);
          if (!bookedVehicle) {
            unusedVehicles++;
          }
        });

        return unusedVehicles;
      })
    ;
  }

  protected observeTimeFrame() {
    this.timeFrameChange
      .asObservable()
      .distinctUntilChanged()
      .subscribe((timeFrame: TimeFrame) => {
        this.fetchBookingsByTimeFrame(timeFrame);
      })
    ;
  }

  protected fetchBookingsByTimeFrame(timeFrame: TimeFrame) {
    const subscription = this.bookingsService
      .fetchByTimeFrame(timeFrame)
      .subscribe((bookings: Booking[]) => {
        this.bookingsChange.next(bookings);

        if (subscription) {
          subscription.unsubscribe();
        }
      })
    ;
  }

  private hasReachedEndDay(current: Date, end: Date): boolean {
    return new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate()
    ).getTime() > new Date(
        end.getFullYear(),
        end.getMonth(),
        end.getDate()
    ).getTime();
  }

  private fetchAllVehicles() {
    this.vehiclesService.fetch();
    const subscription = this.vehiclesService.collection
      .subscribe(
        data => {
          if (this.vehiclesService.hasMore()) {
            return this.vehiclesService.fetch();
          }

          this.vehiclesSubject.next(data);
          this.vehiclesSubject.complete();

          if (subscription) {
            subscription.unsubscribe();
          }
        }
      )
    ;
  }

}
