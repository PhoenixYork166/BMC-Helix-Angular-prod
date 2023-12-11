import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { isString, throttle } from 'lodash';
import { asapScheduler } from 'rxjs';
import { ViewDesignerCanvasService } from '../../view-designer-canvas.service';
import { CanvasOutletHelperService } from '../canvas-outlet/canvas-outlet-helper.service';
import * as i0 from "@angular/core";
import * as i1 from "../../view-designer-canvas.service";
import * as i2 from "../canvas-outlet/canvas-outlet-helper.service";
import * as i3 from "../canvas-item/canvas-item.component";
import * as i4 from "@angular/cdk/drag-drop";
import * as i5 from "@angular/common";
export class CanvasItemColumnComponent {
    constructor(viewDesignerCanvasService, canvasOutletHelperService) {
        this.viewDesignerCanvasService = viewDesignerCanvasService;
        this.canvasOutletHelperService = canvasOutletHelperService;
        this.dropListDropped = new EventEmitter();
        this.dropListEnterPredicateBind = throttle(this.dropListEnterPredicate.bind(this), 200);
    }
    ngOnInit() {
        this.dropListOrientation = this.canvasOutletHelperService.dropListOrientation;
    }
    getViewComponentDragData(layout) {
        return {
            draggedViewComponentGuid: layout.guid,
            draggedViewComponentDescriptor: layout.descriptor,
            draggedViewComponentParents: this.layout.viewComponentWithParents
        };
    }
    onDragEntered(event) {
        this.enforceDragToSelf(event.container);
    }
    onDragStarted(event) {
        this.enforceDragToSelf(event.source.dropContainer);
    }
    remove(event, layout) {
        event.stopPropagation();
        this.viewDesignerCanvasService.removeComponent(layout.guid);
    }
    onSelectComponent(event, layout) {
        event.stopPropagation();
        this.viewDesignerCanvasService.selectComponent(layout.guid);
    }
    trackByFn(index, item) {
        return item.guid;
    }
    dropListEnterPredicate(event) {
        return this.canvasOutletHelperService.canBeDropped(Object.assign(Object.assign({}, event.data), { dropTargetViewComponentWithParents: this.layout.viewComponentWithParents || [] }));
    }
    // todo remove after
    // https://github.com/angular/components/issues/16671
    // will be fixed
    enforceDragToSelf(dropList) {
        let siblings = dropList.connectedTo;
        siblings = siblings.reduce((result, item) => {
            if (isString(item)) {
                const listInstance = CdkDropList['_dropLists'].find((list) => list.id === item);
                if (listInstance) {
                    result.push(listInstance);
                }
            }
            return result;
        }, []);
        const dropListRef = dropList._dropListRef;
        asapScheduler.schedule(() => {
            dropListRef.connectedTo(siblings.map((list) => list._dropListRef));
        });
    }
}
CanvasItemColumnComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemColumnComponent, deps: [{ token: i1.ViewDesignerCanvasService }, { token: i2.CanvasOutletHelperService }], target: i0.ɵɵFactoryTarget.Component });
CanvasItemColumnComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CanvasItemColumnComponent, selector: "rx-canvas-item-column", inputs: { isReadOnly: "isReadOnly", colIndex: "colIndex", column: "column", layout: "layout" }, outputs: { dropListDropped: "dropListDropped" }, ngImport: i0, template: "<div\n  cdkDropList\n  [cdkDropListOrientation]=\"dropListOrientation\"\n  [cdkDropListConnectedTo]=\"column.dndListIds\"\n  (cdkDropListDropped)=\"dropListDropped.next($event)\"\n  [cdkDropListEnterPredicate]=\"dropListEnterPredicateBind\"\n  [cdkDropListData]=\"{ columnIndex: colIndex }\"\n  [id]=\"column.listId\"\n>\n  <!-- mw-100 class is used for DnD to restrict component width, see DRD21-5845 for more details -->\n  <div\n    class=\"canvas-item-wrapper mw-100 canvas-{{ layout.descriptor.type }}\"\n    cdkDrag\n    [cdkDragData]=\"getViewComponentDragData(layout)\"\n    [cdkDragDisabled]=\"isReadOnly || layout.descriptor.options?.static\"\n    (cdkDragEntered)=\"onDragEntered($event)\"\n    (cdkDragStarted)=\"onDragStarted($event)\"\n    *ngFor=\"let layout of column.children; let last = last; trackBy: trackByFn\"\n  >\n    <div class=\"canvas-item\" [class.active]=\"layout.isSelected$ | async\" (click)=\"onSelectComponent($event, layout)\">\n      <div class=\"canvas-item-header\" [hidden]=\"!(layout.isSelected$ | async)\" cdkDragHandle>\n        <span class=\"icon d-icon-dots mr-1\"></span>\n        <span class=\"label\">{{ layout.label }}</span>\n\n        <button\n          (click)=\"remove($event, layout)\"\n          *ngIf=\"!isReadOnly && !layout.descriptor.options?.static\"\n          class=\"remove-button btn btn-sm btn-link d-icon-cross_adapt p-0 px-1\"\n          type=\"button\"\n          aria-label=\"Close\"\n        ></button>\n      </div>\n\n      <rx-canvas-item [layout]=\"layout\" [isReadOnly]=\"isReadOnly\"></rx-canvas-item>\n    </div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block}.cdk-drop-list{min-height:100px}.cdk-drop-list>.cdk-drag-placeholder{opacity:.5}.card-header{cursor:move}.canvas-item-wrapper.cdk-drag-preview{background:white;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.canvas-item{border:1px solid transparent;position:relative;padding:3px}.canvas-item.active{border-color:#20c997}.canvas-item-header{color:#fff;position:absolute;top:0;right:0;padding:1px 0 1px 5px;background:#20c997;cursor:move;z-index:1;display:flex}.canvas-item-header .label{white-space:nowrap}.remove-button{color:#fff}\n"], components: [{ type: i3.CanvasItemComponent, selector: "rx-canvas-item", inputs: ["layout", "interactive", "isReadOnly"] }], directives: [{ type: i4.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i4.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i5.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemColumnComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-canvas-item-column',
                    templateUrl: './canvas-item-column.component.html',
                    styleUrls: ['./canvas-item-column.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ViewDesignerCanvasService }, { type: i2.CanvasOutletHelperService }]; }, propDecorators: { isReadOnly: [{
                type: Input
            }], colIndex: [{
                type: Input
            }], column: [{
                type: Input
            }], layout: [{
                type: Input
            }], dropListDropped: [{
                type: Output
            }] } });
//# sourceMappingURL=canvas-item-column.component.js.map