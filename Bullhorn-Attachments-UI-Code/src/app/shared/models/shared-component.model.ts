import { LegalEmployer } from "./static-models/business-model/business-dropdown.modes";

export interface CustomersRes {
    customers: Customers[];
}

interface Customers {
    customerID: number;
    customerName: string;
}

export interface CutomerContactsRes {
    CutomerContactsData: CutomerContacts[];
}

interface CutomerContacts {
    customerID: number;
    customerName: string;
}

export interface PaygroupRes {
    paygroup: Paygroup[];
}

interface Paygroup {
    payGroupId: number;
    name: string;
    payCycleId: number | string;
    payFrequencyId: number;
    weekEndingId: number;
}
export interface PaycycleRes {
    paycycle: Paycycle[];
}

interface Paycycle {
    payCycleId: number;
    name: string;
}
export interface WeekendingRes {
    weekending: Weekending[];
}

interface Weekending {
    weekEndingId: number;
    name: string;
}
export interface EntityRes {
    entities: Entity[];
}

interface Entity {
    entityTypeId: number;
    Name: string;
}
export interface PayfrequencyRes {
    payfrequency: Payfrequency[];
}

interface Payfrequency {
    payFrequencyId: number;
    name: string;
}
export interface WorkscheduleRes {
    workschedule: Workschedule[];
}

interface Workschedule {
    workscheduleId: number;
    name: string;
}
export interface UnitofmeasureRes {
    unitofmeasure: Unitofmeasure[];
}

interface Unitofmeasure {
    uomId: number;
    name: string;
    desc: string;
}
export interface ClientbillableotRes {
    clientbillableot: Clientbillableot[];
}

interface Clientbillableot {
    clientBillableOTId: number;
    name: string;
}
export interface Statelistres {
    states: State[];
}

interface State {
    countryId: number;
    countryName: string;
    stateList: StateList[];
}

interface StateList {
    stateId: number;
    stateCode: string;
    stateName: string;
}
export interface WorkerTypeRes {
    workerTypes: WorkerType[];
}

interface WorkerType {
    workerTypeId: number;
    workerTypeName: number | string;
    workerTypeDesc: number | string;
}
export interface BrandOfferingRes {
    brandOfferings: BrandOffering[];
}

interface BrandOffering {
    brandOfferingId: number;
    brandOffering: string;
}
export interface ServiceLineRes {
    serviceLines: ServiceLine[];
}

interface ServiceLine {
    serviceLineID: number;
    serviceLineName: string;
    subServiceLine: SubServiceLine[];
}

interface SubServiceLine {
    subServiceLineID: number;
    subServiceLineName: string;
}
export interface LocationSegmentRes {
    locationSegments: LocationSegment[];
}

interface LocationSegment {
    locSegmentID: number;
    locSegmentName: string;
}
export interface PrbusRes {
    prbus: Prbus[];
} //----------> getting prbus by appUserId
interface Prbus {
    prbuID: number;
    prbuName: string;
    payCurrency: string;
}
export interface ProjectBuS {
    projectBU: ProjectBU[];
}

interface ProjectBU {
    projectBUId: number;
    projectBUName: string;
    billCurrency: string;
}

//------> getting all prbus
export interface Prbu {
    prbus: Prbus[];
}
interface Prbus {
    prbuID: number;
    prbuName: string;
    payCurrency: string;
}
export interface AssignmentstatusRes {
    assignmentstatus: Assignmentstatus[];
}

interface Assignmentstatus {
    asgmtStatusId: number;
    asgmtStatusName: string;
    asgmtStatusReasons: AsgmtStatusReason[];
}

interface AsgmtStatusReason {
    asgmtStatusReasonId: number | string;
    asgmtStatusReasonName: string;
}
export interface PracticeAreaRes {
    practiceAreas: PracticeArea[];
}

interface PracticeArea {
    practiceAreadId: number;
    name: string;
    active: string;
    hgcPracticeAreaId: number;
}
export interface PracticeHeadRes {
    practiceHeads: PracticeHead[];
}

interface PracticeHead {
    practiceHeadId: number;
    name: string;
    active: string;
}
export interface PracticeRoleRes {
    practiceRoles: PracticeRole[];
}

interface PracticeRole {
    practiceRoleId: number;
    name: string;
    active: string;
    code: string;
}
export interface YesnoRes {
    yesno: Yesno[];
}

interface Yesno {
    id: number;
    name: string;
}
export interface RefVendorTypeRes {
    refVendorTypes: RefVendorType[];
}

interface RefVendorType {
    refVendorType: number;
    name: string;
}
export interface RefVendorRateTypeRes {
    refVendorRateTypes: RefVendorRateType[];
}

interface RefVendorRateType {
    refVendorRateTypeId: number;
    name: string;
}
export interface RefSupplierRes {
    refSuppliers: RefSupplier[];
}

interface RefSupplier {
    refSupplierID: number;
    refSupplierName: number;
    refSupplierPayGroupId: number;
    refSupplierPayGroup: string;
    cafRefSupplierId: number;
    cafRefSupplierName: number;
}
export interface JobClassRes {
    jobClass: JobClass[];
}

