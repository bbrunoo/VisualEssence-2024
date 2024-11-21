import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaltoNumerosInstComponent } from './dalto-numeros-inst.component';

describe('DaltoNumerosInstComponent', () => {
  let component: DaltoNumerosInstComponent;
  let fixture: ComponentFixture<DaltoNumerosInstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaltoNumerosInstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaltoNumerosInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
