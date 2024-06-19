import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../models/review/placement-review-data.model';
import { IYesOrNo } from '../../models/static-models/interface/i-business-dropdown.model';
import { StaticData } from '../../services/load-static-data.service';
import { StaticApiRes } from '../../utils/static-initial-api';
import { YesOrNo } from '../../models/static-models/business-model/business-dropdown.modes';
import { MapperService } from '../../services/auto-mapper/mapper-service';
import { Role, SetupUserRole } from '../../models/user-role-attributes/role.model';
import { Feature } from '../../models/user-role-attributes/feature.model';
import { AttributePermission } from '../../models/user-role-attributes/attribute-permission.model';
import { LocalStorageVariables } from '../../utils/local-storage-variable';

@Component({
    selector: 'app-time-setup',
    templateUrl: './time-setup.component.html',
    styleUrl: './time-setup.component.scss'
})
export class TimeSetupComponent implements OnInit {
    timesetupFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    allowHolidayFormControl!: FormControl;
    allowTimeEntryFormControl!: FormControl;
    allowWeekendFormControl!: FormControl;
    allowWorkerToChangeCalculatedHoursFormControl!: FormControl;
    extractBillRuleFormControl!: FormControl;
    extractPayRuleFormControl!: FormControl;
    layoutFormControl!: FormControl;
    maximumPerDayFormControl!: FormControl;
    maximumPeyPeriodFormControl!: FormControl;
    mealBreakTrackingFormControl!: FormControl;
    minumumPerDayFormControl!: FormControl;
    minumumPeyPeriodFormControl!: FormControl;
    otStartPerDayFormControl!: FormControl;
    otStartPerPeriodFormControl!: FormControl;
    timeCardEndOfWeekFormControl!: FormControl;
    timeEntryMethodFormControl!: FormControl;
    timeCardApprovalMethodFormControl!: FormControl;
    useTimeInOrOutEntryFormControl!: FormControl;
    timeEntrySourceFormControl!: FormControl;
    attestationFlagFormControl!: FormControl;
    attestationFlagList: IYesOrNo[] = [];

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
        private mapperService: MapperService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.timeEntrySourceFormControl = new FormControl('');
        this.allowHolidayFormControl = new FormControl('');
        this.allowTimeEntryFormControl = new FormControl('');
        this.allowWeekendFormControl = new FormControl('');
        this.allowWorkerToChangeCalculatedHoursFormControl = new FormControl('');
        this.extractBillRuleFormControl = new FormControl('');
        this.extractPayRuleFormControl = new FormControl('');
        this.layoutFormControl = new FormControl('');
        this.maximumPerDayFormControl = new FormControl('');
        this.maximumPeyPeriodFormControl = new FormControl('');
        this.mealBreakTrackingFormControl = new FormControl('');
        this.minumumPerDayFormControl = new FormControl('');
        this.minumumPeyPeriodFormControl = new FormControl('');
        this.otStartPerDayFormControl = new FormControl('');
        this.otStartPerPeriodFormControl = new FormControl('');
        this.timeCardEndOfWeekFormControl = new FormControl('');
        this.attestationFlagFormControl = new FormControl('');
        this.timeEntryMethodFormControl = new FormControl('');
        this.timeCardApprovalMethodFormControl = new FormControl('');
        this.useTimeInOrOutEntryFormControl = new FormControl('');

