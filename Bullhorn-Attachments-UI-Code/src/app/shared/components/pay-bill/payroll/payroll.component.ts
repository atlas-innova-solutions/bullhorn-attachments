import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { StaticData } from '../../../services/load-static-data.service';
import { PayFrequency, PayCycle, PayWeekEndingDay, OtRuleOverride, CeridianPayGroup, PayCurrency, PayPer } from '../../../models/static-models/business-model/business-dropdown.modes';
import { IPayCycle, IPayWeekEndingDay, IOtRuleOverride, ICeridianPayGroup, IPayCurrency, IPayFrequency, IPayPer, IUsW2ElectronicConsent } from '../../../models/static-models/interface/i-business-dropdown.model';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../models/user-role-attributes/role.model';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-payroll',
    templateUrl: './payroll.component.html',
    styleUrl: './payroll.component.scss'
})
export class PayrollComponent implements OnInit {
    payrollFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    payGroupFormControl!: FormControl;
    payFrequencyFormControl!: FormControl;
    payCycleFormControl!: FormControl;
    payWeekendingDayFormControl!: FormControl;
    standardPayRateFormControl!: FormControl;
    payTypeFormControl!: FormControl;
    payCurrencyFormControl!: FormControl;
    overTimePayRateFormControl!: FormControl;
    doubleTimePayRateFormControl!: FormControl;
    otRuleOverrideFormControl!: FormControl;

    payGroupList: ICeridianPayGroup[] = [];
    payFrequencyList: IPayFrequency[] = [];
    payCycleList: IPayCycle[] = [];
    payWeekendingDayList: IPayWeekEndingDay[] = [];
    payTypeList: IPayPer[] = [];
    payCurrencyList: IPayCurrency[] = [];
    otRuleOverrideList: IOtRuleOverride[] = [];

