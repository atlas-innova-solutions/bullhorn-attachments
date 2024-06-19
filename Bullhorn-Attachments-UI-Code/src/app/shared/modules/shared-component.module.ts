import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CafPipeModule } from '../pipes/caf-pipe/caf-pipe.module';
import { PrimeNgModule } from './PrimeNg.module';
import { LangTranslateModule } from './lang-translate-module/lang-translate.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TwoDigitDecimalNumberDirective } from '../directives/two-digit-decimal-number.directive';

const sharedComponents: any = [];

@NgModule({
    declarations: [sharedComponents, TwoDigitDecimalNumberDirective],
    imports: [CommonModule, PrimeNgModule, ReactiveFormsModule, FormsModule, LangTranslateModule],
    providers: [ConfirmationService, DialogService],
    exports: [sharedComponents, LangTranslateModule, TwoDigitDecimalNumberDirective]
})
export class SharedComponentModule {}
