/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from '../../../../shared/utils/error-messages.constant';
import { DateFormatService } from '../../../../shared/services/date-format/date-format-service';
import { StaticApiRes } from '../../../../shared/utils/static-initial-api';
import { MapperService } from '../../../../shared/services/auto-mapper/mapper-service';
import { StaticData } from '../../../../shared/services/load-static-data.service';
import { AssignmentReason } from '../../../../shared/models/static-models/business-model/business-dropdown.modes';
import { IAssignmentReason } from '../../../../shared/models/static-models/interface/i-business-dropdown.model';
@Component({
  selector: 'app-assignment-end-date',
  templateUrl: './assignment-end-date.component.html',
  styleUrl: './assignment-end-date.component.scss'
})
export class AssignmentEndDateComponent implements OnInit {
  endDateChangeGroup!: FormGroup;
  readonly error = ErrorMessages;
  @Input() effectiveEndDate: any;
  @Input() primaryAssignmentFlag: any;
  @Input() assignmentStatus: any;
  reasonList: IAssignmentReason[] = [];
  @Input() asgmtStartDate : any;
  dateValidation: boolean = false;
  @Output() message: EventEmitter<boolean> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private dateFormatService: DateFormatService,
    private mapperService: MapperService) { }

  ngOnInit() {
    this.initializeForm();
    this.setFormData();
    this.getReasonList();
  }

  initializeForm(): void {
    this.endDateChangeGroup = this.formBuilder.group({
      endDate: [{ value: this.effectiveEndDate, disabled: this.primaryAssignmentFlag == true }, [Validators.required]],
      reason: [{ value: '', disabled: this.primaryAssignmentFlag == true }, [Validators.required]],
      asgmntStatus: [{ value: this.assignmentStatus, disabled: true }, [Validators.required]]
    }, {
      validator: this.checkDateValidation.bind(this)
    });
  }

  setFormData() {
    this.endDateChangeGroup.patchValue({
      endDate: this.dateFormatService.convert_to_mmddyyyy(this.effectiveEndDate) ? this.dateFormatService.convert_to_mmddyyyy(this.effectiveEndDate) : ''
    }, { emitEvent: false });
  }

  getFormData(): any {
    let reasonName: any = this.reasonList.find((i) => i.code === this.endDateChangeGroup?.value.reason)?.name;
    this.endDateChangeGroup.value.reason = reasonName;
    return this.endDateChangeGroup.value
  }

  getReasonList() {
    StaticData.subscribe((res: StaticApiRes) => {
      this.reasonList = this.mapperService.map(AssignmentReason, res.assignmentEndReason);
    });
  }

  checkDateValidation(group: FormGroup) {
    let startDate = this.dateFormatService.convert_to_mmddyyyy(this.asgmtStartDate);
    let endDate = this.dateFormatService.convert_to_mmddyyyy(group.value.endDate);
    this.dateValidation = !this.dateFormatService.checkStartDateGreaterThanEndDate(startDate, endDate);
    this.message.emit(this.dateValidation);
  }

}
