import { LoadStaticDataService } from './../../shared/services/load-static-data.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { LangTranslateService } from '../../shared/services/Lang-translate-service/lang-translate.service';
import { SharedService } from '../../shared/services/shared-service/shared.service';
import * as RoleAttributeData from '../../../assets/msal/test-role-attribute-data/role-attribute-data.json';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    headerMessage: string = 'Confirmation';
    okLabelText: string = 'Yes';
    cancelLableText: string = 'No';
    key: string = '';

    constructor(
        private confirmationService: ConfirmationService,
        private translateService: LangTranslateService,
        private loadStaticDataService: LoadStaticDataService,
        private sharedService: SharedService
    ) {}

    ngOnInit(): void {
        const selectedLang = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'English';
        this.translateService.changeLanguage(selectedLang);
        this.loadStaticDataService.init();
        this.sharedService.setUserRoleAttributes(RoleAttributeData as any);
    }

    confirm() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {},
            reject: (type: any) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        break;
                    case ConfirmEventType.CANCEL:
                        break;
                }
            },
            key: this.key
        });
    }

    alert(): string {
       return  'welcome'
    }
}
