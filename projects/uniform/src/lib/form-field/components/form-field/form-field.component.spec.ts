import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniFormFieldComponent } from './form-field.component';

describe('UniFormFieldComponent', () => {
  let component: UniFormFieldComponent;
  let fixture: ComponentFixture<UniFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniFormFieldComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
