import { Injectable, Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
const namedListDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.namedlist.datapage.NamedListDefinitionDataPageQuery';
export class RxNamedListDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, namedListDefinitionDataPageQuery);
        this.injector = injector;
    }
}
RxNamedListDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxNamedListDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=named-list-definition-data-page.service.js.map