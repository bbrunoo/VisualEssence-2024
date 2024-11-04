import { TestBed } from '@angular/core/testing';

import { AccountPictureService } from './account-picture.service';

describe('AccountPictureService', () => {
  let service: AccountPictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountPictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
