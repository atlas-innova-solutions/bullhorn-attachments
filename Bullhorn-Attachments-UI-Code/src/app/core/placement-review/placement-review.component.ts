import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SetupDataService } from '../../shared/services/data-service/setup-data.service';
import { PlacementReviewAuditDataModel, PlacementReviewDataModel } from '../../shared/models/review/placement-review-data.model';

import { ExternalidentifierComponent } from '../../shared/components/externalidentifier/externalidentifier.component';
import { PersonalinfoComponent } from '../../shared/components/personalinfo/personalinfo.component';
import { HomeaddressComponent } from '../../shared/components/homeaddress/homeaddress.component';
import { ImmigrationComponent } from '../../shared/components/immigration/immigration.component';
import { EmploymentComponent } from '../../shared/components/worker-info/employment/employment.component';
import { HCMIdentifiersComponent } from '../../shared/components/worker-info/hcm-identifiers/hcm-identifiers.component';
import { CustomerComponent } from '../../shared/components/organisationdetails/customer/customer.component';
import { SupplierComponent } from '../../shared/components/organisationdetails/supplier/supplier.component';
import { WorkerrelationshipComponent } from '../../shared/components/organisationdetails/workerrelationship/workerrelationship.component';
import { ProjectDeliveryComponent } from '../../shared/components/organisationdetails/project-delivery/project-delivery.component';
import { AssignmentsComponent } from '../../shared/components/assignments/assignments/assignments.component';
import { JobComponent } from '../../shared/components/job/job/job.component';
import { OffboardingComponent } from '../../shared/components/offboarding/offboarding/offboarding.component';
import { PurchaseOrderComponent } from '../../shared/components/purchase-order/purchase-order/purchase-order.component';
import { ShiftSchedulesComponent } from '../../shared/components/shiftSchedules/shift-schedules/shift-schedules.component';
import { VmsComponent } from '../../shared/components/vms/vms/vms.component';
import { WorkAddressComponent } from '../../shared/components/workAddress/work-address/work-address.component';
import { PayrollComponent } from '../../shared/components/pay-bill/payroll/payroll.component';
import { BillingComponent } from '../../shared/components/pay-bill/billing/billing.component';
import { RatesComponent } from '../../shared/components/pay-bill/rates/rates.component';
import { DirectHireComponent } from '../../shared/components/hire-details/direct-hire/direct-hire.component';
import { CreditAllocationComponent } from '../../shared/components/innova-team/credit-allocation/credit-allocation.component';
import { SharedServiceComponent } from '../../shared/components/innova-team/shared-service/shared-service.component';
import { BenefitsComponent } from '../../shared/components/benefits/benefits/benefits.component';
import { TimeSetupComponent } from '../../shared/components/time-setup/time-setup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LangTranslateService } from '../../shared/services/Lang-translate-service/lang-translate.service';
import { CoreModulesUrl } from '../../shared/utils/page-navigation-url';
import { LocalStorageVariables } from '../../shared/utils/local-storage-variable';
import { SharedDialogService } from '../../shared/services/dialog-service/shared-dialog.service';
import { ChangeHistoryComponent } from '../../shared/components/change-history/change-history.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { IFinanceReviewReasons, IFinanceReviewStatus } from '../../shared/models/static-models/interface/i-business-dropdown.model';
import { FinanceReviewStatus } from '../../shared/models/static-models/business-model/business-dropdown.modes';
import { StaticData } from '../../shared/services/load-static-data.service';
import { StaticApiRes } from '../../shared/utils/static-initial-api';
import { MapperService } from '../../shared/services/auto-mapper/mapper-service';
import { ClientContactComponent } from '../../shared/components/organisationdetails/client-contact/client-contact.component';
import { VendorComponent } from '../../shared/components/organisationdetails/vendor/vendor.component';
import { PayBillApproverComponent } from '../../shared/components/pay-bill/pay-bill-approver/pay-bill-approver.component';
import { TimeElementsAndRatesComponent } from '../../shared/components/pay-bill/time-elements-and-rates/time-elements-and-rates.component';
import { AlertService } from '../../shared/services/alert-service/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { SharedService } from '../../shared/services/shared-service/shared.service';
import { SetupUserRole } from '../../shared/models/user-role-attributes/role.model';
import { Feature } from '../../shared/models/user-role-attributes/feature.model';
import { Section } from '../../shared/models/user-role-attributes/section.model';
import { AllowedAction } from '../../shared/models/user-role-attributes/allowed-action.model';
import { ErrorMessages } from '../../shared/utils/error-messages.constant';

