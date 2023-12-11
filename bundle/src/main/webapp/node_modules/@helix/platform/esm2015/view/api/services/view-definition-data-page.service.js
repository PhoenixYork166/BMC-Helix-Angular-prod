import { DataPage } from '@helix/platform/shared/api';
import { Injectable, Injector } from '@angular/core';
import * as i0 from "@angular/core";
const viewDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.view.datapage.ViewDefinitionDataPageQuery';
export class RxViewDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, viewDefinitionDataPageQuery, {
            params: {
                excludeExtensionViews: true
            }
        });
        this.injector = injector;
    }
}
RxViewDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=view-definition-data-page.service.js.map