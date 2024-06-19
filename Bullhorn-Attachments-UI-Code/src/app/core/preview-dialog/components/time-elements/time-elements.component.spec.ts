import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeElementsComponent } from './time-elements.component';

describe('TimeElementsComponent', () => {
  let component: TimeElementsComponent;
  let fixture: ComponentFixture<TimeElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeElementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
