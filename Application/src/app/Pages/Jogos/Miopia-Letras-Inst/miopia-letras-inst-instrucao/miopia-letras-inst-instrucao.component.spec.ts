import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiopiaLetrasInstInstrucaoComponent } from './miopia-letras-inst-instrucao.component';

describe('MiopiaLetrasInstInstrucaoComponent', () => {
  let component: MiopiaLetrasInstInstrucaoComponent;
  let fixture: ComponentFixture<MiopiaLetrasInstInstrucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiopiaLetrasInstInstrucaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiopiaLetrasInstInstrucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
