export interface SelectColumnsRes {
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
export interface AssignmentListRes {
    assignmentList: AssignmentList[];
    totalCount: number;
    sysDate: string;
}

interface AssignmentList {
    caseId: number;
    bhPlacementId: string;
    asgmtODSPlacementId: string;
    asnmtID: number;
    employmentId: number;
    workerID: number;
    hgcAsnmtID: number;
    personFirstName: string;
    personMiddleName: string;
    personLastName: string;
    workerDateOfBirth: string;
    genderId: number | string;
    gender: string;
    workerSSN: number | string;
    prbuId: number;
    prbuName: string;
    customerID: number;
    customerName: string;
    workerType: string;
    emplStatusID: number;
    emplStatus: string;
    asmtStatusId: number;
    asmtStatus: string;
    jobTitle: string;
    rmID: number;
    rmFname: string;
    rmMname: string;
    rmLname: string;
    obID: number;
    obFirstName: string;
    obMiddleName: string;
    obLastName: string;
    hgcPersonId: number;
    emplStatusReason: string;
    workState: string;
    workerTypeId: number;
    projectBuId: number;
    plannedCompletionDate: string;
}
export interface EmploymentPayDetailsRes {
    employmentPayDetails: EmploymentPayDetails;
}

interface EmploymentPayDetails {
    emplId: number;
    payDetails: PayDetail[];
}

interface PayDetail {
    effectiveFromDate: string;
    effectiveToDate: string;
    createdBy: number;
    createdDateTime: string;
    modifiedBy: number;
    modifiedDateTime: string;
    createdByFirstName: string;
    createdByLastName: string;
    modifiedByFirstName: string;
    modifiedByLastName: string;
    notes: string;
    weekEndingName: string;
    payFreq: string;
    payCycleName: string;
}
