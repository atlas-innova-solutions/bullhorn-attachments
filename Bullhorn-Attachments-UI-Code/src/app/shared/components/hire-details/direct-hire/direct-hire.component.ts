import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../../models/review/placement-review-data.model';
import { IGuaranteeTermsDays } from '../../../models/static-models/interface/i-business-dropdown.model';
import { GuaranteeTermsDays } from '../../../models/static-models/business-model/business-dropdown.modes';
import { StaticData } from '../../../services/load-static-data.service';
import { StaticApiRes } from '../../../utils/static-initial-api';
import { MapperService } from '../../../services/auto-mapper/mapper-service';

@Component({
    selector: 'app-direct-hire',
    templateUrl: './direct-hire.component.html',
    styleUrl: './direct-hire.component.scss'
})
export class DirectHireComponent implements OnInit {
    hireFormGroup!: FormGroup;
    readonly errorMessages = ErrorMessages;

    directHirePlacementFeeAmountFormControl!: FormControl;
    directHirePlacementFeePercentageFormControl!: FormControl;
    guaranteeTermsDaysFormControl!: FormControl;
    invoiceTermsSpreadIntervalsFormControl!: FormControl;
    invoiceTermsNotesFormControl!: FormControl;

    guaranteeTermsDaysList: IGuaranteeTermsDays[] = [];

    allReviewData!: PlacementReviewDataModel;
    @Input()
    public get reviewData(): PlacementReviewDataModel {
        return this.allReviewData;
    }
    public set reviewData(data: PlacementReviewDataModel) {
        if (data && Object.keys(data).length) {
            this.allReviewData = data;
            this.bindData(this.allReviewData);
        }
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isValid(field),
            'has-feedback': this.isValid(field)
        };
    }

    isValid(field: string) {
        return !this.hireFormGroup.get(field)?.valid && this.hireFormGroup.get(field)?.touched;
    }

    constructor(
        private formBuilder: FormBuilder,
        private mapperService: MapperService
    ) {
        this.initializeForm();
    }

    ngOnInit(): void {}

    initializeForm(): void {
        this.directHirePlacementFeeAmountFormControl = new FormControl('');
        this.directHirePlacementFeePercentageFormControl = new FormControl('');
        this.guaranteeTermsDaysFormControl = new FormControl(null, ([Validators.required]));
        this.invoiceTermsSpreadIntervalsFormControl = new FormControl('', ([Validators.required, Validators.maxLength(250)]));
        this.invoiceTermsNotesFormControl = new FormControl('', ([Validators.required, Validators.maxLength(500)]));

        this.hireFormGroup = this.formBuilder.group({
            directHirePlacementFeeAmount: this.directHirePlacementFeeAmountFormControl,
            directHirePlacementFeePercentage: this.directHirePlacementFeePercentageFormControl,
            guaranteeTermsDays: this.guaranteeTermsDaysFormControl,
            invoiceTermsSpreadIntervals: this.invoiceTermsSpreadIntervalsFormControl,
            invoiceTermsNotes: this.invoiceTermsNotesFormControl
        });
    }

    validateAllFormFields() {
        var fieldsControls = this.hireFormGroup.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.hireFormGroup.get(field);

            if (control?.disabled == false) {
                control?.markAsTouched({ onlySelf: true });
                if (!this.isRequiredValidationPassed(control)) {
                    isValid = false;
                }
            } else if (control?.disabled == true && !this.isRequiredValidationPassed(control)) {
                control?.markAsTouched({ onlySelf: true });
                isValid = false;
            } else {
                isValid = true;
            }

            if (!isValid) {
                break;
            }
        }

        if (!isValid) {
            for (let field in fieldsControls) {
                this.displayFieldCss(field);
                const control = this.hireFormGroup.get(field);
                if (control?.disabled == false) {
                    control?.markAsTouched({ onlySelf: true });
                } else if (control?.disabled == true && !this.isRequiredValidationPassed(control)) {
                    control?.markAsTouched({ onlySelf: true });
                }
            }
        }

        return isValid;
    }

    isRequiredValidationPassed(control: any) {
        const validator = (control && control?.validator) ? control.validator({} as AbstractControl) : null;
        if (!validator) {
            return true;
        }
       
        return validator && validator.required && control?.value;
    }

    onFormChange(formControlName: string) {
        switch (formControlName) {
            case 'directHirePlacementFeeAmount': {
                this.allReviewData.assignment.directHirePlacementFeeAmount = this.hireFormGroup.controls[formControlName].value;
                break;
            }
            case 'directHirePlacementFeePercentage': {
                this.allReviewData.assignment.directHirePlacementFeePercentage = this.hireFormGroup.controls[formControlName].value;
                break;
            }
            case 'guaranteeTermsDays': {
                this.allReviewData.assignment.guaranteeTermsDaysId= this.hireFormGroup.controls[formControlName].value;
                let guaranteeTermsDays:any=this.guaranteeTermsDaysList.find((i)=>i.id===this.hireFormGroup.controls[formControlName].value)?.name;
                this.allReviewData.assignment.guaranteeTermsDays=guaranteeTermsDays;
                break;
            }
            case 'invoiceTermsSpreadIntervals': {
                this.allReviewData.assignment.invoiceTermsSpreadIntervals = this.hireFormGroup.controls[formControlName].value;
                break;
            }
            case 'invoiceTermsNotes': {
                this.allReviewData.assignment.invoiceTermsNotes = this.hireFormGroup.controls[formControlName].value;
                break;
            }
        }
    }

    bindData(reviewData: PlacementReviewDataModel) {
        StaticData.subscribe((res: StaticApiRes) => {
            this.guaranteeTermsDaysList = this.mapperService.map(GuaranteeTermsDays, res.guaranteeTermsDays);

            this.prepareSectionData(reviewData);
        });
    }

    prepareSectionData(reviewData: PlacementReviewDataModel) {
        if (this.hireFormGroup && reviewData && reviewData.assignment) {
            this.directHirePlacementFeePercentageFormControl.setValue(reviewData.assignment.directHirePlacementFeePercentage ? reviewData.assignment.directHirePlacementFeePercentage : '');
            this.directHirePlacementFeeAmountFormControl.setValue(reviewData.assignment.directHirePlacementFeeAmount ? reviewData.assignment.directHirePlacementFeeAmount : '');
            this.guaranteeTermsDaysFormControl.setValue(reviewData.assignment.guaranteeTermsDaysId ? reviewData.assignment.guaranteeTermsDaysId : '');
            this.invoiceTermsSpreadIntervalsFormControl.setValue(reviewData.assignment.invoiceTermsSpreadIntervals ? reviewData.assignment.invoiceTermsSpreadIntervals : '');
            this.invoiceTermsNotesFormControl.setValue(reviewData.assignment.invoiceTermsNotes ? reviewData.assignment.invoiceTermsNotes : '');
        }
    }

    setFieldsToDisable(config: any) {}
}
