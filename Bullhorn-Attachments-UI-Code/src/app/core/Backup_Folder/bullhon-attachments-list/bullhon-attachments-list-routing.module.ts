import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BullhonAttachmentsListComponent } from './bullhon-attachments-list.component';
import { AuthGuard } from '../../../shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: BullhonAttachmentsListComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BullhonAttachmentsListRoutingModule {}

