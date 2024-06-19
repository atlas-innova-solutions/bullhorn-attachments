import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../shared/modules/PrimeNg.module';
import { SharedComponentModule } from '../../shared/modules/shared-component.module';
import { LangTranslateModule } from '../../shared/modules/lang-translate-module/lang-translate.module';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedDialogService } from '../../shared/services/dialog-service/shared-dialog.service';
import { HomePageRouterModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { HeaderModule } from '../../shared/header/header.module';

@NgModule({
    declarations: [HomePageComponent],
    imports: [HomePageRouterModule, HeaderModule, CommonModule, PrimeNgModule, SharedComponentModule, LangTranslateModule, FormsModule, ReactiveFormsModule],
    providers:[SharedDialogService]
})
export class HomePageModule {}