@Component({
    selector: 'app-placement-review',
    templateUrl: './placement-review.component.html',
    styleUrl: './placement-review.component.scss'
})
export class PlacementReviewComponent implements OnInit, AfterViewInit {
    caseId!: number;
    display: boolean = false;
    displayStatus: string = '';
    refChange: DynamicDialogRef | undefined;
    reviewFlag: boolean = false;
    financialReviewStatusList: IFinanceReviewStatus[] = [];
    financeReviewStatus: any;
    financeReviewStatusId!: any;
    reviewCompleteRoleName: string = '';
    financeReviewerCommentsForm!: FormGroup;
    // Worker Information Tab Section
    @ViewChild(ExternalidentifierComponent) externalIdentifierSection!: ExternalidentifierComponent;
    @ViewChild(PersonalinfoComponent) personalInfoSection!: PersonalinfoComponent;
    @ViewChild(HomeaddressComponent) homeAddressSection!: HomeaddressComponent;
    @ViewChild(ImmigrationComponent) immigrationSection!: ImmigrationComponent;
    @ViewChild(EmploymentComponent) employmentSection!: EmploymentComponent;
    @ViewChild(HCMIdentifiersComponent) hCMIdentifiersSection!: HCMIdentifiersComponent;

    // Organisation Details Tab Section
    @ViewChild(CustomerComponent) customerSection!: CustomerComponent;
    @ViewChild(ProjectDeliveryComponent) projectDeliverySection!: ProjectDeliveryComponent;
    @ViewChild(SupplierComponent) supplierSection!: SupplierComponent;
    @ViewChild(WorkerrelationshipComponent) workerRelationshipSection!: WorkerrelationshipComponent;
    @ViewChild(ClientContactComponent) clientContactSection!: ClientContactComponent;
    @ViewChild(VendorComponent) vendorSection!: VendorComponent;

    // Assignment & Job Information Tab Section
    @ViewChild(AssignmentsComponent) assignmentSection!: AssignmentsComponent;
    @ViewChild(JobComponent) jobSection!: JobComponent;
    @ViewChild(OffboardingComponent) offboardingSection!: OffboardingComponent;
    @ViewChild(PurchaseOrderComponent) purchaseOrderSection!: PurchaseOrderComponent;
    @ViewChild(ShiftSchedulesComponent) shiftSchedulesSection!: ShiftSchedulesComponent;
    @ViewChild(VmsComponent) vmsSection!: VmsComponent;
    @ViewChild(WorkAddressComponent) workAddressSection!: WorkAddressComponent;

    // Pay & Bill Tab Section
    @ViewChild(PayrollComponent) payrollSection!: PayrollComponent;
    @ViewChild(PayBillApproverComponent) payBillApproverSection!: PayBillApproverComponent;
    @ViewChild(BillingComponent) billingSection!: BillingComponent;
    @ViewChild(RatesComponent) ratesSection!: RatesComponent;

    // Other Hire Details
    @ViewChild(DirectHireComponent) directHireSection!: DirectHireComponent;
    // @ViewChild(ContractHireComponent) contractHireSection!: ContractHireComponent;

