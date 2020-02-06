import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniLabelComponent } from './label.component';

describe('UniLabelComponent', () => {
  let component: UniLabelComponent;
  let fixture: ComponentFixture<UniLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniLabelComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
