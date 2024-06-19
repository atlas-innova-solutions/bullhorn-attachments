import { Component, Input } from '@angular/core';
import { PlacementReviewDataModel } from '../../../../shared/models/review/placement-review-data.model';

@Component({
  selector: 'app-client-contact',
  templateUrl: './client-contact.component.html',
  styleUrl: './client-contact.component.scss'
})
export class ClientContactComponent {
  allReviewData!: PlacementReviewDataModel | undefined
  @Input()
  public set reviewData(data: PlacementReviewDataModel) {
    if (data) {
      this.allReviewData = data;
    }
  }
}
