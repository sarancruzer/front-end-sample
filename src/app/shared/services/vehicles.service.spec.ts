/* tslint:disable:no-unused-variable */

import { Injectable, ReflectiveInjector } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  RequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { VehiclesService } from './vehicles.service';
import { SessionService } from './session.service';
import { SessionServiceStub } from '../../../testing';
import JsonToModelTransformers from '../../utils/json.to.model';

describe('VehiclesService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: SessionService, useClass: SessionServiceStub },
      Http,
      VehiclesService,
    ]);
    this.vehicleService = this.injector.get(VehiclesService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('should define a collection that can be subscribed to', () => {
    expect(this.vehicleService.collection).toBeDefined();
  });

  describe('list()', () => {
    let vehicles = [{
      'vehicle_id': 'MK123',
      'type': 'SEDAN',
      'model': 'BMW',
      'location': 'koyambedu',
      'manufacturer': 'BMW-works',
      'tracker_id': '23sad',
      'is_available': false
    }];

    it('should both fetch and return an observable to subscribe to', fakeAsync(() => {
      let result: any;

      this.vehicleService.list().subscribe(resp => result = resp);
      this.lastConnection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify({ 'vehicles': vehicles }),
      })));
      tick();

      expect(result).toEqual(JsonToModelTransformers.jsonToVehicles(vehicles));
    }));
  });
});
