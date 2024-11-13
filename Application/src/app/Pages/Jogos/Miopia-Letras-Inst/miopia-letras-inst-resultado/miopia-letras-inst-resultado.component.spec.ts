import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiopiaLetrasInstResultadoComponent } from './miopia-letras-inst-resultado.component';

describe('MiopiaLetrasInstResultadoComponent', () => {
  let component: MiopiaLetrasInstResultadoComponent;
  let fixture: ComponentFixture<MiopiaLetrasInstResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiopiaLetrasInstResultadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiopiaLetrasInstResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
