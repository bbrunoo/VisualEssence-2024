import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurasColoridasInstrucoesComponent } from './figuras-coloridas-instrucoes.component';

describe('FigurasColoridasInstrucoesComponent', () => {
  let component: FigurasColoridasInstrucoesComponent;
  let fixture: ComponentFixture<FigurasColoridasInstrucoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FigurasColoridasInstrucoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FigurasColoridasInstrucoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
