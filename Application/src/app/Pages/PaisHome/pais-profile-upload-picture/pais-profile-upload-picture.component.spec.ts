import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisProfileUploadPictureComponent } from './pais-profile-upload-picture.component';

describe('PaisProfileUploadPictureComponent', () => {
  let component: PaisProfileUploadPictureComponent;
  let fixture: ComponentFixture<PaisProfileUploadPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisProfileUploadPictureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaisProfileUploadPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
