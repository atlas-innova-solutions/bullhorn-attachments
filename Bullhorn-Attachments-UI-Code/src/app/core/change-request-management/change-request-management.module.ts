import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeRequestManagementRoutingModule } from './change-request-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeRequestManagementComponent } from './change-request-management.component';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { BillChangeComponent } from './component/Bill-Change/bill-change.component';
import { PayChangeComponent } from './component/Pay-Change/pay-change.component';
import { AssignmentEndDateComponent } from './component/AssignenmentEndDate/assignment-end-date.component';
import { AssignmentExtendComponent } from './component/AssignemntExtend/assignment-extend.component';
import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNgModule } from '../../shared/modules/PrimeNg.module';
import { LangTranslateModule } from '../../shared/modules/lang-translate-module/lang-translate.module';
import { SharedComponentModule } from '../../shared/modules/shared-component.module';
@NgModule({
  declarations: [
  ChangeRequestManagementComponent,
  BillChangeComponent,
  PayChangeComponent,
  AssignmentEndDateComponent,
  AssignmentExtendComponent,
  ],
  imports: [
    FieldsetModule,
    LangTranslateModule,
    CommonModule,
    ChangeRequestManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    HttpClientModule,
    CalendarModule,
    PrimeNgModule,
    SharedComponentModule
  ]
})
export class ChangeRequestManagementModule { }
