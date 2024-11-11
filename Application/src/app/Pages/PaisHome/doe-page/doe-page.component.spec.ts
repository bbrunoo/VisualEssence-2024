import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoePageComponent } from './doe-page.component';

describe('DoePageComponent', () => {
  let component: DoePageComponent;
  let fixture: ComponentFixture<DoePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
