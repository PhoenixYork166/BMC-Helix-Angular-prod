import { Injectable } from '@angular/core';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
export class RxProcessInstanceCommandsService {
    constructor(rxCommandFactoryService) {
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.startProcessCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.process.command.StartProcessInstanceCommand');
    }
    start(processDefinitionName, processInputValues) {
        return this.startProcessCommand.execute({
            processDefinitionName,
            processInputValues
        }, {
            observe: 'response',
            responseType: 'text'
        });
    }
}
RxProcessInstanceCommandsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceCommandsService, deps: [{ token: i1.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessInstanceCommandsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceCommandsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceCommandsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCommandFactoryService }]; } });
//# sourceMappingURL=process-instance-commands.service.js.map