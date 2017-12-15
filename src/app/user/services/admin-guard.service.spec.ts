/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { SessionService } from './../../shared/services';

import {
  SessionServiceStub
} from './../../../testing';

import { AdminGuardService } from './admin-guard.service';

describe('AdminGuardService', () => {
  let sessionServiceStub: SessionServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminGuardService,
        {provide: SessionService, useValue: sessionServiceStub}
      ]
    });
  });

  it('should ...', inject([AdminGuardService], (service: AdminGuardService) => {
    expect(service).toBeTruthy();
  }));
});
