import { Injectable } from '@angular/core';
import { RxJsonParserService } from '@helix/platform/utils';
import { RxViewDefinitionParserService, RxViewLayout } from '@helix/platform/view/api';
import { find, forEach, pull } from 'lodash';
import { RX_RECORD_GRID } from '../record-grid.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@helix/platform/view/api";
export class RxRecordGridDesignAdapterService {
    constructor(rxJsonParserService, rxViewDefinitionParserService) {
        this.rxJsonParserService = rxJsonParserService;
        this.rxViewDefinitionParserService = rxViewDefinitionParserService;
    }
    adaptDefinition(elementDefinition) {
        var _a, _b, _c, _d, _e;
        const layout = this.rxJsonParserService.tryParseJson(elementDefinition.layout);
        const rowActionsOutlet = find(layout.outlets, { name: RX_RECORD_GRID.rowActionsOutletName });
        elementDefinition.propertiesByName.enableFilterPresets =
            (_a = elementDefinition.propertiesByName.enableFilterPresets) !== null && _a !== void 0 ? _a : 'true';
        if (!rowActionsOutlet) {
            layout.outlets.push(RxViewLayout.getOutlet(RX_RECORD_GRID.rowActionsOutletName));
        }
        else {
            // move row actions to the end to make sure they are in the same order as in layout outlet
            forEach((_b = rowActionsOutlet.columns[0]) === null || _b === void 0 ? void 0 : _b.children, (rowActionGuid) => {
                const rowAction = find(elementDefinition.componentDefinitions, { guid: rowActionGuid });
                pull(elementDefinition.componentDefinitions, rowAction).push(rowAction);
            });
        }
        elementDefinition.layout = JSON.stringify(layout);
        Object.assign(elementDefinition.propertiesByName, {
            expandable: (_c = elementDefinition.propertiesByName.expandable) !== null && _c !== void 0 ? _c : false,
            showDataForAllLocales: (_d = elementDefinition.propertiesByName.showDataForAllLocales) !== null && _d !== void 0 ? _d : false,
            requiredFilters: (_e = elementDefinition.propertiesByName.requiredFilters) !== null && _e !== void 0 ? _e : (elementDefinition.propertiesByName.requireFiltering === 'true' ? 1 : 0)
        });
        delete elementDefinition.propertiesByName.requireFiltering;
        this.rxViewDefinitionParserService
            .getComponents(elementDefinition)
            .map((componentDefinition) => componentDefinition.componentDefinition)
            .forEach((componentDefinition) => {
            var _a, _b;
            if (componentDefinition.type === RX_RECORD_GRID.components.column) {
                Object.assign(componentDefinition.propertiesByName, {
                    wrapText: (_a = componentDefinition.propertiesByName.wrapText) !== null && _a !== void 0 ? _a : false,
                    typeaheadKeystrokeCount: Number((_b = componentDefinition.propertiesByName.typeaheadKeystrokeCount) !== null && _b !== void 0 ? _b : RX_RECORD_GRID.defaultTypeaheadKeystrokeCount)
                });
            }
        });
    }
}
RxRecordGridDesignAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridDesignAdapterService, deps: [{ token: i1.RxJsonParserService }, { token: i2.RxViewDefinitionParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordGridDesignAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridDesignAdapterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridDesignAdapterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxJsonParserService }, { type: i2.RxViewDefinitionParserService }]; } });
//# sourceMappingURL=record-grid-design-adapter.service.js.map