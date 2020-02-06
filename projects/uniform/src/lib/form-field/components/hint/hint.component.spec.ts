import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniHintComponent } from './hint.component';

describe('UniHintComponent', () => {
  let component: UniHintComponent;
  let fixture: ComponentFixture<UniHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniHintComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
