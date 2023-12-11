(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@bmc-ux/adapt-angular'), require('@bmc-ux/obsolete'), require('@ngx-translate/core'), require('@angular/router'), require('@helix/platform/shared/api'), require('lodash'), require('rxjs'), require('rxjs/operators'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/security/login', ['exports', '@angular/core', '@angular/common', '@angular/forms', '@bmc-ux/adapt-angular', '@bmc-ux/obsolete', '@ngx-translate/core', '@angular/router', '@helix/platform/shared/api', 'lodash', 'rxjs', 'rxjs/operators', '@angular/platform-browser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.security = global.helix.platform.security || {}, global.helix.platform.security.login = {}), global.ng.core, global.ng.common, global.ng.forms, global.adaptAngular, global.obsolete, global.ngxTranslateCore, global.ng.router, global.helix.platform.shared.api, global.lodash, global.rxjs, global.rxjs.operators, global.ng.platformBrowser));
})(this, (function (exports, i0, i6, i7, i5, obsolete, i4, i1, i3, lodash, rxjs, operators, i2) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i7__namespace = /*#__PURE__*/_interopNamespace(i7);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    var LoginPageComponent = /** @class */ (function () {
        function LoginPageComponent(activatedRoute, router, title, rxAuthService, rxBundleService, translateService) {
            var _this = this;
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
            this.shouldReloadPage = lodash.get(this.router.getCurrentNavigation(), 'extras.state.shouldReloadPage');
            if (this.shouldReloadPage) {
                window.location.reload();
            }
            else {
                this.title.setTitle('Login');
                this.activatedRoute.paramMap.subscribe(function (params) {
                    var bundleId = params.get('bundleId');
                    _this.rxBundleService
                        .getFromJsonp(bundleId)
                        .pipe(operators.catchError(function () {
                        _this.router.navigate(['unknown-application']);
                        return rxjs.EMPTY;
                    }))
                        .subscribe(function (bundleDescriptor) {
                        if (bundleDescriptor.isApplication) {
                            _this.bundleFriendlyName = bundleDescriptor.friendlyName;
                            _this.title.setTitle("Login - " + _this.bundleFriendlyName);
                        }
                        else {
                            _this.router.navigate(['unknown-application']);
                        }
                    });
                });
            }
        }
        LoginPageComponent.prototype.login = function () {
            var _this = this;
            this.isLoading = true;
            this.rxAuthService
                .login(this.userName, this.userPassword)
                .pipe(operators.catchError(function (err) {
                _this.isLoading = false;
                return rxjs.throwError(err);
            }))
                .subscribe();
        };
        return LoginPageComponent;
    }());
    LoginPageComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LoginPageComponent, deps: [{ token: i1__namespace.ActivatedRoute }, { token: i1__namespace.Router }, { token: i2__namespace.Title }, { token: i3__namespace.RxAuthService }, { token: i3__namespace.RxBundleService }, { token: i4__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    LoginPageComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: LoginPageComponent, selector: "rx-login-page", ngImport: i0__namespace, template: "<link rel=\"stylesheet\" href=\"/helix/assets/adapt-css/dist/css/adapt-css-bs4.min.css\" (load)=\"areStylesLoaded = true\" />\n\n<adapt-login\n  productName=\"{{ bundleFriendlyName }}\"\n  logoClass=\"logo-bmc-helix logo-light\"\n  [footerConfig]=\"footerItems\"\n  *ngIf=\"!shouldReloadPage && areStylesLoaded\"\n>\n  <form class=\"form\" novalidate autocomplete=\"off\" method=\"post\">\n    <adapt-rx-textfield\n      class=\"form-group textfield\"\n      rx-id=\"username\"\n      [label]=\"'login.username' | translate\"\n      [name]=\"'username'\"\n      [placeholder]=\"'login.username' | translate\"\n      [autofocus]=\"true\"\n      [(ngModel)]=\"userName\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      class=\"form-group textfield\"\n      rx-id=\"password\"\n      [isPassword]=\"true\"\n      [label]=\"'login.password' | translate\"\n      [placeholder]=\"'login.password' | translate\"\n      autocomplete=\"off\"\n      [(ngModel)]=\"userPassword\"\n      [ngModelOptions]=\"{ standalone: true }\"\n    >\n    </adapt-rx-textfield>\n\n    <button\n      adapt-button\n      btn-type=\"primary\"\n      size=\"block\"\n      rx-id=\"sign-in-button\"\n      type=\"submit\"\n      class=\"form__button mb-0\"\n      (click)=\"login()\"\n      [disabled]=\"!userName || isLoading\"\n    >\n      {{ 'login.login' | translate }}\n    </button>\n  </form>\n</adapt-login>\n", components: [{ type: i5__namespace.AdaptLoginPageComponent, selector: "adapt-login", inputs: ["logoClass", "footerConfig", "productName"] }, { type: i5__namespace.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i5__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i7__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i7__namespace.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i7__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LoginPageComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-login-page',
                        templateUrl: './login-page.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.ActivatedRoute }, { type: i1__namespace.Router }, { type: i2__namespace.Title }, { type: i3__namespace.RxAuthService }, { type: i3__namespace.RxBundleService }, { type: i4__namespace.TranslateService }]; } });

    var routes = [
        {
            path: '',
            component: LoginPageComponent,
            resolve: {
                loader: i3.RxApplicationLoaderResolver,
                RxLoginLocalizationResolver: i3.RxLoginLocalizationResolver
            },
            pathMatch: 'full'
        }
    ];
    var LoginPageRoutingModule = /** @class */ (function () {
        function LoginPageRoutingModule() {
        }
        return LoginPageRoutingModule;
    }());
    LoginPageRoutingModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LoginPageRoutingModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    LoginPageRoutingModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LoginPageRoutingModule, imports: [i1__namespace.RouterModule], exports: [i1.RouterModule] });
    LoginPageRoutingModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LoginPageRoutingModule, imports: [[i1.RouterModule.forChild(routes)], i1.RouterModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LoginPageRoutingModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.RouterModule.forChild(routes)],
                        exports: [i1.RouterModule]
                    }]
            }] });

    var LoginPageModule = /** @class */ (function () {
        function LoginPageModule() {
        }
        return LoginPageModule;
    }());
    LoginPageModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LoginPageModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    LoginPageModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LoginPageModule, declarations: [LoginPageComponent], imports: [i6.CommonModule,
            LoginPageRoutingModule,
            i4.TranslateModule,
            i7.FormsModule,
            i5.AdaptLoginPageModule,
            obsolete.AdaptTextFieldModule,
            i5.AdaptButtonModule,
            i5.AdaptRxTextfieldModule] });
    LoginPageModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LoginPageModule, imports: [[
                i6.CommonModule,
                LoginPageRoutingModule,
                i4.TranslateModule,
                i7.FormsModule,
                i5.AdaptLoginPageModule,
                obsolete.AdaptTextFieldModule,
                i5.AdaptButtonModule,
                i5.AdaptRxTextfieldModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LoginPageModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [LoginPageComponent],
                        imports: [
                            i6.CommonModule,
                            LoginPageRoutingModule,
                            i4.TranslateModule,
                            i7.FormsModule,
                            i5.AdaptLoginPageModule,
                            obsolete.AdaptTextFieldModule,
                            i5.AdaptButtonModule,
                            i5.AdaptRxTextfieldModule
                        ]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.LoginPageModule = LoginPageModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-security-login.umd.js.map
