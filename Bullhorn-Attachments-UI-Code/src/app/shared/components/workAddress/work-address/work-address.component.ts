import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { IWorkingRemote, ICountry, IStatesList, IStates } from '../../../models/static-models/interface/i-business-dropdown.model';
import { StaticData } from './../../../services/load-static-data.service';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { WorkingRemote, Country } from '../../../models/static-models/business-model/business-dropdown.modes';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SetupDataService } from '../../../services/data-service/setup-data.service';
import { AttributePermission } from '../../../models/user-role-attributes/attribute-permission.model';
import { Feature } from '../../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../models/user-role-attributes/role.model';
import { LocalStorageVariables } from '../../../utils/local-storage-variable';
import { Section } from '../../../models/user-role-attributes/section.model';

@Component({
    selector: 'app-work-address',
    templateUrl: './work-address.component.html',
    styleUrl: './work-address.component.scss'
})
export class WorkAddressComponent implements OnInit {
    WorkerAddressForm!: FormGroup;
    readonly errorMessages = ErrorMessages;

    cityFormControl!: FormControl;
    countryFormControl!: FormControl;
    countyFormControl!: FormControl;
    zipFormControl!: FormControl;
    stateFormControl!: FormControl;
    streetAddressLine1FormControl!: FormControl;
    streetAddressLine2FormControl!: FormControl;
    // streetAddressLine3FormControl!: FormControl;
    workingRemoteFormControl!: FormControl;
    workaddrGoogleOverrideReasonFormControl!: FormControl;

    countryList: ICountry[] = [];

    stateList: IStates[] = [];
    stateConditionalList: IStatesList[] = [];

    workingRemoteList: IWorkingRemote[] = [];

    maxCityChar: string = 'City not allowed more than 250 Characters';
    maxCountryChar: string = 'Country not allowed more than 250 Characters';
    maxZipChar: string = 'Zip not allowed more than 250 Characters';
    maxStreetAddressLine1Char: string = 'Street Address Line 1 not allowed more than 250 Characters';
    maxStreetAddressLine2Char: string = 'Street Address Line 2 not allowed more than 250 Characters';
    // maxStreetAddressLine3Char: string = 'Street Address Line 3 not allowed more than 250 Characters';

    refs: DynamicDialogRef | undefined;

