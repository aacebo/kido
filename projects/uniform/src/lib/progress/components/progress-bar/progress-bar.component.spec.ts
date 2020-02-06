import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniProgressBarComponent } from './progress-bar.component';

describe('UniProgressBarComponent', () => {
  let component: UniProgressBarComponent;
  let fixture: ComponentFixture<UniProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniProgressBarComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
