import { Assignment, AssignmentAudit } from './assignment-data.model';
import { AssignmentTeamAddr, AssignmentTeamAddrAudit } from './assignment-team-addr-data.model';
import { Person, PersonAudit } from './person-data.model';
import { TimeSetup, TimeSetupAudit } from './time-setup-data.model';
import { TimeSetupRates, TimeSetupRatesAudit } from './time-setup-rates-data.model';

export class PlacementReviewDataModel {
    caseId: string | null | undefined;
    placementId: string | null | undefined;
    isSetupReviewCompleted: string | null | undefined;
    setUpReviewerId: string | null | undefined;
    setupReviewerName: string | null | undefined;
    isFinanceReviewCompleted: string | null | undefined;
    financeReviewerId: string | null | undefined;
    financeReviewerName: string | null | undefined;
    financeReviewerComments:string | null | undefined;
    financeReviewStatusReason:string | null | undefined;
    financeReviewStatusReasonId:string | null | undefined;
    financeReviewStatus: string | null | undefined;
    financeReviewStatusId: string | null | undefined;
    modifiedBy: string | null | undefined;
    modifiedByName: string | null | undefined;
    placementStatusId: string | null | undefined;
    person: Person;
    isPersonUpdate: string | null | undefined;
    assignment: Assignment;
    isAssignmentUpdate: string | null | undefined;
    assignmentTeamAddr: AssignmentTeamAddr;
    isAssignmentTeamsAddrUpdate: string | null | undefined;
    timeSetup: TimeSetup;
    timeElementsRates:TimeSetupRates;
    isTimeSetupUpdate: string | null | undefined;
    isTimeElementsRatesUpdate: string | null | undefined;
    isReviewedBy: string | null | undefined;
    reviewedBy: string | null | undefined;

    constructor(data: PlacementReviewDataModel) {
        Object.assign(this, data);
        this.person = new Person(data.person);
        this.assignment = new Assignment(data.assignment);
        this.assignmentTeamAddr = new AssignmentTeamAddr(data.assignmentTeamAddr);
        this.timeSetup = new TimeSetup(data.timeSetup);
        this.timeElementsRates=new TimeSetupRates(data.timeElementsRates);
    }
}

export class PlacementReviewAuditDataModel {
    caseId: string = '';
    placementId: string = '';
    placementStatusId: string = '';
    person: PersonAudit;
    assignment: AssignmentAudit;
    assignmentTeamAddr: AssignmentTeamAddrAudit;
    timeSetup: TimeSetupAudit;
    timeElementsRates:TimeSetupRatesAudit;

    constructor() {
        this.person = new PersonAudit();
        this.assignment = new AssignmentAudit();
        this.assignmentTeamAddr = new AssignmentTeamAddrAudit();
        this.timeSetup = new TimeSetupAudit();
        this.timeElementsRates=new TimeSetupRatesAudit();
    }
}