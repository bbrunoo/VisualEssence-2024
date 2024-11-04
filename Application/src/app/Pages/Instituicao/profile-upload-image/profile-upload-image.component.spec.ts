import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUploadImageComponent } from './profile-upload-image.component';

describe('ProfileUploadImageComponent', () => {
  let component: ProfileUploadImageComponent;
  let fixture: ComponentFixture<ProfileUploadImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileUploadImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
