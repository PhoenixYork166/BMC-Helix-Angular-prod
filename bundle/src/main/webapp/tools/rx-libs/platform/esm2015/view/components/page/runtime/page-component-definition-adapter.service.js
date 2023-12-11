import { Injectable } from '@angular/core';
import { RX_VIEW_DEFINITION } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export class PageComponentDefinitionAdapterService {
    adaptDefinition(componentDefinition) {
        componentDefinition.layout = JSON.stringify({
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName,
                    columns: [
                        {
                            children: componentDefinition.componentDefinitions[0].guid
                        }
                    ]
                }
            ]
        });
    }
}
PageComponentDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageComponentDefinitionAdapterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PageComponentDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageComponentDefinitionAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageComponentDefinitionAdapterService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=page-component-definition-adapter.service.js.map