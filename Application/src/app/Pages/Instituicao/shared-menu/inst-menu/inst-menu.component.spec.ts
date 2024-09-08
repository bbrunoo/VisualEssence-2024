import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstMenuComponent } from './inst-menu.component';

describe('InstMenuComponent', () => {
  let component: InstMenuComponent;
  let fixture: ComponentFixture<InstMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
