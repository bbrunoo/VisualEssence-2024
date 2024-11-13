import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiopiaLetrasPaisResultadoComponent } from './miopia-letras-pais-resultado.component';

describe('MiopiaLetrasPaisResultadoComponent', () => {
  let component: MiopiaLetrasPaisResultadoComponent;
  let fixture: ComponentFixture<MiopiaLetrasPaisResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiopiaLetrasPaisResultadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiopiaLetrasPaisResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
