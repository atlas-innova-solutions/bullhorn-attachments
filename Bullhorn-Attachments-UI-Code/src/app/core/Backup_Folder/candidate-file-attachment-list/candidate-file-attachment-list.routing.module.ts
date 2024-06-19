import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateFileAttachmentListComponent } from './candidate-file-attachment-list.component';

const routes: Routes = [{ path: '', component: CandidateFileAttachmentListComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CandidateFileAttachmentListRoutingModule {}
