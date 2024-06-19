import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SetupDataService } from '../../shared/services/data-service/setup-data.service';
import { SharedDialogService } from '../../shared/services/dialog-service/shared-dialog.service';
import { Subject, Subscription } from 'rxjs';
import { ServiceLineModel, StatusModel, CESEESModel, ApproverModel } from '../../shared/models/static-search-filters.model';
import { LocalStorageVariables } from '../../shared/utils/local-storage-variable';

import { Action_All, Setup_WorkerSearch, Setup_WorkerSearch_Main } from '../../shared/utils/lable-text-constant';
import { StaticApiRes } from '../../shared/utils/static-initial-api';
import { StaticData } from '../../shared/services/load-static-data.service';
import { PlacementStatusReasons, PlacementWorkflowStatuses } from '../../shared/models/shared-component.model';
import moment from 'moment';
import { LangTranslateService } from '../../shared/services/Lang-translate-service/lang-translate.service';
import { CoreModulesUrl } from '../../shared/utils/page-navigation-url';
import { FusionAssignementStatus, FusionCustomerIdAccount, LegalEmployer, LineOfBusiness } from '../../shared/models/static-models/business-model/business-dropdown.modes';
import { PreviewDialogComponent } from '../preview-dialog/components/preview-dialog/preview-dialog.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { IFusionAssignementStatus, ILegalEmployer, ILineOfBusiness } from '../../shared/models/static-models/interface/i-business-dropdown.model';
import { MapperService } from '../../shared/services/auto-mapper/mapper-service';
import { Table } from 'primeng/table';
import { DateFormatService } from '../../shared/services/date-format/date-format-service';
import { WorkerSearchDataTable } from '../../shared/models/Data-Table/worker-search-data-grid/ws-data-tbl.model';
import { AllowedAction } from '../../shared/models/user-role-attributes/allowed-action.model';
import { Feature } from '../../shared/models/user-role-attributes/feature.model';
import { SetupUserRole } from '../../shared/models/user-role-attributes/role.model';
import { SharedService } from '../../shared/services/shared-service/shared.service';

@Component({
    selector: 'app-worker-search',
    templateUrl: './worker-search.component.html',
    styleUrl: './worker-search.component.scss'
})
export class WorkerSearchComponent {
    RegisteredBUList: ILegalEmployer[] = [];
    registeredBUStatus: ILegalEmployer[] = [];

    ClientaccountList: FusionCustomerIdAccount[] = [];
    clientaccountStatus: FusionCustomerIdAccount[] = [];

    cesEesList: CESEESModel[] = [];
    cesEesStatus: CESEESModel[] = [];

    ServiceLineList: ServiceLineModel[] = [];
    serviceLineStatus: ServiceLineModel[] = [];

    AssignemnetList: IFusionAssignementStatus[] = [];
    assignemnetStatus: IFusionAssignementStatus[] = [];

    StatusList: StatusModel[] = [];
    selectedStatus: StatusModel[] = [];

    LOBList: ILineOfBusiness[] = [];
    LOBStatus: ILineOfBusiness[] = [];

    ApproverList: ApproverModel[] = [];
    approverStatus: ApproverModel[] = [];

    currentUser: any;
    loading: boolean = false;
    collapse: boolean = false;
    searchPayload: any = {};
    storeEventValue: any;
    limit: any;
    startIndex: any;

    searchColumns: boolean = false;
    sourceTable!: any[];
    targetTable: any[] = [];

    cols!: any[];
    dataTable: WorkerSearchDataTable[] = [];
    totalRecords: number = 0;
    searchColsApply: boolean = true;
    approvedRequestSubscription: Subscription | undefined;

    @Input() pageName: string = 'workerSearch';

    onHoldReasonList: PlacementStatusReasons[] = [];
    placementStatusList: PlacementWorkflowStatuses[] = [];
    refs: DynamicDialogRef | undefined;

    resetPageOnSort: boolean = false;
    onFirstLoad: boolean = false;
    size: number = 0;
    hideGrid!: boolean;

    @ViewChild('dt', { static: false }) workerSearchDataTable!: Table;
    first: number = 0;

    @ViewChild('dt') workerSearchTable!: Table;

    private readonly filterSubject: Subject<any> = new Subject<string | undefined>();
    private filterSubscription?: Subscription;

