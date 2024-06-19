import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../models/review/placement-review-data.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SetupDataService } from '../../services/data-service/setup-data.service';
import { StaticApiRes } from '../../utils/static-initial-api';
import { StaticData } from '../../services/load-static-data.service';
import { Country } from '../../models/static-models/business-model/business-dropdown.modes';
import { MapperService } from '../../services/auto-mapper/mapper-service';
import { ICountry, IStates, IStatesList } from '../../models/static-models/interface/i-business-dropdown.model';
import { Feature } from '../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../models/user-role-attributes/role.model';
import { AttributePermission } from '../../models/user-role-attributes/attribute-permission.model';
import { LocalStorageVariables } from '../../utils/local-storage-variable';
import { Section } from '../../models/user-role-attributes/section.model';

@Component({
    selector: 'app-homeaddress',
    templateUrl: './homeaddress.component.html',
    styleUrl: './homeaddress.component.scss'
})
export class HomeaddressComponent implements OnInit {
    homeAddressFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    homeAddressLine1FormControl!: FormControl;
    homeAddressLine2FormControl!: FormControl;
    // homeAddressLine3FormControl!: FormControl;
    homeCityFormControl!: FormControl;
    homeCountyFormControl!: FormControl;
    homeStateProvinceFormControl!: FormControl;
    homeCountryFormControl!: FormControl;
    homePostalCodeFormControl!: FormControl;
    homeOverrideReasonFormControl!: FormControl;

    homeStateProvinceList: IStates[] = [];
    homeStateProvinceConditionalList: IStatesList[] = [];
    homeCountryList: ICountry[] = [];

    allReviewData!: PlacementReviewDataModel;
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

    displayFieldCss(field: string) {
        return {
            'has-error': this.isValid(field),
            'has-feedback': this.isValid(field)
        };
    }

    isValid(field: string) {
        return !this.homeAddressFormGroup.get(field)?.valid && this.homeAddressFormGroup.get(field)?.touched;
    }

    constructor(
        private formBuilder: FormBuilder,
        private dataService: SetupDataService,
        private mapperServie: MapperService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.homeAddressLine1FormControl = new FormControl('');
        this.homeAddressLine2FormControl = new FormControl('');
        // this.homeAddressLine3FormControl = new FormControl('');
        this.homeCityFormControl = new FormControl('');
        this.homeCountyFormControl = new FormControl('');
        this.homeStateProvinceFormControl = new FormControl('');
        this.homeCountryFormControl = new FormControl('');
        this.homePostalCodeFormControl = new FormControl('');
        this.homeOverrideReasonFormControl = new FormControl('');

        this.homeAddressFormGroup = this.formBuilder.group({
            homeAddressLine1: this.homeAddressLine1FormControl,
            homeAddressLine2: this.homeAddressLine2FormControl,
            // homeAddressLine3: this.homeAddressLine3FormControl,
            homeCity: this.homeCityFormControl,
            homeCounty: this.homeCountyFormControl,
            homeStateProvince: this.homeStateProvinceFormControl,
            homeCountry: this.homeCountryFormControl,
            homePostalCode: this.homePostalCodeFormControl,
            homeOverrideReason: this.homeOverrideReasonFormControl
        });
    }

    ngOnInit() {}

