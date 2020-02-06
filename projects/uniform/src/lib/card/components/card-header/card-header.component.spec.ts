import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniCardHeaderComponent } from './card-header.component';

describe('UniCardHeaderComponent', () => {
  let component: UniCardHeaderComponent;
  let fixture: ComponentFixture<UniCardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniCardHeaderComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
