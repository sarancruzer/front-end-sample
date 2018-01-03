/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackendService } from './backend.service';

import { OpaqueToken } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Http, HttpModule, XHRBackend, ResponseOptions,
  Response, BaseRequestOptions
} from '@angular/http';

describe('BackendService', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: Http, useFactory: (backend, options) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        {
          provide: BackendService,
          deps: [Http],
          useFactory: (http: Http) => {
            return new BackendService(http, 'some-base');
          }
        }
      ]
    });

  });

  it('should ...', inject([BackendService, MockBackend], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));
});
