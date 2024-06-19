import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { StaticData } from '../../../services/load-static-data.service';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { IFusionSupplier } from '../../../models/static-models/interface/i-business-dropdown.model';
import { FusionSupplier } from '../../../models/static-models/business-model/business-dropdown.modes';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { Role, SetupUserRole } from '../../../models/user-role-attributes/role.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';
@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrl: './supplier.component.scss'
})
export class SupplierComponent implements OnInit {
    supplierFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    atsSupplierIdFormControl!: FormControl;
    atsSupplierNameFormControl!: FormControl;
    fusionSupplierIdFormControl!: FormControl;
    fusionSupplierNameFormControl!: FormControl;

    fusionSupplierIdList: IFusionSupplier[] = [];
    fusionSupplierNameList: IFusionSupplier[] = [];

    isPersonTypeContingentWorker: boolean = false;

    allReviewData!: PlacementReviewDataModel;
    @Input()
    public get reviewData(): any {
        return this.allReviewData;
    }
    public set reviewData(data: PlacementReviewDataModel) {
        if (data && Object.keys(data).length) {
            this.allReviewData = data;
            this.isPersonTypeContingentWorker = false;
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
        this.atsSupplierIdFormControl = new FormControl('');
        this.atsSupplierNameFormControl = new FormControl('');
        this.fusionSupplierIdFormControl = new FormControl(null);
        this.fusionSupplierNameFormControl = new FormControl(null);

        this.supplierFormGroup = this.formBuilder.group({
            atsSupplierId: this.atsSupplierIdFormControl,
            atsSupplierName: this.atsSupplierNameFormControl,
            fusionSupplierId: this.fusionSupplierIdFormControl,
            fusionSupplierName: this.fusionSupplierNameFormControl
            // ATSreferallvendorID: ['',Validators.required],
            // ATSreferralvendorname: ['',Validators.required],
            // referallvendorId: ['',Validators.required],
            // referralvendorname: ['',Validators.required],
            // referralratetype: ['',Validators.required],
            // referralrate: ['',Validators.required],
            // referralstartdate: ['',Validators.required],
            // referralenddate: ['',Validators.required],
            // referralterms: ['',Validators.required]
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
        return !this.supplierFormGroup.get(field)?.valid && this.supplierFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.supplierFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.supplierFormGroup.get(field);

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
                const control = this.supplierFormGroup.get(field);
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
            case 'atsSupplierId': {
                this.allReviewData.assignment.supplierId = this.supplierFormGroup.controls[formControlName].value;
                break;
            }
            case 'atsSupplierName': {
                this.allReviewData.assignment.supplierName = this.supplierFormGroup.controls[formControlName].value;
                break;
            }
            case 'fusionSupplierId': {
                this.allReviewData.assignmentTeamAddr.fusionSupplierId = this.supplierFormGroup.controls[formControlName].value;
                let fusionSupplierName: any = this.fusionSupplierIdList.find((a) => a.id === this.supplierFormGroup.controls[formControlName].value)?.name;
                this.fusionSupplierNameFormControl.setValue(fusionSupplierName);
                this.allReviewData.assignmentTeamAddr.fusionSupplierName = fusionSupplierName;
                break;
            }
            case 'fusionSupplierName': {
                this.allReviewData.assignmentTeamAddr.fusionSupplierName = this.supplierFormGroup.controls[formControlName].value;
                let fusionSupplierId: any = this.fusionSupplierIdList.find((a) => a.name === this.supplierFormGroup.controls[formControlName].value)?.id;
                this.fusionSupplierIdFormControl.setValue(fusionSupplierId);
                this.allReviewData.assignmentTeamAddr.fusionSupplierId = fusionSupplierId;
                break;
            }
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.fusionSupplierNameList = this.mapperService.map(FusionSupplier, res.suppliers);
            this.fusionSupplierIdList = this.mapperService.map(FusionSupplier, res.suppliers);
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
                if (this.supplierFormGroup.controls[attribute.attributeName]) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.supplierFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.supplierFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.supplierFormGroup.removeControl(attribute.attributeName);
                    }
                }
            });

            this.supplierFormGroup.updateValueAndValidity();
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.supplierFormGroup && reviewData) {
            this.atsSupplierIdFormControl.setValue(reviewData.assignment && reviewData.assignment.supplierId ? reviewData.assignment.supplierId : '');
            this.atsSupplierNameFormControl.setValue(reviewData.assignment && reviewData.assignment.supplierName ? reviewData.assignment.supplierName : '');
            this.fusionSupplierIdFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.fusionSupplierId ? reviewData.assignmentTeamAddr.fusionSupplierId : '');
            this.fusionSupplierNameFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.fusionSupplierName ? reviewData.assignmentTeamAddr.fusionSupplierName : '');

            if (this.reviewData.assignment.hcmPersonTypeId == 'CWK') {
                this.isPersonTypeContingentWorker = true;
                this.fusionSupplierIdFormControl.addValidators([Validators.required]);
                this.fusionSupplierNameFormControl.addValidators([Validators.required]);
            }
        }
    }
}
