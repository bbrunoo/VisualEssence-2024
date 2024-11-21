import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaltoAnimaisPaisCadastroComponent } from './dalto-animais-pais-cadastro.component';

describe('DaltoAnimaisPaisCadastroComponent', () => {
  let component: DaltoAnimaisPaisCadastroComponent;
  let fixture: ComponentFixture<DaltoAnimaisPaisCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaltoAnimaisPaisCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaltoAnimaisPaisCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
