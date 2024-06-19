import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {}

    Get$<T>(url: string, params?: any): Observable<any> {
        let finalUrl = url;
        return this.http.get<any>(finalUrl, params).pipe(
            map((response) => {
                return response;
            })
        );
    }
    Post$<T>(url: string, data: any, params?: any): Observable<any> {
        let finalUrl = url;
        return this.http.post<any>(finalUrl, data, params).pipe(
            map((response) => {
                return response;
            })
        );
    }
    Put$(url: string, data: any, params?: any): Observable<any> {
        let finalUrl = url;
        return this.http.put<any>(finalUrl, data, params).pipe(
            map((response) => {
                return response;
            })
        );
    }
    Delete$(url: string): Observable<any> {
        let finalUrl = url;
        return this.http.delete(`${finalUrl}`);
    }
}
