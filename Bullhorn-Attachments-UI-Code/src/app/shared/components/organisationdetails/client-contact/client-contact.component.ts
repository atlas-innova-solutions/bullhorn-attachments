import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { ICountry, IStates, IStatesList } from '../../../models/static-models/interface/i-business-dropdown.model';
import { StaticData } from '../../../services/load-static-data.service';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { MapperService } from '../../../services/auto-mapper/mapper-service';
import { Country } from '../../../models/static-models/business-model/business-dropdown.modes';
import { ErrorMessages } from '../../../utils/error-messages.constant';

@Component({
    selector: 'app-client-contact',
    templateUrl: './client-contact.component.html',
    styleUrl: './client-contact.component.scss'
})
export class ClientContactComponent implements OnInit {
    readonly errorMessages = ErrorMessages;

    clientcontactFormGroup!: FormGroup;

    contactTypeFormControl!: FormControl;
    contactNameFormControl!: FormControl;
    contactEmailFormControl!: FormControl;
    contactAddressLine1FormControl!: FormControl;
    contactAddressLine2FormControl!: FormControl;
    contactCityFormControl!: FormControl;
    contactStateProvinceFormControl!: FormControl;
    contactZipFormControl!: FormControl;
    contactCountryFormControl!: FormControl;

    contactStateProvinceList: IStates[] = [];
    contactStateProvinceConditionalList: IStatesList[] = [];

    contactCountryList: ICountry[] = [];

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

    constructor(
        private formBuilder: FormBuilder,
        private mapperService: MapperService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.contactTypeFormControl = new FormControl('');
        this.contactNameFormControl = new FormControl('');
        this.contactEmailFormControl = new FormControl('', ([Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$')]));
        this.contactAddressLine1FormControl = new FormControl('');
        this.contactAddressLine2FormControl = new FormControl('');
        this.contactCityFormControl = new FormControl('');
        this.contactStateProvinceFormControl = new FormControl('');
        this.contactZipFormControl = new FormControl('');
        this.contactCountryFormControl = new FormControl('');

        this.clientcontactFormGroup = this.formBuilder.group({
            contactType: this.contactTypeFormControl,
            contactName: this.contactNameFormControl,
            contactEmail: this.contactEmailFormControl,
            contactAddressLine1: this.contactAddressLine1FormControl,
            contactAddressLine2: this.contactAddressLine2FormControl,
            contactCity: this.contactCityFormControl,
            contactStateProvince: this.contactStateProvinceFormControl,
            contactZip: this.contactZipFormControl,
            contactCountry: this.contactCountryFormControl
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
        return !this.clientcontactFormGroup.get(field)?.valid && this.clientcontactFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.clientcontactFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.clientcontactFormGroup.get(field);

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
                const control = this.clientcontactFormGroup.get(field);
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
        const validator = (control && control?.validator) ? control.validator({} as AbstractControl) : null;
        if (!validator) {
            return true;
        }
       
        return validator && validator.required && control?.value;
    }

    onFormChange(formControlName: string) {
        switch (formControlName) {
            case 'contactType': {
                this.allReviewData.assignmentTeamAddr.contactType = this.clientcontactFormGroup.controls[formControlName].value;
                break;
            }
            case 'contactName': {
                this.allReviewData.assignmentTeamAddr.contactName = this.clientcontactFormGroup.controls[formControlName].value;
                break;
            }
            case 'contactEmail': {
                this.allReviewData.assignmentTeamAddr.contactEmail = this.clientcontactFormGroup.controls[formControlName].value;
                break;
            }
            case 'contactAddressLine1': {
                this.allReviewData.assignmentTeamAddr.contactAddressLine1 = this.clientcontactFormGroup.controls[formControlName].value;
                break;
            }
            case 'contactAddressLine2': {
                this.allReviewData.assignmentTeamAddr.contactAddressLine2 = this.clientcontactFormGroup.controls[formControlName].value;
                break;
            }
            case 'contactCity': {
                this.allReviewData.assignmentTeamAddr.contactCity = this.clientcontactFormGroup.controls[formControlName].value;
                break;
            }
            case 'contactStateProvince': {
                this.allReviewData.assignmentTeamAddr.contactStateProvinceId = this.clientcontactFormGroup.controls[formControlName].value;
                let contactStateProvice: any = this.contactStateProvinceConditionalList.find(cs => cs.stateCode === this.clientcontactFormGroup.controls[formControlName].value)?.stateName;
                this.allReviewData.assignmentTeamAddr.contactStateProvince = contactStateProvice;
                break;
            }
            case 'contactZip': {
                this.allReviewData.assignmentTeamAddr.contactZip = this.clientcontactFormGroup.controls[formControlName].value;
                break;
            }
            case 'contactCountry': {
                this.allReviewData.assignmentTeamAddr.contactCountryId = this.clientcontactFormGroup.controls[formControlName].value;
                let contactCountry: any = this.contactCountryList.find(cs => cs.id === this.clientcontactFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignmentTeamAddr.contactCountry = contactCountry;
                this.bindStateDropdownData(this.clientcontactFormGroup.controls[formControlName].value);
                this.allReviewData.assignmentTeamAddr.contactStateProvinceId = null;
                this.allReviewData.assignmentTeamAddr.contactStateProvince = null;
                this.contactStateProvinceFormControl.setValue(null);
                break;
            }
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.contactCountryList = this.mapperService.map(Country, res.country);

            let states: any = res.states;
            if (states) {
                this.contactStateProvinceList = states.map((item: IStates) => {
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
        let selectedStateForCountry: any = this.contactStateProvinceList.find((x: any) => x.countryCode.includes(countryCode));
        let stateProvinceConditionalList: any = selectedStateForCountry ? selectedStateForCountry.statesList : [];
        this.contactStateProvinceConditionalList = stateProvinceConditionalList;
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.clientcontactFormGroup && reviewData) {
            this.contactTypeFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.contactType ? reviewData.assignmentTeamAddr.contactType : '');
            this.contactNameFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.contactName ? reviewData.assignmentTeamAddr.contactName : '');
            this.contactEmailFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.contactEmail ? reviewData.assignmentTeamAddr.contactEmail : '');
            this.contactAddressLine1FormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.contactAddressLine1 ? reviewData.assignmentTeamAddr.contactAddressLine1 : '');
            this.contactAddressLine2FormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.contactAddressLine2 ? reviewData.assignmentTeamAddr.contactAddressLine2 : '');
            this.contactCityFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.contactCity ? reviewData.assignmentTeamAddr.contactCity : '');
            this.contactStateProvinceFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.contactStateProvinceId ? reviewData.assignmentTeamAddr.contactStateProvinceId : '');
            this.contactZipFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.contactZip ? reviewData.assignmentTeamAddr.contactZip : '');
            this.contactCountryFormControl.setValue(reviewData.assignmentTeamAddr && reviewData.assignmentTeamAddr.contactCountryId ? reviewData.assignmentTeamAddr.contactCountryId : '');

            if (reviewData.assignmentTeamAddr.contactCountry) {
                this.bindStateDropdownData(reviewData.assignmentTeamAddr.contactCountry);
            }
        }
    }

    setFieldsToDisable(config: any) {}
}
