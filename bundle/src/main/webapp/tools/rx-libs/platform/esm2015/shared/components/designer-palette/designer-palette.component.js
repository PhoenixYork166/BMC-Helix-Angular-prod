import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
import * as i4 from "@angular/cdk/drag-drop";
export class RxDesignerPaletteComponent {
    constructor() {
        // TODO-VS: update types
        this.elementDropped = new EventEmitter();
        this.searchField = new FormControl();
    }
    // TODO-VS: update types
    onDropListDropped(dropData) {
        this.elementDropped.emit(dropData);
    }
    trackByLabelFn(index, item) {
        return item.label;
    }
}
RxDesignerPaletteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerPaletteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxDesignerPaletteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDesignerPaletteComponent, selector: "rx-designer-palette", inputs: { tree: "tree" }, outputs: { elementDropped: "elementDropped" }, ngImport: i0, template: "<adapt-rx-search placeholder=\"Search\" rx-id=\"palette-search-field\" [formControl]=\"searchField\"></adapt-rx-search>\n\n<adapt-accordion [multiselect]=\"true\">\n  <adapt-accordion-tab *ngFor=\"let node of tree; trackBy: trackByLabelFn\" [title]=\"node.label\" [isOpen]=\"true\">\n    <div class=\"node-container\" cdkDropList cdkDropListSortingDisabled (cdkDropListDropped)=\"onDropListDropped($event)\">\n      <div\n        *ngFor=\"let child of node.children; trackBy: trackByLabelFn\"\n        [attr.rx-id]=\"child.label\"\n        cdkDrag\n        [cdkDragData]=\"child\"\n      >\n        <ng-container [ngSwitch]=\"child.paletteItem.label\">\n          <ng-container *ngSwitchCase=\"'inner'\">\n            <div class=\"{{ child.paletteItem.shape }} border-{{ child.paletteItem.border }}\" [title]=\"child.label\">\n              <img\n                *ngIf=\"child.paletteItem.icon\"\n                class=\"icon-{{ child.paletteItem.icon.position }}\"\n                [src]=\"child.paletteItem.icon.path\"\n                [alt]=\"child.label\"\n              />\n\n              <div class=\"inner-label\">{{ child.label }}</div>\n            </div>\n          </ng-container>\n\n          <ng-container *ngSwitchCase=\"'outer'\">\n            <div class=\"{{ child.paletteItem.shape }}\" [title]=\"child.label\">\n              <div class=\"outer-icon border-{{ child.paletteItem.border }}\">\n                <img *ngIf=\"child.paletteItem.icon\" [src]=\"child.paletteItem.icon.path\" [alt]=\"child.label\" />\n              </div>\n\n              <div class=\"outer-label\">{{ child.label }}</div>\n            </div>\n          </ng-container>\n\n          <ng-container *ngSwitchDefault>\n            <div class=\"{{ child.paletteItem.shape }}\" [title]=\"child.label\"></div>\n          </ng-container>\n        </ng-container>\n      </div>\n    </div>\n  </adapt-accordion-tab>\n</adapt-accordion>\n", styles: [".node-container{display:grid;grid-template-columns:repeat(3,1fr);grid-column-gap:5px;grid-row-gap:8px;font-size:12px}.rectangle{display:flex;justify-content:center;align-items:center;position:relative;width:75px;height:65px;padding:0 5px;border-radius:5px;cursor:move}.circle{display:flex;flex-direction:column;justify-content:center;align-items:center;cursor:move}.circle .outer-icon{display:flex;justify-content:center;align-items:center;align-self:center;width:50px;height:50px;border-radius:50%}.circle .outer-icon img{width:80%}.square{display:flex;flex-direction:column;justify-content:center;align-items:center;padding-top:10px;cursor:move}.square .outer-icon{display:flex;justify-content:center;align-items:center;width:40px;height:40px;margin-bottom:10px;transform:rotate(45deg)}.square .outer-icon img{width:80%;transform:rotate(-45deg)}.annotation{width:20px;height:55px;border-style:solid;border-width:3px;border-color:#666;border-right-style:none!important;cursor:move}.border-solid{border-style:solid;border-width:2px;border-color:#666}.border-bold{border-style:solid;border-width:4px;border-color:#666}.border-dashed{border-style:dashed;border-width:1px;border-color:#666}.border-double{border-style:double;border-width:5px;border-color:#666}.icon-top{position:absolute;left:1px;top:2px;width:12px}.icon-bottom{position:absolute;bottom:2px;left:50%;width:10px;border-style:solid;border-width:1px;transform:translate(-50%)}.inner-label{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;text-align:center}.outer-label{padding-top:5px;text-align:center}\n"], components: [{ type: i1.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i4.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgSwitchDefault, selector: "[ngSwitchDefault]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerPaletteComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-designer-palette',
                    templateUrl: './designer-palette.component.html',
                    styleUrls: ['./designer-palette.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { tree: [{
                type: Input
            }], elementDropped: [{
                type: Output
            }] } });
//# sourceMappingURL=designer-palette.component.js.map