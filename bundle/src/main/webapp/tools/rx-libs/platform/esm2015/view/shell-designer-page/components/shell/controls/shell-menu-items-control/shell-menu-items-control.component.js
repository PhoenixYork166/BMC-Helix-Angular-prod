import { Component, Injector, Input } from '@angular/core';
import { RX_SHELL } from '@helix/platform/view/api';
import { InspectorWidgetBase } from '@helix/platform/shared/components';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
export class RxShellMenuItemsControlComponent extends InspectorWidgetBase {
    constructor(injector, rxUtilityModalsService) {
        super(injector);
        this.injector = injector;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.menuGroupLabel = 'Menu group';
        this.menuItemTypeToLabelMap = {
            [RX_SHELL.navBar.menuItem]: 'Menu item',
            [RX_SHELL.navBar.menuGroup]: this.menuGroupLabel,
            [RX_SHELL.navBar.userMenu]: this.menuGroupLabel
        };
        this.actionNameToLabelMap = {
            [RX_SHELL.actions.launchURL]: 'Launch URL',
            [RX_SHELL.actions.navigateToView]: 'Navigate to view',
            [RX_SHELL.actions.navigateToSmartReporting]: 'Navigate to Smart Reporting'
        };
    }
    edit(menuItem) {
        this.designerItemModel.selectMenuItem(menuItem.guid);
    }
    remove(menuItem) {
        this.rxUtilityModalsService
            .confirm('Are you sure you want to delete this menu item?')
            .then((isConfirmed) => {
            if (isConfirmed) {
                this.designerItemModel.removeMenuItem(menuItem.guid);
            }
        });
    }
    canBeRemoved(menuItem) {
        return menuItem.type !== RX_SHELL.navBar.userMenu && !this.isDisabled;
    }
    trackByGuid(index, menuItem) {
        return menuItem.guid;
    }
}
RxShellMenuItemsControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemsControlComponent, deps: [{ token: i0.Injector }, { token: i1.RxUtilityModalsService }], target: i0.ɵɵFactoryTarget.Component });
RxShellMenuItemsControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellMenuItemsControlComponent, selector: "rx-shell-menu-items-control", inputs: { options: "options", isDisabled: "isDisabled" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"this.designerItemModel.menuItems$ | async as menuItems\">\n  <p *ngIf=\"menuItems.length === 0\">\n    No menu items have been defined. Drag and drop menu groups or menu items onto the canvas to define the menu.\n  </p>\n\n  <div *ngFor=\"let item of menuItems; trackBy: trackByGuid\">\n    <ng-container *ngTemplateOutlet=\"itemTpl; context: { $implicit: item }\"></ng-container>\n\n    <div class=\"ml-2\" *ngFor=\"let child of item.children; trackBy: trackByGuid\">\n      <ng-container *ngTemplateOutlet=\"itemTpl; context: { $implicit: child }\"></ng-container>\n    </div>\n  </div>\n</ng-container>\n\n<ng-template #itemTpl let-item>\n  <div class=\"border px-2 py-1 mb-2 d-flex align-items-start\">\n    <div class=\"mr-auto\">\n      <div class=\"font-weight-bold\">{{ item.data.menuItemName || item.data.menuGroupName }}</div>\n      <span class=\"text-secondary\">{{ menuItemTypeToLabelMap[item.type] }}</span>\n      <span class=\"text-secondary\" *ngIf=\"item.data.actionName\">\n        ({{ actionNameToLabelMap[item.data.actionName] }})</span\n      >\n    </div>\n\n    <button\n      class=\"d-icon-left-pencil p-1\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      type=\"button\"\n      rx-id=\"edit-button\"\n      (click)=\"edit(item)\"\n    ></button>\n\n    <button\n      class=\"d-icon-left-cross_adapt p-1\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      type=\"button\"\n      rx-id=\"remove-button\"\n      *ngIf=\"canBeRemoved(item)\"\n      (click)=\"remove(item)\"\n    ></button>\n  </div>\n</ng-template>\n", components: [{ type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemsControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-menu-items-control',
                    templateUrl: './shell-menu-items-control.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxUtilityModalsService }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });
//# sourceMappingURL=shell-menu-items-control.component.js.map