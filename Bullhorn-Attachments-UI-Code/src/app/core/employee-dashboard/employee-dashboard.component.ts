import { Component, OnInit, Renderer2 } from '@angular/core';
import { LangTranslateService } from '../../shared/services/Lang-translate-service/lang-translate.service';
import { MenuLabel } from '../../shared/utils/menu-label';
import { CoreModulesUrl } from '../../shared/utils/page-navigation-url';
import { PlacementReviewDataModel } from '../../shared/models/review/placement-review-data.model';
import { SetupDataService } from '../../shared/services/data-service/setup-data.service';
import { EmploymentInfoModel } from '../../shared/models/review/employment-info-data.model';
import { Employment } from '../../shared/models/review/employment-data.model';
import { AssignmentInformationTable } from '../../shared/models/Data-Table/worker-search-data-grid/assignment-information-tbl.model';
import { DateFormatService } from '../../shared/services/date-format/date-format-service';
import { TitleCasePipe } from '@angular/common';
import {NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss',
  providers: [TitleCasePipe]
})
export class EmployeeDashboardComponent implements OnInit {
  employmentInformation!: Employment;
  assignmentInformation!:AssignmentInformationTable[];
  personId!: string;
  items = [
    {
        label: 'Employee Dashboard',
        icon: 'pi pi-th-large icon-circle',
    },
    {
        label: 'Assignment List',
        icon: 'pi pi-book',
    }
];
toggleFlag: boolean = true;
  display: any;
  reviewData!: EmploymentInfoModel | any;

  displayPage: string= '';

  constructor(private translateService: LangTranslateService,private setupDataService: SetupDataService,private renderer: Renderer2,
    private dateFormatService:DateFormatService,public titlecase: TitleCasePipe,private spinner:NgxSpinnerService,
    private route: ActivatedRoute
    ) {

  }
  ngOnInit(): void {
    const selectedLang = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'English';
    this.translateService.changeLanguage(selectedLang);
    this.route.queryParamMap.subscribe((params: any) => {
      if (params.params) {
          this.personId = params.params.personId;
          this.fetchPlacementReviewData();
      }
  });
    this.displayPage='Employee Dashboard';
    this.renderer.addClass(document.body, 'sidebar-open');

  };
  public fetchPlacementReviewData() {
    this.spinner.show();
    this.setupDataService.getEmploymentDashboardDetails(this.personId).subscribe(
      (res: EmploymentInfoModel) => {
        this.reviewData = res; 
        this.employmentInformation=this.reviewData?.employmentInfo;
        this.assignmentInformation=this.transformDate(this.reviewData?.assignmentInfos);
        this.spinner.hide();
      },
      (err: any) => {
        console.log('error_Details: ', err);
        this.spinner.hide();

      }
    );
  }
  openMenu(displayPage:any) {
    this.displayPage = displayPage.label;
  }

  sidebaropen() {
    if (this.toggleFlag == false) {
      this.renderer.addClass(document.body, 'sidebar-open');
      this.toggleFlag = true;
    } 
    else {
      this.toggleFlag = false;
    }
  }
  //Method for date formating
  transformDate(assignmentInfo:AssignmentInformationTable[]) {
    return assignmentInfo.map((item: any) => {
        item.actualStartDate =(item.actualStartDate && item.actualStartDate!=null)?this.dateFormatService.convert_to_mmddyyyy(item.actualStartDate):'';
        item.actualEndDate =(item.actualEndDate && item.actualEndDate!=null)?this.dateFormatService.convert_to_mmddyyyy(item.actualEndDate):'-';
        item.targetStartDate =(item.targetStartDate && item.targetStartDate!=null)?this.dateFormatService.convert_to_mmddyyyy(item.targetStartDate):'';
        item.targetEndDate =(item.targetEndDate && item.targetEndDate!=null)?this.dateFormatService.convert_to_mmddyyyy(item.targetEndDate):'';
        item.suspendDate =(item.suspendDate && item.suspendDate!=null)?this.dateFormatService.convert_to_mmddyyyy(item.suspendDate):'';
        item.plannedEndDate =(item.plannedEndDate && item.plannedEndDate!=null)?this.dateFormatService.convert_to_mmddyyyy(item.plannedEndDate):'';
        item.createdOn = (item.createdOn && item.createdOn!=null)?this.dateFormatService.convert_to_mmddyyyy(item.createdOn):'';
        item.updatedOn =(item.updatedOn && item.updatedOn!=null)?this.dateFormatService.convert_to_mmddyyyy(item.updatedOn):'';
        item.assignmentStatus =(item.assignmentStatus && item.assignmentStatus!=null)?this.titlecase.transform(item.assignmentStatus):'';
        return item;
    });
  }
}


