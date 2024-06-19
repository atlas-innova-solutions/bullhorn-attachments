import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { PrimeNgModule } from '../modules/PrimeNg.module';
import { SharedComponentModule } from '../modules/shared-component.module';
import { LangTranslateModule } from '../modules/lang-translate-module/lang-translate.module';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, PrimeNgModule, SharedComponentModule, LangTranslateModule],
    exports: [HeaderComponent]
})
export class HeaderModule {}
