import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { StaticData } from '../../../services/load-static-data.service';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import {
    IClientServiceManager,
    IRecruiter,
    IRecruiterPercentage,
    IRecruiterSecondary,
    IRecruiterSecondaryPercentage,
    IRecruiterTeam,
    ISalesPerson,
    ISalesPersonPercentage,
    ISalesPersonSecondary,
    ISalesPersonSecondaryPercentage,
    ISalesTeam,
    ISalesTeamOverride,
    ILocation,
    IRecruiterOverride,
    INonCommissionableRecruiter,
    ISalesPersonOverride,
    INonCommissionableSalesPerson
} from '../../../models/static-models/interface/i-business-dropdown.model';
import {
    ClientServiceManager,
    Recruiter,
    RecruiterPercentage,
    RecruiterSecondary,
    RecruiterSecondaryPercentage,
    RecruiterTeam,
    SalesPerson,
    SalesPersonPercentage,
    SalesPersonSecondary,
    SalesPersonSecondaryPercentage,
    SalesTeam,
    SalesTeamOverride,
    Location,
    RecruiterOverride,
    NonCommissionableRecruiter,
    salesPersonOverride,
    nonCommissionableSalesPerson
} from '../../../models/static-models/business-model/business-dropdown.modes';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../models/user-role-attributes/role.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';

@Component({
    selector: 'app-credit-allocation',
    templateUrl: './credit-allocation.component.html',
    styleUrl: './credit-allocation.component.scss'
})
export class CreditAllocationComponent implements OnInit {
    creditFormGroup!: FormGroup;

    clientServiceManagerFormControl!: FormControl;
    lineOfBusinessFormControl!: FormControl;
    locationFormControl!: FormControl;

    recruiterFormControl!: FormControl;
    recruiterPercentageFormControl!: FormControl;
    recruiterSecondaryFormControl!: FormControl;
    recruiterSecondaryPercentageFormControl!: FormControl;

    // recruiterTertiaryFormControl!: FormControl;
    // recruiterTertiaryPercentageFormControl!: FormControl;
    recruiterOverrideFormControl!: FormControl;
    nonCommissionableRecruiterFormControl!: FormControl;

    recruiterTeamFormControl!: FormControl;

    salesPersonFormControl!: FormControl;
    salesPersonPercentageFormControl!: FormControl;
    salesPersonSecondaryFormControl!: FormControl;
    salesPersonSecondaryPercentageFormControl!: FormControl;

    // salesPersonTertiaryFormControl!: FormControl;
    // salesPersonTertiaryPercentageFormControl!: FormControl;

    salesTeamFormControl!: FormControl;
    salesTeamOverrideFormControl!: FormControl;
    salesPersonOverrideFormControl!: FormControl;
    nonCommissionableSalesPersonFormControl!: FormControl;

    strategicBusinessUnitFormControl!: FormControl;
    shadowStrategicBusinessUnitFormControl!: FormControl;

    subSegmentFormControl!: FormControl;
    // subSubSegmentFormControl!: FormControl;

    clientServiceManagerList: IClientServiceManager[] = [];
    locationList: ILocation[] = [];
    recruiterList: IRecruiter[] = [];
    recruiterPercentageList: IRecruiterPercentage[] = [];
    recruiterSecondaryList: IRecruiterSecondary[] = [];
    recruiterSecondaryPercentageList: IRecruiterSecondaryPercentage[] = [];

    // recruiterTertiaryList: any[] = [];
    // recruiterTertiaryPercentageList: any[] = [];
    recruiterOverrideList: IRecruiterOverride[] = [];
    noncommissionableRecList: INonCommissionableRecruiter[] = [];
    salesPersonOverrideList: ISalesPersonOverride[] = [];
    nonCommissionableSalesPersonList: INonCommissionableSalesPerson[] = [];

    recruiterTeamList: IRecruiterTeam[] = [];

    salesPersonList: ISalesPerson[] = [];
    salesPersonPercentageList: ISalesPersonPercentage[] = [];
    salesPersonSecondaryList: ISalesPersonSecondary[] = [];
    salesPersonSecondaryPercentageList: ISalesPersonSecondaryPercentage[] = [];

    // salesPersonTertiaryList: any[] = [];
    // salesPersonTertiaryPercentageList: any[] = [];

