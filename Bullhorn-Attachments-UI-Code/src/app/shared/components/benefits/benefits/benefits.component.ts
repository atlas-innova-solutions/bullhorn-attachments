import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { StaticData } from '../../../services/load-static-data.service';
import { HolidayPlan, HolidayPlanType, PTOPlan, SickPlan, Vacation } from '../../../models/static-models/business-model/business-dropdown.modes';
import { IHolidayPlan, IHolidayPlanType, IPTOPlan, ISickPlan, IVacation } from '../../../models/static-models/interface/i-business-dropdown.model';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../models/user-role-attributes/role.model';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-benefits',
    templateUrl: './benefits.component.html',
    styleUrl: './benefits.component.scss'
})
export class BenefitsComponent implements OnInit {
    benefitsForm!: FormGroup;

    tenurePremiumWorkerFormControl!: FormControl;
    holidayPlanFormControl!: FormControl;
    ptoPlanFormControl!: FormControl;
    sickPlanFormControl!: FormControl;
    holidayPlanTypeFormControl!: FormControl;
    vacationFormControl!: FormControl;

    holidayPlanList: IHolidayPlan[] = [];
    ptoPlanList: IPTOPlan[] = [];
    sickPlanList: ISickPlan[] = [];
    holidayPlanTypeList: IHolidayPlanType[] = [];
    vacationList: IVacation[] = [];

    readonly errorMessages = ErrorMessages;

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
        this.tenurePremiumWorkerFormControl = new FormControl('');
        this.holidayPlanFormControl = new FormControl(null);
        this.ptoPlanFormControl = new FormControl(null);
        this.sickPlanFormControl = new FormControl(null);
        this.vacationFormControl = new FormControl(null);
        this.holidayPlanTypeFormControl = new FormControl(null);

        this.benefitsForm = this.formBuilder.group({
            tenurePremiumWorker: this.tenurePremiumWorkerFormControl,
            ptoPlan: this.ptoPlanFormControl,
            // holidayPlan: this.holidayPlanFormControl,
            sickPlan: this.sickPlanFormControl,
            vacation: this.vacationFormControl,
            holidayPlanType: this.holidayPlanTypeFormControl
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
        return !this.benefitsForm.get(field)?.valid && this.benefitsForm.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.benefitsForm.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.benefitsForm.get(field);

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
                const control = this.benefitsForm.get(field);
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
            case 'tenurePremiumWorker': {
                this.allReviewData.person.tenurePremiumWorker = this.benefitsForm.controls[formControlName].value;
                break;
            }
            case 'ptoPlan': {
                this.allReviewData.person.ptoPlanId = this.benefitsForm.controls[formControlName].value;
                let ptoPlan: any = this.ptoPlanList.find((i) => i.id === this.benefitsForm.controls[formControlName].value)?.name;
                this.allReviewData.person.ptoPlan = ptoPlan;
                break;
            }
            case 'holidayPlan': {
                this.allReviewData.person.holidayPlanId = this.benefitsForm.controls[formControlName].value;
                let holidayPlan: any = this.holidayPlanList.find((i) => i.id === this.benefitsForm.controls[formControlName].value)?.name;
                this.allReviewData.person.holidayPlan = holidayPlan;
                break;
            }
            case 'sickPlan': {
                this.allReviewData.person.sickPlanId = this.benefitsForm.controls[formControlName].value;
                let sickPlan: any = this.sickPlanList.find((i) => i.id === this.benefitsForm.controls[formControlName].value)?.name;
                this.allReviewData.person.sickPlan = sickPlan;
                break;
            }
            case 'holidayPlanType': {
                this.allReviewData.assignmentTeamAddr.holidayPlanTypeId = this.benefitsForm.controls[formControlName].value;
                let holidayPlanType: any = this.holidayPlanTypeList.find((i) => i.id === this.benefitsForm.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.holidayPlanTypeName = holidayPlanType;
                break;
            }
            case 'vacation': {
                this.allReviewData.assignment.vacationId = this.benefitsForm.controls[formControlName].value;
                let vacationCode: any = this.vacationList.find((i) => i.id === this.benefitsForm.controls[formControlName].value)?.name;
                this.allReviewData.assignment.vacationCode = vacationCode;
                break;
            }
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.ptoPlanList = this.mapperService.map(PTOPlan, res.ptoPlan);
            this.holidayPlanList = this.mapperService.map(HolidayPlan, res.holidayPlan);
            this.sickPlanList = this.mapperService.map(SickPlan, res.sickPlan);
            this.holidayPlanTypeList = this.mapperService.map(HolidayPlanType, res.holidayPlanType);
            this.vacationList = this.mapperService.map(Vacation, res.vacation);
            this.prepareSectionData(reviewData);
            this.holidayPlanFormControl.disable();
            this.holidayPlanTypeFormControl.disable();
        });
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.benefitsForm && reviewData && reviewData.person) {
            this.tenurePremiumWorkerFormControl.setValue(reviewData.person.tenurePremiumWorker ? reviewData.person.tenurePremiumWorker : '');
            this.ptoPlanFormControl.setValue(reviewData.person.ptoPlanId ? reviewData.person.ptoPlanId : '');
            this.holidayPlanFormControl.setValue(reviewData.person.holidayPlanId ? reviewData.person.holidayPlanId : '');
            this.sickPlanFormControl.setValue(reviewData.person.sickPlanId ? reviewData.person.sickPlanId : '');
            this.vacationFormControl.setValue(reviewData.assignment.vacationId ? reviewData.assignment.vacationId : '');
            this.holidayPlanTypeFormControl.setValue(reviewData.assignmentTeamAddr.holidayPlanTypeId ? reviewData.assignmentTeamAddr.holidayPlanTypeId : '');
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
            Object.keys(this.benefitsForm.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.benefitsForm.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.benefitsForm.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.benefitsForm.removeControl(attribute.attributeName);
                    }
                }
            });

            this.benefitsForm.updateValueAndValidity();
        }
    }
}
