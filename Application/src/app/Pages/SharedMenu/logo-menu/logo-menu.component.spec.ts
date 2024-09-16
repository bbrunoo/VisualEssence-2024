import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoMenuComponent } from './logo-menu.component';

describe('LogoMenuComponent', () => {
  let component: LogoMenuComponent;
  let fixture: ComponentFixture<LogoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
