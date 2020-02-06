import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniOptionComponent } from './option.component';

describe('UniOptionComponent', () => {
  let component: UniOptionComponent;
  let fixture: ComponentFixture<UniOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniOptionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
