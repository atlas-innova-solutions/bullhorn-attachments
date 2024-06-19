import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { StaticData } from '../../../services/load-static-data.service';
import { VMS } from '../../../models/static-models/business-model/business-dropdown.modes';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { IVMS } from '../../../models/static-models/interface/i-business-dropdown.model';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../models/user-role-attributes/role.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-vms',
    templateUrl: './vms.component.html',
    styleUrl: './vms.component.scss'
})
export class VmsComponent implements OnInit {
    vmsForm!: FormGroup;

    vmsNameFormControl!: FormControl;
    vmsWorkOrderNumberFormControl!: FormControl;
    vmsWorkerIdFormControl!: FormControl;

    vmsNameList: IVMS[] = [];

    maxLenVmsWorkOrderNumberChar: string = 'VMS Work Order Number not allowed more than 250 Characters';
    maxLenVmsWorkerIdChar: string = 'VMS Worker Id not allowed more than 250 Characters';

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
        this.vmsNameFormControl = new FormControl(null);
        this.vmsWorkOrderNumberFormControl = new FormControl('', [Validators.maxLength(250)]);
        this.vmsWorkerIdFormControl = new FormControl('', [Validators.maxLength(250)]);

        this.vmsForm = this.formBuilder.group({
            vmsName: this.vmsNameFormControl,
            vmsWorkOrderNumber: this.vmsWorkOrderNumberFormControl,
            vmsWorkerId: this.vmsWorkerIdFormControl
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
        return !this.vmsForm.get(field)?.valid && this.vmsForm.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.vmsForm.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.vmsForm.get(field);

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
                const control = this.vmsForm.get(field);
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
            case 'vmsName':
                this.allReviewData.assignment.vmsId = this.vmsForm.controls[formControlName].value;
                let vmsName: any = this.vmsNameList.find((vn) => vn.id === this.vmsForm.controls[formControlName].value)?.name;
                this.allReviewData.assignment.vmsName = vmsName;
                break;
            case 'vmsWorkOrderNumber':
                this.allReviewData.assignment.vmsWorkOrderNumber = this.vmsForm.controls[formControlName].value;
                break;
            case 'vmsWorkerId':
                this.allReviewData.assignment.vmsWorkerId = this.vmsForm.controls[formControlName].value;
                break;
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
            Object.keys(this.vmsForm.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.vmsForm.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.vmsForm.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.vmsForm.removeControl(attribute.attributeName);
                    }
                }
            });

            this.vmsForm.updateValueAndValidity();
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.vmsNameList = this.mapperService.map(VMS, res.vmsList);

            this.prepareSectionData(reviewData);
        });
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.vmsForm && reviewData) {
            this.vmsNameFormControl.setValue(reviewData.assignment && reviewData.assignment.vmsId ? reviewData.assignment.vmsId : '');
            this.vmsWorkOrderNumberFormControl.setValue(reviewData.assignment && reviewData.assignment.vmsWorkOrderNumber ? reviewData.assignment.vmsWorkOrderNumber : '');
            this.vmsWorkerIdFormControl.setValue(reviewData.assignment && reviewData.assignment.vmsWorkerId ? reviewData.assignment.vmsWorkerId : '');
        }
    }

    setFieldsToDisable(config: any) {}
}
