import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RxProcessElementsService, RX_PROCESS_DEFINITION } from '@helix/platform/process/api';
import { RxDesignerStencilBuilder } from '@helix/platform/shared/api';
import { ValueAccessor } from '@helix/platform/shared/components';
import { RxJsonParserService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { flatten, forEach, isEmpty, isEqual, map, some } from 'lodash';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/process/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@angular/common";
export class RxProcessDesignerElementPickerComponent extends ValueAccessor {
    constructor(rxDesignerStencilBuilder, rxJsonParserService, rxProcessElementsService, renderer, translateService) {
        super();
        this.rxDesignerStencilBuilder = rxDesignerStencilBuilder;
        this.rxJsonParserService = rxJsonParserService;
        this.rxProcessElementsService = rxProcessElementsService;
        this.renderer = renderer;
        this.translateService = translateService;
        this.selection = [];
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        const paletteElementsControl = this.innerValue;
        this.selectedPaletteElements =
            paletteElementsControl === '*' ? '*' : this.rxJsonParserService.tryParseJson(paletteElementsControl, null);
        this.rxDesignerStencilBuilder
            .buildElementsTree(this.rxProcessElementsService.getProcessElements(), RX_PROCESS_DEFINITION.standardProcessElementGroups)
            .pipe(take(1))
            .subscribe((processElementsTree) => {
            forEach(processElementsTree, (group) => {
                var _a;
                group.expanded = true;
                group.allChildElementsSelected = true;
                if ((_a = this.selectedPaletteElements) === null || _a === void 0 ? void 0 : _a.length) {
                    forEach(group.children, (element) => {
                        if (this.selectedPaletteElements === '*' ||
                            some(this.selectedPaletteElements, (selectedPaletteElement) => isEqual(selectedPaletteElement, element.value))) {
                            this.selection.push(element);
                        }
                        else {
                            group.allChildElementsSelected = false;
                        }
                    });
                    if (group.allChildElementsSelected) {
                        this.selection.push(group);
                    }
                }
            });
            this.processElementsTree = [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.all-elements.label'),
                    expanded: true,
                    children: processElementsTree
                }
            ];
            this.stencilElements = flatten(map(processElementsTree, 'children'));
            if (this.selectedPaletteElements === '*') {
                this.selection.push(...this.processElementsTree);
                this.selectedPaletteElements = map(this.stencilElements, 'value');
            }
            this.updatePickerFakeInputValue();
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    onSelectionChange() {
        this.selectedPaletteElements = this.selection.filter((node) => !node.children).map((node) => node.value);
        if (this.selectedPaletteElements.length === 0) {
            this.selectedPaletteElements = null;
            this.value = null;
        }
        else if (this.stencilElements.length === this.selectedPaletteElements.length) {
            this.value = '*';
        }
        else {
            this.value = JSON.stringify(this.selectedPaletteElements);
        }
        this.updatePickerFakeInputValue();
    }
    updatePickerFakeInputValue() {
        if (isEmpty(this.selectedPaletteElements)) {
            this.selectedPaletteElementsByLabel = '';
        }
        else if (this.stencilElements.length === this.selectedPaletteElements.length) {
            this.selectedPaletteElementsByLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.all.label');
        }
        else if (this.selectedPaletteElements.length === 1) {
            this.selectedPaletteElementsByLabel = this.translateService.instant('com.bmc.arsys.rx.client.process-designer.one-element-selected.label');
        }
        else {
            this.selectedPaletteElementsByLabel = this.translateService.instant('com.bmc.arsys.rx.client.process-designer.many-elements-selected.label', {
                count: this.selectedPaletteElements.length
            });
        }
    }
    clearDefinition(e) {
        e.stopPropagation();
        this.selection = [];
        this.selectedPaletteElements = null;
        this.selectedPaletteElementsByLabel = '';
        this.value = null;
    }
    setDropdownWidth() {
        setTimeout(() => {
            const dropdownButton = this.renderer.selectRootElement(this.dropdownButton.nativeElement, true);
            // 2px - border
            this.dropdownWidth = Math.max(dropdownButton.clientWidth) + 2;
        });
    }
}
RxProcessDesignerElementPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDesignerElementPickerComponent, deps: [{ token: i1.RxDesignerStencilBuilder }, { token: i2.RxJsonParserService }, { token: i3.RxProcessElementsService }, { token: i0.Renderer2 }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxProcessDesignerElementPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxProcessDesignerElementPickerComponent, selector: "rx-process-designer-element-picker", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RxProcessDesignerElementPickerComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "dropdownButton", first: true, predicate: ["dropdownButton"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<adapt-rx-control-label [label]=\"options.label\"></adapt-rx-control-label>\n\n<div\n  adaptDropdown\n  appendToBody=\"true\"\n  autoClose=\"outside\"\n  class=\"dropdown\"\n  placement=\"bottom-left\"\n  (onOpen)=\"setDropdownWidth()\"\n>\n  <button\n    adaptDropdownToggle\n    class=\"btn btn-secondary d-flex text-center w-100\"\n    rx-id=\"toggle-button\"\n    type=\"button\"\n    #dropdownButton\n  >\n    <span class=\"rx-selected-item text-left flex-grow-1\">{{ selectedPaletteElementsByLabel }}</span>\n\n    <span rx-id=\"clear-button\" class=\"d-icon-cross_adapt btn-link\" (click)=\"clearDefinition($event)\" *ngIf=\"value\">\n    </span>\n  </button>\n\n  <div class=\"dropdown-menu px-3\" [style.width.px]=\"dropdownWidth\" adaptDropdownMenu>\n    <adapt-tree\n      [value]=\"processElementsTree\"\n      [selectionMode]=\"'checkbox'\"\n      [(selection)]=\"selection\"\n      (selectionChange)=\"onSelectionChange()\"\n    ></adapt-tree>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-selected-item{min-height:20px}span[rx-id=clear-button]{cursor:pointer;margin-right:5px}span[rx-id=clear-button]:not(:hover){color:#313538}.dropdown-menu{height:400px}\n"], components: [{ type: i5.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i5.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i5.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }], directives: [{ type: i5.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDesignerElementPickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-process-designer-element-picker',
                    templateUrl: './process-designer-element-picker.component.html',
                    styleUrls: ['./process-designer-element-picker.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RxProcessDesignerElementPickerComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDesignerStencilBuilder }, { type: i2.RxJsonParserService }, { type: i3.RxProcessElementsService }, { type: i0.Renderer2 }, { type: i4.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }], dropdownButton: [{
                type: ViewChild,
                args: ['dropdownButton', { static: true }]
            }] } });
//# sourceMappingURL=process-designer-element-picker.component.js.map