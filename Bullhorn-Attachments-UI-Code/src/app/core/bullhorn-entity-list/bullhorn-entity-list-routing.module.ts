import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BullhornEntityListComponent } from './bullhorn-entity-list.component';

const routes: Routes = [
    {
        path: '',
        component: BullhornEntityListComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BullhornEntityListRoutingModule {}

