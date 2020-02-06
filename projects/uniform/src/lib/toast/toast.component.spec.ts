import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniToastComponent } from './toast.component';

describe('UniToastComponent', () => {
  let component: UniToastComponent;
  let fixture: ComponentFixture<UniToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniToastComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
