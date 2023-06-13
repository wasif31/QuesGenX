import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiseningExamComponent } from './lisening-exam.component';

describe('LiseningExamComponent', () => {
  let component: LiseningExamComponent;
  let fixture: ComponentFixture<LiseningExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiseningExamComponent]
    });
    fixture = TestBed.createComponent(LiseningExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
