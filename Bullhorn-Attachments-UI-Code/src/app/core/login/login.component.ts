import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DynamicDialogRef } from 'primeng/dynamicdialog/dynamicdialog-ref';
import { AuthenticationService } from '../../shared/guards/authentication.service';
import { AppUserRole } from '../../shared/models/app-user-role.model';
import { AppUser } from '../../shared/models/app-user.model';
import { CAFEnvironmentConfigurationModel } from '../../shared/models/caf-environment-configuration-model.model';
import { loginDetails } from '../../shared/modules/app.configModule';
import { CafRoleConfigService } from '../../shared/services/caf-role-config.service';
import { LoadStaticDataService } from '../../shared/services/load-static-data.service';
import { ResponseManagerService } from '../../shared/services/response-manager.service';
import { SharedService } from '../../shared/services/shared-service/shared.service';
import { FilePath } from '../../shared/utils/file-path';
import { LOGIN_CONST } from '../../shared/utils/lable-text-constant';
import { LocalStorageVariables } from '../../shared/utils/local-storage-variable';
import { LangModel } from '../../shared/models/LanguageModel';
import * as LangData from '../../../assets/i18n/Languages.json';
import * as RoleAttributeData from '../../../assets/msal/test-role-attribute-data/role-attribute-data.json';
import { LangTranslateService } from '../../shared/services/Lang-translate-service/lang-translate.service';
import { roles } from '../../shared/utils/user.roles';
import { LoadMsalConfigService } from '../../shared/services/msal-config.service';
import { CoreModulesUrl } from '../../shared/utils/page-navigation-url';
import { SetupDataService } from '../../shared/services/data-service/setup-data.service';
import { UserLoginDetails } from '../../shared/models/user-login.model';
import { IdleTimeoutService } from '../../shared/services/idle-timeout/idle-timeout.service';
declare const signIn: any;
declare const authenticated: any;
declare const user: any;
const userRoles = roles;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: []
})
export class LoginComponent implements OnInit {
    readonly loginLabels: any = LOGIN_CONST;
    displaySessionExpired!: boolean;
    LoginCompLables: any;
    pageTitle!: string;
    imageName!: string;
    errorMsg: string = '';
    userData: any;
    azureRoles: any[] = [];
    selectedAzureRole: any;
    employeeDetails: any;
    msalConfigs: any = {};
    public errorMsgFlg: boolean = false;
    timeOutFlag: boolean = false;
    countryList: Array<any> = new Array();
    authenticateStatus: boolean = false;
    authorizeStatus: boolean = false;
    appUserModel: AppUser = new AppUser();
    userLoginDetails: UserLoginDetails = new UserLoginDetails();
    intEmpId: any;
    timer: any;
    casesServiceSubScribeObj: any;
    workerSearchtimer: any;
    private bsModalRef!: DynamicDialogRef;
    cafEnvironmentConfigurationModel!: CAFEnvironmentConfigurationModel;
    LanguageList: any;
    selectedLang: any;
    lineImg: string = FilePath.LineLogo;

    //changes for access 
    userId: any = 1;
    principalMail: any = '';
    UserName: any = '';
    isActive: any = '';

    constructor(
        private loginService: AuthenticationService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private sharedService: SharedService,
        private cafRolesConfigService: CafRoleConfigService,
        private cdr: ChangeDetectorRef,
        private loadStaticDataService: LoadStaticDataService,
        private responseManagerService: ResponseManagerService,
        private translateService: LangTranslateService,
        private MSALConfigService: LoadMsalConfigService,
        private SetupDataService: SetupDataService,
        private idleTimeService: IdleTimeoutService
    ) { }

    ngOnInit() {
        this.LoginCompLables = this.loginLabels['key'];
        this.timer = sessionStorage.getItem(LocalStorageVariables.timer);
        this.workerSearchtimer = sessionStorage.getItem(LocalStorageVariables.workerSearchtimer);
        if (this.timeOutFlag) {
            this.openTimeOutPopup();
        }
        if (this.timer || this.workerSearchtimer) {
            this.cancelTimer();
        }
        this.pageTitle = loginDetails[loginDetails.project].pagetitle;
        this.imageName = FilePath.ImageBaseUrl + loginDetails[loginDetails.project].imagename;
        this.sharedService.setMasterDataServicesFlg(false);
        this.loadData();
    }
    openTimeOutPopup() {
        this.cancelTimer();
        setTimeout(() => {
            this.displaySessionExpired = true;
        }, 2000);
    }

    initloginProcess(domain: string) {
        if (domain == 'Innova') {
            this.loadmsalInnovaConfigurations();
            setTimeout(() => {
                this.signIn();
            }, 1000);
        } else {
            this.loadmsalVoltConfigurations();
            setTimeout(() => {
                this.signIn();
            }, 1000);
        }
    }

