import { Component, Input } from '@angular/core';
import { PlacementReviewDataModel } from '../../../../shared/models/review/placement-review-data.model';
import { DateFormatService } from '../../../../shared/services/date-format/date-format-service';

@Component({
  selector: 'app-time-elements-bill-rates',
  templateUrl: './time-elements-bill-rates.component.html',
  styleUrl: './time-elements-bill-rates.component.scss'
})
export class TimeElementsBillRatesComponent {
  constructor(private dateFormatService: DateFormatService) {}
  allReviewData!: PlacementReviewDataModel | undefined
  @Input()
  public set reviewData(data: PlacementReviewDataModel) {
    if (data) {
        this.allReviewData = data;
        if (this.allReviewData.timeElementsRates) {
          if (this.allReviewData?.timeElementsRates?.blNigtDiffrlEffDateEnd) this.allReviewData.timeElementsRates.blNigtDiffrlEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.blNigtDiffrlEffDateEnd);
          if (this.allReviewData?.timeElementsRates?.blNigtDiffrlEffDateFrom) this.allReviewData.timeElementsRates.blNigtDiffrlEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.blNigtDiffrlEffDateFrom);
          if (this.allReviewData?.timeElementsRates?.blMealPrmEffDateEnd) this.allReviewData.timeElementsRates.blMealPrmEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.blMealPrmEffDateEnd);
          if (this.allReviewData?.timeElementsRates?.blMealPrmEffDateFrom) this.allReviewData.timeElementsRates.blMealPrmEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.blMealPrmEffDateFrom);
          if (this.allReviewData?.timeElementsRates?.blOnCallPagerEffDateEnd) this.allReviewData.timeElementsRates.blOnCallPagerEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.blOnCallPagerEffDateEnd);
          if (this.allReviewData?.timeElementsRates?.blOnCallPagerEffDateFrom) this.allReviewData.timeElementsRates.blOnCallPagerEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.blOnCallPagerEffDateFrom);
          if (this.allReviewData?.timeElementsRates?.blHealthWelfareEffDateEffDateEnd) this.allReviewData.timeElementsRates.blHealthWelfareEffDateEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.blHealthWelfareEffDateEffDateEnd);
          if (this.allReviewData?.timeElementsRates?.blHealthWelfareEffDateFrom) this.allReviewData.timeElementsRates.blHealthWelfareEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.blHealthWelfareEffDateFrom);
          if (this.allReviewData?.timeElementsRates?.blMileageEffDateEnd) this.allReviewData.timeElementsRates.blMileageEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.blMileageEffDateEnd);
          if (this.allReviewData?.timeElementsRates?.blMileageEffDateFrom) this.allReviewData.timeElementsRates.blMileageEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.blMileageEffDateFrom);
          if (this.allReviewData?.timeElementsRates?.blSickEffDateEnd) this.allReviewData.timeElementsRates.blSickEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.blSickEffDateEnd);
          if (this.allReviewData?.timeElementsRates?.blSickEffDateFrom) this.allReviewData.timeElementsRates.blSickEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.blSickEffDateFrom);         
          if (this.allReviewData?.timeElementsRates?.blHolidayEffDateEnd) this.allReviewData.timeElementsRates.blHolidayEffDateEnd = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.blHolidayEffDateEnd);          
          if (this.allReviewData?.timeElementsRates?.blHolidayEffDateFrom) this.allReviewData.timeElementsRates.blHolidayEffDateFrom = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.timeElementsRates.blHolidayEffDateFrom);

        }
    }
}
}