    isSearchThroughFilterInput: boolean = false;

    roleAttributes!: SetupUserRole;
    feature!: Feature | undefined | null;
    actions!: AllowedAction[] | undefined | null;

    constructor(
        private SetupDataService: SetupDataService,
        private dialogService: SharedDialogService,
        private route: Router,
        private dateFormatService: DateFormatService,
        private translateService: LangTranslateService,
        private mapperService: MapperService,
        private sharedService: SharedService
    ) {}

    ngOnInit() {
        this.hideGrid = true;
        this.currentUser = JSON.parse(sessionStorage.getItem(LocalStorageVariables.currentUser) || '{}');

        this.sharedService.roleAttributes.subscribe((data) => {
            this.roleAttributes = data;
        });

        if (this.roleAttributes && this.roleAttributes.roles && this.roleAttributes.roles.length > 0) {
            const selectedRole = JSON.parse(sessionStorage.getItem(LocalStorageVariables.appUserRole) || '{}');
            if (selectedRole) {
                const role = this.roleAttributes.roles.find((r) => r.roleId == selectedRole.roleId);
                const features = role?.features;
                if (features && features.length > 0) {
                    this.feature = features.find((f) => f.featureName == 'Worker-Search');
                    if (this.feature) {
                        this.actions = this.feature.allowedActions;
                    }
                }
            }
        }

        console.log('Role Attributes', this.roleAttributes.roles);

        if (localStorage.getItem(LocalStorageVariables.workerSearchColumns) != null) {
            this.cols = JSON.parse(localStorage.getItem(LocalStorageVariables.workerSearchColumns) || '');
        } else {
            this.cols = [...Setup_WorkerSearch_Main, ...Setup_WorkerSearch, ...Action_All];
        }

        if (localStorage.getItem(LocalStorageVariables.workerSearchAdvancedSearchFilter) != null) {
            this.hideGrid = false;
        }

        this.sourceTable = [...Setup_WorkerSearch];

        if (localStorage.getItem(LocalStorageVariables.workerSearchSelectedColList) != null) {
            this.targetTable = JSON.parse(localStorage.getItem(LocalStorageVariables.workerSearchSelectedColList) || '');
        } else {
            this.targetTable = [];
        }

        const selectedLang = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'English';
        this.translateService.changeLanguage(selectedLang);

        StaticData.subscribe((res: StaticApiRes) => {
            this.onHoldReasonList = res.staticApiKey.placementStatusReasons;
            this.placementStatusList = res.staticApiKey.placementWorkflowStatus;

            this.StatusList = res.staticApiKey.placementWorkflowStatus.map((item: any) => {
                return { name: item.name, id: item.placementStatusId };
            });

            this.RegisteredBUList = this.mapperService.map(LegalEmployer, res.legalEmployer);
            this.AssignemnetList = this.mapperService.map(FusionAssignementStatus, res.fusionAssignmentStatus);
            this.LOBList = this.mapperService.map(LineOfBusiness, res.lineOfBusiness);
            this.ClientaccountList = this.mapperService.map(FusionCustomerIdAccount, res.fusionCustomerIdAccount);
            this.ServiceLineList = res.staticApiKey.services.map((item: any) => {
                return { name: item.serviceLineName, id: item.serviceLineId };
            });

            this.bindWorkerSearchFiltersFromLocalStorage();
        });
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

    getWorkerSearch(event: any, onLoad: boolean) {
        if (this.onFirstLoad === true) {
            this.loading = true;
            this.storeEventValue = event;
            this.limit = event.rows;
            let firstEvent: any = event.first;
            this.first = event.first;
            this.startIndex = firstEvent / this.limit;

            if (onLoad) {
                this.workerSearchTable ? (this.workerSearchDataTable.first = 0) : 0;
                this.limit = 25;
                this.startIndex = 0;
            }

            this.searchPayload.workerSearchParam = this.prepareSearchFilterData();
            this.searchPayload.workerFilterParam = this.prepareFilterSearchObj(this.workerSearchDataTable);

            this.SetupDataService.workerSearchData(this.searchPayload, this.limit, this.startIndex).subscribe(
                (res: any) => {
                    if (res?.data && res?.data.length > 0) {
                        this.dataTable = this.transformData(res.data);
                        this.totalRecords = res.totalRecordsCount;
                        this.loading = false;
                        this.hideGrid = false;
                        if (event.sortField) {
                            this.customSort(event);
                        }
                    } else {
                        this.hideGrid = false;
                        this.dataTable = [];
                        this.loading = false;
                        this.totalRecords = 0;
                    }
                },
                (err: any) => {
                    console.error('Error in Worker Search API: ', err);
                    this.loading = false;
                    this.dataTable = [];
                    this.totalRecords = 0;
                }
            );
        } else {
            this.dataTable = [];
            this.loading = false;
            this.onFirstLoad = true;
            this.totalRecords = 0;
            this.limit = 25;
            this.startIndex = 0;
        }
    }

    prepareFilterSearchObj(event: any) {
        let paramObj = {
            fusionAssignmentId: this.getTableEventFilterValueEmpty(event?.filters?.fusionAssignmentId),
            fusionEmployeeId: this.getTableEventFilterValueNull(event?.filters?.fusionEmployeeId),
            placementId: this.getTableEventFilterValueNull(event?.filters?.placementId),
            workerName: this.getTableEventFilterValueEmpty(event?.filters?.workerName),
            legalEmployer: this.getTableEventFilterValueEmpty(event?.filters?.legalEmployer),
            personType: this.getTableEventFilterValueEmpty(event?.filters?.personType),
            fusionCustomerName: this.getTableEventFilterValueEmpty(event?.filters?.fusionCustomerName),
            assignmentStatus: this.getTableEventFilterValueEmpty(event?.filters?.assignmentStatus),
            employmentStatus: this.getTableEventFilterValueEmpty(event?.filters?.employmentStatus),
            consultantPointOfContact: this.getTableEventFilterValueEmpty(event?.filters?.consultantPointOfContact),
            workState: this.getTableEventFilterValueEmpty(event?.filters?.workState),
            reviewedBy: this.getTableEventFilterValueEmpty(event?.filters?.reviewedBy)
        };

        if(paramObj.fusionEmployeeId && paramObj.fusionEmployeeId.length > 0) {
            if(paramObj.fusionEmployeeId.charAt(0) == 'E') {
                paramObj.fusionEmployeeId = paramObj.fusionEmployeeId.substring(1, paramObj.fusionEmployeeId.length - 1)
            }
        }

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

    prepareSearchFilterData() {
        let dataTableSearchFilterLocal: any | null = {};
        dataTableSearchFilterLocal.searchParam = {
            customerName: this.getTableSearchFilterValueEmpty(this.clientaccountStatus),
            legalEmployer: this.getTableSearchFilterValueEmpty(this.registeredBUStatus),
            serviceLine: this.getTableSearchFilterValueEmpty(this.LOBStatus),
            consultantPointOfContact: [], //this.getTableSearchFilterValueEmpty(this.cesEesStatus),
            fliterByStatus: {
                asgmtStatus: this.getTableSearchAssignmentStatus(this.assignemnetStatus),
                emplStatus: this.getTableSearchFilterValueEmpty(this.approverStatus)
            }
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

    getTableSearchAssignmentStatus(status: any) {
        return [status].length == null
            ? []
            : status?.length
              ? status.map((data: any) => {
                    return data.code;
                })
              : [];
    }

    workerSearchFilterData(isTableReset: boolean) {
        this.searchPayload.workerFilterParam = this.prepareFilterSearchObj(this.workerSearchDataTable);
        this.searchPayload.workerSearchParam = this.prepareSearchFilterData();

        if (isTableReset === true) {
            this.workerSearchDataTable.first = 0;
            this.limit = 25;
            this.startIndex = 0;
        } else {
            this.limit = 25;
            this.startIndex = 0;
            this.setWorkerSearchAdvancedSearchToLocalStorage();
        }

        this.SetupDataService.workerSearchData(this.searchPayload, this.limit, this.startIndex).subscribe(
            (res: any) => {
                if (res?.data && res?.data.length > 0) {
                    if (localStorage.getItem(LocalStorageVariables.workerSearchColumns) != null) {
                        this.cols = JSON.parse(localStorage.getItem(LocalStorageVariables.workerSearchColumns) || '');
                    } else {
                        this.cols = [...Setup_WorkerSearch_Main, ...Setup_WorkerSearch, ...Action_All];
                    }
                    setTimeout(() => {
                        this.dataTable = this.transformData(res.data);
                        this.totalRecords = res.totalRecordsCount;

                    }, 0);
                    this.hideGrid = false;
                    this.loading = false;
                } else {
                    this.dataTable = [];
                    this.loading = false;
                    this.totalRecords = 0;
                }
            },
            (err: any) => {
                this.hideGrid = false;
                this.loading = false;
                this.dataTable = [];
                this.totalRecords = 0;
            }
        );
    }

    exportToCSV() {
        this.searchPayload = {
            workerSearchParam: this.prepareSearchFilterData(),
            workerFilterParam: this.prepareFilterSearchObj(null)
        };

        this.SetupDataService.exportData(this.searchPayload, true).subscribe((res: any) => {
            let dateFormat = moment(new Date()).format('MMDDYYYY');
            let fileName = 'Worker_Search_' + dateFormat + '.xlsx';
            this.SetupDataService.downloadFile(res, fileName);
        });
    }

    fetchAdvancedSearchFilterData() {
        this.searchPayload = {
            workerFilterParam: this.prepareFilterSearchObj(null),
            workerSearchParam: this.prepareSearchFilterData()
        };
        this.loading = true;
        this.SetupDataService.workerSearchData(this.searchPayload, this.limit, this.startIndex).subscribe(
            (res: any) => {
                this.dataTable = this.transformData(res.data);
                this.totalRecords = res.totalRecordsCount;
                this.loading = false;
            },
            (err: any) => {
                this.dataTable = [];
                this.totalRecords = 0;
                this.loading = false;
            }
        );
    }

    transformData(res: any) {
        if (res && res.length) {
            return res.map((item: any) => {
                item.fusionEmployeeId = 'E' + item.fusionEmployeeId;
                return item;
            });
        } else {
            return res;
        }
    }

    //Convert Dropdown Values to list (not needed for now)
    getSelectedValuesInList(data: any) {
        if (data !== null) {
            var allStatus: any = [];
            data.forEach((element: any) => {
                allStatus.push(element.name);
            });
            return allStatus?.join('\n');
        } else {
            return 'None selected';
        }
    }

    /*.........sorting the table..............*/
    customSort(event: any) {
        this.dataTable.sort((data1: any, data2: any) => {
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

    advancecurrentSearchCollapser() {
        this.collapse = !this.collapse;
    }

    openEmployeeDashboard(rowData: any): void {
        console.log(rowData);
        const personId = rowData.personId;
        this.route.navigate([CoreModulesUrl.WorkerSearch + '/' + CoreModulesUrl.EmploymentDashboard], { queryParams: { personId: personId } });
    }

    openPreviewDialog(data: any, workerSearch: any) {
        console.log(data);
        this.refs = this.dialogService.openDialog({
            component: PreviewDialogComponent,
            config: {
                data: {
                    statusData: data,
                    workerSearch: workerSearch
                },
                header: 'Worker Search Preview',
                width: '95%',
                height: '70rem'
            }
        });
    }

    showColumns() {
        this.searchColumns = true;

        if (localStorage.getItem(LocalStorageVariables.workerSearchSelectedColList) != null) {
            this.targetTable = JSON.parse(localStorage.getItem(LocalStorageVariables.workerSearchSelectedColList) || '');
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
            this.cols = [...Setup_WorkerSearch_Main, ...this.targetTable];
            this.targetTable.forEach((data) => {
                this.sourceTable.push(data);
            });
            this.cols.push(...Action_All);
            localStorage.setItem(LocalStorageVariables.workerSearchColumns, JSON.stringify(this.cols));
            localStorage.setItem(LocalStorageVariables.workerSearchSelectedColList, JSON.stringify(this.targetTable));
            this.searchColumns = false;
            this.targetTable = [];
        } else {
            if (this.targetTable.length > 0) {
                this.targetTable.forEach((data) => {
                    this.sourceTable.push(data);
                });
            }
            this.cols;
            this.sourceTable = [...Setup_WorkerSearch];
            this.targetTable = [];
            // this.searchColumns = false;
            this.searchColsApply = true;
        }
    }

    isAdvanceSearchBtnEnabled() {
        if (
            this.isArrayNullandEmpty(this.clientaccountStatus) ||
            this.isArrayNullandEmpty(this.registeredBUStatus) ||
            this.isArrayNullandEmpty(this.LOBStatus) ||
            this.isArrayNullandEmpty(this.cesEesStatus) ||
            this.isArrayNullandEmpty(this.assignemnetStatus) ||
            this.isArrayNullandEmpty(this.approverStatus)
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

    private setWorkerSearchAdvancedSearchToLocalStorage() {
        let searchParam: any = {
            clientaccountStatus: this.clientaccountStatus,
            registeredBUStatus: this.registeredBUStatus,
            LOBStatus: this.LOBStatus,
            cesEesStatus: this.cesEesStatus,
            fliterByStatus: {
                assignemnetStatus: this.assignemnetStatus,
                approverStatus: this.approverStatus
            }
        };

        localStorage.setItem(LocalStorageVariables.workerSearchAdvancedSearchFilter, JSON.stringify(searchParam));
    }

    bindWorkerSearchFiltersFromLocalStorage() {
        if (localStorage.getItem(LocalStorageVariables.workerSearchAdvancedSearchFilter) != null) {
            let searchParam: any = JSON.parse(localStorage.getItem(LocalStorageVariables.workerSearchAdvancedSearchFilter) || '{}');

            this.dataTable = [];
            this.totalRecords = 0;

            if (searchParam.clientaccountStatus && searchParam.clientaccountStatus.length > 0) {
                this.clientaccountStatus = [];
                searchParam.clientaccountStatus.forEach((clientaccountStatus: any) => {
                    let selectedClientaccountStatus = this.ClientaccountList.filter((x) => x.id.toString().includes(clientaccountStatus.id.toString()));
                    if (selectedClientaccountStatus && selectedClientaccountStatus.length > 0) {
                        this.clientaccountStatus.push(...selectedClientaccountStatus);
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
            if (searchParam.LOBStatus && searchParam.LOBStatus.length > 0) {
                this.LOBStatus = [];
                searchParam.LOBStatus.forEach((LOBStatus: any) => {
                    let SelectedLOBStatus = this.LOBList.filter((x) => x.id.toString().includes(LOBStatus.id.toString()));
                    if (SelectedLOBStatus && SelectedLOBStatus.length > 0) {
                        this.LOBStatus.push(...SelectedLOBStatus);
                    }
                });
            }
            if (searchParam.cesEesStatus && searchParam.cesEesStatus.length > 0) {
                this.cesEesStatus = [];
                searchParam.cesEesStatus.forEach((cesEesStatus: any) => {
                    let selectedCesEesStatus = this.cesEesList.filter((x) => x.id.toString().includes(cesEesStatus.id.toString()));
                    if (selectedCesEesStatus && selectedCesEesStatus.length > 0) {
                        this.cesEesStatus.push(...selectedCesEesStatus);
                    }
                });
            }
            if (searchParam.fliterByStatus.assignemnetStatus && searchParam.fliterByStatus.assignemnetStatus.length > 0) {
                this.assignemnetStatus = [];
                searchParam.fliterByStatus.assignemnetStatus.forEach((assignemnetStatus: any) => {
                    let selectedAssignemnetStatus = this.AssignemnetList.filter((x) => x.id.toString().includes(assignemnetStatus.id.toString()));
                    if (selectedAssignemnetStatus && selectedAssignemnetStatus.length > 0) {
                        this.assignemnetStatus.push(...selectedAssignemnetStatus);
                    }
                });
            }
            if (searchParam.fliterByStatus.approverStatus && searchParam.fliterByStatus.approverStatus.length > 0) {
                this.approverStatus = [];
                searchParam.fliterByStatus.approverStatus.forEach((approverStatus: any) => {
                    let selectedApproverStatus = this.ApproverList.filter((x) => x.id.toString().includes(approverStatus.id.toString()));
                    if (selectedApproverStatus && selectedApproverStatus.length > 0) {
                        this.approverStatus.push(...selectedApproverStatus);
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
            }
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
    openPreviewOnAsgmtID(data: boolean, rowData: any) {
        if (data == true) {
            this.openPreviewDialog(rowData, 'workerSearch');
        }
    }

    openChangeRequest(rowData: any): void {
        this.route.navigate([CoreModulesUrl.WorkerSearch + '/' + CoreModulesUrl.ChangeRequest], { queryParams: { rowData: JSON.stringify(rowData) } });
    }

    ngOnDestroy() {
        this.filterSubscription?.unsubscribe();
    }
}
