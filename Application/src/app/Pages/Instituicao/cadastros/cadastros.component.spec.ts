import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrosComponent } from './cadastros.component';

describe('CadastrosComponent', () => {
  let component: CadastrosComponent;
  let fixture: ComponentFixture<CadastrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
