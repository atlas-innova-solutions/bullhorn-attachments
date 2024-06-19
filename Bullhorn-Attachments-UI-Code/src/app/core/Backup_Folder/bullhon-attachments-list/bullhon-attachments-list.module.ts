import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BullhonAttachmentsListComponent } from './bullhon-attachments-list.component';
import { BullhonAttachmentsListRoutingModule } from './bullhon-attachments-list-routing.module';
import { TableModule } from 'primeng/table';
import { PrimeNgModule } from '../../../shared/modules/PrimeNg.module';
import { TranslateModule} from '@ngx-translate/core';





@NgModule({
  declarations: [BullhonAttachmentsListComponent],
  imports: [
    CommonModule,
    BullhonAttachmentsListRoutingModule,
    TableModule,
    PrimeNgModule,
    TranslateModule,
    
  ]
})
export class BullhonAttachmentsListModule { }


