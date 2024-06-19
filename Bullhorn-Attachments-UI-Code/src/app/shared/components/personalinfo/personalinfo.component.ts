import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../models/review/placement-review-data.model';
import { StaticData } from '../../services/load-static-data.service';
import { StaticApiRes } from '../../utils/static-initial-api';
import { INationalIdType, IPreferredEmail, IPreferredLanguage, IPreferredPhone } from '../../models/static-models/interface/i-business-dropdown.model';
import { NationalIdType, PreferredEmail, PreferredLanguage, PreferredPhone } from '../../models/static-models/business-model/business-dropdown.modes';
import { MapperService } from '../../services/auto-mapper/mapper-service';
import { DateFormatService } from '../../services/date-format/date-format-service';
import { Feature } from '../../models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../models/user-role-attributes/role.model';
import { AttributePermission } from '../../models/user-role-attributes/attribute-permission.model';
import { LocalStorageVariables } from '../../utils/local-storage-variable';

@Component({
    selector: 'app-personalinfo',
    templateUrl: './personalinfo.component.html',
    styleUrl: './personalinfo.component.scss'
})
export class PersonalinfoComponent implements OnInit {
    personalDetailsFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    firstNameFormControl!: FormControl;
    middleNameFormControl!: FormControl;
    lastNameFormControl!: FormControl;
    preferredNameFormControl!: FormControl;
    birthDateFormControl!: FormControl;
    genderFormControl!: FormControl;
    preferredLanguageFormControl!: FormControl;
    personalEmailFormControl!: FormControl;
    workEmailFormControl!: FormControl;
    prefferedEmailFormControl!: FormControl;
    nationalIdTypeFormControl!: FormControl;
    mobilePhoneFormControl!: FormControl;
    homePhoneFormControl!: FormControl;
    prefferedPhoneFormControl!: FormControl;
    taxIdFormControl!: FormControl;

