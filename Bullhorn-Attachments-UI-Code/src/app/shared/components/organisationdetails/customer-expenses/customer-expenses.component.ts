import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';

@Component({
  selector: 'app-customer-expenses',
  templateUrl: './customer-expenses.component.html',
  styleUrl: './customer-expenses.component.scss'
})
export class CustomerExpensesComponent implements OnInit {
  customerexpensesFormGroup!:FormGroup;

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
    this.customerexpensesFormGroup = this.formBuilder.group({
      billingcode: ['']
    });
  }
}
