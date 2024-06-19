import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayBillApproverComponent } from './pay-bill-approver.component';

describe('PayBillApproverComponent', () => {
  let component: PayBillApproverComponent;
  let fixture: ComponentFixture<PayBillApproverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayBillApproverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayBillApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
