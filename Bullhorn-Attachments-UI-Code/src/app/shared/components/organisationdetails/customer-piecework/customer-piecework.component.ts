import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';

@Component({
  selector: 'app-customer-piecework',
  templateUrl: './customer-piecework.component.html',
  styleUrl: './customer-piecework.component.scss'
})
export class CustomerPieceworkComponent implements OnInit {
  customerpiecesFormGroup!:FormGroup;

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
    this.customerpiecesFormGroup = this.formBuilder.group({
      pibillingcode: ['']
    });
  }
}
