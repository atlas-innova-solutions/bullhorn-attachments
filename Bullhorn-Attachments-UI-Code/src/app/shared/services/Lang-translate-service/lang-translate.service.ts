import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageVariables } from '../../utils/language-constant';

@Injectable({
    providedIn: 'root'
})
export class LangTranslateService {
    constructor(private translate: TranslateService) {}

    InitTranslate(): void {
        this.translate.addLangs(LanguageVariables.Languages);
        this.translate.setDefaultLang(LanguageVariables.DefaultLanguage);
        this.translate.use(LanguageVariables.DefaultLanguage);
    }

    changeLanguage(lang: any): void {
        this.translate.use(lang);
    }

    getLanguage(): string {
        return this.translate.currentLang;
    }
}
