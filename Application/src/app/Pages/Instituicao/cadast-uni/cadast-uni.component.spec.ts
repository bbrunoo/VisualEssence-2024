import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastUniComponent } from './cadast-uni.component';

describe('CadastUniComponent', () => {
  let component: CadastUniComponent;
  let fixture: ComponentFixture<CadastUniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastUniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastUniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
