import { Injectable } from '@angular/core';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
export class RxWebApiDefinitionService {
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
//# sourceMappingURL=web-api-definition.service.js.map