        this.timesetupFormGroup = this.formBuilder.group({
            timeEntrySource: this.timeEntrySourceFormControl,
            // allowHoliday: this.allowHolidayFormControl,
            // allowTimeEntry: this.allowTimeEntryFormControl,
            // allowWeekend: this.allowWeekendFormControl,
            // allowWorkerToChangeCalculatedHours: this.allowWorkerToChangeCalculatedHoursFormControl,
            // extractBillRule: this.extractBillRuleFormControl,
            // extractPayRule: this.extractPayRuleFormControl,
            layout: this.layoutFormControl,
            // maximumPerDay: this.maximumPerDayFormControl,
            // maximumPeyPeriod: this.maximumPeyPeriodFormControl,
            mealBreakTracking: this.mealBreakTrackingFormControl,
            // minumumPerDay: this.minumumPerDayFormControl,
            // minumumPeyPeriod: this.minumumPeyPeriodFormControl,
            // otStartPerDay: this.otStartPerDayFormControl,
            // otStartPerPeriod: this.otStartPerPeriodFormControl,
            timeCardEndOfWeek: this.timeCardEndOfWeekFormControl,
            attestationFlag: this.attestationFlagFormControl,

            timeEntryMethod: this.timeEntryMethodFormControl
            // timeCardApprovalMethod: this.timeCardApprovalMethodFormControl,
            // useTimeInOrOutEntry: this.useTimeInOrOutEntryFormControl
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
        return !this.timesetupFormGroup.get(field)?.valid && this.timesetupFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.timesetupFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.timesetupFormGroup.get(field);

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
                const control = this.timesetupFormGroup.get(field);
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
            this.attestationFlagList = this.mapperService.map(YesOrNo, res.yesOrNo);
            this.prepareSectionData(data);
            // this.mealBreakTrackingFormControl.disable();
        });
    }
    onFormChange(formControlName: string) {
        switch (formControlName) {
            case 'timeEntrySource': {
                this.allReviewData.timeSetup.timeEntrySource = this.timesetupFormGroup.controls[formControlName].value;
                break;
            }
            case 'timeEntryMethod': {
                this.allReviewData.timeSetup.timeEntryMethod = this.timesetupFormGroup.controls[formControlName].value;
                break;
            }
            case 'layout': {
                this.allReviewData.timeSetup.timeCardLayout = this.timesetupFormGroup.controls[formControlName].value;
                break;
            }
            case 'timeCardEndOfWeek': {
                this.allReviewData.timeSetup.timeCardEndOfWeek = this.timesetupFormGroup.controls[formControlName].value;
                break;
            }
            case 'mealBreakTracking': {
                this.allReviewData.timeSetup.mealBreakTracking = this.timesetupFormGroup.controls[formControlName].value;
                break;
            }
            case 'attestationFlag': {
                this.allReviewData.assignment.attestationId = this.timesetupFormGroup.controls[formControlName].value;
                let attestationName = this.attestationFlagList.find((re) => re.id === this.timesetupFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.attestationName = attestationName;
                break;
            }
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.timesetupFormGroup && reviewData && reviewData.timeSetup) {
            this.timeEntrySourceFormControl.setValue(reviewData.timeSetup.timeEntrySource);
            // this.allowHolidayFormControl.setValue('');
            // this.allowTimeEntryFormControl.setValue('');
            // this.allowWeekendFormControl.setValue('');
            // this.allowWorkerToChangeCalculatedHoursFormControl.setValue('');
            // this.extractBillRuleFormControl.setValue('');
            // this.extractPayRuleFormControl.setValue('');
            this.layoutFormControl.setValue(reviewData.timeSetup.timeCardLayout);
            // this.maximumPerDayFormControl.setValue('');
            // this.maximumPeyPeriodFormControl.setValue('');
            this.mealBreakTrackingFormControl.setValue(reviewData.timeSetup.mealBreakTracking);
            // this.minumumPerDayFormControl.setValue('');
            // this.minumumPeyPeriodFormControl.setValue('');
            // this.otStartPerDayFormControl.setValue('');
            // this.otStartPerPeriodFormControl.setValue('');
            this.timeCardEndOfWeekFormControl.setValue(reviewData.timeSetup.timeCardEndOfWeek);

            this.timeEntryMethodFormControl.setValue(reviewData.timeSetup.timeEntryMethod);

            this.attestationFlagFormControl.setValue(reviewData.assignment.attestationId ? reviewData.assignment.attestationId : 'N');
            // this.timeCardApprovalMethodFormControl.setValue('');
            // this.useTimeInOrOutEntryFormControl.setValue('');
        }
    }

    setFieldsToDisable(config: any) {}

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
            Object.keys(this.timesetupFormGroup.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.timesetupFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.timesetupFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.timesetupFormGroup.removeControl(attribute.attributeName);
                    }
                }
            });

            this.timesetupFormGroup.updateValueAndValidity();
        }
    }
}
