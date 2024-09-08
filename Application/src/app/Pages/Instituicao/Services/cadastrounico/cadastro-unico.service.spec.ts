import { TestBed } from '@angular/core/testing';

import { CadastroUnicoService } from './cadastro-unico.service';

describe('CadastroUnicoService', () => {
  let service: CadastroUnicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroUnicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
