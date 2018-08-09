import { TestBed, inject } from '@angular/core/testing';

import { LocalAdminService } from './local-admin.service';

describe('LocalAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalAdminService]
    });
  });

  it('should be created', inject([LocalAdminService], (service: LocalAdminService) => {
    expect(service).toBeTruthy();
  }));
});
