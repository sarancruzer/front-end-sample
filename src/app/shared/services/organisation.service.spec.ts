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

import { OrganisationService } from './organisation.service';
import { SessionService } from './session.service';
import { Organisation, AdminRegistrationData } from '../../models';
import { SessionServiceStub } from '../../../testing';

const ORGANISATION: Organisation = {
  name: 'Softence Pvt Ltd',
  website: 'www.softence.com',
  phone: '9987665432',
  address: '2/18. Kaliamman Kobil street',
  city: 'Chennai',
  country: 'India',
  numberOfEmployees : 10
};

const ADMIN: AdminRegistrationData =  {
  'name': 'Avinash Raj',
  'phone': '',
  'isAdmin': true,
  'department': 'Development',
  'initials': 'AR',
  'email': 'avinash@softence.com',
  'jobTitle': 'Python Developer'
};

describe('OrganisationService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: SessionService, useClass: SessionServiceStub },
      Http,
      OrganisationService,
    ]);
    this.organisationService = this.injector.get(OrganisationService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('should create an organisation', fakeAsync(() => {
    let result: any;
    this.organisationService.create(ORGANISATION, ADMIN).subscribe((response: any) => result = response);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ organisation_key: 'foobar123', admin_key: 'sjhdgjfasgdf' }),
    })));

    expect(result.organisation_key).toEqual('foobar123');
  }));

  it('should update WialanAccessToken', fakeAsync(() => {
    let response: any;
    this.organisationService.updateWialonAccessToken('gfhsdasdahgasdhg').subscribe(resp => response = resp);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: {},
    })));

    expect(this.lastConnection.request.url).toMatch(/\/integrations\/wialon\/token/);
    expect(response.json()).toEqual({});
  }));
});
