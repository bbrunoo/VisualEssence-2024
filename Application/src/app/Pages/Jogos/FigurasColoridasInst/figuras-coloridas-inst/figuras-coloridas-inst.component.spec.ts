import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurasColoridasInstComponent } from './figuras-coloridas-inst.component';

describe('FigurasColoridasInstComponent', () => {
  let component: FigurasColoridasInstComponent;
  let fixture: ComponentFixture<FigurasColoridasInstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FigurasColoridasInstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FigurasColoridasInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
