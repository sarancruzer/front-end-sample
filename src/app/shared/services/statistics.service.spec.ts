import { Observable, Subject } from 'rxjs/Rx';

import { TestBed, inject, async } from '@angular/core/testing';

import {
  Booking,
  User,
  Vehicle,
  BookingState,
  TimeFrame,
  ChartPoint,
} from './../../models';

import { BookingsService } from './bookings.service';
import { StatisticsService } from './statistics.service';
import { VehiclesService } from './vehicles.service';

import { BookingsServiceStub, VehiclesServiceStub } from './../../../testing';

describe('StatisticsService', () => {

  const usersFixture: User[] = [
    {
      isAdmin: false,
      userKey: 'user-1',
      initials: 'FFM'
    },
    {
      isAdmin: true,
      userKey: 'user-2',
      initials: 'IF'
    },
    {
      isAdmin: true,
      userKey: 'user-3',
      initials: 'LM'
    }
  ];
  const vehicleTypeFixture = { id: 1, key: 'ELECTRIC_CAR', name: 'Electric' };
  const vehiclesFixture: Vehicle[] = [
    {
      isAvailable: true,
      key: 'vehicle-1',
      type: vehicleTypeFixture,
      vehicleId: 'T007'
    },
    {
      isAvailable: true,
      key: 'vehicle-2',
      type: vehicleTypeFixture,
      vehicleId: 'T042'
    },
    {
      isAvailable: true,
      key: 'vehicle-3',
      type: {id: 4, key: 'SUV', name: 'SUV'},
      vehicleId: 'IF 042'
    }
  ];
  const bookingsFixture: Booking[] = [
    {
      key: 'booking-1',
      startTime: new Date(2017, 8, 17, 10, 15),
      endTime: new Date(2017, 8, 17, 12),
      state: BookingState.Completed,
      owner: usersFixture[0],
      vehicle: vehiclesFixture[0]
    },
    {
      key: 'booking-2',
      startTime: new Date(2017, 8, 17, 10),
      endTime: new Date(2017, 8, 17, 12),
      state: BookingState.Cancelled,
      owner: usersFixture[1],
      vehicle: vehiclesFixture[1]
    },
    {
      key: 'booking-3',
      startTime: new Date(2017, 8, 18, 10, 20),
      endTime: new Date(2017, 8, 18, 12),
      state: BookingState.Completed,
      owner: usersFixture[0],
      vehicle: vehiclesFixture[0]
    },
    {
      key: 'booking-4',
      startTime: new Date(2020, 8, 18, 10, 30),
      endTime: new Date(2020, 8, 18, 12),
      state: BookingState.Active,
      owner: usersFixture[1],
      vehicle: vehiclesFixture[1]
    },
    {
      key: 'booking-5',
      startTime: new Date(2020, 8, 18, 14, 30),
      endTime: new Date(2020, 8, 18, 16),
      state: BookingState.Active,
      owner: usersFixture[2],
      vehicle: vehiclesFixture[1]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatisticsService,
        { provide: BookingsService, useClass: BookingsServiceStub },
        { provide: VehiclesService, useClass: VehiclesServiceStub }
      ]
    });
  });

  it('should be created', inject([
    StatisticsService
  ], (
    service: StatisticsService
  ) => {
    expect(service).toBeTruthy();
  }));

  it('should start fetching all vehicles when created', inject([
    BookingsService,
    VehiclesService
  ], (
    bookingsService: BookingsService,
    vehiclesService: VehiclesService
  ) => {
    spyOn(vehiclesService, 'fetch');
    new StatisticsService(bookingsService, vehiclesService);

    expect(vehiclesService.fetch).toHaveBeenCalled();
  }));

  it('should fetch bookings only once for the same time frame', inject([
    StatisticsService,
    BookingsService
  ], (
    service: StatisticsService,
    bookingsService: BookingsService
  ) => {
    const bookings: Subject<Booking[]> = new Subject<Booking[]>();
    spyOn(bookingsService, 'fetchByTimeFrame').and.returnValue(bookings.asObservable());
    const timeFrame: TimeFrame = { start: new Date(), end: new Date() };
    service.getAvgBookingDuration(timeFrame);
    service.getBookingsByStates(timeFrame);
    bookings.next(bookingsFixture);

    expect(bookingsService.fetchByTimeFrame).toHaveBeenCalledTimes(1);
  }));

  describe('getMostBookedVehicles()', () => {
    let bookingsServiceMock: BookingsService;
    let service: StatisticsService;
    let bookings: Subject<Booking[]>;

    beforeEach(inject([BookingsService, StatisticsService], (
      bookingsService: BookingsService,
      statsService: StatisticsService
    ) => {
      service = statsService;
      bookingsServiceMock = bookingsService;
      bookings = new Subject<Booking[]>();

      spyOn(bookingsService, 'fetchByTimeFrame')
        .and
        .returnValue(bookings.asObservable())
      ;
    }));

    it('should update time frame', async(() => {
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = { start: new Date(), end: new Date() };
      service.getMostBookedVehicles(timeFrame);
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));

    it('should fetch a list of vehicles with number of times these are booked', async(() => {
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = { start: new Date(), end: new Date() };
      service.getMostBookedVehicles(timeFrame)
        .subscribe((vehicles: Vehicle[]) => {
          expect(vehicles.length).toEqual(2);
          expect([vehicles[0].key, vehicles[1].key]).toEqual(['vehicle-1', 'vehicle-2']);
          expect([vehicles[0].numberOfBookings, vehicles[1].numberOfBookings]).toEqual([2, 3]);
        })
      ;
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));
  });

  describe('getMostActiveUsers()', () => {
    let bookingsServiceMock: BookingsService;
    let service: StatisticsService;
    let bookings: Subject<Booking[]>;

    beforeEach(inject([BookingsService, StatisticsService], (
      bookingsService: BookingsService,
      statsService: StatisticsService
    ) => {
      service = statsService;
      bookingsServiceMock = bookingsService;
      bookings = new Subject<Booking[]>();

      spyOn(bookingsService, 'fetchByTimeFrame')
        .and
        .returnValue(bookings.asObservable())
      ;
    }));

    it('should update time frame', async(() => {
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = { start: new Date(), end: new Date() };
      service.getMostActiveUsers(timeFrame);
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));

    it('should fetch a list of users with number of bookings', async(() => {
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = { start: new Date(), end: new Date() };
      service.getMostActiveUsers(timeFrame)
        .subscribe((users: User[]) => {
          expect(users.length).toEqual(3);
          expect([users[0].userKey, users[1].userKey, users[2].userKey])
            .toEqual(['user-1', 'user-2', 'user-3']);
          expect([users[0].numberOfBookings, users[1].numberOfBookings, users[1].numberOfBookings])
            .toEqual([2, 2, 1]);
        })
      ;
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));
  });

  describe('getBookingsPerDay()', () => {
    let bookingsServiceMock: BookingsService;
    let service: StatisticsService;
    let bookings: Subject<Booking[]>;

    beforeEach(inject([BookingsService, StatisticsService], (
      bookingsService: BookingsService,
      statsService: StatisticsService
    ) => {
      service = statsService;
      bookingsServiceMock = bookingsService;
      bookings = new Subject<Booking[]>();

      spyOn(bookingsService, 'fetchByTimeFrame')
        .and
        .returnValue(bookings.asObservable())
      ;
    }));

    it('should update time frame', async(() => {
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = { start: new Date(), end: new Date() };
      service.getBookingsPerDay(timeFrame);
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));

    it('should fetch a list of points with number of bookings per day', async(() => {
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = {
        start: new Date(2017, 8, 15, 10, 30),
        end: new Date(2017, 8, 21)
      };
      service.getBookingsPerDay(timeFrame)
        .subscribe((points: ChartPoint[]) => {
          expect(points.length).toEqual(7);
          expect(points[2].y).toEqual(2);
          expect(points[3].y).toEqual(3);
          expect([
            points[0].y, points[1].y, points[4].y, points[5].y, points[6].y]
          ).toEqual([0, 0, 0, 0, 0]);
          expect([
            (<Date>points[0].x).getDate(),
            (<Date>points[1].x).getDate(),
            (<Date>points[2].x).getDate(),
            (<Date>points[3].x).getDate(),
            (<Date>points[4].x).getDate(),
            (<Date>points[5].x).getDate(),
            (<Date>points[6].x).getDate()
          ]).toEqual([17, 16, 17, 18, 19, 20, 21]);
        })
      ;
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));

    it('should work with time frame that is accross months', async(() => {
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = {
        start: new Date(2017, 8, 27),
        end: new Date(2017, 9, 3)
      };
      service.getBookingsPerDay(timeFrame)
        .subscribe((points: ChartPoint[]) => {
          expect(points.length).toEqual(7);
          expect([
            points[0].y,
            points[1].y,
            points[2].y,
            points[3].y,
            points[4].y,
            points[5].y,
            points[6].y
          ]).toEqual([0, 0, 0, 0, 0, 0, 0]);
          expect([
            (<Date>points[0].x).getDate(),
            (<Date>points[1].x).getDate(),
            (<Date>points[2].x).getDate(),
            (<Date>points[3].x).getDate(),
            (<Date>points[4].x).getDate(),
            (<Date>points[5].x).getDate(),
            (<Date>points[6].x).getDate()
          ]).toEqual([27, 28, 29, 30, 1, 2, 3]);
        })
      ;
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));
  });

  describe('getBookingsByStates()', () => {
    let bookingsServiceMock: BookingsService;
    let service: StatisticsService;
    let bookings: Subject<Booking[]>;

    beforeEach(inject([BookingsService, StatisticsService], (
      bookingsService: BookingsService,
      statsService: StatisticsService
    ) => {
      service = statsService;
      bookingsServiceMock = bookingsService;
      bookings = new Subject<Booking[]>();

      spyOn(bookingsService, 'fetchByTimeFrame')
        .and
        .returnValue(bookings.asObservable())
      ;
    }));

    it('should update time frame', async(() => {
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = { start: new Date(), end: new Date() };
      service.getBookingsByStates(timeFrame);
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));

    it('should generate a list of points as number of bookings per state', async(() => {
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = { start: new Date(), end: new Date() };
      service.getBookingsByStates(timeFrame)
        .subscribe((points: ChartPoint[]) => {
          expect(points.length).toEqual(3);
          expect([points[0].x, points[1].x, points[2].x]).toEqual(['Active', 'Completed', 'Cancelled']);
          expect([points[0].y, points[1].y, points[2].y]).toEqual([2, 2, 1]);
        })
      ;
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));

  });

  describe('getMostPopularBookingTime()', () => {
    let bookingsServiceMock: BookingsService;
    let service: StatisticsService;
    let bookings: Subject<Booking[]>;

    beforeEach(inject([BookingsService, StatisticsService], (
      bookingsService: BookingsService,
      statsService: StatisticsService
    ) => {
      service = statsService;
      bookingsServiceMock = bookingsService;
      bookings = new Subject<Booking[]>();

      spyOn(bookingsService, 'fetchByTimeFrame')
        .and
        .returnValue(bookings.asObservable())
      ;
    }));

    it('should update time frame', async(() => {
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = { start: new Date(), end: new Date() };
      service.getMostPopularBookingTime(timeFrame);
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));

    it('should return the most popular booking time as date object', async(() => {
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = { start: new Date(), end: new Date() };
      service.getMostPopularBookingTime(timeFrame)
        .subscribe((time: Date) => {
          expect(time.getHours()).toEqual(10);
          expect(time.getMinutes()).toEqual(20);
        })
      ;
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));

  });

  describe('getAvgBookingDuration()', () => {
    let bookingsServiceMock: BookingsService;
    let service: StatisticsService;
    let bookings: Subject<Booking[]>;

    beforeEach(inject([BookingsService, StatisticsService], (
      bookingsService: BookingsService,
      statsService: StatisticsService
    ) => {
      service = statsService;
      bookingsServiceMock = bookingsService;
      bookings = new Subject<Booking[]>();

      spyOn(bookingsService, 'fetchByTimeFrame')
        .and
        .returnValue(bookings.asObservable())
      ;
    }));

    it('should update time frame', async(() => {
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = { start: new Date(), end: new Date() };
      service.getAvgBookingDuration(timeFrame);
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));

    it('should return the average booking duration as number of minutes', async(() => {
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = { start: new Date(), end: new Date() };
      service.getAvgBookingDuration(timeFrame)
        .subscribe((duration: Number) => {
          expect(duration).toEqual(101);
        })
      ;
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));

  });

  describe('getUnusedVehiclesCount()', () => {
    let bookingsServiceMock: BookingsService;
    let vehiclesServiceMock: VehiclesService;
    let service: StatisticsService;
    let bookings: Subject<Booking[]>;

    beforeEach(inject([
      BookingsService,
      VehiclesService,
      StatisticsService
    ], (
      bookingsService: BookingsService,
      vehiclesService: VehiclesService,
      statsService: StatisticsService
    ) => {
      service = statsService;
      bookingsServiceMock = bookingsService;
      vehiclesServiceMock = vehiclesService;
      bookings = new Subject<Booking[]>();

      spyOn(bookingsService, 'fetchByTimeFrame')
        .and
        .returnValue(bookings.asObservable())
      ;

      spyOn(vehiclesServiceMock, 'fetch');
      spyOn(vehiclesServiceMock, 'hasMore').and.returnValue(false);
    }));

    it('should update time frame', async(() => {
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = { start: new Date(), end: new Date() };
      service.getUnusedVehiclesCount(timeFrame);
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));

    it('should return the number of vehicles not being booked in the given time frame', async(() => {
      vehiclesServiceMock.collection.next(vehiclesFixture);
      bookings.next(bookingsFixture);
      const timeFrame: TimeFrame = { start: new Date(), end: new Date() };
      service.getUnusedVehiclesCount(timeFrame)
        .subscribe((count: Number) => {
          expect(count).toEqual(1);
        })
      ;
      expect(bookingsServiceMock.fetchByTimeFrame).toHaveBeenCalledWith(timeFrame);
    }));

  });

});
