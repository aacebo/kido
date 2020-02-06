import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniTabGroupComponent } from './tab-group.component';

describe('UniTabGroupComponent', () => {
  let component: UniTabGroupComponent;
  let fixture: ComponentFixture<UniTabGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniTabGroupComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
