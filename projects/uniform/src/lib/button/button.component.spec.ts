import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniButtonComponent } from './button.component';

describe('UniButtonComponent', () => {
  let component: UniButtonComponent;
  let fixture: ComponentFixture<UniButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniButtonComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