    // Innova Team Information Tab Section
    @ViewChild(CreditAllocationComponent) creditAllocationSection!: CreditAllocationComponent;
    @ViewChild(SharedServiceComponent) sharedServiceSection!: SharedServiceComponent;

    // Benefits Tab Section
    @ViewChild(BenefitsComponent) benefitsSection!: BenefitsComponent;

    // Time Setup Tab Section
    @ViewChild(TimeSetupComponent) timeSetupSection!: TimeSetupComponent;

    // Time Elements And Rates Tab Section
    @ViewChild(TimeElementsAndRatesComponent) timeElementsAndRatesSection!: TimeElementsAndRatesComponent;

    // Additional Information Tab Section
    // @ViewChild(AdditionInformationComponent) additionalInformationSection!: AdditionInformationComponent;

    reviewData!: PlacementReviewDataModel;

    placementReviewAuditDataModel!: any;

    originalDataReviewAPIResponse!: PlacementReviewDataModel;

    index: number = 0;
    noOfTabs: number = 3;

    currentUser: any;
    // currentUser: any;

    isPersonUpdate: string = 'N';
    isAssignmentUpdate: string = 'N';
    isAssignmentTeamsAddrUpdate: string = 'N';
    isTimeSetupUpdate: string = 'N';
    isTimeElementsRatesUpdate: string = 'N';

    isWorkerAndAssignmentDataReviewValidTab: boolean = true;
    isPayBillAndTimeSetupReviewValidTab: boolean = true;
    isOrganisationAndInternalTeamReviewValidTab: boolean = true;
    isError: boolean = false;
    messages!: Message[];

    roleAttributes!: SetupUserRole;
    feature!: Feature | undefined | null;
    sections!: Section[] | undefined | null;
    actions!: AllowedAction[] | undefined | null;

    role!: any;
    readonly errorMessages = ErrorMessages;
    financeReviewReasonList: IFinanceReviewReasons[] =[];

    constructor(
        private setupDataService: SetupDataService,
        private route: ActivatedRoute,
        private translateService: LangTranslateService,
        private router: Router,
        private formBuilder: FormBuilder,
        private dialogService: SharedDialogService,
        private mapperService: MapperService,
        private alertServce: AlertService,
        private sharedService: SharedService
    ) {}

    ngAfterViewInit(): void {}

    ngOnInit(): void {
        StaticData.subscribe((res: StaticApiRes) => {
            this.financialReviewStatusList = this.mapperService.map(FinanceReviewStatus, res.financeReviewStatus);
        });
        this.currentUser = JSON.parse(sessionStorage.getItem(LocalStorageVariables.currentUser) || '{}');

        this.sharedService.roleAttributes.subscribe((data) => {
            this.roleAttributes = data;
        });

        if (this.roleAttributes && this.roleAttributes.roles && this.roleAttributes.roles.length > 0) {
            const selectedRole = JSON.parse(sessionStorage.getItem(LocalStorageVariables.appUserRole) || '{}');
            if (selectedRole) {
                const role = this.roleAttributes.roles.find((r) => r.roleId == selectedRole.roleId);
                this.role = role;
                const features = role?.features;
                if (features && features.length > 0) {
                    this.feature = features.find((f) => f.featureName == 'Placement-Review');
                    if (this.feature) {
                        this.sections = this.feature.sections;
                        this.actions = this.feature.allowedActions;
                    }
                }
            }
        }

        console.log('Role Attributes', this.roleAttributes.roles);

        this.route.queryParamMap.subscribe((params: any) => {
            if (params.params) {
                this.caseId = params.params.caseId;
            }
        });
        this.prepareFinanceReviewCommentFormGroup();
        const selectedLang = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'English';
        this.translateService.changeLanguage(selectedLang);

        this.fetchPlacementReviewData();
    }

    isSectionAvailable(sectionName: string): boolean {
        if (this.sections && this.sections.length > 0) {
            const section = this.sections.find((sec: Section) => sec.sectionName === sectionName);

            if (section) {
                return section.display;
            }
        }
        return false;
    }

