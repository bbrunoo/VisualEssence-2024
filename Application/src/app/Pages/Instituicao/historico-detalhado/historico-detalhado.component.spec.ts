import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoDetalhadoComponent } from './historico-detalhado.component';

describe('HistoricoDetalhadoComponent', () => {
  let component: HistoricoDetalhadoComponent;
  let fixture: ComponentFixture<HistoricoDetalhadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoDetalhadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoDetalhadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
