import { Component } from '@angular/core';
import { BaseViewComponent, RuntimeViewCanvasItemComponent } from '@helix/platform/view/runtime';
import { distinctUntilChanged, pluck, skip, takeUntil, tap } from 'rxjs/operators';
import { every, findIndex, get, isNil, isNull } from 'lodash';
import { RX_VIEW_DEFINITION } from '@helix/platform/view/api';
import { throwError } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/runtime";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
export class RxTabPanelComponent extends BaseViewComponent {
    constructor(runtimeCanvasItemComponent) {
        super();
        this.runtimeCanvasItemComponent = runtimeCanvasItemComponent;
        this.childLayouts = [];
        this.state = {
            activeTabIndex: null
        };
        this.api = {
            setProperty: this.setProperty.bind(this)
        };
    }
    ngOnInit() {
        super.ngOnInit();
        this.notifyPropertyChanged('api', this.api);
        this.config.pipe(takeUntil(this.destroyed$)).subscribe((config) => {
            this.state = Object.assign(Object.assign({}, this.state), config);
            this.isHidden = Boolean(this.state.hidden);
        });
        this.childLayouts = get(this.runtimeCanvasItemComponent.getChildren(RX_VIEW_DEFINITION.defaultOutletName), '[0].children');
        this.childLayouts.forEach((childLayout) => {
            childLayout.state = {
                enableLazyLoading: false,
                label: '',
                isRendered: false,
                hidden: 0
            };
            childLayout.config
                .pipe(tap((childLayoutConfig) => {
                childLayout.state = Object.assign(Object.assign({}, childLayout.state), childLayoutConfig);
            }), pluck('hidden'), distinctUntilChanged(), skip(1), takeUntil(this.destroyed$))
                .subscribe(() => {
                this.ensureActiveTabIsSet();
            });
        });
        this.trySetFirstVisibleTab();
    }
    setProperty(propertyPath, propertyValue) {
        if (propertyPath === 'hidden') {
            this.state.hidden = propertyValue;
            this.notifyPropertyChanged(propertyPath, propertyValue);
        }
        else if (propertyPath === 'activeTabIndex') {
            this.setActiveTabIndex(parseInt(propertyValue, 10));
        }
        else {
            return throwError(`Tab panel: property ${propertyPath} is not settable.`);
        }
    }
    trackByForTabs(index, item) {
        return item.guid;
    }
    canRenderContentForTab(tab) {
        return !tab.state.enableLazyLoading || tab.state.isRendered;
    }
    getAllTabsData() {
        let adaptTabsetIndex = 0;
        return this.childLayouts.map((tab) => {
            return {
                adaptTabsetIndex: this.isHiddenTab(tab) ? null : adaptTabsetIndex++,
                tab
            };
        });
    }
    isHiddenTab(tab) {
        return Boolean(tab.state.hidden);
    }
    getActiveTabIndexForAdaptTabset() {
        return isNull(this.state.activeTabIndex) ? 0 : this.getAllTabsData()[this.state.activeTabIndex].adaptTabsetIndex;
    }
    onActiveTabChanged(adaptTabsetIndex) {
        const activeTabIndexForAllTabs = findIndex(this.getAllTabsData(), (tab) => tab.adaptTabsetIndex === adaptTabsetIndex);
        this.activateTab(activeTabIndexForAllTabs);
    }
    setActiveTabIndex(index) {
        const tab = this.childLayouts[index];
        if (tab && !this.isHiddenTab(tab)) {
            this.activateTab(index);
        }
    }
    activateTab(index) {
        this.state.activeTabIndex = index;
        if (!isNil(index)) {
            this.childLayouts[index].state.isRendered = true;
        }
        this.notifyPropertyChanged('activeTabIndex', index);
    }
    ensureActiveTabIsSet() {
        const allTabs = this.childLayouts;
        const isAllTabsHidden = every(allTabs, (tab) => this.isHiddenTab(tab));
        if (isAllTabsHidden) {
            this.activateTab(null);
        }
        else if (!isNull(this.state.activeTabIndex) && this.isHiddenTab(allTabs[this.state.activeTabIndex])) {
            this.trySetFirstVisibleTab();
        }
        else if (isNull(this.state.activeTabIndex)) {
            this.trySetFirstVisibleTab();
        }
    }
    trySetFirstVisibleTab() {
        const firstVisibleTab = findIndex(this.childLayouts, (tab) => !this.isHiddenTab(tab));
        if (firstVisibleTab !== -1) {
            this.activateTab(firstVisibleTab);
        }
    }
}
RxTabPanelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTabPanelComponent, deps: [{ token: i1.RuntimeViewCanvasItemComponent }], target: i0.ɵɵFactoryTarget.Component });
RxTabPanelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxTabPanelComponent, selector: "rx-tab-panel", usesInheritance: true, ngImport: i0, template: "<adapt-tabset\n  *ngIf=\"!isHidden\"\n  [fullHeight]=\"true\"\n  (tab-active-changed)=\"onActiveTabChanged($event.index)\"\n  [tab-active]=\"getActiveTabIndexForAdaptTabset()\"\n>\n  <ng-template ngFor let-tab [ngForOf]=\"childLayouts\" [ngForTrackBy]=\"trackByForTabs\" let-index=\"index\">\n    <adapt-tab-panel [adapt-tab-title]=\"tab.state.label\" *ngIf=\"!isHiddenTab(tab)\">\n      <rx-runtime-view-canvas-item *ngIf=\"canRenderContentForTab(tab)\" [layout]=\"tab\"> </rx-runtime-view-canvas-item>\n    </adapt-tab-panel>\n\n    <!-- Hidden tab should have instance for using API  -->\n    <rx-runtime-view-canvas-item *ngIf=\"isHiddenTab(tab) && canRenderContentForTab(tab)\" [layout]=\"tab\">\n    </rx-runtime-view-canvas-item>\n  </ng-template>\n</adapt-tabset>\n", components: [{ type: i2.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i2.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i1.RuntimeViewCanvasItemComponent, selector: "rx-runtime-view-canvas-item", inputs: ["layout"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTabPanelComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-tab-panel',
                    templateUrl: './tab-panel.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RuntimeViewCanvasItemComponent }]; } });
//# sourceMappingURL=tab-panel.component.js.map