    isActionAvailable(actionName: string): boolean {
        if (this.actions && this.actions.length > 0) {
            const action = this.actions.find((act: AllowedAction) => act.actionName === actionName);

            if (action) {
                return action.displayAction;
            }
        }

        return false;
    }

    isActionEnabled(actionName: string): boolean {
        if (this.actions && this.actions.length > 0) {
            const action = this.actions.find((act: AllowedAction) => act.actionName === actionName);

            if (action) {
                return action.isActionAllowed;
            }
        }

        return false;
    }

    private fetchPlacementReviewData() {
        this.setupDataService.getPlacementDetails(this.caseId).subscribe(
            (res: PlacementReviewDataModel) => {
                console.log(res);
                this.reviewData = JSON.parse(JSON.stringify(res));
                this.originalDataReviewAPIResponse = JSON.parse(JSON.stringify(res));
            },
            (err: any) => {
                console.log('error_Details: ', err);
            }
        );
    }

    prepareFinanceReviewCommentFormGroup() {
        this.financeReviewerCommentsForm = this.formBuilder.group({
            financeReviewerComments: [''],
            financeReviewStatusReason: ['', Validators.required]
        });
    }

    next() {
        this.index = this.index + 1;
    }

    saveAndNext() {
        this.saveOrCompleteReview(false);
        this.index = this.index + 1;
    }

    openPrev() {
        this.index = this.index - 1;
    }

    save(): void {
        this.saveOrCompleteReview(false);
        console.log('data: ', this.reviewData);
    }

    check(originalReviewData: any, updatedReviewData: any): any[] {
        const updatedFields: any[] = [];

        this.placementReviewAuditDataModel = new PlacementReviewAuditDataModel();

        if (originalReviewData && updatedReviewData && this.placementReviewAuditDataModel) {
            for (const key of Object.keys(this.placementReviewAuditDataModel)) {
                const oldValue = originalReviewData[key];
                const newValue = updatedReviewData[key];

                if (oldValue && newValue && typeof oldValue !== 'object' && typeof newValue !== 'object' && oldValue.toString() !== newValue.toString()) {
                    updatedFields.push({
                        labelName: this.placementReviewAuditDataModel[key],
                        oldValue: oldValue,
                        newValue: newValue
                    });
                }
            }

            for (const innerObjectKey of Object.keys(this.placementReviewAuditDataModel)) {
                const oldInnerObject = originalReviewData[innerObjectKey];
                const newInnerObject = updatedReviewData[innerObjectKey];

                const innerKey = this.placementReviewAuditDataModel[innerObjectKey];

                if (oldInnerObject && newInnerObject && innerKey && typeof oldInnerObject === 'object' && typeof newInnerObject === 'object' && typeof innerKey === 'object') {
                    for (const fieldKey of Object.keys(innerKey)) {
                        let oldValue = oldInnerObject[fieldKey];
                        let newValue = newInnerObject[fieldKey];

                        if (this.isInt(oldValue)) {
                            oldValue = parseInt(oldValue);
                        }

                        if (this.isInt(newValue)) {
                            newValue = parseInt(newValue);
                        }

                        oldValue = oldValue ? oldValue : oldValue?.toString() != '' ? null : null;
                        newValue = newValue ? newValue : newValue?.toString() != '' ? null : null;

                        if (oldValue?.toString()?.trim() !== newValue?.toString()?.trim()) {
                            if (innerObjectKey == 'person' && this.isPersonUpdate === 'N') {
                                this.isPersonUpdate = 'Y';
                            }

                            if (innerObjectKey == 'assignment' && this.isAssignmentUpdate === 'N') {
                                this.isAssignmentUpdate = 'Y';
                            }

                            if (innerObjectKey == 'assignmentTeamAddr' && this.isAssignmentTeamsAddrUpdate === 'N') {
                                this.isAssignmentTeamsAddrUpdate = 'Y';
                            }

                            if (innerObjectKey == 'timeSetup' && this.isTimeSetupUpdate === 'N') {
                                if (this.isAssignmentUpdate === 'N') {
                                    this.isAssignmentUpdate = 'Y';
                                }
                                this.isTimeSetupUpdate = 'Y';
                            }

                            if (innerObjectKey == 'timeElementsRates' && this.isTimeElementsRatesUpdate === 'N') {
                                if (this.isAssignmentUpdate === 'N') {
                                    this.isAssignmentUpdate = 'Y';
                                }
                                this.isTimeElementsRatesUpdate = 'Y';
                            }

                            updatedFields.push({
                                labelName: innerKey[fieldKey],
                                oldValue: oldValue,
                                newValue: newValue
                            });
                        }
                    }
                }
            }
        }

        return updatedFields;
    }

