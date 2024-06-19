import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BullhornDashboardComponent } from './bullhorn-dashboard.component';


const routes: Routes = [{ path: '', component: BullhornDashboardComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BullhornDashboardRoutingModule {}
