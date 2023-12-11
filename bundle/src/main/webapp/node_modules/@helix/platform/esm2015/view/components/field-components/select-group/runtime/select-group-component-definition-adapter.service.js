import { Injectable } from '@angular/core';
import { RX_VIEW_DEFINITION } from '@helix/platform/view/api';
import { assign, omit, sortBy } from 'lodash';
import * as i0 from "@angular/core";
export class SelectGroupComponentDefinitionAdapterService {
    adaptDefinition(componentDefinition) {
        componentDefinition.componentDefinitions.forEach((childComponentDefinition) => {
            assign(childComponentDefinition.propertiesByName, {
                disabled: componentDefinition.propertiesByName.disabled,
                hidden: componentDefinition.propertiesByName.hidden,
                index: Number(childComponentDefinition.propertiesByName.index)
            });
            delete childComponentDefinition.propertiesByName.labelId;
        });
        const layout = {
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName,
                    columns: [
                        {
                            children: sortBy(componentDefinition.componentDefinitions, 'propertiesByName.index').map((component) => component.guid)
                        }
                    ]
                }
            ]
        };
        componentDefinition.propertiesByName = omit(componentDefinition.propertiesByName, [
            'disabled',
            'hidden',
            'recordInstance',
            'recordDefinition'
        ]);
        componentDefinition.layout = JSON.stringify(layout);
    }
}
SelectGroupComponentDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupComponentDefinitionAdapterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SelectGroupComponentDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupComponentDefinitionAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupComponentDefinitionAdapterService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=select-group-component-definition-adapter.service.js.map