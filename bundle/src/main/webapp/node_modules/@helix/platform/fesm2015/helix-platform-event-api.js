import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import * as i1 from '@helix/platform/shared/api';
import { DataPage } from '@helix/platform/shared/api';

const eventDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.event.datapage.EventDefinitionDataPageQuery';
class RxEventDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, eventDefinitionDataPageQuery);
        this.injector = injector;
    }
}
RxEventDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxEventDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxEventDefinitionService {
    constructor(rxCommandFactoryService) {
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.revertCustomizationCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.event.command.RevertEventDefinitionCommand');
    }
    revertCustomization(eventDefinitionName) {
        return this.revertCustomizationCommand.execute({ eventDefinitionName });
    }
}
RxEventDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDefinitionService, deps: [{ token: i1.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxEventDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCommandFactoryService }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { RxEventDefinitionDataPageService, RxEventDefinitionService };
//# sourceMappingURL=helix-platform-event-api.js.map
