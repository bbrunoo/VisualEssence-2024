import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstProfileComponent } from './inst-profile.component';

describe('InstProfileComponent', () => {
  let component: InstProfileComponent;
  let fixture: ComponentFixture<InstProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
