import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniTabLabelComponent } from './tab-label.component';

describe('UniTabLabelComponent', () => {
  let component: UniTabLabelComponent;
  let fixture: ComponentFixture<UniTabLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniTabLabelComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniTabLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
