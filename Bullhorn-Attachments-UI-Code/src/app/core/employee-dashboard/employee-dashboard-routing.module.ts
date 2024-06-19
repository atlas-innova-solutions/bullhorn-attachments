import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { CoreModulesUrl } from '../../shared/utils/page-navigation-url';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
{
  path: '',
  component: EmployeeDashboardComponent,
  data: {
      breadcrumb: null,
      icon: ''
  }
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
export class EmployeeDashboardRoutingModule { }
