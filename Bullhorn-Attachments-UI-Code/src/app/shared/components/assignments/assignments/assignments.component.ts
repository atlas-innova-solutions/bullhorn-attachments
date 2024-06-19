import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { DateFormatService } from '../../../services/date-format/date-format-service';
import { IStartDateDelayReason, IExemptionStatus, INormalWeeklyHours, IPartTimeFullTime } from '../../../models/static-models/interface/i-business-dropdown.model';
import { StaticData } from './../../../services/load-static-data.service';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { StartDateDelayReason, ExemptionStatus, PartTimeFullTime, NormalWeeklyHours } from '../../../models/static-models/business-model/business-dropdown.modes';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../models/user-role-attributes/role.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrl: './assignments.component.scss'
})
export class AssignmentsComponent implements OnInit {
    assignmentsForm!: FormGroup;

    asgmtExemptionStatusFormControl!: FormControl;
    asgmtActualStartDateFormControl!: FormControl;
    parttimeFulltimeFormControl!: FormControl;
    startDateDelayReasonFormControl!: FormControl;
    asgmtTargetEndDateFormControl!: FormControl;
    asgmtTargetStartDateFormControl!: FormControl;
    normalWeeklyHoursFormControl!: FormControl;

    readonly errorMessages = ErrorMessages;

    asgmtExemptionStatusList: IExemptionStatus[] = [];
    partTimeFullTimeList: IPartTimeFullTime[] = [];
    startDateDelayReasonList: IStartDateDelayReason[] = [];
    normalWeeklyHoursList: INormalWeeklyHours[] = [];
    actualDateValidationFlag: boolean = false;
    targetDateValidationFlag: boolean = false;

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
        private dateFormatService: DateFormatService,
        private mapperService: MapperService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.asgmtExemptionStatusFormControl = new FormControl(null);
        this.asgmtActualStartDateFormControl = new FormControl('');
        this.parttimeFulltimeFormControl = new FormControl(null);
        this.startDateDelayReasonFormControl = new FormControl('');
        this.asgmtTargetEndDateFormControl = new FormControl('');
        this.asgmtTargetStartDateFormControl = new FormControl('');
        this.normalWeeklyHoursFormControl = new FormControl(null);

