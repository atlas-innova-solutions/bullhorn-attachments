import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PrimeNgModule } from '../../shared/modules/PrimeNg.module';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from '../../shared/header/header.module';
import { FormsModule } from '@angular/forms';
import { DownloadFileHistoryRoutingModule } from './download-file-history.routing.module';
import { DownloadFileHistoryComponent } from './download-file-history.component';

@NgModule({
    declarations: [DownloadFileHistoryComponent],
    imports: [
      CommonModule,
      DownloadFileHistoryRoutingModule,
      TableModule,
      PrimeNgModule,
      ButtonModule,
      HttpClientModule,
      FormsModule,
      HeaderModule
    ]
  })

  export class DownloadFileHistoryModule { }