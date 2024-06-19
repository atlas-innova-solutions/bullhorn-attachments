import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewDialogRoutingModule } from './preview-dialog-routing.module';
import { PreviewDialogComponent } from './components/preview-dialog/preview-dialog.component';
import { ExternalIdentifireComponent } from './components/external-identifire/external-identifire.component';
import { PrimeNgModule } from '../../shared/modules/PrimeNg.module';
import { SharedComponentModule } from '../../shared/modules/shared-component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { HomeAddressComponent } from './components/home-address/home-address.component';
import { PreviewImmigrationComponent } from './components/preview-immigration/preview-immigration.component';
import { EmploymentComponent } from './components/employment/employment.component';
import { HcmItentifireComponent } from './components/hcm-itentifire/hcm-itentifire.component';
import { ClientContactComponent } from './components/client-contact/client-contact.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ProjectDeliveryComponent } from './components/project-delivery/project-delivery.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { WorkerRelationshipComponent } from './components/worker-relationship/worker-relationship.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { JobComponent } from './components/job/job.component';
import { OffBoardingComponent } from './components/off-boarding/off-boarding.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { ShiftSchedulesComponent } from './components/shift-schedules/shift-schedules.component';
import { VmsComponent } from './components/vms/vms.component';
import { WorkAddressComponent } from './components/work-address/work-address.component';
import { PayrollComponent } from './components/payroll/payroll.component';
import { BillingComponent } from './components/billing/billing.component';
import { DirectHireComponent } from './components/direct-hire/direct-hire.component';
import { CreditAllocationComponent } from './components/credit-allocation/credit-allocation.component';
import { SharedServiceComponent } from './components/shared-service/shared-service.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { TimeSetupComponent } from './components/time-setup/time-setup.component';
import { ContractHireComponent } from './components/contract-hire/contract-hire.component';
import { CsfComponent } from './components/csf/csf.component';
import { PayBillApproverComponent } from './components/pay-bill-approver/pay-bill-approver.component';
import { TimeElementsComponent } from './components/time-elements/time-elements.component';
import { RateComponent } from './components/rate/rate.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { TimeElementsBillRatesComponent } from './components/time-elements-bill-rates/time-elements-bill-rates.component';


@NgModule({
  declarations: [
    PreviewDialogComponent,
    ExternalIdentifireComponent,
    PersonalInfoComponent,
    HomeAddressComponent,
    PreviewImmigrationComponent,
    EmploymentComponent,
    HcmItentifireComponent,
    ClientContactComponent,
    CustomerComponent,
    ProjectDeliveryComponent,
    SupplierComponent,
    WorkerRelationshipComponent,
    AssignmentComponent,
    JobComponent,
    OffBoardingComponent,
    PurchaseOrderComponent,
    ShiftSchedulesComponent,
    VmsComponent,
    WorkAddressComponent,
    PayrollComponent,
    BillingComponent,
    DirectHireComponent,
    CreditAllocationComponent,
    SharedServiceComponent,
    BenefitsComponent,
    TimeSetupComponent,
    ContractHireComponent,
    CsfComponent,
    PayBillApproverComponent,
    TimeElementsComponent,
    RateComponent,
    VendorComponent,
    TimeElementsBillRatesComponent
  ],
  imports: [
    CommonModule,
    PreviewDialogRoutingModule,
    PrimeNgModule, SharedComponentModule, ReactiveFormsModule
  ]
})
export class PreviewDialogModule { }
