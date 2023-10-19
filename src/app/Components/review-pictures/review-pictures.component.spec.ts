import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPicturesComponent } from './review-pictures.component';

describe('ReviewPicturesComponent', () => {
  let component: ReviewPicturesComponent;
  let fixture: ComponentFixture<ReviewPicturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewPicturesComponent]
    });
    fixture = TestBed.createComponent(ReviewPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
