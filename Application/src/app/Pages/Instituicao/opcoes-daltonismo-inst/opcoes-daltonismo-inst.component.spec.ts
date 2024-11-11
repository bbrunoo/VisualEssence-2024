import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcoesDaltonismoInstComponent } from './opcoes-daltonismo-inst.component';

describe('OpcoesDaltonismoInstComponent', () => {
  let component: OpcoesDaltonismoInstComponent;
  let fixture: ComponentFixture<OpcoesDaltonismoInstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcoesDaltonismoInstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcoesDaltonismoInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
