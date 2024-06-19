import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentEndDateComponent } from './assignment-end-date.component';

describe('AssignmentEndDateComponent', () => {
  let component: AssignmentEndDateComponent;
  let fixture: ComponentFixture<AssignmentEndDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignmentEndDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignmentEndDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
