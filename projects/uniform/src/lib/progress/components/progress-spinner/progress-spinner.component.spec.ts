import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniProgressSpinnerComponent } from './progress-spinner.component';

describe('UniProgressSpinnerComponent', () => {
  let component: UniProgressSpinnerComponent;
  let fixture: ComponentFixture<UniProgressSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniProgressSpinnerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