        this.assignmentsForm = this.formBuilder.group(
            {
                asgmtExemptionStatus: this.asgmtExemptionStatusFormControl,
                asgmtActualStartDate: this.asgmtActualStartDateFormControl,
                parttimeFulltime: this.parttimeFulltimeFormControl,
                startDateDelayReason: this.startDateDelayReasonFormControl,
                asgmtTargetEndDate: this.asgmtTargetEndDateFormControl,
                asgmtTargetStartDate: this.asgmtTargetStartDateFormControl,
                normalWeeklyHours: this.normalWeeklyHoursFormControl
            },
            {
                validator: this.checkDateValidation.bind(this)
            }
        );
    }

    ngOnInit(): void {}

    displayFieldCss(field: string) {
        return {
            'has-error': this.isValid(field),
            'has-feedback': this.isValid(field)
        };
    }

    isDateValidationFieldValid(field: string) {
        return this.assignmentsForm.get(field)?.invalid && this.assignmentsForm.get(field)?.errors?.['greaterThenCurrentDateVaidator'] && this.assignmentsForm.get(field)?.touched;
    }

    isFieldDateReq(field: string): any {
        if (this.assignmentsForm.get(field)?.value == '' || this.assignmentsForm.get(field)?.value == undefined || this.assignmentsForm.get(field)?.value == null) {
            return this.assignmentsForm.get(field)?.invalid && this.assignmentsForm.get(field)?.touched;
        }
    }

    displayDateFieldCss(field: string) {
        const isFieldDateRequired: boolean = this.isFieldDateReq(field);

        return {
            'has-error': isFieldDateRequired ? isFieldDateRequired : this.isDateValidationFieldValid(field),
            'has-feedback': isFieldDateRequired ? isFieldDateRequired : this.isDateValidationFieldValid(field)
        };
    }

    isValid(field: string) {
        return !this.assignmentsForm.get(field)?.valid && this.assignmentsForm.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.assignmentsForm.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.assignmentsForm.get(field);

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
                const control = this.assignmentsForm.get(field);
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

    bindData(data: any) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.partTimeFullTimeList = this.mapperService.map(PartTimeFullTime, res.ptftList);
            this.startDateDelayReasonList = this.mapperService.map(StartDateDelayReason, res.startDateDelayReason);
            this.asgmtExemptionStatusList = this.mapperService.map(ExemptionStatus, res.exemptionStatus);
            this.normalWeeklyHoursList = this.mapperService.map(NormalWeeklyHours, res.normalWeeklyHours);

            this.prepareSectionData(data);
            this.asgmtActualStartDateFormControl.disable();
        });
    }

    onFormChange(formControlName: string) {
        switch (formControlName) {
            case 'asgmtExemptionStatus': {
                this.allReviewData.assignment.asgmtExemptionStatusId = this.assignmentsForm.controls[formControlName].value;
                let asgmtExemptionStatus: any = this.asgmtExemptionStatusList.find((ae) => ae.id === this.assignmentsForm.controls[formControlName].value)?.name;
                this.allReviewData.assignment.asgmtExemptionStatus = asgmtExemptionStatus;
                break;
            }
            case 'asgmtActualStartDate': {
                let asgmtActualStartDate: any = new Date(this.assignmentsForm.controls[formControlName].value);
                let asgmtActualStartDateFormat = asgmtActualStartDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(asgmtActualStartDate) : '';
                this.allReviewData.assignment.asgmtActualStartDate = asgmtActualStartDateFormat;
                break;
            }
            case 'parttimeFulltime': {
                this.allReviewData.assignment.parttimeFullTimeId = this.assignmentsForm.controls[formControlName].value;
                let parttimeFullTime: any = this.partTimeFullTimeList.find((ae) => ae.id === this.assignmentsForm.controls[formControlName].value)?.name;
                this.allReviewData.assignment.parttimeFulltime = parttimeFullTime;
                break;
            }
            case 'startDateDelayReason': {
                this.allReviewData.assignment.startDateDelayReasonId = this.assignmentsForm.controls[formControlName].value;
                let startDateDelayReason: any = this.startDateDelayReasonList.find((ae) => ae.id === this.assignmentsForm.controls[formControlName].value)?.name;
                this.allReviewData.assignment.startDateDelayReason = startDateDelayReason;
                break;
            }
            case 'asgmtTargetEndDate': {
                let asgmtTargetEndDate: any = new Date(this.assignmentsForm.controls[formControlName].value);
                let asgmtTargetEndDateFormat = asgmtTargetEndDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(asgmtTargetEndDate) : '';
                this.allReviewData.assignment.asgmtTargetEndDate = asgmtTargetEndDateFormat;
                break;
            }
            case 'asgmtTargetStartDate': {
                let asgmtTargetStartDate: any = new Date(this.assignmentsForm.controls[formControlName].value);
                let asgmtTargetStartDateFormat = asgmtTargetStartDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(asgmtTargetStartDate) : '';
                this.allReviewData.assignment.asgmtTargetStartDate = asgmtTargetStartDateFormat;
                break;
            }
            case 'normalWeeklyHours': {
                this.allReviewData.assignment.normalWeeklyHoursId = this.assignmentsForm.controls[formControlName].value;
                let normalWeeklyHours: any = this.normalWeeklyHoursList.find((ae) => ae.id === this.assignmentsForm.controls[formControlName].value)?.name;
                this.allReviewData.assignment.normalWeeklyHours = normalWeeklyHours;
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
            Object.keys(this.assignmentsForm.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.assignmentsForm.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.assignmentsForm.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.assignmentsForm.removeControl(attribute.attributeName);
                    }
                }
            });

            this.assignmentsForm.updateValueAndValidity();
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.assignmentsForm && reviewData && reviewData.assignment) {
            this.asgmtExemptionStatusFormControl.setValue(reviewData.assignment.asgmtExemptionStatusId ? reviewData.assignment.asgmtExemptionStatusId : '');
            this.asgmtActualStartDateFormControl.setValue(reviewData.assignment.asgmtActualStartDate ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.assignment.asgmtActualStartDate) : '');
            this.parttimeFulltimeFormControl.setValue(reviewData.assignment.parttimeFullTimeId ? reviewData.assignment.parttimeFullTimeId : '');
            this.startDateDelayReasonFormControl.setValue(reviewData.assignment.startDateDelayReasonId ? reviewData.assignment.startDateDelayReasonId : '');
            this.asgmtTargetEndDateFormControl.setValue(reviewData.assignment.asgmtTargetEndDate ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.assignment.asgmtTargetEndDate) : '');
            this.asgmtTargetStartDateFormControl.setValue(reviewData.assignment.asgmtTargetStartDate ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.assignment.asgmtTargetStartDate) : '');
            this.normalWeeklyHoursFormControl.setValue(reviewData.assignment.normalWeeklyHoursId ? reviewData.assignment.normalWeeklyHoursId : '');
        }
    }

    setFieldsToDisable(config: any) {}

    checkDateValidation(group: FormGroup) {
        let actualStartDate = new Date(group.value.asgmtActualStartDate);
        let targetStartDate = new Date(group.value.asgmtTargetStartDate);
        let endDate = new Date(group.value.asgmtTargetEndDate);
        actualStartDate > endDate && endDate ? (this.actualDateValidationFlag = true) : (this.actualDateValidationFlag = false);
        targetStartDate > endDate && endDate ? (this.targetDateValidationFlag = true) : (this.targetDateValidationFlag = false);
    }
}
