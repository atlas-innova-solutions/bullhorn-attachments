import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../guards/authentication.service';
import { FilePath } from '../utils/file-path';
import { LocalStorageVariables } from '../utils/local-storage-variable';
import { SetupDataService } from '../services/data-service/setup-data.service';
import { DateFormatService } from '../services/date-format/date-format-service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [TitleCasePipe]
})
export class HeaderComponent implements OnInit {
    // items!: MenuItem[];
    currentUser: any;
    roleName: any;
    role!: string;
    appUserId: any;
    firstName: string = '';
    lastName: string = '';
    lastLogin: any;
    lastLoginDetails: any;
    fullName: any = [];

    constructor(
        private titlecase: TitleCasePipe,
        private router: Router,
        private authService: AuthenticationService,
        private setupDataService: SetupDataService,
        private dateFormatService: DateFormatService
    ) {}
    homeLogo: string = FilePath.HeaderLogo;

    ngOnInit(): void {
        this.currentUser = JSON.parse(sessionStorage.getItem(LocalStorageVariables.UserInformationData) || '{}');
        this.roleName = JSON.parse(sessionStorage.getItem(LocalStorageVariables.authDetails) || '{}');
        this.fullName = this.currentUser.displayName.split(", ");
        this.firstName = this.fullName[0] ? this.fullName[0].charAt(0) : '';
        this.lastName = this.fullName[1] ? this.fullName[1].charAt(0) : '';
        this.getLastLoginDetails();

        // this.role = this.roleName.appUser.appRoles[0].appRoleName;
        // this.role = this.titlecase.transform(this.role);
        // this.appUserId = this.roleName.appUser.appUserId;
    }
    logout() {
        this.setupDataService.logout(this.currentUser.userPrincipalName).subscribe(
            (response: any) => {
                console.log('logout time', response);
                window.location.reload();
            },
            (err: any) => {
                window.location.reload();
            }
        );
        sessionStorage.removeItem(LocalStorageVariables.currentUser);
        localStorage.clear();
    }

    getLastLoginDetails() {
        this.setupDataService.getLastLoginDetails(this.currentUser.userPrincipalName).subscribe((res: any) => {
            console.log('Last Login Details', res);
            this.lastLoginDetails = res;
            this.lastLogin = this.dateFormatService.getCurrentDateTimeByUTC(this.lastLoginDetails.lastloginTime);
            const timezone=this.dateFormatService.getLocalTimeZone();
            this.lastLogin=this.lastLogin?(this.lastLogin+' '+timezone):'';
        });
    }

    getRoleName(roleName: string) {
        if (roleName == 'Resource Manager') {
            return 'CES/Setup Team';
        } else {
            return roleName;
        }
    }
}
