import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../bullhorn-dashboard/bullhorn-dashboard.module').then((route) => route.BullhornDashboardModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'bullhorn-entity-List',
                loadChildren: () => import('../bullhorn-entity-list/bullhorn-entity-list.module').then((route) => route.BullhornEntityListModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'bullhorn-entity-file-attachment-list',
                loadChildren: () => import('../entity-file-attachment-list/entity-file-attachment-list.module').then((route) => route.EntityFileAttachmentListModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'download-file-history',
                loadChildren: () => import('../download-file-history/download-file-history.module').then((route) => route.DownloadFileHistoryModule),
                canActivate: [AuthGuard]
            },
          
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: []
})
export class HomePageRouterModule {}
