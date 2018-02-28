import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainwaveSensorComponent } from './brainwave-sensor.component';

describe('BrainwaveSensorComponent', () => {
  let component: BrainwaveSensorComponent;
  let fixture: ComponentFixture<BrainwaveSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrainwaveSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrainwaveSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
