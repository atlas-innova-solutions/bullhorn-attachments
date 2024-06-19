import { Component } from '@angular/core';
import { LangTranslateService } from './shared/services/Lang-translate-service/lang-translate.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    constructor() {}
    title = 'SETUP PORTAL';
}
