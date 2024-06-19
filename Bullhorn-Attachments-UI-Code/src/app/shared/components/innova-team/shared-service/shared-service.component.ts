import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { StaticData } from '../../../services/load-static-data.service';
import { ConsultantPointOfContact, OnboardingSpecialist, TimeManagementSpecialist } from '../../../models/static-models/business-model/business-dropdown.modes';
import { IConsultantPointOfContact, IOnboardingSpecialist, ITimeManagementSpecialist } from '../../../models/static-models/interface/i-business-dropdown.model';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { Role, SetupUserRole } from '../../../models/user-role-attributes/role.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-shared-service',
    templateUrl: './shared-service.component.html',
    styleUrl: './shared-service.component.scss'
})
export class SharedServiceComponent implements OnInit {
    sharedFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    consultantPointOfContactFormControl!: FormControl;
    onBoardingSpecialistFormControl!: FormControl;
    timeManagementSpecialistFormControl!: FormControl;

    consultantPointOfContactList: IConsultantPointOfContact[] = [];
    onBoardingSpecialistList: IOnboardingSpecialist[] = [];
    timeManagementSpecialistList: ITimeManagementSpecialist[] = [];

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
        this.consultantPointOfContactFormControl = new FormControl(null);
        this.onBoardingSpecialistFormControl = new FormControl(null);
        this.timeManagementSpecialistFormControl = new FormControl(null);

        this.sharedFormGroup = this.formBuilder.group({
            consultantPointOfContact: this.consultantPointOfContactFormControl,
            onBoardingSpecialist: this.onBoardingSpecialistFormControl,
            timeManagementSpecialist: this.timeManagementSpecialistFormControl
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
        return !this.sharedFormGroup.get(field)?.valid && this.sharedFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.sharedFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.sharedFormGroup.get(field);

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
                const control = this.sharedFormGroup.get(field);
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
            case 'onBoardingSpecialist': {
                this.allReviewData.assignment.onBoardingSpecialistId = this.sharedFormGroup.controls[formControlName].value;
                let onBoardingSpecialist: any = this.onBoardingSpecialistList.find((i) => i.id === this.sharedFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.onBoardingSpecialist = onBoardingSpecialist;
                break;
            }
            case 'consultantPointOfContact': {
                this.allReviewData.assignment.consultantPointOfContactId = this.sharedFormGroup.controls[formControlName].value;
                let consultantPointOfContact: any = this.consultantPointOfContactList.find((i) => i.id === this.sharedFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.consultantPointOfContact = consultantPointOfContact;
                break;
            }
            case 'timeManagementSpecialist': {
                this.allReviewData.assignment.timeManagementSpecialistId = this.sharedFormGroup.controls[formControlName].value;
                let timeManagementSpecialist: any = this.timeManagementSpecialistList.find((i) => i.id === this.sharedFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.timeManagementSpecialist = timeManagementSpecialist;
                break;
            }
        }
    }

    bindData(data: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.onBoardingSpecialistList = this.mapperService.map(OnboardingSpecialist, res.onboardingSpecialist);
            this.consultantPointOfContactList = this.mapperService.map(ConsultantPointOfContact, res.consultantPointOfContact);
            this.timeManagementSpecialistList = this.mapperService.map(TimeManagementSpecialist, res.timeManagementSpecialist);

            this.prepareSectionData(data);
        });
    }

    isFormControlFieldDisplay(attributeName: string): boolean {
        const attributes = this.feature?.attributePermissions;
        let isDisplay: boolean = false;

        if (attributes && attributes.length > 0) {
            attributes.forEach((attribute: AttributePermission) => {
                if (attribute.attributeName === attributeName) {
                    isDisplay = attribute.display;
                }
            });
            return isDisplay;
        } else {
            return isDisplay;
        }
    }

    isFormControlRequired(attributeName: string): boolean {
        const attributes = this.feature?.attributePermissions;
        let isRequired: boolean = false;

        if (attributes && attributes.length > 0) {
            attributes.forEach((attribute: AttributePermission) => {
                if (attribute.attributeName === attributeName) {
                    isRequired = attribute.isMandatory;
                }
            });
        }

        return isRequired;
    }

    updateFormConfigurationBasedOnRoles() {
        const attributes = this.feature?.attributePermissions;

        if (attributes && attributes.length > 0) {
            attributes.forEach((attribute: AttributePermission) => {
                if (this.sharedFormGroup.controls[attribute.attributeName]) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.sharedFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.sharedFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.sharedFormGroup.removeControl(attribute.attributeName);
                    }
                }
            });

            this.sharedFormGroup.updateValueAndValidity();
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.sharedFormGroup && reviewData && reviewData.assignment) {
            this.consultantPointOfContactFormControl.setValue(reviewData.assignment.consultantPointOfContactId ? reviewData.assignment.consultantPointOfContactId : '');
            this.onBoardingSpecialistFormControl.setValue(reviewData.assignment.onBoardingSpecialistId ? reviewData.assignment.onBoardingSpecialistId : '');
            this.timeManagementSpecialistFormControl.setValue(reviewData.assignment.timeManagementSpecialistId ? reviewData.assignment.timeManagementSpecialistId : '');
        }
    }
}
