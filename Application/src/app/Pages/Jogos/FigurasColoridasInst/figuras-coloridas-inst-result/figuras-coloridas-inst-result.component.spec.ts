import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurasColoridasInstResultComponent } from './figuras-coloridas-inst-result.component';

describe('FigurasColoridasInstResultComponent', () => {
  let component: FigurasColoridasInstResultComponent;
  let fixture: ComponentFixture<FigurasColoridasInstResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FigurasColoridasInstResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FigurasColoridasInstResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
