/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { SessionService } from './../../shared/services';

import {
  RouterStub,
  SessionServiceStub
} from './../../../testing';

import { UserGuardService } from './user-guard.service';

describe('UserGuardService', () => {
  let sessionServiceStub: SessionServiceStub;
  let routerStub: RouterStub;

  beforeEach(() => {
    sessionServiceStub = new SessionServiceStub();
    routerStub = new RouterStub();

    TestBed.configureTestingModule({
      providers: [
        UserGuardService,
        {provide: SessionService, useValue: sessionServiceStub},
        {provide: Router, useValue: routerStub}
      ]
    });
  });

  it('should ...', inject([UserGuardService], (service: UserGuardService) => {
    expect(service).toBeTruthy();
  }));
});
