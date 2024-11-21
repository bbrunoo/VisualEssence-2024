import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaltoNumerosInstInstrucaoComponent } from './dalto-numeros-inst-instrucao.component';

describe('DaltoNumerosInstInstrucaoComponent', () => {
  let component: DaltoNumerosInstInstrucaoComponent;
  let fixture: ComponentFixture<DaltoNumerosInstInstrucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaltoNumerosInstInstrucaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaltoNumerosInstInstrucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
