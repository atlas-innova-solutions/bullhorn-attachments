export class ChangeStatusRequest {
    caseId!: number;
    placementId!: number;
    placementStatusId!: number;
    updatedBy!: number;
    placementReasonId!: number;
    comments! : string;
    onHoldToOtherStatus! : string

    constructor(caseId: number, placementId: number, placementStatusId: number, updatedBy: number, placementReasonId: number, comments: string, onHoldToOtherStatus: string) {
        this.caseId = caseId;
        this.placementId = placementId;
        this.placementStatusId = placementStatusId;
        this.updatedBy = updatedBy;
        this.placementReasonId = placementReasonId;
        this.comments = comments;
        this.onHoldToOtherStatus = onHoldToOtherStatus;
    }
}
export class ChangeCancelRequest {
    caseId!: number;
    placementId!: number;
    placementStatusId!: number;
    updatedBy!: number;
    placementReasonId!: number;
    comments! : string;

    constructor(caseId: number, placementId: number, placementStatusId: number, updatedBy: number, placementReasonId: number, comments: string) {
        this.caseId = caseId;
        this.placementId = placementId;
        this.placementStatusId = placementStatusId;
        this.updatedBy = updatedBy;
        this.placementReasonId = placementReasonId;
        this.comments = comments;
    }
}

export class StatusHistoryData {
    statusHistoryId!: number;
    caseId!: number;
    placementId!: number;
    placementStatusId!: number;
    placementStatus!: string;
    updatedBy!: number;
    updatedOn!: string;
    updateByName!: string;
    placementReasonId!: number;
    reason!: string;
    comments! : string;
}