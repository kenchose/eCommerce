import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeChoiceComponent } from './employee-choice.component';

describe('EmployeeChoiceComponent', () => {
  let component: EmployeeChoiceComponent;
  let fixture: ComponentFixture<EmployeeChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
