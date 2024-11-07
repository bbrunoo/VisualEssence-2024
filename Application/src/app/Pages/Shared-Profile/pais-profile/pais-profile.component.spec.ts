import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisProfileComponent } from './pais-profile.component';

describe('PaisProfileComponent', () => {
  let component: PaisProfileComponent;
  let fixture: ComponentFixture<PaisProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaisProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
