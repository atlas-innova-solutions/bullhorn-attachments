import { StaticApiKey } from './../models/shared-component.model';
import { proxyUrls } from '../services/load-urls';
import {
    LegalEmployer,
    ClientServiceManager,
    GuaranteeTermsDays,
    NormalWeeklyHours,
    Country,
    PayFrequency,
    PreferredLanguage,
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
    StartDateDelayReason,
    AssignmentEndReason,
    WorkingRemote,
    WorkSchedule,
    ImmigrationStatus,
    VisaType,
    CeridianPayGroup,
    PayCycle,
    PayWeekEndingDay,
    PayPer,
    OtRuleOverride,
    UsW2ElectronicConsent,
    ClientBillableOT,
    BillPer,
    PreferredPhone,
    PTOPlan,
    HolidayPlan,
    SickPlan,
    OnboardingSpecialist,
    ExemptionStatus,
    WorkerType,
    FinanceReviewStatus,
    VMS,
    Location,
    ConsultantPointOfContact,
    PartTimeFullTime,
    Supplier,
    PersonType,
    PrbuType,
    FusionCustomerIdAccount,
    FusionCustomerIdParent,
    Project,
    IsPerDiemBillable,
    FusionSupplier,
    States,
    PayCurrency,
    PreferredEmail,
    TimeManagementSpecialist,
    YesOrNo,
    FusionAssignementStatus,
    LineOfBusiness,
    GetCustomUser,
    GetCategory,
    InternalJobCode,
    RecruiterOverride,
    NonCommissionableRecruiter,
    salesPersonOverride,
    nonCommissionableSalesPerson,
    HolidayPlanType,
    Vacation,
    NationalIdType
} from '../models/static-models/business-model/business-dropdown.modes';

