/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from '../../../../shared/utils/error-messages.constant';

@Component({
    selector: 'app-pay-change',
    templateUrl: './pay-change.component.html',
    styleUrl: './pay-change.component.scss'
})
export class PayChangeComponent implements OnInit {
    payChangeGroup!: FormGroup;
    @Input() changeData: any;
    readonly errorMessage= ErrorMessages

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.initializeForm();
        this.setFormData();
    }

    ngOnChanges() {
        if(this.changeData) {
            this.setFormData();
        }
    }

    initializeForm(): void {
        this.payChangeGroup = this.formBuilder.group({
            payRate: ['', [Validators.required]],
            overTimePayRate: ['', [Validators.required]],
            doubleTimePayRate: ['', [Validators.required]],
        });
    }

    setFormData(): void {
        this.changeData?.elementEntryValues?.find((res: any) => {
            if (res.inputValueName === "Pay Rate") {
                this.payChangeGroup?.patchValue({
                    payRate: res.screenEntryValue ? res.screenEntryValue : ''
                }, { emitEvent: false });
            }
            if (res.inputValueName === "Pay OT Rate") {
                this.payChangeGroup?.patchValue({
                    overTimePayRate: res.screenEntryValue
                }, { emitEvent: false });
            }
            if (res.inputValueName === "Pay DOT Rate") {
                this.payChangeGroup?.patchValue({
                    doubleTimePayRate: res.screenEntryValue
                }, { emitEvent: false });
            }
        })
    }

    getFormData(): any {
        return this.payChangeGroup.value;
    }
}
