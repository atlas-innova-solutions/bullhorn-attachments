import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCustomDashboardComponent } from './customer-custom-dashboard.component';

const routes: Routes = [{ path: '', component: CustomerCustomDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerCustomDashboardRoutingModule { }
