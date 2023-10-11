import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogEntriesComponent } from './log-entries.component';

describe('LogEntriesComponent', () => {
  let component: LogEntriesComponent;
  let fixture: ComponentFixture<LogEntriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogEntriesComponent]
    });
    fixture = TestBed.createComponent(LogEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
