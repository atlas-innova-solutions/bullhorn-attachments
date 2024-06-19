import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { DateFormatService } from '../../../services/date-format/date-format-service';

@Component({
    selector: 'app-contract-hire',
    templateUrl: './contract-hire.component.html',
    styleUrl: './contract-hire.component.scss'
})
export class ContractHireComponent implements OnInit {
    contracthireFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    allReviewData!: PlacementReviewDataModel;

    @Input()
    public get reviewData(): PlacementReviewDataModel {
        return this.allReviewData;
    }
    public set reviewData(data: PlacementReviewDataModel) {
        if (data && Object.keys(data).length) {
            this.allReviewData = data;
            this.prepareSectionData(this.allReviewData);
        }
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isValid(field),
            'has-feedback': this.isValid(field)
        };
    }

    isValid(field: string) {
        return !this.contracthireFormGroup.get(field)?.valid && this.contracthireFormGroup.get(field)?.touched;
    }

    constructor(
        private formBuilder: FormBuilder,
        private dateFormatService: DateFormatService
    ) {
        this.initializeForm();
    }

    ngOnInit(): void {
        //   this.contracthireFormGroup.valueChanges.subscribe(() => {
        //     this.onFormChange();
        // });
    }

    initializeForm(): void {
        this.contracthireFormGroup = this.formBuilder.group({
            conversionSalary: ['', Validators.required],
            conversionFee: ['', Validators.required],
            conversionDate: ['', Validators.required],
            conversionNotes: ['', Validators.required]
        });
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.contracthireFormGroup) {
            this.contracthireFormGroup.patchValue({
                conversionSalary: reviewData?.assignment?.conversionSalary ? reviewData?.assignment?.conversionSalary : '',
                conversionFee: reviewData?.assignment?.conversionFee ? reviewData?.assignment?.conversionFee : '',
                conversionDate: reviewData?.assignment?.conversionDate ? this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(reviewData?.assignment?.conversionDate) : '',
                conversionNotes: reviewData?.assignment?.conversionNotes ? reviewData?.assignment?.conversionNotes : ''
            });
        }
    }

    validateAllFormFields() {
        var fieldsControls = this.contracthireFormGroup.controls;
        for (let field in fieldsControls) {
            this.contracthireFormGroup;
            this.displayFieldCss(field);
            const control = this.contracthireFormGroup.get(field);
            control?.markAsTouched({ onlySelf: true });
        }
        return this.contracthireFormGroup.valid ? true : false;
    }

    onFormChange() {
        //   let assignment = this.allReviewData.assignment;
        //   assignment = { ...assignment, ...this.contracthireFormGroup.value };
        //   this.allReviewData.assignment = assignment;
    }

    setFieldsToDisable(config: any) {}
}
