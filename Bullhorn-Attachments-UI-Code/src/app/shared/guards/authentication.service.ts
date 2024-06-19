import { proxyUrls } from './../services/load-urls';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { LocalStorageVariables } from '../utils/local-storage-variable';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    isloggedIn = false;
    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        const body: any = {
            userId: username,
            password: password,
            domainName: 'ACS'
        };
        const jsonData: any = JSON.stringify(body);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers };
        const url = 'https://oci-qalogin1.acsicorp.com/ldaploginService/authenticate';
        return this.http.post(url, jsonData, options);
    }

    logLoginDetail(currentUser: any): Observable<any> {
        const body = {
            userPrincipleName: currentUser.userPrincipalName,
            firstName: currentUser.givenName,
            lastName: currentUser.surname,
            employeeId: currentUser.employeeId,
            loginTimeZone: new Date().toISOString()
        };

        const jsonData: any = JSON.stringify(body);
        const url = 'https://ol-npsitsetupportalsvcsftr.innovasolutions.com:12000/setup/setup/login';
        return this.http.post(url, jsonData);
    }

    updateLoginTime(appUserId: any) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers };
        const url = proxyUrls.readServices.userLoginDetails.replace('{{appUserId}}', appUserId).replace('{{activity}}', 'login');
        return this.http.post(url, {}, options);
    }
    updateLogoutTime(appUserId: any) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers };
        const url = proxyUrls.readServices.userLoginDetails.replace('{{appUserId}}', appUserId).replace('{{activity}}', 'logout');
        return this.http.post(url, {}, options);
    }

    isUserLoggedIn(): boolean {
        if (sessionStorage.getItem(LocalStorageVariables.isLogin)) {
            return (this.isloggedIn = true);
        } else {
            return false;
        }
    }

    checkAuthorization() {
        let url = 'https://oci-trun-poc1.acsicorp.com/services/shared/services/caf/v21/app/CAF/user/trqa11';
        // let authorizationURL=(proxyUrls.readServices.authorizationRead.replace('{{userName}}',userId));
        return this.http.get(url).pipe(retry(1));
    }

    getEmployeeDetails(employeeId: string) {
        const url = proxyUrls.odsCoreServices.userDetails.replace('{{employeeid}}', employeeId);
        return this.http.get(url).pipe(retry(5));
    }
}
