import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniCardComponent } from './card.component';

describe('UniCardComponent', () => {
  let component: UniCardComponent;
  let fixture: ComponentFixture<UniCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniCardComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
