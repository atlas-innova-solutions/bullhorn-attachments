import { RouterModule, Routes } from '@angular/router';
import { PlacementReviewComponent } from './placement-review.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: PlacementReviewComponent,
        data: {
            breadcrumb: null,
            icon: ''
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: []
})
export class PlacementReviewRouterModule {}
