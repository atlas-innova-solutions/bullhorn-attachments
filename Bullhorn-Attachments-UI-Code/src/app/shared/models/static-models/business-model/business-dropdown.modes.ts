import { propertyMap } from '../../../services/auto-mapper';
import {
    IClientServiceManager,
    IWorkerType,
    IFinanceReviewStatus,
    IGuaranteeTermsDays,
    ILegalEmployer,
    INormalWeeklyHours,
    IPayFrequency,
    IPreferredLanguage,
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
    IServiceLine,
    IStartDateDelayReason,
    IAssignmentEndReason,
    IWorkingRemote,
    IWorkSchedule,
    IImmigrationStatus,
    IVisaType,
    ICeridianPayGroup,
    IPayCycle,
    IPayWeekEndingDay,
    IPayPer,
    IOtRuleOverride,
    IUsW2ElectronicConsent,
    IClientBillableOT,
    IBillPer,
    IPreferredPhone,
    IExemptionStatus,
    IVMS,
    IPartTimeFullTime,
    IHolidayPlan,
    ISickPlan,
    IOnboardingSpecialist,
    IPTOPlan,
    IConsultantPointOfContact,
    ISupplier,
    IPersonType,
    IPrbuType,
    IFusionCustomerIdAccount,
    IFusionCustomerIdParent,
    ILocationLov,
    ILocation,
    IProject,
    IIsPerDiemBillable,
    ICountry,
    IFusionSupplier,
    IPreferredEmail,
    IPayCurrency,
    ITimeManagementSpecialist,
    IStates,
    IStatesList,
    IYesOrNo,
    IFusionAssignementStatus,
    ILineOfBusiness,
    IAssignmentReason,
    IGetCustomUser,
    IGetCategory,
    IInternalJobCode,
    IRecruiterOverride,
    INonCommissionableRecruiter,
    ISalesPersonOverride,
    INonCommissionableSalesPerson,
    IHolidayPlanType,
    IVacation,
    INationalIdType
} from '../interface/i-business-dropdown.model';

