import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewRuntimePageComponent } from './view-runtime-page.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    {
        path: '',
        component: ViewRuntimePageComponent,
        pathMatch: 'full'
    }
];
export class ViewRuntimePageRoutingModule {
}
ViewRuntimePageRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewRuntimePageRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewRuntimePageRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewRuntimePageRoutingModule, imports: [i1.RouterModule], exports: [RouterModule] });
ViewRuntimePageRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewRuntimePageRoutingModule, imports: [[RouterModule.forChild(routes)], RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewRuntimePageRoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule]
                }]
        }] });
//# sourceMappingURL=view-runtime-page-routing.module.js.map