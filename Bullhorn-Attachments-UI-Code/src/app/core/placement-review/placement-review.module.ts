import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacementReviewComponent } from './placement-review.component';
import { PrimeNgModule } from '../../shared/modules/PrimeNg.module';
import { PersonalinfoComponent } from '../../shared/components/personalinfo/personalinfo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '../../shared/header/header.module';
import { ExternalidentifierComponent } from '../../shared/components/externalidentifier/externalidentifier.component';
import { SecurityclearanceComponent } from '../../shared/components/securityclearance/securityclearance.component';
import { HomeaddressComponent } from '../../shared/components/homeaddress/homeaddress.component';
import { ImmigrationComponent } from '../../shared/components/immigration/immigration.component';
import { PlacementReviewRouterModule } from './placement-review-routing.module';
import { SegmentationComponent } from '../../shared/components/organisationdetails/segmentation/segmentation.component';
import { WorkerrelationshipComponent } from '../../shared/components/organisationdetails/workerrelationship/workerrelationship.component';
import { CustomerComponent } from '../../shared/components/organisationdetails/customer/customer.component';
import { ProjectDeliveryComponent } from '../../shared/components/organisationdetails/project-delivery/project-delivery.component';
import { SupplierComponent } from '../../shared/components/organisationdetails/supplier/supplier.component';
import { ITSolutionsComponent } from '../../shared/components/organisationdetails/it-solutions/it-solutions.component';
import { ClientContactComponent } from '../../shared/components/organisationdetails/client-contact/client-contact.component';
import { EmploymentComponent } from '../../shared/components/worker-info/employment/employment.component';
import { HCMIdentifiersComponent } from '../../shared/components/worker-info/hcm-identifiers/hcm-identifiers.component';
import { CustomerExpensesComponent } from '../../shared/components/organisationdetails/customer-expenses/customer-expenses.component';
import { CustomerPieceworkComponent } from '../../shared/components/organisationdetails/customer-piecework/customer-piecework.component';
import { PayrollComponent } from '../../shared/components/pay-bill/payroll/payroll.component';
import { PayBillApproverComponent } from '../../shared/components/pay-bill/pay-bill-approver/pay-bill-approver.component';
import { BillingComponent } from '../../shared/components/pay-bill/billing/billing.component';
import { RatesComponent } from '../../shared/components/pay-bill/rates/rates.component';
import { DirectHireComponent } from '../../shared/components/hire-details/direct-hire/direct-hire.component';
import { CreditAllocationComponent } from '../../shared/components/innova-team/credit-allocation/credit-allocation.component';
import { JobComponent } from '../../shared/components/job/job/job.component';
import { OffboardingComponent } from '../../shared/components/offboarding/offboarding/offboarding.component';
import { WorkAddressComponent } from '../../shared/components/workAddress/work-address/work-address.component';
import { ShiftSchedulesComponent } from '../../shared/components/shiftSchedules/shift-schedules/shift-schedules.component';
import { BenefitsComponent } from '../../shared/components/benefits/benefits/benefits.component';
import { AssignmentsComponent } from '../../shared/components/assignments/assignments/assignments.component';
import { SharedComponentModule } from '../../shared/modules/shared-component.module';
import { PurchaseOrderComponent } from '../../shared/components/purchase-order/purchase-order/purchase-order.component'
import { VmsComponent } from '../../shared/components/vms/vms/vms.component'
import { TimeSetupComponent } from '../../shared/components/time-setup/time-setup.component';
import { SharedServiceComponent } from '../../shared/components/innova-team/shared-service/shared-service.component';
import { ContractHireComponent } from '../../shared/components/hire-details/contract-hire/contract-hire.component';
import { AddressValidationResultsComponent } from '../../shared/components/address-validation-results/address-validation-results.component';
import { LocationComponent } from '../../shared/components/organisationdetails/location/location.component';
import { VendorComponent } from '../../shared/components/organisationdetails/vendor/vendor.component';
import { TimeElementsAndRatesComponent } from '../../shared/components/pay-bill/time-elements-and-rates/time-elements-and-rates.component';
import { MapperService } from '../../shared/services/auto-mapper/mapper-service';
import { PlacementRepositoryModule } from "../placement-repository/placement-repository.module";
import { TimeElementsBillSectionComponent } from '../../shared/components/pay-bill/time-elements-bill-section/time-elements-bill-section.component';
import { CustomSearchFieldsComponent } from '../../shared/components/custom-search-fields/custom-search-fields.component';

@NgModule({
    declarations: [PlacementReviewComponent, PersonalinfoComponent, ExternalidentifierComponent, SecurityclearanceComponent, HomeaddressComponent,
        ImmigrationComponent, SegmentationComponent, WorkerrelationshipComponent, CustomerComponent, ProjectDeliveryComponent, SupplierComponent,
        ITSolutionsComponent, ClientContactComponent, EmploymentComponent, HCMIdentifiersComponent, CustomerExpensesComponent, CustomerPieceworkComponent,
        PayrollComponent, PayBillApproverComponent, BillingComponent, RatesComponent, DirectHireComponent, CreditAllocationComponent, JobComponent, OffboardingComponent, WorkAddressComponent,
        ShiftSchedulesComponent, BenefitsComponent, AssignmentsComponent, PurchaseOrderComponent, VmsComponent, TimeSetupComponent, SharedServiceComponent, ContractHireComponent, AddressValidationResultsComponent,
        LocationComponent, VendorComponent, TimeElementsAndRatesComponent,TimeElementsBillSectionComponent,CustomSearchFieldsComponent
    ],
    providers: [MapperService],
    imports: [CommonModule, PrimeNgModule, SharedComponentModule, FormsModule, ReactiveFormsModule, HeaderModule, PlacementReviewRouterModule, PlacementRepositoryModule]
})
export class PlacementReviewModule {}
