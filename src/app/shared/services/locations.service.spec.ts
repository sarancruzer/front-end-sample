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

import { SessionService } from './session.service';
import { LocationsService } from './locations.service';
import { SessionServiceStub } from '../../../testing';
import { Location } from '../../models';
import JsonToModelTransformers from '../../utils/json.to.model';

const LOCATIONS = [
  {
    'name': 'Guindy',
    'location_key': 'fgsadhghgsadjhjgsad'
  },
  {
    'name': 'Koyambedu',
    'location_key': 'sadfvsdsfgdgbvfgdbgfb'
  }
];

describe('DepartmentsService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: SessionService, useClass: SessionServiceStub },
      Http,
      LocationsService,
    ]);
    this.departmentService = this.injector.get(LocationsService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('list() should return all locations', fakeAsync(() => {
    let locations: Location[];
    this.departmentService.list().subscribe(resp => locations = resp);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: { locations : LOCATIONS},
    })));
    tick();

    expect(this.lastConnection.request.url).toMatch(/\/locations\/list/);
    expect(locations).toEqual(JsonToModelTransformers.jsonToLocations(LOCATIONS));
  }));

  it('create() should create a new department', fakeAsync(() => {
    let loc = new Location();
    loc.name = 'Thambaram';
    let location: Location;
    this.departmentService.create(loc).subscribe( (resp: any) => location = resp);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ location_key : 'jhdsfjhkbdsjkfhbvjhdfbv'}),
    })));
    tick();

    expect(location.name).toEqual('Thambaram');
  }));

  it('delete() should delete a department', fakeAsync(() => {
    let loc = new Location();
    loc.name = 'Thambaram';
    let result: any;

    this.departmentService.delete(loc).subscribe(resp => result = resp);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: {},
    })));
    tick();

    expect(result).toEqual([]);
  }));
});
