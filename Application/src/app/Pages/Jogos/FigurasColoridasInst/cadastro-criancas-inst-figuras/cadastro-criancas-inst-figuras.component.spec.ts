import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCriancasInstFigurasComponent } from './cadastro-criancas-inst-figuras.component';

describe('CadastroCriancasInstFigurasComponent', () => {
  let component: CadastroCriancasInstFigurasComponent;
  let fixture: ComponentFixture<CadastroCriancasInstFigurasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCriancasInstFigurasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroCriancasInstFigurasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
