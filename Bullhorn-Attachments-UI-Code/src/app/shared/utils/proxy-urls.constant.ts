export interface ProxyUrlObj {
    bhOdsServices: BhOdsServices;
    odsCoreServices: OdsCoreServices;
    appStaticProperties: AppStaticProperties;
    setupApis: SetupApis;
    effectiveDatesServices: EffectiveDatesServices;
    workerSearchServices: WorkerSearchServices;
    timeSetupServices: TimeSetupServices;
    uiErrorMessages: UiErrorMessages;
    domainURL: DomainURL;
    authServices: AuthServices;
    staticServices: StaticServices;
    readServices: ReadServices;
    updateSerivices: UpdateSerivices;
    
}

interface UpdateSerivices {
    addressUdate: string;
    geoCodeValidaitonUpdate: string;
    assigment2Update: string;
    assignment1Update: string;
    employmentUpdate: string;
    workerUpdate: string;
    workerAuthorizationUpdate: string;
    contactUpdate: string;
    workerAddressUpdate: string;
    workSecClearanceTypesUpdate: string;
    assignment3Update: string;
    hgcWorkerUpdate: string;
    supplierUpdate: string;
    workercreateAddressUpdate: string;
    stepActionRulesUpdate: string;
    customerAdressUpdate: string;
    casesUpdate: string;
    cafCaseCreation: string;
    cutomerContactCreate: string;
    contactPostalAddrCreated: string;
    createEntityNote: string;
    createNote: string;
    externalSystemIdentifierUpdate: string;
    workerAddressDelete: string;
    physicalWorkerAddressUpdate: string;
    caseCreation: string;
    asgmtSetPrimary: string;
    caseUpdateMD: string;
    datasync: string;
}

interface ReadServices {
    casesRead: string;
    caseStatusRead: string;
    caseDetailsRead: string;
    workerRead: string;
    employmentRead: string;
    contactsRead: string;
    workAuthorizationRead: string;
    supplierRead: string;
    worksecclearancetypesRead: string;
    workerAddressesRead: string;
    assignmentRead: string;
    assignmentRolesRead: string;
    geoCodeValidationResultsRead: string;
    addressRead: string;
    sickruleRead: string;
    authorizationRead: string;
    internalEmployeeRead: string;
    asgmtChangeHistory: string;
    hgcPersonCount: string;
    cutomerContactRead: string;
    readEntityNote: string;
    readNote: string;
    minimumWageComplainceRead: string;
    casesStatusCount: string;
    casesInitiationPendingCount: string;
    externalSysIdentifier: string;
    prbuReportingDevision: string;
    userLoginDetails: string;
    producerCaseId: string;
    cdcrelay: string;
    bullhornPlacementCreation: string;
    // lastLoginDetails: string;
}

interface StaticServices {
    personRoleType: string;
    cafstatus: string;
    geoCodeStatus: string;
    workSecClearanceTypes: string;
    workAuthType: string;
    prbus: string;
    serviceLines: string;
    locationSegments: string;
    jobClasses: string;
    visaTypes: string;
    statusReason: string;
    payFrequency: string;
    unitofmeasure: string;
    stepDefAction: string;
    vmssystem: string;
    weekending: string;
    paygroup: string;
    payCycle: string;
    state: string;
    fulltimeparttime: string;
    exemption: string;
    contactPurposeTypes: string;
    sickRule: string;
    exemptionReason: string;
    gender: string;
    language: string;
    holidayRule: string;
    disability: string;
    race: string;
    vets: string;
    govtworkertype: string;
    sickrules: string;
    eeo: string;
    vacationRule: string;
    clientbillableot: string;
    assignmentStatuses: string;
    employmentStatuses: string;
    ptorollovertypes: string;
    skillcodes: string;
    localcodes: string;
    selectColumns: string;
    workschedule: string;
    entities: string;
    rehireEligible: string;
    brandOffering: string;
    delayReasons: string;
    projBUs: string;
    checklisttoken: string;
    electronicConsent: string;
    addressTypes: string;
    identifiersTypes: string;
    sourceSystems: string;
    yesnoflgs: string;
    serviceLinesByAppUserId: string;
    locationSegByAppUserId: string;
    prbuByAppUserId: string;
    workerTypeByAppUserId: string;
    companiesByAppUserId: string;
    practiceArea: string;
    recruitTeam: string;
    practiceHead: string;
    practiceRole: string;
    supplierByAppUserId: string;
    projectBUByAppUserId: string;
    vendorRefTypes: string;
    vendorRefRateTypes: string;
    shadowresources: string;
    secondaryArea: string;
    perDiemLimit: string;
    perDiemFor: string;
    emplCategory: string;
    emplContractType: string;
    interCompany: string;
    reportingdivision: string;
    salesTeam: string;
    processTeam: string;
    internalOrganization: string;
    prbuHgcIds: string;
}

