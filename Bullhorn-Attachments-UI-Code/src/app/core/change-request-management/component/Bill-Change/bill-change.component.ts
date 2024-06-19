/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from '../../../../shared/utils/error-messages.constant';
@Component({
  selector: 'app-bill-change',
  templateUrl: './bill-change.component.html',
  styleUrl: './bill-change.component.scss'
})
export class BillChangeComponent implements OnInit {
  billChangeGroup!: FormGroup;
  readonly errorMessages = ErrorMessages;
  @Input() changeData: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.setFormData();
}

  initializeForm(): void {
      this.billChangeGroup = this.formBuilder.group({
        billRate:  ['', [Validators.required,]],
        doubleTime:  ['', [Validators.required,]],
        overTimeRate:  ['', [Validators.required,]],
      });
  }

  ngOnChanges() {
    if(this.changeData) {
        this.setFormData();
    }
}
  setFormData(): void {
    this.changeData?.elementEntryValues?.find((res: any) => {
        if (res.inputValueName === "Bill Rate") {
            this.billChangeGroup?.patchValue({
              billRate: res.screenEntryValue
            }, { emitEvent: false });
        }
        if (res.inputValueName === "Bill OT Rate") {
            this.billChangeGroup?.patchValue({
              overTimeRate: res.screenEntryValue
            }, { emitEvent: false });
        }
        if (res.inputValueName === "Bill DOT Rate") {
            this.billChangeGroup?.patchValue({
              doubleTime: res.screenEntryValue
            }, { emitEvent: false });
        }
    })
}

  getFormData(): any {
      return this.billChangeGroup.value;
}}
