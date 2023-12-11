import { HttpClient } from '@angular/common/http';
import { RxLocalizationService } from './localization.service';
import { RxLocalizedStringsLoaderService } from './localized-strings-loader.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@ngx-translate/core";
export declare function LocalizedStringsLoaderFactory(http: HttpClient): RxLocalizedStringsLoaderService;
export declare class DynamicLocaleId extends String {
    private rxLocalizationService;
    constructor(rxLocalizationService: RxLocalizationService);
    toString(): string;
}
export declare class RxLocalizationModule {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<RxLocalizationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RxLocalizationModule, never, [typeof i1.CommonModule, typeof i2.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RxLocalizationModule>;
}
