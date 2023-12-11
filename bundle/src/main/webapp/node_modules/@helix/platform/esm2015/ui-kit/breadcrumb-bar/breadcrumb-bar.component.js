import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class RxBreadcrumbBarComponent {
    constructor() {
        this.items = [];
        this.selectedItem = new EventEmitter();
    }
    onSelectItem(item) {
        this.selectedItem.emit(item);
    }
    trackByFn(index, item) {
        return item.label;
    }
}
RxBreadcrumbBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBreadcrumbBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxBreadcrumbBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxBreadcrumbBarComponent, selector: "rx-breadcrumb-bar", inputs: { items: "items" }, outputs: { selectedItem: "selectedItem" }, ngImport: i0, template: "<ol *ngIf=\"items\" class=\"breadcrumb m-0 p-0\">\n  <li\n    *ngFor=\"let item of items; trackBy: trackByFn; let last = last\"\n    class=\"breadcrumb-item rx-ellipsis\"\n    [class.active]=\"last\"\n  >\n    <a (click)=\"onSelectItem(item)\" *ngIf=\"!last\" href=\"javascript:void(0)\">{{ item.label }}</a>\n    <span *ngIf=\"last\">{{ item.label }}</span>\n  </li>\n</ol>\n", directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBreadcrumbBarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-breadcrumb-bar',
                    templateUrl: './breadcrumb-bar.component.html'
                }]
        }], propDecorators: { items: [{
                type: Input
            }], selectedItem: [{
                type: Output
            }] } });
//# sourceMappingURL=breadcrumb-bar.component.js.map