export class LegalEmployer implements ILegalEmployer {
    @propertyMap('legalEmployerId')
    id: string;
    @propertyMap('legalEmployerName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class PreferredLanguage implements IPreferredLanguage {
    @propertyMap('languageTag')
    id: string;
    @propertyMap('languageCode')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class PreferredPhone implements IPreferredPhone {
    @propertyMap('id')
    id: string;
    @propertyMap('name')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class NationalIdType implements INationalIdType {
    @propertyMap('nationalId')
    id: string;
    @propertyMap('nationalName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class PayFrequency implements IPayFrequency {
    @propertyMap('lookupCode')
    id: string;
    @propertyMap('meaning')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class ServiceLine implements IServiceLine {
    @propertyMap('legal_employer_id')
    id: string;
    @propertyMap('legal_employer_name')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}
export class Recruiter implements IRecruiter {
    @propertyMap('recruiterId')
    id: string;
    @propertyMap('recruiterName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class Country implements ICountry {
    @propertyMap('countryCode')
    id: string;
    @propertyMap('countryName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}
export class RecruiterPercentage implements IRecruiterPercentage {
    @propertyMap('recruiterPercentageId')
    id: string;
    @propertyMap('recruiterPercentageName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class RecruiterSecondary implements IRecruiterSecondary {
    @propertyMap('recruiterSecondaryId')
    id: string;
    @propertyMap('recruiterSecondaryName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class RecruiterSecondaryPercentage implements IRecruiterSecondaryPercentage {
    @propertyMap('recruiterSecondaryPercentageId')
    id: string;
    @propertyMap('recruiterSecondaryPercentageName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class RecruiterTeam implements IRecruiterTeam {
    @propertyMap('recruiterTeamId')
    id: string;
    @propertyMap('recruiterTeamName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class RecruiterOverride implements IRecruiterOverride {
    @propertyMap('recuiterOverrideId')
    id: string;
    @propertyMap('recuiterOverrideName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class NonCommissionableRecruiter implements INonCommissionableRecruiter {
    @propertyMap('nonCommissionableRecruiterId')
    id: string;
    @propertyMap('nonCommissionableRecruiterName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class salesPersonOverride implements ISalesPersonOverride {
    @propertyMap('salesPersonOverrideId')
    id: string;
    @propertyMap('salesPersonOverrideName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class nonCommissionableSalesPerson implements INonCommissionableSalesPerson {
    @propertyMap('nonCommissionableSalesPersonId')
    id: string;
    @propertyMap('nonCommissionableSalesPersonName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class SalesPerson implements ISalesPerson {
    @propertyMap('salesPersonId')
    id: string;
    @propertyMap('salesPersonName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class SalesPersonPercentage implements ISalesPersonPercentage {
    @propertyMap('salesPersonPercentageId')
    id: string;
    @propertyMap('salesPersonPercentageName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class SalesPersonSecondary implements ISalesPersonSecondary {
    @propertyMap('salesPersonSecondaryId')
    id: string;
    @propertyMap('salesPersonSecondaryName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class SalesPersonSecondaryPercentage implements ISalesPersonSecondaryPercentage {
    @propertyMap('salesPersonSecondaryPercentageId')
    id: string;
    @propertyMap('salesPersonSecondaryPercentageName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class SalesTeam implements ISalesTeam {
    @propertyMap('salesTeamId')
    id: string;
    @propertyMap('salesTeamName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class SalesTeamOverride implements ISalesTeamOverride {
    @propertyMap('salesTeamOverrideId')
    id: string;
    @propertyMap('salesTeamOverrideName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class ClientServiceManager implements IClientServiceManager {
    @propertyMap('clientServiceManagerId')
    id: string;
    @propertyMap('clientServiceManagerName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class GuaranteeTermsDays implements IGuaranteeTermsDays {
    @propertyMap('guaranteeTermsDaysId')
    id: string;
    @propertyMap('guaranteeTermsDaysName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class NormalWeeklyHours implements INormalWeeklyHours {
    @propertyMap('normalWeeklyHoursId')
    id: string;
    @propertyMap('normalWeeklyHoursName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}
export class WorkerType implements IWorkerType {
    @propertyMap('workerTypeId')
    id: string;
    @propertyMap('workerTypeName')
    name: string;
    constructor() {
        this.id = '';
        this.name = '';
    }
}
export class FinanceReviewStatus implements IFinanceReviewStatus {
    @propertyMap('financeReviewStatusId')
    id: string;
    @propertyMap('financeReviewStatus')
    name: string;
    constructor() {
        this.id = '';
        this.name = '';
    }
}
export class VMS implements IVMS {
    @propertyMap('vmsId')
    id: string;
    @propertyMap('vmsName')
    name: string;
    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class StartDateDelayReason implements IStartDateDelayReason {
    @propertyMap('startDateDelayReasonId')
    id: string;
    @propertyMap('startDateDelayReasonName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class AssignmentEndReason implements IAssignmentEndReason {
    @propertyMap('assignmentEndReasonId')
    id: string;
    @propertyMap('assignmentEndReasonName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class AssignmentReason implements IAssignmentReason {
    @propertyMap('ActionReason')
    name: string;
    @propertyMap('ActionReasonId')
    id: string;
    @propertyMap('ActionReasonCode')
    code: string;
    constructor() {
        this.name = '';
        this.id = '';
        this.code = '';
    }
}

export class WorkingRemote implements IWorkingRemote {
    @propertyMap('id')
    id: string;
    @propertyMap('name')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class WorkSchedule implements IWorkSchedule {
    @propertyMap('workScheduleId')
    id: string;
    @propertyMap('workScheduleName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class ImmigrationStatus implements IImmigrationStatus {
    @propertyMap('immigrationStatusId')
    id: string;
    @propertyMap('immigrationStatusName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class VisaType implements IVisaType {
    @propertyMap('visaTypeId')
    id: string;
    @propertyMap('visaTypeName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class CeridianPayGroup implements ICeridianPayGroup {
    @propertyMap('ceridianPayGroupId')
    id: string;
    @propertyMap('ceridianPayGroupName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class PayCycle implements IPayCycle {
    @propertyMap('payCycleId')
    id: string;
    @propertyMap('payCycleName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class PayWeekEndingDay implements IPayWeekEndingDay {
    @propertyMap('payWeekendingDayId')
    id: string;
    @propertyMap('payWeekendingDayName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class PayPer implements IPayPer {
    @propertyMap('payPerId')
    id: string;
    @propertyMap('payPerName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class OtRuleOverride implements IOtRuleOverride {
    @propertyMap('otRuleOverrideId')
    id: string;
    @propertyMap('otRuleOverrideName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class UsW2ElectronicConsent implements IUsW2ElectronicConsent {
    @propertyMap('usW2ElectronicConsentId')
    id: string;
    @propertyMap('usW2ElectronicConsentName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class ClientBillableOT implements IClientBillableOT {
    @propertyMap('clientBillableOtId')
    id: string;
    @propertyMap('clientBillableOtName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class BillPer implements IBillPer {
    @propertyMap('billPerId')
    id: string;
    @propertyMap('billPerName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}
export class PTOPlan implements IPTOPlan {
    @propertyMap('ptoPlanId')
    id: string;
    @propertyMap('ptoPlanName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class ExemptionStatus implements IExemptionStatus {
    @propertyMap('exemptionStatusId')
    id: string;
    @propertyMap('exemptionStatusName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}
export class HolidayPlan implements IHolidayPlan {
    @propertyMap('holidayPlanId')
    id: string;
    @propertyMap('holidayPlanName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}
export class HolidayPlanType implements IHolidayPlanType {
    @propertyMap('holidayPlanTypeId')
    id: string;
    @propertyMap('holidayPlanTypeName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}
export class SickPlan implements ISickPlan {
    @propertyMap('sickPlanId')
    id: string;
    @propertyMap('sickPlanName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}
export class OnboardingSpecialist implements IOnboardingSpecialist {
    @propertyMap('onBoardingSpecialistId')
    id: string;
    @propertyMap('onBoardingSpecialistName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class TimeManagementSpecialist implements ITimeManagementSpecialist {
    @propertyMap('timeManagementSpecialistId')
    id: string;
    @propertyMap('timeManagementSpecialistName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class ConsultantPointOfContact implements IConsultantPointOfContact {
    @propertyMap('consultantPointOfContactId')
    id: string;
    @propertyMap('consultantPointOfContactName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class Supplier implements ISupplier {
    @propertyMap('SupplierId')
    supplierId: string;
    @propertyMap('Supplier')
    supplier: string;
    @propertyMap('SupplierPartyId')
    supplierPartyId: string;
    @propertyMap('SupplierNumber')
    supplierNumber: string;

    constructor() {
        this.supplierId = '';
        this.supplier = '';
        this.supplierPartyId = '';
        this.supplierNumber = '';
    }
}

export class PersonType implements IPersonType {
    @propertyMap('systemPersonType')
    systemPersonType: string;
    @propertyMap('userPersonType')
    userPersonType: string;

    constructor() {
        this.systemPersonType = '';
        this.userPersonType = '';
    }
}

export class PrbuType implements IPrbuType {
    @propertyMap('PrbuId')
    id: string;
    @propertyMap('PrbuName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class FusionCustomerIdAccount implements IFusionCustomerIdAccount {
    @propertyMap('fusionCustomerAccountId')
    id: string;
    @propertyMap('fusionCustomerAccountName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class FusionCustomerIdParent implements IFusionCustomerIdParent {
    @propertyMap('fusionCustomerParentId')
    id: string;
    @propertyMap('fusionCustomerParentName')
    name: string;

    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class Project implements IProject {
    @propertyMap('projectId')
    projectId: string;
    @propertyMap('projectName')
    projectName: string;
    @propertyMap('projectTypeId')
    projectTypeId: string;
    @propertyMap('projectTypeName')
    projectTypeName: string;
    @propertyMap('projectBusinessUnitId')
    projectBusinessUnitId: string;
    @propertyMap('projectBusinessUnitName')
    projectBusinessUnitName: string;
    @propertyMap('projectCurrencyId')
    projectCurrencyId: string;
    @propertyMap('projectCurrencyCode')
    projectCurrencyCode: string;

    constructor() {
        this.projectId = '';
        this.projectName = '';
        this.projectTypeId = '';
        this.projectTypeName = '';
        this.projectBusinessUnitId = '';
        this.projectBusinessUnitName = '';
        this.projectCurrencyId = '';
        this.projectCurrencyCode = '';
    }
}

export class LocationLov implements ILocationLov {
    @propertyMap('LocationId')
    locationId: string;
    @propertyMap('LocationName')
    locationName: string;
    @propertyMap('SupplierPartyId')
    locationCode: string;
    @propertyMap('CountryName')
    countryName: string;
    @propertyMap('CountryCode')
    countryCode: string;

    constructor() {
        this.locationId = '';
        this.locationName = '';
        this.locationCode = '';
        this.countryName = '';
        this.countryCode = '';
    }
}

export class Location implements ILocation {
    @propertyMap('LocationId')
    locationId: string;
    @propertyMap('LocationName')
    locationName: string;
    @propertyMap('LocationCode')
    locationCode: string;
    @propertyMap('CountryName')
    countryName: string;
    @propertyMap('CountryCode')
    countryCode: string;

    constructor() {
        this.locationId = '';
        this.locationName = '';
        this.locationCode = '';
        this.countryName = '';
        this.countryCode = '';
    }
}

export class IsPerDiemBillable implements IIsPerDiemBillable {
    @propertyMap('isPerDiemBillableId')
    id: string;
    @propertyMap('isPerDiemBillableName')
    name: string;
    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class PartTimeFullTime implements IPartTimeFullTime {
    @propertyMap('lookupCode')
    id: string;
    @propertyMap('meaning')
    name: string;
    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class FusionSupplier implements IFusionSupplier {
    @propertyMap('fusionSupplierId')
    id: string;
    @propertyMap('fusionSupplier')
    name: string;
    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class States implements IStates {
    @propertyMap('countryCode')
    countryCode: string;
    @propertyMap('statesList')
    statesList: IStatesList[];

    constructor() {
        this.countryCode = '';
        this.statesList = [];
    }
}

export class StatesList implements IStatesList {
    @propertyMap('stateCode')
    stateCode: string;
    @propertyMap('stateName')
    stateName: string;
    constructor() {
        this.stateCode = '';
        this.stateName = '';
    }
}

export class PayCurrency implements IPayCurrency {
    @propertyMap('payCurrencyId')
    id: string;
    @propertyMap('payCurrencyName')
    name: string;
    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class PreferredEmail implements IPreferredEmail {
    @propertyMap('id')
    id: string;
    @propertyMap('name')
    name: string;
    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class YesOrNo implements IYesOrNo  {
    @propertyMap('id')
    id: string;
    @propertyMap('name')
    name: string;
    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class Vacation implements IVacation  {
    @propertyMap('vacationId')
    id: string;
    @propertyMap('vacationCode')
    name: string;
    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class FusionAssignementStatus implements IFusionAssignementStatus {
    @propertyMap('assignmentStatusTypeName')
    name: string;
    @propertyMap('assignmentStatusTypeId')
    id: string;
    @propertyMap('assignmentStatusCode')
    code: string;
    constructor() {
        this.name = '';
        this.id = '';
        this.code = '';
    }
}

export class LineOfBusiness implements ILineOfBusiness {
    @propertyMap('lineOfBusinessName')
    name: string;
    @propertyMap('lineOfBusinessId')
    id: string;
    constructor() {
        this.name = '';
        this.id = '';
    }
}
export class GetCustomUser implements IGetCustomUser {
    @propertyMap('customUserName')
    name: string;
    @propertyMap('customUserId')
    id: string;
    constructor() {
        this.name = '';
        this.id = '';
    }
}
export class GetCategory implements IGetCategory {
    @propertyMap('name')
    name: string;
    @propertyMap('id')
    id: string;
    constructor() {
        this.name = '';
        this.id = '';
    }
}
export class InternalJobCode implements IInternalJobCode {
    @propertyMap('internalJobCodeName')
    name: string;
    @propertyMap('internalJobCodeId')
    id: string;
    constructor() {
        this.name = '';
        this.id = '';
    }
}
