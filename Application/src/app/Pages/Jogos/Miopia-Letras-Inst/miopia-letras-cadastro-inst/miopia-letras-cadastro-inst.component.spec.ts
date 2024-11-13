import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiopiaLetrasCadastroInstComponent } from './miopia-letras-cadastro-inst.component';

describe('MiopiaLetrasCadastroInstComponent', () => {
  let component: MiopiaLetrasCadastroInstComponent;
  let fixture: ComponentFixture<MiopiaLetrasCadastroInstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiopiaLetrasCadastroInstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiopiaLetrasCadastroInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
