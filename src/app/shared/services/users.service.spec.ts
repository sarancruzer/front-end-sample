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

import { UsersService } from './users.service';
import { SessionService } from './session.service';
import { SessionServiceStub } from '../../../testing';
import { User } from '../../models';
import JsonToModelTransformers from '../../utils/json.to.model';

const USER: User =  {
  'name': 'Avinash Raj',
  'phone': '',
  'isAdmin': true,
  'department': 'Development',
  'initials': 'AR',
  'email': 'avinash@softence.com',
  'jobTitle': 'Python Developer'
};

describe('UsersService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: SessionService, useClass: SessionServiceStub },
      Http,
      UsersService,
    ]);
    this.userService = this.injector.get(UsersService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('create() should create new user', fakeAsync(() => {
    let result: any;
    this.userService.create(USER).subscribe(resp => result = resp);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ 'user_key': 'sadfcvsdfasdfhhafsdj' }),
    })));
    tick();

    expect(result.user_key).toEqual('sadfcvsdfasdfhhafsdj');
  }));

  it('list() should list all the users', fakeAsync(() => {
    let users = [{
      'initials': 'AR',
      'name': 'Avinash',
      'email': 'avinash@softence.com',
      'department': 'Development',
      'is_admin': true
    }];
    let result: any;
    this.userService.list().subscribe(resp => result = resp);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ 'users': users }),
    })));
    tick();

    expect(result).toEqual(JsonToModelTransformers.jsonToUsers(users));
  }));
});
