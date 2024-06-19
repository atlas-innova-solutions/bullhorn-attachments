import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { DateFormatService } from '../../../services/date-format/date-format-service';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../models/user-role-attributes/role.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-purchase-order',
    templateUrl: './purchase-order.component.html',
    styleUrl: './purchase-order.component.scss'
})
export class PurchaseOrderComponent implements OnInit {
    PurchaseOrderForm!: FormGroup;
    readonly errorMessages = ErrorMessages;

    poNumberFormControl!: FormControl;
    poEffectiveFormControl!: FormControl;
    poEndFormControl!: FormControl;
    poDescriptionFormControl!: FormControl;
    startDateValidationFlag: boolean = false;

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
        this.poNumberFormControl = new FormControl('');
        this.poEffectiveFormControl = new FormControl('');
        this.poEndFormControl = new FormControl('');
        this.poDescriptionFormControl = new FormControl('');

        // this.PurchaseOrderForm = this.formBuilder.group({
        //     poNumber: this.poNumberFormControl,
        //     poDescription: this.poDescriptionFormControl,
        //     poEffective: this.poEffectiveFormControl,
        //     poEnd: this.poEndFormControl
        // }, {
        //     validator: this.checkDateValidation.bind(this)
        //   });
        this.PurchaseOrderForm = this.formBuilder.group({
            poNumber: this.poNumberFormControl
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
        return !this.PurchaseOrderForm.get(field)?.valid && this.PurchaseOrderForm.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.PurchaseOrderForm.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.PurchaseOrderForm.get(field);

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
                const control = this.PurchaseOrderForm.get(field);
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
            case 'poNumber': {
                this.allReviewData.assignment.poNumber = this.PurchaseOrderForm.controls[formControlName].value;
                break;
            }
            case 'poEffective': {
                let poEffective: any = new Date(this.PurchaseOrderForm.controls[formControlName].value);
                let poEffectiveFormat = poEffective ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(poEffective) : '';
                this.allReviewData.assignment.poEffective = poEffectiveFormat;
                break;
            }
            case 'poEnd': {
                let poEnd: any = new Date(this.PurchaseOrderForm.controls[formControlName].value);
                let poEndFormat = poEnd ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(poEnd) : '';
                this.allReviewData.assignment.poEnd = poEndFormat;
                break;
            }
            case 'poDescription': {
                this.allReviewData.assignment.poDescription = this.PurchaseOrderForm.controls[formControlName].value;
                break;
            }
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
    updateFormConfigurationBasedOnRoles() {
        const attributes = this.feature?.attributePermissions;

        if (attributes && attributes.length > 0) {
            let formControlKeys: string[] = [];
            Object.keys(this.PurchaseOrderForm.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.PurchaseOrderForm.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.PurchaseOrderForm.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.PurchaseOrderForm.removeControl(attribute.attributeName);
                    }
                }
            });

            this.PurchaseOrderForm.updateValueAndValidity();
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.PurchaseOrderForm && reviewData) {
            this.poNumberFormControl.setValue(reviewData.assignment && reviewData.assignment.poNumber ? reviewData.assignment.poNumber : '');
            this.poEffectiveFormControl.setValue(reviewData.assignment && reviewData.assignment.poEffective ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.assignment.poEffective) : '');
            this.poEndFormControl.setValue(reviewData.assignment && reviewData.assignment.poEnd ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.assignment.poEnd) : '');
            this.poDescriptionFormControl.setValue(reviewData.assignment && reviewData.assignment.poDescription ? reviewData.assignment.poDescription : '');
        }
    }

    setFieldsToDisable(config: any) {}

    checkDateValidation(group: FormGroup) {
        let startDate = new Date(group.value.poEffective);
        let endDate = new Date(group.value.poEnd);
        startDate > endDate && endDate ? (this.startDateValidationFlag = true) : (this.startDateValidationFlag = false);
    }
}
