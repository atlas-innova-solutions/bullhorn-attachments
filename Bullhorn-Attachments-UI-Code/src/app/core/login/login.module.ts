import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../shared/modules/PrimeNg.module';
import { LoginComponent } from './login.component';
import { SharedComponentModule } from '../../shared/modules/shared-component.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, PrimeNgModule, LoginRoutingModule, HttpClientModule, FormsModule, SharedComponentModule]
})
export class LoginModule {}
