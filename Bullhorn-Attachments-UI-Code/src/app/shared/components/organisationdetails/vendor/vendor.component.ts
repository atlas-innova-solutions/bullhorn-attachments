import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss'
})
export class VendorComponent implements OnInit {
  vendorFormGroup!: FormGroup;
  readonly errorMessages = ErrorMessages;

  aveSTPayRateFormControl!: FormControl;
  aveOTPayRateFormControl!: FormControl;
  aveDTPayRateFormControl!: FormControl;

  allReviewData!: PlacementReviewDataModel;
  @Input()
  public get reviewData(): any {
      return this.allReviewData;
  }
  public set reviewData(data: PlacementReviewDataModel) {
      if (data && Object.keys(data).length) {
          this.allReviewData = data;
          this.prepareSectionData(this.allReviewData);
      }
  }

  constructor(private formBuilder: FormBuilder) {
      this.initializeForm();
  }

  initializeForm(): void {
      this.aveSTPayRateFormControl = new FormControl('');
      this.aveOTPayRateFormControl = new FormControl('');
      this.aveDTPayRateFormControl = new FormControl('');

      this.vendorFormGroup = this.formBuilder.group({
        aveSTPayRate: this.aveSTPayRateFormControl,
        aveOTPayRate: this.aveOTPayRateFormControl,
        aveDTPayRate: this.aveDTPayRateFormControl
      });
  }

  ngOnInit(): void {}

  displayFieldCss(field: string) {
      return {
          'has-error': this.isValid(field),
          'has-feedback': this.isValid(field)
      };
  }

  isValid(field: string) {
      return !this.vendorFormGroup.get(field)?.valid && this.vendorFormGroup.get(field)?.touched;
  }

  validateAllFormFields() {
      var fieldsControls = this.vendorFormGroup.controls;
      let isValid: boolean = true;
      for (let field in fieldsControls) {
          this.displayFieldCss(field);
          const control = this.vendorFormGroup.get(field);

          if (control?.disabled == false) {
              control?.markAsTouched({ onlySelf: true });
              if (!this.isRequiredValidationPassed(control)) {
                isValid = false;
            }
          } else if (control?.disabled == true && !this.isRequiredValidationPassed(control)) {
              control?.markAsTouched({ onlySelf: true });
              isValid = false;
          } else {
              isValid = true;
          }

          if (!isValid) {
              break;
          }
      }

      if (!isValid) {
          for (let field in fieldsControls) {
              this.displayFieldCss(field);
              const control = this.vendorFormGroup.get(field);
              if (control?.disabled == false) {
                  control?.markAsTouched({ onlySelf: true });
              } else if (control?.disabled == true && !this.isRequiredValidationPassed(control)) {
                  control?.markAsTouched({ onlySelf: true });
              }
          }
      }

      return isValid;
  }

  isRequiredValidationPassed(control: any) {
    const validator = (control && control?.validator) ? control.validator({} as AbstractControl) : null;
        if (!validator) {
        return true;
    }
   
    return validator && validator.required && control?.value;
}

  onFormChange(formControlName: string) {
    switch (formControlName) {
        case 'aveSTPayRate': {
            this.allReviewData.assignment.aveStPayRate = this.vendorFormGroup.controls[formControlName].value;
            break;
        }
        case 'aveOTPayRate': {
            this.allReviewData.assignment.aveOtPayRate = this.vendorFormGroup.controls[formControlName].value;
            break;
        }
        case 'aveDTPayRate': {
            this.allReviewData.assignment.aveDtPayRate = this.vendorFormGroup.controls[formControlName].value;
            break;
        }
    }
}

  prepareSectionData(reviewData: PlacementReviewDataModel) {
      if (this.vendorFormGroup && reviewData && reviewData.assignment) {
          this.aveSTPayRateFormControl.setValue(reviewData.assignment.aveStPayRate ? reviewData.assignment.aveStPayRate : '');
          this.aveOTPayRateFormControl.setValue(reviewData.assignment.aveOtPayRate ? reviewData.assignment.aveOtPayRate : '');
          this.aveDTPayRateFormControl.setValue(reviewData.assignment.aveDtPayRate ? reviewData.assignment.aveDtPayRate : '');
      }
  }

  setFieldsToDisable(config: any) {}
}
