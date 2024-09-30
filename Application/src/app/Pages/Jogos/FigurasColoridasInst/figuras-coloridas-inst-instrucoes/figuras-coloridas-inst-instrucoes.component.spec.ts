import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurasColoridasInstInstrucoesComponent } from './figuras-coloridas-inst-instrucoes.component';

describe('FigurasColoridasInstInstrucoesComponent', () => {
  let component: FigurasColoridasInstInstrucoesComponent;
  let fixture: ComponentFixture<FigurasColoridasInstInstrucoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FigurasColoridasInstInstrucoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FigurasColoridasInstInstrucoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
