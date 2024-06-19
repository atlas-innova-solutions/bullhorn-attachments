import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../models/review/placement-review-data.model';
import { DateFormatService } from '../../services/date-format/date-format-service';
import { IImmigrationStatus, IVisaType } from '../../models/static-models/interface/i-business-dropdown.model';
import { StaticData } from '../../services/load-static-data.service';
import { StaticApiRes } from '../../utils/static-initial-api';
import { ImmigrationStatus, VisaType } from '../../models/static-models/business-model/business-dropdown.modes';
import { MapperService } from '../../services/auto-mapper/mapper-service';
import { AttributePermission } from '../../models/user-role-attributes/attribute-permission.model';
import { Feature } from '../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../models/user-role-attributes/role.model';
import { LocalStorageVariables } from '../../utils/local-storage-variable';

@Component({
    selector: 'app-immigration',
    templateUrl: './immigration.component.html',
    styleUrl: './immigration.component.scss'
})
export class ImmigrationComponent implements OnInit {
    immigrationFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    immigrationStatusFormControl!: FormControl;
    visaTypeFormControl!: FormControl;
    visaStartDateFormControl!: FormControl;
    visaEndDateFormControl!: FormControl;
    visaPermitNumberFormControl!: FormControl;
    immigrationNotesFormControl!: FormControl;
    // lcaAmountFormControl!: FormControl;

    immigrationStatusList: IImmigrationStatus[] = [];
    visaTypeList: IVisaType[] = [];
    startDateValidationFlag: boolean = false;

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

    displayFieldCss(field: string) {
        return {
            'has-error': this.isValid(field),
            'has-feedback': this.isValid(field)
        };
    }

    isValid(field: string) {
        return !this.immigrationFormGroup.get(field)?.valid && this.immigrationFormGroup.get(field)?.touched;
    }

    constructor(
        private formBuilder: FormBuilder,
        private dateFormatService: DateFormatService,
        private mapperService: MapperService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.immigrationStatusFormControl = new FormControl(null);
        this.visaTypeFormControl = new FormControl(null);
        this.visaStartDateFormControl = new FormControl('');
        this.visaEndDateFormControl = new FormControl('');
        this.visaPermitNumberFormControl = new FormControl('');
        this.immigrationNotesFormControl = new FormControl('');
        // this.lcaAmountFormControl = new FormControl('');

        this.immigrationFormGroup = this.formBuilder.group(
            {
                immigrationStatus: this.immigrationStatusFormControl,
                visaType: this.visaTypeFormControl,
                visaStartDate: this.visaStartDateFormControl,
                visaEndDate: this.visaEndDateFormControl,
                visaPermitNumber: this.visaPermitNumberFormControl,
                immigrationNotes: this.immigrationNotesFormControl
                // lcaAmount: this.lcaAmountFormControl
            },
            {
                validator: this.checkDateValidation.bind(this)
            }
        );
    }

    ngOnInit(): void {}

    validateAllFormFields() {
        var fieldsControls = this.immigrationFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.immigrationFormGroup.get(field);

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
                const control = this.immigrationFormGroup.get(field);
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
            case 'immigrationStatus': {
                this.allReviewData.person.immigrationStatusId = this.immigrationFormGroup.controls[formControlName].value;
                let immigrationStatus: any = this.immigrationStatusList.find((i) => i.id === this.immigrationFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.person.immigrationStatus = immigrationStatus;
                break;
            }
            case 'visaType': {
                this.allReviewData.person.visaTypeId = this.immigrationFormGroup.controls[formControlName].value;
                let visaType: any = this.visaTypeList.find((i) => i.id === this.immigrationFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.person.visaType = visaType;
                break;
            }
            case 'visaStartDate': {
                let visaStartDate: any = new Date(this.immigrationFormGroup.controls[formControlName].value);
                let visaStartDateFormat: any = visaStartDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(visaStartDate) : '';
                this.allReviewData.person.visaStartDate = visaStartDateFormat;
                break;
            }
            case 'visaEndDate': {
                let visaEndDate: any = new Date(this.immigrationFormGroup.controls[formControlName].value);
                let visaEndDateFormat: any = visaEndDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(visaEndDate) : '';
                this.allReviewData.person.visaEndDate = visaEndDateFormat;
                break;
            }
            case 'visaPermitNumber': {
                this.allReviewData.person.visaPermitNumber = this.immigrationFormGroup.controls[formControlName].value;
                break;
            }
            case 'immigrationNotes': {
                this.allReviewData.person.immigrationNotes = this.immigrationFormGroup.controls[formControlName].value;
                break;
            }
            // case 'lcaAmount': {
            //     this.allReviewData.assignmentTeamAddr.lcaAmount = this.immigrationFormGroup.controls[formControlName].value;
            //     break;
            // }
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
            Object.keys(this.immigrationFormGroup.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.immigrationFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.immigrationFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.immigrationFormGroup.removeControl(attribute.attributeName);
                    }
                } else {
                    this.immigrationFormGroup.removeControl(key);
                }
            });

            this.immigrationFormGroup.updateValueAndValidity();
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.immigrationStatusList = this.mapperService.map(ImmigrationStatus, res.immigrationStatus);
            this.visaTypeList = this.mapperService.map(VisaType, res.visaType);

            this.prepareSectionData(reviewData);
        });
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.immigrationFormGroup && reviewData) {
            if (reviewData.person) {
                this.immigrationStatusFormControl.setValue(reviewData.person.immigrationStatusId ? reviewData.person.immigrationStatusId : '');
                this.visaTypeFormControl.setValue(reviewData.person.visaTypeId ? reviewData.person.visaTypeId : '');
                this.visaStartDateFormControl.setValue(reviewData.person.visaStartDate ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.person.visaStartDate) : '');
                this.visaEndDateFormControl.setValue(reviewData.person.visaEndDate ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.person.visaEndDate) : '');
                this.visaPermitNumberFormControl.setValue(reviewData.person.visaPermitNumber ? reviewData.person.visaPermitNumber : '');
                this.immigrationNotesFormControl.setValue(reviewData.person.immigrationNotes ? reviewData.person.immigrationNotes : '');
            }
        }
    }

    checkDateValidation(group: FormGroup) {
        let startDate = new Date(group.value.visaStartDate);
        let endDate = new Date(group.value.visaEndDate);
        startDate > endDate && endDate ? (this.startDateValidationFlag = true) : (this.startDateValidationFlag = false);
    }

    setFieldsToDisable(config: any) {}
}
