import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { DateFormatService } from '../../../services/date-format/date-format-service';
@Component({
  selector: 'app-time-elements-bill-section',
  templateUrl: './time-elements-bill-section.component.html',
  styleUrl: './time-elements-bill-section.component.scss'
})
export class TimeElementsBillSectionComponent implements OnInit {
  timeElementsBillFormGroup!: FormGroup;
  readonly errorMessages = ErrorMessages;
  selectedValue:string='';
  nightDifferentialStandardBillFormControl!: FormControl;
  nightDifferentialOverTimeBillFormControl!: FormControl;
  nightDifferentialDoubleTimeBillFormControl!: FormControl;
  nightDifferentialEffectiveDateFormControl!: FormControl;
  nightDifferentialEffectiveEndFormControl!: FormControl;
  mealPremiumStandardBillFormControl!: FormControl;
  mealPremiumOverTimeBillFormControl!: FormControl;
  mealPremiumDoubleTimeBillFormControl!: FormControl;
  mealPremiumEffectiveDateFormControl!: FormControl;
  mealPremiumEffectiveEndFormControl!: FormControl;
  onCallStandardBillFormControl!: FormControl;
  onCallOverTimeBillFormControl!: FormControl;
  onCallDoubleTimeBillFormControl!: FormControl;
  onCallEffectiveDateFormControl!: FormControl;
  onCallEffectiveEndFormControl!: FormControl;
  healthWelfareStandardBillFormControl!: FormControl;
  healthWelfareOverTimeBillFormControl!: FormControl;
  healthWelfareDoubleTimeBillFormControl!: FormControl;
  healthWelfareEffectiveDateFormControl!: FormControl;
  healthWelfareEffectiveEndFormControl!: FormControl;
  vacationBillableStandardBillFormControl!: FormControl;
  vacationBillableOverTimeBillFormControl!: FormControl;
  vacationBillableDoubleTimeBillFormControl!: FormControl;
  vacationBillableEffectiveDateFormControl!:FormControl;
  vacationBillableEffectiveEndFormControl!:FormControl;
  mileageStandardBillFormControl!:FormControl;
  mileageOverTimeBillFormControl!:FormControl;
  mileageDoubleTimeBillFormControl!:FormControl;
  mileageEffectiveDateFormControl!:FormControl;
  mileageEffectiveEndFormControl!:FormControl;
  sickStandardBillFormControl!:FormControl;
  sickOverTimeBillFormControl!:FormControl;
  sickDoubleTimeBillFormControl!:FormControl;
  sickEffectiveDateFormControl!:FormControl;
  sickEffectiveEndFormControl!:FormControl;
  holidayStandardBillFormControl!:FormControl;
  holidayOverTimeBillFormControl!:FormControl;
  holidayDoubleTimeBillFormControl!:FormControl;
  holidayEffectiveDateFormControl!:FormControl;
  holidayEffectiveEndFormControl!:FormControl;
  startDateValidationFlag: boolean = false;
  nightDifferentialValidationFlag:boolean=false;
  mealPremiumValidationFlag:boolean=false;
  onCallValidationFlag:boolean=false;
  healthWelfareValidationFlag:boolean=false;
  vactionBillableValidationFlag:boolean=false;
  mileageValidationFlag:boolean=false;
  sickValidationFlag:boolean=false;
  holidayValidationFlag:boolean=false;
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

  constructor(
      private formBuilder: FormBuilder,
      private dateFormatService: DateFormatService
  ) {
      this.initializeForm();
  }

