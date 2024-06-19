import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PlacementReviewDataModel } from '../../models/review/placement-review-data.model';

@Component({
    selector: 'app-securityclearance',
    templateUrl: './securityclearance.component.html',
    styleUrl: './securityclearance.component.scss'
})
export class SecurityclearanceComponent implements OnInit {
    SecurityclearnceFormGroup!: FormGroup;

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

    constructor(private formBuilder: FormBuilder) {}
    ngOnInit(): void {
        this.initializeForm();
    }
    initializeForm(): void {
        this.SecurityclearnceFormGroup = this.formBuilder.group({
            securityclearancetype: [''],
            securityclearancelevel: [''],
            scexpdate: ['']
        });
    }
}
