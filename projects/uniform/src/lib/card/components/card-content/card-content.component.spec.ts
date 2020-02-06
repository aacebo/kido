import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniCardContentComponent } from './card-content.component';

describe('UniCardContentComponent', () => {
  let component: UniCardContentComponent;
  let fixture: ComponentFixture<UniCardContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniCardContentComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
