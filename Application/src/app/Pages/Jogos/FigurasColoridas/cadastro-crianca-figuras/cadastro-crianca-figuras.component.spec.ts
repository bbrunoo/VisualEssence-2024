import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCriancaFigurasComponent } from './cadastro-crianca-figuras.component';

describe('CadastroCriancaFigurasComponent', () => {
  let component: CadastroCriancaFigurasComponent;
  let fixture: ComponentFixture<CadastroCriancaFigurasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCriancaFigurasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroCriancaFigurasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
