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

import { UploadService } from './upload.service';
import { SessionService } from './session.service';
import { SessionServiceStub } from '../../../testing';

describe('UploadService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: SessionService, useClass: SessionServiceStub },
      Http,
      UploadService,
    ]);
    this.uploadService = this.injector.get(UploadService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('uploadUsers() should upload users', fakeAsync(() => {
    let result: any;
    let file = File;
    this.uploadService.uploadUsers(file).subscribe((resp: any) => result = resp);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: {},
    })));
    tick();

    expect(this.lastConnection.request.url).toMatch(/\/import\/users/);
  }));
});
