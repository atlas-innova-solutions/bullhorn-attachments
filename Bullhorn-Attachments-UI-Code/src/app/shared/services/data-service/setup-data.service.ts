import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserLoginDetails } from '../../models/user-login.model';
import { PlacementRepositoryDataTableSearchFilter } from '../../models/Data-Table/placement-repository-data-grid/pr-data-tbl-search-filter.model';
import { proxyUrls } from '../load-urls';
import { WorkerSeachDataTableFilter } from '../../models/Data-Table/worker-search-data-grid/ws-data-tbl-filter.model';
import { WorkerSearchDataResponse } from '../../models/Data-Table/worker-search-data-grid/ws-data-response.model';
import { PlacementReviewDataModel } from '../../models/review/placement-review-data.model';
import { PlacementRepositoryDataResponse } from '../../models/Data-Table/placement-repository-data-grid/pr-data-response.model';
import { EmploymentInfoModel } from '../../models/review/employment-info-data.model';
import { IDynamicFieldsResponse } from '../../models/dynamic-fields/dynamic-fields-get.model';
import { IDynamicFields } from '../../models/dynamic-fields/dynamic-fields.model';
import { IFinanceReviewReasons } from '../../models/static-models/interface/i-business-dropdown.model';

@Injectable({
    providedIn: 'root'
})
export class SetupDataService {
    backendLocalhost:string="http://localhost:8082/bh/ui/";
    private id = new BehaviorSubject('');
    getId = this.id.asObservable();

    constructor(private http: ApiService) {}

    setId(id: any) {
        this.id.next(id);
    }

    logout(userPrincipleName: any): Observable<any> {
        let serviceURL = proxyUrls.setupApis.setupLogout.replace('{{userPrincipleName}}', userPrincipleName);
        return this.http.Get$(serviceURL);
    }

    getLastLoginDetails(userPrincipleName: any): Observable<any> {
        let serviceURL = proxyUrls.setupApis.setupLastlogin.replace('{{userPrincipleName}}', userPrincipleName);
        return this.http.Get$(serviceURL);
    }

    setLoginDetails(uerData: any): Observable<any> {
        let serviceURL = proxyUrls.setupApis.setupLogin;
        return this.http.Post$<UserLoginDetails>(serviceURL, uerData);
    }

    getStatusHistoryByCaseId(caseId: any): Observable<any> {
        let serviceURL = proxyUrls.setupApis.setupStatusHistoryOfCase.replace('{{caseId}}', caseId);
        return this.http.Get$<any>(serviceURL);
    }

    placementRepoSearchData(payload: any, size: number, page: number, sortColumn: string = '', sortDirection = 0): Observable<PlacementRepositoryDataTableSearchFilter[]> {
        let sortOrder = sortDirection === 1 ? 'ASC' : sortDirection === -1 ? 'DESC' : '';

        let sortQueryUrl = sortColumn && sortColumn !== '' && sortDirection && sortDirection !== 0 ? `&order=${sortOrder}` + `&columnName=${sortColumn}` : '';

        const serviceURL = proxyUrls.setupApis.setupSearch + `?page=${page}` + `&size=${size}`;

        return this.http.Post$<PlacementRepositoryDataResponse>(serviceURL + sortQueryUrl, payload);
    }

    getWorkerData(size: any, page: any): Observable<any> {
        let serviceURL = proxyUrls.setupApis.setupWorkerSearch + `?page=${page}` + `&size=${size}`;
        return this.http.Get$<any>(serviceURL).pipe(map((data: any) => data.data));
    }
    workerSearchData(payload: any, size: number, page: number): Observable<WorkerSeachDataTableFilter[]> {
        const serviceURL = proxyUrls.setupApis.setupWorkerSearchData + `?page=${page}` + `&size=${size}`;
        return this.http.Post$<WorkerSearchDataResponse>(serviceURL, payload);
    }

    saveStatusChange(request: any): Observable<any> {
        let serviceURL = proxyUrls.setupApis.setupStatusHistorySave;
        return this.http.Post$<any>(serviceURL, request);
    }
    saveCancelChange(request: any): Observable<any> {
        let serviceURL = proxyUrls.setupApis.setupstatusHistorySaveForCancel;
        return this.http.Post$<any>(serviceURL, request);
    }

