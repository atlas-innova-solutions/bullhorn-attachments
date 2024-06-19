import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateFileAttachmentListComponent } from './candidate-file-attachment-list.component';
import { CandidateFileAttachmentListRoutingModule } from './candidate-file-attachment-list.routing.module';
import { TableModule } from 'primeng/table';
import { PrimeNgModule } from '../../shared/modules/PrimeNg.module';




@NgModule({
  declarations: [CandidateFileAttachmentListComponent],
  imports: [
    CommonModule,
    CandidateFileAttachmentListRoutingModule,
    TableModule,
    PrimeNgModule
  ]
})
export class CandidateFileAttachmentListModule { }