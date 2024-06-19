import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentModule } from './../../shared/modules/shared-component.module';
import { PrimeNgModule } from './../../shared/modules/PrimeNg.module';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from './../../shared/header/header.module';
import { BullhornDashboardComponent } from './bullhorn-dashboard.component';
import { BullhornDashboardRoutingModule } from './bullhorn-dashboard-routing.module';



@NgModule({
  declarations: [BullhornDashboardComponent],
  imports: [
    CommonModule,
    BullhornDashboardRoutingModule,
    HttpClientModule, SharedComponentModule,
    PrimeNgModule, HttpClientModule, FormsModule,
    HeaderModule

  ]
})
export class BullhornDashboardModule { }