    preferredLanguageList: IPreferredLanguage[] = [];
    prefferedEmailList: IPreferredEmail[] = [];
    prefferedPhoneList: IPreferredPhone[] = [];
    nationalIdTypeList: INationalIdType[] = [];

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
        return !this.personalDetailsFormGroup.get(field)?.valid && this.personalDetailsFormGroup.get(field)?.touched;
    }

    constructor(
        private formBuilder: FormBuilder,
        private mapperService: MapperService,
        private dateFormatService: DateFormatService
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.firstNameFormControl = new FormControl('');
        this.middleNameFormControl = new FormControl('');
        this.lastNameFormControl = new FormControl('');
        this.preferredNameFormControl = new FormControl('');
        this.birthDateFormControl = new FormControl('');
        this.genderFormControl = new FormControl('');
        this.preferredLanguageFormControl = new FormControl(null);
        this.personalEmailFormControl = new FormControl('', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$')]);
        this.workEmailFormControl = new FormControl('', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$')]);
        this.prefferedEmailFormControl = new FormControl(null);
        this.nationalIdTypeFormControl = new FormControl('');
        this.mobilePhoneFormControl = new FormControl('', [Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]);
        this.homePhoneFormControl = new FormControl('', [Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]);
        this.prefferedPhoneFormControl = new FormControl(null);
        this.taxIdFormControl = new FormControl('');

        this.personalDetailsFormGroup = this.formBuilder.group({
            firstName: this.firstNameFormControl,
            middleName: this.middleNameFormControl,
            lastName: this.lastNameFormControl,
            preferredName: this.preferredNameFormControl,
            birthDate: this.birthDateFormControl,
            gender: this.genderFormControl,
            preferredLanguage: this.preferredLanguageFormControl,
            personalEmail: this.personalEmailFormControl,
            workEmail: this.workEmailFormControl,
            prefferedEmail: this.prefferedEmailFormControl,
            nationalIdType: this.nationalIdTypeFormControl,
            mobilePhone: this.mobilePhoneFormControl,
            homePhone: this.homePhoneFormControl,
            prefferedPhone: this.prefferedPhoneFormControl,
            taxId: this.taxIdFormControl
        });
    }

    ngOnInit(): void {}

    validateAllFormFields() {
        var fieldsControls = this.personalDetailsFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.personalDetailsFormGroup.get(field);
            console.log('fields', field);
            if (control?.disabled == false) {
                control?.markAsTouched({ onlySelf: true });
                if (!this.isRequiredValidationPassed(control)) {
                    control?.markAsTouched({ onlySelf: true });
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
                const control = this.personalDetailsFormGroup.get(field);
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
            case 'firstName': {
                this.allReviewData.person.firstName = this.personalDetailsFormGroup.controls[formControlName].value;
                break;
            }
            case 'middleName': {
                this.allReviewData.person.middleName = this.personalDetailsFormGroup.controls[formControlName].value;
                break;
            }
            case 'lastName': {
                this.allReviewData.person.lastName = this.personalDetailsFormGroup.controls[formControlName].value;
                break;
            }
            case 'preferredName': {
                this.allReviewData.person.preferredName = this.personalDetailsFormGroup.controls[formControlName].value;
                break;
            }
            case 'birthDate': {
                let birthDate: any = new Date(this.personalDetailsFormGroup.controls[formControlName].value);
                let birthDateFormat: any = birthDate ? this.dateFormatService.convert_to_mmddyyyy_with_hyphen(birthDate) : '';
                this.allReviewData.person.birthDate = birthDateFormat;
                break;
            }
            case 'gender': {
                this.allReviewData.person.gender = this.personalDetailsFormGroup.controls[formControlName].value;
                break;
            }
            case 'preferredLanguage': {
                this.allReviewData.person.preferredLanguageId = this.personalDetailsFormGroup.controls[formControlName].value;
                let preferredLanguage: any = this.preferredLanguageList.find((l) => l.id === this.personalDetailsFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.person.preferredLanguage = preferredLanguage;
                break;
            }
            case 'personalEmail': {
                this.allReviewData.person.personalEmail = this.personalDetailsFormGroup.controls[formControlName].value;
                break;
            }
            case 'workEmail': {
                this.allReviewData.person.workEmail = this.personalDetailsFormGroup.controls[formControlName].value;
                break;
            }
            case 'prefferedEmail': {
                this.allReviewData.person.prefferedEmailId = this.personalDetailsFormGroup.controls[formControlName].value;
                let prefferedEmail: any = this.prefferedEmailList.find((l) => l.id === this.personalDetailsFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.person.prefferedEmail = prefferedEmail;
                break;
            }
            case 'mobilePhone': {
                this.allReviewData.person.mobilePhone = this.personalDetailsFormGroup.controls[formControlName].value;
                break;
            }
            case 'homePhone': {
                this.allReviewData.person.homePhone = this.personalDetailsFormGroup.controls[formControlName].value;
                break;
            }
            case 'prefferedPhone': {
                this.allReviewData.person.prefferedPhoneId = this.personalDetailsFormGroup.controls[formControlName].value;
                let prefferedPhone: any = this.prefferedPhoneList.find((l) => l.id === this.personalDetailsFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.person.prefferedPhone = prefferedPhone;
                break;
            }
            case 'taxId': {
                this.allReviewData.person.taxId = this.personalDetailsFormGroup.controls[formControlName].value;
                break;
            }
            case 'nationalIdType': {
                this.allReviewData.assignment.nationalId = this.personalDetailsFormGroup.controls[formControlName].value;
                let national: any = this.nationalIdTypeList.find((l) => l.id === this.personalDetailsFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.national = national;
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
            Object.keys(this.personalDetailsFormGroup.controls).forEach((key: string) => {
                formControlKeys.push(key);
            });

            formControlKeys.forEach((key) => {
                const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === key);
                if (attribute) {
                    if (attribute.display) {
                        if (attribute.isMandatory) {
                            this.personalDetailsFormGroup.controls[attribute.attributeName].addValidators([Validators.required]);
                        }

                        if (!attribute.isEditable) {
                            this.personalDetailsFormGroup.controls[attribute.attributeName].disable();
                        }
                    } else {
                        this.personalDetailsFormGroup.removeControl(attribute.attributeName);
                    }
                }
            });

            this.personalDetailsFormGroup.updateValueAndValidity();
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.preferredLanguageList = this.mapperService.map(PreferredLanguage, res.preferredLanguage);
            this.prefferedEmailList = this.mapperService.map(PreferredEmail, res.preferredEmail);
            this.prefferedPhoneList = this.mapperService.map(PreferredPhone, res.preferredPhone);
            this.nationalIdTypeList = this.mapperService.map(NationalIdType, res.nationalIdType);

            this.prepareSectionData(reviewData);
        });
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.personalDetailsFormGroup && reviewData && reviewData.person) {
            this.firstNameFormControl.setValue(reviewData.person.firstName ? reviewData.person.firstName : '');
            this.middleNameFormControl.setValue(reviewData.person.middleName ? reviewData.person.middleName : '');
            this.lastNameFormControl.setValue(reviewData.person.lastName ? reviewData.person.lastName : '');
            this.preferredNameFormControl.setValue(reviewData.person.preferredName ? reviewData.person.preferredName : '');
            this.birthDateFormControl.setValue(reviewData.person.birthDate ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData.person.birthDate) : '');
            this.genderFormControl.setValue(reviewData.person.gender ? reviewData.person.gender : '');
            this.preferredLanguageFormControl.setValue(reviewData.person.preferredLanguageId ? reviewData.person.preferredLanguageId : '');
            this.personalEmailFormControl.setValue(reviewData.person.personalEmail ? reviewData.person.personalEmail : '');
            this.workEmailFormControl.setValue(reviewData.person.workEmail ? reviewData.person.workEmail : '');
            this.prefferedEmailFormControl.setValue(reviewData.person.prefferedEmailId ? reviewData.person.prefferedEmailId : '1');
            this.mobilePhoneFormControl.setValue(reviewData.person.mobilePhone ? reviewData.person.mobilePhone : '');
            this.homePhoneFormControl.setValue(reviewData.person.homePhone ? reviewData.person.homePhone : '');
            this.prefferedPhoneFormControl.setValue(reviewData.person.prefferedPhoneId ? reviewData.person.prefferedPhoneId : '1');
            this.taxIdFormControl.setValue(reviewData.person.taxId ? reviewData.person.taxId : '');
            this.nationalIdTypeFormControl.setValue(reviewData.assignment.nationalId ? reviewData.assignment.nationalId : '');
        }
    }
}
