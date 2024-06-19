import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModulesUrl } from './shared/utils/page-navigation-url';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
    {
        path: CoreModulesUrl.Login,
        loadChildren: () => import('./core/login/login.module').then((m) => m.LoginModule)
    },
    {
        path: '',
        loadChildren: () => import('./core/dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'customer-custom-dashboard',
        loadChildren: () => import('./core/customer-custom-dashboard/customer-custom-dashboard.module').then((m) => m.CustomerCustomDashboardModule),
    },
    {
        path: 'home',
        loadChildren: () => import('./core/home-page/home-page.module').then((m) => m.HomePageModule),
        canActivate: [AuthGuard]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
