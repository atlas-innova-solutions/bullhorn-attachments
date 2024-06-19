import { Component, Input } from '@angular/core';
import { PlacementReviewDataModel } from '../../../../shared/models/review/placement-review-data.model';
import { DateFormatService } from '../../../../shared/services/date-format/date-format-service';

@Component({
    selector: 'app-contract-hire',
    templateUrl: './contract-hire.component.html',
    styleUrl: './contract-hire.component.scss'
})
export class ContractHireComponent {
    constructor(private dateFormatService: DateFormatService) {}
    allReviewData: PlacementReviewDataModel | undefined;
    @Input()
    public set reviewData(data: PlacementReviewDataModel) {
        if (data) {
            this.allReviewData = data;
            if (this.allReviewData.assignment) {
                if (this.allReviewData.assignment.conversionDate) this.allReviewData.assignment.conversionDate = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.assignment.conversionDate);
            }
        }
    }
}
