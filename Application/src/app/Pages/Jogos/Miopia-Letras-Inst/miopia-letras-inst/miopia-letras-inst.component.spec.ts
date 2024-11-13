import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiopiaLetrasInstComponent } from './miopia-letras-inst.component';

describe('MiopiaLetrasInstComponent', () => {
  let component: MiopiaLetrasInstComponent;
  let fixture: ComponentFixture<MiopiaLetrasInstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiopiaLetrasInstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiopiaLetrasInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
