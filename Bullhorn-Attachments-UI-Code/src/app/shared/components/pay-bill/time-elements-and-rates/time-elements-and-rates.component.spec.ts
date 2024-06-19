import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeElementsAndRatesComponent } from './time-elements-and-rates.component';

describe('TimeElementsAndRatesComponent', () => {
  let component: TimeElementsAndRatesComponent;
  let fixture: ComponentFixture<TimeElementsAndRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeElementsAndRatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeElementsAndRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
