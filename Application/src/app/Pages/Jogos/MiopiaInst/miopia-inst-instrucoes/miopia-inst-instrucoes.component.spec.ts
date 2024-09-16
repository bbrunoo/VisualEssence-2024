import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiopiaInstInstrucoesComponent } from './miopia-inst-instrucoes.component';

describe('MiopiaInstInstrucoesComponent', () => {
  let component: MiopiaInstInstrucoesComponent;
  let fixture: ComponentFixture<MiopiaInstInstrucoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiopiaInstInstrucoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiopiaInstInstrucoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
