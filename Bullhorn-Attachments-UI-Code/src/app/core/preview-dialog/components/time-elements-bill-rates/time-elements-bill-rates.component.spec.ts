import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeElementsBillRatesComponent } from './time-elements-bill-rates.component';

describe('TimeElementsBillRatesComponent', () => {
  let component: TimeElementsBillRatesComponent;
  let fixture: ComponentFixture<TimeElementsBillRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeElementsBillRatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeElementsBillRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
