import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveDynamicFieldsValueComponent } from './save-dynamic-fields-value.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HeaderModule } from '../../../shared/header/header.module';
import { PrimeNgModule } from '../../../shared/modules/PrimeNg.module';
import { SharedComponentModule } from '../../../shared/modules/shared-component.module';
import { MapperService } from '../../../shared/services/auto-mapper/mapper-service';
import { SaveDynamicFieldsValueRoutingModule } from './save-dynamic-fields-value-routing.module';



@NgModule({
  declarations: [SaveDynamicFieldsValueComponent],
  imports: [CommonModule, PrimeNgModule, SharedComponentModule, HttpClientModule, HeaderModule, SaveDynamicFieldsValueRoutingModule, TableModule, FormsModule, ReactiveFormsModule],
  exports: [SaveDynamicFieldsValueComponent],
  providers: [MapperService]
})
export class SaveDynamicFieldsValueModule { }
