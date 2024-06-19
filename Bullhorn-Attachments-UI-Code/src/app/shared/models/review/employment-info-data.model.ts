import { AssignmentInformationTable } from '../Data-Table/worker-search-data-grid/assignment-information-tbl.model';
import { Employment } from './employment-data.model';

export class EmploymentInfoModel {
    employmentInfo: Employment;
    assignmentInfos: AssignmentInformationTable[];
    
    constructor(data: any) {
        this.employmentInfo = new Employment(data.employmentInfo);
        this.assignmentInfos = data.assignmentInfos;
    }
}
