import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractHireComponent } from './contract-hire.component';

describe('ContractHireComponent', () => {
  let component: ContractHireComponent;
  let fixture: ComponentFixture<ContractHireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractHireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
