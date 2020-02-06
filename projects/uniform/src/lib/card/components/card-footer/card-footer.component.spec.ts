import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniCardFooterComponent } from './card-footer.component';

describe('UniCardFooterComponent', () => {
  let component: UniCardFooterComponent;
  let fixture: ComponentFixture<UniCardFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniCardFooterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniCardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
