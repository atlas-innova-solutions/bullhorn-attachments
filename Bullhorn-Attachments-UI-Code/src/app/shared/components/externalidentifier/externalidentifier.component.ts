import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../models/review/placement-review-data.model';
import { Role, SetupUserRole } from '../../models/user-role-attributes/role.model';
import { Feature } from '../../models/user-role-attributes/feature.model';
import { AttributePermission } from '../../models/user-role-attributes/attribute-permission.model';
import { LocalStorageVariables } from '../../utils/local-storage-variable';

@Component({
    selector: 'app-externalidentifier',
    templateUrl: './externalidentifier.component.html',
    styleUrl: './externalidentifier.component.scss'
})
export class ExternalidentifierComponent implements OnInit {
    externaldetailsFormGroup!: FormGroup;

    candidateIdFormControl!: FormControl;
    placementIdFormControl!: FormControl;
    placementSourceFormControl!: FormControl;
    placementStatusFromControl!: FormControl;
    onboardingIdFormControl!: FormControl;
    onboardingStatusFormControl!: FormControl;
    onboardingCancellationReasonFormControl!: FormControl;
    matchedEmployeeIDFormControl!: FormControl;
    hireTypeFormControl!: FormControl;

    allReviewData!: PlacementReviewDataModel;

    @Input()
    public get reviewData(): PlacementReviewDataModel {
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

    readonly errorMessages = ErrorMessages;

    constructor(private formBuilder: FormBuilder) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.candidateIdFormControl = new FormControl('');
        this.placementIdFormControl = new FormControl('');
        this.placementSourceFormControl = new FormControl('');
        this.placementStatusFromControl = new FormControl('');
        this.onboardingIdFormControl = new FormControl('');
        this.onboardingStatusFormControl = new FormControl('');
        this.onboardingCancellationReasonFormControl = new FormControl('');
        this.matchedEmployeeIDFormControl = new FormControl('');
        this.hireTypeFormControl = new FormControl('');

        this.externaldetailsFormGroup = this.formBuilder.group({
            candidateId: this.candidateIdFormControl,
            placementId: this.placementIdFormControl,
            placementSource: this.placementSourceFormControl,
            placementStatus: this.placementStatusFromControl,
            onboardingId: this.onboardingIdFormControl,
            onboardingStatus: this.onboardingStatusFormControl,
            onboardingCancellationReason: this.onboardingCancellationReasonFormControl,
            matchedEmployeeId: this.matchedEmployeeIDFormControl,
            hireType: this.hireTypeFormControl
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
        return !this.externaldetailsFormGroup.get(field)?.valid && this.externaldetailsFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.externaldetailsFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.externaldetailsFormGroup.get(field);

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
                const control = this.externaldetailsFormGroup.get(field);
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

    onFormChange() {}

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
            Object.keys(this.externaldetailsFormGroup.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.externaldetailsFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.externaldetailsFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.externaldetailsFormGroup.removeControl(attribute.attributeName);
                    }
                } else {
                    this.externaldetailsFormGroup.removeControl(key);
                }
            });

            this.externaldetailsFormGroup.updateValueAndValidity();
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.externaldetailsFormGroup && reviewData) {
            this.candidateIdFormControl.setValue(reviewData.assignment && reviewData.assignment.candidateId ? reviewData.assignment.candidateId : '');
            this.placementIdFormControl.setValue(reviewData.assignment && reviewData.assignment.placementId ? reviewData.assignment.placementId : '');
            this.placementSourceFormControl.setValue(reviewData.assignment && reviewData.assignment.placementSource ? reviewData.assignment.placementSource : '');
            this.placementStatusFromControl.setValue(reviewData.assignment && reviewData.assignment.placementStatus ? reviewData.assignment.placementStatus : '');
            this.onboardingIdFormControl.setValue(reviewData.assignment && reviewData.assignment.onboardingId ? reviewData.assignment.onboardingId : '');
            this.onboardingStatusFormControl.setValue(reviewData.assignment && reviewData.assignment.onboardingStatus ? reviewData.assignment.onboardingStatus : '');
            this.onboardingCancellationReasonFormControl.setValue(reviewData.assignment && reviewData.assignment.onboardingCancellationReason ? reviewData.assignment.onboardingCancellationReason : '');
            this.matchedEmployeeIDFormControl.setValue(reviewData.assignment && reviewData.assignment.matchedEmployeeId ? reviewData.assignment.matchedEmployeeId : '');
            this.hireTypeFormControl.setValue(reviewData.assignment && reviewData.assignment.hireType ? reviewData.assignment.hireType : '');
        }
    }

    setFieldsToDisable(config: any) {}
}
