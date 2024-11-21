import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaltoAnimaisPaisResultadoComponent } from './dalto-animais-pais-resultado.component';

describe('DaltoAnimaisPaisResultadoComponent', () => {
  let component: DaltoAnimaisPaisResultadoComponent;
  let fixture: ComponentFixture<DaltoAnimaisPaisResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaltoAnimaisPaisResultadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaltoAnimaisPaisResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
