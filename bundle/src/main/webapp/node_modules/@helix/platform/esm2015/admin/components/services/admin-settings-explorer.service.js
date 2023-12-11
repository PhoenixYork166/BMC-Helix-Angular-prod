import { Injectable } from '@angular/core';
import { RxAdminSettingsService } from '@helix/platform/shared/api';
import { uniqueId } from 'lodash';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
export class RxAdminSettingsExplorerService {
    constructor(rxAdminSettingsService) {
        this.rxAdminSettingsService = rxAdminSettingsService;
    }
    getNavigationTreeConfig() {
        return this.rxAdminSettingsService.getAdminNavigationMenuItems().pipe(map(this.buildTreeNodes.bind(this)));
    }
    buildTreeNodes(administrationNavigationMenuItems, parent) {
        return (administrationNavigationMenuItems || [])
            .filter((navigationMenuItem) => navigationMenuItem.compName !== 'com.bmc.arsys.rx.settings')
            .sort((item1, item2) => item1.label.localeCompare(item2.label))
            .map((navigationMenuItem) => {
            const treeMenuItem = {
                label: navigationMenuItem.label,
                data: navigationMenuItem,
                expanded: false,
                selectable: Boolean(navigationMenuItem.guid),
                key: uniqueId()
            };
            treeMenuItem.children =
                navigationMenuItem.items && navigationMenuItem.items.length
                    ? this.buildTreeNodes(navigationMenuItem.items, treeMenuItem)
                    : [];
            if (parent) {
                treeMenuItem.parent = parent;
            }
            return treeMenuItem;
        });
    }
}
RxAdminSettingsExplorerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminSettingsExplorerService, deps: [{ token: i1.RxAdminSettingsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAdminSettingsExplorerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminSettingsExplorerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminSettingsExplorerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxAdminSettingsService }]; } });
//# sourceMappingURL=admin-settings-explorer.service.js.map