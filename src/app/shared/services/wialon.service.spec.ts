/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { WialonService } from './wialon.service';
import { WindowRefService } from './window-ref.service';

import {
  wialonMock,
  WindowRefServiceStub,
} from './../../../testing';

describe('WialonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: WindowRefService, useClass: WindowRefServiceStub},
        WialonService
      ]
    });
  });

  it('should be defined', inject([WialonService], (service: WialonService) => {
    expect(service).toBeTruthy();
  }));
});
