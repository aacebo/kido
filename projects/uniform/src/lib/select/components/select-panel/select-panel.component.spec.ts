import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniSelectPanelComponent } from './select-panel.component';

describe('UniSelectPanelComponent', () => {
  let component: UniSelectPanelComponent;
  let fixture: ComponentFixture<UniSelectPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniSelectPanelComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniSelectPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
