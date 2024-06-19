import { ResponseManagerService } from './../../services/response-manager/response-manager.service';
import { proxyUrls } from './../../services/load-urls';
import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, finalize, from, defer, switchMap, delay } from 'rxjs';
import { LocalStorageVariables } from '../../utils/local-storage-variable';
import { LoadMsalConfigService } from '../../services/msal-config.service';
import { Router } from '@angular/router';
declare const getAccessTokenForBackendApi: any;
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private spinner: NgxSpinnerService,
        private responseManagerService: ResponseManagerService,
        private msalConfigService: LoadMsalConfigService,
        private router: Router
    ) {}
    activeApi: any[] = [];

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.responseManagerService.loaderReq) {
            this.spinner.show();
        }
        if (proxyUrls) {
            //const nonStaticExclusions = [proxyUrls.authServices?.customers, proxyUrls.authServices?.referrals, proxyUrls.readServices?.workerRead, proxyUrls.readServices?.cutomerContactRead];
            //const exclusions = [...Object.values(proxyUrls.staticServices), ...nonStaticExclusions].map((elem) => {
            // return elem.split('?')[0];
            //});
            // if (!exclusions.includes(request.url.split('?')[0])) {
            //     this.activeApi.push(request.url);
            // }
        }
        this.responseManagerService.checkApiCallForReview(request);
        return next.handle(request).pipe(
            finalize(() => {
                this.responseManagerService.loaderReq = true;
                this.activeApi = this.activeApi.filter((elem) => {
                    return elem != request.url;
                });
                if (!this.activeApi.length) this.spinner.hide();
                this.responseManagerService.checkSuccessServiceForReview(request);
            }),
            catchError((error: HttpErrorResponse) => {
                this.responseManagerService.loaderReq = true;
                if (error.status == 401) {
                    console.log('Unauthorized');
                    const getMsalConfig = sessionStorage.getItem('savedMsalConfig');
                    if (getMsalConfig) {
                        const msalConfigData = JSON.parse(getMsalConfig);
                        this.msalConfigService.loadMsalConfigurations(msalConfigData);
                    } else {
                        sessionStorage.clear();
                        this.router.navigate(['/login']);
                    }
                    return from(this.tokenHandler(request, next)).pipe(
                        delay(2000),
                        switchMap(() => {
                            const token = sessionStorage[LocalStorageVariables.ApiAccessToken];
                            const ssoSource = sessionStorage[LocalStorageVariables.SSOSource];
                            const req = request.clone({
                                headers: request.headers.set('Content-Type', 'application/json;').set('Authorization', `${token}`).set('SSOSource', `${ssoSource}`)
                            });
                            return next.handle(req);
                        })
                    );
                }
                this.responseManagerService.checkFailedServiceForReview(request);
                return throwError(() => new Error(error.message));
            })
        );
    }
    private async tokenHandler(request: HttpRequest<any>, next: HttpHandler): Promise<any> {
        await getAccessTokenForBackendApi('refresh');
    }

    private async refreshToken(): Promise<any> {
        return await getAccessTokenForBackendApi('refresh');
    }
}
