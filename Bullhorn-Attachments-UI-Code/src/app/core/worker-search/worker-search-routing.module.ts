import { RouterModule, Routes } from '@angular/router';
import { WorkerSearchComponent } from './worker-search.component';
import { NgModule } from '@angular/core';
import { CoreModulesUrl } from '../../shared/utils/page-navigation-url';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: WorkerSearchComponent,
        data: {
            breadcrumb: null,
            icon: ''
        }
    },
    {
        path: CoreModulesUrl.EmploymentDashboard,
        loadChildren: () => import('../employee-dashboard/employee-dashboard.module').then((route) => route.EmployeeDashboardModule),
        data: {
            breadcrumb: 'empDashboardLabels.empDashboard',
            icon: ''
        },
        canActivate: [AuthGuard]
    },
    {
        path: CoreModulesUrl.ChangeRequest,
        loadChildren: () => import('../change-request-management/change-request-management.module').then((route) => route.ChangeRequestManagementModule),
        data: {
            breadcrumb: 'iconLabels.changeRequest',
            icon: ''
        },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkerSearchRoutingModule {}
