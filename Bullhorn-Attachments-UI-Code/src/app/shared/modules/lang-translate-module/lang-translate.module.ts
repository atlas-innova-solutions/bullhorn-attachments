import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LanguageVariables } from '../../utils/language-constant';
import { LangTranslateService } from '../../services/Lang-translate-service/lang-translate.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function httpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, LanguageVariables.LanguageBaseFilePath, LanguageVariables.LangFileFormat);
}

@NgModule({
    imports: [
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [TranslateModule],
    providers: [LangTranslateService]
})
export class LangTranslateModule {
    constructor(private langTranslateService: LangTranslateService) {
        this.langTranslateService.InitTranslate();
    }
}
