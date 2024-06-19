export interface ILegalEmployer {
    id: string;
    name: string;
}

export interface IPreferredLanguage {
    id: string;
    name: string;
}

export interface IPreferredPhone {
    id: string;
    name: string;
}
export interface INationalIdType {
    id: string;
    name: string;
}

export interface IPayFrequency {
    id: string;
    name: string;
}

export interface IServiceLine {
    id: string;
    name: string;
}
export interface IRecruiter {
    id: string;
    name: string;
}

export interface ICountry {
    id: string;
    name: string;
}
export interface IRecruiterPercentage {
    id: string;
    name: string;
}

export interface IRecruiterSecondary {
    id: string;
    name: string;
}

export interface IRecruiterSecondaryPercentage {
    id: string;
    name: string;
}

export interface IRecruiterTeam {
    id: string;
    name: string;
}

export interface IRecruiterOverride {
    id: string;
    name: string;
}
export interface INonCommissionableRecruiter {
    id: string;
    name: string;
}
export interface ISalesPersonOverride {
    id: string;
    name: string;
}
export interface INonCommissionableSalesPerson {
    id: string;
    name: string;
}

export interface ISalesPerson {
    id: string;
    name: string;
}

export interface ISalesPersonPercentage {
    id: string;
    name: string;
}

export interface ISalesPersonSecondary {
    id: string;
    name: string;
}

export interface ISalesPersonSecondaryPercentage {
    id: string;
    name: string;
}

export interface ISalesTeam {
    id: string;
    name: string;
}

export interface ISalesTeamOverride {
    id: string;
    name: string;
}

export interface IClientServiceManager {
    id: string;
    name: string;
}

export interface IGuaranteeTermsDays {
    id: string;
    name: string;
}

export interface INormalWeeklyHours {
    id: string;
    name: string;
}

export interface IStartDateDelayReason {
    id: string;
    name: string;
}

export interface IAssignmentEndReason {
    id: string;
    name: string;
}

export interface IWorkingRemote {
    id: string;
    name: string;
}

export interface IWorkSchedule {
    id: string;
    name: string;
}

export interface IImmigrationStatus {
    id: string;
    name: string;
}

export interface IVisaType {
    id: string;
    name: string;
}

export interface ICeridianPayGroup {
    id: string;
    name: string;
}

export interface IPayCycle {
    id: string;
    name: string;
}

export interface IPayWeekEndingDay {
    id: string;
    name: string;
}

export interface IPayPer {
    id: string;
    name: string;
}

export interface IOtRuleOverride {
    id: string;
    name: string;
}

export interface IUsW2ElectronicConsent {
    id: string;
    name: string;
}

export interface IClientBillableOT {
    id: string;
    name: string;
}

export interface IBillPer {
    id: string;
    name: string;
}
export interface IPTOPlan {
    id: string;
    name: string;
}
export interface IHolidayPlan {
    id: string;
    name: string;
}
export interface IHolidayPlanType {
    id: string;
    name: string;
}
export interface IVacation {
    id: string;
    name: string;
}
export interface ISickPlan {
    id: string;
    name: string;
}
export interface IOnboardingSpecialist {
    id: string;
    name: string;
}

export interface ITimeManagementSpecialist {
    id: string;
    name: string;
}

export interface IExemptionStatus {
    id: string;
    name: string;
}
export interface IWorkerType {
    id: string;
    name: string;
}
export interface IFinanceReviewStatus {
    id: string;
    name: string;
}
export interface IFinanceReviewReasons {
    id: string;
    name: string;
}
export interface IVMS {
    id: string;
    name: string;
}

export interface ISupplier {
    supplierId: string;
    supplier: string;
    supplierPartyId: string;
    supplierNumber: string;
}

export interface IPersonType {
    systemPersonType: string;
    userPersonType: string;
}

export interface IPrbuType {
    id: string;
    name: string;
}

export interface IFusionCustomerIdAccount {
    id: string;
    name: string;
}

export interface IFusionCustomerIdParent {
    id: string;
    name: string;
}

export interface IProject {
    projectId: string;
    projectName: string;
    projectTypeId: string;
    projectTypeName: string;
    projectBusinessUnitId: string;
    projectBusinessUnitName: string;
    projectCurrencyId: string;
    projectCurrencyCode: string;
}

export interface ILocation {
    locationId: string;
    locationName: string;
    locationCode: string;
    countryName: string;
    countryCode: string;
}

export interface ILocationLov {
    locationId: string;
    locationName: string;
    locationCode: string;
    countryName: string;
    countryCode: string;
}

export interface IIsPerDiemBillable {
    id: string;
    name: string;
}

export interface IPartTimeFullTime {
    id: string;
    name: string;
}

export interface IConsultantPointOfContact {
    id: string;
    name: string;
}

export interface ISupplier {
    supplierId: string;
    supplier: string;
    supplierPartyId: string;
    supplierNumber: string;
}

export interface IPersonType {
    systemPersonType: string;
    userPersonType: string;
}

export interface IPrbuType {
    id: string;
    name: string;
}

export interface IFusionCustomerIdAccount {
    id: string;
    name: string;
}

export interface IFusionCustomerIdParent {
    id: string;
    name: string;
}

export interface IIsPerDiemBillable {
    id: string;
    name: string;
}

export interface IFusionSupplier {
    id: string;
    name: string;
}

export interface IStates {
    countryCode: string;
    statesList: IStatesList[];
}

export interface IStatesList {
    stateCode: string;
    stateName: string;
}

export interface IPayCurrency {
    id: string;
    name: string;
}

export interface IPreferredEmail {
    id: string;
    name: string;
}

export interface IYesOrNo {
    id: string;
    name: string;
}

export interface IFusionAssignementStatus {   
    name: string;
    id: string;
    code: string;
}

export interface IAssignmentReason {   
    name: string;
    id: string;
    code: string;
}
export interface ILineOfBusiness {
    name: string;
    id: string;
}
export interface IGetCustomUser {
    name: string;
    id: string;
}
export interface IGetCategory{
    name: string;
    id: string;
}
export interface IInternalJobCode{
    name: string;
    id: string;
}