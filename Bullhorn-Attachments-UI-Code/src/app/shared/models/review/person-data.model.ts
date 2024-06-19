export class Person {
    personId: string | null | undefined;
    firstName: string | null | undefined;
    middleName: string | null | undefined;
    lastName: string | null | undefined;
    birthDate: string | null | undefined;
    gender: string | null | undefined;
    homePhone: string | null | undefined;
    mobilePhone: string | null | undefined;
    personalEmail: string | null | undefined;
    preferredLanguageId: string | null | undefined;
    preferredLanguage: string | null | undefined;
    preferredName: string | null | undefined;
    primaryEmail: string | null | undefined;
    workEmail: string | null | undefined;
    prefferedEmail: string | null | undefined;
    prefferedEmailId: string | null | undefined;
    primaryPhone: string | null | undefined;
    prefferedPhone: string | null | undefined;
    prefferedPhoneId: string | null | undefined;
    immigrationNotes: string | null | undefined;
    immigrationStatus: string | null | undefined;
    immigrationStatusId: string | null | undefined;
    visaEndDate: string | null | undefined;
    visaStartDate: string | null | undefined;
    visaType: string | null | undefined;
    visaTypeId: string | null | undefined;
    visaPermitNumber: string | null | undefined;
    disability: string | null | undefined;
    eeocode: string | null | undefined;
    race: string | null | undefined;
    vets: string | null | undefined;
    homeAddressId: string | null | undefined;
    homeCity: string | null | undefined;
    homeCountry: string | null | undefined;
    homeCounty: string | null | undefined;
    homeCountryId: string | null | undefined;
    homeAddressLine1: string | null | undefined;
    homeAddressLine2: string | null | undefined;
    // homeAddressLine3: string | null | undefined;
    homeStateProvince: string | null | undefined;
    homeStateProvinceId: string | null | undefined;
    homePostalCode: string | null | undefined;
    securityClearanceYn: string | null | undefined;
    securityClearanceExpiryDate: string | null | undefined;
    securityClearanceLevel: string | null | undefined;
    securityClearanceType: string | null | undefined;
    ptoPlan: string | null | undefined;
    ptoPlanId:string | null | undefined;
    ptoRolloverDate: string | null | undefined;
    ptoRolloverType: string | null | undefined;
    holidayPlan: string | null | undefined;
    holidayPlanId:string | null | undefined;
    isEligibleMedicalEligibility: string | null | undefined;
    performancePay: string | null | undefined;
    sickPlan: string | null | undefined;
    sickPlanId:string | null | undefined;
    tenurePremium: string | null | undefined;
    tenurePremiumWorker: string | null | undefined;
    prefferedEmailIndicator: string | null | undefined;
    taxId: string | null | undefined;
    createdBy: string | null | undefined;
    createdDate: string | null | undefined;
    modifiedBy: string | null | undefined;
    modifiedDate: string | null | undefined;            
    homeaddrIsGoogleValidated: string | null | undefined;
    homeaddrGoogleOverrideReason: string | null | undefined;
    homeaddrGoogleOverrideInd: string | null | undefined;

    constructor(data: Person) {
        Object.assign(this, data);
    }
}

export class PersonAudit {
    firstName: string = 'First Name';
    middleName: string = 'Middle Name';
    lastName: string = 'Last Name';
    birthDate: string = 'Birth Date';
    gender: string = 'Gender';
    homePhone: string = 'Home Phone';
    mobilePhone: string = 'Mobile Phone';
    personalEmail: string = 'Personal Email';
    preferredLanguage: string = 'Preferred Language';
    preferredName: string = 'Preferred Name';
    workEmail: string = 'Work Email (Client)';
    prefferedEmail: string = 'Preferred Email';
    prefferedPhone: string = 'Preferred Phone';
    immigrationNotes: string = 'Immigration Notes';
    immigrationStatus: string = 'Immigration Status';
    visaEndDate: string = 'Visa End Date';
    visaStartDate: string = 'Visa Start Date';
    visaType: string = 'Visa Type';
    visaPermitNumber: string = 'Visa/Permit(Visa No)';
    homeCity: string = 'Home City';
    homeCountry: string = 'Home Country';
    homeCounty: string = 'Home County';
    homeAddressLine1: string = 'Home Address Line 1';
    homeAddressLine2: string = 'Home Address Line 2';
    // homeAddressLine3: string = 'Home Address Line 3';
    homeStateProvince: string = 'Home State/Province';
    homePostalCode: string = 'Home Postal Code';
    ptoPlan: string = 'PTO Plan';
    holidayPlan: string = 'Holiday Plan';
    sickPlan: string = 'Sick Plan';
    tenurePremiumWorker: string = 'Tenure Premium - Worker';
    taxId: string = 'Tax ID';
    homeaddrIsGoogleValidated: string  = 'Google Validated';
    homeaddrGoogleOverrideReason: string  = 'Override Reason';
    homeaddrGoogleOverrideInd: string = 'Google Override Indicator';

    constructor() {
    }
}
