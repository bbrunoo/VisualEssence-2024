import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadCadastComponent } from './dad-cadast.component';

describe('DadCadastComponent', () => {
  let component: DadCadastComponent;
  let fixture: ComponentFixture<DadCadastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadCadastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadCadastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
