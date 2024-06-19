import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentDashboardComponent } from './employment-dashboard.component';

describe('EmploymentDashboardComponent', () => {
  let component: EmploymentDashboardComponent;
  let fixture: ComponentFixture<EmploymentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmploymentDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmploymentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
