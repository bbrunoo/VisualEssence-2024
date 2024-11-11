import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcoesMiopiaInstComponent } from './opcoes-miopia-inst.component';

describe('OpcoesMiopiaInstComponent', () => {
  let component: OpcoesMiopiaInstComponent;
  let fixture: ComponentFixture<OpcoesMiopiaInstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcoesMiopiaInstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcoesMiopiaInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
