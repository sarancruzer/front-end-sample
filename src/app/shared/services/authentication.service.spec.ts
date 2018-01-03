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
import { AuthenticationService } from './authentication.service';


describe('AuthenticationService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      AuthenticationService,
    ]);
    this.authenticationService = this.injector.get(AuthenticationService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('should login', fakeAsync(() => {
    let user: any;
    let userArray = {
      'initials': 'AR',
      'name': 'Avinash',
      'email': 'avinash@softence.com',
      'department': 'Development',
      'is_admin': true
    };
    this.authenticationService.login('avinash@softence.com', 'foo').subscribe(resp => user = resp);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: userArray,
    })));

    expect(this.lastConnection.request.url).toMatch(/\/users\/login/);
    expect(user).toEqual(userArray);
  }));
});
