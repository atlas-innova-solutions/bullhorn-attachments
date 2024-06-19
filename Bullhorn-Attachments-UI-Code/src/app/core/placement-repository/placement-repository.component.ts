import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FilterService } from 'primeng/api';
import { StatusModel, ApproverModel, SupplierNameModel } from '../../shared/models/static-search-filters.model';
//import * as moment from 'moment';
import { PlacementRepositoryDataTable } from '../../shared/models/Data-Table/placement-repository-data-grid/pr-data-tbl.model';
import { SetupDataService } from '../../shared/services/data-service/setup-data.service';
import { StatusHistoryDialogComponent } from '../../shared/components/status-history-dialog/status-history-dialog.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from '../../shared/utils/error-messages.constant';
import { LocalStorageVariables } from '../../shared/utils/local-storage-variable';
import { Action_All, OnHold_Reason, Setup_PlacementRepository, Setup_PlacementRepository_Main, Setup_StatusHistory, Status_Icon_Labels } from '../../shared/utils/lable-text-constant';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { StaticData } from '../../shared/services/load-static-data.service';
import { StaticApiRes } from '../../shared/utils/static-initial-api';
import { Company, PlacementStatusReasons } from '../../shared/models/shared-component.model';
import { StatusHistoryData, ChangeStatusRequest, ChangeCancelRequest } from '../../shared/models/status.model';
import { SharedDialogService } from '../../shared/services/dialog-service/shared-dialog.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import moment from 'moment';
import { DateFormatService } from '../../shared/services/date-format/date-format-service';
import { PlacementStatusEnum } from '../../shared/models/placement-status.enum';
import { CoreModulesUrl } from '../../shared/utils/page-navigation-url';
import { PreviewDialogComponent } from '../preview-dialog/components/preview-dialog/preview-dialog.component';
import { LangTranslateService } from '../../shared/services/Lang-translate-service/lang-translate.service';
import { Table } from 'primeng/table';
import { LegalEmployer, FinanceReviewStatus, LineOfBusiness, FusionCustomerIdAccount } from '../../shared/models/static-models/business-model/business-dropdown.modes';
import { ChangeHistoryComponent } from '../../shared/components/change-history/change-history.component';
import { ChangeHistoryData } from '../../shared/models/Data-Table/worker-search-data-grid/change-history-data.model';
import { MapperService } from '../../shared/services/auto-mapper/mapper-service';
import { ILegalEmployer, IFinanceReviewStatus, ILineOfBusiness } from '../../shared/models/static-models/interface/i-business-dropdown.model';
import { PlacementReviewDataModel } from '../../shared/models/review/placement-review-data.model';
import { SharedService } from '../../shared/services/shared-service/shared.service';
import { Role, SetupUserRole } from '../../shared/models/user-role-attributes/role.model';
import { AllowedAction } from '../../shared/models/user-role-attributes/allowed-action.model';
import { Feature } from '../../shared/models/user-role-attributes/feature.model';

@Component({
    selector: 'app-placement-repository',
    templateUrl: './placement-repository.component.html',
    styleUrl: './placement-repository.component.scss'
})
export class PlacementRepositoryComponent {
    currentUser: any = {};
    loading: boolean = false;
    tableView: boolean = false;
    cols!: any[];
    dataTable: PlacementRepositoryDataTable[] = [];
    dataTableCount!: number;
    totalRecords: number | undefined;
    approvedRequestSubscription: Subscription | undefined;
    storeEventValue: any;
    limit: any;
    startIndex: any;
    RequestedDataList: any[] = [];

    RegisteredBUList: ILegalEmployer[] = [];
    registeredBUStatus: ILegalEmployer[] = [];

    ClientaccountList: FusionCustomerIdAccount[] = [];
    clientaccountStatus: FusionCustomerIdAccount[] = [];

    SupplierList: SupplierNameModel[] = [];
    supplierStatus: SupplierNameModel[] = [];

    ServiceLineList: LineOfBusiness[] = [];
    serviceLineStatus: ILineOfBusiness[] = [];

    financialReviewStatusList: IFinanceReviewStatus[] = [];
    financialReviewStatus: IFinanceReviewStatus[] = [];

    StatusList: StatusModel[] = [];
    selectedStatus: StatusModel[] = [];

    ApproverList: ApproverModel[] = [];
    approverStatus: ApproverModel[] = [];

    @Input() pageName: string = 'placementRepo';

    searchPayload: any = {};

    showOpIconsPanel: boolean = false;

