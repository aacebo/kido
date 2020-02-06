import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniSidenavContainerComponent } from './sidenav-container.component';

describe('UniSidenavContainerComponent', () => {
  let component: UniSidenavContainerComponent;
  let fixture: ComponentFixture<UniSidenavContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniSidenavContainerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniSidenavContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
