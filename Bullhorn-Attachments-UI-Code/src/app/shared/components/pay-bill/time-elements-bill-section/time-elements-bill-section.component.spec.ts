import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeElementsBillSectionComponent } from './time-elements-bill-section.component';

describe('TimeElementsBillSectionComponent', () => {
  let component: TimeElementsBillSectionComponent;
  let fixture: ComponentFixture<TimeElementsBillSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeElementsBillSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeElementsBillSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
