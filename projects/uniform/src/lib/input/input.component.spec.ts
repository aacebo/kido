import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniInputComponent } from './input.component';

describe('UniInputComponent', () => {
  let component: UniInputComponent;
  let fixture: ComponentFixture<UniInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniInputComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
