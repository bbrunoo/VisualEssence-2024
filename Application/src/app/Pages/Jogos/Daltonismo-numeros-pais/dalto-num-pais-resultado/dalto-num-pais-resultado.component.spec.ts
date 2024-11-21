import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaltoNumPaisResultadoComponent } from './dalto-num-pais-resultado.component';

describe('DaltoNumPaisResultadoComponent', () => {
  let component: DaltoNumPaisResultadoComponent;
  let fixture: ComponentFixture<DaltoNumPaisResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaltoNumPaisResultadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaltoNumPaisResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
