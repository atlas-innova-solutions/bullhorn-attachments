import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminConfiguarationComponent } from './admin-configuaration.component';
import { CoreModulesUrl } from '../../../shared/utils/page-navigation-url';
import { AuthGuard } from '../../../shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: AdminConfiguarationComponent,
        data: {
            breadcrumb: null,
            icon: ''
        }
    },
    {
        path: CoreModulesUrl.CustomerSpecificFieldConfig,
        loadChildren: () => import('../dynamic-fields.module').then((route) => route.DynamicFieldsModule),
        data: {
            breadcrumb: 'Customer Specific Field Configuration',
            icon: ''
        },
        canActivate: [AuthGuard]
    },
    {
      path: CoreModulesUrl.SetDynamicFieldsValue,
      loadChildren: () => import('../save-dynamic-fields-value/save-dynamic-fields-value.module').then((route) => route.SaveDynamicFieldsValueModule),
      data: {
          breadcrumb: 'View Dynamic Fields',
          icon: ''
      },
      canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminConfiguarationRoutingModule {}
