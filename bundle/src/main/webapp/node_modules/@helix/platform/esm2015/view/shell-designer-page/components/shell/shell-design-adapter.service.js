import { Injectable } from '@angular/core';
import { RX_SHELL, RX_VIEW_DEFINITION, RxViewLayout } from '@helix/platform/view/api';
import { RxGuidService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
export class RxShellDesignAdapterService {
    constructor(rxGuidService) {
        this.rxGuidService = rxGuidService;
    }
    adaptDefinition(componentDefinition) {
        this.addAddUserMenu(componentDefinition);
        this.addActionsOutlet(componentDefinition);
    }
    addAddUserMenu(componentDefinition) {
        const userMenuGuid = this.rxGuidService.generate();
        const userMenuDefinition = {
            resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
            guid: userMenuGuid,
            type: RX_SHELL.navBar.userMenu,
            layout: JSON.stringify(RxViewLayout.getViewLayoutForDefaultOutlet()),
            componentDefinitions: [],
            propertiesByName: {
                menuGroupName: 'User menu'
            }
        };
        const userMenu = componentDefinition.componentDefinitions.find((component) => component.type === RX_SHELL.navBar.userMenu);
        if (!userMenu) {
            const layout = JSON.parse(componentDefinition.layout);
            layout.outlets[0].columns[0].children.push(userMenuGuid);
            componentDefinition.layout = JSON.stringify(layout);
            componentDefinition.componentDefinitions.push(userMenuDefinition);
        }
    }
    addActionsOutlet(componentDefinition) {
        const layout = JSON.parse(componentDefinition.layout);
        if (!layout.outlets.find((outlet) => outlet.name === RX_SHELL.outlets.actions)) {
            layout.outlets.push(RxViewLayout.getOutlet(RX_SHELL.outlets.actions));
            componentDefinition.layout = JSON.stringify(layout);
        }
    }
}
RxShellDesignAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignAdapterService, deps: [{ token: i1.RxGuidService }], target: i0.ɵɵFactoryTarget.Injectable });
RxShellDesignAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignAdapterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxGuidService }]; } });
//# sourceMappingURL=shell-design-adapter.service.js.map