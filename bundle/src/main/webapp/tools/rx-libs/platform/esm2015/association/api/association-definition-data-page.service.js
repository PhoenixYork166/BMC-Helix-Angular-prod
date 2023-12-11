import { Injectable, Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import { forkJoin } from 'rxjs';
import { castArray } from 'lodash';
import * as i0 from "@angular/core";
export class RxAssociationDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.association.datapage.AssociationDefinitionDataPageQuery');
        this.injector = injector;
    }
    getRecordAssociationDefinitions(recordDefinitionNames) {
        const recordDefinitionNamesList = castArray(recordDefinitionNames);
        const observables$ = recordDefinitionNamesList.map((name) => {
            return this.get({
                headers: { 'default-bundle-scope': '' },
                params: { firstRecordDefinitionName: name }
            });
        });
        return forkJoin(observables$);
    }
}
RxAssociationDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociationDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=association-definition-data-page.service.js.map