    statusChange(caseId: any, modifiedBy: any): Observable<any> {
        let serviceURL = proxyUrls.setupApis.setupStatusChangeForOpenToInreview.replace('{{caseId}}', caseId).replace('{{modifiedBy}}', modifiedBy);
        return this.http.Post$<any>(serviceURL, {});
    }

    exportData(payload: any, isworkersearch: boolean): Observable<any> {
        const serviceURL = isworkersearch ? proxyUrls.setupApis.setupworkerSearchDownloadWorkerSearch : proxyUrls.setupApis.setupPlacementDownload;
        const headers = new Headers();
        let options: any = {
            observe: 'response',
            responseType: 'blob',
            headers: headers
        };
        return this.http.Post$<any>(serviceURL, payload, options);
    }

    downloadFile(response: any, fileName: any) {
        const contentDispostion = response.headers.get('Content-Disposition');
        const fileNameMatch = contentDispostion && contentDispostion.match(/filename="(.+)"$/)[1];
        const filename = fileNameMatch ? fileNameMatch[1] : fileName;
        const blob = new Blob([response.body], { type: response.body.type });
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
    }

    getPlacementDetails(caseId: any): Observable<PlacementReviewDataModel> {
        const serviceURL = proxyUrls.setupApis.setupPlacementDetails.replace('{{caseId}}', caseId);
        return this.http.Get$<PlacementReviewDataModel>(serviceURL).pipe(map((data: any) => data.data));
    }

    getWorkerSearchPreviewDetails(assignmentId: any): Observable<PlacementReviewDataModel> {
        const serviceURL = proxyUrls.setupApis.setupEmplPreview.replace('{{assignmentId}}', assignmentId);
        return this.http.Get$<PlacementReviewDataModel>(serviceURL).pipe(map((data: any) => data.data));
    }

    getChangeHistoryByCaseId(caseId: any, placementId: any): Observable<any> {
        let serviceURL = proxyUrls.setupApis.setupAuditHistoryGet.replace('{{caseId}}', caseId).replace('{{placementId}}', placementId);
        return this.http.Get$<any>(serviceURL).pipe(map((data: any) => data.data));
    }

    getGoogleValidationAddress(address: string, assignmentId: any): Observable<any> {
        let serviceURL = proxyUrls.setupApis.sharedGeocoding.replace('{{address}}', address) + `&assignmentId=${assignmentId}`;
        return this.http.Get$<any>(serviceURL);
    }

    getEmploymentDashboardDetails(personId: any): Observable<EmploymentInfoModel> {
        const serviceURL = proxyUrls.setupApis.setupEmplDashboard.replace('{{personId}}', personId);
        return this.http.Get$<EmploymentInfoModel>(serviceURL).pipe(map((data: any) => data.data));
    }

    getFinanceReviewReasons(financeReviewStatusId: any): Observable<EmploymentInfoModel> {
        const serviceURL = proxyUrls.setupApis.financeStatusReason.replace('{{financeReviewStatusId}}', financeReviewStatusId);
        return this.http.Get$<IFinanceReviewReasons>(serviceURL).pipe(map((data: any) => data));
    }

    setupSaveOrReview(reviewData: any): Observable<any> {
        const serviceURL = proxyUrls.setupApis.setupSaveOrReview;
        return this.http.Post$<any>(serviceURL, reviewData);
    }

    setupSaveReviewChangeHistory(payload: any): Observable<any> {
        const serviceURL = proxyUrls.setupApis.setupAuditHistorySave;
        return this.http.Post$<any>(serviceURL, payload);
    }

    changeRequestType(request: any): Observable<any> {
        const serviceURL = proxyUrls.setupApis.setupFusionChangeRequest;
        return this.http.Post$<any>(serviceURL, request);
    }

