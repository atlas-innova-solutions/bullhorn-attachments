import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LocalStorageVariables } from '../utils/local-storage-variable';
import { CoreModulesUrl } from '../utils/page-navigation-url';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //Use below code after Roles are added
        //if (!sessionStorage.getItem(LocalStorageVariables.currentUser)) {
        if (!sessionStorage.getItem(LocalStorageVariables.currentUser)) {
            // logged in so return true
            this.router.navigate([CoreModulesUrl.Login]);
            return false;
        }
        // not logged in so redirect to login page with the return url
        return true;
    }
}
