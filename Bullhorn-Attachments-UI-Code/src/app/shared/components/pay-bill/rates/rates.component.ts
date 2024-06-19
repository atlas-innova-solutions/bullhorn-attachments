import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { StaticData } from '../../../services/load-static-data.service';
import { IsPerDiemBillable } from '../../../models/static-models/business-model/business-dropdown.modes';
import { IIsPerDiemBillable } from '../../../models/static-models/interface/i-business-dropdown.model';
import { DateFormatService } from '../../../services/date-format/date-format-service';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../models/user-role-attributes/role.model';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-rates',
    templateUrl: './rates.component.html',
    styleUrl: './rates.component.scss'
})
export class RatesComponent implements OnInit {
    ratesFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    perDiemStartDateFormControl!: FormControl;
    perDiemEndDateFormControl!: FormControl;
    perDiemRateFormControl!: FormControl;
    isPerDiemBillableFormControl!: FormControl;
    discountedOTBillRateFormControl!: FormControl;
    perDiemBillableDailyPayFormControl!: FormControl;
    perDiemDailyBillFormControl!: FormControl;
    perDiemNonBillDailyPayFormControl!: FormControl;

    isPerDiemBillableList: IIsPerDiemBillable[] = [];
    startDateValidationFlag: boolean = false;