    getchangeDetails(personNumber: any, effectiveDate: any, assignmentNumber: any): Observable<any> {
        const serviceURL = proxyUrls.setupApis.setupFusionEntryElementDetails.replace('{{personNumber}}', personNumber).replace('{{effectiveDate}}', effectiveDate).replace('{{assignmentNumber}}', assignmentNumber);
        return this.http.Get$<any>(serviceURL).pipe(map((data: any) => data));
    }
    customFieldSave(data: any) {
        const serviceURL = proxyUrls.setupApis.setupCustomFieldSave;
        return this.http.Post$<any>(serviceURL, data);
    }
    customFieldGet(data: any) {
        // const serviceURL = proxyUrls.setupApis.setupCustomFieldGet.replace('{{fusionCustomerId}}', fusionCustomerId);
        // return this.http.Get$<IDynamicFieldsResponse>(serviceURL);
        const serviceURL = proxyUrls.setupApis.setupCustomFieldGet;
        return this.http.Post$<IDynamicFieldsResponse>(serviceURL, data);
        
    }
    customFieldValueSave(data: any) {
        const serviceURL = proxyUrls.setupApis.setupCustomFieldValueSave;
        return this.http.Post$<any>(serviceURL, data);
    }
    customFieldValueGet(placementId: any) {
        const serviceURL = proxyUrls.setupApis.setupCustomFieldValueGet.replace('{{placementId}}', placementId);
        return this.http.Get$(serviceURL);
    }

    getCSFId(projectId: any) {
        const serviceURL = proxyUrls.setupApis.setupCsfIdGet.replace('{{projectId}}', projectId);
        return this.http.Get$(serviceURL);
    }

    validateExternalUser(jwt: any): Observable<any> {
        const tenantId = proxyUrls.appStaticProperties.authorityInnova;
        let payload: any = {
            clientId: proxyUrls.appStaticProperties.clientIdInnova, // client id of app registration - innova
            clientSecret: proxyUrls.appStaticProperties.clientSecretId, // client secret of app registration -
            scope: proxyUrls.appStaticProperties.scopeBackendtoken, // client id of backend api app registration /.default
            authorityInnova: tenantId // tenant id innova
        };

        const headers = new Headers();
        headers.append('externalUser', jwt);

        let options: any = {
            headers: headers
        };

        const serviceURL = proxyUrls.setupApis.setupVerify;
        return this.http.Post$<any>(serviceURL, payload, options);
    }

    getRolesByAppUserId(appUserId: any): Observable<any> {
        const serviceURL = proxyUrls.setupApis.getRolesByAppUserId.replace('{{appUserId}}', appUserId);
        return this.http.Get$<any>(serviceURL);
    }

    getBHSourceId(): Observable<any> {
        const serviceURL = '';
        return this.http.Get$<any>(serviceURL);
    }

    getAttachmentLIst(entityType:any,pageNumber:any , firstName: string, lastName: string, id: any): Observable<any> {debugger
        //const serviceURL = this.backendLocalhost+"bh/data/candidateBySourceIds/"+sourceId;
        firstName = firstName? 'fname=' + firstName + "&": '';
        lastName = lastName? 'lname=' + lastName + "&": '';
        id = id? 'id=' + id: '';
        let param = "?" + firstName + lastName + id;
        param = param? param : '';
         const serviceURL  = this.backendLocalhost+entityType+"/"+pageNumber + param ;
        return this.http.Get$<any>(serviceURL);
    }


    // getCandidateAttachmentList(entity:any,entityType:any,sourceId:any): Observable<any> {
    //     const serviceURL = this.backendLocalhost+"getAttachments/"+entity+"/"+entityType+"/"+sourceId;
    //     return this.http.Get$<any>(serviceURL);
    // }


    getCandidateFileAttachmentList(sourceId:any,entityTypeId:any,candidateId:any,userId:any): Observable<any> {
        const serviceURL = this.backendLocalhost+"getAttachments?sourceid="+sourceId+"&"+"entity="+entityTypeId+"&id="+
        candidateId+"&userId="+userId;
        return this.http.Get$<any>(serviceURL);
    }

    getAccessData(entity:any):Observable<any>{
        const serviceURL = this.backendLocalhost+"access?principalId="+entity;
        return this.http.Get$<any>(serviceURL);

    }

    getDownloadFileHistory(userId:any):Observable<any>{
        const serviceURL = this.backendLocalhost+userId;
        return this.http.Get$<any>(serviceURL);

    }

    addDownloadHistory(param: any):Observable<any>{
        const serviceURL = this.backendLocalhost+ 'addDownloadFile';
        return this.http.Post$<any>(serviceURL, param);

    }

    searchEntityList(entity:any, event:any):Observable<any>{
        const serviceURL = this.backendLocalhost+entity+"/"+event;
        return this.http.Get$<any>(serviceURL);
    }
}
