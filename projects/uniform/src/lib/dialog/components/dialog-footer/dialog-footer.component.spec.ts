import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniDialogFooterComponent } from './dialog-footer.component';

describe('UniDialogFooterComponent', () => {
  let component: UniDialogFooterComponent;
  let fixture: ComponentFixture<UniDialogFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniDialogFooterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniDialogFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
