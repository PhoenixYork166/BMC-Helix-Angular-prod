import { Injector } from '@angular/core';
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxMissingTranslationHandler implements MissingTranslationHandler {
    private injector;
    private rxLocalizationService;
    constructor(injector: Injector);
    handle(params: MissingTranslationHandlerParams): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxMissingTranslationHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxMissingTranslationHandler>;
}
