import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiopiaLetrasPaisComponent } from './miopia-letras-pais.component';

describe('MiopiaLetrasPaisComponent', () => {
  let component: MiopiaLetrasPaisComponent;
  let fixture: ComponentFixture<MiopiaLetrasPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiopiaLetrasPaisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiopiaLetrasPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
