import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaltoNumPaisInstrucaoComponent } from './dalto-num-pais-instrucao.component';

describe('DaltoNumPaisInstrucaoComponent', () => {
  let component: DaltoNumPaisInstrucaoComponent;
  let fixture: ComponentFixture<DaltoNumPaisInstrucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaltoNumPaisInstrucaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaltoNumPaisInstrucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
