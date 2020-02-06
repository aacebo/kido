import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniCardTitleComponent } from './card-title.component';

describe('UniCardTitleComponent', () => {
  let component: UniCardTitleComponent;
  let fixture: ComponentFixture<UniCardTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniCardTitleComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniCardTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
