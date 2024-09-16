import { TestBed } from '@angular/core/testing';

import { MiopiaInstService } from './miopia-inst.service';

describe('MiopiaInstService', () => {
  let service: MiopiaInstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiopiaInstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