    allReviewData!: PlacementReviewDataModel;
    @Input()
    public get reviewData(): any {
        return this.allReviewData;
    }
    public set reviewData(data: PlacementReviewDataModel) {
        if (data && Object.keys(data).length) {
            this.allReviewData = data;
            this.bindDate(this.allReviewData);
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
        private mapperService: MapperService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.payGroupFormControl = new FormControl('');
        this.payFrequencyFormControl = new FormControl('', [Validators.required]);
        this.payCycleFormControl = new FormControl('', [Validators.required]);
        this.payWeekendingDayFormControl = new FormControl('', [Validators.required]);
        this.standardPayRateFormControl = new FormControl('', [Validators.required]);
        this.payTypeFormControl = new FormControl('', [Validators.required]);
        this.payCurrencyFormControl = new FormControl('', [Validators.required]);
        this.overTimePayRateFormControl = new FormControl('', [Validators.required]);
        this.doubleTimePayRateFormControl = new FormControl('', [Validators.required]);
        this.otRuleOverrideFormControl = new FormControl('');

        this.payrollFormGroup = this.formBuilder.group({
            payGroup: this.payGroupFormControl,
            payFrequency: this.payFrequencyFormControl,
            payCycle: this.payCycleFormControl,
            payWeekendingDay: this.payWeekendingDayFormControl,
            standardPayRate: this.standardPayRateFormControl,
            payType: this.payTypeFormControl,
            payCurrency: this.payCurrencyFormControl,
            overTimePayRate: this.overTimePayRateFormControl,
            doubleTimePayRate: this.doubleTimePayRateFormControl,
            otRuleOverride: this.otRuleOverrideFormControl
        });
    }

    ngOnInit() {}

    displayFieldCss(field: string) {
        return {
            'has-error': this.isValid(field),
            'has-feedback': this.isValid(field)
        };
    }

    isValid(field: string) {
        return !this.payrollFormGroup.get(field)?.valid && this.payrollFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.payrollFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.payrollFormGroup.get(field);

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
                const control = this.payrollFormGroup.get(field);
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
            case 'payGroup': {
                this.allReviewData.assignment.ceridianPayGroupId = this.payrollFormGroup.controls[formControlName].value;
                let payGroup: any = this.payGroupList.find((pg) => pg.id === this.payrollFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.ceridianPayGroup = payGroup;
                break;
            }
            case 'payFrequency': {
                this.allReviewData.assignment.payFrequencyId = this.payrollFormGroup.controls[formControlName].value;
                let payFrequency: any = this.payFrequencyList.find((pg) => pg.id === this.payrollFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.payFrequency = payFrequency;
                break;
            }
            case 'payCycle': {
                this.allReviewData.assignment.payCycleId = this.payrollFormGroup.controls[formControlName].value;
                let payCycle: any = this.payCycleList.find((pg) => pg.id === this.payrollFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.payCycle = payCycle;
                break;
            }
            case 'payWeekendingDay': {
                this.allReviewData.assignment.payWeekendingDayId = this.payrollFormGroup.controls[formControlName].value;
                let payWeekendingDay: any = this.payWeekendingDayList.find((pg) => pg.id === this.payrollFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.payWeekendingDay = payWeekendingDay;
                break;
            }
            case 'standardPayRate': {
                this.allReviewData.assignment.standardPayRate = this.payrollFormGroup.controls[formControlName].value;
                this.calculateMarkupPercentage();
                break;
            }
            case 'payType': {
                this.allReviewData.assignment.payTypeId = this.payrollFormGroup.controls[formControlName].value;
                const payType: any = this.payTypeList.find((pg) => pg.id === this.payrollFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.payType = payType;
                break;
            }
            case 'overTimePayRate': {
                this.allReviewData.assignment.overTimePayRate = this.payrollFormGroup.controls[formControlName].value;
                break;
            }
            case 'doubleTimePayRate': {
                this.allReviewData.assignment.doubleTimePayRate = this.payrollFormGroup.controls[formControlName].value;
                break;
            }
            case 'otRuleOverride': {
                this.allReviewData.assignment.otRuleOverrideId = this.payrollFormGroup.controls[formControlName].value;
                let otRuleOverride: any = this.otRuleOverrideList.find((pg) => pg.id === this.payrollFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.otRuleOverride = otRuleOverride;
                break;
            }
        }
    }

    calculateMarkupPercentage() {
        const payratestdVal: any = this.allReviewData.assignment.standardPayRate;
        const billratestdVal: any = this.allReviewData.assignment.standardBillRate;
        const markUpPercentVal = ((billratestdVal - payratestdVal) / payratestdVal) * 100;
        if (markUpPercentVal == null || isNaN(markUpPercentVal) || markUpPercentVal.toString() == 'Infinity') {
            this.allReviewData.assignment.markup = '';
        } else {
            this.allReviewData.assignment.markup = markUpPercentVal.toFixed(2);
        }
    }

    bindDate(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.payFrequencyList = this.mapperService.map(PayFrequency, res.payFrequency);
            this.payCycleList = this.mapperService.map(PayCycle, res.payCycle);
            this.payWeekendingDayList = this.mapperService.map(PayWeekEndingDay, res.payWeekendingDay);
            this.otRuleOverrideList = this.mapperService.map(OtRuleOverride, res.otRuleOverride);
            this.payGroupList = this.mapperService.map(CeridianPayGroup, res.ceridianPayGroup);
            this.payCurrencyList = this.mapperService.map(PayCurrency, res.payCurrency);
            this.payTypeList = this.mapperService.map(PayPer, res.payPer);

            this.prepareSectionData(reviewData);
        });
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.payrollFormGroup && reviewData) {
            this.payGroupFormControl.setValue(reviewData.assignment && reviewData.assignment?.ceridianPayGroupId ? reviewData.assignment.ceridianPayGroupId : '');
            this.payFrequencyFormControl.setValue(reviewData.assignment && reviewData.assignment?.payFrequencyId ? reviewData.assignment.payFrequencyId : '');
            this.payCycleFormControl.setValue(reviewData.assignment && reviewData.assignment?.payCycleId ? reviewData.assignment.payCycleId : '');
            this.payWeekendingDayFormControl.setValue(reviewData.assignment && reviewData.assignment?.payWeekendingDayId ? reviewData.assignment.payWeekendingDayId : '');
            this.standardPayRateFormControl.setValue(reviewData.assignment.standardPayRate);
            this.payTypeFormControl.setValue(reviewData.assignment && reviewData.assignment?.payTypeId ? reviewData.assignment.payTypeId : '');
            this.payCurrencyFormControl.setValue(reviewData.assignment && reviewData.assignment?.payCurrency ? reviewData.assignment.payCurrency : '');
            this.overTimePayRateFormControl.setValue(reviewData.assignment.overTimePayRate);
            this.doubleTimePayRateFormControl.setValue(reviewData.assignment.doubleTimePayRate);
            this.otRuleOverrideFormControl.setValue(reviewData.assignment && reviewData.assignment?.otRuleOverrideId ? reviewData.assignment.otRuleOverrideId : '');
        }
    }

    updateFormConfigurationBasedOnRoles() {
        const attributes = this.feature?.attributePermissions;

        if (attributes && attributes.length > 0) {
            let formControlKeys: string[] = [];
            Object.keys(this.payrollFormGroup.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.payrollFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.payrollFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.payrollFormGroup.removeControl(attribute.attributeName);
                    }
                } else {
                    this.payrollFormGroup.removeControl(key);
                }
            });

            this.payrollFormGroup.updateValueAndValidity();
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

    setFieldsToDisable(config: any) {}
}