    onHoldDialogVisible: boolean = false;
    cancelPlacementVisible: boolean = false;
    onHoldComments: any;
    onHoldReason: any;
    onHoldReasonList: PlacementStatusReasons[] = [];
    cancelReasonList: PlacementStatusReasons[] = [];
    onChangeHoldForm!: FormGroup;
    cancelPlacementForm!: FormGroup;
    selectedCaseId!: number;
    cancelCaseId!: number;
    selectedAtsPlacementId!: number;
    cancelAtsPlacementId!: number;
    ref: DynamicDialogRef | undefined;
    refs: DynamicDialogRef | undefined;
    refChange: DynamicDialogRef | undefined;
    statusData: StatusHistoryData[] = [];
    statusHistoryCols!: any[];
    ChangeHistoryData: ChangeHistoryData[] = [];
    chnageHistoryCols!: any[];

    readonly errorMessages = ErrorMessages;

    statusIconLabels: any;

    approvedRequestDataList: any;
    collapse: boolean = false;

    searchColumns: boolean = false;
    sourceTable!: any[];
    targetTable: any[] = [];
    searchColsApply: boolean = true;
    count: number = 0;
    onFirstLoad: boolean = false;
    size: number = 0;
    hideGrid!: boolean;
    isOnHoldSaveBtnClicked: boolean = false;
    isCancelPlacementBtnClicked: boolean = false;
    onHoldReviewFlag: boolean = false;
    @Input()
    public set reviewFlag(data: boolean) {
        if (data) {
            this.onHoldReviewFlag = data;
        }
    }
    allReviewData!: PlacementReviewDataModel;
    @Input()
    public set reviewData(data: PlacementReviewDataModel) {
        if (data) {
            this.allReviewData = data;
            if (this.onHoldReviewFlag) {
                this.showOnHoldDialog(Number(this.allReviewData.caseId), Number(this.allReviewData.placementId));
            }
        }
    }
    @Output() reviewFlagEmitter = new EventEmitter<any>();

    @ViewChild('dt', { static: false }) placementDataTable!: Table;

    private readonly filterSubject: Subject<any> = new Subject<string | undefined>();
    private filterSubscription?: Subscription;

    isSearchThroughFilterInput: boolean = false;

    roleAttributes!: SetupUserRole;
    role!: Role | undefined | null;
    feature!: Feature | undefined | null;
    actions!: AllowedAction[] | undefined | null;

    constructor(
        private filterService: FilterService,
        private SetupDataService: SetupDataService,
        private dialogService: SharedDialogService,
        private route: Router,
        private formBuilder: FormBuilder,
        private dateFormatService: DateFormatService,
        private translateService: LangTranslateService,
        private cdr: ChangeDetectorRef,
        private mapperService: MapperService,
        private sharedService: SharedService
    ) {}