    allReviewData!: PlacementReviewDataModel;
    @Input()
    public get reviewData(): any {
        return this.allReviewData;
    }
    public set reviewData(data: PlacementReviewDataModel) {
        if (data && Object.keys(data).length) {
            this.allReviewData = data;
            this.bindData(this.allReviewData);
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
        private dateFormatService: DateFormatService,
        private mapperService: MapperService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.perDiemStartDateFormControl = new FormControl('');
        this.perDiemEndDateFormControl = new FormControl('');
        this.perDiemRateFormControl = new FormControl('');
        this.isPerDiemBillableFormControl = new FormControl(null);
        this.discountedOTBillRateFormControl = new FormControl('');
        this.perDiemBillableDailyPayFormControl = new FormControl('');
        this.perDiemDailyBillFormControl = new FormControl('');
        this.perDiemNonBillDailyPayFormControl = new FormControl('');

        this.ratesFormGroup = this.formBuilder.group(
            {
                perDiemStartDate: this.perDiemStartDateFormControl,
                perDiemEndDate: this.perDiemEndDateFormControl,
                perDiemRate: this.perDiemRateFormControl,
                isPerDiemBillable: this.isPerDiemBillableFormControl,
                discountedOtBillRate: this.discountedOTBillRateFormControl,
                perDiemBillableDailyPay: this.perDiemBillableDailyPayFormControl,
                perDiemDailyBill: this.perDiemDailyBillFormControl,
                perDiemNonBillDailyPay: this.perDiemNonBillDailyPayFormControl
            },
            {
                validator: this.checkDateValidation.bind(this)
            }
        );
    }

    ngOnInit(): void {}

    displayFieldCss(field: string) {
        return {
            'has-error': this.isValid(field),
            'has-feedback': this.isValid(field)
        };
    }

    isValid(field: string) {
        return !this.ratesFormGroup.get(field)?.valid && this.ratesFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.ratesFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.ratesFormGroup.get(field);

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
                const control = this.ratesFormGroup.get(field);
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

        return validator && validator.required && (control?.value || control?.value == '0');
    }

    onFormChange(formControlName: string) {
        switch (formControlName) {
            case 'perDiemStartDate': {
                let perDiemStartDate: any = new Date(this.ratesFormGroup.controls[formControlName].value);
                let perDiemStartDateFormat = perDiemStartDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(perDiemStartDate) : '';
                this.allReviewData.assignment.perDiemStartDate = perDiemStartDateFormat;
                break;
            }
            case 'perDiemEndDate': {
                let perDiemEndDate: any = new Date(this.ratesFormGroup.controls[formControlName].value);
                let perDiemEndDateFormat = perDiemEndDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(perDiemEndDate) : '';
                this.allReviewData.assignment.perDiemEndDate = perDiemEndDateFormat;
                break;
            }
            case 'perDiemRate': {
                this.allReviewData.assignment.perDiemRate = this.ratesFormGroup.controls[formControlName].value;
                break;
            }
            case 'isPerDiemBillable': {
                this.allReviewData.assignment.isPerDiemBillableId = this.ratesFormGroup.controls[formControlName].value;
                let isPerDiemBillable: any = this.isPerDiemBillableList.find((i) => i.id === this.ratesFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.isPerDiemBillable = isPerDiemBillable;
                break;
            }
            case 'discountedOtBillRate': {
                this.allReviewData.assignment.discountedOtBillRate = this.ratesFormGroup.controls[formControlName].value;
                break;
            }
            case 'perDiemBillableDailyPay': {
                this.allReviewData.timeSetup.perDiemBillableDailyPay = this.ratesFormGroup.controls[formControlName].value;
                break;
            }
            case 'perDiemDailyBill': {
                this.allReviewData.timeSetup.perDiemDailyBill = this.ratesFormGroup.controls[formControlName].value;
                break;
            }
            case 'perDiemNonBillDailyPay': {
                this.allReviewData.timeSetup.perDiemNonBillDailyPay = this.ratesFormGroup.controls[formControlName].value;
                break;
            }
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.isPerDiemBillableList = this.mapperService.map(IsPerDiemBillable, res.isPerDiemBillable);

            this.prepareSectionData(reviewData);
        });
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.ratesFormGroup && reviewData) {
            this.perDiemStartDateFormControl.setValue(reviewData.assignment.perDiemStartDate ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.assignment.perDiemStartDate) : '');
            this.perDiemEndDateFormControl.setValue(reviewData.assignment.perDiemEndDate ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.assignment.perDiemEndDate) : '');
            this.perDiemRateFormControl.setValue(reviewData.assignment.perDiemRate ? reviewData.assignment.perDiemRate : '');
            this.isPerDiemBillableFormControl.setValue(reviewData.assignment && reviewData.assignment.isPerDiemBillableId ? reviewData.assignment.isPerDiemBillableId : '');
            this.discountedOTBillRateFormControl.setValue(reviewData.assignment && reviewData.assignment.discountedOtBillRate ? reviewData.assignment.discountedOtBillRate : '');
            this.perDiemBillableDailyPayFormControl.setValue(reviewData.timeSetup.perDiemBillableDailyPay ? reviewData.timeSetup.perDiemBillableDailyPay : '');
            this.perDiemDailyBillFormControl.setValue(reviewData.timeSetup.perDiemDailyBill ? reviewData.timeSetup.perDiemDailyBill : '');
            this.perDiemNonBillDailyPayFormControl.setValue(reviewData.timeSetup.perDiemNonBillDailyPay ? reviewData.timeSetup.perDiemNonBillDailyPay : '');
        }
    }

    setFieldsToDisable(config: any) {}

    checkDateValidation(group: FormGroup) {
        let startDate = new Date(group.value.perDiemStartDate);
        let endDate = new Date(group.value.perDiemEndDate);
        startDate > endDate && endDate ? (this.startDateValidationFlag = true) : (this.startDateValidationFlag = false);
    }

    updateFormConfigurationBasedOnRoles() {
        const attributes = this.feature?.attributePermissions;

        if (attributes && attributes.length > 0) {
            let formControlKeys: string[] = [];
            Object.keys(this.ratesFormGroup.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.ratesFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.ratesFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.ratesFormGroup.removeControl(attribute.attributeName);
                    }
                } else {
                    this.ratesFormGroup.removeControl(key);
                }
            });

            this.ratesFormGroup.updateValueAndValidity();
        }
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
}
