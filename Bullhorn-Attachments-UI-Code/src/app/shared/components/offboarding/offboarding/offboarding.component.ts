import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { DateFormatService } from '../../../services/date-format/date-format-service';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { StaticData } from '../../../services/load-static-data.service';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { YesOrNo } from '../../../models/static-models/business-model/business-dropdown.modes';
import { IYesOrNo } from '../../../models/static-models/interface/i-business-dropdown.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../models/user-role-attributes/role.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';

@Component({
    selector: 'app-offboarding',
    templateUrl: './offboarding.component.html',
    styleUrl: './offboarding.component.scss'
})
export class OffboardingComponent implements OnInit {
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

    OffboardingForm!: FormGroup;

    readonly errorMessages = ErrorMessages;

    rehireEligibleFormControl!: FormControl;

    rehireEligibleList: IYesOrNo[] = [];

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

        this.rehireEligibleFormControl = new FormControl('');

        this.OffboardingForm = this.formBuilder.group({
            rehireEligible: this.rehireEligibleFormControl
        });
    }

    ngOnInit(): void {
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isValid(field),
            'has-feedback': this.isValid(field)
        };
    }

    isValid(field: string) {
        return !this.OffboardingForm.get(field)?.valid && this.OffboardingForm.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.OffboardingForm.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.OffboardingForm.get(field);

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
                const control = this.OffboardingForm.get(field);
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

    onFormChange(formControlName: string) {
        switch (formControlName) {
            case 'rehireEligible': {
                this.allReviewData.assignment.isRehireEligibleId = this.OffboardingForm.controls[formControlName].value;
                let isRehireEligible = this.rehireEligibleList.find(re => re.id === this.OffboardingForm.controls[formControlName].value)?.name;
                this.allReviewData.assignment.isRehireEligible = isRehireEligible;
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
            Object.keys(this.OffboardingForm.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.OffboardingForm.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.OffboardingForm.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.OffboardingForm.removeControl(attribute.attributeName);
                    }
                }
            });

            this.OffboardingForm.updateValueAndValidity();
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.rehireEligibleList = this.mapperService.map(YesOrNo, res.yesOrNo);

            this.prepareSectionData(reviewData);
        });
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.OffboardingForm && reviewData && reviewData.assignment) {
            this.rehireEligibleFormControl.setValue(reviewData.assignment.isRehireEligibleId ? reviewData.assignment.isRehireEligibleId : '');
        }
    }

    setFieldsToDisable(config: any) {}
}