interface AuthServices {
    suppliers: string;
    projectByCustomerId: string;
    customerDetail: string;
    hgcWorker: string;
    hgcAssignments: string;
    hgcTotalAssignments: string;
    autoWorkerLookup: string;
    manualWorkerlookup: string;
    newWorkerLookup: string;
    getSupplierById: string;
    customers: string;
    workerBenefits: string;
    hgcAssignmentIdCheck: string;
    taxIdExistCheck: string;
    referrals: string;
    hgcCustomersList: string;
    nonusWorkerlookup: string;
    hgcCompanies: string;
}

interface DomainURL {
    ldapLogin: string;
    geocoding: string;
}

interface UiErrorMessages {
    serviceTakingLongTime: string;
}

interface TimeSetupServices {
    hgcLoginAPI: string;
    hgcLoginAPILogout: string;
    hgcServerName: string;
}

interface WorkerSearchServices {
    workerTypeView: string;
    assignmentTypeView: string;
    ratesTypeView: string;
    contactsTypeView: string;
    defaultWS2Status: string;
    defaultWSAssignmentStatus: string;
    defaultWSEmploymentStatus: string;
    assignmentViewFilter: string;
    workerTypeViewFilter: string;
    ratesViewFilter: string;
    contactViewFilter: string;
    defaultWSFilter: string;
    wsViewsService: string;
    wsViewOtherService: string;
    wsFilterViewsService: string;
    wsFilterViewsOtherService: string;
}

interface EffectiveDatesServices {
    asgmtPerDiemRead: string;
    positionRead: string;
    positionUpdate: string;
    positionDelete: string;
    asgmtPerDiemDelete: string;
    positionPORead: string;
    positionPOUpdate: string;
    positionPODelete: string;
    assignmentBillRateRead: string;
    assignmentBillRateUpdate: string;
    assignmentBillRateDelete: string;
    assignmentPayRateRead: string;
    assignmentPayRateUpdate: string;
    assignmentPayRateDelete: string;
    employmentHolidayRead: string;
    employmentHolidayUpdate: string;
    employmentHolidayDelete: string;
    employmentPTORead: string;
    employmentPTOUpdate: string;
    employmentPTODelete: string;
    employmentPayRateRead: string;
    employmentPayRateUpdate: string;
    employmentPayRateDelete: string;
    assignmentSickRead: string;
    assignmentSickUpdate: string;
    assignmentSickDelete: string;
    vmsEffectiveUpdate: string;
    vmsEffectiveRead: string;
    vmsEffectiveDelete: string;
    employmentPayEffectiveRead: string;
    employmentPayEffetiveUpdate: string;
    employmentPayEffectiveDelete: string;
    portalFeeEffectiveRead: string;
    portalFeeEffectiveUpdate: string;
    portalFeeEffectiveDelete: string;
    asgmtAddressUpdate: string;
    asgmtServHistoryRead: string;
    asgmtPhysicalHistoryRead: string;
    homeAddrUpdate: string;
    homeAddrHistoryRead: string;
    workPermitUpdate: string;
    asgmtPerDiemUpdate: string;
    workPermitRead: string;
    workPermitDelete: string;
}

