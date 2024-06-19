import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { DateFormatService } from '../../../services/date-format/date-format-service';
import { TimeElementsBillSectionComponent } from '../time-elements-bill-section/time-elements-bill-section.component';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../models/user-role-attributes/role.model';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-time-elements-and-rates',
    templateUrl: './time-elements-and-rates.component.html',
    styleUrl: './time-elements-and-rates.component.scss'
})
export class TimeElementsAndRatesComponent implements OnInit {
    timeElementsAndRatesFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;
    selectedValue: string = '';
    billSectionAvailable: boolean = false;
    nightDifferentialStandardPayFormControl!: FormControl;
    nightDifferentialOverTimePayFormControl!: FormControl;
    nightDifferentialDoubleTimePayFormControl!: FormControl;
    nightDifferentialEffectiveDateFormControl!: FormControl;
    nightDifferentialEffectiveEndFormControl!: FormControl;
    mealPremiumStandardPayFormControl!: FormControl;
    mealPremiumOverTimePayFormControl!: FormControl;
    mealPremiumDoubleTimePayFormControl!: FormControl;
    mealPremiumEffectiveDateFormControl!: FormControl;
    mealPremiumEffectiveEndFormControl!: FormControl;
    onCallStandardPayFormControl!: FormControl;
    onCallOverTimePayFormControl!: FormControl;
    onCallDoubleTimePayFormControl!: FormControl;
    onCallEffectiveDateFormControl!: FormControl;
    onCallEffectiveEndFormControl!: FormControl;
    healthWelfareStandardPayFormControl!: FormControl;
    healthWelfareOverTimePayFormControl!: FormControl;
    healthWelfareDoubleTimePayFormControl!: FormControl;
    healthWelfareEffectiveDateFormControl!: FormControl;
    healthWelfareEffectiveEndFormControl!: FormControl;
    vacationBillableStandardPayFormControl!: FormControl;
    vacationBillableOverTimePayFormControl!: FormControl;
    vacationBillableDoubleTimePayFormControl!: FormControl;
    vacationBillableEffectiveDateFormControl!: FormControl;
    vacationBillableEffectiveEndFormControl!: FormControl;
    mileageStandardPayFormControl!: FormControl;
    mileageOverTimePayFormControl!: FormControl;
    mileageDoubleTimePayFormControl!: FormControl;
    mileageEffectiveDateFormControl!: FormControl;
    mileageEffectiveEndFormControl!: FormControl;
    sickStandardPayFormControl!: FormControl;
    sickOverTimePayFormControl!: FormControl;
    sickDoubleTimePayFormControl!: FormControl;
    sickEffectiveDateFormControl!: FormControl;
    sickEffectiveEndFormControl!: FormControl;
    sickNonBillableStandardPayFormControl!: FormControl;
    sickNonBillableOverTimePayFormControl!: FormControl;
    sickNonBillableDoubleTimePayFormControl!: FormControl;
    sickNonBillableEffectiveDateFormControl!: FormControl;
    sickNonBillableEffectiveEndFormControl!: FormControl;
    holidayStandardPayFormControl!: FormControl;
    holidayOverTimePayFormControl!: FormControl;
    holidayDoubleTimePayFormControl!: FormControl;
    holidayEffectiveDateFormControl!: FormControl;
    holidayEffectiveEndFormControl!: FormControl;
    nightDifferentialValidationFlag: boolean = false;
    mealPremiumValidationFlag: boolean = false;
    onCallValidationFlag: boolean = false;
    healthWelfareValidationFlag: boolean = false;
    vacationBillableValidationFlag: boolean = false;
    mileageValidationFlag: boolean = false;
    sickValidationFlag: boolean = false;
    sickNonBillableValidationFlag: boolean = false;
    holidayValidationFlag: boolean = false;
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
    allRoleAttributes!: SetupUserRole;
    role!: Role | undefined;
    feature: Feature | null | undefined;

