import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniToolbarComponent } from './toolbar.component';

describe('UniToolbarComponent', () => {
  let component: UniToolbarComponent;
  let fixture: ComponentFixture<UniToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniToolbarComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
