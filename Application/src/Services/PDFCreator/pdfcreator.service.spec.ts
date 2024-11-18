import { TestBed } from '@angular/core/testing';

import { PDFCreatorService } from './pdfcreator.service';

describe('PDFCreatorService', () => {
  let service: PDFCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PDFCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
