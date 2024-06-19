import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppUser } from '../models/app-user.model';

@Injectable({
    providedIn: 'root'
})
export class ResponseManagerService {
    appUserModel!: AppUser;
    timer: any;
    responseList: any = [];
    isServiceFailed: number = 0;
    numberOfFuncCall: number = 0;
    isSaveClicked: boolean = false;
    saveServiceResponse: any = [];
    // detailCompObj: CafDetailComponent;
    cafAssignmentInitiationFlg: boolean = false;
    acsTeamInfoSaveFlg: boolean = false;
    constructor(
        // public toastr: ToastsManager,
        private spinnerService: NgxSpinnerService
    ) {}

    initializeResponseManagerServiceDetails() {
        this.isSaveClicked = true;
        //this.responseManagerService.detailCompObj=this;
        this.spinnerService.show();
        this.numberOfFuncCall = 0;
        this.isServiceFailed = 0;
        this.saveServiceResponse = [];
        this.responseList = [];
    }

    /***************************PLEASE DONT MAKE ANY CHANGES IN THIS FILE*************************************/
    cancelTimer() {
        clearTimeout(this.timer);
        clearInterval(this.timer);
    }
    // saveServicesResponse(key: string, data: boolean) {
    //     //console.log('Number of Function Call = ',this.numberOfFuncCall);
    //     //console.log("service  ", key)
    //     this.saveServiceResponse.push({ Service: key, Response: data });
    //     this.cancelTimer();
    //     this.responseList.push(data);
    //     //console.log('this is the response from all services', this.saveServiceResponse);
    //     if (this.responseList.includes(false)) {
    //         this.isServiceFailed++;
    //     }
    //     if (this.isServiceFailed == 1) {
    //         this.isSaveClicked = false;
    //         this.spinnerService.hide();
    //         if (this.cafAssignmentInitiationFlg) {
    //             // this.toastr.error('Review Completion Failed', 'Failed!');
    //         } else {
    //             // this.toastr.error("CAF data save failed", "Failed");
    //         }
    //         this.cafAssignmentInitiationFlg = false;
    //         this.cancelTimer();
    //     } else if (this.isServiceFailed == 0) {
    //         this.spinnerService.show();
    //         this.timer = setInterval(() => {
    //             if (this.numberOfFuncCall == this.responseList.length) {
    //                 var beforeSave = this.numberOfFuncCall;
    //                 this.responseList = [];
    //                 this.numberOfFuncCall = 0;
    //                 this.saveServiceResponse = [];
    //                 this.isSaveClicked = false;
    //                 this.spinnerService.hide();
    //                 if (this.appUserModel.appUserRoleModel.appRoleId == 2 && beforeSave == 1) {
    //                     //this.detailCompObj.updateCafListDataModel();
    //                     //this.detailCompObj.workerlkupNValidationsMsg=" Worker lookup and Validations has been successfully completed. Click on 'Validate Worker' in case you wish to perform worker linkage again.";
    //                 }
    //                 if (!this.cafAssignmentInitiationFlg && beforeSave > 1) {
    //                     //this.detailCompObj.updateCafListDataModel();
    //                     // this.toastr.success('CAF data successfully saved', 'Success!');

    //                     if (this.appUserModel.appUserRoleModel.appRoleId == 2) {
    //                         // this.detailCompObj.reloadDetailScreenForOnboarding();
    //                     } else {
    //                         // this.detailCompObj.reloadDetailScreen();
    //                     }
    //                     if (this.appUserModel.appUserRoleModel.appRoleId == 2) {
    //                         //this.detailCompObj.updateCafListDataModel();
    //                         // this.detailCompObj.workerlkupNValidationsMsg=" Worker lookup and Validations has been successfully completed. Click on 'Validate Worker' in case you wish to perform worker linkage again.";
    //                         //this.toastr.success('Worker lookup and Validations has been successfully completed. Click on "Validate Worker" in case you wish to perform worker linkage again.', 'Success!');
    //                         if (this.acsTeamInfoSaveFlg) {
    //                             //this.toastr.success('Onboarding Specailist of ACS Team Information has been updated', 'Success!');
    //                             this.acsTeamInfoSaveFlg = false;
    //                         }
    //                     }
    //                 }
    //                 if (this.cafAssignmentInitiationFlg) {
    //                     //this.detailCompObj.updateCafListDataModel();
    //                     // this.detailCompObj.startAssignmentInitation();
    //                 }
    //                 this.cafAssignmentInitiationFlg = false;
    //                 this.cancelTimer();
    //             } else {
    //                 // this.spinnerService.hide();
    //             }
    //         }, 200);
    //     }
    // }
}
