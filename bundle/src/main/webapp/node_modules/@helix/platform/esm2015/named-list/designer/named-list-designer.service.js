import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class NamedListDesignerService {
    getDefinitionFromDefinitionModel(model, bundleId) {
        return {
            allowOverlay: model.customizationOptions.allowOverlay,
            description: model.description,
            fields: model.fields,
            guid: model.guid,
            labelFieldId: model.labelFieldId,
            lastChangedBy: model.lastChangedBy,
            lastUpdateTime: model.lastUpdateTime,
            name: model.name ? `${bundleId}:${model.name}` : null,
            overlayDescriptor: model.customizationOptions.overlayDescriptor,
            overlayGroupId: model.customizationOptions.overlayGroupId,
            owner: model.owner,
            queryCriteria: model.queryCriteria,
            recordDefinitionName: model.recordDefinitionName,
            scope: model.customizationOptions.scope,
            searchBehavior: model.searchBehavior,
            tags: model.tags,
            valueFieldId: model.valueFieldId,
            version: model.version
        };
    }
}
NamedListDesignerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDesignerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NamedListDesignerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDesignerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDesignerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=named-list-designer.service.js.map