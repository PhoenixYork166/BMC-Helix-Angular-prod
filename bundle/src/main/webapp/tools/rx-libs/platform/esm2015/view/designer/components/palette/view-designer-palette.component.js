import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RxStringService } from '@helix/platform/utils';
import { groupBy, lowerCase, map as _map, sortBy, flow } from 'lodash';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { RX_VIEW_DESIGNER } from '../../view-designer.constant';
import { combineLatest, ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
import * as i5 from "@angular/cdk/drag-drop";
export class ViewDesignerPaletteComponent {
    constructor(stringService) {
        this.stringService = stringService;
        this.allowedDropListIds = [];
        this.filterFormControl = new FormControl();
        this.componentsSubject$ = new ReplaySubject(1);
    }
    set components(value) {
        this.componentsSubject$.next(value);
    }
    ngOnInit() {
        this.viewComponentGroups$ = combineLatest([
            this.filterFormControl.valueChanges.pipe(debounceTime(200), startWith(null)),
            this.componentsSubject$
        ]).pipe(map(([componentNameFilterText, viewComponentDescriptors]) => flow((descriptors) => groupBy(descriptors, (component) => component.group), (groupsByName) => _map(groupsByName, (components, groupName) => ({
            name: groupName,
            components: sortBy(components, (component) => isFinite(component.index) ? component.index : component.name)
        })), (groups) => sortBy(groups, (group) => {
            if (group.name === RX_VIEW_DESIGNER.stencilGroups.basicComponents.label) {
                return '1';
            }
            else if (group.name === RX_VIEW_DESIGNER.stencilGroups.recordEditorInputs.label) {
                return '2';
            }
            else {
                return '3' + lowerCase(group.name);
            }
        }), (groups) => componentNameFilterText
            ? groups
                .map((group) => (Object.assign(Object.assign({}, group), { components: group.components.filter((component) => this.stringService.caseInsensitiveSearch(component.name, componentNameFilterText)) })))
                .filter((group) => group.components.length)
            : groups)(viewComponentDescriptors)));
    }
    getViewComponentDragData(descriptor) {
        return {
            draggedViewComponentDescriptor: descriptor
        };
    }
    trackByNameFn(index, item) {
        return item.name;
    }
    ngOnDestroy() {
        this.componentsSubject$.complete();
    }
}
ViewDesignerPaletteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerPaletteComponent, deps: [{ token: i1.RxStringService }], target: i0.ɵɵFactoryTarget.Component });
ViewDesignerPaletteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ViewDesignerPaletteComponent, selector: "rx-view-designer-palette", inputs: { components: "components", allowedDropListIds: "allowedDropListIds" }, ngImport: i0, template: "<div class=\"search-field-container\">\n  <adapt-rx-search\n    [formControl]=\"filterFormControl\"\n    rx-id=\"stencil-search-field\"\n    placeholder=\"Search\"\n  ></adapt-rx-search>\n</div>\n\n<adapt-accordion [config]=\"{ multiselect: true, tabs: [] }\">\n  <adapt-accordion-tab\n    *ngFor=\"let viewComponentsGroup of viewComponentGroups$ | async; trackBy: trackByNameFn\"\n    [title]=\"viewComponentsGroup.name\"\n    [attr.rx-id]=\"stringService.toRxId(viewComponentsGroup.name)\"\n    [isOpen]=\"true\"\n  >\n    <div\n      class=\"group-items-container\"\n      cdkDropList\n      cdkDropListSortingDisabled\n      [cdkDropListConnectedTo]=\"allowedDropListIds\"\n    >\n      <div\n        *ngFor=\"let viewComponent of viewComponentsGroup.components; trackBy: trackByNameFn\"\n        [attr.rx-id]=\"viewComponent.type\"\n        class=\"group-item\"\n        cdkDrag\n        [cdkDragData]=\"getViewComponentDragData(viewComponent)\"\n      >\n        <div class=\"group-item-inner\">\n          <span class=\"item-image d-icon-{{ viewComponent.icon || 'wall' }}\"></span>\n\n          <span class=\"item-name\" title=\"{{ viewComponent.name }}\">\n            {{ viewComponent.name }}\n          </span>\n        </div>\n      </div>\n    </div>\n  </adapt-accordion-tab>\n</adapt-accordion>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block}.group-items-container{display:flex;flex-wrap:wrap}.group-items-container .group-item.cdk-drag-placeholder{width:33.3%}.group-item{border-right:1px solid #d6d7d8;border-bottom:1px solid #d6d7d8;text-align:center;width:33.3%;cursor:move;height:90px;padding:3px 0}.group-item.cdk-drag-preview{background:white;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.group-item.cdk-drag-placeholder{border:0;width:100px;height:40px;padding:0;position:relative;z-index:3}.group-item.cdk-drag-placeholder .group-item-inner{border:1px solid #d6d7d8;background:#fff}.group-item:nth-child(3n){border-right:none}.group-item-inner{position:relative;display:flex;flex-direction:column}.item-image{color:#626668;font-size:40px;height:54px;flex-grow:1}.item-name{font-size:10px;overflow:hidden;height:34px}.cdk-drag-placeholder{opacity:1!important}adapt-accordion-tab ::ng-deep .card-block{padding:0}.form-group{margin:10px 20px}.search-field-container{padding:.9375rem}\n"], components: [{ type: i2.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i2.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i2.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }], directives: [{ type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i5.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }], pipes: { "async": i4.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerPaletteComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-view-designer-palette',
                    templateUrl: './view-designer-palette.component.html',
                    styleUrls: ['./view-designer-palette.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.RxStringService }]; }, propDecorators: { components: [{
                type: Input
            }], allowedDropListIds: [{
                type: Input
            }] } });
//# sourceMappingURL=view-designer-palette.component.js.map