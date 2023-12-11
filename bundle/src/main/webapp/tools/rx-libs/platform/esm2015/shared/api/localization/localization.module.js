import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localeDa from '@angular/common/locales/da';
import localeDe from '@angular/common/locales/de';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localeJa from '@angular/common/locales/ja';
import localeKo from '@angular/common/locales/ko';
import localeNb from '@angular/common/locales/nb';
import localeNl from '@angular/common/locales/nl';
import localePt from '@angular/common/locales/pt';
import localeRu from '@angular/common/locales/ru';
import localeSv from '@angular/common/locales/sv';
import localeZhHans from '@angular/common/locales/zh-Hans';
import { Injector, LOCALE_ID, NgModule } from '@angular/core';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RxLocalizationService } from './localization.service';
import { RxLocalizedStringsLoaderService } from './localized-strings-loader.service';
import { RxMissingTranslationHandler } from './missing-translation-handler.service';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
// AoT requires an exported function for factories
export function LocalizedStringsLoaderFactory(http) {
    return new RxLocalizedStringsLoaderService(http);
}
// https://stackoverflow.com/questions/44287827/dynamically-change-locale-for-datepipe-in-angular-2/49675774#49675774
// https://github.com/angular/angular/issues/15039
export class DynamicLocaleId extends String {
    constructor(rxLocalizationService) {
        super();
        this.rxLocalizationService = rxLocalizationService;
    }
    toString() {
        return this.rxLocalizationService.angularLocale;
    }
}
export class RxLocalizationModule {
    constructor() {
        [
            localeDe,
            localeEs,
            localeFr,
            localeIt,
            localeJa,
            localeKo,
            localeNb,
            localeNl,
            localeRu,
            localeSv,
            localePt,
            localeDa,
            localeZhHans
        ].forEach((locale) => registerLocaleData(locale));
    }
}
RxLocalizationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxLocalizationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizationModule, imports: [CommonModule, i1.TranslateModule] });
RxLocalizationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizationModule, providers: [
        {
            provide: LOCALE_ID,
            deps: [RxLocalizationService],
            useClass: DynamicLocaleId
        }
    ], imports: [[
            CommonModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: LocalizedStringsLoaderFactory,
                    deps: [HttpClient, Injector]
                },
                missingTranslationHandler: {
                    provide: MissingTranslationHandler,
                    useClass: RxMissingTranslationHandler,
                    deps: [Injector]
                }
            })
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        TranslateModule.forRoot({
                            loader: {
                                provide: TranslateLoader,
                                useFactory: LocalizedStringsLoaderFactory,
                                deps: [HttpClient, Injector]
                            },
                            missingTranslationHandler: {
                                provide: MissingTranslationHandler,
                                useClass: RxMissingTranslationHandler,
                                deps: [Injector]
                            }
                        })
                    ],
                    providers: [
                        {
                            provide: LOCALE_ID,
                            deps: [RxLocalizationService],
                            useClass: DynamicLocaleId
                        }
                    ]
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=localization.module.js.map