interface AppStaticProperties {
    timeOutSecs: number;
    timeIntervalSecs: number;
    cacheLocation: string;
    storeAuthStateInCookie: string;
    graphMeEndpoint: string;
    scopes: [];
    authorityInnova: string;
    backendScopesInnova: string;
    clientIdInnova: string;
    authorityVolt: string;
    backendScopesVolt: string;
    clientIdVolt: string;
    clientSecretId:string;
    scopeBackendtoken: string;
}

interface SetupApis {
    setupStaticgetInternalJobCode: any;
    setupLogin: string;
    setupLastlogin: string;
    setupLogout: string;
    setupStatusHistorySave: string;
    setupstatusHistorySaveForCancel:string;
    setupStatusHistoryOfCase: string;
    setupAuditHistoryGet: string;
    setupAuditHistorySave: string;
    setupFusionEntryElementDetails: string;
    setupFusionChangeRequest: string;
    setupStatic: string;
    setupStatusChangeForOpenToInreview: string;
    setupPlacements: string;
    setupSearch: string;
    setupPlacementDetails: string;
    setupEmplPreview: string;
    setupPlacementDownload: string;
    setupSaveOrReview: string;
    setupWorkerSearchData: string;
    setupWorkerSearch: string;
    setupworkerSearchDownloadWorkerSearch: string;
    setupEmplDashboard: string;
    financeStatusReason: string;
    setupStaticgetAllDataLegalEmployer: string;
    setupStaticGetAllDataPreferredLanguage: string;
    setupStaticgetPreferredPhone: string;
    setupStaticgetStaticRecruiter: string;
    setupStaticgetStaticRecruiterSecondary: string;
    setupStaticgetStaticRecruiterPercentage: string;
    setupStaticgetStaticRecruiterSecondaryPercentage: string;
    setupStaticgetStaticSalesPerson: string;
    setupStaticgetStaticSalesPersonSecondary: string;
    setupStaticgetStaticSalesPersonPercentage: string;
    setupStaticgetStaticSalesPersonSecondaryPercentage: string;
    setupStaticgetStaticClientServiceManager: string;
    setupStaticgetStaticSalesTeam: string;
    setupStaticgetStaticSalesTeamOverride: string;
    setupStaticgetStaticRecruiterTeam: string;
    setupStaticgetStaticGuaranteeTermsDays: string;
    setupStaticgetStaticNormalWeeklyHours: string;
    setupStaticgetStaticPayFrequency: string;
    setupStaticgetAllDataCountry: string;
    setupStaticgetStaticStartDateDelayReason: string;
    setupStaticgetStaticAssignmentEndReason: string;
    setupStaticgetStaticWorkingRemote: string;
    setupStaticgetStaticWorkSchedule: string;
    setupStaticgetStaticImmigrationStatus: string;
    setupStaticgetStaticVisaType: string;
    setupStaticgetStaticCeridianPayGroup: string;
    setupStaticgetStaticPayCycle: string;
    setupStaticgetStaticPayWeekendingDay: string;
    setupStaticgetStaticPayPer: string;
    setupStaticgetStaticOtRuleOverride: string;
    setupStaticgetStaticUsW2ElectronicConsent: string;
    setupStaticgetStaticClientBillableOT: string;
    setupStaticgetStaticBillPer: string;
    setupStaticgetStaticPtoPlan: string;
    setupStaticgetStaticHolidayPlan: string;
    setupStaticgetStaticSickPlan: string;
    setupStaticgetStaticOnBoardingSpecialist: string;
    setupStaticgetStaticExemptionStatus: string;
    setupStaticgetAllDataWorkerType: string;
    setupStaticgetFinanceReviewStatus: string;
    setupStaticgetStaticVmsName: string;
    setupStaticgetAllDataPersonType: string;
    setupStaticgetAllDataPrbuType: string;
    setupStaticgetAllDatafusionCustomerIdAccount: string;
    setupStaticgetAllDatafusionCustomerIdParent: string;
    setupStaticgetStaticProjects: string;
    setupStaticgetStaticSuppliers: string;
    setupStaticgetStaticIsPerDiemBillable: string;
    setupStaticgetStaticPtft:string;
    setupStaticgetStaticLocation:string
    setupStaticgetStaticConsultantPointOfContact:string
    setupStaticgetFusionSupplierName:string;
    setupStaticgetState: string;
    setupStaticgetPayCurrency: string;
    setupStaticgetPreferredEmail: string;
    setupStaticgetStaticTimeManagementSpecialist: string;
    setupStaticgetYesOrNo: string;
    setupCustomFieldGet: string;
    setupCustomFieldSave: string;
    setupStaticGetFusionAsgmtStatus: string;
    setupStaticGetLineOfBusinessFromFusion: string;
    setupCustomUserGet:string;
    sharedGeocoding: string;
    setupCustomFieldValueSave: string;
    setupCustomFieldValueGet: string;
    setupCategoryGet:string;
    setupVerify: string;
    setupStaticGetRecruiterOverride: string;
    setupStaticGetNonCommissionableRecruiter: string;
    setupStaticGetNonCommissionableSalesPerson: string;
    setupStaticGetSalesPersonOverride: string;
    setupStaticGetholidayPlanType: string;
    setupStaticgetVacation: string;
    setupStaticgetNational: string;
    getRolesByAppUserId: string;
    setupCsfIdGet: string;
}

