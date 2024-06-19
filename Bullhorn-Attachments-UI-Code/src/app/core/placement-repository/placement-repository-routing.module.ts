import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacementRepositoryComponent } from './placement-repository.component';
import { CoreModulesUrl } from '../../shared/utils/page-navigation-url';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: PlacementRepositoryComponent,
        data: {
            breadcrumb: null,
            icon: ''
        }
    },
    {
        path: CoreModulesUrl.PlacementReview,
        loadChildren: () => import('../placement-review/placement-review.module').then((route) => route.PlacementReviewModule),
        data: {
            breadcrumb: 'placementReviewLevel.placementReviewHeader',
            icon: ''
        },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlacementRepositoryRoutingModule {}
