import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PrimeNgModule } from './../../shared/modules/PrimeNg.module';
import { TranslateModule} from '@ngx-translate/core';
import { BullhornEntityListComponent } from './bullhorn-entity-list.component';
import { BullhornEntityListRoutingModule } from './bullhorn-entity-list-routing.module';





@NgModule({
  declarations: [BullhornEntityListComponent],
  imports: [
    CommonModule,
    BullhornEntityListRoutingModule,
    TableModule,
    PrimeNgModule,
    TranslateModule,
    
  ]
})
export class BullhornEntityListModule { }


