import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaltoNumPaisComponent } from './dalto-num-pais.component';

describe('DaltoNumPaisComponent', () => {
  let component: DaltoNumPaisComponent;
  let fixture: ComponentFixture<DaltoNumPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaltoNumPaisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaltoNumPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
