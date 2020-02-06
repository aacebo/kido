import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniSidenavContentComponent } from './sidenav-content.component';

describe('UniSidenavContentComponent', () => {
  let component: UniSidenavContentComponent;
  let fixture: ComponentFixture<UniSidenavContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniSidenavContentComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniSidenavContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
