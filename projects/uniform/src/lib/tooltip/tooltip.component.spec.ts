import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniTooltipComponent } from './tooltip.component';

describe('UniTooltipComponent', () => {
  let component: UniTooltipComponent;
  let fixture: ComponentFixture<UniTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniTooltipComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
