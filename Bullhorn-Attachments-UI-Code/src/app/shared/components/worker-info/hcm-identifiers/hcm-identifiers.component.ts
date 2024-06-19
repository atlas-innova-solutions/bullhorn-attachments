import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { IPersonType } from '../../../models/static-models/interface/i-business-dropdown.model';
import { StaticData } from '../../../services/load-static-data.service';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { PersonType } from '../../../models/static-models/business-model/business-dropdown.modes';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../models/user-role-attributes/role.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-hcm-identifiers',
    templateUrl: './hcm-identifiers.component.html',
    styleUrl: './hcm-identifiers.component.scss'
})
export class HCMIdentifiersComponent implements OnInit {
    hcmidentifiersFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    hcmPersonTypeFormControl!: FormControl;

    hcmPersonTypeList: IPersonType[] = [];

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
        private modelService: MapperService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.hcmPersonTypeFormControl = new FormControl({ value: null, disabled: true }, [Validators.required]);

        this.hcmidentifiersFormGroup = this.formBuilder.group({
            hcmPersonType: this.hcmPersonTypeFormControl
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
        return !this.hcmidentifiersFormGroup.get(field)?.valid && this.hcmidentifiersFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.hcmidentifiersFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.hcmidentifiersFormGroup.get(field);

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
                const control = this.hcmidentifiersFormGroup.get(field);
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
            case 'hcmPersonType': {
                this.allReviewData.assignment.hcmPersonTypeId = this.hcmidentifiersFormGroup.controls[formControlName].value;
                let hcmPersonType: any = this.hcmPersonTypeList.find((pt) => pt.systemPersonType === this.hcmidentifiersFormGroup.controls[formControlName].value)?.userPersonType;
                this.allReviewData.assignment.hcmPersonType = hcmPersonType;
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
            Object.keys(this.hcmidentifiersFormGroup.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.hcmidentifiersFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.hcmidentifiersFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.hcmidentifiersFormGroup.removeControl(attribute.attributeName);
                    }
                } else {
                    this.hcmidentifiersFormGroup.removeControl(key);
                }
            });

            this.hcmidentifiersFormGroup.updateValueAndValidity();
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.hcmPersonTypeList = this.modelService.map(PersonType, res.personType);

            this.prepareSectionData(reviewData);
            // this.setFieldsToDisable(null);
        });
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.hcmidentifiersFormGroup && reviewData) {
            this.hcmPersonTypeFormControl.setValue(reviewData.assignment && reviewData.assignment.hcmPersonTypeId ? reviewData.assignment.hcmPersonTypeId : '');
        }
    }

    setFieldsToDisable(config: any) {
        this.hcmPersonTypeFormControl.disable();
    }
}
