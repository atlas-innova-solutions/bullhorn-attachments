import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDynamicFieldsComponent } from './view-dynamic-fields.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HeaderModule } from '../../../shared/header/header.module';
import { PrimeNgModule } from '../../../shared/modules/PrimeNg.module';
import { SharedComponentModule } from '../../../shared/modules/shared-component.module';
import { MapperService } from '../../../shared/services/auto-mapper/mapper-service';
import { ViewDynamicFieldsRoutingModule } from './view-dynamic-fields-routing.module';



@NgModule({
  declarations: [ViewDynamicFieldsComponent],
  imports: [CommonModule, PrimeNgModule, SharedComponentModule, HttpClientModule, HeaderModule, ViewDynamicFieldsRoutingModule, TableModule, FormsModule, ReactiveFormsModule],
  exports: [ViewDynamicFieldsComponent],
  providers: [MapperService]
})
export class ViewDynamicFieldsModule { }
