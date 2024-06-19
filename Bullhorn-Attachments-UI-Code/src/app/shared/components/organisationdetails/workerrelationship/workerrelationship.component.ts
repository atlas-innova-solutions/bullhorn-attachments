import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { LegalEmployer, PrbuType, WorkerType } from '../../../models/static-models/business-model/business-dropdown.modes';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { StaticData } from '../../../services/load-static-data.service';
import { ILegalEmployer, IWorkerType } from '../../../models/static-models/interface/i-business-dropdown.model';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { Role, SetupUserRole } from '../../../models/user-role-attributes/role.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-workerrelationship',
    templateUrl: './workerrelationship.component.html',
    styleUrl: './workerrelationship.component.scss'
})
export class WorkerrelationshipComponent implements OnInit {
    workerRelationshipFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    workerTypeFormControl!: FormControl;
    legacyReportingBusinessUnitFormControl!: FormControl;
    legalEmployerFormControl!: FormControl;

    workerTypeList: IWorkerType[] = [];
    legacyReportingBusinessUnitList: any[] = [];
    legalEmployerList: ILegalEmployer[] = [];

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
        this.workerTypeFormControl = new FormControl(null);
        this.legacyReportingBusinessUnitFormControl = new FormControl(null);
        this.legalEmployerFormControl = new FormControl(null);

        this.workerRelationshipFormGroup = this.formBuilder.group({
            workerType: this.workerTypeFormControl,
            legacyReportingBusinessUnit: this.legacyReportingBusinessUnitFormControl,
            legalEmployer: this.legalEmployerFormControl
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
        return !this.workerRelationshipFormGroup.get(field)?.valid && this.workerRelationshipFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.workerRelationshipFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.workerRelationshipFormGroup.get(field);

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
                const control = this.workerRelationshipFormGroup.get(field);
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
            case 'workerType': {
                this.allReviewData.assignment.workerTypeId = this.workerRelationshipFormGroup.controls[formControlName].value;
                let workerType: any = this.workerTypeList.find((w) => w.id === this.workerRelationshipFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.workerType = workerType;
                break;
            }
            case 'legacyReportingBusinessUnit': {
                this.allReviewData.assignment.prbuId = this.workerRelationshipFormGroup.controls[formControlName].value;
                let prbu: any = this.legacyReportingBusinessUnitList.find((w) => w.id === this.workerRelationshipFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.prbuName = prbu;
                break;
            }
            case 'legalEmployer': {
                this.allReviewData.assignment.legalEmployerId = this.workerRelationshipFormGroup.controls[formControlName].value;
                let legalEmployer: any = this.legalEmployerList.find((w) => w.id === this.workerRelationshipFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.legalEmployer = legalEmployer;
                break;
            }
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.workerTypeList = this.mapperService.map(WorkerType, res.workerTypes);
            this.legalEmployerList = this.mapperService.map(LegalEmployer, res.legalEmployer);
            this.legacyReportingBusinessUnitList = this.mapperService.map(PrbuType, res.prbuType);

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
                if (this.workerRelationshipFormGroup.controls[attribute.attributeName]) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.workerRelationshipFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.workerRelationshipFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.workerRelationshipFormGroup.removeControl(attribute.attributeName);
                    }
                }
            });

            this.workerRelationshipFormGroup.updateValueAndValidity();
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.workerRelationshipFormGroup && reviewData) {
            this.workerTypeFormControl.setValue(reviewData.assignment && reviewData.assignment.workerTypeId ? reviewData.assignment.workerTypeId : '');
            this.legacyReportingBusinessUnitFormControl.setValue(reviewData.assignment && reviewData.assignment.prbuId ? reviewData.assignment.prbuId : '');
            this.legalEmployerFormControl.setValue(reviewData.assignment && reviewData.assignment.legalEmployerId ? reviewData.assignment.legalEmployerId : '');
        }
    }
}
