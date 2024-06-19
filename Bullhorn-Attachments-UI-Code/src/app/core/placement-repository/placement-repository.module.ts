import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacementRepositoryComponent } from './placement-repository.component';
import { PrimeNgModule } from '../../shared/modules/PrimeNg.module';
import { SharedComponentModule } from '../../shared/modules/shared-component.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from '../../shared/header/header.module';
import { TableModule } from 'primeng/table';
import { StatusHistoryDialogComponent } from '../../shared/components/status-history-dialog/status-history-dialog.component';
import { PlacementRepositoryRoutingModule } from './placement-repository-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviewDialogModule } from '../preview-dialog/preview-dialog.module';
import { ChangeHistoryComponent } from '../../shared/components/change-history/change-history.component';
import { MapperService } from '../../shared/services/auto-mapper/mapper-service';

@NgModule({
    declarations: [PlacementRepositoryComponent, StatusHistoryDialogComponent, ChangeHistoryComponent],
    imports: [CommonModule, PrimeNgModule, SharedComponentModule, HttpClientModule, HeaderModule, TableModule, PlacementRepositoryRoutingModule, FormsModule, ReactiveFormsModule, PreviewDialogModule],
    exports: [PlacementRepositoryComponent],
    providers: [MapperService]
})
export class PlacementRepositoryModule {}
