import { map } from 'rxjs/operators';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { Injectable } from '@angular/core';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RX_ASSOCIATION_DEFINITION, RxModalityType } from '@helix/platform/association/api';
import { find } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/record/api";
export class AssociationDesignerService {
    constructor(rxDefinitionNameService, rxRecordDefinitionService, rxRecordDefinitionCacheService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
    }
    getDefinitionModelFromDefinition(definition) {
        return {
            cardinality: [find(Object.values(RX_ASSOCIATION_DEFINITION.cardinality), { value: definition.cardinality })],
            customizationOptions: {
                scope: definition.scope,
                allowOverlay: definition.allowOverlay
            },
            description: definition.description,
            guid: definition.guid,
            isEnabled: definition.isEnabled,
            lastChangedBy: definition.lastChangedBy,
            lastUpdateTime: definition.lastUpdateTime,
            name: definition.name,
            nodeAId: definition.nodeAId,
            nodeAKeys: definition.nodeAKeys,
            nodeAModality: definition.nodeAModality,
            nodeAName: definition.nodeAName,
            nodeBId: definition.nodeBId,
            nodeBKeys: definition.nodeBKeys,
            nodeBName: definition.nodeBName,
            overlayDescriptor: definition.overlayDescriptor,
            overlayGroupId: definition.overlayGroupId,
            shouldCascadeDelete: definition.shouldCascadeDelete,
            tags: definition.tags
        };
    }
    getDefinitionFromDefinitionModel(model) {
        return {
            allowOverlay: model.customizationOptions.allowOverlay,
            cardinality: model.cardinality[0].value,
            description: model.description,
            guid: model.guid,
            isEnabled: model.isEnabled,
            name: model.name,
            lastUpdateTime: model.lastUpdateTime,
            nodeAId: model.nodeAId,
            nodeAKeys: model.nodeAKeys,
            nodeAModality: model.cardinality[0].value === RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value
                ? RxModalityType.Optional
                : model.nodeAModality,
            nodeAName: model.nodeAName,
            nodeBId: model.nodeBId,
            nodeBKeys: model.cardinality[0].value === RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value
                ? [RX_RECORD_DEFINITION.coreFieldIds.id]
                : model.nodeBKeys,
            nodeBName: model.nodeBName,
            scope: model.customizationOptions.scope,
            shouldCascadeDelete: model.cardinality[0].value === RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value
                ? false
                : model.shouldCascadeDelete,
            overlayDescriptor: model.overlayDescriptor,
            overlayGroupId: model.overlayGroupId,
            tags: model.tags
        };
    }
    getRecordDefinition(name, forceReload = false) {
        return forceReload
            ? this.rxRecordDefinitionService.get(name, {}, true)
            : this.rxRecordDefinitionCacheService.getRecordDefinition(name);
    }
    getForeignKeyFieldName(definitionModel) {
        const fieldNameBase = definitionModel.nodeAName || this.rxDefinitionNameService.getDisplayName(definitionModel.nodeAId);
        return fieldNameBase.toUpperCase() + '_ID';
    }
    getForeignKeyFieldId(definitionModel, forceReload = false) {
        return this.getRecordDefinition(definitionModel.nodeBId, forceReload).pipe(map((recordDefinition) => {
            var _a;
            const foreignKeyFieldName = this.getForeignKeyFieldName(definitionModel);
            return (_a = recordDefinition.fieldDefinitions.find((field) => field.name === foreignKeyFieldName)) === null || _a === void 0 ? void 0 : _a.id;
        }));
    }
}
AssociationDesignerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignerService, deps: [{ token: i1.RxDefinitionNameService }, { token: i2.RxRecordDefinitionService }, { token: i2.RxRecordDefinitionCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
AssociationDesignerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionNameService }, { type: i2.RxRecordDefinitionService }, { type: i2.RxRecordDefinitionCacheService }]; } });
//# sourceMappingURL=association-designer.service.js.map