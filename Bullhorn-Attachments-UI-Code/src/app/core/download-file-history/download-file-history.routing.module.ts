import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadFileHistoryComponent } from './download-file-history.component';


const routes: Routes = [{path: '', component: DownloadFileHistoryComponent}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DownloadFileHistoryRoutingModule {}