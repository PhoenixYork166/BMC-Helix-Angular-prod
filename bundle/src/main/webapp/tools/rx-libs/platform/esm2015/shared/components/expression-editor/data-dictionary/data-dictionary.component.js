import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { isArray, map as _map, uniqueId, flow, compact } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../data-dictionary-node/data-dictionary-node.component";
export class DataDictionaryComponent {
    constructor() {
        this.nodeSelected = new EventEmitter();
        this.dragStart = new EventEmitter();
    }
    onDragStart(event) {
        const value = event.target.getAttribute('rx-expression');
        if (value) {
            event.dataTransfer.setData('value', value);
        }
        else {
            event.preventDefault();
        }
    }
    ngOnChanges(changes) {
        if (changes.dataDictionary) {
            this.tree = this.prepareTreeForAdapt(this.dataDictionary);
        }
    }
    onNodeExpand(e) { }
    onNodeSelected(node) {
        this.nodeSelected.next(node);
    }
    prepareTreeForAdapt(dataDictionary) {
        return flow((dictionary) => _map(dictionary, (element) => {
            var _a;
            return !element.hidden && (element.expression || ((_a = element.children) === null || _a === void 0 ? void 0 : _a.length))
                ? {
                    label: element.label,
                    children: this.prepareTreeForAdapt(element.children),
                    expanded: element.expanded,
                    data: {
                        expression: isArray(element.expression) ? element.expression[0] : element.expression,
                        icon: element.icon,
                        info: element.info
                    },
                    key: uniqueId(),
                    draggable: Boolean(element.expression)
                }
                : null;
        }), (dictionary) => compact(dictionary))(dataDictionary);
    }
}
DataDictionaryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataDictionaryComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DataDictionaryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataDictionaryComponent, selector: "rx-data-dictionary", inputs: { dataDictionary: "dataDictionary" }, outputs: { nodeSelected: "nodeSelected", dragStart: "dragStart" }, host: { listeners: { "dragstart": "onDragStart($event)" } }, usesOnChanges: true, ngImport: i0, template: "<adapt-tree #treeComponent [value]=\"tree\" filter=\"true\" (onNodeExpand)=\"onNodeExpand($event)\" [draggableNodes]=\"true\">\n  <ng-template let-node adaptTreeNodeTemplate>\n    <rx-data-dictionary-node\n      [filterQuery]=\"treeComponent.filterQuery\"\n      [node]=\"node\"\n      (expressionNodeSelected)=\"onNodeSelected($event)\"\n    ></rx-data-dictionary-node>\n  </ng-template>\n</adapt-tree>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host::ng-deep .a-tree__content{align-items:center;cursor:default}:host::ng-deep .a-tree__label:hover{color:inherit}:host::ng-deep .a-tree__toggle{cursor:pointer}\n"], components: [{ type: i1.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i2.DataDictionaryNodeComponent, selector: "rx-data-dictionary-node", inputs: ["node", "filterQuery"], outputs: ["expressionNodeSelected"] }], directives: [{ type: i1.AdaptTreeNodeTemplateDirective, selector: "[adaptTreeNodeTemplate]", inputs: ["adaptTreeNodeTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataDictionaryComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-data-dictionary',
                    templateUrl: './data-dictionary.component.html',
                    styleUrls: ['./data-dictionary.component.scss']
                }]
        }], propDecorators: { dataDictionary: [{
                type: Input
            }], nodeSelected: [{
                type: Output
            }], dragStart: [{
                type: Output
            }], onDragStart: [{
                type: HostListener,
                args: ['dragstart', ['$event']]
            }] } });
//# sourceMappingURL=data-dictionary.component.js.map