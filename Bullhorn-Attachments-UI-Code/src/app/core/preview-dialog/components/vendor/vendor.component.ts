import { Component, Input } from '@angular/core';
import { PlacementReviewDataModel } from '../../../../shared/models/review/placement-review-data.model';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss'
})
export class VendorComponent {
  allReviewData!: PlacementReviewDataModel | undefined
  @Input()
  public set reviewData(data: PlacementReviewDataModel) {
    if (data) {
      this.allReviewData = data;
    }
  }
}
