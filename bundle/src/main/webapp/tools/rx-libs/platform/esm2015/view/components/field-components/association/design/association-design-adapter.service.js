import { Injectable } from '@angular/core';
import { RX_VIEW_DEFINITION, RxViewComponentType } from '@helix/platform/view/api';
import { RxAssociationEditingMode } from '../association.types';
import * as i0 from "@angular/core";
export class AssociationDesignAdapterService {
    adaptDefinition(componentDefinition) {
        var _a, _b, _c, _d, _e;
        // If a view from old view designer gets opened we have to add a layout with
        // action button guids, so they can be rendered inside association view component.
        if (!componentDefinition.layout) {
            const actionButtonGuids = componentDefinition.componentDefinitions
                .filter((definition) => definition.type === RxViewComponentType.ActionButton)
                .map((definition) => definition.guid);
            componentDefinition.layout = JSON.stringify({
                outlets: [
                    {
                        name: RX_VIEW_DEFINITION.defaultOutletName,
                        columns: [
                            {
                                children: actionButtonGuids
                            }
                        ]
                    }
                ]
            });
        }
        const adaptedProperties = {
            editingMode: (_a = componentDefinition.propertiesByName.editingMode) !== null && _a !== void 0 ? _a : RxAssociationEditingMode.Views,
            nodeARole: (_b = componentDefinition.propertiesByName.nodeARole) !== null && _b !== void 0 ? _b : null,
            nodeBRole: (_c = componentDefinition.propertiesByName.nodeBRole) !== null && _c !== void 0 ? _c : null,
            styles: (_d = componentDefinition.propertiesByName.styles) !== null && _d !== void 0 ? _d : null,
            useDefaultRoles: (_e = componentDefinition.propertiesByName.useDefaultRoles) !== null && _e !== void 0 ? _e : false
        };
        Object.assign(componentDefinition.propertiesByName, adaptedProperties);
    }
}
AssociationDesignAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignAdapterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AssociationDesignAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignAdapterService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=association-design-adapter.service.js.map