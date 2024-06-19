import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SetupDataService } from '../../shared/services/data-service/setup-data.service';
import { PayChangeComponent } from './component/Pay-Change/pay-change.component';
import { AssignmentExtendComponent } from './component/AssignemntExtend/assignment-extend.component';
import { AssignmentEndDateComponent } from './component/AssignenmentEndDate/assignment-end-date.component';
import { BillChangeComponent } from './component/Bill-Change/bill-change.component';
import { AssignmentModel, ChangeManagementModel, PayChangeModel, QueryParamsModel } from '../../shared/models/change-management.model';
import { ErrorMessages } from '../../shared/utils/error-messages.constant';
import { LangTranslateService } from '../../shared/services/Lang-translate-service/lang-translate.service';

import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatService } from '../../shared/services/date-format/date-format-service';
import { CoreModulesUrl } from '../../shared/utils/page-navigation-url';
import { Message, MessageService } from 'primeng/api';
import { Employment } from '../../shared/models/review/employment-data.model';

@Component({
    selector: 'app-change-request-management',
    templateUrl: './change-request-management.component.html',
    styleUrl: './change-request-management.component.scss'
})
export class ChangeRequestManagementComponent implements OnInit {
    @ViewChild(PayChangeComponent) private payChangeComponent!: PayChangeComponent;
    @ViewChild(BillChangeComponent) private billChangeComponent!: BillChangeComponent;
    @ViewChild(AssignmentExtendComponent) private assignmentExtend!: AssignmentExtendComponent;
    @ViewChild(AssignmentEndDateComponent) private assignmentEndDate!: AssignmentEndDateComponent;

    selectedRequest: string = '';
    clearIcon: boolean = false;
    formSumitAttempt: boolean = false;
    logoutDialog: boolean = false;
    confirmDialog: boolean = false;
    mandatFlag: boolean = true;
    dialogStore: any = [];
    readonly errorMessages = ErrorMessages;
    changeRequestParentGroup!: FormGroup;
    getChangeManagementData: any
    effectiveEndDate: string = '';
    effectiveDate: string = '';
    request = [{ name: 'End of Assignment' }, { name: 'Assignment Extension' }, { name: 'Bill Rates' }, { name: 'Pay Rates' }, { name: 'Pay and Bill Rates' }];
    QueryParamsData!: any;
    asgmtInfo!: Employment;
    paramsData!:QueryParamsModel;
    asgmtData: string = '';
    disableBtn: boolean = false;
    messages!: Message[];
    message!: Message[];

    getData: any;
    minDate!: Date ;

    maxDate!: Date;
    disableSubmitBtn: boolean = false;

    constructor(
        private translateService: LangTranslateService,
        private fb: FormBuilder,
        private SetupDataService: SetupDataService,
        private route: ActivatedRoute,
        private dateFormatService: DateFormatService,
        private router: Router,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        const selectedLang = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'English';
        this.translateService.changeLanguage(selectedLang);
        this.route.queryParamMap.subscribe((params: any) => {
            this.asgmtData = params.params.asgmtData;
            if(this.asgmtData == 'asgmtData') {
            this.paramsData = JSON.parse(params.params.rowData);
            this.asgmtInfo = JSON.parse(params.params.employmentInfo);
            this.QueryParamsData = Object.assign(this.paramsData,this.asgmtInfo);
             this.SetupDataService.setId(params.params.personId);
            }
            else {
            this.QueryParamsData = JSON.parse(params.params.rowData);
            }
            if (this.QueryParamsData) {
                this.QueryParamsData.effectiveEndDate = this.dateFormatService.convert_to_yyyymmdd(this.QueryParamsData?.effectiveEndDate);
                this.minDate = new Date(this.QueryParamsData.asgmtStartDate );
                this.maxDate = new Date(this.QueryParamsData.effectiveEndDate) ;
            }
        });
        this.initializeForm();
    }

    initializeForm(): void {
        this.changeRequestParentGroup = this.fb.group({
            effectiveDate: ['', [Validators.required]],
            requestType: ['', [Validators.required]],
            comments: ['']
        });
    }
    
