import { Injectable } from '@angular/core';
import { RxViewCustomizationOptionsComponent, RxViewRevertCustomizationComponent, ViewDesignerFacade } from '@helix/platform/view/designer';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/designer";
export class RxShellModel {
    constructor(viewDesignerFacade) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.viewDesignerFacade.setViewInspectorConfig(this.getInspector());
    }
    getInspector() {
        const layout = [
            {
                label: 'General',
                controls: [
                    {
                        component: RxViewRevertCustomizationComponent
                    },
                    {
                        component: RxViewCustomizationOptionsComponent
                    }
                ]
            }
        ];
        return {
            inspectorSectionConfigs: layout
        };
    }
}
RxShellModel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellModel, deps: [{ token: i1.ViewDesignerFacade }], target: i0.ɵɵFactoryTarget.Injectable });
RxShellModel.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellModel });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellModel, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ViewDesignerFacade }]; } });
//# sourceMappingURL=shell-model.service.js.map