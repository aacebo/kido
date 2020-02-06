import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniDialogHeaderComponent } from './dialog-header.component';

describe('UniDialogHeaderComponent', () => {
  let component: UniDialogHeaderComponent;
  let fixture: ComponentFixture<UniDialogHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniDialogHeaderComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniDialogHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
