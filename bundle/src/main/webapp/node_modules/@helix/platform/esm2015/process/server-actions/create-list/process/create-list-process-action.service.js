import { Injectable, Injector } from '@angular/core';
import { RxProcessDefinitionService } from '@helix/platform/process/api';
import { RxExpressionInputMapInspectorWidgetComponent, RxProcessActionService } from '@helix/platform/process/elements';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/process/api";
export class RxCreateListProcessActionService extends RxProcessActionService {
    constructor(rxProcessDefinitionService, injector) {
        super(injector);
        this.rxProcessDefinitionService = rxProcessDefinitionService;
        this.injector = injector;
    }
    getInputMapInspectorWidgetConfig() {
        return {
            component: RxExpressionInputMapInspectorWidgetComponent,
            options: {
                expressionConfigurator: this.getExpressionConfigurator(),
                expressionInputMapInspectorOptions: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.designer.server-actions.create-list.source-list.label'),
                        name: 'Source List'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.designer.server-actions.create-list.item-to-add.label'),
                        name: 'Item To Add'
                    }
                ]
            }
        };
    }
    getElementType(actionTypeName) {
        return this.rxProcessDefinitionService.getServerActionModelType(actionTypeName);
    }
    getClass() {
        return joint.shapes.rx.ProcessActions.createList;
    }
}
RxCreateListProcessActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreateListProcessActionService, deps: [{ token: i1.RxProcessDefinitionService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxCreateListProcessActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreateListProcessActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreateListProcessActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxProcessDefinitionService }, { type: i0.Injector }]; } });
//# sourceMappingURL=create-list-process-action.service.js.map