import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeDashboardRoutingModule } from './employee-dashboard-routing.module';
import { EmploymentInformationComponent } from './components/employment-information/employment-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../shared/modules/PrimeNg.module';
import { SharedComponentModule } from '../../shared/modules/shared-component.module';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { AssignmemtComponent } from './components/assignmemt/assignmemt.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { EmploymentDashboardComponent } from './components/employment-dashboard/employment-dashboard.component';


@NgModule({
  declarations: [
    EmploymentInformationComponent,
    EmployeeDashboardComponent,
    PersonalDetailsComponent,
    AssignmemtComponent,
    BenefitsComponent,
    EmploymentDashboardComponent,
  ],
  imports: [
    CommonModule,
    EmployeeDashboardRoutingModule,
    PrimeNgModule, SharedComponentModule, ReactiveFormsModule,FormsModule,ReactiveFormsModule
  ]
})
export class EmployeeDashboardModule { }
