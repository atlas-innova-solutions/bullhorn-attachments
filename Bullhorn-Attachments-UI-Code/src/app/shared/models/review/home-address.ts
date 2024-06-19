export class HomeAddress {
    homeAddressId: string | null | undefined;
    homeCity: string | null | undefined;
    homeCountry: string | null | undefined;
    homeCounty: string | null | undefined;
    homeaddressLine1: string | null | undefined;
    homeaddressLine2: string | null | undefined;
    homeaddressLine3: string | null | undefined;
    homestateProvince: string | null | undefined;
    homestateProvinceId: string | null | undefined;
    homePostalCode: string | null | undefined;

    constructor(data: HomeAddress) {
        Object.assign(this, data);
    }
}
