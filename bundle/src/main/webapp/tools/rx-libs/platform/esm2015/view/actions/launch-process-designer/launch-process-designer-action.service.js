import { Injectable } from '@angular/core';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { RxProcessDefinitionCacheService } from '@helix/platform/process/api';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import { defer, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProcessDesignerFrameComponent } from './process-designer-frame.component';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/process/api";
export class RxLaunchProcessDesignerActionService {
    constructor(adaptModalService, rxProcessDefinitionCacheService) {
        this.adaptModalService = adaptModalService;
        this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
    }
    execute(parameters) {
        return parameters.processDefinitionName
            ? this.rxProcessDefinitionCacheService
                .getProcessDefinition(parameters.processDefinitionName)
                .pipe(switchMap(() => this.openModal(parameters)))
            : defer(() => from(this.openModal(parameters)));
    }
    openModal(parameters) {
        return this.adaptModalService.open({
            content: ProcessDesignerFrameComponent,
            size: OpenViewActionModalSize.FullSize,
            data: parameters
        });
    }
}
RxLaunchProcessDesignerActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessDesignerActionService, deps: [{ token: i1.AdaptModalService }, { token: i2.RxProcessDefinitionCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLaunchProcessDesignerActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessDesignerActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessDesignerActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptModalService }, { type: i2.RxProcessDefinitionCacheService }]; } });
//# sourceMappingURL=launch-process-designer-action.service.js.map