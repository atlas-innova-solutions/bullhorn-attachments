import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';

@Component({
  selector: 'app-segmentation',
  templateUrl: './segmentation.component.html',
  styleUrl: './segmentation.component.scss'
})
export class SegmentationComponent implements OnInit {
  segmentationFormGroup!:FormGroup;

  allReviewData!: PlacementReviewDataModel;
  @Input()
  public get reviewData(): any {
      return this.allReviewData;
  }
  public set reviewData(data: PlacementReviewDataModel) {
      if (data) {
          this.allReviewData = data;
      }
  }

  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.segmentationFormGroup = this.formBuilder.group({
      lineofbusiness: ['', Validators.required],
      sublineofbusiness: ['', Validators.required],
      location: ['', Validators.required],
      sellingbusinessunit: ['', Validators.required],
      subsegment: ['', Validators.required],
      subsubsegment: ['', Validators.required]
    });
  }
}
