export class TimeSetup {
    tsTimeSetupId: string | null | undefined;
    allowHoliday: string | null | undefined;
    allowTimeEntry: string | null | undefined;
    allowWeekend: string | null | undefined;
    allowWorkerToChangeCalculatedHours: string | null | undefined;
    biWeeklyCycle: string | null | undefined;
    consolidateMultipleAssignmentsToOneEmail: string | null | undefined;
    creatingMissingTimesheets: string | null | undefined;
    extractBillRule: string | null | undefined;
    extractPayRule: string | null | undefined;
    healthWelfareBill: string | null | undefined;
    healthWelfarePay: string | null | undefined;
    holidayPay: string | null | undefined;
    holidayPayBill: string | null | undefined;
    layout: string | null | undefined;
    maximumPerDay: string | null | undefined;
    maximumPerPeriod: string | null | undefined;
    mealBreakTracking: string | null | undefined;
    mealPremiumBill: string | null | undefined;
    mealPremiumPay: string | null | undefined;
    mileageBill: string | null | undefined;
    mileagePay: string | null | undefined;
    minumumPerDay: string | null | undefined;
    minumumPerPeriod: string | null | undefined;
    nextBiWeeklyPeriodEnd: string | null | undefined;
    nightDifferentialBill: string | null | undefined;
    nightDifferentialDtBill: string | null | undefined;
    nightDifferentialDtPay: string | null | undefined;
    nightDifferentialOtBill: string | null | undefined;
    nightDifferentialOtPay: string | null | undefined;
    nightDifferentialPay: string | null | undefined;
    onCallPagerBill: string | null | undefined;
    onCallPagerPay: string | null | undefined;
    otStartPerDay: string | null | undefined;
    otStartPerPeriod: string | null | undefined;
    payCycle: string | null | undefined;
    perDiemBillableDailyPay: string | null | undefined;
    perDiemDailyBill: string | null | undefined;
    perDiemNonBillDailyPay: string | null | undefined;
    tsProjectType: string | null | undefined;
    restrictApproverEmail: string | null | undefined;
    sendEmailToWorker: string | null | undefined;
    sickPayBill: string | null | undefined;
    sickPayBillablePay: string | null | undefined;
    sickPayNonBillablePay: string | null | undefined;
    timeCardEndOfWeek: string | null | undefined;
    timeEntryMethod: string | null | undefined;
    timecardApprovalMethod: string | null | undefined;
    useTimeInOutEntry: string | null | undefined;
    vacationBillableBill: string | null | undefined;
    vacationBillablePay: string | null | undefined;
    timeSetupExpenses: string | null | undefined;
    expenseLimit: string | null | undefined;
    expensesAllowed: string | null | undefined;
    timeSetupPiecework: string | null | undefined;
    billRate: string | null | undefined;
    payRate: string | null | undefined;
    piceworkItem: string | null | undefined;
    timeSetupSpecialPayRates: string | null | undefined;
    activityCodePayCode: string | null | undefined;
    billingCode: string | null | undefined;
    effectiveDate: string | null | undefined;
    effectiveEnd: string | null | undefined;
    endTime: string | null | undefined;
    specialBillRate: string | null | undefined;
    specialPayRate: string | null | undefined;
    startTime: string | null | undefined;
    timeType: string | null | undefined;
    timeCardLayout: string | null | undefined;
    timeEntrySource: string | null | undefined;
    attestationFlag: string | null | undefined;


    constructor(data: TimeSetup) {
        Object.assign(this, data);
    }
}

export class TimeSetupAudit {
    mealBreakTracking: string = 'Meal Break Tracking';
    timeCardEndOfWeek: string = 'Time Card - End of Week';
    timeEntryMethod: string = 'Time Entry Method';
    timeCardLayout: string = 'Time Card Layout';
    timeEntrySource: string = 'Time Entry Source';
    perDiemBillableDailyPay: string  = 'Per Diem Billable - Daily Pay';
    perDiemDailyBill: string  = 'Per Diem Daily Bill';
    perDiemNonBillDailyPay: string  = 'Per Diem Non Bill - Daily Pay';

    constructor() {}
}
