import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { DateFormatService } from '../../../services/date-format/date-format-service';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { StaticData } from '../../../services/load-static-data.service';
import { ClientBillableOT, BillPer } from '../../../models/static-models/business-model/business-dropdown.modes';
import { IClientBillableOT, IBillPer } from '../../../models/static-models/interface/i-business-dropdown.model';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../models/user-role-attributes/role.model';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrl: './billing.component.scss'
})
export class BillingComponent implements OnInit {
    billingFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    clientBillableOtFormControl!: FormControl;
    billCurrencyFormControl!: FormControl;
    standardBillRateFormControl!: FormControl;
    billPerFormControl!: FormControl;
    overTimeBillRateFormControl!: FormControl;
    doubleTimeBillRateFormControl!: FormControl;
    portalFeePercentageFormControl!: FormControl;
    portalRateFormControl!: FormControl;
    markupFormControl!: FormControl;

    clientBillableOtList: IClientBillableOT[] = [];
    billPerList: IBillPer[] = [];

    allReviewData!: PlacementReviewDataModel;
    @Input()
    public get reviewData(): PlacementReviewDataModel {
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
        private mapperService: MapperService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.clientBillableOtFormControl = new FormControl(null);
        this.billCurrencyFormControl = new FormControl('', [Validators.required]);
        this.standardBillRateFormControl = new FormControl('', [Validators.required]);
        this.billPerFormControl = new FormControl(null, [Validators.required]);
        this.overTimeBillRateFormControl = new FormControl('', [Validators.required]);
        this.doubleTimeBillRateFormControl = new FormControl('', [Validators.required]);
        this.portalFeePercentageFormControl = new FormControl('', [Validators.required]);
        this.portalRateFormControl = new FormControl('');
        this.markupFormControl = new FormControl('', [Validators.required]);

        this.billingFormGroup = this.formBuilder.group({
            clientBillableOt: this.clientBillableOtFormControl,
            billCurrency: this.billCurrencyFormControl,
            standardBillRate: this.standardBillRateFormControl,
            billPer: this.billPerFormControl,
            overTimeBillRate: this.overTimeBillRateFormControl,
            doubleTimeBillRate: this.doubleTimeBillRateFormControl,
            portalFeePercentage: this.portalFeePercentageFormControl,
            portalRate: this.portalRateFormControl,
            markup: this.markupFormControl
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
        return !this.billingFormGroup.get(field)?.valid && this.billingFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.billingFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.billingFormGroup.get(field);

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
                const control = this.billingFormGroup.get(field);
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
            case 'clientBillableOt': {
                this.allReviewData.assignment.clientBillableOtId = this.billingFormGroup.controls[formControlName].value;
                let clientBillableOt: any = this.clientBillableOtList.find((i) => i.id === this.billingFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.clientBillableOt = clientBillableOt;
                break;
            }
            case 'billCurrency': {
                this.allReviewData.assignment.billCurrency = this.billingFormGroup.controls[formControlName].value;
                break;
            }
            case 'standardBillRate': {
                this.allReviewData.assignment.standardBillRate = this.billingFormGroup.controls[formControlName].value;
                this.calculateMarkupPercentage();
                this.calculatePortalRates();
                break;
            }
            case 'billPer': {
                this.allReviewData.assignment.billPerId = this.billingFormGroup.controls[formControlName].value;
                let billPer = this.billPerList.find((i) => i.id === this.billingFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.billPer = billPer;
                break;
            }
            case 'overTimeBillRate': {
                this.allReviewData.assignment.overTimeBillRate = this.billingFormGroup.controls[formControlName].value;
                break;
            }
            case 'doubleTimeBillRate': {
                this.allReviewData.assignment.doubleTimeBillRate = this.billingFormGroup.controls[formControlName].value;
                break;
            }
            case 'portalFeePercentage': {
                this.allReviewData.assignment.portalFeePercentage = this.billingFormGroup.controls[formControlName].value;
                this.calculatePortalRates();
                break;
            }
            case 'portalRate': {
                this.allReviewData.assignment.portalRate = this.billingFormGroup.controls[formControlName].value;
                break;
            }
            case 'markup': {
                this.allReviewData.assignment.markup = this.billingFormGroup.controls[formControlName].value;
                break;
            }
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.clientBillableOtList = this.mapperService.map(ClientBillableOT, res.clientBillableOT);
            this.billPerList = this.mapperService.map(BillPer, res.billPer);

            this.prepareSectionData(reviewData);
            this.calculateMarkupPercentage();
            this.calculatePortalRates();
        });
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.billingFormGroup && reviewData && reviewData.assignment) {
            this.clientBillableOtFormControl.setValue(reviewData.assignment.clientBillableOtId ? reviewData.assignment.clientBillableOtId : '');
            this.billCurrencyFormControl.setValue(reviewData.assignment.billCurrency ? reviewData.assignment.billCurrency : '');
            this.standardBillRateFormControl.setValue(reviewData.assignment.standardBillRate ? reviewData.assignment.standardBillRate : '');
            this.billPerFormControl.setValue(reviewData.assignment.billPerId ? reviewData.assignment.billPerId : '');
            this.overTimeBillRateFormControl.setValue(reviewData.assignment.overTimeBillRate ? reviewData.assignment.overTimeBillRate : '');
            this.doubleTimeBillRateFormControl.setValue(reviewData.assignment.doubleTimeBillRate ? reviewData.assignment.doubleTimeBillRate : '');
            this.portalFeePercentageFormControl.setValue(reviewData.assignment.portalFeePercentage ? reviewData.assignment.portalFeePercentage : '');
            this.portalRateFormControl.setValue(reviewData.assignment.portalRate ? reviewData.assignment.portalRate : '');
            this.markupFormControl.setValue(reviewData.assignment.markup ? reviewData.assignment.markup : '');
        }
    }

    calculateMarkupPercentage() {
        const payratestdVal: any = this.allReviewData.assignment.standardPayRate;
        const billratestdVal = this.standardBillRateFormControl.value;
        const markUpPercentVal = ((billratestdVal - payratestdVal) / payratestdVal) * 100;
        if (markUpPercentVal == null || isNaN(markUpPercentVal) || markUpPercentVal.toString() == 'Infinity') {
            this.markupFormControl.setValue('');
            this.allReviewData.assignment.markup = '';
        } else {
            this.markupFormControl.setValue(markUpPercentVal.toFixed(2));
            this.allReviewData.assignment.markup = markUpPercentVal.toFixed(2);
        }
    }

    calculatePortalRates() {
        const billRateStdVal = this.standardBillRateFormControl.value;
        const portalFeeVal = this.portalFeePercentageFormControl.value / 100;

        let portalRateVal = billRateStdVal - portalFeeVal * billRateStdVal;

        this.portalRateFormControl.setValue(portalRateVal.toFixed(2));
        this.allReviewData.assignment.portalRate = portalRateVal.toFixed(2);
    }

    updateFormConfigurationBasedOnRoles() {
        const attributes = this.feature?.attributePermissions;

        if (attributes && attributes.length > 0) {
            let formControlKeys: string[] = [];
            Object.keys(this.billingFormGroup.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.billingFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }
                        if (!attribute.isEditable) {
                            this.billingFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.billingFormGroup.removeControl(attribute.attributeName);
                    }
                } else {
                    this.billingFormGroup.removeControl(key);
                }
            });

            this.billingFormGroup.updateValueAndValidity();
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
