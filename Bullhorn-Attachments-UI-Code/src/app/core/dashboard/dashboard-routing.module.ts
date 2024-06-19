import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CoreModulesUrl } from '../../shared/utils/page-navigation-url';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
    {
        path: CoreModulesUrl.Home,
        component: DashboardComponent,
        data: {
            // breadcrumb: 'menuItem.dashboard',
            icon: ''
        },
        children: [
            {
                path: CoreModulesUrl.PlacementRepository,
                loadChildren: () => import('../placement-repository/placement-repository.module').then((route) => route.PlacementRepositoryModule),
                data: {
                    breadcrumb: 'menuItem.placement_repo',
                    icon: ''
                },
                canActivate: [AuthGuard]
            },
            {
                path: CoreModulesUrl.WorkerSearch,
                loadChildren: () => import('../worker-search/worker-search.module').then((route) => route.WorkerSearchModule),
                data: {
                    breadcrumb: 'menuItem.worker_search',
                    icon: ''
                },
                canActivate: [AuthGuard]
            },
            {
                path: CoreModulesUrl.ChangeRequest,
                loadChildren: () => import('../change-request-management/change-request-management.module').then((route) => route.ChangeRequestManagementModule),
                data: {
                    breadcrumb: 'Change Request',
                    icon: ''
                },
                canActivate: [AuthGuard]
            },
            {
                path: CoreModulesUrl.adminConfiguaration,
                loadChildren: () => import('../dynamic-fields/admin-configuaration/admin-configuaration.module').then((route) => route.AdminConfiguarationModule),
                data: {
                    breadcrumb: 'Admin',
                    icon: ''
                },
                canActivate: [AuthGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: []
})
export class DashboardRouterModule {}
