import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindstoreComponent } from './findstore.component';

describe('FindstoreComponent', () => {
  let component: FindstoreComponent;
  let fixture: ComponentFixture<FindstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
