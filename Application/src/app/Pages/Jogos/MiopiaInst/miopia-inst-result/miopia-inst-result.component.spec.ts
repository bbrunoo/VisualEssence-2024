import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiopiaInstResultComponent } from './miopia-inst-result.component';

describe('MiopiaInstResultComponent', () => {
  let component: MiopiaInstResultComponent;
  let fixture: ComponentFixture<MiopiaInstResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiopiaInstResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiopiaInstResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
