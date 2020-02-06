import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniSidenavComponent } from './sidenav.component';

describe('UniSidenavComponent', () => {
  let component: UniSidenavComponent;
  let fixture: ComponentFixture<UniSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniSidenavComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