interface JobClass {
    jobClassID: number;
    jobClassName: string;
    workerCompCode: number | string;
}
export interface employeetime {
    fulltimeparttime: Fulltimeparttime[];
}

interface Fulltimeparttime {
    employmentStatusID: number;
    name: string;
}
export interface shadowresourceclassification {
    shadowResources: ShadowResource[];
}

interface ShadowResource {
    sourceId: number;
    name: string;
    active: string;
}
export interface Delayreason {
    delayReasons: DelayReason[];
}

interface DelayReason {
    delayReasonId: number;
    delayReason: string;
    active: string;
}
export interface employmentTerminationReason {
    employmentstatus: Employmentstatus[];
}

interface Employmentstatus {
    emplStatusId: number;
    emplStatusName: string;
    emplStatusReasons: EmplStatusReason[] | EmplStatusReasons2;
}

interface EmplStatusReasons2 {
    emplStatusReasonId: string;
    emplStatusReasonName: string;
}

interface EmplStatusReason {
    emplStatusReasonId: number;
    emplStatusReasonName: string;
}

export interface localCodesRes {
    localCodesData: localCodesClass[];
}

interface localCodesClass {
    boStateCode: string;
    boStateCodeDesc: string;
    stateActive: string;
}

export interface skillCodesRes {
    skillCodesData: skillCodesClass[];
}

interface skillCodesClass {
    skillCode: string;
    skillCodeDescription: string;
    active: string;
}

export interface raceCodesRes {
    raceCodesData: raceCodesClass[];
}

interface raceCodesClass {
    name: string;
    raceId: string;
}

export interface eeoCodesRes {
    eeoCodesData: eeoCodesClass[];
}

interface eeoCodesClass {
    eeoCode: number;
    name: string;
}

export interface vetsCodesRes {
    vetsCodesData: vetsCodesClass[];
}

interface vetsCodesClass {
    vetsId: number;
    name: string;
}

export interface disabilityCodesRes {
    disabilityCodesData: disabilityCodesClass[];
}

interface disabilityCodesClass {
    disabilityId: number;
    name: string;
}

export interface workderDetailsRes {
    workderDetailsData: workderDetailsClass[];
}

interface workderDetailsClass {
    fname: string;
    mname: string;
    lname: string;
    preferredName: string;
    preferredLanguageName: string;
    genderName: string;
    taxID: number;
    dateOfBirth: Date;
}

export interface Vms {
    vms: Vm[];
}
interface Vm {
    vmsID: number;
    name: string;
}
export interface GenderDetails {
    gender: Gender[];
}

interface Gender {
    genderId: number;
    name: string;
}
export interface SickRuleRes {
    sickRule: SickRule[];
}

interface SickRule {
    sickRuleCode: string;
    description: string;
    active: string;
}

export interface CheckList {
    restToken: string;
    createdDateTime: string;
}
export interface ExemptStatusRes {
    exemptionStatus: ExemptionStatus[];
}

interface ExemptionStatus {
    exemptionStatusID: number;
    name: string;
}
export interface ExemptionReasonRes {
    exemptionReason: ExemptionReason[];
}

interface ExemptionReason {
    exemptionReasonId: number;
    description: string;
    active: string;
}
export interface secondaryArea {
    secPracticeAreas: SecPracticeArea[];
}

interface SecPracticeArea {
    secPracticeAreadId: number;
    name: string;
    active: string;
    hgcSecPracticeAreaId: number;
}
export interface StatusReasonRes {
    statusReason: StatusReason[];
}

interface StatusReason {
    statusReasonId: number;
    statusId: number;
    name: string;
    active: string;
}
export interface StepDefActionRes {
    stepDefAction: StepDefAction[];
}

interface StepDefAction {
    stepActionRuleDefId: number;
    startStepDefId: number;
    startStepDefName: string;
    endStepDefId: number;
    endStepDefName: string;
    actionTypeId: number;
    actionTypeName: string;
    stepActionRuleName: string;
}
export interface LanguageRes {
    language: Language[];
}

interface Language {
    languageId: number;
    name: string;
}
export interface ContactPurposeTypeRes {
    contactPurposeTypes: ContactPurposeType[];
}

interface ContactPurposeType {
    contcatPurposeId: number;
    contactPurposeName: string;
}
export interface WorkAuthTypeRes {
    workAuthTypes: WorkAuthType[];
}

interface WorkAuthType {
    workAuthTypeId: number;
    workAuthTypeName: string;
    countryId: number;
    countryName: string;
}
export interface VisaTypeRes {
    visaTypes: VisaType[];
}

interface VisaType {
    visaTypeId: number;
    visaName: string;
}
export interface WorkSecClearanceRes {
    workSecClearances: WorkSecClearance[];
}

interface WorkSecClearance {
    workSecClearanceId: number;
    workSecClearanceType: string;
    countryId: number;
    countryName: string;
}
export interface PostalAddressRes {
    postalAddresses: PostalAddress[];
}

interface PostalAddress {
    postalAddrType: number;
    name: string;
    active: string;
}

