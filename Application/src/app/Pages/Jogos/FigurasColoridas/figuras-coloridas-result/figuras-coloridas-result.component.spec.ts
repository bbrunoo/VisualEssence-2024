import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurasColoridasResultComponent } from './figuras-coloridas-result.component';

describe('FigurasColoridasResultComponent', () => {
  let component: FigurasColoridasResultComponent;
  let fixture: ComponentFixture<FigurasColoridasResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FigurasColoridasResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FigurasColoridasResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
