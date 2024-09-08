import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcCadastComponent } from './opc-cadast.component';

describe('OpcCadastComponent', () => {
  let component: OpcCadastComponent;
  let fixture: ComponentFixture<OpcCadastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcCadastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcCadastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
