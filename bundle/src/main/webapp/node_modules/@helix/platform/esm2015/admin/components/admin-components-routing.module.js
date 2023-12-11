import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSettingsExplorerComponent } from './admin-settings-explorer/admin-settings-explorer.component';
import { RxComponentCanDeactivateGuard } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    {
        path: '',
        redirectTo: 'root',
        pathMatch: 'full'
    },
    {
        path: ':settingGuid',
        component: AdminSettingsExplorerComponent,
        pathMatch: 'full',
        canDeactivate: [RxComponentCanDeactivateGuard]
    }
];
export class AdminComponentsRoutingModule {
}
AdminComponentsRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminComponentsRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AdminComponentsRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminComponentsRoutingModule, imports: [i1.RouterModule], exports: [RouterModule] });
AdminComponentsRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminComponentsRoutingModule, imports: [[RouterModule.forChild(routes)], RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminComponentsRoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule]
                }]
        }] });
//# sourceMappingURL=admin-components-routing.module.js.map