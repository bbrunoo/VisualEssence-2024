import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCriancaPaisComponent } from './cadastro-crianca-pais.component';

describe('CadastroCriancaPaisComponent', () => {
  let component: CadastroCriancaPaisComponent;
  let fixture: ComponentFixture<CadastroCriancaPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCriancaPaisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroCriancaPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
