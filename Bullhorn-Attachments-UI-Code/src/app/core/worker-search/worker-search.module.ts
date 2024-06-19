import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerSearchComponent } from './worker-search.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HeaderModule } from '../../shared/header/header.module';
import { PrimeNgModule } from '../../shared/modules/PrimeNg.module';
import { SharedComponentModule } from '../../shared/modules/shared-component.module';
import { WorkerSearchRoutingModule } from './worker-search-routing.module';
import { MapperService } from '../../shared/services/auto-mapper/mapper-service';

@NgModule({
    declarations: [WorkerSearchComponent],
    imports: [CommonModule, PrimeNgModule, SharedComponentModule, HttpClientModule, HeaderModule, TableModule, WorkerSearchRoutingModule, FormsModule, ReactiveFormsModule],
    exports: [WorkerSearchComponent],
    providers: [MapperService]
})
export class WorkerSearchModule {}
