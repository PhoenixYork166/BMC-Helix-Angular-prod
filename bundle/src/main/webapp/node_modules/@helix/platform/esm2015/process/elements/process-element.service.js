import { Injectable } from '@angular/core';
import { filter, map, startsWith } from 'lodash';
import { RxIdService, RxJsonParserService } from '@helix/platform/utils';
import { RxProcessElementSearchService } from '@helix/platform/process/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@helix/platform/process/api";
export class RxProcessElementService {
    constructor(rxIdService, rxJsonParserService, rxProcessElementSearchService) {
        this.rxIdService = rxIdService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxProcessElementSearchService = rxProcessElementSearchService;
    }
    // TODO-VS: remove in favour of getJsonObject
    getGraph(definition) {
        const graph = this.rxJsonParserService.tryParseJson(definition.layout, { cells: [] });
        graph.cells.forEach((cell) => {
            const embeddedElementIds = map(filter(graph.cells, { parent: cell.id }), 'id');
            if (startsWith(cell.type, 'rx.CallActivity')) {
                cell.type = 'rx.CallActivity';
            }
            if (startsWith(cell.type, 'rx.ProcessActions')) {
                cell.type = 'rx.ProcessAction';
            }
            if (embeddedElementIds.length) {
                cell.embeds = embeddedElementIds;
            }
            cell.processDefinitionName = definition.name;
            const flowElement = this.rxProcessElementSearchService.find(definition, {
                guid: this.rxIdService.get(cell.id)
            });
            if (flowElement === null || flowElement === void 0 ? void 0 : flowElement.multiInstanceLoopDefinition) {
                cell.multiInstanceLoopDefinition = flowElement.multiInstanceLoopDefinition;
            }
        });
        return graph;
    }
}
RxProcessElementService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementService, deps: [{ token: i1.RxIdService }, { token: i1.RxJsonParserService }, { token: i2.RxProcessElementSearchService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessElementService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxIdService }, { type: i1.RxJsonParserService }, { type: i2.RxProcessElementSearchService }]; } });
//# sourceMappingURL=process-element.service.js.map