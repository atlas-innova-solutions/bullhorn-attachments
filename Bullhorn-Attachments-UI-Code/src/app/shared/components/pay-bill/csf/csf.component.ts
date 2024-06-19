import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';

@Component({
    selector: 'app-csf',
    templateUrl: './csf.component.html',
    styleUrl: './csf.component.scss'
})
export class CsfComponent implements OnInit {
    csfFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    csfTemplateIdFormControl!: FormControl;

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
        this.csfTemplateIdFormControl = new FormControl('');

        this.csfFormGroup = this.formBuilder.group({
            csfTemplateId: this.csfTemplateIdFormControl
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
        return !this.csfFormGroup.get(field)?.valid && this.csfFormGroup.get(field)?.touched;
    }

    validateAllFormFields() {
        var fieldsControls = this.csfFormGroup.controls;
        for (let field in fieldsControls) {
            this.csfFormGroup;
            this.displayFieldCss(field);
            const control = this.csfFormGroup.get(field);
            control?.markAsTouched({ onlySelf: true });
        }
        return this.csfFormGroup.valid ? true : false;
    }

    onFormChange(formControlName: string) {
        switch (formControlName) {
            case 'csfTemplateId': {
                this.allReviewData.assignment.csfTemplateId = this.csfFormGroup.controls[formControlName].value;
                break;
            }
        }
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.csfFormGroup && reviewData) {
            this.csfTemplateIdFormControl.setValue(reviewData.assignment && reviewData.assignment.csfTemplateId ? reviewData.assignment.csfTemplateId : '');
        }
    }

    setFieldsToDisable(config: any) {}
}
