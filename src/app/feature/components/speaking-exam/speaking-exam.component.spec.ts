import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakingExamComponent } from './speaking-exam.component';

describe('SpeakingExamComponent', () => {
  let component: SpeakingExamComponent;
  let fixture: ComponentFixture<SpeakingExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeakingExamComponent]
    });
    fixture = TestBed.createComponent(SpeakingExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
