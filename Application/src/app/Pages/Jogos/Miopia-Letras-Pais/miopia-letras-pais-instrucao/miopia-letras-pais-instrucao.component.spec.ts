import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiopiaLetrasPaisInstrucaoComponent } from './miopia-letras-pais-instrucao.component';

describe('MiopiaLetrasPaisInstrucaoComponent', () => {
  let component: MiopiaLetrasPaisInstrucaoComponent;
  let fixture: ComponentFixture<MiopiaLetrasPaisInstrucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiopiaLetrasPaisInstrucaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiopiaLetrasPaisInstrucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
