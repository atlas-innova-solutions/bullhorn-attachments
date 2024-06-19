import { Component, Input, OnInit } from '@angular/core';
import { LangTranslateService } from '../../../../shared/services/Lang-translate-service/lang-translate.service';
import { SetupDataService } from '../../../../shared/services/data-service/setup-data.service';
import { Employment } from '../../../../shared/models/review/employment-data.model';
import { AssignmentInformationTable } from '../../../../shared/models/Data-Table/worker-search-data-grid/assignment-information-tbl.model';
import { DateFormatService } from '../../../../shared/services/date-format/date-format-service';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-employment-dashboard',
  templateUrl: './employment-dashboard.component.html',
  styleUrl: './employment-dashboard.component.scss',
  providers:[TitleCasePipe]
})
export class EmploymentDashboardComponent implements OnInit {
  EmploymentInfo!: Employment | undefined;
  assignmentInfo!:AssignmentInformationTable[];  
  @Input()
  public set employmentInformation(data: Employment) {
    if (data) {
      this.EmploymentInfo=data;

      this.fetchPlacementReviewData();
     }
  }
  @Input()
  public set assignmentInformation(data: AssignmentInformationTable[]) {
    if (data) {
      this.assignmentInfo=data;
     }
  }
  constructor(private translateService: LangTranslateService,private setupDataService: SetupDataService,
    public dateFormatService:DateFormatService, public titlecase:TitleCasePipe)
  {}
  employeeInfoData:any[]=[];
  ngOnInit(){
    const selectedLang = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'English';
    this.translateService.changeLanguage(selectedLang);
  }
  public fetchPlacementReviewData() {
    this.employeeInfoData=[];
    this.employeeInfoData.push(this.EmploymentInfo);
}

formatDate(date:any){
  return (date && date!=null)?this.dateFormatService.convert_to_mmddyyyy(date):'';
}


}