import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPieceworkComponent } from './customer-piecework.component';

describe('CustomerPieceworkComponent', () => {
  let component: CustomerPieceworkComponent;
  let fixture: ComponentFixture<CustomerPieceworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerPieceworkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerPieceworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
