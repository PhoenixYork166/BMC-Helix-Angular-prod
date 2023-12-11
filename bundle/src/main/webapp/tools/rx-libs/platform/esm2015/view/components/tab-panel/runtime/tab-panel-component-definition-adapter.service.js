import { Injectable } from '@angular/core';
import { RxJsonParserService } from '@helix/platform/utils';
import { RxViewComponentType, RxViewDefinitionParserService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@helix/platform/utils";
export class RxTabPanelComponentDefinitionAdapterService {
    constructor(viewDefinitionParserService, rxJsonParserService) {
        this.viewDefinitionParserService = viewDefinitionParserService;
        this.rxJsonParserService = rxJsonParserService;
    }
    adaptDefinition(tabPanelViewComponentDefinition) {
        this.viewDefinitionParserService
            .getComponents(tabPanelViewComponentDefinition)
            .filter((componentPair) => componentPair.componentDefinition.type === RxViewComponentType.TabPanel)
            .map((componentPair) => componentPair.componentDefinition)
            .forEach((componentDefinition) => {
            if (componentDefinition.layout) {
                let layout = this.rxJsonParserService.tryParseJson(componentDefinition.layout);
                if (layout && layout.componentDefinitionId) {
                    const columns = layout.columns.map((column) => {
                        return {
                            children: column.children.map((child) => child.columns[0].children[0].componentDefinitionId)
                        };
                    });
                    layout = {
                        outlets: [
                            {
                                name: 'DEFAULT',
                                columns: columns
                            }
                        ]
                    };
                    componentDefinition.layout = JSON.stringify(layout);
                }
            }
        });
    }
}
RxTabPanelComponentDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTabPanelComponentDefinitionAdapterService, deps: [{ token: i1.RxViewDefinitionParserService }, { token: i2.RxJsonParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxTabPanelComponentDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTabPanelComponentDefinitionAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTabPanelComponentDefinitionAdapterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxViewDefinitionParserService }, { type: i2.RxJsonParserService }]; } });
//# sourceMappingURL=tab-panel-component-definition-adapter.service.js.map