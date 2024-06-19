import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerCustomDashboardRoutingModule } from './customer-custom-dashboard-routing.module';
import { CustomFieldValueComponent } from './custom-field-value/custom-field-value.component';
import { PrimeNgModule } from '../../shared/modules/PrimeNg.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { SharedComponentModule } from '../../shared/modules/shared-component.module';
import { CustomerCustomDashboardComponent } from './customer-custom-dashboard.component';
import { MapperService } from '../../shared/services/auto-mapper/mapper-service';
import { SharedDialogService } from '../../shared/services/dialog-service/shared-dialog.service';
import { LangTranslateModule } from '../../shared/modules/lang-translate-module/lang-translate.module';

@NgModule({
    declarations: [CustomFieldValueComponent, CustomerCustomDashboardComponent],
    imports: [CommonModule, PrimeNgModule, SharedComponentModule, LangTranslateModule, HttpClientModule, TableModule, FormsModule, ReactiveFormsModule, CustomerCustomDashboardRoutingModule],
    providers: [MapperService, SharedDialogService]
})
export class CustomerCustomDashboardModule {}
