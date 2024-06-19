import { Component, Input } from '@angular/core';
import { PlacementReviewDataModel } from '../../../../shared/models/review/placement-review-data.model';
import { DateFormatService } from '../../../../shared/services/date-format/date-format-service';

@Component({
  selector: 'app-time-elements',
  templateUrl: './time-elements.component.html',
  styleUrl: './time-elements.component.scss'
})
export class TimeElementsComponent {
  constructor(private dateFormatService: DateFormatService) {}
  selectedValue:string='';
  billSectionAvailable:boolean=false;
  allReviewData!: PlacementReviewDataModel | undefined
  @Input()
  public set reviewData(data: PlacementReviewDataModel) {
    if (data) {
        this.allReviewData = data;
        if (this.allReviewData.timeElementsRates) {
          if (this.allReviewData?.timeElementsRates?.payNigtDiffrlEffDateFrom) this.allReviewData.timeElementsRates.payNigtDiffrlEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.payNigtDiffrlEffDateFrom);
          if (this.allReviewData?.timeElementsRates?.payNigtDiffrlEffDateEnd) this.allReviewData.timeElementsRates.payNigtDiffrlEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.payNigtDiffrlEffDateEnd);
          if (this.allReviewData?.timeElementsRates?.payMealPremiumEffDateEnd) this.allReviewData.timeElementsRates.payMealPremiumEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.payMealPremiumEffDateEnd);
          if (this.allReviewData?.timeElementsRates?.payMealPremiumEffDateFrom) this.allReviewData.timeElementsRates.payMealPremiumEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.payMealPremiumEffDateFrom);
          if (this.allReviewData?.timeElementsRates?.payOnCallPagerEffDateEnd) this.allReviewData.timeElementsRates.payOnCallPagerEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.payOnCallPagerEffDateEnd);
          if (this.allReviewData?.timeElementsRates?.payOnCallPagerEffDateFrom) this.allReviewData.timeElementsRates.payOnCallPagerEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.payOnCallPagerEffDateFrom);
          if (this.allReviewData?.timeElementsRates?.payHealthWelfEffDateEnd) this.allReviewData.timeElementsRates.payHealthWelfEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.payHealthWelfEffDateEnd);
          if (this.allReviewData?.timeElementsRates?.payHealthWelfEffDateFrom) this.allReviewData.timeElementsRates.payHealthWelfEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.payHealthWelfEffDateFrom);
          if (this.allReviewData?.timeElementsRates?.payVacBillableEffDateEnd) this.allReviewData.timeElementsRates.payVacBillableEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.payVacBillableEffDateEnd);
          if (this.allReviewData?.timeElementsRates?.payVacBillableEffDateFrom) this.allReviewData.timeElementsRates.payVacBillableEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.payVacBillableEffDateFrom);
          if (this.allReviewData?.timeElementsRates?.payMileageEffDateEnd) this.allReviewData.timeElementsRates.payMileageEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.payMileageEffDateEnd);
          if (this.allReviewData?.timeElementsRates?.payMileageEffDateFrom) this.allReviewData.timeElementsRates.payMileageEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.payMileageEffDateFrom);
          if (this.allReviewData?.timeElementsRates?.paySickEffDateEnd) this.allReviewData.timeElementsRates.paySickEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.paySickEffDateEnd);
          if (this.allReviewData?.timeElementsRates?.paySickEffDateFrom) this.allReviewData.timeElementsRates.paySickEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.paySickEffDateFrom);
          if (this.allReviewData?.timeElementsRates?.paySickNonBillEffDateFrom) this.allReviewData.timeElementsRates.paySickNonBillEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.paySickNonBillEffDateFrom);
          if (this.allReviewData?.timeElementsRates?.paySickNonBillEffDateEnd) this.allReviewData.timeElementsRates.paySickNonBillEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.paySickNonBillEffDateEnd);
          if (this.allReviewData?.timeElementsRates?.payHolidayEffDateEnd) this.allReviewData.timeElementsRates.payHolidayEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.payHolidayEffDateEnd);

          if (this.allReviewData?.timeElementsRates?.payHolidayEffDateFrom) this.allReviewData.timeElementsRates.payHolidayEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.payHolidayEffDateFrom); 
      }
    }
  }
  selectedSection(name:string){
    this.selectedValue=name;
    if(this.selectedValue=="Pay"){
        this.billSectionAvailable=false;
    }else{
        this.billSectionAvailable=true;
    }
}
  ngOnInit(): void {
    this.selectedValue="Pay";
    this.billSectionAvailable=false;
}
}

