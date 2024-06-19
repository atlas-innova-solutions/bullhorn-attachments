import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CafDataService {
    lookupRecords: any[] = [];
    constructor(private http: ApiService) {}

    getPlacementData(): Observable<any> {
        const url = 'https://ol-npsitsetupportalsvcsftr.innovasolutions.com:12000/setup/setup/placements';
        return this.http.Get$(url);
    }
}
