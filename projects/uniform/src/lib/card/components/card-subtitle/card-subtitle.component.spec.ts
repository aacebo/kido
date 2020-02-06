import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniCardSubtitleComponent } from './card-subtitle.component';

describe('UniCardSubtitleComponent', () => {
  let component: UniCardSubtitleComponent;
  let fixture: ComponentFixture<UniCardSubtitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniCardSubtitleComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniCardSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
