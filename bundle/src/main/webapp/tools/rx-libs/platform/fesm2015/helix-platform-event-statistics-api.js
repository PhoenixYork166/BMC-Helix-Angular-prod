import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import * as i1 from '@helix/platform/shared/api';
import { DataPage } from '@helix/platform/shared/api';

class RxeventStatisticsDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.event.datapage.EventStatisticsDefinitionDataPageQuery');
        this.injector = injector;
    }
}
RxeventStatisticsDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxeventStatisticsDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxeventStatisticsDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxeventStatisticsDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxeventStatisticsDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxEventStatisticsDefinitionService {
    constructor(rxCommandFactoryService) {
        this.rxCommandFactoryService = rxCommandFactoryService;
    }
    revertCustomization(eventStatisticsDefinitionName) {
        const revertCustomizationCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.event.command.RevertEventStatisticsDefinitionCommand');
        return revertCustomizationCommand.execute({ eventStatisticsDefinitionName });
    }
}
RxEventStatisticsDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventStatisticsDefinitionService, deps: [{ token: i1.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxEventStatisticsDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventStatisticsDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventStatisticsDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCommandFactoryService }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { RxEventStatisticsDefinitionService, RxeventStatisticsDefinitionDataPageService };
//# sourceMappingURL=helix-platform-event-statistics-api.js.map
