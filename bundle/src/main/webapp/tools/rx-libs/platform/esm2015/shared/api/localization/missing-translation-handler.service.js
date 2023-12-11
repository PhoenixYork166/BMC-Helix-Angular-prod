import { Injectable, Injector } from '@angular/core';
import { RxLocalizationService } from './localization.service';
import * as i0 from "@angular/core";
export class RxMissingTranslationHandler {
    constructor(injector) {
        this.injector = injector;
    }
    handle(params) {
        this.rxLocalizationService = this.rxLocalizationService || this.injector.get(RxLocalizationService);
        const defaultApplicationStrings = this.rxLocalizationService.getDefaultApplicationStrings();
        return defaultApplicationStrings.hasOwnProperty(params.key)
            ? params.translateService.parser.interpolate(defaultApplicationStrings[params.key], params.interpolateParams)
            : params.key;
    }
}
RxMissingTranslationHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMissingTranslationHandler, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxMissingTranslationHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMissingTranslationHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMissingTranslationHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=missing-translation-handler.service.js.map