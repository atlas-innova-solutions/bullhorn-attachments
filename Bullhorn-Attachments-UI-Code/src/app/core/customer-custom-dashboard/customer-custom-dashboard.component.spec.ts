import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCustomDashboardComponent } from './customer-custom-dashboard.component';

describe('CustomerCustomDashboardComponent', () => {
  let component: CustomerCustomDashboardComponent;
  let fixture: ComponentFixture<CustomerCustomDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerCustomDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerCustomDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
