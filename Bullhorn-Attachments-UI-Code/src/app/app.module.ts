import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CafEnvironmentConfigurationService } from './shared/services/caf-environment-configuration.service';
import { LoadMsalConfigService } from './shared/services/msal-config.service';
import { initSynchronousFactory } from './shared/services/load-urls';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpErrorInterceptor } from './shared/interceptors/http-error/http-error.interceptor';
import { JwtInterceptor } from './shared/interceptors/jwt-interceptor/jwt.interceptor';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateFormatService } from './shared/services/date-format/date-format-service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';


@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, NgxSpinnerModule, ReactiveFormsModule, FormsModule, NgIdleKeepaliveModule.forRoot()],
    providers: [
        DateFormatService,
        MessageService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: APP_INITIALIZER,
            useFactory: initSynchronousFactory,
            deps: [CafEnvironmentConfigurationService, LoadMsalConfigService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
