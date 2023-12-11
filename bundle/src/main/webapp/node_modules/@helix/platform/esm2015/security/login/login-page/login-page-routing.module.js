import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RxLoginLocalizationResolver, RxApplicationLoaderResolver } from '@helix/platform/shared/api';
import { LoginPageComponent } from './login-page.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    {
        path: '',
        component: LoginPageComponent,
        resolve: {
            loader: RxApplicationLoaderResolver,
            RxLoginLocalizationResolver
        },
        pathMatch: 'full'
    }
];
export class LoginPageRoutingModule {
}
LoginPageRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LoginPageRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LoginPageRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LoginPageRoutingModule, imports: [i1.RouterModule], exports: [RouterModule] });
LoginPageRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LoginPageRoutingModule, imports: [[RouterModule.forChild(routes)], RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LoginPageRoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule]
                }]
        }] });
//# sourceMappingURL=login-page-routing.module.js.map