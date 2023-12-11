import { Injectable, Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export class DefinitionHistoryDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.definitionhistory.datapage.DefinitionHistoryDataPageQuery');
        this.injector = injector;
    }
}
/** @nocollapse */ DefinitionHistoryDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionHistoryDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ DefinitionHistoryDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionHistoryDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionHistoryDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=definition-history-data-page.service.js.map