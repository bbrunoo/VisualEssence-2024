import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastMassaComponent } from './cadast-massa.component';

describe('CadastMassaComponent', () => {
  let component: CadastMassaComponent;
  let fixture: ComponentFixture<CadastMassaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastMassaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastMassaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
