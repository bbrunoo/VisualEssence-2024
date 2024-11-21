import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaltoNumerosInstResultadoComponent } from './dalto-numeros-inst-resultado.component';

describe('DaltoNumerosInstResultadoComponent', () => {
  let component: DaltoNumerosInstResultadoComponent;
  let fixture: ComponentFixture<DaltoNumerosInstResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaltoNumerosInstResultadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaltoNumerosInstResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
