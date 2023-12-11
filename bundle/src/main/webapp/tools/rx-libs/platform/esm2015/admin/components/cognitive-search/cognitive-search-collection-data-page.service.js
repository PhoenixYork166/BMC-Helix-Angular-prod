import { Injectable, Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
const dataPageType = 'com.bmc.arsys.rx.application.cognitive.datapage.CognitiveSearchCollectionDataPageQuery';
export class RxCognitiveSearchCollectionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, dataPageType);
        this.injector = injector;
    }
}
RxCognitiveSearchCollectionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveSearchCollectionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxCognitiveSearchCollectionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveSearchCollectionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveSearchCollectionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=cognitive-search-collection-data-page.service.js.map