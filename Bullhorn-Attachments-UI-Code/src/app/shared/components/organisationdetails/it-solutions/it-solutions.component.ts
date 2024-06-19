import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';

@Component({
  selector: 'app-it-solutions',
  templateUrl: './it-solutions.component.html',
  styleUrl: './it-solutions.component.scss'
})
export class ITSolutionsComponent implements OnInit {
  ItsolutionsFormGroup!:FormGroup;

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
    this.ItsolutionsFormGroup = this.formBuilder.group({
      primarycoearea: ['', Validators.required],
      secondarycoearea: ['', Validators.required],
      solutionoversight: ['', Validators.required]
    });
  }
}
