import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniDialogContentComponent } from './dialog-content.component';

describe('UniDialogContentComponent', () => {
  let component: UniDialogContentComponent;
  let fixture: ComponentFixture<UniDialogContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniDialogContentComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
