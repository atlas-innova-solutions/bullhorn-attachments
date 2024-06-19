import { StaticApiRes } from './../utils/static-initial-api';
import { staticApis } from '../utils/static-initial-api';
import { forkJoin, catchError, of, ReplaySubject } from 'rxjs';
import { ApiService } from './api-service/api.service';
import { Injectable } from '@angular/core';
import { LocalStorageVariables } from '../utils/local-storage-variable';

@Injectable({
    providedIn: 'root'
})
export class LoadStaticDataService {
    constructor(private api: ApiService) {}
    init() {
        const currentUser: any = JSON.parse(sessionStorage.getItem(LocalStorageVariables.currentUser) || '{}');
        const appUserId: any = currentUser.appUserId;
        const apiObject = Object.entries(staticApis).reduce((prev, [key, value]) => {
            return { ...prev, [key]: this.api.Get$(value.replace('{{appUserId}}', appUserId).replace('{{workerId}}', appUserId)).pipe(catchError((err) => of({}))) };
        }, {});
        forkJoin(apiObject).subscribe({
            next(res: StaticApiRes) {
                console.log('response:', res);
                StaticData.next(res);
            }
        });
    }
}
export const StaticData = new ReplaySubject<StaticApiRes>();