export const staticApis = {
    staticApiKey: proxyUrls.setupApis.setupStatic,
    legalEmployer: proxyUrls.setupApis.setupStaticgetAllDataLegalEmployer,
    preferredLanguage: proxyUrls.setupApis.setupStaticGetAllDataPreferredLanguage,
    preferredPhone: proxyUrls.setupApis.setupStaticgetPreferredPhone,
    recruiter: proxyUrls.setupApis.setupStaticgetStaticRecruiter,
    recruiterSecondary: proxyUrls.setupApis.setupStaticgetStaticRecruiterSecondary,
    recruiterPercentage: proxyUrls.setupApis.setupStaticgetStaticRecruiterPercentage,
    recruiterSecondaryPercentage: proxyUrls.setupApis.setupStaticgetStaticRecruiterSecondaryPercentage,
    salesPerson: proxyUrls.setupApis.setupStaticgetStaticSalesPerson,
    salesPersonSecondary: proxyUrls.setupApis.setupStaticgetStaticSalesPersonSecondary,
    salesPersonPercentage: proxyUrls.setupApis.setupStaticgetStaticSalesPersonPercentage,
    salesPersonSecondaryPercentage: proxyUrls.setupApis.setupStaticgetStaticSalesPersonSecondaryPercentage,
    clientServiceManager: proxyUrls.setupApis.setupStaticgetStaticClientServiceManager,
    salesTeam: proxyUrls.setupApis.setupStaticgetStaticSalesTeam,
    salesTeamOverride: proxyUrls.setupApis.setupStaticgetStaticSalesTeamOverride,
    recruiterTeam: proxyUrls.setupApis.setupStaticgetStaticRecruiterTeam,
    guaranteeTermsDays: proxyUrls.setupApis.setupStaticgetStaticGuaranteeTermsDays,
    normalWeeklyHours: proxyUrls.setupApis.setupStaticgetStaticNormalWeeklyHours,
    country: proxyUrls.setupApis.setupStaticgetAllDataCountry,
    workerTypes: proxyUrls.setupApis.setupStaticgetAllDataWorkerType,
    financeReviewStatus: proxyUrls.setupApis.setupStaticgetFinanceReviewStatus,
    vmsList: proxyUrls.setupApis.setupStaticgetStaticVmsName,
    startDateDelayReason: proxyUrls.setupApis.setupStaticgetStaticStartDateDelayReason,
    assignmentEndReason: proxyUrls.setupApis.setupStaticgetStaticAssignmentEndReason,
    workingRemote: proxyUrls.setupApis.setupStaticgetStaticWorkingRemote,
    workSchedule: proxyUrls.setupApis.setupStaticgetStaticWorkSchedule,
    immigrationStatus: proxyUrls.setupApis.setupStaticgetStaticImmigrationStatus,
    visaType: proxyUrls.setupApis.setupStaticgetStaticVisaType,
    ceridianPayGroup: proxyUrls.setupApis.setupStaticgetStaticCeridianPayGroup,
    payCycle: proxyUrls.setupApis.setupStaticgetStaticPayCycle,
    payWeekendingDay: proxyUrls.setupApis.setupStaticgetStaticPayWeekendingDay,
    payPer: proxyUrls.setupApis.setupStaticgetStaticPayPer,
    otRuleOverride: proxyUrls.setupApis.setupStaticgetStaticOtRuleOverride,
    usW2ElectronicConsent: proxyUrls.setupApis.setupStaticgetStaticUsW2ElectronicConsent,
    clientBillableOT: proxyUrls.setupApis.setupStaticgetStaticClientBillableOT,
    billPer: proxyUrls.setupApis.setupStaticgetStaticBillPer,
    payFrequency: proxyUrls.setupApis.setupStaticgetStaticPayFrequency,
    ptoPlan: proxyUrls.setupApis.setupStaticgetStaticPtoPlan,
    holidayPlan: proxyUrls.setupApis.setupStaticgetStaticHolidayPlan,
    sickPlan: proxyUrls.setupApis.setupStaticgetStaticSickPlan,
    onboardingSpecialist: proxyUrls.setupApis.setupStaticgetStaticOnBoardingSpecialist,
    exemptionStatus: proxyUrls.setupApis.setupStaticgetStaticExemptionStatus,
    location: proxyUrls.setupApis.setupStaticgetStaticLocation,
    consultantPointOfContact: proxyUrls.setupApis.setupStaticgetStaticConsultantPointOfContact,
    ptftList: proxyUrls.setupApis.setupStaticgetStaticPtft,
    personType: proxyUrls.setupApis.setupStaticgetAllDataPersonType,
    prbuType: proxyUrls.setupApis.setupStaticgetAllDataPrbuType,
    fusionCustomerIdAccount: proxyUrls.setupApis.setupStaticgetAllDatafusionCustomerIdAccount,
    fusionCustomerIdParent: proxyUrls.setupApis.setupStaticgetAllDatafusionCustomerIdParent,
    projects: proxyUrls.setupApis.setupStaticgetStaticProjects,
    suppliers: proxyUrls.setupApis.setupStaticgetStaticSuppliers,
    isPerDiemBillable: proxyUrls.setupApis.setupStaticgetStaticIsPerDiemBillable,
    fusionSupplierName: proxyUrls.setupApis.setupStaticgetFusionSupplierName,
    states: proxyUrls.setupApis.setupStaticgetState,
    payCurrency: proxyUrls.setupApis.setupStaticgetPayCurrency,
    preferredEmail: proxyUrls.setupApis.setupStaticgetPreferredEmail,
    timeManagementSpecialist: proxyUrls.setupApis.setupStaticgetStaticTimeManagementSpecialist,
    yesOrNo: proxyUrls.setupApis.setupStaticgetYesOrNo,
    fusionAssignmentStatus: proxyUrls.setupApis.setupStaticGetFusionAsgmtStatus,
    lineOfBusiness: proxyUrls.setupApis.setupStaticGetLineOfBusinessFromFusion,
    getCustomUser:proxyUrls.setupApis.setupCustomUserGet,
    getCategory:proxyUrls.setupApis.setupCategoryGet,
    internalJobCode:proxyUrls.setupApis.setupStaticgetInternalJobCode,
    recuiterOverride: proxyUrls.setupApis.setupStaticGetRecruiterOverride,
    nonCommissionableRecruiter: proxyUrls.setupApis.setupStaticGetNonCommissionableRecruiter,
    salesPersonOverride:proxyUrls.setupApis.setupStaticGetSalesPersonOverride,
    nonCommissionableSalesPerson : proxyUrls.setupApis.setupStaticGetNonCommissionableSalesPerson,
    holidayPlanType : proxyUrls.setupApis.setupStaticGetholidayPlanType,
    vacation: proxyUrls.setupApis.setupStaticgetVacation,
    nationalIdType: proxyUrls.setupApis.setupStaticgetNational

};
export interface StaticApiRes {
    payCycle: PayCycle;
    staticApiKey: StaticApiKey;
    legalEmployer: LegalEmployer;
    preferredLanguage: PreferredLanguage;
    preferredPhone: PreferredPhone;
    recruiter: Recruiter;
    recruiterSecondary: RecruiterSecondary;
    recruiterPercentage: RecruiterPercentage;
    recruiterSecondaryPercentage: RecruiterSecondaryPercentage;
    salesPerson: SalesPerson;
    salesPersonSecondary: SalesPersonSecondary;
    salesPersonPercentage: SalesPersonPercentage;
    salesPersonSecondaryPercentage: SalesPersonSecondaryPercentage;
    clientServiceManager: ClientServiceManager;
    salesTeam: SalesTeam;
    salesTeamOverride: SalesTeamOverride;
    recruiterTeam: RecruiterTeam;
    guaranteeTermsDays: GuaranteeTermsDays;
    normalWeeklyHours: NormalWeeklyHours;
    country: Country;
    startDateDelayReason: StartDateDelayReason;
    assignmentEndReason: AssignmentEndReason;
    workingRemote: WorkingRemote;
    workSchedule: WorkSchedule;
    immigrationStatus: ImmigrationStatus;
    visaType: VisaType;
    ceridianPayGroup: CeridianPayGroup;
    payCycles: PayCycle;
    payWeekendingDay: PayWeekEndingDay;
    payPer: PayPer;
    otRuleOverride: OtRuleOverride;
    usW2ElectronicConsent: UsW2ElectronicConsent;
    clientBillableOT: ClientBillableOT;
    billPer: BillPer;
    payFrequency: PayFrequency;
    ptoPlan: PTOPlan;
    holidayPlan: HolidayPlan;
    sickPlan: SickPlan;
    onboardingSpecialist: OnboardingSpecialist;
    exemptionStatus: ExemptionStatus;
    workerTypes: WorkerType;
    financeReviewStatus: FinanceReviewStatus;
    vmsList: VMS;
    location: Location;
    consultantPointOfContact: ConsultantPointOfContact;
    timeManagementSpecialist: TimeManagementSpecialist;
    personType: PersonType;
    prbuType: PrbuType;
    fusionCustomerIdAccount: FusionCustomerIdAccount;
    fusionCustomerIdParent: FusionCustomerIdParent;
    projects: Project;
    suppliers: FusionSupplier;
    isPerDiemBillable: IsPerDiemBillable;
    ptftList: PartTimeFullTime;
    fusionSupplierName: FusionSupplier;
    states: States;
    payCurrency: PayCurrency;
    preferredEmail: PreferredEmail;
    yesOrNo: YesOrNo;
    fusionAssignmentStatus: FusionAssignementStatus;
    lineOfBusiness: LineOfBusiness;
    getCustomUser:GetCustomUser;
    getCategory:GetCategory;
    internalJobCode:InternalJobCode;
    recruiterOverride: RecruiterOverride;
    nonCommissionableRecruiter: NonCommissionableRecruiter;
    salesPersonOverride: salesPersonOverride;
    nonCommissionableSalesPerson: nonCommissionableSalesPerson;
    holidayPlanType: HolidayPlanType;
    vacation: Vacation,
    nationalIdType: NationalIdType;
}