    isInt(value: any) {
        return !isNaN(value) && parseInt(value) == value && !isNaN(parseInt(value, 10));
    }

    resetReviewFlags() {
        this.isPersonUpdate = 'N';
        this.isAssignmentUpdate = 'N';
        this.isAssignmentTeamsAddrUpdate = 'N';
        this.isTimeSetupUpdate = 'N';
        this.isTimeElementsRatesUpdate = 'N';
    }

    isWorkerAndAssignmentDataReviewTabValid() {
        let isValid: boolean = false;
        if (this.isSectionAvailable('External Identifier')) {
            isValid = this.externalIdentifierSection.validateAllFormFields();
            console.log('this.externalIdentifierSection.validateAllFormFields()', this.externalIdentifierSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Personal Information')) {
            isValid = this.personalInfoSection.validateAllFormFields() && isValid;
            console.log('this.personalInfoSection.validateAllFormFields()', this.personalInfoSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Worker Relationship')) {
            isValid = this.workerRelationshipSection.validateAllFormFields() && isValid;
            console.log('this.workerRelationshipSection.validateAllFormFields()', this.workerRelationshipSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Supplier')) {
            isValid = this.supplierSection.validateAllFormFields() && isValid;
            console.log('this.supplierSection.validateAllFormFields()', this.supplierSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('HCM Identifiers')) {
            isValid = this.hCMIdentifiersSection.validateAllFormFields() && isValid;
            console.log('this.hCMIdentifiersSection.validateAllFormFields()', this.hCMIdentifiersSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Home Address')) {
            isValid = this.homeAddressSection.validateAllFormFields() && isValid;
            console.log('this.homeAddressSection.validateAllFormFields()', this.homeAddressSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Immigration')) {
            isValid = this.immigrationSection.validateAllFormFields() && isValid;
            console.log('this.immigrationSection.validateAllFormFields()', this.immigrationSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Employment')) {
            isValid = this.employmentSection.validateAllFormFields() && isValid;
            console.log('this.employmentSection.validateAllFormFields()', this.employmentSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Assignment')) {
            isValid = this.assignmentSection.validateAllFormFields();
            console.log('this.assignmentSection.validateAllFormFields()', this.assignmentSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Job')) {
            isValid = this.jobSection.validateAllFormFields() && isValid;
            console.log('this.jobSection.validateAllFormFields()', this.jobSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Purchase Order')) {
            isValid = this.purchaseOrderSection.validateAllFormFields() && isValid;
            console.log('this.purchaseOrderSection.validateAllFormFields()', this.purchaseOrderSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('VMS')) {
            isValid = this.vmsSection.validateAllFormFields() && isValid;
            console.log('this.vmsSection.validateAllFormFields()', this.vmsSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Worker Address')) {
            isValid = this.workAddressSection.validateAllFormFields() && isValid;
            console.log('this.workAddressSection.validateAllFormFields()', this.workAddressSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Benefits')) {
            isValid = this.benefitsSection.validateAllFormFields();
            console.log('this.benefitsSection.validateAllFormFields()', this.benefitsSection.validateAllFormFields());
        }
        this.isWorkerAndAssignmentDataReviewValidTab = isValid ? true : false;
        this.isTabError(isValid);
        return isValid;
    }
    isOrganisationAndInternalTeamReviewTabValid() {
        let isValid: boolean = false;
        if (this.isSectionAvailable('Customer')) {
            isValid = this.customerSection.validateAllFormFields();
            console.log('this.customerSection.validateAllFormFields()', this.customerSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Project Delivery')) {
            isValid = this.projectDeliverySection.validateAllFormFields() && isValid;
            console.log('this.projectDeliverySection.validateAllFormFields()', this.projectDeliverySection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Credit Allocation')) {
            isValid = this.creditAllocationSection.validateAllFormFields();
            console.log('this.creditAllocationSection.validateAllFormFields()', this.creditAllocationSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Shared Services Team')) {
            isValid = this.sharedServiceSection.validateAllFormFields() && isValid;
            console.log('this.sharedServiceSection.validateAllFormFields()', this.sharedServiceSection.validateAllFormFields());
        }
        this.isOrganisationAndInternalTeamReviewValidTab = isValid ? true : false;
        this.isTabError(isValid);
        return isValid;
    }
    isPayBillAndTimeSetupReviewTabValid() {
        let isValid: boolean = false;
        if (this.isSectionAvailable('Payroll')) {
            isValid = this.payrollSection.validateAllFormFields();
            console.log('this.payrollSection.validateAllFormFields()', this.payrollSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Rates')) {
            isValid = this.ratesSection.validateAllFormFields() && isValid;
            console.log('this.ratesSection.validateAllFormFields()', this.ratesSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Pay and Bill Approver')) {
            isValid = this.payBillApproverSection.validateAllFormFields() && isValid;
            console.log('this.payBillApproverSection.validateAllFormFields()', this.payBillApproverSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Billing')) {
            isValid = this.billingSection.validateAllFormFields() && isValid;
            console.log('this.billingSection.validateAllFormFields()', this.billingSection.validateAllFormFields());
        }

        if (this.isSectionAvailable('Time Setup')) {
            isValid = this.timeSetupSection.validateAllFormFields() && isValid;
            console.log('this.timeSetupSection.validateAllFormFields()', this.timeSetupSection.validateAllFormFields());
        }
        if (this.isSectionAvailable('Time Elements And Rate')) {
            isValid = this.timeElementsAndRatesSection.validateAllFormFields() && isValid;
            console.log('this.timeElementsAndRatesSection.validateAllFormFields()', this.timeElementsAndRatesSection.validateAllFormFields());
        }
        this.isPayBillAndTimeSetupReviewValidTab = isValid ? true : false;
        this.isTabError(isValid);
        return isValid;
    }

    isTabError(valid: any) {
        if (valid == false) {
            this.isError = true;
            this.messages = [{ severity: 'error', detail: 'Please fill all mandatory fields' }];
        }
        setTimeout(() => {
            this.messages = [];
        }, 3000);
    }

    isAllReviewSectionFormsValid(): void {
        let isValid: boolean = this.isWorkerAndAssignmentDataReviewTabValid();

        isValid = this.isOrganisationAndInternalTeamReviewTabValid() && isValid;

        isValid = this.isPayBillAndTimeSetupReviewTabValid() && isValid;

        if (!isValid) {
            return;
        } else {
            this.openCompleteReviewDialog('setup', 'Pay Approved');
        }
    }

    saveOrCompleteReview(isReviewComplete: boolean): void {
        let changeHistoryPayload: any = this.prepareReviewChangeHistoryPayload();

        let payload: PlacementReviewDataModel = this.reviewData;
        console.log(payload);

        if (isReviewComplete) {
            payload.placementStatusId = '4';
            payload.isSetupReviewCompleted = 'Y';
            payload.isFinanceReviewCompleted = payload.isFinanceReviewCompleted ? payload.isFinanceReviewCompleted : 'N';
            payload.setupReviewerName = this.currentUser.appUserName;
            payload.reviewedBy = this.currentUser.appUserId;
            payload.setUpReviewerId = this.currentUser.appUserId;
        } else {
            payload.isSetupReviewCompleted = 'N';
            payload.isFinanceReviewCompleted = payload.isFinanceReviewCompleted ? payload.isFinanceReviewCompleted : 'N';
            payload.placementStatusId = payload.isFinanceReviewCompleted === 'Y' ? '4' : '2';
        }

        payload.modifiedBy = this.currentUser.appUserId;
        payload.modifiedByName = this.currentUser.appUserName;
        payload.isReviewedBy = this.currentUser.appUserName;
        payload.isPersonUpdate = this.isPersonUpdate;
        payload.isAssignmentUpdate = this.isAssignmentUpdate;
        payload.isAssignmentTeamsAddrUpdate = this.isAssignmentTeamsAddrUpdate;
        payload.isTimeSetupUpdate = this.isTimeSetupUpdate;
        payload.isTimeElementsRatesUpdate = this.isTimeElementsRatesUpdate;

        this.setupDataService.setupSaveOrReview(payload).subscribe(
            (res: any) => {
                if (isReviewComplete) {
                    console.log('Review Complated: ', res);
                    this.alertServce.successAlert('Review completed succesfully', 'add');
                    setTimeout(() => {
                        this.goToPlacementRepository();
                    }, 2000);
                } else {
                    this.originalDataReviewAPIResponse = JSON.parse(JSON.stringify(this.reviewData));
                    this.alertServce.successAlert('Data saved succesfully', 'add');
                    this.resetReviewFlags();
                }
            },
            (err: any) => {
                console.log('Review Failed: ', err);
                if (isReviewComplete) {
                    this.alertServce.errorAlert('Review completion Failed');
                } else {
                    this.alertServce.errorAlert('Save data Failed');
                }
                this.resetReviewFlags();
            }
        );

        if (changeHistoryPayload && changeHistoryPayload?.changes && changeHistoryPayload?.changes?.length !== 0) {
            this.saveReviewChangeHistory(changeHistoryPayload);
        }
    }

    goToPlacementRepository(): void {
        this.router.navigate([CoreModulesUrl.PlacementRepository]);
    }

    openCompleteReviewDialog(reviewCompleteRole: string, item: any) {
        this.getFinanceReviewReasonList(item.id)
        if (reviewCompleteRole == 'setup') {
            this.displayStatus = item;
            this.financeReviewStatus = item;
            this.display = true;
            this.reviewCompleteRoleName = reviewCompleteRole;
        } else {
            this.displayStatus = item.name;
            this.financeReviewStatus = item;
            this.financeReviewStatusId = item.id;
            this.display = true;
            this.reviewCompleteRoleName = reviewCompleteRole;
        }
    }

    getFinanceReviewReasonList(financialReviewStatusId: number){
        console.log(financialReviewStatusId);
        this.setupDataService.getFinanceReviewReasons(financialReviewStatusId).subscribe(
            (res: any) => {
                this.financeReviewReasonList = res;
            },
            (err: any) => {
            }
        );
    }

    isValid() {
        let fieldsControls = this.financeReviewerCommentsForm?.controls;
        for (let field in fieldsControls) {
            const control = this.financeReviewerCommentsForm?.get(field)
            if (control?.invalid && (control?.value == '' || control?.value == null)) {
                control.markAsDirty({ onlySelf: true });
            }
        }
    }

    cancel() {
        this.display = false;
        this.financeReviewerCommentsForm.reset();
    }

    openChangeHistory(caseId: any, atsPlacementId: any) {
        this.refChange = this.dialogService.openDialog({
            component: ChangeHistoryComponent,
            config: {
                header: 'Change History',
                data: {
                    caseId: caseId,
                    atsPlacementId: atsPlacementId
                },
                width: '85%',
                height: '50rem'
            }
        });
    }

    showOnHold() {
        this.reviewFlag = true;
    }

    reviewFlagListener(event: any) {
        this.reviewFlag = false;

        if (event && event.isSuccess && event.isSuccess == true) {
            this.goToPlacementRepository();
        }
    }

    finaceReviewComplete() {
        if(this.financeReviewerCommentsForm.valid) {
        if (this.displayStatus == 'Pay Approved') {
            this.saveOrCompleteReview(true);
        } else {
            let payload: PlacementReviewDataModel = this.reviewData;
            let formGroupValue = this.financeReviewerCommentsForm.value;
            let financeReviewStatusReason = this.financeReviewReasonList.find((i) => i.id === formGroupValue.financeReviewStatusReason)?.name;
            payload.isSetupReviewCompleted = this.reviewData.isSetupReviewCompleted ? this.reviewData.isSetupReviewCompleted : 'N';
            payload.placementStatusId = '4';
            payload.isFinanceReviewCompleted = 'Y';
            payload.financeReviewerId = this.currentUser.appUserId;
            payload.financeReviewerName = this.currentUser.appUserName;
            payload.financeReviewStatus = this.financeReviewStatus.name;
            payload.financeReviewStatusId = this.financeReviewStatusId;
            payload.modifiedBy = this.currentUser.appUserId;
            payload.modifiedByName = this.currentUser.appUserName;
            payload.reviewedBy = this.currentUser.appUserId;
            payload.isPersonUpdate = 'Y';
            payload.isAssignmentUpdate = 'Y';
            payload.isAssignmentTeamsAddrUpdate = 'Y';
            payload.isTimeSetupUpdate = 'Y';
            payload.isTimeElementsRatesUpdate = 'Y';
            payload.isReviewedBy = this.currentUser.appUserName;
            payload.financeReviewerComments = formGroupValue.financeReviewerComments;
            payload.financeReviewStatusReason = financeReviewStatusReason;
            payload.financeReviewStatusReasonId = formGroupValue.financeReviewStatusReason;
            this.setupDataService.setupSaveOrReview(payload).subscribe(
                (res: any) => {
                    console.log('Finance Review Complated: ', res);
                    this.financeReviewerCommentsForm.reset();
                    this.goToPlacementRepository();
                },
                (err: any) => {
                    console.log('Finance Review Failed: ', err);
                }
            );
        }
    }
    else {
        this.isValid();
    }
    }

    prepareReviewStatusHistoryPayloadForFinanceRole(): any {
        let formGroupValue = this.financeReviewerCommentsForm.value;

        const request = {
            caseId: this.caseId,
            placementId: this.reviewData.placementId,
            placementStatusId: this.reviewData.placementStatusId,
            updatedBy: this.currentUser.appUserId,
            onHoldToOtherStatus: 'N',
            comments: formGroupValue.financeReviewerComments
        };

        this.setupDataService.saveStatusChange(request).subscribe(
            (res: any) => {},
            (err: any) => {}
        );
    }

    prepareReviewChangeHistoryPayload(): any {
        const updatedFields = this.check(this.originalDataReviewAPIResponse, this.reviewData);

        console.log(updatedFields);

        const payload = {
            caseId: this.caseId,
            placementId: this.reviewData.placementId,
            modifiedBy: this.currentUser.appUserId,
            changes: updatedFields
        };

        console.log(payload);

        return payload;
    }

    saveReviewChangeHistory(payload: any) {
        this.setupDataService.setupSaveReviewChangeHistory(payload).subscribe(
            (res: any) => {
                console.log('Review Change History: ', res.message);
            },
            (err: any) => {
                console.log('Review Change History Failed: ', err);
            }
        );
    }
}