    @Input()
    public get roleAttributes(): SetupUserRole {
        return this.allRoleAttributes;
    }
    public set roleAttributes(data: SetupUserRole) {
        if (data && data.roles && data.roles.length > 0) {
            this.allRoleAttributes = data;
            const selectedRole = JSON.parse(sessionStorage.getItem(LocalStorageVariables.appUserRole) || '{}');
            if (selectedRole) {
                this.role = data.roles.find((r) => r.roleId == selectedRole.roleId);
                const features = this.role?.features;
                if (features && features.length > 0) {
                    this.feature = features?.find((f) => f.featureName == 'Placement-Review');
                    this.updateFormConfigurationBasedOnRoles();
                }
            }
        }
    }

    constructor(
        private formBuilder: FormBuilder,
        private dateFormatService: DateFormatService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.nightDifferentialStandardPayFormControl = new FormControl('');
        this.nightDifferentialOverTimePayFormControl = new FormControl('');
        this.nightDifferentialDoubleTimePayFormControl = new FormControl('');
        this.nightDifferentialEffectiveDateFormControl = new FormControl('');
        this.nightDifferentialEffectiveEndFormControl = new FormControl('');
        this.mealPremiumStandardPayFormControl = new FormControl('');
        this.mealPremiumOverTimePayFormControl = new FormControl('');
        this.mealPremiumDoubleTimePayFormControl = new FormControl('');
        this.mealPremiumEffectiveDateFormControl = new FormControl('');
        this.mealPremiumEffectiveEndFormControl = new FormControl('');
        this.onCallStandardPayFormControl = new FormControl('');
        this.onCallOverTimePayFormControl = new FormControl('');
        this.onCallDoubleTimePayFormControl = new FormControl('');
        this.onCallEffectiveDateFormControl = new FormControl('');
        this.onCallEffectiveEndFormControl = new FormControl('');
        this.healthWelfareStandardPayFormControl = new FormControl('');
        this.healthWelfareOverTimePayFormControl = new FormControl('');
        this.healthWelfareDoubleTimePayFormControl = new FormControl('');
        this.healthWelfareEffectiveDateFormControl = new FormControl('');
        this.healthWelfareEffectiveEndFormControl = new FormControl('');
        this.vacationBillableStandardPayFormControl = new FormControl('');
        this.vacationBillableOverTimePayFormControl = new FormControl('');
        this.vacationBillableDoubleTimePayFormControl = new FormControl('');
        this.vacationBillableEffectiveDateFormControl = new FormControl('');
        this.vacationBillableEffectiveEndFormControl = new FormControl('');
        this.mileageStandardPayFormControl = new FormControl('');
        this.mileageOverTimePayFormControl = new FormControl('');
        this.mileageDoubleTimePayFormControl = new FormControl('');
        this.mileageEffectiveDateFormControl = new FormControl('');
        this.mileageEffectiveEndFormControl = new FormControl('');
        this.sickStandardPayFormControl = new FormControl('');
        this.sickOverTimePayFormControl = new FormControl('');
        this.sickDoubleTimePayFormControl = new FormControl('');
        this.sickEffectiveDateFormControl = new FormControl('');
        this.sickEffectiveEndFormControl = new FormControl('');
        this.sickNonBillableStandardPayFormControl = new FormControl('');
        this.sickNonBillableOverTimePayFormControl = new FormControl('');
        this.sickNonBillableDoubleTimePayFormControl = new FormControl('');
        this.sickNonBillableEffectiveDateFormControl = new FormControl('');
        this.sickNonBillableEffectiveEndFormControl = new FormControl('');
        this.holidayStandardPayFormControl = new FormControl('');
        this.holidayOverTimePayFormControl = new FormControl('');
        this.holidayDoubleTimePayFormControl = new FormControl('');
        this.holidayEffectiveDateFormControl = new FormControl('');
        this.holidayEffectiveEndFormControl = new FormControl('');
        this.timeElementsAndRatesFormGroup = this.formBuilder.group(
            {
                nightDifferentialStandardPay: this.nightDifferentialStandardPayFormControl,
                nightDifferentialOverTimePay: this.nightDifferentialOverTimePayFormControl,
                nightDifferentialDoubleTimePay: this.nightDifferentialDoubleTimePayFormControl,
                nightDifferentialEffectiveDate: this.nightDifferentialEffectiveDateFormControl,
                nightDifferentialEffectiveEnd: this.nightDifferentialEffectiveEndFormControl,
                mealPremiumStandardPay: this.mealPremiumStandardPayFormControl,
                mealPremiumOverTimePay: this.mealPremiumOverTimePayFormControl,
                mealPremiumDoubleTimePay: this.mealPremiumDoubleTimePayFormControl,
                mealPremiumEffectiveDate: this.mealPremiumEffectiveDateFormControl,
                mealPremiumEffectiveEnd: this.mealPremiumEffectiveEndFormControl,
                onCallStandardPay: this.onCallStandardPayFormControl,
                onCallOverTimePay: this.onCallOverTimePayFormControl,
                onCallDoubleTimePay: this.onCallDoubleTimePayFormControl,
                onCallEffectiveDate: this.onCallEffectiveDateFormControl,
                onCallEffectiveEnd: this.onCallEffectiveEndFormControl,
                healthWelfareStandardPay: this.healthWelfareStandardPayFormControl,
                healthWelfareOverTimePay: this.healthWelfareOverTimePayFormControl,
                healthWelfareDoubleTimePay: this.healthWelfareDoubleTimePayFormControl,
                healthWelfareEffectiveDate: this.healthWelfareEffectiveDateFormControl,
                healthWelfareEffectiveEnd: this.healthWelfareEffectiveEndFormControl,
                vacationBillableStandardPay: this.vacationBillableStandardPayFormControl,
                vacationBillableOverTimePay: this.vacationBillableOverTimePayFormControl,
                vacationBillableDoubleTimePay: this.vacationBillableDoubleTimePayFormControl,
                vacationBillableEffectiveDate: this.vacationBillableEffectiveDateFormControl,
                vacationBillableEffectiveEnd: this.vacationBillableEffectiveEndFormControl,
                mileageStandardPay: this.mileageStandardPayFormControl,
                mileageOverTimePay: this.mileageOverTimePayFormControl,
                mileageDoubleTimePay: this.mileageDoubleTimePayFormControl,
                mileageEffectiveDate: this.mileageEffectiveDateFormControl,
                mileageEffectiveEnd: this.mileageEffectiveEndFormControl,
                sickStandardPay: this.sickStandardPayFormControl,
                sickOverTimePay: this.sickOverTimePayFormControl,
                sickDoubleTimePay: this.sickDoubleTimePayFormControl,
                sickEffectiveDate: this.sickEffectiveDateFormControl,
                sickEffectiveEnd: this.sickEffectiveEndFormControl,
                sickNonBillableStandardPay: this.sickNonBillableStandardPayFormControl,
                sickNonBillableOverTimePay: this.sickNonBillableOverTimePayFormControl,
                sickNonBillableDoubleTimePay: this.sickNonBillableDoubleTimePayFormControl,
                sickNonBillableEffectiveDate: this.sickNonBillableEffectiveDateFormControl,
                sickNonBillableEffectiveEnd: this.sickNonBillableEffectiveEndFormControl,
                holidayStandardPay: this.holidayStandardPayFormControl,
                holidayOverTimePay: this.holidayOverTimePayFormControl,
                holidayDoubleTimePay: this.holidayDoubleTimePayFormControl,
                holidayEffectiveDate: this.holidayEffectiveDateFormControl,
                holidayEffectiveEnd: this.holidayEffectiveEndFormControl
            },
            {
                validator: this.checkDateValidation.bind(this)
            }
        );
    }

