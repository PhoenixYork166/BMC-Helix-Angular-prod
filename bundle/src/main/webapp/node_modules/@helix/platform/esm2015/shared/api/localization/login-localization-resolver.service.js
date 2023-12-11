import { Injectable } from '@angular/core';
import { RxLocalizationService } from './localization.service';
import * as i0 from "@angular/core";
import * as i1 from "./localization.service";
export class RxLoginLocalizationResolver {
    constructor(rxLocalizationService) {
        this.rxLocalizationService = rxLocalizationService;
    }
    resolve(route, state) {
        return this.rxLocalizationService.initLoginTranslations();
    }
}
RxLoginLocalizationResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoginLocalizationResolver, deps: [{ token: i1.RxLocalizationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLoginLocalizationResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoginLocalizationResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoginLocalizationResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxLocalizationService }]; } });
//# sourceMappingURL=login-localization-resolver.service.js.map