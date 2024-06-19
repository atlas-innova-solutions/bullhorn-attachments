import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ChildModuleUrl } from '../../utils/page-navigation-url';
import { AlertService } from '../alert-service/alert.service';

@Injectable({
    providedIn: 'root'
})
export class ResponseManagerService {
    isSaveForReview: boolean = false;
    staticApiCalled: boolean = false;
    activeCalls = {};
    failedCalls = {};
    activeCount: number = 0;
    failedCount: number = 0;
    initiateAssignmentSubject = new Subject();
    private _loaderReq: boolean = true;
    set loaderReq(val: boolean) {
        this._loaderReq = val;
    }
    get loaderReq() {
        return this._loaderReq;
    }
    constructor(
        private router: Router,
        private alertService: AlertService
    ) {}

    checkApiCallForReview(review: any) {
        if (this.isSaveForReview && this.router.url.includes(ChildModuleUrl.CafDetails)) {
            this.activeCount++;
        }
    }
    checkSuccessServiceForReview(request: any) {
        if (this.activeCount && this.router.url.includes(ChildModuleUrl.CafDetails)) {
            this.activeCount--;
            console.log(this.activeCount, this.isSaveForReview, this.failedCount);
            if (!this.isSaveForReview && !this.activeCount) {
                if (!this.failedCount) {
                    this.alertService.successAlert('CAF data successfully saved.');
                    this.initiateAssignmentSubject.next(true);
                } else {
                    this.alertService.errorAlert('CAF save data failed.');
                }
            }
        }
    }
    checkFailedServiceForReview(request: any) {
        if (this.activeCount && this.router.url.includes(ChildModuleUrl.CafDetails)) {
            this.failedCount++;
        }
    }
}
