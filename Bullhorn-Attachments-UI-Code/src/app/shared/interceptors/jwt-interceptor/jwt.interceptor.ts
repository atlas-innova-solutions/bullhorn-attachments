import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageVariables } from '../../utils/local-storage-variable';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string = sessionStorage[LocalStorageVariables.ApiAccessToken];
        let ssoSource: string = sessionStorage[LocalStorageVariables.SSOSource];

        const externalUserToken: any = req.headers.get('externalUser');

        if (externalUserToken) {
            token = externalUserToken;
        }

        if (!token) {
            return next.handle(req);
        }

        const req1 = req.clone({
            headers: req.headers.set('Content-Type', 'application/json;').set('Authorization', token).set('SSOSource', ssoSource)
        });

        if (externalUserToken) {
            req.headers.delete('externalUser');
        }

        return next.handle(req1).pipe(
            catchError((error: HttpErrorResponse) => {
                console.info('service error');
                return throwError(() => new Error(error.message));
            })
        );
    }
}
