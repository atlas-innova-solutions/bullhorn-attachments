import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { IExemptionStatus } from '../../../models/static-models/interface/i-business-dropdown.model';
import { StaticData } from './../../../services/load-static-data.service';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { ExemptionStatus } from '../../../models/static-models/business-model/business-dropdown.modes';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../models/user-role-attributes/role.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-employment',
    templateUrl: './employment.component.html',
    styleUrl: './employment.component.scss'
})
export class EmploymentComponent implements OnInit {
    employmentFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    exemptionStatusFormControl!: FormControl;

    exemptionStatusList: IExemptionStatus[] = [];

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
        private mapperService: MapperService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.exemptionStatusFormControl = new FormControl({ value: null, disabled: true }, [Validators.required]);

        this.employmentFormGroup = this.formBuilder.group({
            exemptionStatus: this.exemptionStatusFormControl
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
        return !this.employmentFormGroup.get(field)?.valid && this.employmentFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.employmentFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.employmentFormGroup.get(field);

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
                const control = this.employmentFormGroup.get(field);
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
            case 'exemptionStatus': {
                this.allReviewData.assignment.emplExemptionStatusId = this.employmentFormGroup.controls[formControlName].value;
                let emplExemptionStatus: any = this.exemptionStatusList.find((es) => es.id === this.employmentFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.emplExemptionStatus = emplExemptionStatus;

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
            Object.keys(this.employmentFormGroup.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.employmentFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.employmentFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.employmentFormGroup.removeControl(attribute.attributeName);
                    }
                } else {
                    this.employmentFormGroup.removeControl(key);
                }
            });

            this.employmentFormGroup.updateValueAndValidity();
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.exemptionStatusList = this.mapperService.map(ExemptionStatus, res.exemptionStatus);

            this.prepareSectionData(reviewData);
        });
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.employmentFormGroup && reviewData) {
            this.exemptionStatusFormControl.setValue(reviewData.assignment && reviewData.assignment.emplExemptionStatusId ? reviewData.assignment.emplExemptionStatusId : '');
        }
    }

    setFieldsToDisable(config: any) {
        this.exemptionStatusFormControl.disable();
    }
}
