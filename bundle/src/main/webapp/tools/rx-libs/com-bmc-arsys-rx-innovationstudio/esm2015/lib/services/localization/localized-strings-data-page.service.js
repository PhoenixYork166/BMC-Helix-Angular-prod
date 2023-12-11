import { Injectable, Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
const localizedStringsDataPageQuery = 'com.bmc.arsys.rx.application.localization.datapage.LocalizedStringsDataPageQuery';
export class AxLocalizedStringsDataPageQuery extends DataPage {
    constructor(injector) {
        super(injector, localizedStringsDataPageQuery);
        this.injector = injector;
    }
}
/** @nocollapse */ AxLocalizedStringsDataPageQuery.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLocalizedStringsDataPageQuery, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ AxLocalizedStringsDataPageQuery.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLocalizedStringsDataPageQuery, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLocalizedStringsDataPageQuery, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=localized-strings-data-page.service.js.map