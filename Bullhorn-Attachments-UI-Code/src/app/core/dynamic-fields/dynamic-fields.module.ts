import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFieldsComponent } from './dynamic-fields.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HeaderModule } from '../../shared/header/header.module';
import { PrimeNgModule } from '../../shared/modules/PrimeNg.module';
import { SharedComponentModule } from '../../shared/modules/shared-component.module';
import { MapperService } from '../../shared/services/auto-mapper/mapper-service';
import { DynamicFieldsRoutingModule } from './dynamic-fields-routing.module';
import { SafeHtmlPipe } from '../../shared/pipes/setup-pipe/safe-html.pipe';
import { AdminConfiguarationComponent } from './admin-configuaration/admin-configuaration.component';



@NgModule({
  declarations: [DynamicFieldsComponent, SafeHtmlPipe, AdminConfiguarationComponent],
  imports: [CommonModule, PrimeNgModule, SharedComponentModule, HttpClientModule, HeaderModule, DynamicFieldsRoutingModule, TableModule, FormsModule, ReactiveFormsModule],
  exports: [DynamicFieldsComponent],
  providers: [MapperService]
})
export class DynamicFieldsModule { }
