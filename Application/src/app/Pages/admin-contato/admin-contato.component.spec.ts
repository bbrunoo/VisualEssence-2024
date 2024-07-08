import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContatoComponent } from './admin-contato.component';

describe('AdminContatoComponent', () => {
  let component: AdminContatoComponent;
  let fixture: ComponentFixture<AdminContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContatoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
