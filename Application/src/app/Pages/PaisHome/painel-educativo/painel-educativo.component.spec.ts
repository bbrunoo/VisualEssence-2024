import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelEducativoComponent } from './painel-educativo.component';

describe('PainelEducativoComponent', () => {
  let component: PainelEducativoComponent;
  let fixture: ComponentFixture<PainelEducativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelEducativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PainelEducativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
