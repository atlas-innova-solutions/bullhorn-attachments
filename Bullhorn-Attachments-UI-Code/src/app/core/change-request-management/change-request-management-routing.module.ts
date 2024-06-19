import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeRequestManagementComponent } from './change-request-management.component';

const routes: Routes = [

    {
        path: '',
        component: ChangeRequestManagementComponent,
        data: {
            breadcrumb: null,
            icon: ''
        }
    },
    
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeRequestManagementRoutingModule {
 }
