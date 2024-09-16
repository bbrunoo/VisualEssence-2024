import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCriancaInstComponent } from './cadastro-crianca-inst.component';

describe('CadastroCriancaInstComponent', () => {
  let component: CadastroCriancaInstComponent;
  let fixture: ComponentFixture<CadastroCriancaInstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCriancaInstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroCriancaInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
