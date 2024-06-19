import { Component, Input } from '@angular/core';
import { PlacementReviewDataModel } from '../../../../shared/models/review/placement-review-data.model';

@Component({
  selector: 'app-direct-hire',
  templateUrl: './direct-hire.component.html',
  styleUrl: './direct-hire.component.scss'
})
export class DirectHireComponent {
  allReviewData!: PlacementReviewDataModel | undefined
  @Input()
  public set reviewData(data: PlacementReviewDataModel) {
    if (data) {
      this.allReviewData = data;
    }
  }
}
