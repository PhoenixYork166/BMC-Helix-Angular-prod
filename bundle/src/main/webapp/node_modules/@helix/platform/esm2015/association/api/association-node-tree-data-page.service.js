import { Injectable, Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
const associationNodeTreeDataPageQuery = 'com.bmc.arsys.rx.application.association.datapage.AssociationNodeTreeDataPageQuery';
export class RxAssociationNodeTreeDataPageService extends DataPage {
    constructor(injector) {
        super(injector, associationNodeTreeDataPageQuery, {
            params: {
                depth: 2
            }
        });
        this.injector = injector;
    }
}
RxAssociationNodeTreeDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationNodeTreeDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociationNodeTreeDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationNodeTreeDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationNodeTreeDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=association-node-tree-data-page.service.js.map