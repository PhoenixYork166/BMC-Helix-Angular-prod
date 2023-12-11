import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AdaptDropdownDirective } from '@bmc-ux/adapt-angular';
import { ValueAccessor } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@helix/platform/shared/api";
export class RxCustomDataSourceProviderPickerComponent extends ValueAccessor {
    constructor(translateService, renderer) {
        super();
        this.translateService = translateService;
        this.renderer = renderer;
        this.defaultText = this.translateService.instant('com.bmc.arsys.rx.client.common.select.label');
    }
    setDropdownWidth() {
        const dropdownButton = this.renderer.selectRootElement(this.dropdownButton.nativeElement, true);
        this.dropdownWidth = dropdownButton.clientWidth + 2;
    }
    selectProvider(providerName) {
        this.dropdown.close();
        this.value = providerName;
    }
}
RxCustomDataSourceProviderPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomDataSourceProviderPickerComponent, deps: [{ token: i1.TranslateService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
RxCustomDataSourceProviderPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxCustomDataSourceProviderPickerComponent, selector: "rx-custom-data-source-provider-picker", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RxCustomDataSourceProviderPickerComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "dropdownButton", first: true, predicate: ["dropdownButton"], descendants: true, static: true }, { propertyName: "dropdown", first: true, predicate: ["providerPicker"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"d-flex\">\n  <adapt-rx-control-label\n    *ngIf=\"options.label\"\n    [label]=\"options.label | translate\"\n    [showRequiredLabel]=\"options.required\"\n  ></adapt-rx-control-label>\n</div>\n\n<div class=\"dropdown\" adaptDropdown [autoClose]=\"'outside'\" [autoFocusFirst]=\"false\" #providerPicker=\"adaptDropdown\">\n  <button\n    rx-id=\"toggle-button\"\n    #dropdownButton\n    class=\"btn btn-secondary\"\n    (click)=\"setDropdownWidth()\"\n    adaptDropdownToggle\n    type=\"button\"\n  >\n    <span class=\"rx-selected-item rx-ellipsis\">\n      {{ (value | rxDefinitionNamePipe) || defaultText }}\n    </span>\n  </button>\n\n  <div class=\"dropdown-menu p-0\" [style.width.px]=\"dropdownWidth\" adaptDropdownMenu>\n    <ul class=\"providers\" *ngIf=\"options.providersTree.length\">\n      <li\n        class=\"provider rx-ellipsis\"\n        *ngFor=\"let providersTreeNode of options.providersTree\"\n        (click)=\"providersTreeNode.isExpanded = !providersTreeNode.isExpanded\"\n      >\n        <span\n          rx-id=\"expand-button\"\n          class=\"expand-arrow d-icon-angle_right\"\n          [class.open]=\"providersTreeNode.isExpanded\"\n        ></span>\n        <span> {{ providersTreeNode.label }} </span>\n\n        <div *ngIf=\"providersTreeNode.isExpanded\">\n          <button\n            class=\"dropdown-item rx-ellipsis\"\n            type=\"button\"\n            *ngFor=\"let provider of providersTreeNode.providers\"\n            (click)=\"$event.stopPropagation(); selectProvider(provider)\"\n            [class.active]=\"value === provider\"\n          >\n            <span>{{ provider | rxDefinitionNamePipe }}</span>\n          </button>\n        </div>\n      </li>\n    </ul>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.expand-arrow{padding:5px;transition:.2s}.expand-arrow.open{transform:rotate(90deg)}.providers{overflow-y:auto;margin:0;list-style:none;padding:5px 0;width:100%;height:275px}.provider{width:100%;padding:0 5px;line-height:30px;cursor:pointer}span[rx-id=expand-button]{display:inline-flex;width:15px}.rx-selected-item{flex-grow:1}.dropdown-menu{height:330px}.dropdown-toggle{width:100%;display:flex;text-align:left}.dropdown-item{padding:0 15px 0 30px}\n"], components: [{ type: i2.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i2.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i2.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i1.TranslatePipe, "rxDefinitionNamePipe": i4.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomDataSourceProviderPickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-custom-data-source-provider-picker',
                    templateUrl: './custom-data-source-provider-picker.component.html',
                    styleUrls: ['./custom-data-source-provider-picker.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RxCustomDataSourceProviderPickerComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i0.Renderer2 }]; }, propDecorators: { options: [{
                type: Input
            }], dropdownButton: [{
                type: ViewChild,
                args: ['dropdownButton', { static: true }]
            }], dropdown: [{
                type: ViewChild,
                args: ['providerPicker', { static: true }]
            }] } });
//# sourceMappingURL=custom-data-source-provider-picker.component.js.map