export interface VacationRuleRes {
    vacationRule: VacationRule[];
}

interface VacationRule {
    vacationBenefitCode: string;
    description: string;
    active: string;
}
export interface RolloverTypeRes {
    rolloverTypes: RolloverType[];
}

interface RolloverType {
    rollOverTypeId: number;
    rollOverType: string;
}
export interface HolidayRuleRes {
    holidayRule: HolidayRule[];
}

interface HolidayRule {
    holidayBenefitCode: string;
    description: string;
    active: string;
}
export interface GeocodeStatusRes {
    geocodeStatus: GeocodeStatus[];
}

interface GeocodeStatus {
    geocodeStatusId: number;
    geocodeStatusDescr: string;
    geocodestatusResultSummary: string;
}
export interface WorkSecClearanceRes {
    workSecClearances: WorkSecClearance[];
}

interface WorkSecClearance {
    workSecClearanceId: number;
    workSecClearanceType: string;
    countryId: number;
    countryName: string;
}
export interface WorkAuthTypeRes {
    workAuthTypes: WorkAuthType[];
}

interface WorkAuthType {
    workAuthTypeId: number;
    workAuthTypeName: string;
    countryId: number;
    countryName: string;
}
export interface SupplierRes {
    suppliers: Supplier[];
}

interface Supplier {
    supplierID: number;
    supplierName: string;
    supplierPayGroupId: number;
    supplierPayGroup: string;
}
export interface ElectronicConsentTypeRes {
    electronicConsentTypes: ElectronicConsentType[];
}

interface ElectronicConsentType {
    electronicConsentTypeId: number;
    name: string;
}
export interface SrcSystemRes {
    srcSystems: SrcSystem[];
}

interface SrcSystem {
    srcSystemId: number;
    srcSystemName: string;
}
export interface IdentifierTypeRes {
    identifierTypes: IdentifierType[];
}
export interface PerDiemLimitRes {
    perDiemLimit: PerDiemLimit[];
}

interface PerDiemLimit {
    perDiemLimitId: number;
    name: string;
    active: string;
}
export interface PerDiemBillableForRes {
    perDiemBillableFor: PerDiemBillableFor[];
}

interface PerDiemBillableFor {
    perDiemBillForId: number;
    name: string;
    active: string;
}

interface IdentifierType {
    identifierTypeId: number;
    name: string;
    active: string;
}
export interface ReportingDivisionRes {
    reportingDivision: ReportingDivision[];
}

interface ReportingDivision {
    reportDivId: number;
    name: string;
    active: string;
}
export interface InternalOrganizationRes {
    internalOrganization: InternalOrganization[];
}

interface InternalOrganization {
    subOrgId: number;
    name: string;
    active: string;
}
export interface ProcessTeamRes {
    processTeam: ProcessTeam[];
}

interface ProcessTeam {
    processTeamId: number;
    name: string;
    active: string;
}
export interface SalesTeamRes {
    salesTeam: SalesTeam[];
}

interface SalesTeam {
    salesTeamId: number;
    name: string;
    active: string;
}
export interface SelectColumnRes {
    selectColumns: SelectColumn2[];
}

interface SelectColumn2 {
    selectCategory: string;
    selectColumns: SelectColumn[];
}

interface SelectColumn {
    selectColumnId: number;
    selectColumn: string;
    selectColumnKey: string;
    tableColumnName: string;
}
export interface InternalEmployeeRes {
    personRoleType: PersonRoleType[];
}

interface PersonRoleType {
    personRoleTypeId: number;
    name: string;
    persons?: any;
}
export interface CapHgcPrbuIdsList {
    prbuIds: {
        cafPrbuId: any;
        hgcPrbuId: any;
    };
}

export interface StaticApiKey {
    appRoles: AppRole[];
    company: Company[];
    legalEmployee: LegalEmployee[];
    legalEmployeeClass: LegalEmployer;
    placementStatusReasons: PlacementStatusReasons[];
    placementWorkflowStage: PlacementWorkflowStages[];
    placementWorkflowStatus: PlacementWorkflowStatuses[];
    services: Service[];
}

export interface PlacementWorkflowStages {
    placementWorkflowStage: PlacementWorkflowStage;
}

export interface PlacementWorkflowStage {
    placementStageId: number;
    name: string;
}

export interface PlacementStatusReasons {
    placementStatusId: number;
    placementStatusReason: PlacementStatusReason;
    cancelReason:PlacementStatusReason
}

export interface PlacementStatusReason {
    reasonId: number;
    reason: string;
    active: string;
    placementStatusId: number;
    createdBy: number;
    createdDate: Date;
}

export interface PlacementWorkflowStatuses {
    placementWorkflowStatus: PlacementWorkflowStatus
}

export interface PlacementWorkflowStatus {
    placementStatusId: number;
    name: string
}

export interface LegalEmployee {
    legalEmployeeId: number;
    legalEmployeeName: string;
}

export interface Company {
    companyId: number;
    companyTypeId: string;
    companyName: string;
}

export interface Service {
    serviceLineId: number;
    serviceLineName: string;
}

export interface AppRole {
    roleId: number;
    roleName: string;
}