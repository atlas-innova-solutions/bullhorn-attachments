import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { IFusionCustomerIdAccount, IFusionCustomerIdParent } from '../../../models/static-models/interface/i-business-dropdown.model';
import { FusionCustomerIdAccount, FusionCustomerIdParent } from '../../../models/static-models/business-model/business-dropdown.modes';
import { StaticData } from '../../../services/load-static-data.service';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { Role, SetupUserRole } from '../../../models/user-role-attributes/role.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
    customerFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    atsCustomerAccountIdFormControl!: FormControl;
    atsCustomerParentIdFormControl!: FormControl;
    atsCustomerAccountNameFormControl!: FormControl;
    atsCustomerParentNameFormControl!: FormControl;

    fusionCustomerParentIdFormControl!: FormControl;
    fusionCustomerParentNameFormControl!: FormControl;

    fusionCustomerAccountIdFormControl!: FormControl;
    fusionCustomerAccountNameFormControl!: FormControl;

    customerSiteFormControl!: FormControl;

    fusionCustomerParentIdList: IFusionCustomerIdParent[] = [];
    fusionCustomerParentNameList: IFusionCustomerIdParent[] = [];
    fusionCustomerAccountIdList: IFusionCustomerIdAccount[] = [];
    fusionCustomerAccountNameList: IFusionCustomerIdAccount[] = [];

    allRoleAttributes!: SetupUserRole;
    role!: Role | undefined;
    feature: Feature | null | undefined;

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
        this.atsCustomerAccountIdFormControl = new FormControl('');
        this.atsCustomerParentIdFormControl = new FormControl('');
        this.atsCustomerAccountNameFormControl = new FormControl('');
        this.atsCustomerParentNameFormControl = new FormControl('');
        this.fusionCustomerParentIdFormControl = new FormControl(null);
        this.fusionCustomerParentNameFormControl = new FormControl(null);
        this.fusionCustomerAccountIdFormControl = new FormControl(null);
        this.fusionCustomerAccountNameFormControl = new FormControl(null);
        this.customerSiteFormControl = new FormControl('');

        this.customerFormGroup = this.formBuilder.group({
            atsCustomerParentId: this.atsCustomerParentIdFormControl,
            atsCustomerParentName: this.atsCustomerParentNameFormControl,
            atsCustomerAccountId: this.atsCustomerAccountIdFormControl,
            atsCustomerAccountName: this.atsCustomerAccountNameFormControl,
            fusionCustomerParentId: this.fusionCustomerParentIdFormControl,
            fusionCustomerParentName: this.fusionCustomerParentNameFormControl,
            fusionCustomerAccountId: this.fusionCustomerAccountIdFormControl,
            fusionCustomerAccountName: this.fusionCustomerAccountNameFormControl,
            customerSite: this.customerSiteFormControl
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
        return !this.customerFormGroup.get(field)?.valid && this.customerFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.customerFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.customerFormGroup.get(field);

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
                const control = this.customerFormGroup.get(field);
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
        // switch (formControlName) {
        //     case 'fusionCustomerAccountId': {
        //         this.allReviewData.assignment.fusionCustomerAccountId = this.customerFormGroup.controls[formControlName].value;
        //         let fusionCustomerAccountName: any = this.fusionCustomerAccountIdList.find((a) => a.id === this.customerFormGroup.controls[formControlName].value)?.name;
        //         this.fusionCustomerAccountNameFormControl.setValue(fusionCustomerAccountName);
        //         this.allReviewData.assignment.fusionCustomerAccountName = fusionCustomerAccountName;
        //         break;
        //     }
        //     case 'fusionCustomerAccountName': {
        //         this.allReviewData.assignment.fusionCustomerAccountName = this.customerFormGroup.controls[formControlName].value;
        //         let fusionCustomerAccountId: any = this.fusionCustomerAccountNameList.find((a) => a.name === this.customerFormGroup.controls[formControlName].value)?.id;
        //         this.fusionCustomerAccountIdFormControl.setValue(fusionCustomerAccountId);
        //         this.allReviewData.assignment.fusionCustomerAccountId = fusionCustomerAccountId;
        //         break;
        //     }
        //     case 'fusionCustomerParentId': {
        //         this.allReviewData.assignment.fusionCustomerParentId = this.customerFormGroup.controls[formControlName].value;
        //         let fusionCustomerParentName: any = this.fusionCustomerParentIdList.find((a) => a.id === this.customerFormGroup.controls[formControlName].value)?.name;
        //         this.fusionCustomerParentNameFormControl.setValue(fusionCustomerParentName);
        //         this.allReviewData.assignment.fusionCustomerParentName = fusionCustomerParentName;
        //         break;
        //     }
        //     case 'fusionCustomerParentName': {
        //         this.allReviewData.assignment.fusionCustomerParentName = this.customerFormGroup.controls[formControlName].value;
        //         let fusionCustomerParentId: any = this.fusionCustomerParentNameList.find((a) => a.name === this.customerFormGroup.controls[formControlName].value)?.id;
        //         this.fusionCustomerParentIdFormControl.setValue(fusionCustomerParentId);
        //         this.allReviewData.assignment.fusionCustomerParentId = fusionCustomerParentId;
        //         break;
        //     }
        // }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        // StaticData.subscribe((res: StaticApiRes) => {
        //     this.fusionCustomerParentIdList = this.mapperService.map(FusionCustomerIdParent, res.fusionCustomerIdParent);
        //     this.fusionCustomerAccountIdList = this.mapperService.map(FusionCustomerIdAccount, res.fusionCustomerIdAccount);
        //     this.fusionCustomerParentNameList = this.mapperService.map(FusionCustomerIdParent, res.fusionCustomerIdParent);
        //     this.fusionCustomerAccountNameList = this.mapperService.map(FusionCustomerIdAccount, res.fusionCustomerIdAccount);

        //     this.prepareSectionData(reviewData);
        // });

        this.prepareSectionData(reviewData);
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
                if (this.customerFormGroup.controls[attribute.attributeName]) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.customerFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.customerFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.customerFormGroup.removeControl(attribute.attributeName);
                    }
                }
            });

            this.customerFormGroup.updateValueAndValidity();
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.customerFormGroup && reviewData && reviewData.assignment) {
            this.atsCustomerParentIdFormControl.setValue(reviewData.assignment.atsCustomerParentId ? reviewData.assignment.atsCustomerParentId : '');
            this.atsCustomerParentNameFormControl.setValue(reviewData.assignment.atsCustomerParentName ? reviewData.assignment.atsCustomerParentName : '');
            this.atsCustomerAccountIdFormControl.setValue(reviewData.assignment.atsCustomerAccountId ? reviewData.assignment.atsCustomerAccountId : '');
            this.atsCustomerAccountNameFormControl.setValue(reviewData.assignment.atsCustomerAccountName ? reviewData.assignment.atsCustomerAccountName : '');
            this.fusionCustomerParentIdFormControl.setValue(reviewData.assignment.fusionCustomerParentId ? reviewData.assignment.fusionCustomerParentId : '');
            this.fusionCustomerParentNameFormControl.setValue(reviewData.assignment.fusionCustomerParentName ? reviewData.assignment.fusionCustomerParentName : '');
            this.fusionCustomerAccountIdFormControl.setValue(reviewData.assignment.fusionCustomerAccountId ? reviewData.assignment.fusionCustomerAccountId : '');
            this.fusionCustomerAccountNameFormControl.setValue(reviewData.assignment.fusionCustomerAccountName ? reviewData.assignment.fusionCustomerAccountName : '');
            this.customerSiteFormControl.setValue(reviewData.assignment.customerSite ? reviewData.assignment.customerSite : '');
        }
    }
}