    ngOnInit(): void {
        this.selectedValue = 'Pay';
        this.billSectionAvailable = false;
    }

    isFieldDateReq(field: string): any {
        if (this.timeElementsAndRatesFormGroup.get(field)?.value == '' || this.timeElementsAndRatesFormGroup.get(field)?.value == undefined || this.timeElementsAndRatesFormGroup.get(field)?.value == null) {
            return this.timeElementsAndRatesFormGroup.get(field)?.invalid && this.timeElementsAndRatesFormGroup.get(field)?.touched;
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
        return this.timeElementsAndRatesFormGroup.get(field)?.invalid && this.timeElementsAndRatesFormGroup.get(field)?.errors?.['greaterThenCurrentDateVaidator'] && this.timeElementsAndRatesFormGroup.get(field)?.touched;
    }
    displayFieldCss(field: string) {
        return {
            'has-error': this.isValid(field),
            'has-feedback': this.isValid(field)
        };
    }
    selectedSection(name: string) {
        this.selectedValue = name;
        if (this.selectedValue == 'Pay') {
            this.billSectionAvailable = false;
        } else {
            this.billSectionAvailable = true;
        }
    }
    isValid(field: string) {
        return !this.timeElementsAndRatesFormGroup.get(field)?.valid && this.timeElementsAndRatesFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.timeElementsAndRatesFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.timeElementsAndRatesFormGroup.get(field);

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
                const control = this.timeElementsAndRatesFormGroup.get(field);
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
        const validator = control && control?.validator ? control.validator({} as AbstractControl) : null;
        if (!validator) {
            return true;
        }

        return validator && validator.required && control?.value;
    }

    onFormChange(formControlName: string) {
        switch (formControlName) {
            case 'nightDifferentialStandardPay': {
                this.allReviewData.timeElementsRates.payNigtDiffrlStd = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'nightDifferentialOverTimePay': {
                this.allReviewData.timeElementsRates.payNigtDiffrlOt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'nightDifferentialDoubleTimePay': {
                this.allReviewData.timeElementsRates.payNigtDiffrlDt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'nightDifferentialEffectiveDate': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.payNigtDiffrlEffDateFrom = effectiveDateFormat;
                break;
            }
            case 'nightDifferentialEffectiveEnd': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.payNigtDiffrlEffDateEnd = effectiveDateFormat;
                break;
            }
            case 'mealPremiumStandardPay': {
                this.allReviewData.timeElementsRates.payMealPremiumStd = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'mealPremiumOverTimePay': {
                this.allReviewData.timeElementsRates.payMealPremiumOt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'mealPremiumDoubleTimePay': {
                this.allReviewData.timeElementsRates.payMealPremiumDt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'mealPremiumEffectiveDate': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.payMealPremiumEffDateFrom = effectiveDateFormat;
                break;
            }
            case 'mealPremiumEffectiveEnd': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.payMealPremiumEffDateEnd = effectiveDateFormat;
                break;
            }
            case 'onCallStandardPay': {
                this.allReviewData.timeElementsRates.payOnCallPagerStd = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'onCallOverTimePay': {
                this.allReviewData.timeElementsRates.payOnCallPagerOt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'onCallDoubleTimePay': {
                this.allReviewData.timeElementsRates.payOnCallPagerDt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'onCallEffectiveDate': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.payOnCallPagerEffDateFrom = effectiveDateFormat;
                break;
            }
            case 'onCallEffectiveEnd': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.payOnCallPagerEffDateEnd = effectiveDateFormat;
                break;
            }
            case 'healthWelfareStandardPay': {
                this.allReviewData.timeElementsRates.payHealthWelfareStd = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'healthWelfareOverTimePay': {
                this.allReviewData.timeElementsRates.payHealthWelfareOt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'healthWelfareDoubleTimePay': {
                this.allReviewData.timeElementsRates.payHealthWelfareDt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'healthWelfareEffectiveDate': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.payHealthWelfEffDateFrom = effectiveDateFormat;
                break;
            }
            case 'healthWelfareEffectiveEnd': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.payHealthWelfEffDateEnd = effectiveDateFormat;
                break;
            }
            case 'vacationBillableStandardPay': {
                this.allReviewData.timeElementsRates.payVacBillableStd = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'vacationBillableOverTimePay': {
                this.allReviewData.timeElementsRates.payVacBillableOt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'vacationBillableDoubleTimePay': {
                this.allReviewData.timeElementsRates.payVacBillableDt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'vacationBillableEffectiveDate': {
                let effectiveEnd: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveEndFormat = effectiveEnd ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveEnd) : '';
                this.allReviewData.timeElementsRates.payVacBillableEffDateFrom = effectiveEndFormat;
                break;
            }
            case 'vacationBillableEffectiveEnd': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.payVacBillableEffDateEnd = effectiveDateFormat;
                break;
            }
            case 'mileageStandardPay': {
                this.allReviewData.timeElementsRates.payMileageStd = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'mileageOverTimePay': {
                this.allReviewData.timeElementsRates.payMileageOt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'mileageDoubleTimePay': {
                this.allReviewData.timeElementsRates.payMileageDt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'mileageEffectiveDate': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.payMileageEffDateFrom = effectiveDateFormat;
                break;
            }
            case 'mileageEffectiveEnd': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.payMileageEffDateEnd = effectiveDateFormat;
                break;
            }
            case 'sickStandardPay': {
                this.allReviewData.timeElementsRates.paySickStd = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'sickOverTimePay': {
                this.allReviewData.timeElementsRates.paySickOt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'sickDoubleTimePay': {
                this.allReviewData.timeElementsRates.paySickDt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'sickEffectiveDate': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.paySickEffDateFrom = effectiveDateFormat;
                break;
            }
            case 'sickEffectiveEnd': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.paySickEffDateEnd = effectiveDateFormat;
                break;
            }
            case 'sickNonBillableStandardPay': {
                this.allReviewData.timeElementsRates.paySickNonBillStd = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'sickNonBillableOverTimePay': {
                this.allReviewData.timeElementsRates.paySickNonBillOt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'sickNonBillableDoubleTimePay': {
                this.allReviewData.timeElementsRates.paySickNonBillDt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'sickNonBillableEffectiveDate': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.paySickNonBillEffDateFrom = effectiveDateFormat;
                break;
            }
            case 'sickNonBillableEffectiveEnd': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.paySickNonBillEffDateEnd = effectiveDateFormat;
                break;
            }
            case 'holidayStandardPay': {
                this.allReviewData.timeElementsRates.payHolidayStd = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'holidayOverTimePay': {
                this.allReviewData.timeElementsRates.payHolidayOt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'holidayDoubleTimePay': {
                this.allReviewData.timeElementsRates.payHolidayDt = this.timeElementsAndRatesFormGroup.controls[formControlName].value;
                break;
            }
            case 'holidayEffectiveDate': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.payHolidayEffDateFrom = effectiveDateFormat;
                break;
            }
            case 'holidayEffectiveEnd': {
                let effectiveDate: any = new Date(this.timeElementsAndRatesFormGroup.controls[formControlName].value);
                let effectiveDateFormat = effectiveDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(effectiveDate) : '';
                this.allReviewData.timeElementsRates.payHolidayEffDateEnd = effectiveDateFormat;
                break;
            }
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.timeElementsAndRatesFormGroup && reviewData && reviewData.timeElementsRates) {
            this.nightDifferentialStandardPayFormControl.setValue(reviewData.timeElementsRates.payNigtDiffrlStd ? reviewData.timeElementsRates.payNigtDiffrlStd : '');
            this.nightDifferentialOverTimePayFormControl.setValue(reviewData.timeElementsRates.payNigtDiffrlOt ? reviewData.timeElementsRates.payNigtDiffrlOt : '');
            this.nightDifferentialDoubleTimePayFormControl.setValue(reviewData.timeElementsRates.payNigtDiffrlDt ? reviewData.timeElementsRates.payNigtDiffrlDt : '');
            this.nightDifferentialEffectiveDateFormControl.setValue(reviewData.timeElementsRates.payNigtDiffrlEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.payNigtDiffrlEffDateFrom) : '');
            this.nightDifferentialEffectiveEndFormControl.setValue(reviewData.timeElementsRates.payNigtDiffrlEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.payNigtDiffrlEffDateEnd) : '');
            this.mealPremiumStandardPayFormControl.setValue(reviewData.timeElementsRates.payMealPremiumStd ? reviewData.timeElementsRates.payMealPremiumStd : '');
            this.mealPremiumOverTimePayFormControl.setValue(reviewData.timeElementsRates.payMealPremiumOt ? reviewData.timeElementsRates.payMealPremiumOt : '');
            this.mealPremiumDoubleTimePayFormControl.setValue(reviewData.timeElementsRates.payMealPremiumDt ? reviewData.timeElementsRates.payMealPremiumDt : '');
            this.mealPremiumEffectiveDateFormControl.setValue(reviewData.timeElementsRates.payMealPremiumEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.payMealPremiumEffDateFrom) : '');
            this.mealPremiumEffectiveEndFormControl.setValue(reviewData.timeElementsRates.payMealPremiumEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.payMealPremiumEffDateEnd) : '');
            this.onCallStandardPayFormControl.setValue(reviewData.timeElementsRates.payOnCallPagerStd ? reviewData.timeElementsRates.payOnCallPagerStd : '');
            this.onCallOverTimePayFormControl.setValue(reviewData.timeElementsRates.payOnCallPagerOt ? reviewData.timeElementsRates.payOnCallPagerOt : '');
            this.onCallDoubleTimePayFormControl.setValue(reviewData.timeElementsRates.payOnCallPagerDt ? reviewData.timeElementsRates.payOnCallPagerDt : '');
            this.onCallEffectiveDateFormControl.setValue(reviewData.timeElementsRates.payOnCallPagerEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.payOnCallPagerEffDateFrom) : '');
            this.onCallEffectiveEndFormControl.setValue(reviewData.timeElementsRates.payOnCallPagerEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.payOnCallPagerEffDateEnd) : '');
            this.healthWelfareStandardPayFormControl.setValue(reviewData.timeElementsRates.payHealthWelfareStd ? reviewData.timeElementsRates.payHealthWelfareStd : '');
            this.healthWelfareOverTimePayFormControl.setValue(reviewData.timeElementsRates.payHealthWelfareOt ? reviewData.timeElementsRates.payHealthWelfareOt : '');
            this.healthWelfareDoubleTimePayFormControl.setValue(reviewData.timeElementsRates.payHealthWelfareDt ? reviewData.timeElementsRates.payHealthWelfareDt : '');
            this.healthWelfareEffectiveDateFormControl.setValue(reviewData.timeElementsRates.payHealthWelfEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.payHealthWelfEffDateFrom) : '');
            this.healthWelfareEffectiveEndFormControl.setValue(reviewData.timeElementsRates.payHealthWelfEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.payHealthWelfEffDateEnd) : '');
            this.vacationBillableStandardPayFormControl.setValue(reviewData.timeElementsRates.payVacBillableStd ? reviewData.timeElementsRates.payVacBillableStd : '');
            this.vacationBillableOverTimePayFormControl.setValue(reviewData.timeElementsRates.payVacBillableOt ? reviewData.timeElementsRates.payVacBillableOt : '');
            this.vacationBillableDoubleTimePayFormControl.setValue(reviewData.timeElementsRates.payVacBillableDt ? reviewData.timeElementsRates.payVacBillableDt : '');
            this.vacationBillableEffectiveDateFormControl.setValue(reviewData.timeElementsRates.payVacBillableEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.payVacBillableEffDateFrom) : '');
            this.vacationBillableEffectiveEndFormControl.setValue(reviewData.timeElementsRates.payVacBillableEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.payVacBillableEffDateEnd) : '');
            this.mileageStandardPayFormControl.setValue(reviewData.timeElementsRates.payMileageStd ? reviewData.timeElementsRates.payMileageStd : '');
            this.mileageOverTimePayFormControl.setValue(reviewData.timeElementsRates.payMileageOt ? reviewData.timeElementsRates.payMileageOt : '');
            this.mileageDoubleTimePayFormControl.setValue(reviewData.timeElementsRates.payMileageDt ? reviewData.timeElementsRates.payMileageDt : '');
            this.mileageEffectiveDateFormControl.setValue(reviewData.timeElementsRates.payMileageEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.payMileageEffDateFrom) : '');
            this.mileageEffectiveEndFormControl.setValue(reviewData.timeElementsRates.payMileageEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.payMileageEffDateEnd) : '');
            this.sickStandardPayFormControl.setValue(reviewData.timeElementsRates.paySickStd ? reviewData.timeElementsRates.paySickStd : '');
            this.sickOverTimePayFormControl.setValue(reviewData.timeElementsRates.paySickOt ? reviewData.timeElementsRates.paySickOt : '');
            this.sickDoubleTimePayFormControl.setValue(reviewData.timeElementsRates.paySickDt ? reviewData.timeElementsRates.paySickDt : '');
            this.sickEffectiveDateFormControl.setValue(reviewData.timeElementsRates.paySickEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.paySickEffDateFrom) : '');
            this.sickEffectiveEndFormControl.setValue(reviewData.timeElementsRates.paySickEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.paySickEffDateEnd) : '');
            this.sickNonBillableStandardPayFormControl.setValue(reviewData.timeElementsRates.paySickNonBillStd ? reviewData.timeElementsRates.paySickNonBillStd : '');
            this.sickNonBillableOverTimePayFormControl.setValue(reviewData.timeElementsRates.paySickNonBillOt ? reviewData.timeElementsRates.paySickNonBillOt : '');
            this.sickNonBillableDoubleTimePayFormControl.setValue(reviewData.timeElementsRates.paySickNonBillDt ? reviewData.timeElementsRates.paySickNonBillDt : '');
            this.sickNonBillableEffectiveDateFormControl.setValue(reviewData.timeElementsRates.paySickNonBillEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.paySickNonBillEffDateFrom) : '');
            this.sickNonBillableEffectiveEndFormControl.setValue(reviewData.timeElementsRates.paySickNonBillEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.paySickNonBillEffDateEnd) : '');
            this.holidayStandardPayFormControl.setValue(reviewData.timeElementsRates.payHolidayStd ? reviewData.timeElementsRates.payHolidayStd : '');
            this.holidayOverTimePayFormControl.setValue(reviewData.timeElementsRates.payHolidayOt ? reviewData.timeElementsRates.payHolidayOt : '');
            this.holidayDoubleTimePayFormControl.setValue(reviewData.timeElementsRates.payHolidayDt ? reviewData.timeElementsRates.payHolidayDt : '');
            this.holidayEffectiveDateFormControl.setValue(reviewData.timeElementsRates.payHolidayEffDateFrom ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.payHolidayEffDateFrom) : '');
            this.holidayEffectiveEndFormControl.setValue(reviewData.timeElementsRates.payHolidayEffDateEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.timeElementsRates.payHolidayEffDateEnd) : '');
        }
    }

    setFieldsToDisable(config: any) {}

    checkDateValidation(group: FormGroup) {
        let payNigtDiffrlEffDateFrom = new Date(group.value.nightDifferentialEffectiveDate);
        let payNigtDiffrlEffDateEnd = new Date(group.value.nightDifferentialEffectiveEnd);
        let payMealPremiumEffDateFrom = new Date(group.value.mealPremiumEffectiveDate);
        let payMealPremiumEffDateEnd = new Date(group.value.mealPremiumEffectiveEnd);
        let payOnCallPagerEffDateFrom = new Date(group.value.onCallEffectiveDate);
        let payOnCallPagerEffDateEnd = new Date(group.value.onCallEffectiveEnd);
        let payHealthWelfEffDateFrom = new Date(group.value.healthWelfareEffectiveDate);
        let payHealthWelfEffDateEnd = new Date(group.value.healthWelfareEffectiveEnd);
        let payVacBillableEffDateFrom = new Date(group.value.vacationBillableEffectiveDate);
        let payVacBillableEffDateEnd = new Date(group.value.vacationBillableEffectiveEnd);
        let payMileageEffDateFrom = new Date(group.value.mileageEffectiveDate);
        let payMileageEffDateEnd = new Date(group.value.mileageEffectiveEnd);
        let paySickEffDateFrom = new Date(group.value.sickEffectiveDate);
        let paySickEffDateEnd = new Date(group.value.sickEffectiveEnd);
        let paySickNonBillEffDateFrom = new Date(group.value.sickNonBillableEffectiveDate);
        let paySickNonBillEffDateEnd = new Date(group.value.sickNonBillableEffectiveEnd);
        let payHolidayEffDateFrom = new Date(group.value.holidayEffectiveDate);
        let payHolidayEffDateEnd = new Date(group.value.holidayEffectiveEnd);

        payNigtDiffrlEffDateFrom > payNigtDiffrlEffDateEnd && payNigtDiffrlEffDateEnd ? (this.nightDifferentialValidationFlag = true) : (this.nightDifferentialValidationFlag = false);
        payMealPremiumEffDateFrom > payMealPremiumEffDateEnd && payMealPremiumEffDateEnd ? (this.mealPremiumValidationFlag = true) : (this.mealPremiumValidationFlag = false);
        payOnCallPagerEffDateFrom > payOnCallPagerEffDateEnd && payOnCallPagerEffDateEnd ? (this.onCallValidationFlag = true) : (this.onCallValidationFlag = false);
        payHealthWelfEffDateFrom > payHealthWelfEffDateEnd && payHealthWelfEffDateEnd ? (this.healthWelfareValidationFlag = true) : (this.healthWelfareValidationFlag = false);
        payVacBillableEffDateFrom > payVacBillableEffDateEnd && payVacBillableEffDateEnd ? (this.vacationBillableValidationFlag = true) : (this.vacationBillableValidationFlag = false);
        payMileageEffDateFrom > payMileageEffDateEnd && payMileageEffDateEnd ? (this.mileageValidationFlag = true) : (this.mileageValidationFlag = false);
        paySickEffDateFrom > paySickEffDateEnd && paySickEffDateEnd ? (this.sickValidationFlag = true) : (this.sickValidationFlag = false);
        paySickNonBillEffDateFrom > paySickNonBillEffDateEnd && paySickNonBillEffDateEnd ? (this.sickNonBillableValidationFlag = true) : (this.sickNonBillableValidationFlag = false);
        payHolidayEffDateFrom > payHolidayEffDateEnd && payHolidayEffDateEnd ? (this.holidayValidationFlag = true) : (this.holidayValidationFlag = false);
    }
    isFormControlFieldDisplay(attributeName: string): boolean {
        const attributes = this.feature?.attributePermissions;
        let isDisplay: boolean = false;

        if (attributes && attributes.length > 0) {
            const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === attributeName);

            if (attribute) {
                isDisplay = attribute.display;
                return isDisplay;
            }
        }

        return isDisplay;
    }

    isFormControlRequired(attributeName: string): boolean {
        const attributes = this.feature?.attributePermissions;
        let isRequired: boolean = false;

        if (attributes && attributes.length > 0) {
            const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === attributeName);

            if (attribute) {
                isRequired = attribute.isMandatory;
                return isRequired;
            }
        }

        return isRequired;
    }

    updateFormConfigurationBasedOnRoles() {
        const attributes = this.feature?.attributePermissions;

        if (attributes && attributes.length > 0) {
            let formControlKeys: string[] = [];
            Object.keys(this.timeElementsAndRatesFormGroup.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.timeElementsAndRatesFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.timeElementsAndRatesFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.timeElementsAndRatesFormGroup.removeControl(attribute.attributeName);
                    }
                }
            });

            this.timeElementsAndRatesFormGroup.updateValueAndValidity();
        }
    }
}
