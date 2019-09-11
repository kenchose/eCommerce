import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployyFavoritesComponent } from './employy-favorites.component';

describe('EmployyFavoritesComponent', () => {
  let component: EmployyFavoritesComponent;
  let fixture: ComponentFixture<EmployyFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployyFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployyFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
