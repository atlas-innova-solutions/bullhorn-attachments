import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSchedulesComponent } from './shift-schedules.component';

describe('ShiftSchedulesComponent', () => {
  let component: ShiftSchedulesComponent;
  let fixture: ComponentFixture<ShiftSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftSchedulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShiftSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
