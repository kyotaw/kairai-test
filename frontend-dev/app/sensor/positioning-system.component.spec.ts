import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositioningSystemComponent } from './positioning-system.component';

describe('PositioningSystemComponent', () => {
  let component: PositioningSystemComponent;
  let fixture: ComponentFixture<PositioningSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositioningSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositioningSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
