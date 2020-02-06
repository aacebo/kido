import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniErrorComponent } from './error.component';

describe('UniErrorComponent', () => {
  let component: UniErrorComponent;
  let fixture: ComponentFixture<UniErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniErrorComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
