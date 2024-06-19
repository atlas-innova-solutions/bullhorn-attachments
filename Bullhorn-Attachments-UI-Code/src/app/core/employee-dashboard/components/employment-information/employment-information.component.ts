import { Component } from '@angular/core';
import { PlacementReviewDataModel } from '../../../../shared/models/review/placement-review-data.model';
import { LangTranslateService } from '../../../../shared/services/Lang-translate-service/lang-translate.service';
import { SetupDataService } from '../../../../shared/services/data-service/setup-data.service';

@Component({
  selector: 'app-employment-information',
  templateUrl: './employment-information.component.html',
  styleUrl: './employment-information.component.scss'
})
export class EmploymentInformationComponent {

  reviewData!: PlacementReviewDataModel;

  constructor(private translateService: LangTranslateService,private setupDataService: SetupDataService){}
  employeeInfoData:any[]=[];
  ngOnInit(){
    const selectedLang = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'English';
    this.translateService.changeLanguage(selectedLang);
    this.fetchPlacementReviewData();
  }
  public fetchPlacementReviewData() {
    this.employeeInfoData=[];
    this.setupDataService.getPlacementDetails(102000).subscribe(
      (res: PlacementReviewDataModel) => {
        this.reviewData = res; 
        console.log(this.reviewData);
        this.employeeInfoData.push(this.reviewData);
        console.log(this.employeeInfoData)
      },
      (err: any) => {
        console.log('error_Details: ', err);
      }
    );
  }

}

