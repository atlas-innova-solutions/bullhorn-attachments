import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageVariables } from '../../utils/local-storage-variable';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private rmService = new BehaviorSubject<boolean>(false);
    RMInfo = this.rmService.asObservable();
    private authDetailService = new BehaviorSubject<boolean>(false);
    private masterDataServicesFlg = new BehaviorSubject<any>(false);
    private idleTimeFlgService=new BehaviorSubject<any>(false);
    idleTimeFlg=this.idleTimeFlgService.asObservable();
    private rolebasedAttributeService = new BehaviorSubject<any>({});
    roleAttributes = this.rolebasedAttributeService.asObservable();
    userPermissionDetails = new BehaviorSubject<any>('');

    constructor() {}
    setResourceManagers(data: any) {
        this.rmService.next(data);
    }
    setUserAuthDetails(data: any) {
        this.authDetailService.next(data);
    }

    getUserAuthDetails(): any {
        return this.authDetailService.value;
    }
    setMasterDataServicesFlg(data: {}) {
        this.masterDataServicesFlg.next(data);
    }

    getMasterDataServicesFlg() {
        return this.masterDataServicesFlg.value;
    }

    setIdleTimeFlgService(data: any) {
        this.idleTimeFlgService.next(data);
    }

    setUserRoleAttributes(data: any) {
        this.rolebasedAttributeService.next(data);
    }

    setuserPermissionDetails(data: any) {
        localStorage.setItem(LocalStorageVariables.userPermission, JSON.stringify(data));
        this.userPermissionDetails.next(data);
    }
}
