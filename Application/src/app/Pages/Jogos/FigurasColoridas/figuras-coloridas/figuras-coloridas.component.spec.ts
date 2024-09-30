import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurasColoridasComponent } from './figuras-coloridas.component';

describe('FigurasColoridasComponent', () => {
  let component: FigurasColoridasComponent;
  let fixture: ComponentFixture<FigurasColoridasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FigurasColoridasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FigurasColoridasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
