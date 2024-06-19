/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from '../../../../shared/utils/error-messages.constant';
import { DateFormatService } from '../../../../shared/services/date-format/date-format-service';

@Component({
  selector: 'app-assignment-extend',
  templateUrl: './assignment-extend.component.html',
  styleUrl: './assignment-extend.component.scss'
})
export class AssignmentExtendComponent {
  ExtendChangeGroup!: FormGroup;
  readonly error = ErrorMessages
  @Input() effectiveEndDate: any;
  @Input() primaryAssignmentFlag: any;
  dateValidation: boolean = false;
  @Input() asgmtStartDate : any;
  @Output() message: EventEmitter<boolean> = new EventEmitter();


  constructor(private formBuilder: FormBuilder, private dateFormatService: DateFormatService) { }

  ngOnInit() {
    this.initializeForm();
    this.setFormData();
  }

  initializeForm(): void {
    this.ExtendChangeGroup = this.formBuilder.group({
      extend: [{ value: this.effectiveEndDate, disabled: this.primaryAssignmentFlag == true }, [Validators.required,]],
    }, {
      validator: this.checkDateValidation.bind(this)
    });
  }

  getFormData(): any {
    return this.ExtendChangeGroup.value

  }

  setFormData() {
    this.ExtendChangeGroup.patchValue({
      extend: this.dateFormatService.convert_to_mmddyyyy(this.effectiveEndDate) ? this.dateFormatService.convert_to_mmddyyyy(this.effectiveEndDate) : ''
    }, { emitEvent: false });
  }
  checkDateValidation(group: FormGroup) {
    let startDate = this.dateFormatService.convert_to_mmddyyyy(this.asgmtStartDate);
    let endDate = this.dateFormatService.convert_to_mmddyyyy(group.value.extend);
    this.dateValidation = !this.dateFormatService.checkStartDateGreaterThanEndDate(startDate, endDate);
    this.message.emit(this.dateValidation);
  }
}
