import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniTabComponent } from './tab.component';

describe('UniTabComponent', () => {
  let component: UniTabComponent;
  let fixture: ComponentFixture<UniTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniTabComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
