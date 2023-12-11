import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, switchMap, map, tap } from 'rxjs/operators';
import { ReplaySubject, forkJoin } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { RxGlobalCacheService, RxCurrentUserService, RxAngularApplicationService, RX_APPLICATION, RxAuthService } from '@helix/platform/shared/api';
import { remove, sortBy, filter } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/router";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@angular/common";
export class RxErrorPageComponent {
    constructor(document, title, route, rxAuthService, rxGlobalCacheService, rxCurrentUserService, rxAngularApplicationService) {
        this.document = document;
        this.title = title;
        this.route = route;
        this.rxAuthService = rxAuthService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxAngularApplicationService = rxAngularApplicationService;
        this.showSignInLink = false;
        this.showApplications = false;
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
        }), tap(() => (this.rxGlobalCacheService.applicationId = 'unknown-application')));
        this.destroyed$ = new ReplaySubject(1);
        this.document.body.style.overflow = 'hidden';
    }
    ngOnInit() {
        this.route.data.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
            var _a;
            this.data = Object.assign({}, data);
            this.title.setTitle(this.data.errorTitle);
            this.showSignInLink = this.data.showSignInLink;
            this.showApplications = (_a = this.data.showApplications) !== null && _a !== void 0 ? _a : false;
        });
    }
    logout() {
        this.rxAuthService.logout().subscribe();
    }
    ngOnDestroy() {
        this.document.body.style.removeProperty('overflow');
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
RxErrorPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorPageComponent, deps: [{ token: DOCUMENT }, { token: i1.Title }, { token: i2.ActivatedRoute }, { token: i3.RxAuthService }, { token: i3.RxGlobalCacheService }, { token: i3.RxCurrentUserService }, { token: i3.RxAngularApplicationService }], target: i0.ɵɵFactoryTarget.Component });
RxErrorPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxErrorPageComponent, selector: "rx-error-page", ngImport: i0, template: "<div class=\"error-wrapper\">\n  <ng-container *ngIf=\"!showApplications\">\n    <h2>{{ this.data.errorTitle }}</h2>\n    <div [innerHTML]=\"this.data.errorMessage\"></div>\n  </ng-container>\n\n  <div *ngIf=\"showApplications\">\n    <h3>\n      The page you are trying to reach does not exist. Please open one of the applications below and bookmark it for\n      future reference.\n    </h3>\n\n    <ul>\n      <li *ngFor=\"let app of applications$ | async\">\n        <a [href]=\"app.url\">{{ app.friendlyName }}</a>\n      </li>\n    </ul>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.error-wrapper{color:#7c7f81;padding:20px;font-family:\"Open Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif;font-size:.8125rem}.error-wrapper h2{font-size:var(--h2-font-size);line-height:1.5rem;margin:20px 0 12px;font-weight:normal}.error-wrapper p{margin-top:0;margin-bottom:.625rem}a{color:#00a79d;text-decoration:none;background-color:transparent}\n"], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-error-page',
                    templateUrl: './error-page.component.html',
                    styleUrls: ['error-page.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.Title }, { type: i2.ActivatedRoute }, { type: i3.RxAuthService }, { type: i3.RxGlobalCacheService }, { type: i3.RxCurrentUserService }, { type: i3.RxAngularApplicationService }]; } });
//# sourceMappingURL=error-page.component.js.map