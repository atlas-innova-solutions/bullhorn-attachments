import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SharedService } from '../../services/shared-service/shared.service';
import { CoreModulesUrl } from '../../utils/page-navigation-url';
import { MenuItem } from 'primeng/api';
import { LangTranslateService } from '../../services/Lang-translate-service/lang-translate.service';
import { Location } from '@angular/common';
import { SetupDataService } from '../../services/data-service/setup-data.service';
import { SetupUserRole } from '../../models/user-role-attributes/role.model';
import { Navigation } from '../../models/user-role-attributes/naviagtion.model';
import { LocalStorageVariables } from '../../utils/local-storage-variable';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    display: any;
    breadcrumCaption: string = CoreModulesUrl.Home;

    userDetails: any;
    appRoleId: any;
    appUserId: any;
    appRoleName: any;
    items: any[] = [];
    menuItems: any[] = [];
    personId: any;

    ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';

    roleAttributes!: SetupUserRole;
    navigations!: Navigation[] | undefined | null;

    constructor(
        private router: Router,
        private sharedService: SharedService,
        private activatedRoute: ActivatedRoute,
        private translateService: LangTranslateService,
        private _location: Location,
        private SetupDataService: SetupDataService
    ) {
        this.SetupDataService.getId.subscribe((res) => {
            this.personId = res;
        });
    }
    ngOnInit(): void {
        const selectedLang = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'English';
        this.translateService.changeLanguage(selectedLang);

        this.items = [
            // {
            //     label: "menuItem.dashboard",
            //     icon: '',
            //     url: CoreModulesUrl.Home
            // },
            {
                label: 'menuItem.placement_repo',
                icon: '',
                url: CoreModulesUrl.PlacementRepository
            }
        ];

        this.sharedService.roleAttributes.subscribe((data) => {
            this.roleAttributes = data;
        });

        if (this.roleAttributes && this.roleAttributes.roles && this.roleAttributes.roles.length > 0) {
            const selectedRole = JSON.parse(sessionStorage.getItem(LocalStorageVariables.appUserRole) || '{}');
            if (selectedRole) {
                const role = this.roleAttributes.roles.find((r) => r.roleId == selectedRole.roleId);
                this.navigations = role?.navigations;

                this.getAllMenuItems();
            }
        }

        if (localStorage.getItem('items') == null) {
            localStorage.setItem('items', JSON.stringify(this.items));
        }

        this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
            this.items = this.createBreadcrumbs(this.activatedRoute.root);
            this.items = [...this.items];
            localStorage.setItem('items', JSON.stringify(this.items));
        });
        let url: any = JSON.parse(localStorage.getItem('items') || '[]');
        this.items = [...url];
    }
    getAllMenuItems() {
        // this.menuItems = [
        //     // {
        //     //     label: "menuItem.dashboard",
        //     //     icon: 'pi pi-th-large',
        //     //     pageURL: CoreModulesUrl.Home
        //     // },
        //     {
        //         label: "menuItem.placement_repo",
        //         icon: 'pi pi-table',
        //         pageURL: CoreModulesUrl.PlacementRepository
        //     },
        //     {
        //         label: "menuItem.worker_search",
        //         icon: 'pi pi-server',
        //         pageURL: CoreModulesUrl.WorkerSearch
        //     },

        //       {
        //         label: "Admin",
        //         icon: 'pi pi-credit-card',
        //         pageURL: CoreModulesUrl.adminConfiguaration
        //     }
        // ];

        if (this.navigations && this.navigations.length > 0) {
            this.navigations.sort((a: Navigation, b: Navigation) => {
                return a.navigationId < b.navigationId ? -1 : 1;
            });

            this.menuItems = [];

            this.navigations.forEach((nav: Navigation) => {
                if (nav.isAccessible) {
                    this.menuItems.push({
                        label: nav.label,
                        icon: nav.icon,
                        pageURL: nav.url
                    });
                }
            });
        } else {
            this.menuItems = [
                // {
                //     label: "menuItem.dashboard",
                //     icon: 'pi pi-th-large',
                //     pageURL: CoreModulesUrl.Home
                // },
                {
                    label: 'menuItem.placement_repo',
                    icon: 'pi pi-table',
                    pageURL: CoreModulesUrl.PlacementRepository
                },
                {
                    label: 'menuItem.worker_search',
                    icon: 'pi pi-server',
                    pageURL: CoreModulesUrl.WorkerSearch
                }
                // {
                //     label: 'Admin',
                //     icon: 'pi pi-credit-card',
                //     pageURL: CoreModulesUrl.adminConfiguaration
                // }
            ];
        }
    }

    backClicked() {
        this._location.back();
    }
    private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): any {
        const children: ActivatedRoute[] = route.children;

        if (children.length === 0) {
            return breadcrumbs;
        }
        for (const child of children) {
            const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');

            if (routeURL !== '') {
                url += `/${routeURL}`;
            }
            const label = child.snapshot.data[this.ROUTE_DATA_BREADCRUMB];

            const icon = child.snapshot.data['icon'];

            if (!this.isNullOrUndefined(label)) {
                breadcrumbs.push({ label, icon, url });
            }

            return this.createBreadcrumbs(child, url, breadcrumbs);
        }
    }

    isNullOrUndefined(label: any) {
        return null == label;
    }

    redirectTo(i: any) {
        this.router.navigate([i.pageURL]);
        this.breadcrumCaption = i.label;
        this.display = false;
    }
    redirect(i: any) {
        if (i.label == 'empDashboardLabels.empDashboard') {
            this.router.navigate([i.url], { queryParams: { personId: this.personId } });
        }
    }
}
