import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniSelectComponent } from './select.component';

describe('UniSelectComponent', () => {
  let component: UniSelectComponent;
  let fixture: ComponentFixture<UniSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniSelectComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
