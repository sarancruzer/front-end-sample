/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { MaterialDashboardProService } from './material-dashboard-pro.service';
import { WindowRefService } from './window-ref.service';

describe('MaterialDashboardProService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MaterialDashboardProService,
        {provide: WindowRefService, useValue: window}
      ]
    });
  });

  it('should ...', inject([MaterialDashboardProService], (service: MaterialDashboardProService) => {
    expect(service).toBeTruthy();
  }));
});
