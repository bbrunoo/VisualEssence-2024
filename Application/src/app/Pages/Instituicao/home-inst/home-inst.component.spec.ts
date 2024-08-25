import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInstComponent } from './home-inst.component';

describe('HomeInstComponent', () => {
  let component: HomeInstComponent;
  let fixture: ComponentFixture<HomeInstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeInstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
