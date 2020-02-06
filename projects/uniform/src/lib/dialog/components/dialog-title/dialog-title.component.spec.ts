import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniDialogTitleComponent } from './dialog-title.component';

describe('UniDialogTitleComponent', () => {
  let component: UniDialogTitleComponent;
  let fixture: ComponentFixture<UniDialogTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniDialogTitleComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniDialogTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
