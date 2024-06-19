import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouterModule } from './dashboard-routing.module';
import { PrimeNgModule } from '../../shared/modules/PrimeNg.module';
import { HeaderModule } from '../../shared/header/header.module';
import { SharedComponentModule } from '../../shared/modules/shared-component.module';
import { LangTranslateModule } from '../../shared/modules/lang-translate-module/lang-translate.module';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedDialogService } from '../../shared/services/dialog-service/shared-dialog.service';

@NgModule({
    declarations: [DashboardComponent, SidebarComponent],
    imports: [CommonModule, DashboardRouterModule, PrimeNgModule, HeaderModule, SharedComponentModule, LangTranslateModule, FormsModule, ReactiveFormsModule],
    providers:[SharedDialogService]
})
export class DashboardModule {}
