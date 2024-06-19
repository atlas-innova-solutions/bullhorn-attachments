import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { Project } from '../../../models/static-models/business-model/business-dropdown.modes';
import { StaticData } from '../../../services/load-static-data.service';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { IProject } from '../../../models/static-models/interface/i-business-dropdown.model';
import { Role, SetupUserRole } from '../../../models/user-role-attributes/role.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-project-delivery',
    templateUrl: './project-delivery.component.html',
    styleUrl: './project-delivery.component.scss'
})
export class ProjectDeliveryComponent implements OnInit {
    projectdeliveryFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    projectFormControl!: FormControl;
    projectTypeFormControl!: FormControl;
    projectBusinessUnitFormControl!: FormControl;
    deliveryOwnerFormControl!: FormControl;

    projectList: IProject[] = [];
    projectTypeList: IProject[] = [];

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
        this.projectFormControl = new FormControl(null);
        this.projectTypeFormControl = new FormControl(null);
        this.projectBusinessUnitFormControl = new FormControl('');
        this.deliveryOwnerFormControl = new FormControl('');

        this.projectdeliveryFormGroup = this.formBuilder.group({
            project: this.projectFormControl,
            projectType: this.projectTypeFormControl,
            projectBusinessUnit: this.projectBusinessUnitFormControl,
            deliveryOwner: this.deliveryOwnerFormControl
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
        return !this.projectdeliveryFormGroup.get(field)?.valid && this.projectdeliveryFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.projectdeliveryFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.projectdeliveryFormGroup.get(field);

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
                const control = this.projectdeliveryFormGroup.get(field);
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
            case 'project': {
                this.allReviewData.assignment.projectId = this.projectdeliveryFormGroup.controls[formControlName].value;
                let project: any = this.projectList.find((p) => p.projectId == this.projectdeliveryFormGroup.controls[formControlName].value);
                this.allReviewData.assignment.project = project?.projectName;
                this.allReviewData.assignment.projectType = project?.projectTypeName;
                this.projectTypeFormControl.setValue(project?.projectTypeName);
                this.allReviewData.assignment.projectBusinessUnit = project?.projectBusinessUnitName;
                this.projectBusinessUnitFormControl.setValue(project?.projectBusinessUnitName);
                this.allReviewData.assignment.payCurrencyId = project?.projectCurrencyId ? project?.projectCurrencyId : 'USD';
                this.allReviewData.assignment.payCurrency = project?.projectCurrencyCode ? project?.projectCurrencyCode : 'USD';
                break;
            }
            case 'projectType': {
                this.allReviewData.assignment.projectType = this.projectdeliveryFormGroup.controls[formControlName].value;
                break;
            }
            case 'projectBusinessUnit': {
                this.allReviewData.assignment.projectBusinessUnit = this.projectdeliveryFormGroup.controls[formControlName].value;
                break;
            }
            case 'deliveryOwner': {
                this.allReviewData.assignment.deliveryOwner = this.projectdeliveryFormGroup.controls[formControlName].value;
                break;
            }
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.projectList = this.mapperService.map(Project, res.projects);
            this.projectTypeList = this.mapperService.map(Project, res.projects);

            this.prepareSectionData(reviewData);
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
                if (this.projectdeliveryFormGroup.controls[attribute.attributeName]) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.projectdeliveryFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.projectdeliveryFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.projectdeliveryFormGroup.removeControl(attribute.attributeName);
                    }
                }
            });

            this.projectdeliveryFormGroup.updateValueAndValidity();
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.projectdeliveryFormGroup && reviewData) {
            this.projectFormControl.setValue(reviewData.assignment && reviewData.assignment.projectId ? reviewData.assignment.projectId : '');
            this.projectTypeFormControl.setValue(reviewData.assignment && reviewData.assignment.projectType ? reviewData.assignment.projectType : '');
            this.projectBusinessUnitFormControl.setValue(reviewData.assignment && reviewData.assignment.projectBusinessUnit ? reviewData.assignment.projectBusinessUnit : '');
            this.deliveryOwnerFormControl.setValue(reviewData.assignment && reviewData.assignment.deliveryOwner ? reviewData.assignment.deliveryOwner : '');
        }
    }

    // setFieldsToDisable(config: any) {
    //     this.projectTypeFormControl.disable();
    // }
}
