import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { StaticData } from '../../../services/load-static-data.service';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { InternalJobCode } from '../../../models/static-models/business-model/business-dropdown.modes';
import { IInternalJobCode } from '../../../models/static-models/interface/i-business-dropdown.model';
import { Role, SetupUserRole } from '../../../models/user-role-attributes/role.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-job',
    templateUrl: './job.component.html',
    styleUrl: './job.component.scss'
})
export class JobComponent implements OnInit {
    JobForm!: FormGroup;

    // jobTypeFormControl!: FormControl;
    jobTitleFormControl!: FormControl;
    // jobClassFormControl!: FormControl;
    // industryFormControl!: FormControl;
    // workersCompCodeFormControl!: FormControl;

    internalJobTitleFormControl!: FormControl;
    internalJobCodeFormControl!: FormControl;

    readonly errorMessages = ErrorMessages;

    jobClassList: any[] = [];
    internalJobCodeData: IInternalJobCode[] = [];

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

    displayFieldCss(field: string) {
        return {
            'has-error': this.isValid(field),
            'has-feedback': this.isValid(field)
        };
    }

    isValid(field: string) {
        return !this.JobForm.get(field)?.valid && this.JobForm.get(field)?.touched;
    }

    constructor(
        private formBuilder: FormBuilder,
        private mapperService: MapperService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        // this.jobTypeFormControl = new FormControl('');
        this.jobTitleFormControl = new FormControl('');
        // this.industryFormControl = new FormControl('', ([Validators.required]));
        // this.jobClassFormControl = new FormControl(null, ([Validators.required]));
        // this.workersCompCodeFormControl = new FormControl('', ([Validators.required]));

        this.internalJobTitleFormControl = new FormControl('');
        this.internalJobCodeFormControl = new FormControl('');

        this.JobForm = this.formBuilder.group({
            // jobType: this.jobTypeFormControl,
            jobTitle: this.jobTitleFormControl,
            // jobClass: this.jobClassFormControl,
            // industry: this.industryFormControl,
            // workersCompCode: this.workersCompCodeFormControl
            internalJobCode: this.internalJobCodeFormControl,
            internalJobTittle: this.internalJobTitleFormControl
        });
    }

    ngOnInit(): void {
        StaticData.subscribe((res: StaticApiRes) => {
            this.internalJobCodeData = this.mapperService.map(InternalJobCode, res.internalJobCode);
        });
    }

    validateAllFormFields() {
        var fieldsControls = this.JobForm.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.JobForm.get(field);

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
                const control = this.JobForm.get(field);
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
            // case 'jobType': {
            //     this.allReviewData.assignmentTeamAddr.jobType = this.JobForm.controls[formControlName].value;
            //     break;
            // }
            case 'jobTitle': {
                this.allReviewData.assignmentTeamAddr.jobTitle = this.JobForm.controls[formControlName].value;
                break;
            }
            // case 'jobClass': {
            //     this.allReviewData.assignmentTeamAddr.jobClass = this.JobForm.controls[formControlName].value;
            //     break;
            // }
            // case 'industry': {
            //     this.allReviewData.assignmentTeamAddr.industry = this.JobForm.controls[formControlName].value;
            //     break;
            // }
            // case 'workersCompCode': {
            //     this.allReviewData.assignmentTeamAddr.workersCompCode = this.JobForm.controls[formControlName].value;
            //     break;
            // }
            case 'internalJobTittle': {
                this.allReviewData.assignmentTeamAddr.internalJobTittle = this.JobForm.controls[formControlName].value;
                break;
            }
            case 'internalJobCode': {
                this.allReviewData.assignmentTeamAddr.internalJobCodeId = this.JobForm.controls[formControlName].value;
                let internalJobCodeName: any = this.internalJobCodeData.find((i) => i.id === this.JobForm.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.internalJobCodeName = internalJobCodeName;
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
            Object.keys(this.JobForm.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.JobForm.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.JobForm.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.JobForm.removeControl(attribute.attributeName);
                    }
                }
            });

            this.JobForm.updateValueAndValidity();
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            // this.jobClassList = this.mapperService.map(jobClass, res.jobClass);
            this.prepareSectionData(reviewData);
        });
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.JobForm && reviewData && reviewData.assignmentTeamAddr) {
            // this.jobTypeFormControl.setValue(reviewData.assignmentTeamAddr.jobType ? reviewData.assignmentTeamAddr.jobType : '');
            this.jobTitleFormControl.setValue(reviewData.assignmentTeamAddr.jobTitle ? reviewData.assignmentTeamAddr.jobTitle : '');
            // this.industryFormControl.setValue(reviewData.assignmentTeamAddr.industry ? reviewData.assignmentTeamAddr.industry : '');
            // this.jobClassFormControl.setValue(reviewData.assignmentTeamAddr.jobClass ? reviewData.assignmentTeamAddr.jobClass : '');
            // this.workersCompCodeFormControl.setValue(reviewData.assignmentTeamAddr.workersCompCode ? reviewData.assignmentTeamAddr.workersCompCode : '');

            this.internalJobCodeFormControl.setValue(reviewData.assignmentTeamAddr.internalJobCodeName ? reviewData.assignmentTeamAddr.internalJobCodeName : '');
            this.internalJobTitleFormControl.setValue(reviewData.assignmentTeamAddr.internalJobTittle ? reviewData.assignmentTeamAddr.internalJobTittle : '');
        }
    }

    setFieldsToDisable(config: any) {}
}
