import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressValidationResultsComponent } from './address-validation-results.component';

describe('AddressValidationResultsComponent', () => {
  let component: AddressValidationResultsComponent;
  let fixture: ComponentFixture<AddressValidationResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressValidationResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressValidationResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