    salesTeamList: ISalesTeam[] = [];
    salesTeamOverrideList: ISalesTeamOverride[] = [];

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
        private modelMapper: MapperService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.clientServiceManagerFormControl = new FormControl(null);
        this.lineOfBusinessFormControl = new FormControl('');
        this.locationFormControl = new FormControl(null);

        this.recruiterFormControl = new FormControl(null);
        this.recruiterPercentageFormControl = new FormControl(null);
        this.recruiterSecondaryFormControl = new FormControl(null);
        this.recruiterSecondaryPercentageFormControl = new FormControl(null);

        // this.recruiterTertiaryFormControl = new FormControl(null);
        // this.recruiterTertiaryPercentageFormControl = new FormControl(null);
        this.recruiterOverrideFormControl = new FormControl(null);
        this.nonCommissionableRecruiterFormControl = new FormControl(null);

        this.recruiterTeamFormControl = new FormControl(null);

        this.salesPersonFormControl = new FormControl(null);
        this.salesPersonPercentageFormControl = new FormControl(null);
        this.salesPersonSecondaryFormControl = new FormControl(null);
        this.salesPersonSecondaryPercentageFormControl = new FormControl(null);

        // this.salesPersonTertiaryFormControl = new FormControl(null);
        // this.salesPersonTertiaryPercentageFormControl = new FormControl(null);

        this.salesTeamFormControl = new FormControl(null);
        this.salesTeamOverrideFormControl = new FormControl(null);
        this.salesPersonOverrideFormControl = new FormControl(null);
        this.nonCommissionableSalesPersonFormControl = new FormControl(null);

        this.strategicBusinessUnitFormControl = new FormControl('');
        this.shadowStrategicBusinessUnitFormControl = new FormControl('');
        this.subSegmentFormControl = new FormControl('');
        // this.subSubSegmentFormControl = new FormControl('');

