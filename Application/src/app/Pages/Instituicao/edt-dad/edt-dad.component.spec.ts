import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtDadComponent } from './edt-dad.component';

describe('EdtDadComponent', () => {
  let component: EdtDadComponent;
  let fixture: ComponentFixture<EdtDadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdtDadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdtDadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
