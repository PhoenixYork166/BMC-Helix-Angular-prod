import { Injectable } from '@angular/core';
import { RxJsonParserService } from '@helix/platform/utils';
import { RxViewComponentType, RxViewDefinitionParserService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@helix/platform/utils";
export class ContainerComponentDefinitionAdapterService {
    constructor(viewDefinitionParserService, rxJsonParserService) {
        this.viewDefinitionParserService = viewDefinitionParserService;
        this.rxJsonParserService = rxJsonParserService;
        this.componentDefinitionType = RxViewComponentType.Container;
    }
    // converting layout of old view definition into new format
    adaptDefinition(containerComponentDefinition) {
        this.viewDefinitionParserService
            .getComponents(containerComponentDefinition)
            .filter((componentPair) => componentPair.componentDefinition.type === this.componentDefinitionType)
            .map((componentPair) => componentPair.componentDefinition)
            .forEach((componentDefinition) => {
            if (componentDefinition.layout) {
                let layout = this.rxJsonParserService.tryParseJson(componentDefinition.layout);
                if (layout && layout.componentDefinitionId) {
                    const columns = layout.columns.map((column) => {
                        const rowWrap = componentDefinition.propertiesByName.rowWrap || 'sm';
                        const columnSpan = column.span || 12;
                        const columnClass = rowWrap === 'xs' ? `col-${columnSpan}` : `col-${rowWrap}-${columnSpan}`;
                        const marginBottomClass = rowWrap !== 'xs' ? `rx-mb-${rowWrap}` : '';
                        return {
                            cssClass: `${columnClass} ${marginBottomClass}`,
                            children: column.children.map((child) => child.componentDefinitionId)
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
                else if (layout && layout.outlets) {
                    layout.outlets.forEach((outlet) => {
                        outlet.columns
                            .filter((column) => !column.cssClass)
                            .forEach((column) => {
                            const rowWrap = componentDefinition.propertiesByName.rowWrap || 'sm';
                            const columnSpan = column.span || 12;
                            const columnClass = rowWrap === 'xs' ? `col-${columnSpan}` : `col-${rowWrap}-${columnSpan}`;
                            const marginBottomClass = rowWrap !== 'xs' ? `rx-mb-${rowWrap}` : '';
                            column.cssClass = `${columnClass} ${marginBottomClass}`;
                        });
                    });
                    componentDefinition.layout = JSON.stringify(layout);
                }
            }
        });
    }
}
ContainerComponentDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerComponentDefinitionAdapterService, deps: [{ token: i1.RxViewDefinitionParserService }, { token: i2.RxJsonParserService }], target: i0.ɵɵFactoryTarget.Injectable });
ContainerComponentDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerComponentDefinitionAdapterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerComponentDefinitionAdapterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewDefinitionParserService }, { type: i2.RxJsonParserService }]; } });
//# sourceMappingURL=container-component-definition-adapter.service.js.map