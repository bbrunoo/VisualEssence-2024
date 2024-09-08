import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcCriarSalaComponent } from './opc-criar-sala.component';

describe('OpcCriarSalaComponent', () => {
  let component: OpcCriarSalaComponent;
  let fixture: ComponentFixture<OpcCriarSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcCriarSalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcCriarSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
