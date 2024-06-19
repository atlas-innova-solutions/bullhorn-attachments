import { Injectable } from '@angular/core';
import { LocalStorageVariables } from '../../utils/local-storage-variable';

@Injectable({
    providedIn: 'root'
})
export class CookiesService {
    constructor() {}

    setCAFToken(token: any, callback: any) {
        localStorage.setItem(LocalStorageVariables.token, token);
        if (callback) {
            callback();
        }
    }
    getCAFToken(): string {
        let token: any = localStorage.getItem(LocalStorageVariables.token);
        return token;
    }
    getCAFUser() {
        let user: any = localStorage.getItem(LocalStorageVariables.currentUser);
        if (user) {
            return JSON.parse(user);
        } else {
            return null;
        }
    }
    setCAFUser(UserData: any) {
        localStorage.setItem(LocalStorageVariables.currentUser, JSON.stringify(UserData));
    }
    clearAllCookies() {
        localStorage.clear();
    }
    setCAFStorage(key: string, value: any) {
        localStorage.setItem(key, value);
    }
    getCAFStorage(key: string): any {
        return localStorage.getItem(key);
    }
}
