import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriancasCadastradasSalaComponent } from './criancas-cadastradas-sala.component';

describe('CriancasCadastradasSalaComponent', () => {
  let component: CriancasCadastradasSalaComponent;
  let fixture: ComponentFixture<CriancasCadastradasSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriancasCadastradasSalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriancasCadastradasSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
