import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiopiaInstComponent } from './miopia-inst.component';

describe('MiopiaInstComponent', () => {
  let component: MiopiaInstComponent;
  let fixture: ComponentFixture<MiopiaInstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiopiaInstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiopiaInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
