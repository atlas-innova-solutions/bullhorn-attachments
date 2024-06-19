import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PrimeNgModule } from './../../shared/modules/PrimeNg.module';
import { EntityFileAttachmentListComponent } from './entity-file-attachment-list.component';
import { EntityFileAttachmentListRoutingModule } from './entity-file-attachment-list.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from '../../shared/header/header.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EntityFileAttachmentListComponent],
  imports: [
    CommonModule,
    EntityFileAttachmentListRoutingModule,
    TableModule,
    PrimeNgModule,HttpClientModule, FormsModule,
    HeaderModule
  ]
})
export class EntityFileAttachmentListModule { }
