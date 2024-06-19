import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortByPipe } from '../sort-by.pipe';
import { CapitalizeFirstLetterPipe } from '../capitalize-first-letter.pipe';

@NgModule({
    declarations: [SortByPipe, CapitalizeFirstLetterPipe],
    imports: [CommonModule],
    exports: [SortByPipe, CapitalizeFirstLetterPipe]
})
export class CafPipeModule {}
