import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import * as i1 from '@helix/platform/shared/api';
import { DataPage } from '@helix/platform/shared/api';

class RxWebApiDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.webapi.datapage.WebApiDefinitionDataPageQuery');
        this.injector = injector;
    }
}
RxWebApiDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxWebApiDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxWebApiDefinitionService {
    constructor(rxCommandFactoryService) {
        this.rxCommandFactoryService = rxCommandFactoryService;
    }
    rename(oldWebApiDefinitionName, newWebApiDefinitionName) {
        const renameCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.webapi.command.RenameWebApiDefinitionCommand');
        return renameCommand.execute({
            name: oldWebApiDefinitionName,
            newName: newWebApiDefinitionName
        });
    }
}
RxWebApiDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDefinitionService, deps: [{ token: i1.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxWebApiDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCommandFactoryService }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { RxWebApiDefinitionDataPageService, RxWebApiDefinitionService };
//# sourceMappingURL=helix-platform-web-api-api.js.map
