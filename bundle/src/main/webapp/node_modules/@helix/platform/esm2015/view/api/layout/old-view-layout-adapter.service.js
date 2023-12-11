import { Injectable } from '@angular/core';
import { get, isNil } from 'lodash';
import { RxJsonParserService } from '@helix/platform/utils';
import { RX_VIEW_DEFINITION } from '../domain/view-definition.constant';
import { ViewLayoutRole } from './view-layout.types';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
export class RxOldViewLayoutAdapterService {
    constructor(rxJsonParserService) {
        this.rxJsonParserService = rxJsonParserService;
    }
    convertLayout(componentDefinitionItem) {
        if (this.isViewDefinitionItem(componentDefinitionItem)) {
            this.convertViewLayout(componentDefinitionItem.componentDefinition);
        }
        else if (this.isContainerComponentDefinition(componentDefinitionItem.componentDefinition)) {
            this.convertComponentLayout(componentDefinitionItem.componentDefinition);
        }
    }
    isViewDefinitionItem(componentDefinition) {
        return !componentDefinition.parentComponentDefinition;
    }
    convertViewLayout(viewDefinition) {
        const layout = this.rxJsonParserService.tryParseJson(viewDefinition.layout);
        if (isNil(layout.layoutTemplate) || get(layout, 'columns[0].role')) {
            // for views from new designer, or for views with 1 or more columns
            this.convertComponentLayout(viewDefinition);
        }
        else {
            // for views with header and/or footer
            const childrenWithRoles = get(layout, 'columns[0].children', []);
            const outlets = childrenWithRoles.map((child, i) => {
                let outletItem;
                if (child.role) {
                    outletItem = {
                        name: child.role === ViewLayoutRole.Content ? RX_VIEW_DEFINITION.defaultOutletName : child.role,
                        static: child.static || null,
                        height: child.height || null,
                        role: child.role || null,
                        columns: (child.columns || []).map(this.convertColumns.bind(this))
                    };
                }
                else {
                    // creating outlets for case when components are sibling to header/footer
                    outletItem = {
                        name: `outlet-${i}`,
                        columns: [{ children: [child.componentDefinitionId] }]
                    };
                }
                return outletItem;
            });
            const newLayout = { outlets };
            viewDefinition.layout = JSON.stringify(newLayout);
        }
    }
    convertComponentLayout(componentDefinition) {
        if (componentDefinition.layout) {
            const layout = this.rxJsonParserService.tryParseJson(componentDefinition.layout);
            // add columns to views created in new designer
            // todo remove after new designer will save layouts with columns
            const children = get(layout, 'outlets[0].children');
            if (children) {
                componentDefinition.layout = JSON.stringify(this.convertNewDesignerLayout(layout));
            }
            if (layout && layout.componentDefinitionId) {
                const newLayout = {
                    outlets: [
                        {
                            name: RX_VIEW_DEFINITION.defaultOutletName,
                            columns: layout.columns.map(this.convertColumns.bind(this))
                        }
                    ]
                };
                componentDefinition.layout = JSON.stringify(newLayout);
            }
        }
    }
    convertNewDesignerLayout(layout) {
        const children = get(layout, 'outlets[0].children');
        if (children) {
            layout.outlets[0].columns = [
                {
                    children
                }
            ];
            delete layout.outlets[0].children;
        }
        return layout;
    }
    convertColumns(column) {
        // rx-tab-container was placed 1 lever deeper in the layout of rx-tab-panel in views
        // created in AngularJS view designer. 'columns[0].children[0]' should extract it.
        return {
            span: column.span || null,
            cssClass: `col-sm-${column.span || 12}`,
            children: column.children.map((child) => get(child, 'columns[0].children[0].componentDefinitionId') || child.componentDefinitionId)
        };
    }
    isContainerComponentDefinition(componentDefinition) {
        return componentDefinition.componentDefinitions !== undefined;
    }
}
RxOldViewLayoutAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOldViewLayoutAdapterService, deps: [{ token: i1.RxJsonParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxOldViewLayoutAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOldViewLayoutAdapterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOldViewLayoutAdapterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxJsonParserService }]; } });
//# sourceMappingURL=old-view-layout-adapter.service.js.map