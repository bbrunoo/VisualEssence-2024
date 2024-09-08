import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoeInfoComponent } from './doe-info.component';

describe('DoeInfoComponent', () => {
  let component: DoeInfoComponent;
  let fixture: ComponentFixture<DoeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoeInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
