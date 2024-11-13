import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiopiaLetrasCadastroPaisComponent } from './miopia-letras-cadastro-pais.component';

describe('MiopiaLetrasCadastroPaisComponent', () => {
  let component: MiopiaLetrasCadastroPaisComponent;
  let fixture: ComponentFixture<MiopiaLetrasCadastroPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiopiaLetrasCadastroPaisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiopiaLetrasCadastroPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