        this.creditFormGroup = this.formBuilder.group({
            clientServiceManager: this.clientServiceManagerFormControl,
            location: this.locationFormControl,
            lineOfBusiness: this.lineOfBusinessFormControl,
            recruiter: this.recruiterFormControl,
            recruiterPercentage: this.recruiterPercentageFormControl,
            recruiterSecondary: this.recruiterSecondaryFormControl,
            recruiterSecondaryPercentage: this.recruiterSecondaryPercentageFormControl,
            recruiterTeam: this.recruiterTeamFormControl,
            recruiterOverride: this.recruiterOverrideFormControl,
            nonCommissionableRecruiter: this.nonCommissionableRecruiterFormControl,
            salesPerson: this.salesPersonFormControl,
            salesPersonPercentage: this.salesPersonPercentageFormControl,
            salesPersonSecondary: this.salesPersonSecondaryFormControl,
            salesPersonSecondaryPercentage: this.salesPersonSecondaryPercentageFormControl,
            salesTeam: this.salesTeamFormControl,
            salesTeamOverride: this.salesTeamOverrideFormControl,
            nonCommissionableSalesPerson: this.nonCommissionableSalesPersonFormControl,
            salesPersonOverride: this.salesPersonOverrideFormControl,
            strategicBusinessUnit: this.strategicBusinessUnitFormControl,
            shadowStrategicBusinessUnit: this.shadowStrategicBusinessUnitFormControl
            //subSegment: this.subSegmentFormControl
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
        return !this.creditFormGroup.get(field)?.valid && this.creditFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.creditFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.creditFormGroup.get(field);

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
                const control = this.creditFormGroup.get(field);
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
            case 'clientServiceManager': {
                this.allReviewData.assignmentTeamAddr.clientServiceManagerId = this.creditFormGroup.controls[formControlName].value;
                let clientServiceManager: any = this.clientServiceManagerList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.clientServiceManager = clientServiceManager;
                break;
            }
            case 'recruiter': {
                this.allReviewData.assignmentTeamAddr.recruiterId = this.creditFormGroup.controls[formControlName].value;
                let recruiter: any = this.recruiterList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.recruiter = recruiter;
                break;
            }
            case 'recruiterPercentage': {
                this.allReviewData.assignmentTeamAddr.recruiterPercentage = this.creditFormGroup.controls[formControlName].value;
                // let recruiterPercentage: any = this.recruiterPercentageList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                // this.allReviewData.assignmentTeamAddr.recruiterPercentage = recruiterPercentage;
                break;
            }
            case 'recruiterSecondary': {
                this.allReviewData.assignmentTeamAddr.recruiterSecondaryId = this.creditFormGroup.controls[formControlName].value;
                let recruiterSecondary: any = this.recruiterSecondaryList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.recruiterSecondary = recruiterSecondary;
                break;
            }
            case 'recruiterSecondaryPercentage': {
                this.allReviewData.assignmentTeamAddr.recruiterSecondaryPercentage = this.creditFormGroup.controls[formControlName].value;
                // let recruiterSecondaryPercentage: any = this.recruiterSecondaryPercentageList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                // this.allReviewData.assignmentTeamAddr.recruiterSecondaryPercentage = recruiterSecondaryPercentage;
                break;
            }
            case 'recruiterTeam': {
                this.allReviewData.assignmentTeamAddr.recruiterTeamId = this.creditFormGroup.controls[formControlName].value;
                let recruiterTeam: any = this.recruiterTeamList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.recruiterTeam = recruiterTeam;
                break;
            }
            case 'recruiterOverride': {
                this.allReviewData.assignmentTeamAddr.recruiterOverrideId = this.creditFormGroup.controls[formControlName].value;
                let recruiterOverride: any = this.recruiterOverrideList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.recruiterOverride = recruiterOverride;
                break;
            }
            case 'nonCommissionableRecruiter': {
                this.allReviewData.assignmentTeamAddr.nonCommissionableRecruiterId = this.creditFormGroup.controls[formControlName].value;
                let nonCommissionableRecruiter: any = this.noncommissionableRecList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.nonCommissionableRecruiter = nonCommissionableRecruiter;
                break;
            }
            case 'salesPersonOverride': {
                this.allReviewData.assignmentTeamAddr.salesPersonOverrideId = this.creditFormGroup.controls[formControlName].value;
                let salesPersonOverride: any = this.salesPersonOverrideList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.salesPersonOverride = salesPersonOverride;
                break;
            }
            case 'nonCommissionableSalesPerson': {
                this.allReviewData.assignmentTeamAddr.nonCommissionableSalesPersonId = this.creditFormGroup.controls[formControlName].value;
                let nonCommissionableSalesPerson: any = this.nonCommissionableSalesPersonList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.nonCommissionableSalesPerson = nonCommissionableSalesPerson;
                break;
            }
            case 'salesPerson': {
                this.allReviewData.assignmentTeamAddr.salesPersonId = this.creditFormGroup.controls[formControlName].value;
                let salesPerson: any = this.salesPersonList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.salesPerson = salesPerson;
                break;
            }
            case 'salesPersonPercentage': {
                this.allReviewData.assignmentTeamAddr.salesPersonPercentage = this.creditFormGroup.controls[formControlName].value;
                // let salesPersonPercentage: any = this.salesPersonPercentageList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                // this.allReviewData.assignmentTeamAddr.salesPersonPercentage = salesPersonPercentage;
                break;
            }
            case 'salesPersonSecondary': {
                this.allReviewData.assignmentTeamAddr.salesPersonSecondaryId = this.creditFormGroup.controls[formControlName].value;
                let salesPersonSecondary: any = this.salesPersonSecondaryList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.salesPersonSecondary = salesPersonSecondary;
                break;
            }
            case 'salesPersonSecondaryPercentage': {
                this.allReviewData.assignmentTeamAddr.salesPersonSecondaryPercentage = this.creditFormGroup.controls[formControlName].value;
                // let salesPersonSecondaryPercentage: any = this.salesPersonSecondaryPercentageList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                // this.allReviewData.assignmentTeamAddr.salesPersonSecondaryPercentage = salesPersonSecondaryPercentage;
                break;
            }
            case 'salesTeam': {
                this.allReviewData.assignmentTeamAddr.salesTeamId = this.creditFormGroup.controls[formControlName].value;
                let salesTeam: any = this.salesTeamList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.salesTeam = salesTeam;
                break;
            }
            case 'salesTeamOverride': {
                this.allReviewData.assignmentTeamAddr.salesTeamOverrideId = this.creditFormGroup.controls[formControlName].value;
                let salesTeamOverride: any = this.salesTeamOverrideList.find((i) => i.id === this.creditFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.salesTeamOverride = salesTeamOverride;
                break;
            }
            case 'strategicBusinessUnit': {
                this.allReviewData.assignment.sellingBusinessUnitName = this.creditFormGroup.controls[formControlName].value;
                break;
            }
            case 'shadowStrategicBusinessUnit': {
                this.allReviewData.assignment.shadowStrategicBusinessUnit = this.creditFormGroup.controls[formControlName].value;
                break;
            }
            case 'subSegment': {
                this.allReviewData.assignment.subSegment = this.creditFormGroup.controls[formControlName].value;
                break;
            }
            // case 'subSubSegment': {
            //     this.allReviewData.assignment.subSubSegment = this.creditFormGroup.controls[formControlName].value;
            //     break;
            // }
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.recruiterList = this.modelMapper.map(Recruiter, res.recruiter);
            this.recruiterPercentageList = this.modelMapper.map(RecruiterPercentage, res.recruiterPercentage);
            this.recruiterSecondaryList = this.modelMapper.map(RecruiterSecondary, res.recruiterSecondary);
            this.recruiterSecondaryPercentageList = this.modelMapper.map(RecruiterSecondaryPercentage, res.recruiterSecondaryPercentage);
            this.recruiterTeamList = this.modelMapper.map(RecruiterTeam, res.recruiterTeam);
            this.recruiterOverrideList = this.modelMapper.map(RecruiterOverride, res.recruiterOverride);
            this.salesPersonOverrideList = this.modelMapper.map(salesPersonOverride, res.salesPersonOverride);
            this.noncommissionableRecList = this.modelMapper.map(NonCommissionableRecruiter, res.nonCommissionableRecruiter);
            this.nonCommissionableSalesPersonList = this.modelMapper.map(nonCommissionableSalesPerson, res.nonCommissionableSalesPerson);
            this.salesPersonList = this.modelMapper.map(SalesPerson, res.salesPerson);
            this.salesPersonPercentageList = this.modelMapper.map(SalesPersonPercentage, res.salesPersonPercentage);
            this.salesPersonSecondaryList = this.modelMapper.map(SalesPersonSecondary, res.salesPersonSecondary);
            this.salesPersonSecondaryPercentageList = this.modelMapper.map(SalesPersonSecondaryPercentage, res.salesPersonSecondaryPercentage);
            this.salesTeamList = this.modelMapper.map(SalesTeam, res.salesTeam);
            this.salesTeamOverrideList = this.modelMapper.map(SalesTeamOverride, res.salesTeamOverride);
            this.clientServiceManagerList = this.modelMapper.map(ClientServiceManager, res.clientServiceManager);
            this.locationList = this.modelMapper.map(Location, res.location);

            this.prepareSectionData(reviewData);

            this.setFieldsToDisable(null);
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
                if (this.creditFormGroup.controls[attribute.attributeName]) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.creditFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.creditFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.creditFormGroup.removeControl(attribute.attributeName);
                    }
                }
            });

            this.creditFormGroup.updateValueAndValidity();
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.creditFormGroup && reviewData) {
            this.locationFormControl.setValue(reviewData.assignment && reviewData.assignment.location ? reviewData.assignment.location : '');
            this.lineOfBusinessFormControl.setValue(reviewData.assignment && reviewData.assignment.serviceLine ? reviewData.assignment.serviceLine : '');
            this.clientServiceManagerFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.clientServiceManagerId ? reviewData.assignmentTeamAddr.clientServiceManagerId : '');

            this.recruiterFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.recruiterId ? reviewData.assignmentTeamAddr.recruiterId : '');
            this.recruiterPercentageFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.recruiterPercentage ? reviewData.assignmentTeamAddr.recruiterPercentage : '');
            this.recruiterSecondaryFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.recruiterSecondaryId ? reviewData.assignmentTeamAddr.recruiterSecondaryId : '');
            this.recruiterSecondaryPercentageFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.recruiterSecondaryPercentage ? reviewData.assignmentTeamAddr.recruiterSecondaryPercentage : '');

            // this.recruiterTertiaryFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.recruiterTertiary ? reviewData.assignmentTeamAddr.recruiterTertiary : '');
            // this.recruiterTertiaryPercentageFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.recruiterTertiaryPercentage ? reviewData.assignmentTeamAddr.recruiterTertiaryPercentage : '');
            this.recruiterOverrideFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.recruiterOverrideId ? reviewData.assignmentTeamAddr.recruiterOverrideId : '');
            this.nonCommissionableRecruiterFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.nonCommissionableRecruiterId ? reviewData.assignmentTeamAddr.nonCommissionableRecruiterId : '');

            this.recruiterTeamFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.recruiterTeamId ? reviewData.assignmentTeamAddr.recruiterTeamId : '');

            this.salesPersonFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.salesPersonId ? reviewData.assignmentTeamAddr.salesPersonId : '');
            this.salesPersonPercentageFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.salesPersonPercentage ? reviewData.assignmentTeamAddr.salesPersonPercentage : '');
            this.salesPersonSecondaryFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.salesPersonSecondaryId ? reviewData.assignmentTeamAddr.salesPersonSecondaryId : '');
            this.salesPersonSecondaryPercentageFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.salesPersonSecondaryPercentage ? reviewData.assignmentTeamAddr.salesPersonSecondaryPercentage : '');

            // this.salesPersonTertiaryFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.salesPersonTertiary ? reviewData.assignmentTeamAddr.salesPersonTertiary : '');
            // this.salesPersonTertiaryPercentageFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.salesPersonTertiaryPercentage ? reviewData.assignmentTeamAddr.salesPersonTertiaryPercentage : '');

            this.salesTeamFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.salesTeamId ? reviewData.assignmentTeamAddr.salesTeamId : '');
            this.salesTeamOverrideFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.salesTeamOverrideId ? reviewData.assignmentTeamAddr.salesTeamOverrideId : '');
            this.salesPersonOverrideFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.salesPersonOverrideId ? reviewData.assignmentTeamAddr.salesPersonOverrideId : '');
            this.nonCommissionableSalesPersonFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.nonCommissionableSalesPersonId ? reviewData.assignmentTeamAddr.nonCommissionableSalesPersonId : '');

            this.strategicBusinessUnitFormControl.setValue(reviewData.assignment && reviewData.assignment.strategicBusinessUnit ? reviewData.assignment.strategicBusinessUnit : '');
            this.shadowStrategicBusinessUnitFormControl.setValue(reviewData.assignment && reviewData.assignment.shadowStrategicBusinessUnit ? reviewData.assignment.shadowStrategicBusinessUnit : '');
            this.subSegmentFormControl.setValue(reviewData.assignment && reviewData.assignment.subSegment ? reviewData.assignment.subSegment : '');
            // this.subSubSegmentFormControl.setValue(reviewData.assignment && reviewData.assignment.subSubSegment ? reviewData.assignment.subSubSegment : '');
        }
    }

    setFieldsToDisable(config: any) {
        // this.clientServiceManagerFormControl.disable();
        // // this.locationFormControl.disable();
        // this.recruiterFormControl.disable();
        // this.recruiterPercentageFormControl.disable();
        // this.recruiterSecondaryFormControl.disable();
        // this.recruiterSecondaryPercentageFormControl.disable();
        // // this.recruiterTertiaryFormControl.disable();
        // // this.recruiterTertiaryPercentageFormControl.disable();
        // this.recruiterOverrideFormControl.disable();
        // this.nonCommissionableRecruiterFormControl.disable();
        // this.recruiterTeamFormControl.disable();
        // this.salesPersonFormControl.disable();
        // this.salesPersonPercentageFormControl.disable();
        // this.salesPersonSecondaryFormControl.disable();
        // this.salesPersonSecondaryPercentageFormControl.disable();
        // // this.salesPersonTertiaryFormControl.disable();
        // // this.salesPersonTertiaryPercentageFormControl.disable();
        // this.salesTeamFormControl.disable();
        // this.salesTeamOverrideFormControl.disable();
        // this.salesPersonOverrideFormControl.disable();
        // this.nonCommissionableSalesPersonFormControl.disable();
        // this.strategicBusinessUnitFormControl.disable();
        // this.subSegmentFormControl.disable();
        // this.subSubSegmentFormControl.disable();
    }
}
