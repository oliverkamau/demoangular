import { TestBed } from '@angular/core/testing';

import { SytemSetupService } from './sytem-setup.service';

describe('SytemSetupService', () => {
  let service: SytemSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SytemSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