    ngOnInit() {
        this.onFirstLoad = false;
        this.hideGrid = true;
        this.currentUser = JSON.parse(sessionStorage.getItem(LocalStorageVariables.currentUser) || '{}');
        const selectedLang = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'English';
        this.translateService.changeLanguage(selectedLang);

        this.sharedService.roleAttributes.subscribe((data) => {
            this.roleAttributes = data;
        });

        if (this.roleAttributes && this.roleAttributes.roles && this.roleAttributes.roles.length > 0) {
            const selectedRole = JSON.parse(sessionStorage.getItem(LocalStorageVariables.appUserRole) || '{}');
            if (selectedRole) {
                this.role = this.roleAttributes.roles.find((r) => r.roleId == selectedRole.roleId);
                const features = this.role?.features;
                if (features && features.length > 0) {
                    this.feature = features.find((f) => f.featureName == 'Placement-Repository');
                    if (this.feature) {
                        this.actions = this.feature.allowedActions;
                    }
                }
            }
        }

        console.log('Role Attributes', this.roleAttributes.roles);

        if (localStorage.getItem(LocalStorageVariables.placementRepositoryAdvancedSearchFilter) != null) {
            this.hideGrid = false;
        }

        if (localStorage.getItem(LocalStorageVariables.placementRepositoryColumns) != null) {
            this.cols = JSON.parse(localStorage.getItem(LocalStorageVariables.placementRepositoryColumns) || '');
        } else {
            this.cols = [...Setup_PlacementRepository_Main, ...Setup_PlacementRepository, ...Action_All];
        }

        this.sourceTable = [...Setup_PlacementRepository];

        if (localStorage.getItem(LocalStorageVariables.placementRepoSelectedColList) != null) {
            this.targetTable = JSON.parse(localStorage.getItem(LocalStorageVariables.placementRepoSelectedColList) || '');
        } else {
            this.targetTable = [];
        }

        StaticData.subscribe((res: StaticApiRes) => {
            this.onHoldReasonList = res.staticApiKey.placementStatusReasons;
            this.onHoldReasonList=  this.onHoldReasonList.filter((res)=>{
                return res.placementStatusId==3
            })
           this.cancelReasonList = res.staticApiKey.placementStatusReasons;
           this.cancelReasonList= this.cancelReasonList.filter((res)=>{
                return res.placementStatusId==8
            })

            this.StatusList = res.staticApiKey.placementWorkflowStatus.map((item: any) => {
                return { name: item.name, id: item.placementStatusId };
            });
            // this.RegisteredBUList = res.staticApiKey.legalEmployee.map((item: any) => { return { name: item.legalEmployeeName, id: item.legalEmployeeId } });
            this.RegisteredBUList = this.mapperService.map(LegalEmployer, res.legalEmployer);
            this.financialReviewStatusList = this.mapperService.map(FinanceReviewStatus, res.financeReviewStatus);
            this.ClientaccountList = this.mapperService.map(FusionCustomerIdAccount, res.fusionCustomerIdAccount);
            this.ServiceLineList = this.mapperService.map(LineOfBusiness, res.lineOfBusiness);

            let supplierDataList: any[] = res.staticApiKey.company.filter((x: Company) => x.companyTypeId === '2');
            this.SupplierList = supplierDataList.map((item: any) => {
                return { name: item.companyName, id: item.companyId };
            });

            this.bindAdvancedSearchFiltersFromLocalStorage();
        });

        this.bindSearchDebounce();

        this.prepareChangeStatusFormGroup();

        this.loading = true;
        this.statusIconLabels = Status_Icon_Labels;
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

    ngOnDestroy() {
        this.filterSubscription?.unsubscribe();
    }

    bindAdvancedSearchFiltersFromLocalStorage() {
        if (localStorage.getItem(LocalStorageVariables.placementRepositoryAdvancedSearchFilter) != null) {
            let searchParam: any = JSON.parse(localStorage.getItem(LocalStorageVariables.placementRepositoryAdvancedSearchFilter) || '{}');

            this.dataTable = [];
            this.dataTableCount = 0;

            if (searchParam.placementStatus && searchParam.placementStatus.length > 0) {
                this.selectedStatus = [];
                searchParam.placementStatus.forEach((placementStatus: any) => {
                    let selectedPlacementStatus = this.StatusList.filter((x) => x.id.toString().includes(placementStatus.id.toString()));
                    if (selectedPlacementStatus && selectedPlacementStatus.length > 0) {
                        this.selectedStatus.push(...selectedPlacementStatus);
                    }
                });
            }

            if (searchParam.registeredBUStatus && searchParam.registeredBUStatus.length > 0) {
                this.registeredBUStatus = [];
                searchParam.registeredBUStatus.forEach((registeredBUStatus: any) => {
                    let selectedRegisteredBUStatus = this.RegisteredBUList.filter((x) => x.id.toString().includes(registeredBUStatus.id.toString()));
                    if (selectedRegisteredBUStatus && selectedRegisteredBUStatus.length > 0) {
                        this.registeredBUStatus.push(...selectedRegisteredBUStatus);
                    }
                });
            }

            if (searchParam.clientaccountStatus && searchParam.clientaccountStatus.length > 0) {
                this.clientaccountStatus = [];
                searchParam.clientaccountStatus.forEach((clientaccountStatus: any) => {
                    let selectedClientaccountStatus = this.ClientaccountList.filter((x) => x.id.toString().includes(clientaccountStatus.id.toString()));
                    if (selectedClientaccountStatus && selectedClientaccountStatus.length > 0) {
                        this.clientaccountStatus.push(...selectedClientaccountStatus);
                    }
                });
            }

            if (searchParam.supplierStatus && searchParam.supplierStatus.length > 0) {
                this.supplierStatus = [];
                searchParam.supplierStatus.forEach((supplierStatus: any) => {
                    let selectedSupplierStatus = this.SupplierList.filter((x) => x.id.toString().includes(supplierStatus.id.toString()));
                    if (selectedSupplierStatus && selectedSupplierStatus.length > 0) {
                        this.supplierStatus.push(...selectedSupplierStatus);
                    }
                });
            }

            if (searchParam.serviceLineStatus && searchParam.serviceLineStatus.length > 0) {
                this.serviceLineStatus = [];
                searchParam.serviceLineStatus.forEach((serviceLineStatus: any) => {
                    let selectedServiceLineStatus = this.ServiceLineList.filter((x) => x.id.toString().includes(serviceLineStatus.id.toString()));
                    if (selectedServiceLineStatus && selectedServiceLineStatus.length > 0) {
                        this.serviceLineStatus.push(...selectedServiceLineStatus);
                    }
                });
            }

            if (searchParam.financialReviewStatus && searchParam.financialReviewStatus.length > 0) {
                this.financialReviewStatus = [];
                searchParam.financialReviewStatus.forEach((financialReviewStatus: any) => {
                    let selectedFinancialReviewStatus = this.financialReviewStatusList.filter((x) => x.id.toString().includes(financialReviewStatus.id.toString()));
                    if (selectedFinancialReviewStatus && selectedFinancialReviewStatus.length > 0) {
                        this.financialReviewStatus.push(...selectedFinancialReviewStatus);
                    }
                });
            }

            this.loading = true;
            this.onFirstLoad = true;
            this.size = 25;
            this.limit = 25;
            this.startIndex = 0;
            if (!this.isAdvanceSearchBtnEnabled()) {
                this.fetchAdvancedSearchFilterData();
            } else {
                this.loading = false;
            }
        }
    }

    getPlacements(event: any, isReload: boolean) {
        if (this.onFirstLoad === true) {
            this.storeEventValue = event;
            this.limit = event && event.rows ? event.rows : 25;
            let firstEvent: any = event && event.first ? event.first : 0;
            this.startIndex = firstEvent / this.limit;

            this.searchPayload.searchParam = this.prepareSearchFilterData();
            this.searchPayload.filterParam = this.prepareFilterSearchObj(this.placementDataTable);

            if (isReload) {
                this.placementDataTable.first = 0;
                this.limit = 25;
                this.startIndex = 0;
            }
            this.loading = true;
            if (JSON.stringify(event?.filters) === '{}' || this.isSearchThroughFilterInput == false) {
                this.loading = true;
                this.SetupDataService.placementRepoSearchData(
                    this.searchPayload,
                    this.limit,
                    this.startIndex,
                    this.placementDataTable ? (this.placementDataTable.sortField ? this.placementDataTable.sortField : '') : '',
                    this.placementDataTable ? (this.placementDataTable.sortOrder ? this.placementDataTable.sortOrder : 0) : 0
                ).subscribe(
                    (res: any) => {
                        this.hideGrid = false;
                        this.dataTableCount = res.totalRecordsCount;
                        this.dataTable = this.transformPlacementsDateFormat(res.data);
                        this.loading = false;
                    },
                    (err: any) => {
                        console.error('Error in placement repo search api: ', err);
                        this.hideGrid = false;
                        this.loading = false;
                        this.dataTable = [];
                        this.dataTableCount = 0;
                    }
                );
            } else {
                this.onFilterInput(event);
            }
        } else {
            this.dataTable = [];
            this.loading = false;
            this.onFirstLoad = true;
            this.dataTableCount = 0;
            this.size = 25;
            this.limit = 25;
            this.startIndex = 0;
        }
    }

    onFilterInputEnabled(event: boolean) {
        this.isSearchThroughFilterInput = event;
    }

    onFilterInput(event: any): void {
        this.filterSubject.next(JSON.stringify(event.filters));
        this.isSearchThroughFilterInput = false;
    }

    bindSearchDebounce() {
        this.filterSubscription = this.filterSubject
            .pipe(
                debounceTime(3000),
                distinctUntilChanged(),
                switchMap((searchQuery) => {
                    console.log(searchQuery);
                    this.loading = true;
                    return this.SetupDataService.placementRepoSearchData(
                        this.searchPayload,
                        this.limit,
                        this.startIndex,
                        this.placementDataTable && this.placementDataTable.sortField ? this.placementDataTable.sortField : '',
                        this.placementDataTable && this.placementDataTable.sortOrder ? this.placementDataTable.sortOrder : 0
                    );
                })
            )
            .subscribe(
                (res: any) => {
                    console.log('dtatablerecords', this.dataTableCount);
                    this.dataTableCount = res.totalRecordsCount;
                    this.dataTable = this.transformPlacementsDateFormat(res.data);
                    this.loading = false;
                },
                (err: any) => {
                    console.error('Error in placement repo search api: ', err);
                    this.loading = false;
                    this.dataTable = [];
                    this.dataTableCount = 0;
                }
            );
    }

    getAllOpenandReviewPlacements(isTableReset: boolean) {
        let openandReviewPlacementStatusus: any[] = this.StatusList.filter((x: any) => x.name.includes(PlacementStatusEnum.InReview) || x.name.includes(PlacementStatusEnum.Open));
        this.tableView = true;
        this.selectedStatus = openandReviewPlacementStatusus;
        this.registeredBUStatus = [];
        this.clientaccountStatus = [];
        this.supplierStatus = [];
        this.serviceLineStatus = [];
        this.financialReviewStatus = [];
        this.collapse = true;
        // this.hideGrid = false;

        localStorage.removeItem(LocalStorageVariables.placementRepositoryAdvancedSearchFilter);

        this.fetchSearchFilterData(isTableReset);

        localStorage.removeItem(LocalStorageVariables.placementRepositoryColumns);
        localStorage.removeItem(LocalStorageVariables.placementRepoSelectedColList);

        this.cols = [...Setup_PlacementRepository_Main, ...Setup_PlacementRepository, ...Action_All];
        this.sourceTable = [...Setup_PlacementRepository, ...OnHold_Reason];
        this.targetTable = [];
        this.setPlacementAdvancedSearchToLocalStorage();
    }

    openPlacementReview(caseId: any): void {
        this.route.navigate([CoreModulesUrl.PlacementRepository + '/' + CoreModulesUrl.PlacementReview], { queryParams: { caseId: caseId } });
    }

    onHoldPlacementSave(): void {
        this.isOnHoldSaveBtnClicked = true;

        if (this.onChangeHoldForm.valid) {
            let formGroupValue = this.onChangeHoldForm.value;
            const request = new ChangeStatusRequest(this.selectedCaseId, this.selectedAtsPlacementId, formGroupValue.reason.placementStatusId, this.currentUser.appUserId, formGroupValue.reason.reasonId, formGroupValue.comments, 'N');

            this.SetupDataService.saveStatusChange(request).subscribe(
                (res: any) => {
                    this.onChangeHoldForm.reset();
                    this.onHoldDialogVisible = false;
                    this.fetchSearchFilterData(true);
                    this.reviewFlagEmitter.emit({ isSuccess: true, message: 'Success' });
                },
                (err: any) => {
                    console.log('Error in on Hold Status change API: ', err);
                    this.reviewFlagEmitter.emit({ isSuccess: false, message: 'Error' });
                }
            );
        }
    }

    cancelPlacementSave(): void {
        this.isCancelPlacementBtnClicked = true;

        if (this.cancelPlacementForm.valid) {
            let formGroupValue = this.cancelPlacementForm.value;
            console.log('formGroupValue', formGroupValue);
            const request = new ChangeCancelRequest(this.cancelCaseId, this.cancelAtsPlacementId, formGroupValue.cancelReason.placementStatusId, this.currentUser.appUserId, formGroupValue.cancelReason.reasonId, formGroupValue.comments);

            this.SetupDataService.saveCancelChange(request).subscribe(
                (res: any) => {
                    this.cancelPlacementForm.reset();
                    this.cancelPlacementVisible = false;
                    this.fetchSearchFilterData(true);
                    this.reviewFlagEmitter.emit({ isSuccess: true, message: 'Success' });
                },
                (err: any) => {
                    this.reviewFlagEmitter.emit({ isSuccess: false, message: 'Error' });
                }
            );
        }
    }

    initiatePlacementReview(caseId: number, atsPlacementId: number, placementReviewStatus: string): void {
        let inReviewPlacementStatus: any[] = this.StatusList.filter((x: any) => x.name.includes(PlacementStatusEnum.InReview));

        if (placementReviewStatus === PlacementStatusEnum.Open) {
            this.SetupDataService.statusChange(caseId, this.currentUser.appUserId).subscribe(
                (res: any) => {
                    this.openPlacementReview(caseId);
                },
                (err: any) => {
                    console.log('Error in on Status change (From Open to In-Review) API: ', err);
                }
            );
        } else {
            const request = {
                caseId: caseId,
                placementId: atsPlacementId,
                placementStatusId: inReviewPlacementStatus[0].id,
                updatedBy: this.currentUser.appUserId,
                onHoldToOtherStatus: 'Y'
            };

            this.SetupDataService.saveStatusChange(request).subscribe(
                (res: any) => {
                    this.openPlacementReview(caseId);
                },
                (err: any) => {
                    console.log('Error in on Status change (From On-Hold to In-Review) API: ', err);
                }
            );
        }
    }

    openStatusHistoryDialog(caseId: number): void {
        if (this.statusHistoryCols === undefined || this.statusHistoryCols.length === 0) {
            this.statusHistoryCols = Setup_StatusHistory;
        }

        this.SetupDataService.getStatusHistoryByCaseId(caseId).subscribe(
            (res: StatusHistoryData[]) => {
                this.statusData = res.map((item: StatusHistoryData) => {
                    item.updatedOn = this.dateFormatService.convert_to_mmddyyyy_hhmmss(item.updatedOn);
                    return item;
                });

                this.invokeStatusHistoryDialog(this.statusData);
            },
            (err: any) => {
                this.statusData = [];
                this.invokeStatusHistoryDialog(this.statusData);
            }
        );
    }

    private invokeStatusHistoryDialog(data: any) {
        this.ref = this.dialogService.openDialog({
            component: StatusHistoryDialogComponent,
            config: {
                header: 'Status History',
                data: {
                    statusData: data,
                    cols: this.statusHistoryCols
                },
                width: '85%',
                height: '38rem'
            }
        });

        this.ref.onClose.subscribe((e: any) => {
            this.onHoldDialogVisible = false;
            this.onChangeHoldForm.reset();
            this.isOnHoldSaveBtnClicked = false;
            this.isCancelPlacementBtnClicked = false;
            this.reviewFlagEmitter.emit({});
        });
    }

    showOnHoldDialog(caseId: number, atsPlacementId: number) {
        this.selectedCaseId = caseId;
        this.selectedAtsPlacementId = atsPlacementId;
        this.onHoldDialogVisible = true;
        this.isOnHoldSaveBtnClicked = false;
    }

    closeOnHoldDialog() {
        this.onHoldDialogVisible = false;
        this.onChangeHoldForm.reset();
        this.isOnHoldSaveBtnClicked = false;
        this.reviewFlagEmitter.emit({});
    }

    showCancelPlacementDialog(caseId: number, atsPlacementId: number) {
        this.cancelCaseId = caseId;
        this.cancelAtsPlacementId = atsPlacementId;
        this.cancelPlacementVisible = true;
        this.isCancelPlacementBtnClicked = false;
    }

    closeCancelPlacementDialog() {
        this.cancelPlacementVisible = false;
        this.cancelPlacementForm.reset();
        this.isCancelPlacementBtnClicked = false;
        this.reviewFlagEmitter.emit({});
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    }

    isFieldValid(field: string) {
        if (!this.isOnHoldSaveBtnClicked) {
            return !this.onChangeHoldForm.get(field)?.valid && this.onChangeHoldForm.get(field)?.touched;
        } else {
            return !this.onChangeHoldForm.get(field)?.valid;
        }
    }

    isValid(field: string) {
        if (!this.isCancelPlacementBtnClicked) {
            return !this.cancelPlacementForm.get(field)?.valid && this.cancelPlacementForm.get(field)?.touched;
        } else {
            return !this.cancelPlacementForm.get(field)?.valid;
        }
    }

    prepareChangeStatusFormGroup() {
        this.onChangeHoldForm = this.formBuilder.group({
            reason: [null, [Validators.required]],
            comments: ['']
        });
        this.cancelPlacementForm = this.formBuilder.group({
            cancelReason: [null, [Validators.required]],
            comments: ['']
        });
    }

    prepareFilterSearchObj(event: any) {
        let paramObj = {
            atsPlacementId: this.getTableEventFilterValueNull(event?.filters?.atsPlacementId),
            // firstName: this.getTableEventFilterValueEmpty(event?.filters?.firstName),
            // lastName: this.getTableEventFilterValueEmpty(event?.filters?.lastName),
            workerName: this.getTableEventFilterValueEmpty(event?.filters?.workerName),
            legalEmployer: this.getTableEventFilterValueEmpty(event?.filters?.legalEmployer),
            customerName: this.getTableEventFilterValueEmpty(event?.filters?.customerName),
            supplierName: this.getTableEventFilterValueEmpty(event?.filters?.supplierName),
            lineOfBusiness: this.getTableEventFilterValueEmpty(event?.filters?.serviceLine),
            // branch: this.getTableEventFilterValueEmpty(event?.filters?.branch),
            // workerType: this.getTableEventFilterValueEmpty(event?.filters?.workerType),
            targetStartDate: this.getTableEventFilterValueEmpty(event?.filters?.targetStartDate),
            // cesOrEes: this.getTableEventFilterValueEmpty(event?.filters?.cesOrEes),
            consultantPointOfContact: this.getTableEventFilterValueEmpty(event?.filters?.consultantPointOfContact),
            placementReviewStatus: this.getTableEventFilterValueEmpty(event?.filters?.placementReviewStatus),
            reviewedBy: this.getTableEventFilterValueEmpty(event?.filters?.reviewedBy),
            reviewedDate: this.getTableEventFilterValueNull(event?.filters?.reviewedDate),
            updatedBy: this.getTableEventFilterValueEmpty(event?.filters?.updatedBy),
            updatedDate: this.getTableEventFilterValueNull(event?.filters?.updatedDate),
            financeReviewStatus: this.getTableEventFilterValueEmpty(event?.filters?.financeReviewStatus),
            financeReviewerComments: this.getTableEventFilterValueEmpty(event?.filters?.financeReviewerComments),
            personType: this.getTableEventFilterValueEmpty(event?.filters?.personType),
            reason: this.getTableEventFilterValueEmpty(event?.filters?.reason)
            // comments: this.getTableEventFilterValueEmpty(event?.filters?.comments),
        };
        return paramObj;
    }

    getTableEventFilterValueNull(data: any) {
        if (!!data && data.constructor === Object) {
            return data ? data.value : null;
        } else {
            return data ? data[0]?.value : null;
        }
    }

    getTableEventFilterValueEmpty(data: any) {
        if (!!data && data.constructor === Object) {
            return data ? data.value : '';
        } else {
            return data ? data[0]?.value : '';
        }
    }

    isAdvanceSearchBtnEnabled() {
        if (
            this.isArrayNullandEmpty(this.registeredBUStatus) ||
            this.isArrayNullandEmpty(this.clientaccountStatus) ||
            this.isArrayNullandEmpty(this.supplierStatus) ||
            this.isArrayNullandEmpty(this.serviceLineStatus) ||
            this.isArrayNullandEmpty(this.selectedStatus) ||
            this.isArrayNullandEmpty(this.financialReviewStatus)
        ) {
            return false;
        } else {
            return true;
        }
    }

    isArrayNullandEmpty(data: any[]) {
        if (data != null && data.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    prepareSearchFilterData() {
        let dataTableSearchFilterLocal: any | null = {};
        dataTableSearchFilterLocal.searchParam = {
            legalEmployer: this.getTableSearchFilterValueEmpty(this.registeredBUStatus),
            clientName: this.getTableSearchFilterValueEmpty(this.clientaccountStatus),
            supplierName: this.getTableSearchFilterValueEmpty(this.supplierStatus),
            lineOfBusiness: this.getTableSearchFilterValueEmpty(this.serviceLineStatus),
            placementStatus: this.getTableSearchFilterValueEmpty(this.selectedStatus),
            financeReviewStatus: this.getTableSearchFilterValueEmpty(this.financialReviewStatus)
        };
        return dataTableSearchFilterLocal.searchParam;
    }

    getTableSearchFilterValueEmpty(status: any) {
        return [status].length == null
            ? []
            : status?.length
              ? status.map((data: any) => {
                    return data.name;
                })
              : [];
    }

    fetchAdvancedSearchFilterData() {
        this.searchPayload = {
            filterParam: this.prepareFilterSearchObj(null),
            searchParam: this.prepareSearchFilterData()
        };

        this.SetupDataService.placementRepoSearchData(this.searchPayload, this.limit, this.startIndex, '', 0).subscribe(
            (res: any) => {
                this.dataTable = this.transformPlacementsDateFormat(res.data);
                this.dataTableCount = res.totalRecordsCount;
                this.loading = false;
            },
            (err: any) => {
                this.dataTable = [];
                this.dataTableCount = 0;
                this.loading = false;
            }
        );
    }

    fetchSearchFilterData(isTableReset: boolean) {
        this.searchPayload.filterParam = this.prepareFilterSearchObj(this.placementDataTable);
        this.searchPayload.searchParam = this.prepareSearchFilterData();

        if (isTableReset === true) {
            this.placementDataTable ? (this.placementDataTable.first = 0) : null;
            this.limit = 25;
            this.startIndex = 0;
        } else {
            this.limit = 25;
            this.startIndex = 0;
            this.setPlacementAdvancedSearchToLocalStorage();
        }

        this.SetupDataService.placementRepoSearchData(
            this.searchPayload,
            this.limit,
            this.startIndex,
            this.placementDataTable && this.placementDataTable.sortField ? this.placementDataTable.sortField : '',
            this.placementDataTable && this.placementDataTable.sortOrder ? this.placementDataTable.sortOrder : 0
        ).subscribe(
            (res: any) => {
                setTimeout(() => {
                    this.dataTable = this.transformPlacementsDateFormat(res.data);
                    this.dataTableCount = res.totalRecordsCount;
                }, 0);
                this.hideGrid = false;
                this.loading = false;
            },
            (err: any) => {
                this.hideGrid = false;
                this.dataTable = [];
                this.dataTableCount = 0;
                this.loading = false;
            }
        );
    }

    private setPlacementAdvancedSearchToLocalStorage() {
        let searchParam: any = {
            registeredBUStatus: this.registeredBUStatus,
            clientaccountStatus: this.clientaccountStatus,
            supplierStatus: this.supplierStatus,
            serviceLineStatus: this.serviceLineStatus,
            placementStatus: this.selectedStatus,
            financialReviewStatus: this.financialReviewStatus
        };

        localStorage.setItem(LocalStorageVariables.placementRepositoryAdvancedSearchFilter, JSON.stringify(searchParam));
    }

    transformPlacementsDateFormat(res: any) {
        if (res && res.length) {
            return res.map((item: any) => {
                item.updatedDate = this.dateFormatService.convert_to_mmddyyyy(item.updatedDate);
                item.reviewedDate = this.dateFormatService.convert_to_mmddyyyy(item.reviewedDate);
                item.targetStartDate = this.dateFormatService.convert_to_mmddyyyy(item.targetStartDate);
                return item;
            });
        } else {
            return res;
        }
    }

    exportToCSV() {
        const payload = {
            // filterParam: this.prepareFilterSearchObj(this.placementDataTable),
            searchParam: this.prepareSearchFilterData()
        };

        this.SetupDataService.exportData(payload, false).subscribe((res: any) => {
            let dateFormat = moment(new Date()).format('MMDDYYYY');
            let fileName = 'Placement_Repository_' + dateFormat + '.xlsx';
            this.SetupDataService.downloadFile(res, fileName);
        });
    }

    isIconVisibleByStatus(statusName: string, iconName: string, financeReviewStatus: any = null) {
        if (iconName === this.statusIconLabels.Preview || iconName === this.statusIconLabels.StatusHistory) {
            return true;
        }
        if (iconName === this.statusIconLabels.ChangeHistory) {
            return true;
        } else if (statusName === PlacementStatusEnum.Open) {
            if (iconName === this.statusIconLabels.InitiateReview || iconName === this.statusIconLabels.OnHold || iconName === this.statusIconLabels.CancelPlacement) {
                return true;
            }
        } else if (statusName === PlacementStatusEnum.InReview) {
            if (iconName === this.statusIconLabels.Review || iconName === this.statusIconLabels.OnHold || iconName === this.statusIconLabels.CancelPlacement) {
                return true;
            }
        } else if (statusName === PlacementStatusEnum.OnHold) {
            if (iconName === this.statusIconLabels.InitiateReview || iconName === this.statusIconLabels.CancelPlacement) {
                return true;
            }
        } else if (
            statusName === PlacementStatusEnum.PayApproved ||
            statusName === PlacementStatusEnum.BillApproved ||
            statusName === PlacementStatusEnum.AssignmentSetupInitiated ||
            statusName === PlacementStatusEnum.AssignmentSetupFailed ||
            statusName === PlacementStatusEnum.AssignmentSetupCompleted ||
            statusName === PlacementStatusEnum.Completed
        ) {
            if (this.role?.roleName == 'FINANCETEAM') {
                if (iconName === this.statusIconLabels.Review) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }

        return false;
    }

    getSelectedValuesInList(data: any) {
        if (this.isArrayNullandEmpty(data)) {
            var allStatus: any = [];
            data.forEach((element: any) => {
                allStatus.push(element.name);
            });
            return allStatus?.join('\n');
        } else {
            return 'None selected';
        }
    }

    collapseAdvanceSearch() {
        this.collapse = !this.collapse;
    }

    customSort(event: any) {
        if (event?.data && event?.data?.length) {
            event.data.sort((data1: any, data2: any) => {
                let value1 = data1[event.sortField];
                let value2 = data2[event.sortField];
                let result = null;
                if (value1 == null && value2 != null) {
                    result = -1;
                } else if (value1 != null && value2 == null) {
                    result = 1;
                } else if (value1 == null && value2 == null) {
                    result = 0;
                } else if (typeof value1 === 'string' && typeof value2 === 'string') {
                    result = value1.localeCompare(value2);
                } else {
                    result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
                }
                return event.sortOrder * result;
            });
        }
    }

    openPreviewDialog(data: any) {
        this.refs = this.dialogService.openDialog({
            component: PreviewDialogComponent,
            config: {
                data: {
                    statusData: data
                },
                header: 'Placement Preview',
                width: '95%',
                height: '70rem'
            }
        });
    }

    openPreviewOnPlacementId(data: boolean, rowData: any) {
        if (data == true) {
            this.openPreviewDialog(rowData);
        }
    }

    openChangeHistoryDialog(caseId: any, atsPlacementId: any) {
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

        this.refChange.onClose.subscribe((e: any) => {
            this.onHoldDialogVisible = false;
            this.onChangeHoldForm.reset();
            this.isOnHoldSaveBtnClicked = false;
            this.isCancelPlacementBtnClicked = false;
            this.reviewFlagEmitter.emit({});
        });
    }

    showColumns() {
        this.searchColumns = true;
        if (localStorage.getItem(LocalStorageVariables.placementRepoSelectedColList) != null) {
            this.targetTable = JSON.parse(localStorage.getItem(LocalStorageVariables.placementRepoSelectedColList) || '');
            if (this.targetTable && this.targetTable.length) {
                this.targetTable.forEach((targetItem) => {
                    this.sourceTable = this.sourceTable.filter((item) => {
                        return item.field !== targetItem.field;
                    });
                });
            }
        } else {
            this.targetTable = [];
        }
    }
    moveToTarget() {
        this.searchColsApply = false;
    }
    moveToSource() {
        if (this.targetTable.length > 0) {
            this.searchColsApply = false;
        } else this.searchColsApply = true;
    }

    columnSelection(val?: boolean) {
        if (val && this.targetTable.length > 0) {
            this.cols = [...Setup_PlacementRepository_Main, ...this.targetTable];
            this.targetTable.forEach((data) => {
                this.sourceTable.push(data);
            });
            this.cols.push(...Action_All);
            localStorage.setItem(LocalStorageVariables.placementRepositoryColumns, JSON.stringify(this.cols));
            localStorage.setItem(LocalStorageVariables.placementRepoSelectedColList, JSON.stringify(this.targetTable));
            this.targetTable = [];
            this.searchColumns = false;
        } else {
            if (this.targetTable.length > 0) {
                this.targetTable.forEach((data) => {
                    this.sourceTable.push(data);
                });
            }
            this.cols;
            this.sourceTable = [...Setup_PlacementRepository];
            this.targetTable = [];
            // this.searchColumns = false;
            this.searchColsApply = true;
        }
    }

    onHide() {
        if (this.targetTable.length > 0) {
            this.targetTable.forEach((data) => {
                this.sourceTable.push(data);
            });
        }
        this.cols;
        this.sourceTable;
        this.targetTable = [];
        this.searchColumns = false;
        this.searchColsApply = true;
    }
}
