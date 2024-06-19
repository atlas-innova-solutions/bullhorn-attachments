import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { SetupDataService } from '../../shared/services/data-service/setup-data.service';
import { LoadStaticDataService } from '../../shared/services/load-static-data.service';

@Component({
    selector: 'app-customer-custom-dashboard',
    templateUrl: './customer-custom-dashboard.component.html',
    styleUrl: './customer-custom-dashboard.component.scss'
})
export class CustomerCustomDashboardComponent implements OnInit {
    entityId: any = '';
    jwt: any;
    companyId: any;
    isAuthenticated: boolean = false;
    messages!: Message[];

    constructor(
        private SetupDataService: SetupDataService,
        private route: ActivatedRoute,
        private loadStaticDataService: LoadStaticDataService
    ) {}

    ngOnInit(): void {
        //this.jwt = this.route.snapshot.paramMap.get('token');
        this.route.queryParamMap.subscribe((params: any) => {
            if (params.params) {
                this.entityId = params?.params?.placementid;
                this.jwt = params?.params?.jwt;
                this.companyId = params?.params?.companyid;
            }
            this.validateUser();
        });
    }

    validateUser() {
        sessionStorage.setItem('SSOSource', 'Innova');
        this.SetupDataService.validateExternalUser(this.jwt).subscribe((res) => {
            console.log(res);
            this.isAuthenticated = true;
            sessionStorage.setItem('apiAccessToken', res?.authToken);
            this.loadStaticDataService.init();
        },
        (err: any) => {
          this.isAuthenticated = false;
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'You are not authorized to access this page. Please connect with support team.' }];
        });
    }
}
