/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { LeafletService } from './leaflet.service';
import { WindowRefService } from './window-ref.service';

import {
  leafletMock,
  WindowRefServiceStub,
} from './../../../testing';

describe('LeafletService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LeafletService,
        {provide: WindowRefService, useClass: WindowRefServiceStub}
      ]
    });
  });

  it('should ...', inject([LeafletService], (service: LeafletService) => {
    expect(service).toBeTruthy();
  }));
});