    onFormChange(formControlName: string) {
        switch (formControlName) {
            case 'homeAddressLine1': {
                this.allReviewData.person.homeAddressLine1 = this.homeAddressFormGroup.controls[formControlName].value;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                break;
            }
            case 'homeAddressLine2': {
                this.allReviewData.person.homeAddressLine2 = this.homeAddressFormGroup.controls[formControlName].value;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                break;
            }
            // case 'homeAddressLine3': {
            //     this.allReviewData.person.homeAddressLine3 = this.homeAddressFormGroup.controls[formControlName].value;
            //     break;
            // }
            case 'homeCity': {
                this.allReviewData.person.homeCity = this.homeAddressFormGroup.controls[formControlName].value;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                break;
            }
            case 'homeCounty': {
                this.allReviewData.person.homeCounty = this.homeAddressFormGroup.controls[formControlName].value;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                break;
            }
            case 'homeStateProvince': {
                this.allReviewData.person.homeStateProvinceId = this.homeAddressFormGroup.controls[formControlName].value;
                let homestateProvince: any = this.homeStateProvinceConditionalList.find((s) => s.stateCode === this.homeAddressFormGroup.controls[formControlName].value)?.stateName;
                this.allReviewData.person.homeStateProvince = homestateProvince;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                break;
            }
            case 'homeCountry': {
                this.allReviewData.person.homeCountryId = this.homeAddressFormGroup.controls[formControlName].value;
                let homeCountry: any = this.homeCountryList.find((c) => c.id === this.homeAddressFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.person.homeCountry = homeCountry;
                this.bindStateDropdownData(this.homeAddressFormGroup.controls[formControlName].value);
                this.allReviewData.person.homeStateProvinceId = null;
                this.allReviewData.person.homeStateProvince = null;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                this.homeStateProvinceFormControl.reset();
                break;
            }
            case 'homePostalCode': {
                this.allReviewData.person.homePostalCode = this.homeAddressFormGroup.controls[formControlName].value;
                if (this.googleButtonText == 'Google Address Overridden') {
                    this.revomeOverrideReason();
                }
                this.updateGoogleValidateButton();
                break;
            }
            case 'homeOverrideReason': {
                this.allReviewData.person.homeaddrGoogleOverrideReason = this.homeAddressFormGroup.controls[formControlName].value;
                this.allReviewData.person.homeaddrIsGoogleValidated = 'Y';
                this.allReviewData.person.homeaddrGoogleOverrideInd = 'Y';
                // this.googleValidateCheck = false;
                this.googleButtonText = 'Google Address Overridden';
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
            Object.keys(this.homeAddressFormGroup.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.homeAddressFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.homeAddressFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.homeAddressFormGroup.removeControl(attribute.attributeName);
                    }
                }
            });

            this.homeAddressFormGroup.updateValueAndValidity();
        }
    }

    updateGoogleValidateButton() {
        this.googleValidateCheck = false;
        this.googleButtonText = 'Google Validate';
        this.allReviewData.person.homeaddrIsGoogleValidated = 'N';
    }

    revomeOverrideReason() {
        this.OverrideReasonFlag = false;
        this.homeOverrideReasonFormControl.removeValidators([Validators.required]);
        this.homeAddressFormGroup.addControl('homeOverrideReason', this.homeOverrideReasonFormControl);
        this.allReviewData.person.homeaddrGoogleOverrideReason = null;
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.homeCountryList = this.mapperServie.map(Country, res.country);

            let states: any = res.states;
            if (states) {
                this.homeStateProvinceList = states.map((item: IStates) => {
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
        let selectedStateForCountry: any = this.homeStateProvinceList.find((x: any) => x.countryCode.includes(countryCode));
        let stateProvinceConditionalList: any = selectedStateForCountry ? selectedStateForCountry.statesList : [];
        this.homeStateProvinceConditionalList = stateProvinceConditionalList;
    }

    showDialog() {
        this.visible = !this.visible;
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.homeAddressFormGroup && reviewData && reviewData.person) {
            this.homeAddressLine1FormControl.setValue(reviewData.person.homeAddressLine1 ? reviewData.person.homeAddressLine1 : '');
            this.homeAddressLine2FormControl.setValue(reviewData.person.homeAddressLine2 ? reviewData.person.homeAddressLine2 : '');
            // this.homeAddressLine3FormControl.setValue(reviewData.person.homeAddressLine3 ? reviewData.person.homeAddressLine3 : '');
            this.homeCityFormControl.setValue(reviewData.person.homeCity ? reviewData.person.homeCity : '');
            this.homeCountyFormControl.setValue(reviewData.person.homeCounty ? reviewData.person.homeCounty : '');
            this.homeStateProvinceFormControl.setValue(reviewData.person.homeStateProvinceId ? reviewData.person.homeStateProvinceId : '');
            this.homeCountryFormControl.setValue(reviewData.person.homeCountryId ? reviewData.person.homeCountryId : '');
            this.homePostalCodeFormControl.setValue(reviewData.person.homePostalCode ? reviewData.person.homePostalCode : '');

            if (reviewData.person.homeCountryId) {
                this.bindStateDropdownData(reviewData.person.homeCountryId);
            }
            if (reviewData.person.homeaddrIsGoogleValidated == 'Y' && reviewData.person.homeaddrGoogleOverrideInd == 'N') {
                this.googleValidateCheck = true;
                this.googleButtonText = 'Google Validated';
            }
            if (reviewData.person.homeaddrGoogleOverrideInd == 'Y') {
                this.homeOverrideReasonFormControl.setValue(reviewData.person.homeaddrGoogleOverrideReason ? reviewData.person.homeaddrGoogleOverrideReason : '');
                this.googleValidateCheck = true;
                this.OverrideReasonFlag = true;
                this.googleButtonText = 'Google Address Overridden';
            }

            this.addrId = reviewData.person.homeAddressId;
        }
    }

    validateAllFormFields() {
        var fieldsControls = this.homeAddressFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.homeAddressFormGroup.get(field);

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
                const control = this.homeAddressFormGroup.get(field);
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

    closeAddressWindow(isVisible: any) {
        this.visible = isVisible;
    }

    setFieldsToDisable(config: any) {}

    selectgoogleresults(ele: number) {
        //---> Selecting Google Results
        this.setGeoCodeStatusId();
        let addressObj;
        if (this.invokedAddressVal === 'Home') {
            this.geoSaveFlag = true;
            this.allReviewData.person.homeaddrIsGoogleValidated = 'Y';
            this.allReviewData.person.homeaddrGoogleOverrideInd = 'N';
            this.homeOverrideReasonFormControl.removeValidators([Validators.required]);
            this.homeAddressFormGroup.addControl('homeOverrideReason', this.homeOverrideReasonFormControl);
            this.allReviewData.person.homeaddrGoogleOverrideReason = null;
            addressObj = this.prepareSelectedGoogleAddressObj(this.validatedAddressList[ele]);
            this.setHomeFormFieldValue(addressObj);
            this.homeAddressFormGroup.markAllAsTouched();
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
            address = this.homeAddressLine1FormControl.value;
        }
        if (addressList.streetNumber == null && addressList.route != null && addressList.route != '') {
            address = addressList.route.toString().trim();
        }
        if (addressList.country) {
            for (let element of this.homeCountryList) {
                if (element.name === addressList.country) {
                    countryId = element.id;
                    this.bindStateDropdownData(element.id);
                    break;
                }
            }
        }
        if (addressList.state) {
            for (let element of this.homeStateProvinceConditionalList) {
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
            this.homeOverrideReasonFormControl.setValidators([Validators.required]);
            this.homeAddressFormGroup.addControl('homeOverrideReason', this.homeOverrideReasonFormControl);
            this.allReviewData.person.homeaddrIsGoogleValidated = 'Y';
            this.allReviewData.person.homeaddrGoogleOverrideInd = 'Y';
            this.homeOverrideReasonFormControl.setValue(this.reviewData.person.homeaddrGoogleOverrideReason);
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
        if (this.homeAddressLine1FormControl.value) {
            this.googleAddress = this.googleAddress + this.homeAddressLine1FormControl.value;
        }
        if (this.homeAddressLine2FormControl.value) {
            this.googleAddress = this.googleAddress + ',' + this.homeAddressLine2FormControl.value;
        }
        // if (this.homeAddressLine3FormControl.value) {
        //     this.googleAddress = this.googleAddress + ',' + this.homeAddressLine3FormControl.value;
        // }
        if (this.homeCityFormControl.value) {
            this.googleAddress = this.googleAddress + ',' + this.homeCityFormControl.value;
        }
        if (this.homeCountyFormControl.value) {
            this.googleAddress = this.googleAddress + ',' + this.homeCountyFormControl.value;
        }
        if (this.homeStateProvinceFormControl.value) {
            this.googleAddress = this.googleAddress + ',' + this.homeStateProvinceFormControl.value;
        }
        if (this.homeCountryFormControl.value) {
            this.googleAddress = this.googleAddress + ',' + this.homeCountryFormControl.value;
        }
        if (this.homePostalCodeFormControl.value) {
            this.googleAddress = this.googleAddress + ',' + this.homePostalCodeFormControl.value;
        }

        let addressVal = this.googleAddress.replace('#', '');

        const asgmtId: any = this.allReviewData?.assignment?.asgmtId ? this.allReviewData?.assignment?.asgmtId : '123';

        this.dataService.getGoogleValidationAddress(addressVal, asgmtId).subscribe((res: any) => {
            console.log(res);
            this.validatedAddressList = res[asgmtId];
        });
    }

    setHomeFormFieldValue(addressModel: any) {
        if (this.homeAddressFormGroup && addressModel) {
            this.homeAddressLine1FormControl.setValue(addressModel.staddress1 ? addressModel.staddress1 : '');
            this.allReviewData.person.homeAddressLine1 = addressModel.staddress1 ? addressModel.staddress1 : '';
            this.homeAddressLine2FormControl.setValue(addressModel.staddress2 ? addressModel.staddress2 : '');
            this.allReviewData.person.homeAddressLine2 = addressModel.staddress2 ? addressModel.staddress2 : '';
            // this.homeAddressLine3FormControl.setValue(addressModel.staddress3 ? addressModel.staddress3 : '');
            // this.allReviewData.person.homeAddressLine3 = addressModel.staddress3 ? addressModel.staddress3 : '';
            this.homeCityFormControl.setValue(addressModel.cityname ? addressModel.cityname : '');
            this.allReviewData.person.homeCity = addressModel.cityname ? addressModel.cityname : '';
            this.homeCountyFormControl.setValue(addressModel.county ? addressModel.county : '');
            this.allReviewData.person.homeCounty = addressModel.county ? addressModel.county : '';
            this.homeStateProvinceFormControl.setValue(addressModel.stateID ? addressModel.stateID : '');
            this.allReviewData.person.homeStateProvinceId = addressModel.stateID ? addressModel.stateID : '';
            this.allReviewData.person.homeStateProvince = addressModel.stateName ? addressModel.stateName : '';
            this.homeCountryFormControl.setValue(addressModel.countryID ? addressModel.countryID : '');
            this.allReviewData.person.homeCountryId = addressModel.countryID ? addressModel.countryID : '';
            this.allReviewData.person.homeCountry = addressModel.countryName ? addressModel.countryName : '';
            this.homePostalCodeFormControl.setValue(addressModel.zip ? addressModel.zip : '');
            this.allReviewData.person.homePostalCode = addressModel.zip ? addressModel.zip : '';
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
        this.homeOverrideReasonFormControl?.setValue('');
        this.homeOverrideReasonFormControl?.setErrors(null);
        return addressObj;
    }

    removeOverWritefield() {
        this.homeAddressFormGroup.removeControl('overWriteReason');
    }

    disableGoogleValidate(): boolean {
        return this.homeAddressFormGroup.valid;
    }
}
