import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAllocationComponent } from './credit-allocation.component';

describe('CreditAllocationComponent', () => {
  let component: CreditAllocationComponent;
  let fixture: ComponentFixture<CreditAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditAllocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
