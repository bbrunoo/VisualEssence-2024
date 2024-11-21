import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaltoNumerosInstCadastroComponent } from './dalto-numeros-inst-cadastro.component';

describe('DaltoNumerosInstCadastroComponent', () => {
  let component: DaltoNumerosInstCadastroComponent;
  let fixture: ComponentFixture<DaltoNumerosInstCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaltoNumerosInstCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaltoNumerosInstCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
