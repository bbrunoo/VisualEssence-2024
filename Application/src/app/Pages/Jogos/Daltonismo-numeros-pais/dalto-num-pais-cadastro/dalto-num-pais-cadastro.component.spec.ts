import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaltoNumPaisCadastroComponent } from './dalto-num-pais-cadastro.component';

describe('DaltoNumPaisCadastroComponent', () => {
  let component: DaltoNumPaisCadastroComponent;
  let fixture: ComponentFixture<DaltoNumPaisCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaltoNumPaisCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaltoNumPaisCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
