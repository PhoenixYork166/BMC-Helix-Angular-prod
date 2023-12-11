import { Component, Input, ViewChild } from '@angular/core';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { findIndex, first } from 'lodash';
import { ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { TabPanelDesignModel } from './tab-panel-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@helix/platform/view/designer";
import * as i4 from "@angular/common";
export class TabPanelDesignComponent {
    constructor(rxUtilityModalsService) {
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.components = [];
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.model.tabContainerComponents$.pipe(takeUntil(this.destroyed$)).subscribe((components) => {
            this.components = components;
            this.adaptTabset.checkActiveIndex();
        });
        this.model.tabContainerComponents$.pipe(take(1)).subscribe((components) => {
            this.model.selectTab(first(components).guid, true);
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    trackByForTabs(index, item) {
        return item.guid;
    }
    onTabClicked(event) {
        this.activeTabChanged(event);
    }
    onTabAdded(e) {
        e.stopPropagation();
        this.model.addTab();
        setTimeout(() => {
            this.adaptTabset.setActiveTab(this.components.length - 1, true, new MouseEvent('click'));
        });
    }
    activeTabChanged({ index, event }) {
        event.stopPropagation();
        this.model.tabContainerGuids$.pipe(take(1)).subscribe((guids) => {
            this.model.selectTab(guids[index]);
        });
    }
    onTabDropped(tabs) {
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i].guid !== tabs[i].id) {
                if (this.components[i].guid === tabs[i + 1].id) {
                    this.model.moveComponent(tabs[i].id, i);
                    break;
                }
                else {
                    this.model.moveComponent(this.components[i].guid, findIndex(tabs, { id: this.components[i].guid }));
                    break;
                }
            }
        }
    }
    removeTab({ index }) {
        this.rxUtilityModalsService
            .confirm('Are you sure you want to delete this view component?')
            .then((isConfirmed) => {
            if (isConfirmed) {
                this.model.tabContainerGuids$.pipe(take(1)).subscribe((guids) => {
                    this.model.removeTab(guids[index]);
                });
            }
        });
    }
}
TabPanelDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TabPanelDesignComponent, deps: [{ token: i1.RxUtilityModalsService }], target: i0.ɵɵFactoryTarget.Component });
TabPanelDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TabPanelDesignComponent, selector: "rx-tab-panel-design", inputs: { model: "model", isReadOnly: "isReadOnly" }, viewQueries: [{ propertyName: "adaptTabset", first: true, predicate: ["adaptTabset"], descendants: true, static: true }], ngImport: i0, template: "<adapt-tabset\n  #adaptTabset\n  (tab-index-closed)=\"removeTab($event)\"\n  (tab-active-changed)=\"activeTabChanged($event)\"\n  (tabClicked)=\"onTabClicked($event)\"\n  (tabDropped)=\"onTabDropped($event)\"\n  (add-tab-clicked)=\"onTabAdded($event)\"\n  [allow-tabs-adding]=\"!isReadOnly\"\n  [enableDnD]=\"true\"\n>\n  <adapt-tab-panel\n    *ngFor=\"\n      let component of components;\n      let index = index;\n      trackBy: trackByForTabs\n    \"\n    [adapt-tab-title]=\"component.data.label\"\n    [icon-close]=\"!isReadOnly && components.length && components.length > 1\"\n    [id]=\"component.guid\"\n  >\n  </adapt-tab-panel>\n</adapt-tabset>\n\n<rx-canvas-outlet [dropPredicate]=\"model.dropPredicate\"></rx-canvas-outlet>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;border:1px solid #d6d7d8}:host::ng-deep .adapt-tabset>.tab-container>.tab-content{display:none}:host::ng-deep>rx-canvas-outlet>rx-canvas-item-container>div>div>rx-canvas-item-column>.cdk-drop-list>.cdk-drag>.canvas-item{border-width:0;padding:0}:host::ng-deep>rx-canvas-outlet>rx-canvas-item-container>div>div>rx-canvas-item-column>.cdk-drop-list>.cdk-drag>.canvas-item>.canvas-item-header{display:none}\n"], components: [{ type: i2.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i2.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i3.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TabPanelDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-tab-panel-design',
                    templateUrl: './tab-panel-design.component.html',
                    styleUrls: ['./tab-panel-design.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxUtilityModalsService }]; }, propDecorators: { model: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }], adaptTabset: [{
                type: ViewChild,
                args: ['adaptTabset', { static: true }]
            }] } });
//# sourceMappingURL=tab-panel-design.component.js.map