import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAuthorizedComponent } from './register-authorized.component';

describe('RegisterAuthorizedComponent', () => {
  let component: RegisterAuthorizedComponent;
  let fixture: ComponentFixture<RegisterAuthorizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterAuthorizedComponent]
    });
    fixture = TestBed.createComponent(RegisterAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
