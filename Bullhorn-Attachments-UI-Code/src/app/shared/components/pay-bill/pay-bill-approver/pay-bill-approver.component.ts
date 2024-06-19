import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../models/user-role-attributes/role.model';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-pay-bill-approver',
    templateUrl: './pay-bill-approver.component.html',
    styleUrl: './pay-bill-approver.component.scss'
})
export class PayBillApproverComponent implements OnInit {
    readonly errorMessages = ErrorMessages;
    paybillFormGroup!: FormGroup;

    timesheetApproverClientFormControl!: FormControl;
    timesheetApproverClientAlternateApproverFormControl!: FormControl;
    //   timesheetApproverInternalFormControl!: FormControl;

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

    constructor(private formBuilder: FormBuilder) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.timesheetApproverClientFormControl = new FormControl('');
        this.timesheetApproverClientAlternateApproverFormControl = new FormControl('');
        // this.timesheetApproverInternalFormControl = new FormControl('');

        this.paybillFormGroup = this.formBuilder.group({
            timesheetApproverClient: this.timesheetApproverClientFormControl,
            timesheetApproverClientAlternateApprover: this.timesheetApproverClientAlternateApproverFormControl
            // timesheetApproverInternal: this.timesheetApproverInternalFormControl
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
        return !this.paybillFormGroup.get(field)?.valid && this.paybillFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.paybillFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.paybillFormGroup.get(field);

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
                const control = this.paybillFormGroup.get(field);
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
            case 'timesheetApproverClient': {
                this.allReviewData.assignment.timesheetApproverClient = this.paybillFormGroup.controls[formControlName].value;
                break;
            }
            case 'timesheetApproverClientAlternateApprover': {
                this.allReviewData.assignment.timesheetApproverClientAlternateApprover = this.paybillFormGroup.controls[formControlName].value;
                break;
            }
            // case 'timesheetApproverInternal': {
            //     this.allReviewData.assignment.timesheetApproverInternal = this.paybillFormGroup.controls[formControlName].value;
            //     break;
            // }
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.paybillFormGroup && reviewData) {
            this.timesheetApproverClientFormControl.setValue(reviewData.assignment && reviewData.assignment.timesheetApproverClient ? reviewData.assignment.timesheetApproverClient : '');
            this.timesheetApproverClientAlternateApproverFormControl.setValue(reviewData.assignment && reviewData.assignment.timesheetApproverClientAlternateApprover ? reviewData.assignment.timesheetApproverClientAlternateApprover : '');
            //   this.timesheetApproverInternalFormControl.setValue(reviewData.assignment && reviewData.assignment.timesheetApproverInternal ? reviewData.assignment.timesheetApproverInternal : '');
        }
    }

    updateFormConfigurationBasedOnRoles() {
        const attributes = this.feature?.attributePermissions;

        if (attributes && attributes.length > 0) {
            let formControlKeys: string[] = [];
            Object.keys(this.paybillFormGroup.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.paybillFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.paybillFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.paybillFormGroup.removeControl(attribute.attributeName);
                    }
                } else {
                    this.paybillFormGroup.removeControl(key);
                }
            });

            this.paybillFormGroup.updateValueAndValidity();
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
