import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccelerometerComponent } from './accelerometer.component';

describe('AccelerometerComponent', () => {
  let component: AccelerometerComponent;
  let fixture: ComponentFixture<AccelerometerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccelerometerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccelerometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
