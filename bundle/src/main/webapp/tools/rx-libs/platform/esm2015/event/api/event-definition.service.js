import { Injectable } from '@angular/core';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
export class RxEventDefinitionService {
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
//# sourceMappingURL=event-definition.service.js.map