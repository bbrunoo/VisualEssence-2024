import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoMenuInstComponent } from './logo-menu-inst.component';

describe('LogoMenuInstComponent', () => {
  let component: LogoMenuInstComponent;
  let fixture: ComponentFixture<LogoMenuInstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoMenuInstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoMenuInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
