export class PayChangeModel {
    personNumber: string | null | undefined;
    assignmentNumber: string | null | undefined;
    requestType: string | null | undefined;
    paybilChange: paybilChange[] | undefined;
    comments:  string | null | undefined;
    effectiveDate: string | null | undefined;
}

export class paybilChange {
    ScreenEntryValue: string | null | undefined;
    InputValueName: string | null | undefined;
}

export class ChangeManagementModel {
    effectiveStartDate: string | null | undefined;
    elementEntryValues: paybilChange[] | undefined;
}

export class AssignmentModel {
    personNumber: string | null | undefined;
    assignmentNumber: string | null | undefined;
    requestType: string | null | undefined;
    endDate: string | null | undefined;
    comments:  string | null | undefined;
    actionReasonCode:  string | null | undefined;

    constructor(data: AssignmentModel) {
        Object.assign(this, data);
    }
}

export class QueryParamsModel {
    fusionEmployeeId: string | null | undefined;
    fusionAssignmentId: string | null | undefined;
    effectiveEndDate: any;
    asgmtStartDate: string | null | undefined;
    fusionSupplierName:string | null | undefined;
    placementId:string | null | undefined;
    assignmentStatus:string | null | undefined;
    personType:string | null | undefined;
    primaryAssignmentFlag:string | null | undefined;
    workerName:string | null | undefined;
}

