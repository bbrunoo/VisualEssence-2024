import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcoesMiopiaComponent } from './opcoes-miopia.component';

describe('OpcoesMiopiaComponent', () => {
  let component: OpcoesMiopiaComponent;
  let fixture: ComponentFixture<OpcoesMiopiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcoesMiopiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcoesMiopiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
