import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class DocumentDesignerService {
    getDefinitionFromDefinitionModel(model, bundleId) {
        return {
            lastUpdateTime: model.lastUpdateTime,
            lastChangedBy: model.lastChangedBy,
            owner: model.owner,
            name: `${bundleId}:${model.name}`,
            description: model.description,
            overlayGroupId: model.overlayGroupId,
            scope: model.customizationOptions.scope,
            guid: model.guid,
            allowOverlay: model.customizationOptions.allowOverlay,
            overlayDescriptor: model.overlayDescriptor,
            documentSchema: model.documentSchema
        };
    }
}
DocumentDesignerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DocumentDesignerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=document-designer.service.js.map