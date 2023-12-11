import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ViewPresetSelectorAdapterService {
    adaptDefinition(viewPresetSelectorComponentDefinition) {
        viewPresetSelectorComponentDefinition.componentDefinitions
            .sort((a, b) => a.propertiesByName.index - b.propertiesByName.index)
            .forEach((componentDefinition) => {
            Object.assign(componentDefinition.propertiesByName, {
                guid: componentDefinition.guid,
                isSystem: true
            });
        });
    }
}
ViewPresetSelectorAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorAdapterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ViewPresetSelectorAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorAdapterService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=view-preset-selector-adapter.service.js.map