interface OdsCoreServices {
    assignmentList: string;
    assignmentListPagination: string;
    workerAssignment: string;
    assignmentByID: string;
    workerPersonalInfo: string;
    workerAddressInfo: string;
    workerContactInfo: string;
    workerAuthorizations: string;
    workerSecurityClearances: string;
    workerSupplier: string;
    assignmentRole: string;
    addressInformation: string;
    geocodeAddressValidationInformation: string;
    employmentRead: string;
    updateAssignment1: string;
    updateassigment2: string;
    updateassigment3: string;
    updateEmployment: string;
    personalInformation: string;
    workerContacts: string;
    workerCustomerAddress: string;
    workerSuppliers: string;
    updateAddress: string;
    updateGeocodeValidationResults: string;
    updateEmploymentStatus: string;
    updateEmploymentMedicalBenfits: string;
    updateEmploymentPTO: string;
    updateWorkerEEO: string;
    updateAssignment4: string;
    updateEmploymentJob: string;
    updateWorkAuthorizations: string;
    updateWorkerSecurityClearances: string;
    cafIncludeAssignments: string;
    datasyncdtls: string;
    changeHistory: string;
    workerTypeView: string;
    assignmentTypeView: string;
    ratesTypeView: string;
    contactsTypeView: string;
    defaultWS2Status: string;
    defaultWSAssignmentStatus: string;
    defaultWSEmploymentStatus: string;
    assignmentStatusHistory: string;
    employmentStatusHistory: string;
    sickRuleByWorker: string;
    cancelAssignmentCompletion: string;
    userDetails: string;
    personRolesByPersonid: string;
    updateRoles: string;
    personWithRoles: string;
    personRolesByPersonId: string;
    person: string;
    personRolesHistory: string;
    personRolesHistoryById: string;
    filterPerson: string;
    updateState: string;
    updateCountry: string;
    rollback: string;
    changeRequestList: string;
    raiseRequest: string;
    getEditStatus: string;
    filterChangeRequestList: string;
    approveOrReject: string;
}

interface BhOdsServices {
    placements: string;
    bullhornPlacement: string;
    bullplacements: string;
    bhCompanies: string;
    bullhornRejectCompanies: string;
    filterBullhornHgcMappedCompanys: string;
    bullhornHgcMappedCompanys: string;
}
