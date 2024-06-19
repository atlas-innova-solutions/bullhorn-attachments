import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrl: './location.component.scss'
})
export class LocationComponent implements OnInit {
    locationFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    branchNameFormControl!: FormControl;

    allReviewData!: PlacementReviewDataModel;
    @Input()
    public get reviewData(): any {
        return this.allReviewData;
    }
    public set reviewData(data: PlacementReviewDataModel) {
        if (data && Object.keys(data).length) {
            this.allReviewData = data;
            this.prepareSectionData(this.allReviewData);
        }
    }

    constructor(private formBuilder: FormBuilder) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.branchNameFormControl = new FormControl('');

        this.locationFormGroup = this.formBuilder.group({
            branchName: this.branchNameFormControl
        });
    }

    ngOnInit(): void {}

    displayFieldCss(field: string) {
        return {
            'has-error': this.isValid(field),
            'has-feedback': this.isValid(field)
        };
    }

    isValid(field: string) {
        return !this.locationFormGroup.get(field)?.valid && this.locationFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.locationFormGroup.controls;
        for (let field in fieldsControls) {
            this.locationFormGroup;
            this.displayFieldCss(field);
            const control = this.locationFormGroup.get(field);
            control?.markAsTouched({ onlySelf: true });
        }
        return this.locationFormGroup.valid ? true : false;
    }

    onFormChange(formControlName: string) {
        switch (formControlName) {
            case 'branchName': {
                this.allReviewData.assignment.branchName = this.locationFormGroup.controls[formControlName].value;
                break;
            }
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.locationFormGroup && reviewData && reviewData.assignment) {
            this.branchNameFormControl.setValue(reviewData.assignment.branchName ? reviewData.assignment.branchName : '');
        }
    }

    setFieldsToDisable(config: any) {}
}
