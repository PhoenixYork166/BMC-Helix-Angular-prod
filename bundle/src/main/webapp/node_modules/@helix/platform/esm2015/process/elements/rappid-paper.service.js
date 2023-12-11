import { Injectable } from '@angular/core';
import { assign, compact, debounce, find, forEach, includes, map } from 'lodash';
import { RxProcessElementSearchService } from '@helix/platform/process/api';
import { RX_GUID, RxIdService, RxTreeService } from '@helix/platform/utils';
import { RX_DESIGNER_ELEMENT_SHAPE } from '@helix/platform/shared/api';
import { RxDesignerCellHighlighter } from './designer-cell-highlighter.class';
import { RxProcessElementService } from './process-element.service';
import * as processShapes from './process-shapes';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "./process-element.service";
import * as i3 from "@helix/platform/process/api";
export class RxRappidPaperService {
    constructor(rxIdService, rxProcessElementService, rxProcessElementSearchService, rxTreeService) {
        this.rxIdService = rxIdService;
        this.rxProcessElementService = rxProcessElementService;
        this.rxProcessElementSearchService = rxProcessElementSearchService;
        this.rxTreeService = rxTreeService;
        this.green = '#89c341';
        this.gray = '#999999';
        this.red = '#f83200';
        assign(joint.shapes.bpmn.icons, RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons);
    }
    init(element, graph, shouldZoomToFit = false) {
        // : PaperScroller
        // Do not instantiate paper with width or height parameters equal to 0, (e.g element is hidden in the DOM),
        // otherwise it will cause RappidJS issue in the Firefox Browser. See DRIST-18107 for more details.
        const paper = new joint.dia.Paper({
            width: element.width || 1,
            height: element.height || 1,
            model: new joint.dia.Graph({}, {
                cellNamespace: processShapes
            }),
            cellViewNamespace: processShapes,
            interactive: false,
            // specifying a non-existent theme to prevent rappid from overriding our styles
            // due to 'default' theme being applied
            theme: 'rx'
        });
        const paperScroller = new joint.ui.PaperScroller({
            autoResizePaper: true,
            paper: paper,
            padding: {
                padding: 10
            }
        });
        element.appendChild(paperScroller.render().el);
        paperScroller.options.paper.on('blank:pointerdown', paperScroller.startPanning);
        this.resetScroll(paperScroller);
        if (graph) {
            paperScroller.options.paper.model.fromJSON(graph);
            if (shouldZoomToFit) {
                this.zoomToFit(paperScroller);
            }
        }
        return paperScroller;
    }
    setGraph(paperScroller, processDefinition, processInstance, shouldZoomToFit = false) {
        const graph = this.rxProcessElementService.getGraph(processDefinition);
        const paper = paperScroller.options.paper;
        paper.model.fromJSON(graph);
        if (shouldZoomToFit) {
            this.zoomToFit(paperScroller);
        }
        forEach(processInstance.activities, (activity) => {
            const activityId = this.rxIdService.getBase(activity.activityId);
            const cell = paper.findViewByModel(activityId);
            if (cell) {
                if (activity.activities.length && cell.model.get('expanded')) {
                    const subProcessActivities = this.rxTreeService.flattenTree(activity, 'activities');
                    const elements = paper.model.getElements();
                    const graphIds = map(elements, 'id');
                    const originalGraphIds = compact(map(elements, (element) => element.get('originalGuid')));
                    forEach(subProcessActivities, (subProcessActivity) => {
                        // we need to do this check in order to filter inner elements that are in process
                        // instance json but are not present in graph as their parent is not expanded
                        if (includes(graphIds, this.rxIdService.getBase(subProcessActivity.activityId))) {
                            this.highlightActivity(subProcessActivity, paper, processDefinition);
                        }
                        else if (originalGraphIds && includes(originalGraphIds, subProcessActivity.activityId)) {
                            this.highlightActivity(subProcessActivity, paper, processDefinition);
                        }
                    });
                    this.highlightActivity(activity, paper, processDefinition);
                }
                else {
                    this.highlightActivity(activity, paper, processDefinition);
                }
            }
        });
        if (processInstance.exceptionMessage) {
            // exceptionMessage will be like <activityName>(<acitivityGuid>) - [<errorMessage>]
            // RegExp - find guid from exceptionMessage
            const guidPattern = new RegExp('\\((' + RX_GUID.baseIdPattern + ')\\)', 'i');
            const activityId = guidPattern.exec(processInstance.exceptionMessage);
            if (activityId[0]) {
                const activityBaseId = this.rxIdService.getBase(activityId[1]);
                this.highlightCell(activityBaseId, paper, this.red, processDefinition);
            }
        }
        this.resetScroll(paperScroller);
    }
    highlight(cellView, color) {
        if (cellView instanceof joint.dia.CellView) {
            const cellHighlighter = new RxDesignerCellHighlighter(cellView);
            cellHighlighter.init({
                strokeWidth: 10,
                color: color
            });
        }
    }
    highlightActivity(activity, paper, plainProcessDefinition) {
        const activityId = this.rxIdService.getBase(activity.activityId);
        const color = activity.endTime ? this.gray : this.green;
        this.highlightCell(activityId, paper, color, plainProcessDefinition);
    }
    highlightCell(cellId, paper, color, plainProcessDefinition) {
        const elements = paper.model.getElements();
        let cell;
        let cellView;
        if (!includes(map(elements, 'id'), cellId)) {
            cell = find(elements, (element) => element.get('originalGuid') === this.rxIdService.get(cellId));
            cellId = cell ? cell.id : cellId;
        }
        cellView = paper.findViewByModel(cellId);
        if (cellView) {
            this.highlight(cellView, color);
        }
        else {
            this.highlightVisibleErroredCell(cellId, false, paper, plainProcessDefinition);
            // Used to highlight errored cell inside expanded sub-processes
            paper.model.on('change', debounce(() => {
                this.highlightVisibleErroredCell(cellId, true, paper, plainProcessDefinition);
            }, 100));
        }
    }
    highlightVisibleErroredCell(cellId, isFirstEntry, paper, plainProcessDefinition) {
        const owner = this.rxProcessElementSearchService.findOwner(plainProcessDefinition, this.rxIdService.get(cellId));
        let cellView;
        let erroredElement;
        if (isFirstEntry) {
            erroredElement = find(owner.flowElements, { guid: this.rxIdService.get(cellId) });
            cellView = paper.findViewByModel(this.rxIdService.getBase(erroredElement.guid));
        }
        if (!cellView) {
            cellView = paper.findViewByModel(this.rxIdService.getBase(owner.guid));
        }
        if (cellView) {
            this.highlight(cellView, this.red);
        }
        else {
            this.highlightVisibleErroredCell(owner.guid, false, paper, plainProcessDefinition);
        }
    }
    resetScroll(paperScroller) {
        paperScroller.el.scrollTop = 0;
        paperScroller.el.scrollLeft = 0;
    }
    zoomToFit(paperScroller) {
        setTimeout(() => {
            paperScroller.zoomToFit({
                padding: 10
            });
        });
    }
}
RxRappidPaperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRappidPaperService, deps: [{ token: i1.RxIdService }, { token: i2.RxProcessElementService }, { token: i3.RxProcessElementSearchService }, { token: i1.RxTreeService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRappidPaperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRappidPaperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRappidPaperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxIdService }, { type: i2.RxProcessElementService }, { type: i3.RxProcessElementSearchService }, { type: i1.RxTreeService }]; } });
//# sourceMappingURL=rappid-paper.service.js.map