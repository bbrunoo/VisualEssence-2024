import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGameSectionComponent } from './home-game-section.component';

describe('HomeGameSectionComponent', () => {
  let component: HomeGameSectionComponent;
  let fixture: ComponentFixture<HomeGameSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGameSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeGameSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