    validatedAddressList: any;
    invokedAddressVal: any;
    googleAddress: string = '';
    visible: boolean = false;
    googleAccepted: boolean = false;
    hiddenphybutton!: string;
    isGoogleValidationOverriden: boolean = false;
    geocodeStatusId!: number;
    geoSaveFlag: boolean = false;
    cursornot!: string;
    addrId: any;
    googleButtonText: string = 'Google Validate';
    googleValidateCheck: boolean = false;
    OverrideReasonFlag: boolean = false;

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
    sections!: Section[] | undefined | null;
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
                    this.sections = this.feature?.sections;
                    this.updateFormConfigurationBasedOnRoles();
                }
            }
        }
    }

    isSectionAvailable(sectionName: string): boolean {
        if (this.sections && this.sections.length > 0) {
            const section = this.sections.find((sec: Section) => sec.sectionName === sectionName);

            if (section) {
                return section.display;
            }
        }

        return false;
    }

    constructor(
        private formBuilder: FormBuilder,
        private mapperService: MapperService,
        private dataService: SetupDataService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.cityFormControl = new FormControl('', [Validators.maxLength(250)]);
        this.countryFormControl = new FormControl('', [Validators.maxLength(250)]);
        this.countyFormControl = new FormControl('');
        this.zipFormControl = new FormControl('', [Validators.maxLength(250)]);
        this.stateFormControl = new FormControl(null);
        this.streetAddressLine1FormControl = new FormControl('', [Validators.maxLength(250)]);
        this.streetAddressLine2FormControl = new FormControl('', [Validators.maxLength(250)]);
        // this.streetAddressLine3FormControl = new FormControl('', ([Validators.maxLength(250)]));
        this.workingRemoteFormControl = new FormControl(null);
        this.workaddrGoogleOverrideReasonFormControl = new FormControl('');

        this.WorkerAddressForm = this.formBuilder.group({
            workingRemote: this.workingRemoteFormControl,
            streetAddressLine1: this.streetAddressLine1FormControl,
            streetAddressLine2: this.streetAddressLine2FormControl,
            // streetAddressLine3: this.streetAddressLine3FormControl,
            state: this.stateFormControl,
            city: this.cityFormControl,
            county: this.countyFormControl,
            zip: this.zipFormControl,
            country: this.countryFormControl,
            workaddrGoogleOverrideReason: this.workaddrGoogleOverrideReasonFormControl
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
        return !this.WorkerAddressForm.get(field)?.valid && this.WorkerAddressForm.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.WorkerAddressForm.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.WorkerAddressForm.get(field);

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
                const control = this.WorkerAddressForm.get(field);
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

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.workingRemoteList = this.mapperService.map(WorkingRemote, res.workingRemote);
            this.countryList = this.mapperService.map(Country, res.country);

            let states: any = res.states;
            if (states) {
                this.stateList = states.map((item: IStates) => {
                    let stateList: any = item.statesList;
                    return {
                        countryCode: item.countryCode,
                        statesList: stateList.map((s: IStatesList) => {
                            return { stateCode: s.stateCode, stateName: s.stateName };
                        })
                    };
                });
            }

            this.prepareSectionData(reviewData);
        });
    }

    bindStateDropdownData(countryCode: string) {
        let selectedStateForCountry: any = this.stateList.find((x: any) => x.countryCode.includes(countryCode));
        let stateConditionalList: any = selectedStateForCountry ? selectedStateForCountry.statesList : [];
        this.stateConditionalList = stateConditionalList;
    }

    onFormChange(formControlName: string) {
        switch (formControlName) {
            case 'streetAddressLine1':
                this.allReviewData.assignmentTeamAddr.streetAddressLine1 = this.WorkerAddressForm.controls[formControlName].value;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                break;
            case 'streetAddressLine2':
                this.allReviewData.assignmentTeamAddr.streetAddressLine2 = this.WorkerAddressForm.controls[formControlName].value;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                break;
            // case 'streetAddressLine3':
            //     this.allReviewData.assignmentTeamAddr.streetAddressLine3 = this.WorkerAddressForm.controls[formControlName].value;
            //     break;
            case 'city':
                this.allReviewData.assignmentTeamAddr.city = this.WorkerAddressForm.controls[formControlName].value;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                break;
            case 'county':
                this.allReviewData.assignmentTeamAddr.county = this.WorkerAddressForm.controls[formControlName].value;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                break;
            case 'state':
                this.allReviewData.assignmentTeamAddr.stateId = this.WorkerAddressForm.controls[formControlName].value;
                let state: any = this.stateConditionalList.find((cs) => cs.stateCode === this.WorkerAddressForm.controls[formControlName].value)?.stateName;
                this.allReviewData.assignmentTeamAddr.state = state;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                break;
            case 'country':
                this.allReviewData.assignmentTeamAddr.countryId = this.WorkerAddressForm.controls[formControlName].value;
                let country: any = this.countryList.find((cs) => cs.id === this.WorkerAddressForm.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.country = country;
                this.bindStateDropdownData(this.WorkerAddressForm.controls[formControlName].value);
                this.allReviewData.assignmentTeamAddr.stateId = null;
                this.allReviewData.assignmentTeamAddr.state = null;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                this.stateFormControl.setValue(null);
                break;
            case 'zip':
                this.allReviewData.assignmentTeamAddr.zip = this.WorkerAddressForm.controls[formControlName].value;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                break;
            case 'workingRemote':
                this.allReviewData.assignmentTeamAddr.workingRemoteId = this.WorkerAddressForm.controls[formControlName].value;
                let workingRemote: any = this.workingRemoteList.find((wr) => wr.id === this.WorkerAddressForm.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.workingRemote = workingRemote;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                break;
            case 'workaddrGoogleOverrideReason':
                this.allReviewData.assignmentTeamAddr.workaddrGoogleOverrideReason = this.WorkerAddressForm.controls[formControlName].value;
                this.allReviewData.assignmentTeamAddr.workaddrIsGoogleValidated = 'Y';
                this.allReviewData.assignmentTeamAddr.workaddrGoogleOverrideInd = 'Y';
                // this.googleValidateCheck = false;
                this.googleButtonText = 'Google Address Overridden';
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
            Object.keys(this.WorkerAddressForm.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.WorkerAddressForm.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.WorkerAddressForm.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.WorkerAddressForm.removeControl(attribute.attributeName);
                    }
                }
            });

            this.WorkerAddressForm.updateValueAndValidity();
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.WorkerAddressForm && reviewData) {
            this.cityFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.city ? reviewData.assignmentTeamAddr.city : '');
            this.countryFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.countryId ? reviewData.assignmentTeamAddr.countryId : '');
            this.countyFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.county ? reviewData.assignmentTeamAddr.county : '');
            this.zipFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.zip ? reviewData.assignmentTeamAddr.zip : '');
            this.stateFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.stateId ? reviewData.assignmentTeamAddr.stateId : '');
            this.streetAddressLine1FormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.streetAddressLine1 ? reviewData.assignmentTeamAddr.streetAddressLine1 : '');
            this.streetAddressLine2FormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.streetAddressLine2 ? reviewData.assignmentTeamAddr.streetAddressLine2 : '');
            // this.streetAddressLine3FormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.streetAddressLine3 ? reviewData.assignmentTeamAddr.streetAddressLine3 : '');
            this.workingRemoteFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.workingRemoteId ? reviewData.assignmentTeamAddr.workingRemoteId : '');

            if (reviewData.assignmentTeamAddr.countryId) {
                this.bindStateDropdownData(reviewData.assignmentTeamAddr.countryId);
            }

            if (reviewData.assignmentTeamAddr.workaddrIsGoogleValidated == 'Y' && reviewData.assignmentTeamAddr.workaddrGoogleOverrideInd == 'N') {
                this.googleValidateCheck = true;
                this.googleButtonText = 'Google Validated';
            }
            if (reviewData.assignmentTeamAddr.workaddrGoogleOverrideInd == 'Y') {
                this.workaddrGoogleOverrideReasonFormControl.setValue(reviewData.assignmentTeamAddr.workaddrGoogleOverrideReason ? reviewData.assignmentTeamAddr.workaddrGoogleOverrideReason : '');
                this.googleValidateCheck = true;
                this.OverrideReasonFlag = true;
                this.googleButtonText = 'Google Address Overridden';
            }
        }
    }

    updateGoogleValidateButton() {
        this.googleValidateCheck = false;
        this.googleButtonText = 'Google Validate';
        this.allReviewData.assignmentTeamAddr.workaddrIsGoogleValidated = 'N';
    }

    revomeOverrideReason() {
        this.OverrideReasonFlag = false;
        this.workaddrGoogleOverrideReasonFormControl.removeValidators([Validators.required]);
        this.WorkerAddressForm.addControl('workaddrGoogleOverrideReason', this.workaddrGoogleOverrideReasonFormControl);
        this.workaddrGoogleOverrideReasonFormControl.setValue(null);
    }

    setFieldsToDisable(config: any) {}

    showDialog() {
        this.visible = !this.visible;
    }

    closeAddressWindow(isVisible: any) {
        this.visible = isVisible;
    }

    selectgoogleresults(ele: number) {
        //---> Selecting Google Results
        this.setGeoCodeStatusId();
        let addressObj;
        if (this.invokedAddressVal === 'Home') {
            this.geoSaveFlag = true;
            this.workaddrGoogleOverrideReasonFormControl.removeValidators([Validators.required]);
            this.WorkerAddressForm.addControl('workaddrGoogleOverrideReason', this.workaddrGoogleOverrideReasonFormControl);
            this.allReviewData.assignmentTeamAddr.workaddrIsGoogleValidated = 'Y';
            this.allReviewData.assignmentTeamAddr.workaddrGoogleOverrideInd = 'N';
            this.workaddrGoogleOverrideReasonFormControl.setValue(null);
            addressObj = this.prepareSelectedGoogleAddressObj(this.validatedAddressList[ele]);
            this.setWorkerAddressFormFieldValue(addressObj);
            this.WorkerAddressForm.markAllAsTouched();
            // this.removeOverWritefield();
            this.googleAccepted = true;
            this.hiddenphybutton = 'none';
            this.visible = false;
            this.cursornot = 'not-allowed';
            this.OverrideReasonFlag = false;
            this.googleValidateCheck = true;
            this.googleButtonText = 'Google Validated';
        }
    }

    setGeoCodeStatusId() {
        if (this.validatedAddressList[0].statusMessage == 'Success' && this.validatedAddressList.length == 1) {
            if (this.validatedAddressList[0].partialMatch == false) {
                this.geocodeStatusId = 1;
            } else {
                this.geocodeStatusId = 2;
            }
        } else if (this.validatedAddressList[0].statusMessage == 'Success' && this.validatedAddressList[1].statusMessage == 'Success' && this.validatedAddressList.length > 1) {
            if (this.validatedAddressList[0].partialMatch == true && this.validatedAddressList[1].partialMatch == true) {
                this.geocodeStatusId = 3;
            }
        } else if (this.validatedAddressList[0].statusMessage == 'Failed' && this.validatedAddressList.length > 0) {
            this.geocodeStatusId = 4;
        } else if (this.validatedAddressList.length == 0) {
            this.geocodeStatusId = 5;
        } else if (this.validatedAddressList[0].statusMessage == 'Success' && this.validatedAddressList.length == 1) {
            if (this.validatedAddressList[0].partialMatch == false) {
                if (this.validatedAddressList[0].zipcode.length == 9) {
                    this.geocodeStatusId = 8;
                } else {
                    this.geocodeStatusId = 7;
                }
            }
        } else {
            this.geocodeStatusId = 6;
        }
    }

    prepareSelectedGoogleAddressObj(addressList: any) {
        let address = '';
        let countryId = '';
        let state_Id = '';
        if (addressList.streetNumber) {
            address = addressList.streetNumber.toString().trim();
        }
        if (addressList.streetNumber && addressList.route != null && addressList.route != '') {
            address = addressList.streetNumber.toString().trim() + ' ' + addressList.route.toString().trim();
        }
        if (addressList.streetNumber == null && addressList.route == null) {
            address = this.streetAddressLine1FormControl.value;
        }
        if (addressList.streetNumber == null && addressList.route != null && addressList.route != '') {
            address = addressList.route.toString().trim();
        }
        if (addressList.country) {
            for (let element of this.countryList) {
                if (element.name === addressList.country) {
                    countryId = element.id;
                    this.bindStateDropdownData(element.id);
                    break;
                }
            }
        }
        if (addressList.state) {
            for (let element of this.stateConditionalList) {
                if (element.stateName.toLowerCase() == addressList.state.toLowerCase()) {
                    state_Id = element.stateCode;
                    break;
                }
            }
        }
        let addressObj = {
            countryID: countryId,
            countryName: addressList.country,
            stateID: state_Id,
            stateName: addressList.state,
            staddress1: address,
            staddress2: '',
            county: addressList.county ? addressList.county : '',
            cityname: addressList.city ? addressList.city : '',
            zip: addressList.zipcode ? addressList.zipcode : ''
        };
        return addressObj;
    }

    selectenteredaddress(ele: any) {
        //-----> Selecting Entered Address
        if (this.invokedAddressVal === 'Home') {
            this.workaddrGoogleOverrideReasonFormControl.setValidators([Validators.required]);
            this.WorkerAddressForm.addControl('workaddrGoogleOverrideReason', this.workaddrGoogleOverrideReasonFormControl);
            this.allReviewData.assignmentTeamAddr.workaddrIsGoogleValidated = 'Y';
            this.allReviewData.assignmentTeamAddr.workaddrGoogleOverrideInd = 'N';
            this.workaddrGoogleOverrideReasonFormControl.setValue(this.reviewData.assignmentTeamAddr.workaddrGoogleOverrideReason);
            this.OverrideReasonFlag = true;
            this.googleAccepted = false;
            this.hiddenphybutton = 'none';
            this.isGoogleValidationOverriden = true;
            this.visible = false;
            this.googleValidateCheck = true;
            this.googleButtonText = 'Google Address Overridden';
        }
    }

    saveGeoCodeStatus(addressId: number, addressFormGroupIndex?: any, overrideReasonVal?: any) {
        let paramObj = {
            overrideReason: overrideReasonVal,
            geocodeStatusId: String(this.geocodeStatusId)
            // appUserId: this.appUserId
        };
    }

    validateaddress(callingaddress: any) {
        //--------> GOOGLE Validation
        this.visible = true;
        this.invokedAddressVal = callingaddress;
        this.googleAddress = '';
        if (this.streetAddressLine1FormControl.value) {
            this.googleAddress = this.googleAddress + this.streetAddressLine1FormControl.value;
        }
        if (this.streetAddressLine2FormControl.value) {
            this.googleAddress = this.googleAddress + ',' + this.streetAddressLine2FormControl.value;
        }
        // if (this.streetAddressLine3FormControl.value) {
        //     this.googleAddress = this.googleAddress + ',' + this.streetAddressLine3FormControl.value;
        // }
        if (this.cityFormControl.value) {
            this.googleAddress = this.googleAddress + ',' + this.cityFormControl.value;
        }
        if (this.countyFormControl.value) {
            this.googleAddress = this.googleAddress + ',' + this.countyFormControl.value;
        }
        if (this.stateFormControl.value) {
            this.googleAddress = this.googleAddress + ',' + this.stateFormControl.value;
        }
        if (this.countryFormControl.value) {
            this.googleAddress = this.googleAddress + ',' + this.countryFormControl.value;
        }
        if (this.zipFormControl.value) {
            this.googleAddress = this.googleAddress + ',' + this.zipFormControl.value;
        }

        let addressVal = this.googleAddress.replace('#', '');

        const asgmtId: any = this.allReviewData?.assignment?.asgmtId ? this.allReviewData?.assignment?.asgmtId : '123';

        this.dataService.getGoogleValidationAddress(addressVal, asgmtId).subscribe((res: any) => {
            console.log(res);
            this.validatedAddressList = res[asgmtId];
        });
    }

    setWorkerAddressFormFieldValue(addressModel: any) {
        if (this.WorkerAddressForm && addressModel) {
            this.streetAddressLine1FormControl.setValue(addressModel.staddress1 ? addressModel.staddress1 : '');
            this.allReviewData.assignmentTeamAddr.streetAddressLine1 = addressModel.staddress1 ? addressModel.staddress1 : '';
            this.streetAddressLine2FormControl.setValue(addressModel.staddress2 ? addressModel.staddress2 : '');
            this.allReviewData.assignmentTeamAddr.streetAddressLine2 = addressModel.staddress2 ? addressModel.staddress2 : '';
            // this.streetAddressLine3FormControl.setValue(addressModel.staddress3 ? addressModel.staddress3 : '');
            // this.allReviewData.assignmentTeamAddr.streetAddressLine3 = addressModel.staddress3 ? addressModel.staddress3 : '';
            this.cityFormControl.setValue(addressModel.cityname ? addressModel.cityname : '');
            this.allReviewData.assignmentTeamAddr.city = addressModel.cityname ? addressModel.cityname : '';
            this.countyFormControl.setValue(addressModel.county ? addressModel.county : '');
            this.allReviewData.assignmentTeamAddr.county = addressModel.county ? addressModel.county : '';
            this.stateFormControl.setValue(addressModel.stateID ? addressModel.stateID : '');
            this.allReviewData.assignmentTeamAddr.stateId = addressModel.stateID ? addressModel.stateID : '';
            this.allReviewData.assignmentTeamAddr.state = addressModel.stateName ? addressModel.stateName : '';
            this.countryFormControl.setValue(addressModel.countryID ? addressModel.countryID : '');
            this.allReviewData.assignmentTeamAddr.countryId = addressModel.countryID ? addressModel.countryID : '';
            this.allReviewData.assignmentTeamAddr.country = addressModel.countryName ? addressModel.countryName : '';
            this.zipFormControl.setValue(addressModel.zip ? addressModel.zip : '');
            this.allReviewData.assignmentTeamAddr.zip = addressModel.zip ? addressModel.zip : '';
        }
    }

    prepareAddressObjToSave(addressFormGroup: any, addressId?: any) {
        let addressObj = {
            address: {
                adrs1: addressFormGroup.homeAddressLine1,
                adrs2: addressFormGroup.homeAddressLine2,
                city: addressFormGroup.homeCity,
                county: addressFormGroup.homeCounty,
                zip: addressFormGroup.homePostalCode,
                stateID: addressFormGroup.homeStateProvince,
                countryID: addressFormGroup.homeCountry,
                postalAddressType: addressFormGroup.addressType,
                addressId: addressId
            }
        };
        // this.overWriteReasonFormControl?.setValue('');
        // this.overWriteReasonFormControl?.setErrors(null);
        return addressObj;
    }

    removeOverWritefield() {
        this.WorkerAddressForm.removeControl('overWriteReason');
    }

    disableGoogleValidate(): boolean {
        return this.WorkerAddressForm.valid;
    }
}