    onMessageEndAsgmnt(message: boolean) {
        if (message == true) {
            this.disableSubmitBtn = true;
        } 
        else {
            this.disableSubmitBtn = false;
        }
      }

    getDetails() {
        this.changeRequestParentGroup.patchValue(
            {
                effectiveDate: ''
            },
            { emitEvent: false }
        );
       let asgmtId = this.asgmtData == 'asgmtData' ? this.QueryParamsData.hcmAssignmentId : this.QueryParamsData.fusionAssignmentId;
        let date = this.dateFormatService.convert_to_yyyymmdd(new Date());
        let effectiveDate = this.dateFormatService.convert_to_yyyymmdd(this.changeRequestParentGroup.value.effectiveDate)
        this.effectiveDate = effectiveDate ? effectiveDate : date
        this.SetupDataService.getchangeDetails(this.QueryParamsData.fusionEmployeeId, this.effectiveDate, asgmtId).subscribe(
            (res: any) => {
                this.getData= res?.data;
                this.getChangeManagementData = res?.data?.items[0];
                this.changeRequestParentGroup.patchValue(
                    {
                        effectiveDate: this.dateFormatService.convert_to_mmddyyyy(this.getChangeManagementData?.effectiveStartDate) ? this.dateFormatService.convert_to_mmddyyyy(this.getChangeManagementData?.effectiveStartDate) : this.changeRequestParentGroup.controls['effectiveDate'].value
                    },
                    { emitEvent: false }
                );
                if ((this.selectedRequest == 'Pay Rates' || this.selectedRequest == 'Bill Rates' || this.selectedRequest == 'Pay and Bill Rates') ) {
                        if((this.getChangeManagementData?.elementName == 'Inn Pay and Bill' || this.getChangeManagementData?.elementName == 'Pay and Bill Rate') && this.getData?.count == 1)  {
                            this.changeRequestParentGroup.enable();
                            this.payChangeComponent?.payChangeGroup.enable();
                            this.billChangeComponent?.billChangeGroup.enable();
                            this.disableBtn = false;
                        } 
                        else {
                            this.changeRequestParentGroup?.controls['comments'].disable();
                            this.changeRequestParentGroup?.controls['effectiveDate'].disable();
                            this.payChangeComponent?.payChangeGroup.disable();
                            this.billChangeComponent?.billChangeGroup.disable();
                            this.disableBtn = true;
                            this.message = [{ severity: 'error', detail: 'The selected request type does not have the pay and bill values. Please contact the administrator' }];
                        }               
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    onDateChange(value: any) {
        let asgmtId = this.asgmtData == 'asgmtData' ? this.QueryParamsData.hcmAssignmentId : this.QueryParamsData.fusionAssignmentId;
        this.selectedRequest == 'Pay Rates' ? this.effectiveDate = this.dateFormatService.convert_to_yyyymmdd(value) : this.selectedRequest == 'Bill Rates' ? this.effectiveDate = this.dateFormatService.convert_to_yyyymmdd(value) : this.selectedRequest == 'Pay and Bill Rates' ? this.effectiveDate = this.dateFormatService.convert_to_yyyymmdd(value) : ''
        this.SetupDataService.getchangeDetails(this.QueryParamsData.fusionEmployeeId, this.effectiveDate, asgmtId).subscribe(
            (res: any) => {

                    this.payChangeComponent?.payChangeGroup.reset();
                    this.billChangeComponent?.billChangeGroup.reset();
                    this.assignmentEndDate?.endDateChangeGroup.reset();
                    this.assignmentExtend?.ExtendChangeGroup.reset();
                    this.changeRequestParentGroup.patchValue(
                        {
                            comments: ''
                        }
                    );

                if (res) {
                    this.getChangeManagementData = res?.data?.items[0];
                    this.changeRequestParentGroup.patchValue(
                        {
                            effectiveDate: this.getChangeManagementData?.effectiveStartDate ? this.dateFormatService.convert_to_mmddyyyy(this.getChangeManagementData?.effectiveStartDate) : this.changeRequestParentGroup.controls['effectiveDate'].value
                        },
                        { emitEvent: false }
                    );
                }
                if ((this.selectedRequest == 'Pay Rates' || this.selectedRequest == 'Bill Rates' || this.selectedRequest == 'Pay and Bill Rates') ) {
                    if((this.getChangeManagementData?.elementName == 'Inn Pay and Bill' || this.getChangeManagementData?.elementName == 'Pay and Bill Rate') && this.getData?.count == 1)  {
                        this.changeRequestParentGroup.enable();
                        this.payChangeComponent?.payChangeGroup.enable();
                        this.billChangeComponent?.billChangeGroup.enable();
                        this.disableBtn = false;
                    } 
                    else {
                        this.changeRequestParentGroup?.controls['comments'].disable();
                        this.payChangeComponent?.payChangeGroup.disable();
                        this.billChangeComponent?.billChangeGroup.disable();
                        this.disableBtn = true;
                        this.message = [{ severity: 'error', detail: 'The selected effective start Date does not have the pay and bill values. Please contact the administrator' }];
                    }               
            }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    requestChangeApi(payload: any, isBillPayload: any) {
        this.logoutDialog = false;
        this.SetupDataService.changeRequestType(payload).subscribe(
            (res: any) => {
                if(this.selectedRequest == 'Pay and Bill Rates') {
                    if(res.responseCode == 1000 && isBillPayload) {
                        this.requestChangeApi(isBillPayload,'');
                        return;
                    }
                }
                this.getDetails();
                this.changeRequestParentGroup.patchValue(
                    {
                        requestType: '',
                        effectiveDate: ''
                    },
                    { emitEvent: false }
                );
                if(this.selectedRequest) {
                    res.responseCode == 1000 ? this.messageService.add({ severity: 'success', detail: 'The change request has been submitted successfully' }) : this.messageService.add({ severity: 'error', detail: res.message });
                }
                this.confirmDialog = true;
                this.changeRequestParentGroup.reset();
                this.selectedRequest = '';
            },
            (err) => {
                console.log(err);
                this.messageService.add({ severity: 'error', detail: 'Error in Updating' });
            }
        );
    }


    yes() {
        this.confirmDialog = false;
        this.router.navigate([CoreModulesUrl.WorkerSearch]);
        this.clearIcon = false;
    }

    no() {
        this.confirmDialog = false;
        this.clearIcon = false;
    }
    reset() {
        this.payChangeComponent?.payChangeGroup.reset();
        this.billChangeComponent?.billChangeGroup.reset();
        this.setFormData();
        this.changeRequestParentGroup.patchValue(
            {
                comments: ''
            },
            { emitEvent: false }
        );
        this.getDetails();
    }

    disableSubmitReset(){
        if((this.selectedRequest == 'Assignment Extension' || this.selectedRequest == 'End of Assignment') && this.QueryParamsData.primaryAssignmentFlag == true ) {
            this.disableBtn = true;
            this.changeRequestParentGroup.controls['comments'].disable();
            if(this.selectedRequest == 'Assignment Extension') {
                this.messages = [{ severity: 'error', detail: 'The selected assignment is the primary assignment of worker, you cannot extend the primary assignment ' }];
            }
            if(this.selectedRequest == 'End of Assignment') {
                this.messages = [{ severity: 'error', detail: 'The selected assignment is the primary assignment of worker, you cannot end the primary assignment ' }];
            }

            
        }
        else {
            this.disableBtn = false;
            this.changeRequestParentGroup.controls['comments'].enable();

        }
    }

    setFormData() {
        if (this.selectedRequest == 'Assignment Extension') {
            this.assignmentExtend.ExtendChangeGroup.patchValue({
                extend:  this.asgmtData == 'asgmtData' ? this.dateFormatService.convert_to_mmddyyyy(this.QueryParamsData.actualEndDate) : this.dateFormatService.convert_to_mmddyyyy(this.QueryParamsData?.effectiveEndDate),
            })
        }
        if (this.selectedRequest == 'End of Assignment') {
            console.log(this.QueryParamsData?.effectiveEndDate);
            
            this.assignmentEndDate.endDateChangeGroup.patchValue({
                endDate: this.asgmtData == 'asgmtData' ? this.dateFormatService.convert_to_mmddyyyy(this.QueryParamsData.actualEndDate) : this.dateFormatService.convert_to_mmddyyyy(this.QueryParamsData?.effectiveEndDate),
                reason: '',
                asgmntStatus: this.QueryParamsData?.assignmentStatus
            }, { emitEvent: false });
        }
    }

    selectRequest(event: any) {
        this.selectedRequest = event?.value?.name;
        this.getDetails();
        this.changeRequestParentGroup.patchValue(
            {
                comments: ''
            },
            { emitEvent: false }
        );
        this.clearIcon = true;
        this.disableSubmitReset();
    }

    openDialog() {
        if (this.changeRequestParentGroup.valid && (this.payChangeComponent?.payChangeGroup.valid || this.billChangeComponent?.billChangeGroup.valid || this.assignmentEndDate?.endDateChangeGroup.valid || this.assignmentExtend?.ExtendChangeGroup.valid)) {
            let tableData: any = [];
            this.dialogStore = [];
            if (this.selectedRequest == 'Pay and Bill Rates') {
                this.getPayValues(tableData);
                this.getBillValues(tableData);
            }
            if (this.selectedRequest == 'Bill Rates') {
                this.getBillValues(tableData)
            }
            if (this.selectedRequest == 'Pay Rates') {
                this.getPayValues(tableData);
            }
            if (this.selectedRequest == 'Assignment Extension') {
                let formData = Object.assign(this.assignmentExtend.getFormData(), this.changeRequestParentGroup.value);
                let obj = { name: 'Target End Date - Assignment', oldValue: this.dateFormatService.convert_to_mmddyyyy(this.QueryParamsData?.effectiveEndDate), newValue: this.dateFormatService.convert_to_mmddyyyy(formData.extend) };
                tableData.push(obj);
            }
            if (this.selectedRequest == 'End of Assignment') {
                this.getEndAsgmtValues(tableData);
            }

            const commentData = this.changeRequestParentGroup.controls['comments'].value;
            let commentsObj = { name: 'Comments', oldValue: '', newValue: commentData };
            tableData.push(commentsObj);
            this.dialogStore = tableData;
            this.logoutDialog = true;
        }
        else {
            this.isFieldValid();
        }
    }

    isFieldValid() {
        let values = {}
        if (this.selectedRequest == 'Pay and Bill Rates') {
            values = Object.assign(this.payChangeComponent?.payChangeGroup.controls, this.billChangeComponent?.billChangeGroup.controls)
        }
        else { values = this.payChangeComponent?.payChangeGroup.controls || this.billChangeComponent?.billChangeGroup.controls }
        let fieldsControls = values || this.assignmentEndDate?.endDateChangeGroup.controls || this.assignmentExtend?.ExtendChangeGroup.controls;
        for (let field in fieldsControls) {
            const control = this.payChangeComponent?.payChangeGroup.get(field) || this.billChangeComponent?.billChangeGroup.get(field) || this.assignmentEndDate?.endDateChangeGroup.get(field) || this.assignmentExtend?.ExtendChangeGroup.get(field);
            if (control?.invalid && (control?.value == '' || control?.value == null)) {
                control.markAsDirty({ onlySelf: true });
            }
        }
    }

    getBillValues(tableData: any) {
        let formData = Object.assign(this.billChangeComponent.getFormData(), this.changeRequestParentGroup.value);
        let effectiveDateObj = { name: 'Bill Effective Start Date', oldValue: this.dateFormatService.convert_to_mmddyyyy(formData.effectiveDate), newValue: this.dateFormatService.convert_to_mmddyyyy(formData.effectiveDate) };
        tableData.push(effectiveDateObj);
        let standardRateObj = { name: 'Bill Rate Standard', oldValue: this.getOldValues('Bill Rate'), newValue: formData.billRate };
        let otRateObj = { name: 'Bill Rate OverTime', oldValue: this.getOldValues('Bill OT Rate'), newValue: formData.overTimeRate };
        let dtRateObj = { name: 'Bill Rate Double Time', oldValue: this.getOldValues('Bill DOT Rate'), newValue: formData.doubleTime };
        tableData.push(standardRateObj, otRateObj, dtRateObj);
    }

    getPayValues(tableData: any) {
        let formData = Object.assign(this.payChangeComponent.getFormData(), this.changeRequestParentGroup.value);
        let effectiveDateObj = { name: 'Pay Effective Start Date', oldValue: this.dateFormatService.convert_to_mmddyyyy(formData.effectiveDate), newValue: this.dateFormatService.convert_to_mmddyyyy(formData.effectiveDate) };
        tableData.push(effectiveDateObj);
        let standardRateObj = { name: 'Pay Rate Standard', oldValue: this.getOldValues('Pay Rate'), newValue: formData.payRate };
        let otRateObj = { name: 'Pay Rate OverTime', oldValue: this.getOldValues('Pay OT Rate'), newValue: formData.overTimePayRate };
        let dtRateObj = { name: 'Pay Rate Double Time', oldValue: this.getOldValues('Pay DOT Rate'), newValue: formData.doubleTimePayRate };
        tableData.push(standardRateObj, otRateObj, dtRateObj);
    }

    getOldValues(inputValueName: any) {
        let oldValue: any = '';
        if (this.getChangeManagementData?.elementEntryValues) {
            this.getChangeManagementData?.elementEntryValues?.find((res: any) => {
                if (res.inputValueName === inputValueName) {
                    oldValue = res.screenEntryValue;
                }
            })
        }
        return oldValue;
    }

    getEndAsgmtValues(tableData: any) {
        let formData = Object.assign(this.assignmentEndDate.getFormData(), this.changeRequestParentGroup.value);
        let targetEndObj = { name: 'Target End Date - Assignment', oldValue: this.dateFormatService.convert_to_mmddyyyy(this.QueryParamsData?.effectiveEndDate), newValue: this.dateFormatService.convert_to_mmddyyyy(formData.endDate) };
        let reasonObj = { name: 'Reason', oldValue: '', newValue: formData.reason };
        // let asgmtStatusObj = { name: 'Assignment Status', oldValue: this.QueryParamsData?.assignmentStatus, newValue: this.QueryParamsData?.assignmentStatus };
        tableData.push(targetEndObj, reasonObj);
    }

    onClear() {
        this.selectedRequest = '';
        this.changeRequestParentGroup.patchValue(
            {
                effectiveDate: ''
            },
            { emitEvent: false }
        );
    }

    close() {
        this.logoutDialog = false;
    }

    requestSubmit() {
        if(this.selectedRequest == 'Pay and Bill Rates') {
            const changeForm = this.changeRequestParentGroup.value;
            const billChangeFormValue = this.billChangeComponent.getFormData();
            const billChange = [
                {
                    ScreenEntryValue: billChangeFormValue.billRate,
                    InputValueName: 'Bill Rate'
                },
                {
                    ScreenEntryValue: billChangeFormValue.overTimeRate,
                    InputValueName: 'Bill OT Rate'
                },
                {
                    ScreenEntryValue: billChangeFormValue.doubleTime,
                    InputValueName: 'Bill DOT Rate'
                }
            ];
            const billChangepayLoad: PayChangeModel = {
                personNumber: this.QueryParamsData.fusionEmployeeId,
                assignmentNumber: this.asgmtData == 'asgmtData' ? this.QueryParamsData.hcmAssignmentId : this.QueryParamsData.fusionAssignmentId,
                requestType: this.selectedRequest,
                paybilChange: billChange,
                comments: changeForm.comments,
                effectiveDate: this.dateFormatService.convert_to_yyyymmdd(changeForm.effectiveDate)
            };
            const payChangeFormValue = this.payChangeComponent.getFormData();
            const payChange = [
                {
                    ScreenEntryValue: payChangeFormValue.payRate,
                    InputValueName: 'Pay Rate'
                },
                {
                    ScreenEntryValue: payChangeFormValue.overTimePayRate,
                    InputValueName: 'Pay OT Rate'
                },
                {
                    ScreenEntryValue: payChangeFormValue.doubleTimePayRate,
                    InputValueName: 'Pay DOT Rate'
                }
            ];
            const payChangepayLoad: PayChangeModel = {
                personNumber: this.QueryParamsData.fusionEmployeeId,
                assignmentNumber: this.asgmtData == 'asgmtData' ? this.QueryParamsData.hcmAssignmentId : this.QueryParamsData.fusionAssignmentId,
                requestType: this.selectedRequest,
                paybilChange: payChange,
                comments: changeForm.comments,
                effectiveDate: this.dateFormatService.convert_to_yyyymmdd(changeForm.effectiveDate)
            };
            this.requestChangeApi(payChangepayLoad,billChangepayLoad);
        }
        if (this.selectedRequest == 'Bill Rates') {
            const changeForm = this.changeRequestParentGroup.value;
            const billChangeFormValue = this.billChangeComponent.getFormData();
            const paybilChange = [
                {
                    ScreenEntryValue: billChangeFormValue.billRate,
                    InputValueName: 'Bill Rate'
                },
                {
                    ScreenEntryValue: billChangeFormValue.overTimeRate,
                    InputValueName: 'Bill OT Rate'
                },
                {
                    ScreenEntryValue: billChangeFormValue.doubleTime,
                    InputValueName: 'Bill DOT Rate'
                }
            ];
            const billChangepayLoad: PayChangeModel = {
                personNumber: this.QueryParamsData.fusionEmployeeId,
                assignmentNumber: this.asgmtData == 'asgmtData' ? this.QueryParamsData.hcmAssignmentId : this.QueryParamsData.fusionAssignmentId,
                requestType: this.selectedRequest,
                paybilChange: paybilChange,
                comments: changeForm.comments,
                effectiveDate: this.dateFormatService.convert_to_yyyymmdd(changeForm.effectiveDate)
            };
            this.requestChangeApi(billChangepayLoad,'');
        }
        if (this.selectedRequest == 'Pay Rates') {
            const changeForm = this.changeRequestParentGroup.value;
            const payChangeFormValue = this.payChangeComponent.getFormData();
            const paybilChange = [
                {
                    ScreenEntryValue: payChangeFormValue.payRate,
                    InputValueName: 'Pay Rate'
                },
                {
                    ScreenEntryValue: payChangeFormValue.overTimePayRate,
                    InputValueName: 'Pay OT Rate'
                },
                {
                    ScreenEntryValue: payChangeFormValue.doubleTimePayRate,
                    InputValueName: 'Pay DOT Rate'
                }
            ];
            const payChangepayLoad: PayChangeModel = {
                personNumber: this.QueryParamsData.fusionEmployeeId,
                assignmentNumber: this.asgmtData == 'asgmtData' ? this.QueryParamsData.hcmAssignmentId : this.QueryParamsData.fusionAssignmentId,
                requestType: this.selectedRequest,
                paybilChange: paybilChange,
                comments: changeForm.comments,
                effectiveDate: this.dateFormatService.convert_to_yyyymmdd(changeForm.effectiveDate)
            };
            this.requestChangeApi(payChangepayLoad,'');
        }
        if (this.selectedRequest == 'Assignment Extension') {
            const assignmentExtendFormValue = this.assignmentExtend.getFormData();
            const changeForm = this.changeRequestParentGroup.value;
            const payload: any = {
                personNumber: this.QueryParamsData.fusionEmployeeId,
                assignmentNumber: this.asgmtData == 'asgmtData' ? this.QueryParamsData.hcmAssignmentId : this.QueryParamsData.fusionAssignmentId,
                requestType: 'Assignment Extend',
                endDate: this.dateFormatService.convert_to_yyyymmdd(assignmentExtendFormValue.extend),
                comments: changeForm.comments,
            };
            this.requestChangeApi(payload,'');
        }
        if (this.selectedRequest == 'End of Assignment') {
            const changeForm = this.changeRequestParentGroup.value;
            const assignmentEndDateFormValue = this.assignmentEndDate.getFormData();
            const payload: AssignmentModel = {
                personNumber: this.QueryParamsData.fusionEmployeeId,
                assignmentNumber: this.asgmtData == 'asgmtData' ? this.QueryParamsData.hcmAssignmentId : this.QueryParamsData.fusionAssignmentId,
                requestType: 'Assignment End Date',
                endDate: this.dateFormatService.convert_to_yyyymmdd(assignmentEndDateFormValue.endDate),
                comments: changeForm.comments,
                actionReasonCode: assignmentEndDateFormValue.reason
            };
            this.requestChangeApi(payload,'');
        }
    }
}
