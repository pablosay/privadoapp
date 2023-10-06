import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrudersComponent } from './intruders.component';

describe('IntrudersComponent', () => {
  let component: IntrudersComponent;
  let fixture: ComponentFixture<IntrudersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntrudersComponent]
    });
    fixture = TestBed.createComponent(IntrudersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
