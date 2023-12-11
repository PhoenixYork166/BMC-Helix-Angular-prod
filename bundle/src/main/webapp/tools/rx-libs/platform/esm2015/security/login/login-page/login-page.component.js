import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RxAuthService, RxBundleService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'lodash';
import { EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
export class LoginPageComponent {
    constructor(activatedRoute, router, title, rxAuthService, rxBundleService, translateService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.title = title;
        this.rxAuthService = rxAuthService;
        this.rxBundleService = rxBundleService;
        this.translateService = translateService;
        this.isLoading = false;
        this.bundleFriendlyName = '';
        this.shouldReloadPage = true;
        this.areStylesLoaded = false;
        this.footerItems = {
            content: {
                copyright: 'Copyright 1997 - 2023 BMC Software, Inc.',
                info: this.translateService.instant('login.trademark'),
                helixLogo: true
            }
        };
        this.shouldReloadPage = get(this.router.getCurrentNavigation(), 'extras.state.shouldReloadPage');
        if (this.shouldReloadPage) {
            window.location.reload();
        }
        else {
            this.title.setTitle('Login');
            this.activatedRoute.paramMap.subscribe((params) => {
                const bundleId = params.get('bundleId');
                this.rxBundleService
                    .getFromJsonp(bundleId)
                    .pipe(catchError(() => {
                    this.router.navigate(['unknown-application']);
                    return EMPTY;
                }))
                    .subscribe((bundleDescriptor) => {
                    if (bundleDescriptor.isApplication) {
                        this.bundleFriendlyName = bundleDescriptor.friendlyName;
                        this.title.setTitle(`Login - ${this.bundleFriendlyName}`);
                    }
                    else {
                        this.router.navigate(['unknown-application']);
                    }
                });
            });
        }
    }
    login() {
        this.isLoading = true;
        this.rxAuthService
            .login(this.userName, this.userPassword)
            .pipe(catchError((err) => {
            this.isLoading = false;
            return throwError(err);
        }))
            .subscribe();
    }
}
LoginPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LoginPageComponent, deps: [{ token: i1.ActivatedRoute }, { token: i1.Router }, { token: i2.Title }, { token: i3.RxAuthService }, { token: i3.RxBundleService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
LoginPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: LoginPageComponent, selector: "rx-login-page", ngImport: i0, template: "<link rel=\"stylesheet\" href=\"/helix/assets/adapt-css/dist/css/adapt-css-bs4.min.css\" (load)=\"areStylesLoaded = true\" />\n\n<adapt-login\n  productName=\"{{ bundleFriendlyName }}\"\n  logoClass=\"logo-bmc-helix logo-light\"\n  [footerConfig]=\"footerItems\"\n  *ngIf=\"!shouldReloadPage && areStylesLoaded\"\n>\n  <form class=\"form\" novalidate autocomplete=\"off\" method=\"post\">\n    <adapt-rx-textfield\n      class=\"form-group textfield\"\n      rx-id=\"username\"\n      [label]=\"'login.username' | translate\"\n      [name]=\"'username'\"\n      [placeholder]=\"'login.username' | translate\"\n      [autofocus]=\"true\"\n      [(ngModel)]=\"userName\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      class=\"form-group textfield\"\n      rx-id=\"password\"\n      [isPassword]=\"true\"\n      [label]=\"'login.password' | translate\"\n      [placeholder]=\"'login.password' | translate\"\n      autocomplete=\"off\"\n      [(ngModel)]=\"userPassword\"\n      [ngModelOptions]=\"{ standalone: true }\"\n    >\n    </adapt-rx-textfield>\n\n    <button\n      adapt-button\n      btn-type=\"primary\"\n      size=\"block\"\n      rx-id=\"sign-in-button\"\n      type=\"submit\"\n      class=\"form__button mb-0\"\n      (click)=\"login()\"\n      [disabled]=\"!userName || isLoading\"\n    >\n      {{ 'login.login' | translate }}\n    </button>\n  </form>\n</adapt-login>\n", components: [{ type: i5.AdaptLoginPageComponent, selector: "adapt-login", inputs: ["logoClass", "footerConfig", "productName"] }, { type: i5.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i7.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LoginPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-login-page',
                    templateUrl: './login-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }, { type: i1.Router }, { type: i2.Title }, { type: i3.RxAuthService }, { type: i3.RxBundleService }, { type: i4.TranslateService }]; } });
//# sourceMappingURL=login-page.component.js.map