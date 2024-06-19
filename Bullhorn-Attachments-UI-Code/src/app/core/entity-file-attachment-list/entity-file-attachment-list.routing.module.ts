import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityFileAttachmentListComponent } from './entity-file-attachment-list.component';


const routes: Routes = [{ path: '', component: EntityFileAttachmentListComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntityFileAttachmentListRoutingModule {}
