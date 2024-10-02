import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPaisComponent } from './historico-pais.component';

describe('HistoricoPaisComponent', () => {
  let component: HistoricoPaisComponent;
  let fixture: ComponentFixture<HistoricoPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoPaisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
