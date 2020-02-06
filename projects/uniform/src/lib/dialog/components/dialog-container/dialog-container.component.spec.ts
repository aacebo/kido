import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniDialogContainerComponent } from './dialog-container.component';

describe('UniDialogContainerComponent', () => {
  let component: UniDialogContainerComponent;
  let fixture: ComponentFixture<UniDialogContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniDialogContainerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