    loadmsalInnovaConfigurations() {
        const config = this.MSALConfigService.getInnovaConfig();
        sessionStorage.setItem('SSOSource', 'INNOVA');
        this.MSALConfigService.loadMsalConfigurations(config);
        signIn();
    }

    loadmsalVoltConfigurations() {
        const config = this.MSALConfigService.getVoltConfig();
        sessionStorage.setItem('SSOSource', 'VOLT');
        this.MSALConfigService.loadMsalConfigurations(config);
        signIn();
    }

    setLoginDetails() {
        this.spinner.show();
        this.azureRoles = [];
        let userInfo: any = sessionStorage.getItem('userInformationData');
        userInfo = JSON.parse(userInfo);
        let text = userInfo.displayName;
        const userName = text.split(', ');
        this.userLoginDetails.userPrincipleName = userInfo.userPrincipalName;
        this.userLoginDetails.firstName = userName[1];
        this.userLoginDetails.lastName = userName[0];
        this.userLoginDetails.employeeId = userInfo.employeeId;
        this.userLoginDetails.logInTimeZone = new Date().toISOString();

        this.SetupDataService.setLoginDetails(this.userLoginDetails).subscribe(
            (res: any) => {
                let currentUser: any = {
                    appUserId: res.appUserId,
                    appUserName: res.appUserName
                };

                sessionStorage.setItem(LocalStorageVariables.currentUser, JSON.stringify(currentUser));
                this.getUserPermission();
            },
            (err: any) => {
                this.spinner.hide();
                this.cdr.detectChanges();
                this.errorMsg = 'Something went wrong. Please try again.';
            }
        );
    }

    async signIn(): Promise<void> {
        this.spinner.show();
        await signIn();
        await this.authenticated();
        if (!this.authenticated()) {
            this.errorMsg = 'Something went wrong. Please try again.';
            this.spinner.hide();
            this.errorMsgFlg = true;
            this.cdr.detectChanges();
            return;
        }
        this.cdr.detectChanges();
        if (!!this.authenticated()) {
            debugger;
            const userInformationData: any = sessionStorage.getItem(LocalStorageVariables.UserInformationData);
            this.userData = JSON.parse(userInformationData);
            this.principalMail = this.userData.userPrincipalName;
            console.log("principle mail",this.principalMail);
            if (!this.userData) {
                this.errorMsg = this.LoginCompLables.unauthorized;
                this.spinner.hide();
                this.errorMsgFlg = true;
                this.cdr.detectChanges();
                return;
            }
            console.log(this.userData);
            sessionStorage.setItem('sessionExp', '');
            sessionStorage.setItem('isLoggedOut', '');
            this.cdr.detectChanges();
            // Remove this line afterwards //
            this.setLoginDetails();
            //this.router.navigate(['/access']);
        } else {
            this.spinner.hide();
            this.cdr.detectChanges();
        }
    }

    // check if user logged in
    async authenticated(): Promise<any> {
        return authenticated; //this.authService.authenticated;
    }
    // returns user informations
    get user(): any {
        return user;
    }

    loadData() {
        this.LanguageList = (LangData.Languages as any[]).map((item: any) => ({
            label: item.name,
            command: (event: any) => {
                this.changeLanguage(event);
            }
        }));
    }

    changeLanguage(event: any): void {
        this.selectedLang = event.item.label;
        if (LangModel == null || undefined) {
            this.translateService.changeLanguage('English');
        } else {
            this.translateService.changeLanguage(this.selectedLang);
        }
        localStorage.setItem('selectedLanguage', this.selectedLang);
    }

    cancelTimer(): void {
        clearTimeout(this.timer);
        clearInterval(this.timer);
        clearTimeout(this.workerSearchtimer);
        clearInterval(this.workerSearchtimer);
    }

    getUserPermission() {
        this.spinner.show();
        this.SetupDataService.getAccessData(this.principalMail).subscribe((res: any) => {
            if (res) {
                this.sharedService.setuserPermissionDetails(res);
                console.log('this is the source id response', res);
                this.router.navigate(['/home']);
                this.spinner.hide();
            } else {
                this.errorMsg = this.LoginCompLables.unauthorized;
                this.spinner.hide();
                this.errorMsgFlg = true;
                this.cdr.detectChanges();
                return;
            }
        }, err => {
            this.errorMsg = this.LoginCompLables.unauthorized;
            this.spinner.hide();
            this.errorMsgFlg = true;
            this.cdr.detectChanges();
            return;
        })
    }
}