  initializeForm(): void {
      this.nightDifferentialStandardBillFormControl = new FormControl('');
      this.nightDifferentialOverTimeBillFormControl = new FormControl('');
      this.nightDifferentialDoubleTimeBillFormControl = new FormControl('');
      this.nightDifferentialEffectiveDateFormControl = new FormControl('');
      this.nightDifferentialEffectiveEndFormControl = new FormControl('');
      this.mealPremiumStandardBillFormControl = new FormControl('');
      this.mealPremiumOverTimeBillFormControl = new FormControl('');
      this.mealPremiumDoubleTimeBillFormControl = new FormControl('');
      this.mealPremiumEffectiveDateFormControl = new FormControl('');
      this.mealPremiumEffectiveEndFormControl = new FormControl('');
      this.onCallStandardBillFormControl = new FormControl('');
      this.onCallOverTimeBillFormControl = new FormControl('');
      this.onCallDoubleTimeBillFormControl = new FormControl('');
      this.onCallEffectiveDateFormControl = new FormControl('');
      this.onCallEffectiveEndFormControl = new FormControl('');
      this.healthWelfareStandardBillFormControl = new FormControl('');
      this.healthWelfareOverTimeBillFormControl = new FormControl('');
      this.healthWelfareDoubleTimeBillFormControl = new FormControl('');
      this.healthWelfareEffectiveDateFormControl = new FormControl('');
      this.healthWelfareEffectiveEndFormControl = new FormControl('');
      this.vacationBillableStandardBillFormControl = new FormControl('');
      this.vacationBillableOverTimeBillFormControl = new FormControl('');
      this.vacationBillableDoubleTimeBillFormControl = new FormControl('');
      this.vacationBillableEffectiveDateFormControl = new FormControl('');
      this.vacationBillableEffectiveEndFormControl = new FormControl('');
      this.mileageStandardBillFormControl = new FormControl('');
      this.mileageOverTimeBillFormControl = new FormControl('');
      this.mileageDoubleTimeBillFormControl = new FormControl('');
      this.mileageEffectiveDateFormControl = new FormControl('');
      this.mileageEffectiveEndFormControl = new FormControl('');
      this.sickStandardBillFormControl = new FormControl('');
      this.sickOverTimeBillFormControl = new FormControl('');
      this.sickDoubleTimeBillFormControl = new FormControl('');
      this.sickEffectiveDateFormControl = new FormControl('');
      this.sickEffectiveEndFormControl = new FormControl('');
      this.holidayStandardBillFormControl = new FormControl('');
      this.holidayOverTimeBillFormControl = new FormControl('');
      this.holidayDoubleTimeBillFormControl = new FormControl('');
      this.holidayEffectiveDateFormControl = new FormControl('');
      this.holidayEffectiveEndFormControl = new FormControl('');
      this.timeElementsBillFormGroup = this.formBuilder.group({
        nightDifferentialStandardBill: this.nightDifferentialStandardBillFormControl,
          nightDifferentialOverTimeBill: this.nightDifferentialOverTimeBillFormControl,
          nightDifferentialDoubleTimeBill: this.nightDifferentialDoubleTimeBillFormControl,
          nightDifferentialEffectiveDate: this.nightDifferentialEffectiveDateFormControl,
          nightDifferentialEffectiveEnd: this.nightDifferentialEffectiveEndFormControl,
          mealPremiumStandardBill: this.mealPremiumStandardBillFormControl,
          mealPremiumOverTimeBill: this.mealPremiumOverTimeBillFormControl,
          mealPremiumDoubleTimeBill: this.mealPremiumDoubleTimeBillFormControl,
          mealPremiumEffectiveDate: this.mealPremiumEffectiveDateFormControl,
          mealPremiumEffectiveEnd: this.mealPremiumEffectiveEndFormControl,
          onCallStandardBill: this.onCallStandardBillFormControl,
          onCallOverTimeBill: this.onCallOverTimeBillFormControl,
          onCallDoubleTimeBill: this.onCallDoubleTimeBillFormControl,
          onCallEffectiveDate: this.onCallEffectiveDateFormControl,
          onCallEffectiveEnd: this.onCallEffectiveEndFormControl,
          healthWelfareStandardBill: this.healthWelfareStandardBillFormControl,
          healthWelfareOverTimeBill: this.healthWelfareOverTimeBillFormControl,
          healthWelfareDoubleTimeBill: this.healthWelfareDoubleTimeBillFormControl,
          healthWelfareEffectiveDate: this.healthWelfareEffectiveDateFormControl,
          healthWelfareEffectiveEnd: this.healthWelfareEffectiveEndFormControl,
          vacationBillableStandardBill: this.vacationBillableStandardBillFormControl,
          vacationBillableOverTimeBill: this.vacationBillableOverTimeBillFormControl,
          vacationBillableDoubleTimeBill: this.vacationBillableDoubleTimeBillFormControl,
          vacationBillableEffectiveDate: this.vacationBillableEffectiveDateFormControl,
          vacationBillableEffectiveEnd: this.vacationBillableEffectiveEndFormControl,
          mileageStandardBill: this.mileageStandardBillFormControl,
          mileageOverTimeBill: this.mileageOverTimeBillFormControl,
          mileageDoubleTimeBill: this.mileageDoubleTimeBillFormControl,
          mileageEffectiveDate: this.mileageEffectiveDateFormControl,
          mileageEffectiveEnd: this.mileageEffectiveEndFormControl,
          sickStandardBill: this.sickStandardBillFormControl,
          sickOverTimeBill: this.sickOverTimeBillFormControl,
          sickDoubleTimeBill: this.sickDoubleTimeBillFormControl,
          sickEffectiveDate: this.sickEffectiveDateFormControl,
          sickEffectiveEnd: this.sickEffectiveEndFormControl,
          holidayStandardBill: this.holidayStandardBillFormControl,
          holidayOverTimeBill: this.holidayOverTimeBillFormControl,
          holidayDoubleTimeBill: this.holidayDoubleTimeBillFormControl,
          holidayEffectiveDate: this.holidayEffectiveDateFormControl,
          holidayEffectiveEnd: this.holidayEffectiveEndFormControl

      }, {
          validator: this.checkDateValidation.bind(this)
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
      return !this.timeElementsBillFormGroup.get(field)?.valid && this.timeElementsBillFormGroup.get(field)?.touched;
  }

  validateAllFormFields() {
      var fieldsControls = this.timeElementsBillFormGroup.controls;
      let isValid: boolean = true;
      for (let field in fieldsControls) {
          this.displayFieldCss(field);
          const control = this.timeElementsBillFormGroup.get(field);

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
              const control = this.timeElementsBillFormGroup.get(field);
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
isFieldDateReq(field: string): any {
    if (this.timeElementsBillFormGroup.get(field)?.value == '' || this.timeElementsBillFormGroup.get(field)?.value == undefined || this.timeElementsBillFormGroup.get(field)?.value == null) {
        return this.timeElementsBillFormGroup.get(field)?.invalid && this.timeElementsBillFormGroup.get(field)?.touched;
    }
}

displayDateFieldCss(field: string) {
    const isFieldDateRequired: boolean = this.isFieldDateReq(field);

    return {
        'has-error': isFieldDateRequired ? isFieldDateRequired : this.isDateValidationFieldValid(field),
        'has-feedback': isFieldDateRequired ? isFieldDateRequired : this.isDateValidationFieldValid(field)
    };
}
isDateValidationFieldValid(field: string) {
    return this.timeElementsBillFormGroup.get(field)?.invalid && this.timeElementsBillFormGroup.get(field)?.errors?.['greaterThenCurrentDateVaidator'] && this.timeElementsBillFormGroup.get(field)?.touched;
}

  onFormChange(formControlName: string) {
      switch (formControlName) {
          case 'nightDifferentialStandardBill': {
              this.allReviewData.timeElementsRates.blNigtDiffrlStd = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'nightDifferentialOverTimeBill': {
              this.allReviewData.timeElementsRates.blNigtDiffrlOt = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'nightDifferentialDoubleTimeBill': {
              this.allReviewData.timeElementsRates.blNigtDifferentialDt = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'nightDifferentialEffectiveDate': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blNigtDiffrlEffDateFrom = effectiveDateFormat;
              break;
          }
          case 'nightDifferentialEffectiveEnd': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blNigtDiffrlEffDateEnd = effectiveDateFormat;
              break;
          }
          case 'mealPremiumStandardBill': {
              this.allReviewData.timeElementsRates.blMealPrmStd = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'mealPremiumOverTimeBill': {
              this.allReviewData.timeElementsRates.blMealPrmOt = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'mealPremiumDoubleTimeBill': {
              this.allReviewData.timeElementsRates.blMealPrmDt = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'mealPremiumEffectiveDate': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blMealPrmEffDateFrom = effectiveDateFormat;
              break;
          }
          case 'mealPremiumEffectiveEnd': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blMealPrmEffDateEnd =effectiveDateFormat;
              break;
          }
          case 'onCallStandardBill': {
              this.allReviewData.timeElementsRates.blOnCallPagerStd = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'onCallOverTimeBill': {
              this.allReviewData.timeElementsRates.blOnCallPagerOt = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'onCallDoubleTimeBill': {
              this.allReviewData.timeElementsRates.blOnCallPagerDt = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'onCallEffectiveDate': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blOnCallPagerEffDateFrom = effectiveDateFormat;
              break;
          }
          case 'onCallEffectiveEnd': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blOnCallPagerEffDateEnd = effectiveDateFormat;
              break;
          }
          case 'healthWelfareStandardBill': {
              this.allReviewData.timeElementsRates.blHealthWelfareStd = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'healthWelfareOverTimeBill': {
              this.allReviewData.timeElementsRates.blHealthWelfareOt = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'healthWelfareDoubleTimeBill': {
              this.allReviewData.timeElementsRates.blHealthWelfareDt = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'healthWelfareEffectiveDate': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blHealthWelfareEffDateFrom = effectiveDateFormat;
              break;
          }
          case 'healthWelfareEffectiveEnd': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blHealthWelfareEffDateEffDateEnd = effectiveDateFormat;
              break;
          }
          case 'vacationBillableStandardBill': {
              this.allReviewData.timeElementsRates.blVacBlableStd = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'vacationBillableOverTimeBill': {
            this.allReviewData.timeElementsRates.blVacBillableOt = this.timeElementsBillFormGroup.controls[formControlName].value;
            break;
          }
          case 'vacationBillableDoubleTimeBill': {
            this.allReviewData.timeElementsRates.blVacBillableDt = this.timeElementsBillFormGroup.controls[formControlName].value;
            break;
          }
          case 'vacationBillableEffectiveDate': {
              let effectiveEnd: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveEndFormat = effectiveEnd ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveEnd) : '';
              this.allReviewData.timeElementsRates.blVacBillableEffDateFrom = effectiveEndFormat;
              break;
          }
          case 'vacationBillableEffectiveEnd': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blVacBillableEffDateEnd = effectiveDateFormat;
              break;
          }
          case 'mileageStandardBill': {
              this.allReviewData.timeElementsRates.blMileageStd = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'mileageOverTimeBill': {
              this.allReviewData.timeElementsRates.blMileageOt  = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'mileageDoubleTimeBill': {
              this.allReviewData.timeElementsRates.blMileageDt = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'mileageEffectiveDate': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blMileageEffDateFrom = effectiveDateFormat;
              break;
          }
          case 'mileageEffectiveEnd': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blMileageEffDateEnd = effectiveDateFormat;
              break;
          }
          case 'sickStandardBill': {
              this.allReviewData.timeElementsRates.blSickStd = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'sickOverTimeBill': {
              this.allReviewData.timeElementsRates.blSickOt = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'sickDoubleTimeBill': {
              this.allReviewData.timeElementsRates.blSickDt = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'sickEffectiveDate': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blSickEffDateFrom = effectiveDateFormat;
              break;
          }
          case 'sickEffectiveEnd': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blSickEffDateEnd = effectiveDateFormat;
              break;
          }
          case 'holidayStandardBill': {
              this.allReviewData.timeElementsRates.blHolidayStd = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'holidayOverTimeBill': {
              this.allReviewData.timeElementsRates.blHolidayOt = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'holidayDoubleTimeBill': {
              this.allReviewData.timeElementsRates.blHolidayDt = this.timeElementsBillFormGroup.controls[formControlName].value;
              break;
          }
          case 'holidayEffectiveDate': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blHolidayEffDateFrom = effectiveDateFormat;
              break;
          }
          case 'holidayEffectiveEnd': {
              let effectiveDate: any = new Date(this.timeElementsBillFormGroup.controls[formControlName].value);
              let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
              this.allReviewData.timeElementsRates.blHolidayEffDateEnd =effectiveDateFormat;
              break;
          }
      }
  }

  prepareSectionData(reviewData: PlacementReviewDataModel) {
      if (this.timeElementsBillFormGroup && reviewData && reviewData.timeElementsRates) {
          this.nightDifferentialStandardBillFormControl.setValue(reviewData.timeElementsRates.blNigtDiffrlStd ? reviewData.timeElementsRates.blNigtDiffrlStd : '');
          this.nightDifferentialOverTimeBillFormControl.setValue(reviewData.timeElementsRates.blNigtDiffrlOt ? reviewData.timeElementsRates.blNigtDiffrlOt : '');
          this.nightDifferentialDoubleTimeBillFormControl.setValue(reviewData.timeElementsRates.blNigtDifferentialDt ? reviewData.timeElementsRates.blNigtDifferentialDt : '');
          this.nightDifferentialEffectiveDateFormControl.setValue(reviewData.timeElementsRates.blNigtDiffrlEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blNigtDiffrlEffDateFrom) : '');
          this.nightDifferentialEffectiveEndFormControl.setValue(reviewData.timeElementsRates.blNigtDiffrlEffDateEnd ?this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blNigtDiffrlEffDateEnd) : '');
          this.mileageStandardBillFormControl.setValue(reviewData.timeElementsRates.blMileageStd ? reviewData.timeElementsRates.blMileageStd : '');
          this.mileageOverTimeBillFormControl.setValue(reviewData.timeElementsRates.blMileageOt ? reviewData.timeElementsRates.blMileageOt : '');
          this.mileageDoubleTimeBillFormControl.setValue(reviewData.timeElementsRates.blMileageDt ? reviewData.timeElementsRates.blMileageDt : '');
          this.mileageEffectiveDateFormControl.setValue(reviewData.timeElementsRates.blMileageEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blMileageEffDateFrom) : '');
          this.mileageEffectiveEndFormControl.setValue(reviewData.timeElementsRates.blMileageEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blMileageEffDateEnd) : '');
          this.onCallStandardBillFormControl.setValue(reviewData.timeElementsRates.blOnCallPagerStd ? reviewData.timeElementsRates.blOnCallPagerStd : '');
          this.onCallOverTimeBillFormControl.setValue(reviewData.timeElementsRates.blOnCallPagerOt ? reviewData.timeElementsRates.blOnCallPagerOt : '');
          this.onCallDoubleTimeBillFormControl.setValue(reviewData.timeElementsRates.blOnCallPagerDt ? reviewData.timeElementsRates.blOnCallPagerDt : '');
          this.onCallEffectiveDateFormControl.setValue(reviewData.timeElementsRates.blOnCallPagerEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blOnCallPagerEffDateFrom) : '');
          this.onCallEffectiveEndFormControl.setValue(reviewData.timeElementsRates.blOnCallPagerEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blOnCallPagerEffDateEnd) : '');
          this.healthWelfareStandardBillFormControl.setValue(reviewData.timeElementsRates.blHealthWelfareStd ? reviewData.timeElementsRates.blHealthWelfareStd : '');
          this.healthWelfareOverTimeBillFormControl.setValue(reviewData.timeElementsRates.blHealthWelfareOt ? reviewData.timeElementsRates.blHealthWelfareOt : '');
          this.healthWelfareDoubleTimeBillFormControl.setValue(reviewData.timeElementsRates.blHealthWelfareDt ? reviewData.timeElementsRates.blHealthWelfareDt : '');
          this.healthWelfareEffectiveDateFormControl.setValue(reviewData.timeElementsRates.blHealthWelfareEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blHealthWelfareEffDateFrom) : '');
          this.healthWelfareEffectiveEndFormControl.setValue(reviewData.timeElementsRates.blHealthWelfareEffDateEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blHealthWelfareEffDateEffDateEnd) : '');
          this.vacationBillableStandardBillFormControl.setValue(reviewData.timeElementsRates.blVacBlableStd ? reviewData.timeElementsRates.blVacBlableStd : '');
          this.vacationBillableOverTimeBillFormControl.setValue(reviewData.timeElementsRates.blVacBillableOt ? reviewData.timeElementsRates.blVacBillableOt : '');
          this.vacationBillableDoubleTimeBillFormControl.setValue(reviewData.timeElementsRates.blVacBillableDt ? reviewData.timeElementsRates.blVacBillableDt : '');
          this.vacationBillableEffectiveDateFormControl.setValue(reviewData.timeElementsRates.blVacBillableEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blVacBillableEffDateFrom) : '');
          this.vacationBillableEffectiveEndFormControl.setValue(reviewData.timeElementsRates.blVacBillableEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blVacBillableEffDateEnd) : '');
          this.sickStandardBillFormControl.setValue(reviewData.timeElementsRates.blSickStd ? reviewData.timeElementsRates.blSickStd : '');
          this.sickOverTimeBillFormControl.setValue(reviewData.timeElementsRates.blSickOt ? reviewData.timeElementsRates.blSickOt : '');
          this.sickDoubleTimeBillFormControl.setValue(reviewData.timeElementsRates.blSickDt ? reviewData.timeElementsRates.blSickDt : '');
          this.sickEffectiveDateFormControl.setValue(reviewData.timeElementsRates.blSickEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blSickEffDateFrom) : '');
          this.sickEffectiveEndFormControl.setValue(reviewData.timeElementsRates.blSickEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blSickEffDateEnd) : '');
          this.holidayStandardBillFormControl.setValue(reviewData.timeElementsRates.blHolidayStd ? reviewData.timeElementsRates.blHolidayStd : '');
          this.holidayOverTimeBillFormControl.setValue(reviewData.timeElementsRates.blHolidayOt ? reviewData.timeElementsRates.blHolidayOt : '');
          this.holidayDoubleTimeBillFormControl.setValue(reviewData.timeElementsRates.blHolidayDt ? reviewData.timeElementsRates.blHolidayDt : '');
          this.holidayEffectiveDateFormControl.setValue(reviewData.timeElementsRates.blHolidayEffDateFrom ?this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blHolidayEffDateFrom) : '');
          this.holidayEffectiveEndFormControl.setValue(reviewData.timeElementsRates.blHolidayEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blHolidayEffDateEnd) : '');
          this.mealPremiumStandardBillFormControl.setValue(reviewData.timeElementsRates.blMealPrmStd ? reviewData.timeElementsRates.blMealPrmStd : '');
          this.mealPremiumOverTimeBillFormControl.setValue(reviewData.timeElementsRates.blMealPrmOt ? reviewData.timeElementsRates.blMealPrmOt : '');
          this.mealPremiumDoubleTimeBillFormControl.setValue(reviewData.timeElementsRates.blMealPrmDt ? reviewData.timeElementsRates.blMealPrmDt : '');
          this.mealPremiumEffectiveDateFormControl.setValue(reviewData.timeElementsRates.blMealPrmEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blMealPrmEffDateFrom) : '');
          this.mealPremiumEffectiveEndFormControl.setValue(reviewData.timeElementsRates.blMealPrmEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.blMealPrmEffDateEnd) : '');

        }
  }

  setFieldsToDisable(config: any) {}

  checkDateValidation(group: FormGroup) {
      let blNigtDiffrlEffDateFrom = new Date(group.value.nightDifferentialEffectiveDate);
      let blNigtDiffrlEffDateEnd = new Date(group.value.nightDifferentialEffectiveEnd);
      let blMealPrmEffDateFrom = new Date(group.value.mealPremiumEffectiveDate);
      let blMealPrmEffDateEnd = new Date(group.value.mealPremiumEffectiveEnd);
      let blOnCallPagerEffDateFrom=new Date(group.value.onCallEffectiveDate);
      let blOnCallPagerEffDateEnd=new Date(group.value.onCallEffectiveEnd);
      let blHealthWelfareEffDateFrom=new Date(group.value.healthWelfareEffectiveDate);
      let blHealthWelfareEffDateEffDateEnd=new Date(group.value.healthWelfareEffectiveEnd);
      let blVacBillableEffDateFrom=new Date(group.value.vacationBillableEffectiveDate);
      let blVacBillableEffDateEnd=new Date(group.value.vacationBillableEffectiveEnd);
      let blMileageEffDateFrom=new Date(group.value.mileageEffectiveDate);
      let blMileageEffDateEnd=new Date(group.value.mileageEffectiveEnd);
      let blSickEffDateFrom=new Date(group.value.sickEffectiveDate);
      let blSickEffDateEnd=new Date(group.value.sickEffectiveEnd);
      let blHolidayEffDateFrom=new Date(group.value.holidayEffectiveDate);
      let blHolidayEffDateEnd=new Date(group.value.holidayEffectiveEnd);

      blNigtDiffrlEffDateFrom > blNigtDiffrlEffDateEnd && blNigtDiffrlEffDateEnd ? this.nightDifferentialValidationFlag = true : this.nightDifferentialValidationFlag = false;
      blMealPrmEffDateFrom > blMealPrmEffDateEnd && blMealPrmEffDateEnd ? this.mealPremiumValidationFlag = true : this.mealPremiumValidationFlag = false;
      blOnCallPagerEffDateFrom > blOnCallPagerEffDateEnd && blOnCallPagerEffDateEnd ? this.onCallValidationFlag = true : this.onCallValidationFlag = false;
      blHealthWelfareEffDateFrom > blHealthWelfareEffDateEffDateEnd && blHealthWelfareEffDateEffDateEnd ? this.healthWelfareValidationFlag = true : this.healthWelfareValidationFlag = false;
      blVacBillableEffDateFrom > blVacBillableEffDateEnd && blVacBillableEffDateEnd ? this.vactionBillableValidationFlag = true : this.vactionBillableValidationFlag = false;
      blMileageEffDateFrom > blMileageEffDateEnd && blMileageEffDateEnd ? this.mileageValidationFlag = true : this.mileageValidationFlag = false;
      blSickEffDateFrom > blSickEffDateEnd && blSickEffDateEnd ? this.sickValidationFlag = true : this.sickValidationFlag = false;
      blHolidayEffDateFrom > blHolidayEffDateEnd && blHolidayEffDateEnd ? this.holidayValidationFlag = true : this.holidayValidationFlag = false;

  }

}
