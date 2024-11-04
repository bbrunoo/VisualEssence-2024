import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcoesDaltonismoComponent } from './opcoes-daltonismo.component';

describe('OpcoesDaltonismoComponent', () => {
  let component: OpcoesDaltonismoComponent;
  let fixture: ComponentFixture<OpcoesDaltonismoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcoesDaltonismoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcoesDaltonismoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
