import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniPopoverComponent } from './popover.component';

describe('UniPopoverComponent', () => {
  let component: UniPopoverComponent;
  let fixture: ComponentFixture<UniPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniPopoverComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
