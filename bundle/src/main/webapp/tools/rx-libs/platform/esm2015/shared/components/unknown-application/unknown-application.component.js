import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { RX_APPLICATION, RxAngularApplicationService, RxCurrentUserService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { map, switchMap, tap } from 'rxjs/operators';
import { filter, remove, sortBy } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common";
export class RxUnknownApplicationComponent {
    constructor(rxGlobalCacheService, rxCurrentUserService, rxAngularApplicationService, title) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxAngularApplicationService = rxAngularApplicationService;
        this.title = title;
        this.applications$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(switchMap((bundleDescriptors) => {
            const applicationBundleDescriptors = filter(bundleDescriptors, { isApplication: true, isLicensed: true });
            remove(applicationBundleDescriptors, { id: RX_APPLICATION.settingsBundleId });
            if (!this.rxCurrentUserService.isAdministrator()) {
                remove(applicationBundleDescriptors, { id: RX_APPLICATION.dataloadBundleId });
            }
            if (!this.rxCurrentUserService.isAdministrator() && !this.rxCurrentUserService.isBusinessAnalyst()) {
                remove(applicationBundleDescriptors, { id: RX_APPLICATION.innovationStudioBundleId });
            }
            const applications = sortBy(applicationBundleDescriptors, (bundleDescriptor) => bundleDescriptor.friendlyName).map((app) => this.rxAngularApplicationService.isAngularJsApplication(app.id).pipe(map((isAngularJsApplication) => {
                let url;
                if (app.hasCustomEntryPoint && app.id !== RX_APPLICATION.innovationStudioBundleId) {
                    url = `/${app.id}/index.html`;
                }
                else if (isAngularJsApplication) {
                    url = `/innovationsuite/index.html#/${app.id}`;
                }
                else {
                    url = `/helix/index.html#/${app.id}`;
                }
                return {
                    id: app.id,
                    friendlyName: app.friendlyName,
                    url
                };
            })));
            return forkJoin(applications);
        }), tap(() => {
            this.title.setTitle('Helix');
            this.rxGlobalCacheService.applicationId = 'unknown-application';
        }));
    }
}
RxUnknownApplicationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownApplicationComponent, deps: [{ token: i1.RxGlobalCacheService }, { token: i1.RxCurrentUserService }, { token: i1.RxAngularApplicationService }, { token: i2.Title }], target: i0.ɵɵFactoryTarget.Component });
RxUnknownApplicationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUnknownApplicationComponent, selector: "rx-unknown-application", ngImport: i0, template: "<h3>\n  The page you are trying to reach does not exist. Please open one of the applications below and bookmark it for future\n  reference.\n</h3>\n<ul>\n  <li *ngFor=\"let app of applications$ | async\">\n    <a [href]=\"app.url\">{{ app.friendlyName }}</a>\n  </li>\n</ul>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{color:#7c7f81;padding:20px}:host h3{padding-left:20px}\n"], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownApplicationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-unknown-application',
                    templateUrl: './unknown-application.component.html',
                    styleUrls: ['./unknown-application.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalCacheService }, { type: i1.RxCurrentUserService }, { type: i1.RxAngularApplicationService }, { type: i2.Title }]; } });
//# sourceMappingURL=unknown-application.component.js.map