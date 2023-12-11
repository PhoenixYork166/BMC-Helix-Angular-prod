(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@bmc-ux/adapt-angular'), require('rxjs'), require('moment-es6'), require('@ngx-translate/core'), require('@angular/forms'), require('lodash')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/ui-kit', ['exports', '@angular/common', '@angular/core', '@bmc-ux/adapt-angular', 'rxjs', 'moment-es6', '@ngx-translate/core', '@angular/forms', 'lodash'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform["ui-kit"] = {}), global.ng.common, global.ng.core, global.adaptAngular, global.rxjs, global.moment, global.ngxTranslateCore, global.ng.forms, global.lodash));
})(this, (function (exports, i1, i0, i1$1, rxjs, moment, i1$2, i3, lodash) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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

    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1$2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);

    var RxBladeComponent = /** @class */ (function () {
        function RxBladeComponent() {
            this.isBladeCollapsed = false;
            this.title = '';
            this.dockTo = 'left';
            this.toggle = new i0.EventEmitter();
            this.isBladeExpanded = true;
        }
        Object.defineProperty(RxBladeComponent.prototype, "isExpanded", {
            get: function () {
                return this.isBladeExpanded;
            },
            set: function (value) {
                this.isBladeExpanded = value;
                this.isBladeCollapsed = !value;
            },
            enumerable: false,
            configurable: true
        });
        RxBladeComponent.prototype.toggleBlade = function () {
            this.toggle.emit();
        };
        return RxBladeComponent;
    }());
    RxBladeComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBladeComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxBladeComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxBladeComponent, selector: "rx-blade", inputs: { title: "title", isExpanded: "isExpanded", dockTo: "dockTo" }, outputs: { toggle: "toggle" }, host: { properties: { "class.collapsed": "this.isBladeCollapsed", "class": "this.dockTo" } }, ngImport: i0__namespace, template: "<div class=\"header\">\n  <button\n    type=\"button\"\n    class=\"toggle\"\n    [attr.rx-id]=\"'toggle-button'\"\n    [class.btn-block]=\"isExpanded\"\n    (click)=\"toggleBlade()\"\n  >\n    <span [ngClass]=\"{ icon: true, 'd-icon-arrow_right': dockTo === 'right', 'd-icon-arrow_left': dockTo === 'left' }\">\n    </span>\n    {{ title }}\n  </button>\n</div>\n\n<div class=\"content\">\n  <ng-content></ng-content>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;flex-shrink:0;width:280px;height:100%;background:white;transition:margin-left .3s,margin-right .3s}:host.right{border-left:1px solid #d6d7d8;margin-right:0}:host.right .icon{float:right}:host.left{border-right:1px solid #d6d7d8;margin-left:0}:host.left .icon{float:left}:host.left.collapsed{margin-left:-280px}:host.left.collapsed .header{left:280px}:host.left.collapsed .icon{transform:rotate(180deg);margin-right:10px}:host.right.collapsed{margin-right:-280px}:host.right.collapsed .header{text-align:right;right:280px}:host.right.collapsed .icon{transform:rotate(180deg);margin-left:10px}.toggle{font-size:16px;color:#626668;position:relative;display:inline-block;height:36px;font-weight:var(--font-weight-bold);text-align:center;line-height:2.2em;padding:0 20px;border:none;border-bottom:1px solid #d6d7d8;background:white}.toggle:focus{box-shadow:none}.icon{font-size:12px}.header{position:relative}.content{overflow:auto;height:100%}\n"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBladeComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-blade',
                        templateUrl: './blade.component.html',
                        styleUrls: ['blade.component.scss']
                    }]
            }], propDecorators: { isBladeCollapsed: [{
                    type: i0.HostBinding,
                    args: ['class.collapsed']
                }], title: [{
                    type: i0.Input
                }], isExpanded: [{
                    type: i0.Input
                }], dockTo: [{
                    type: i0.Input
                }, {
                    type: i0.HostBinding,
                    args: ['class']
                }], toggle: [{
                    type: i0.Output
                }] } });

    var RxBladeModule = /** @class */ (function () {
        function RxBladeModule() {
        }
        return RxBladeModule;
    }());
    RxBladeModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBladeModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxBladeModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBladeModule, declarations: [RxBladeComponent], imports: [i1.CommonModule], exports: [RxBladeComponent] });
    RxBladeModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBladeModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBladeModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        declarations: [RxBladeComponent],
                        exports: [RxBladeComponent]
                    }]
            }] });

    var RxBreadcrumbBarComponent = /** @class */ (function () {
        function RxBreadcrumbBarComponent() {
            this.items = [];
            this.selectedItem = new i0.EventEmitter();
        }
        RxBreadcrumbBarComponent.prototype.onSelectItem = function (item) {
            this.selectedItem.emit(item);
        };
        RxBreadcrumbBarComponent.prototype.trackByFn = function (index, item) {
            return item.label;
        };
        return RxBreadcrumbBarComponent;
    }());
    RxBreadcrumbBarComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBreadcrumbBarComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxBreadcrumbBarComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxBreadcrumbBarComponent, selector: "rx-breadcrumb-bar", inputs: { items: "items" }, outputs: { selectedItem: "selectedItem" }, ngImport: i0__namespace, template: "<ol *ngIf=\"items\" class=\"breadcrumb m-0 p-0\">\n  <li\n    *ngFor=\"let item of items; trackBy: trackByFn; let last = last\"\n    class=\"breadcrumb-item rx-ellipsis\"\n    [class.active]=\"last\"\n  >\n    <a (click)=\"onSelectItem(item)\" *ngIf=\"!last\" href=\"javascript:void(0)\">{{ item.label }}</a>\n    <span *ngIf=\"last\">{{ item.label }}</span>\n  </li>\n</ol>\n", directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBreadcrumbBarComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-breadcrumb-bar',
                        templateUrl: './breadcrumb-bar.component.html'
                    }]
            }], propDecorators: { items: [{
                    type: i0.Input
                }], selectedItem: [{
                    type: i0.Output
                }] } });

    var RxBreadcrumbBarModule = /** @class */ (function () {
        function RxBreadcrumbBarModule() {
        }
        return RxBreadcrumbBarModule;
    }());
    RxBreadcrumbBarModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBreadcrumbBarModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxBreadcrumbBarModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBreadcrumbBarModule, declarations: [RxBreadcrumbBarComponent], imports: [i1.CommonModule], exports: [RxBreadcrumbBarComponent] });
    RxBreadcrumbBarModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBreadcrumbBarModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBreadcrumbBarModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [RxBreadcrumbBarComponent],
                        declarations: [RxBreadcrumbBarComponent]
                    }]
            }] });

    var RxBusyIndicatorComponent = /** @class */ (function () {
        function RxBusyIndicatorComponent() {
            this.defaultSubscription = rxjs.NEVER.subscribe();
            this.defaultOptions = {
                busy: this.defaultSubscription,
                backdrop: true,
                message: '',
                minDuration: 0,
                delay: 0,
                loaderType: 'section'
            };
            this.config = this.defaultOptions;
        }
        RxBusyIndicatorComponent.prototype.ngOnInit = function () {
            this.updateConfig();
        };
        RxBusyIndicatorComponent.prototype.ngOnChanges = function (changes) {
            if (changes.options && !changes.options.firstChange) {
                this.updateConfig();
            }
        };
        RxBusyIndicatorComponent.prototype.ngOnDestroy = function () {
            this.defaultSubscription.unsubscribe();
        };
        RxBusyIndicatorComponent.prototype.updateConfig = function () {
            this.config = Object.assign(Object.assign({}, this.defaultOptions), this.options);
        };
        return RxBusyIndicatorComponent;
    }());
    RxBusyIndicatorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBusyIndicatorComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxBusyIndicatorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: { options: "options" }, usesOnChanges: true, ngImport: i0__namespace, template: "<span [ngBusy]=\"config\"></span>\n", directives: [{ type: i1__namespace$1.AdaptBusyDirective, selector: "[adapt-busy], [ngBusy]", inputs: ["ngBusy", "adaptRadarDisableEventSending", "busyPromise", "determinate"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBusyIndicatorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-busy-indicator',
                        templateUrl: './busy-indicator.component.html'
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var RxBusyIndicatorModule = /** @class */ (function () {
        function RxBusyIndicatorModule() {
        }
        return RxBusyIndicatorModule;
    }());
    RxBusyIndicatorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBusyIndicatorModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxBusyIndicatorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBusyIndicatorModule, declarations: [RxBusyIndicatorComponent], imports: [i1.CommonModule, i1__namespace$1.AdaptBusyModule], exports: [RxBusyIndicatorComponent] });
    RxBusyIndicatorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBusyIndicatorModule, imports: [[i1.CommonModule, i1$1.AdaptBusyModule.forRoot()]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBusyIndicatorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i1$1.AdaptBusyModule.forRoot()],
                        declarations: [RxBusyIndicatorComponent],
                        exports: [RxBusyIndicatorComponent]
                    }]
            }] });

    var RxHumanizedDatePipe = /** @class */ (function () {
        function RxHumanizedDatePipe(datePipe, translateService) {
            this.datePipe = datePipe;
            this.translateService = translateService;
        }
        RxHumanizedDatePipe.prototype.transform = function (value) {
            var now = moment__default["default"]();
            var date = moment__default["default"](value);
            if (date.isSame(now, 'day')) {
                return this.translateService.instant('com.bmc.dsm.chatbot.common.today.label');
            }
            else if (this.isYesterday(date)) {
                return this.translateService.instant('com.bmc.dsm.chatbot.common.yesterday.label');
            }
            else {
                return this.datePipe.transform(value, 'fullDate');
            }
        };
        RxHumanizedDatePipe.prototype.isYesterday = function (value) {
            var yesterday = moment__default["default"]().subtract(1, 'day').startOf('day');
            return value.isSame(yesterday, 'day');
        };
        return RxHumanizedDatePipe;
    }());
    RxHumanizedDatePipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHumanizedDatePipe, deps: [{ token: i1__namespace.DatePipe }, { token: i1__namespace$2.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    RxHumanizedDatePipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHumanizedDatePipe, name: "rxHumanizedDatePipe" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHumanizedDatePipe, decorators: [{
                type: i0.Pipe,
                args: [{
                        name: 'rxHumanizedDatePipe'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.DatePipe }, { type: i1__namespace$2.TranslateService }]; } });

    var RxHumanizedDateModule = /** @class */ (function () {
        function RxHumanizedDateModule() {
        }
        return RxHumanizedDateModule;
    }());
    RxHumanizedDateModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHumanizedDateModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxHumanizedDateModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHumanizedDateModule, declarations: [RxHumanizedDatePipe], exports: [RxHumanizedDatePipe] });
    RxHumanizedDateModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHumanizedDateModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHumanizedDateModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxHumanizedDatePipe],
                        exports: [RxHumanizedDatePipe]
                    }]
            }] });

    var RxJsonViewerComponent = /** @class */ (function () {
        function RxJsonViewerComponent() {
            this.data = {};
        }
        return RxJsonViewerComponent;
    }());
    RxJsonViewerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonViewerComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxJsonViewerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxJsonViewerComponent, selector: "rx-json-viewer", inputs: { data: "data" }, ngImport: i0__namespace, template: "<textarea class=\"form-control\" readonly>{{ data | json }}</textarea>\n", styles: [":host{display:flex;padding:12px;flex-grow:1}.form-control{resize:none}\n"], pipes: { "json": i1__namespace.JsonPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonViewerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-json-viewer',
                        templateUrl: './json-viewer.component.html',
                        styleUrls: ['./json-viewer.component.scss']
                    }]
            }], propDecorators: { data: [{
                    type: i0.Input
                }] } });

    var RxJsonViewerModule = /** @class */ (function () {
        function RxJsonViewerModule() {
        }
        return RxJsonViewerModule;
    }());
    RxJsonViewerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonViewerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxJsonViewerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonViewerModule, declarations: [RxJsonViewerComponent], imports: [i1.CommonModule], exports: [RxJsonViewerComponent] });
    RxJsonViewerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonViewerModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonViewerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        declarations: [RxJsonViewerComponent],
                        exports: [RxJsonViewerComponent]
                    }]
            }] });

    var RX_MODAL = {
        modalStyles: {
            primary: 'primary',
            warning: 'warning',
            danger: 'danger',
            info: 'info',
            success: 'success'
        },
        modalTypes: {
            alert: 'alert',
            confirm: 'confirm',
            prompt: 'prompt'
        }
    };

    var RxModalComponent = /** @class */ (function () {
        function RxModalComponent(context) {
            this.context = context;
            this.answer = '';
            this.config = this.context.getData();
        }
        RxModalComponent.prototype.onConfirm = function () {
            if (this.config.modalType === RX_MODAL.modalTypes.prompt) {
                this.context.close({ response: true, answer: this.answer });
            }
            else {
                this.context.close(true);
            }
        };
        return RxModalComponent;
    }());
    RxModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxModalComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxModalComponent, selector: "rx-modal", ngImport: i0__namespace, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ config.modalConfig.title }}</h5>\n\n  <button\n    class=\"close\"\n    [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.close.label' | translate\"\n    type=\"button\"\n    (click)=\"context.close(false)\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <span class=\"message\" *ngIf=\"config.modalType !== 'prompt'\">{{ config.modalConfig.message }}</span>\n\n  <adapt-rx-textfield\n    *ngIf=\"config.modalType === 'prompt'\"\n    [label]=\"config.modalConfig.message\"\n    [autofocus]=\"true\"\n    [(ngModel)]=\"answer\"\n  ></adapt-rx-textfield>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button btn-type=\"primary\" (click)=\"onConfirm()\">\n    {{ config.modalConfig.buttons.confirmButton }}\n  </button>\n\n  <button\n    adapt-button\n    *ngIf=\"config.modalConfig.buttons.dismissButton\"\n    btn-type=\"secondary\"\n    (click)=\"context.close(false)\"\n  >\n    {{ config.modalConfig.buttons.dismissButton }}\n  </button>\n</div>\n\n<div class=\"sr-only\" role=\"alert\">{{ config.modalConfig.title }} {{ config.modalConfig.message }}</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.modal-body{padding:20px}.modal-body .message{white-space:pre-wrap}.modal-footer{display:flex;justify-content:flex-end;border-top:1px solid #d6d7d8;padding:10px 15px}.modal-footer adapt-button{margin-right:5px}\n"], components: [{ type: i1__namespace$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i1__namespace$2.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-modal',
                        templateUrl: './modal.component.html',
                        styleUrls: ['./modal.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }]; } });

    var RxModalService = /** @class */ (function () {
        function RxModalService(adaptModalService, translateService, adaptDockedPanelService) {
            this.adaptModalService = adaptModalService;
            this.translateService = translateService;
            this.adaptDockedPanelService = adaptDockedPanelService;
        }
        RxModalService.prototype.isAnyDockedPanelDirty = function () {
            return lodash.some(this.adaptDockedPanelService.openedPanels, function (dockedPanelInstance) { var _a, _b; return (_b = (_a = dockedPanelInstance.contentInstanceRef) === null || _a === void 0 ? void 0 : _a.isDirty) === null || _b === void 0 ? void 0 : _b.call(_a); });
        };
        RxModalService.prototype.isAnyModalDirty = function () {
            return lodash.some(lodash.toArray(this.adaptModalService.openedModals.values()), function (modalRef) { var _a, _b; return (_b = (_a = modalRef.instance.contentInstanceRef) === null || _a === void 0 ? void 0 : _a.isDirty) === null || _b === void 0 ? void 0 : _b.call(_a); });
        };
        RxModalService.prototype.confirm = function (modalConfig, allowDismiss) {
            if (allowDismiss === void 0) { allowDismiss = true; }
            this.setButtons(modalConfig, this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label'), this.translateService.instant('com.bmc.arsys.rx.client.common.no.label'));
            return this.adaptModalService
                .open({
                content: RxModalComponent,
                data: { modalType: RX_MODAL.modalTypes.confirm, modalConfig: modalConfig },
                type: modalConfig.modalStyle,
                isDialog: true,
                beforeDismiss: function () { return allowDismiss; }
            })
                .then(function (result) { return result === true; })
                .catch(lodash.constant(false));
        };
        RxModalService.prototype.alert = function (modalConfig) {
            this.setButtons(modalConfig, this.translateService.instant('com.bmc.arsys.rx.client.common.ok.label'));
            return this.adaptModalService.open({
                content: RxModalComponent,
                data: { modalType: RX_MODAL.modalTypes.alert, modalConfig: modalConfig },
                type: modalConfig.modalStyle,
                isDialog: true
            });
        };
        RxModalService.prototype.prompt = function (modalConfig) {
            this.setButtons(modalConfig, this.translateService.instant('com.bmc.arsys.rx.client.common.ok.label'), this.translateService.instant('com.bmc.arsys.rx.client.common.cancel.label'));
            return this.adaptModalService
                .open({
                content: RxModalComponent,
                data: { modalType: RX_MODAL.modalTypes.prompt, modalConfig: modalConfig },
                type: modalConfig.modalStyle
            })
                .then(function (result) {
                return (result === null || result === void 0 ? void 0 : result.response) ? result : { response: false };
            })
                .catch(lodash.constant({
                response: false
            }));
        };
        RxModalService.prototype.setButtons = function (modalConfig, confirmButton, dismissButton) {
            if (modalConfig.buttons) {
                modalConfig.buttons.confirmButton = modalConfig.buttons.confirmButton || confirmButton;
                modalConfig.buttons.dismissButton = modalConfig.buttons.dismissButton || dismissButton;
            }
            else {
                modalConfig.buttons = {
                    confirmButton: confirmButton,
                    dismissButton: dismissButton
                };
            }
        };
        RxModalService.prototype.open = function (config, isModal) {
            var _a;
            var api = null;
            var onApiReady = (_a = config.data) === null || _a === void 0 ? void 0 : _a.onApiReady;
            var updatedConfig = Object.assign(Object.assign({}, config), { data: Object.assign(Object.assign({}, config.data), { onApiReady: function (dialogApi) {
                        onApiReady === null || onApiReady === void 0 ? void 0 : onApiReady(dialogApi);
                        api = dialogApi;
                    } }), beforeDismiss: function (reason) {
                    var canClose = !Object.values(i1$1.DismissReasons).includes(reason);
                    if (!canClose) {
                        api === null || api === void 0 ? void 0 : api.dismissDialog();
                    }
                    return canClose;
                } });
            var result = isModal
                ? this.adaptModalService.open(updatedConfig)
                : this.adaptDockedPanelService.open(updatedConfig);
            return result.then(function (data) {
                api = null;
                return data;
            }, function (reason) {
                api = null;
                return Promise.reject(reason);
            });
        };
        /**
         * @deprecated The method is deprecated, use openModal instead
         */
        RxModalService.prototype.openDialog = function (config) {
            return this.open(config, true);
        };
        RxModalService.prototype.openModal = function (config) {
            return this.open(config, true);
        };
        RxModalService.prototype.openDockedPanel = function (config) {
            return this.open(config, false);
        };
        return RxModalService;
    }());
    RxModalService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxModalService, deps: [{ token: i1__namespace$1.AdaptModalService }, { token: i1__namespace$2.TranslateService }, { token: i1__namespace$1.AdaptDockedPanelService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxModalService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxModalService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxModalService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.AdaptModalService }, { type: i1__namespace$2.TranslateService }, { type: i1__namespace$1.AdaptDockedPanelService }]; } });

    var RxModalModule = /** @class */ (function () {
        function RxModalModule() {
        }
        return RxModalModule;
    }());
    RxModalModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxModalModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxModalModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxModalModule, declarations: [RxModalComponent], imports: [i1.CommonModule,
            i3.FormsModule,
            i3.ReactiveFormsModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptModalModule,
            i1$2.TranslateModule,
            i1$1.AdaptRxTextfieldModule] });
    RxModalModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxModalModule, providers: [RxModalService], imports: [[
                i1.CommonModule,
                i3.FormsModule,
                i3.ReactiveFormsModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptModalModule,
                i1$2.TranslateModule,
                i1$1.AdaptRxTextfieldModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxModalModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1.CommonModule,
                            i3.FormsModule,
                            i3.ReactiveFormsModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptModalModule,
                            i1$2.TranslateModule,
                            i1$1.AdaptRxTextfieldModule
                        ],
                        declarations: [RxModalComponent],
                        entryComponents: [RxModalComponent],
                        providers: [RxModalService]
                    }]
            }] });

    var RxUtilityModalsService = /** @class */ (function () {
        function RxUtilityModalsService(rxModalService, translateService) {
            this.rxModalService = rxModalService;
            this.translateService = translateService;
            this.confirmationResult = null;
        }
        RxUtilityModalsService.prototype.confirmExternalChange = function (message) {
            return this.rxModalService.confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: message + " " + this.translateService.instant('com.bmc.arsys.rx.client.common.continue-confirmation.message')
            });
        };
        RxUtilityModalsService.prototype.confirm = function (message, title, style) {
            if (title === void 0) { title = this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'); }
            if (style === void 0) { style = RX_MODAL.modalStyles.warning; }
            return this.rxModalService.confirm({
                title: title,
                modalStyle: style,
                message: message
            });
        };
        RxUtilityModalsService.prototype.confirmUnsavedChanges = function () {
            var _this = this;
            // allow to open only one confirmation dialog
            if (!this.confirmationResult) {
                this.confirmationResult = this.rxModalService
                    .confirm({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: RX_MODAL.modalStyles.warning,
                    message: this.translateService.instant('com.bmc.arsys.rx.client.common.unsaved-data.message')
                }, false)
                    .then(function (result) {
                    _this.confirmationResult = null;
                    return result;
                });
            }
            return this.confirmationResult;
        };
        return RxUtilityModalsService;
    }());
    RxUtilityModalsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUtilityModalsService, deps: [{ token: RxModalService }, { token: i1__namespace$2.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxUtilityModalsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUtilityModalsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUtilityModalsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxModalService }, { type: i1__namespace$2.TranslateService }]; } });

    var RxModalClass = /** @class */ (function () {
        function RxModalClass(context, injector) {
            this.context = context;
            this.injector = injector;
            this._isDirty = false;
            this.dialogApi = {
                dismissDialog: this.dismissDialog.bind(this),
                isDirty: this.isDirty.bind(this)
            };
            this.rxUtilityModalsService = injector.get(RxUtilityModalsService);
        }
        Object.defineProperty(RxModalClass.prototype, "allowDismiss", {
            get: function () {
                var _a;
                return (_a = this.context.getData().allowDismiss) !== null && _a !== void 0 ? _a : true;
            },
            set: function (value) {
                this.context.getData().allowDismiss = value;
            },
            enumerable: false,
            configurable: true
        });
        RxModalClass.prototype.markAsDirty = function () {
            this._isDirty = true;
        };
        RxModalClass.prototype.isDirty = function () {
            return this._isDirty;
        };
        RxModalClass.prototype.ngOnInit = function () {
            this.context.getData().onApiReady(this.dialogApi);
        };
        RxModalClass.prototype.dismissDialog = function () {
            var _this = this;
            if (this.allowDismiss === false) {
                return;
            }
            if (this.isDirty()) {
                this.rxUtilityModalsService.confirmUnsavedChanges().then(function (result) {
                    if (result) {
                        _this.context.dismiss(null);
                    }
                });
            }
            else {
                this.context.dismiss(null);
            }
        };
        return RxModalClass;
    }());
    RxModalClass.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxModalClass, deps: [{ token: i1$1.DockedPanelContext || i1$1.ActiveModalRef }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxModalClass.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxModalClass });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxModalClass, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1$1.DockedPanelContext || i1$1.ActiveModalRef]
                        }] }, { type: i0__namespace.Injector }];
        } });

    var RxNameValuePairsEditorComponent = /** @class */ (function () {
        function RxNameValuePairsEditorComponent(translateService) {
            this.translateService = translateService;
            this.nameValuePairs = [];
            this.addButtonLabel = '';
            this.registerOnTouched = lodash.noop;
        }
        RxNameValuePairsEditorComponent.prototype.writeValue = function (value) {
            if (value !== this.nameValuePairs) {
                this.nameValuePairs = value;
            }
        };
        RxNameValuePairsEditorComponent.prototype.registerOnChange = function (callback) {
            this.onChangeCallback = callback;
        };
        RxNameValuePairsEditorComponent.prototype.validate = function (control) {
            return lodash.some(this.nameValuePairs, { key: '' }) || lodash.some(this.nameValuePairs, { value: '' })
                ? {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.common.required-field.label'),
                    text: this.translateService.instant('com.bmc.arsys.rx.client.view-components.validation.required.message')
                }
                : null;
        };
        RxNameValuePairsEditorComponent.prototype.addNameValuePair = function () {
            this.nameValuePairs.push({
                key: '',
                value: ''
            });
            this.onChangeCallback(this.nameValuePairs);
        };
        RxNameValuePairsEditorComponent.prototype.deleteNameValuePair = function (index) {
            this.nameValuePairs.splice(index, 1);
            this.onChangeCallback(this.nameValuePairs);
        };
        return RxNameValuePairsEditorComponent;
    }());
    RxNameValuePairsEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNameValuePairsEditorComponent, deps: [{ token: i1__namespace$2.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxNameValuePairsEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxNameValuePairsEditorComponent, selector: "rx-name-value-pairs-editor", inputs: { addButtonLabel: "addButtonLabel" }, providers: [
            {
                provide: i3.NG_VALUE_ACCESSOR,
                useExisting: i0.forwardRef(function () { return RxNameValuePairsEditorComponent; }),
                multi: true
            },
            {
                provide: i3.NG_VALIDATORS,
                useExisting: i0.forwardRef(function () { return RxNameValuePairsEditorComponent; }),
                multi: true
            }
        ], ngImport: i0__namespace, template: "<div>\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"tertiary\"\n    class=\"d-icon-plus_circle px-0 align-self-start\"\n    rx-id=\"add-button\"\n    (click)=\"addNameValuePair()\"\n  >\n    {{ addButtonLabel }}\n  </button>\n  <div class=\"d-flex\" *ngFor=\"let pair of nameValuePairs; let $index = index\">\n    <adapt-rx-textfield\n      name=\"name\"\n      [(ngModel)]=\"pair.key\"\n      [required]=\"true\"\n      attr.rx-id=\"name\"\n      placeholder=\"{{ 'com.bmc.arsys.rx.client.name-value-pairs-editor.enter-name.placeholder' | translate }}\"\n      class=\"d-block form-group pr-4 flex-fill\"\n      (ngModelChange)=\"onChangeCallback(nameValuePairs)\"\n      [autofocus]=\"true\"\n    ></adapt-rx-textfield>\n    <adapt-rx-textfield\n      name=\"value\"\n      [(ngModel)]=\"pair.value\"\n      [required]=\"true\"\n      attr.rx-id=\"value\"\n      placeholder=\"{{ 'com.bmc.arsys.rx.client.name-value-pairs-editor.enter-value.placeholder' | translate }}\"\n      class=\"d-block form-group pr-4 flex-fill\"\n      (ngModelChange)=\"onChangeCallback(nameValuePairs)\"\n    ></adapt-rx-textfield>\n    <button\n      class=\"d-icon-trash form-group px-0\"\n      adapt-button\n      btn-type=\"tertiary\"\n      type=\"button\"\n      (click)=\"deleteNameValuePair($index)\"\n    ></button>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textfield{max-width:400px}\n"], components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i1__namespace$2.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNameValuePairsEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-name-value-pairs-editor',
                        templateUrl: './name-value-pairs-editor.component.html',
                        styleUrls: ['./name-value-pairs-editor.component.scss'],
                        providers: [
                            {
                                provide: i3.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return RxNameValuePairsEditorComponent; }),
                                multi: true
                            },
                            {
                                provide: i3.NG_VALIDATORS,
                                useExisting: i0.forwardRef(function () { return RxNameValuePairsEditorComponent; }),
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.TranslateService }]; }, propDecorators: { addButtonLabel: [{
                    type: i0.Input
                }] } });

    var RxNameValuePairsEditorModule = /** @class */ (function () {
        function RxNameValuePairsEditorModule() {
        }
        return RxNameValuePairsEditorModule;
    }());
    RxNameValuePairsEditorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNameValuePairsEditorModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxNameValuePairsEditorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNameValuePairsEditorModule, declarations: [RxNameValuePairsEditorComponent], imports: [i1.CommonModule, i1$1.AdaptRxTextfieldModule, i1$1.AdaptButtonModule, i3.FormsModule, i1$2.TranslateModule], exports: [RxNameValuePairsEditorComponent] });
    RxNameValuePairsEditorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNameValuePairsEditorModule, imports: [[i1.CommonModule, i1$1.AdaptRxTextfieldModule, i1$1.AdaptButtonModule, i3.FormsModule, i1$2.TranslateModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNameValuePairsEditorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxNameValuePairsEditorComponent],
                        imports: [i1.CommonModule, i1$1.AdaptRxTextfieldModule, i1$1.AdaptButtonModule, i3.FormsModule, i1$2.TranslateModule],
                        exports: [RxNameValuePairsEditorComponent]
                    }]
            }] });

    exports.ProgressIndicatorStatus = void 0;
    (function (ProgressIndicatorStatus) {
        ProgressIndicatorStatus["InProgress"] = "In progress";
        ProgressIndicatorStatus["Finished"] = "Finished";
        ProgressIndicatorStatus["Failed"] = "Failed";
    })(exports.ProgressIndicatorStatus || (exports.ProgressIndicatorStatus = {}));

    var ProgressIndicatorModalComponent = /** @class */ (function () {
        function ProgressIndicatorModalComponent(context) {
            this.context = context;
            this.deploymentStatus = exports.ProgressIndicatorStatus;
            this.config = this.context.getData();
        }
        ProgressIndicatorModalComponent.prototype.close = function () {
            this.context.close(false);
        };
        return ProgressIndicatorModalComponent;
    }());
    ProgressIndicatorModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProgressIndicatorModalComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ProgressIndicatorModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProgressIndicatorModalComponent, selector: "rx-progress-indicator-modal", ngImport: i0__namespace, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ config.title }}</h5>\n</div>\n\n<div class=\"modal-body\">\n  <h5 class=\"mt-0\">{{ config.header }}</h5>\n  <p>{{ config.subHeader }}</p>\n\n  <div class=\"operation-status\">\n    <p *ngIf=\"config.status === deploymentStatus.InProgress\" rx-id=\"in-progress-message\">\n      {{ config.inProgressMessage }}\n    </p>\n    <div *ngIf=\"config.status === deploymentStatus.InProgress\" class=\"progress\" rx-id=\"progress-bar\">\n      <div\n        class=\"progress-bar progress-bar-intermediate\"\n        role=\"progressbar\"\n        style=\"width: 100%\"\n        aria-valuenow=\"100\"\n        aria-valuemin=\"0\"\n        aria-valuemax=\"100\"\n      ></div>\n    </div>\n\n    <p\n      *ngIf=\"config.status === deploymentStatus.Finished\"\n      class=\"d-icon-left-check_adapt\"\n      rx-id=\"operation-succeeded-message\"\n    >\n      {{ config.finishedMessage }}\n    </p>\n\n    <p\n      *ngIf=\"config.status === deploymentStatus.Failed\"\n      class=\"d-icon-left-exclamation_triangle\"\n      rx-id=\"operation-failed-message\"\n    >\n      {{ config.failedMessage }}\n    </p>\n\n    <adapt-rx-textarea\n      *ngIf=\"config.operationStatusMessage\"\n      rx-id=\"status-message\"\n      [(ngModel)]=\"config.operationStatusMessage\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.messages.label' | translate }}\"\n      rows=\"20\"\n      readonly=\"true\"\n      name=\"status-message\"\n    ></adapt-rx-textarea>\n  </div>\n</div>\n\n<div class=\"modal-footer d-flex w-100\">\n  <span class=\"mr-auto\" *ngIf=\"config.status === deploymentStatus.InProgress\">\n    {{ 'com.bmc.arsys.rx.innovation-studio.progress.pending.label' | translate }}\n  </span>\n  <button\n    [disabled]=\"config.status === deploymentStatus.InProgress\"\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    (click)=\"context.close()\"\n    rx-id=\"close-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.d-icon-left-check_adapt:before{color:#00a79d}.d-icon-left-exclamation_triangle:before{color:#f83200}.operation-status{display:flex;flex-direction:column;min-height:70px}\n"], components: [{ type: i1__namespace$1.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i1__namespace$2.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProgressIndicatorModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-progress-indicator-modal',
                        templateUrl: './progress-indicator-modal.component.html',
                        styleUrls: ['./progress-indicator-modal.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }]; } });

    var ProgressIndicatorModalModule = /** @class */ (function () {
        function ProgressIndicatorModalModule() {
        }
        return ProgressIndicatorModalModule;
    }());
    ProgressIndicatorModalModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProgressIndicatorModalModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ProgressIndicatorModalModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProgressIndicatorModalModule, declarations: [ProgressIndicatorModalComponent], imports: [i1.CommonModule, i1$2.TranslateModule, i1$1.AdaptButtonModule, i1$1.AdaptRxTextareaModule, i3.FormsModule, i3.ReactiveFormsModule] });
    ProgressIndicatorModalModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProgressIndicatorModalModule, imports: [[i1.CommonModule, i1$2.TranslateModule, i1$1.AdaptButtonModule, i1$1.AdaptRxTextareaModule, i3.FormsModule, i3.ReactiveFormsModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProgressIndicatorModalModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ProgressIndicatorModalComponent],
                        imports: [i1.CommonModule, i1$2.TranslateModule, i1$1.AdaptButtonModule, i1$1.AdaptRxTextareaModule, i3.FormsModule, i3.ReactiveFormsModule]
                    }]
            }] });

    exports.ValidationIssueType = void 0;
    (function (ValidationIssueType) {
        ValidationIssueType["Warning"] = "warning";
        ValidationIssueType["Error"] = "error";
    })(exports.ValidationIssueType || (exports.ValidationIssueType = {}));

    var RxValidationIssuesComponent = /** @class */ (function () {
        function RxValidationIssuesComponent(translateService) {
            this.translateService = translateService;
            this.issueSections = [];
            this.correctIssue = new i0.EventEmitter();
            this.ValidationIssueType = exports.ValidationIssueType;
        }
        RxValidationIssuesComponent.prototype.onCorrectIssue = function (validationIssue) {
            this.correctIssue.emit(validationIssue);
        };
        RxValidationIssuesComponent.prototype.ngOnInit = function () {
            this.emptyText = this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-is-valid.message', {
                definitionTypeDisplayName: this.definitionTypeDisplayName.toLowerCase()
            });
        };
        return RxValidationIssuesComponent;
    }());
    RxValidationIssuesComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxValidationIssuesComponent, deps: [{ token: i1__namespace$2.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxValidationIssuesComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: { definitionTypeDisplayName: "definitionTypeDisplayName", issueSections: "issueSections" }, outputs: { correctIssue: "correctIssue" }, ngImport: i0__namespace, template: "<adapt-accordion [config]=\"{ multiselect: true, tabs: [] }\">\n  <adapt-accordion-tab *ngFor=\"let issueSection of issueSections\" [isOpen]=\"true\" [title]=\"issueSection.title\">\n    <div\n      *ngFor=\"let issue of issueSection.issues\"\n      [ngClass]=\"{\n        'issue-warning': issue.type === ValidationIssueType.Warning,\n        'issue-error': issue.type === ValidationIssueType.Error\n      }\"\n      class=\"issue\"\n    >\n      <span class=\"d-icon-exclamation_triangle\"></span>\n\n      <div class=\"issue-info\">\n        <div class=\"issue-type\">{{ issue.type | titlecase }}</div>\n        <div class=\"description\">{{ issue.description }}</div>\n        <button\n          *ngIf=\"!issue.disableCorrection\"\n          (click)=\"onCorrectIssue(issue)\"\n          type=\"button\"\n          class=\"btn btn-link correct-issue\"\n        >\n          Correct\n        </button>\n      </div>\n    </div>\n  </adapt-accordion-tab>\n</adapt-accordion>\n\n<adapt-alert\n  *ngIf=\"issueSections.length === 0\"\n  class=\"p-3 definition-valid-message\"\n  [config]=\"{\n    content: emptyText,\n    variant: 'success',\n    type: 'inline'\n  }\"\n></adapt-alert>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.issue{display:flex}.issue-error .d-icon-exclamation_triangle{color:#f83200}.issue-warning .d-icon-exclamation_triangle{color:#f1b521}.d-icon-exclamation_triangle{margin-right:10px}.issue-info{flex-grow:1}.issue-type{margin-bottom:15px}.correct-issue{float:right}adapt-accordion-tab ::ng-deep .card-block{word-break:break-word}\n"], components: [{ type: i1__namespace$1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1__namespace$1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i1__namespace$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }], directives: [{ type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "titlecase": i1__namespace.TitleCasePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxValidationIssuesComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-validation-issues',
                        templateUrl: './validation-issues.component.html',
                        styleUrls: ['./validation-issues.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.TranslateService }]; }, propDecorators: { definitionTypeDisplayName: [{
                    type: i0.Input
                }], issueSections: [{
                    type: i0.Input
                }], correctIssue: [{
                    type: i0.Output
                }] } });

    var RxValidationIssuesModule = /** @class */ (function () {
        function RxValidationIssuesModule() {
        }
        return RxValidationIssuesModule;
    }());
    RxValidationIssuesModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxValidationIssuesModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxValidationIssuesModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxValidationIssuesModule, declarations: [RxValidationIssuesComponent], imports: [i1.CommonModule, i1$1.AdaptAccordionModule, i1$2.TranslateModule, i1$1.AdaptAlertModule], exports: [RxValidationIssuesComponent] });
    RxValidationIssuesModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxValidationIssuesModule, imports: [[i1.CommonModule, i1$1.AdaptAccordionModule, i1$2.TranslateModule, i1$1.AdaptAlertModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxValidationIssuesModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i1$1.AdaptAccordionModule, i1$2.TranslateModule, i1$1.AdaptAlertModule],
                        exports: [RxValidationIssuesComponent],
                        declarations: [RxValidationIssuesComponent]
                    }]
            }] });

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var RxVerticalTextTruncateDirective = /** @class */ (function () {
        function RxVerticalTextTruncateDirective(el, renderer) {
            this.el = el;
            this.renderer = renderer;
            this.textToTruncate = '';
            this.rxVerticalTextTruncate = '';
        }
        RxVerticalTextTruncateDirective.prototype.ngAfterViewInit = function () {
            this.truncateText();
        };
        RxVerticalTextTruncateDirective.prototype.ngOnChanges = function () {
            this.truncateText();
        };
        RxVerticalTextTruncateDirective.prototype.truncateText = function () {
            var e_1, _a;
            var el = this.renderer.selectRootElement(this.el.nativeElement, true);
            this.textToTruncate = this.rxVerticalTextTruncate;
            if (this.textToTruncate) {
                var words = this.textToTruncate.trim().replace(/\n|\r/g, '').split(' ');
                var resultValue = '';
                try {
                    for (var words_1 = __values(words), words_1_1 = words_1.next(); !words_1_1.done; words_1_1 = words_1.next()) {
                        var word = words_1_1.value;
                        var innerText = el.innerText;
                        resultValue = innerText + " " + word;
                        if (el.scrollHeight > el.offsetHeight) {
                            // Subtract 3 characters, since we concatenate ...
                            resultValue = innerText.slice(0, innerText.length - 3) + "...";
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (words_1_1 && !words_1_1.done && (_a = words_1.return)) _a.call(words_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                this.renderer.setProperty(el, 'innerText', resultValue);
            }
        };
        return RxVerticalTextTruncateDirective;
    }());
    RxVerticalTextTruncateDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxVerticalTextTruncateDirective, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    RxVerticalTextTruncateDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxVerticalTextTruncateDirective, selector: "[rxVerticalTextTruncate]", inputs: { rxVerticalTextTruncate: "rxVerticalTextTruncate" }, usesOnChanges: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxVerticalTextTruncateDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[rxVerticalTextTruncate]'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }]; }, propDecorators: { rxVerticalTextTruncate: [{
                    type: i0.Input
                }] } });

    var RxVerticalTextTruncateModule = /** @class */ (function () {
        function RxVerticalTextTruncateModule() {
        }
        return RxVerticalTextTruncateModule;
    }());
    RxVerticalTextTruncateModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxVerticalTextTruncateModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxVerticalTextTruncateModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxVerticalTextTruncateModule, declarations: [RxVerticalTextTruncateDirective], exports: [RxVerticalTextTruncateDirective] });
    RxVerticalTextTruncateModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxVerticalTextTruncateModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxVerticalTextTruncateModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxVerticalTextTruncateDirective],
                        exports: [RxVerticalTextTruncateDirective]
                    }]
            }] });

    var RxLineLoaderComponent = /** @class */ (function () {
        function RxLineLoaderComponent() {
            this.loaderMessage = '';
        }
        return RxLineLoaderComponent;
    }());
    RxLineLoaderComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLineLoaderComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxLineLoaderComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxLineLoaderComponent, selector: "rx-line-loader", inputs: { loaderMessage: "loaderMessage" }, ngImport: i0__namespace, template: "<div class=\"adapt-alert-bar\">\n  <div class=\"progress-bar-intermediate lay1\"></div>\n  <div class=\"progress-bar-intermediate lay2\"></div>\n  <div class=\"progress-bar-intermediate lay3\"></div>\n</div>\n<p *ngIf=\"loaderMessage\" class=\"adapt-alert-bar__text\">{{ loaderMessage }}</p>\n", styles: [".adapt-alert-bar__text{text-align:center;padding:10px 0}\n"], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLineLoaderComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-line-loader',
                        templateUrl: './line-loader.component.html',
                        styleUrls: ['./line-loader.component.scss']
                    }]
            }], propDecorators: { loaderMessage: [{
                    type: i0.Input
                }] } });

    var RxLineLoaderModule = /** @class */ (function () {
        function RxLineLoaderModule() {
        }
        return RxLineLoaderModule;
    }());
    RxLineLoaderModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLineLoaderModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxLineLoaderModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLineLoaderModule, declarations: [RxLineLoaderComponent], imports: [i1.CommonModule], exports: [RxLineLoaderComponent] });
    RxLineLoaderModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLineLoaderModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLineLoaderModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxLineLoaderComponent],
                        imports: [i1.CommonModule],
                        exports: [RxLineLoaderComponent]
                    }]
            }] });

    var RxCustomValidatorsDirective = /** @class */ (function () {
        function RxCustomValidatorsDirective() {
        }
        RxCustomValidatorsDirective.prototype.validate = function (control) {
            return this.rxCustomValidators(control);
        };
        return RxCustomValidatorsDirective;
    }());
    RxCustomValidatorsDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCustomValidatorsDirective, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    RxCustomValidatorsDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxCustomValidatorsDirective, selector: "[rxCustomValidators][ngModel],[rxCustomValidators][formControl]", inputs: { rxCustomValidators: "rxCustomValidators" }, providers: [{ provide: i3.NG_VALIDATORS, useExisting: i0.forwardRef(function () { return RxCustomValidatorsDirective; }), multi: true }], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCustomValidatorsDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[rxCustomValidators][ngModel],[rxCustomValidators][formControl]',
                        providers: [{ provide: i3.NG_VALIDATORS, useExisting: i0.forwardRef(function () { return RxCustomValidatorsDirective; }), multi: true }]
                    }]
            }], propDecorators: { rxCustomValidators: [{
                    type: i0.Input
                }] } });

    var RxDirectivesModule = /** @class */ (function () {
        function RxDirectivesModule() {
        }
        return RxDirectivesModule;
    }());
    RxDirectivesModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDirectivesModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxDirectivesModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDirectivesModule, declarations: [RxCustomValidatorsDirective], exports: [RxCustomValidatorsDirective] });
    RxDirectivesModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDirectivesModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDirectivesModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxCustomValidatorsDirective],
                        exports: [RxCustomValidatorsDirective]
                    }]
            }] });

    exports.ConnectionTestStatus = void 0;
    (function (ConnectionTestStatus) {
        ConnectionTestStatus["Invalid"] = "invalid";
        ConnectionTestStatus["Unknown"] = "unknown";
        ConnectionTestStatus["InProgress"] = "inProgress";
        ConnectionTestStatus["Passed"] = "passed";
        ConnectionTestStatus["Failed"] = "failed";
    })(exports.ConnectionTestStatus || (exports.ConnectionTestStatus = {}));

    var RxConnectionTesterComponent = /** @class */ (function () {
        function RxConnectionTesterComponent(translateService) {
            this.translateService = translateService;
            this.status = exports.ConnectionTestStatus.Unknown;
            this.buttonType = 'primary';
            this.testConnection = new i0.EventEmitter();
        }
        RxConnectionTesterComponent.prototype.onTestConnection = function () {
            this.status = exports.ConnectionTestStatus.InProgress;
            this.testConnection.emit();
        };
        RxConnectionTesterComponent.prototype.isConnectionTestFailed = function () {
            return this.status === exports.ConnectionTestStatus.Failed;
        };
        RxConnectionTesterComponent.prototype.isConnectionTestPassed = function () {
            return this.status === exports.ConnectionTestStatus.Passed;
        };
        RxConnectionTesterComponent.prototype.isTestConnectionButtonDisabled = function () {
            return this.status !== exports.ConnectionTestStatus.Unknown;
        };
        RxConnectionTesterComponent.prototype.isConnectionTestInProgress = function () {
            return this.status === exports.ConnectionTestStatus.InProgress;
        };
        return RxConnectionTesterComponent;
    }());
    RxConnectionTesterComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxConnectionTesterComponent, deps: [{ token: i1__namespace$2.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxConnectionTesterComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxConnectionTesterComponent, selector: "rx-connection-tester", inputs: { status: "status", buttonType: "buttonType" }, outputs: { testConnection: "testConnection" }, ngImport: i0__namespace, template: "<div class=\"align-items-baseline d-flex\">\n  <button\n    adapt-button\n    [btn-type]=\"buttonType\"\n    type=\"button\"\n    rx-id=\"test-connection-button\"\n    [adaptInlineLoader]=\"isConnectionTestInProgress()\"\n    activeText=\"{{ 'com.bmc.arsys.rx.client.common.connection-tester.connecting.label' | translate }}\"\n    (click)=\"onTestConnection()\"\n    [disabled]=\"isTestConnectionButtonDisabled()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.connection-tester.test-connection.button.label' | translate }}\n  </button>\n\n  <adapt-alert\n    class=\"ml-4\"\n    *ngIf=\"isConnectionTestFailed()\"\n    [config]=\"{\n      content: translateService.instant('com.bmc.arsys.rx.client.common.connection-tester.connection-failed.message'),\n      variant: 'danger',\n      type: 'inline'\n    }\"\n  ></adapt-alert>\n\n  <adapt-alert\n    class=\"ml-4\"\n    *ngIf=\"isConnectionTestPassed()\"\n    [config]=\"{\n      content: translateService.instant(\n        'com.bmc.arsys.rx.client.common.connection-tester.connection-succeeded.message'\n      ),\n      variant: 'success',\n      type: 'inline'\n    }\"\n  ></adapt-alert>\n</div>\n", components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }], directives: [{ type: i1__namespace$1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1__namespace$2.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxConnectionTesterComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-connection-tester',
                        templateUrl: './connection-tester.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.TranslateService }]; }, propDecorators: { status: [{
                    type: i0.Input
                }], buttonType: [{
                    type: i0.Input
                }], testConnection: [{
                    type: i0.Output
                }] } });

    var RxConnectionTesterModule = /** @class */ (function () {
        function RxConnectionTesterModule() {
        }
        return RxConnectionTesterModule;
    }());
    RxConnectionTesterModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxConnectionTesterModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxConnectionTesterModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxConnectionTesterModule, declarations: [RxConnectionTesterComponent], imports: [i1.CommonModule, i1__namespace$1.AdaptBusyModule, i1__namespace$1.AdaptAlertModule, i1$1.AdaptButtonModule, i1$2.TranslateModule], exports: [RxConnectionTesterComponent] });
    RxConnectionTesterModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxConnectionTesterModule, imports: [[i1.CommonModule, i1$1.AdaptBusyModule.forRoot(), i1$1.AdaptAlertModule.forRoot(), i1$1.AdaptButtonModule, i1$2.TranslateModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxConnectionTesterModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i1$1.AdaptBusyModule.forRoot(), i1$1.AdaptAlertModule.forRoot(), i1$1.AdaptButtonModule, i1$2.TranslateModule],
                        declarations: [RxConnectionTesterComponent],
                        exports: [RxConnectionTesterComponent]
                    }]
            }] });

    var ReadOnlyFieldComponent = /** @class */ (function () {
        function ReadOnlyFieldComponent() {
            this.label = '';
            this.value = '';
        }
        ReadOnlyFieldComponent.prototype.getDisplayValue = function () {
            return !lodash.isNil(this.value) ? this.value : '-';
        };
        return ReadOnlyFieldComponent;
    }());
    ReadOnlyFieldComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    ReadOnlyFieldComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: { label: "label", value: "value" }, ngImport: i0__namespace, template: "<div class=\"focusable\" tabindex=\"0\">\n  <label>{{ label }}</label>\n  <div class=\"read-only-content\" [textContent]=\"getDisplayValue()\" [title]=\"getDisplayValue()\"></div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}label{margin-bottom:.25rem}.read-only-content{font-weight:var(--font-weight-bold);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}\n"] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-read-only-field',
                        templateUrl: './read-only-field.component.html',
                        styleUrls: ['./read-only-field.component.scss']
                    }]
            }], propDecorators: { label: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }] } });

    var ReadOnlyFieldModule = /** @class */ (function () {
        function ReadOnlyFieldModule() {
        }
        return ReadOnlyFieldModule;
    }());
    ReadOnlyFieldModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ReadOnlyFieldModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldModule, declarations: [ReadOnlyFieldComponent], exports: [ReadOnlyFieldComponent] });
    ReadOnlyFieldModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ReadOnlyFieldComponent],
                        exports: [ReadOnlyFieldComponent]
                    }]
            }] });

    var ReadOnlyFieldsComponent = /** @class */ (function () {
        function ReadOnlyFieldsComponent() {
            this.fields = [];
        }
        return ReadOnlyFieldsComponent;
    }());
    ReadOnlyFieldsComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldsComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    ReadOnlyFieldsComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ReadOnlyFieldsComponent, selector: "rx-read-only-fields", inputs: { fields: "fields" }, ngImport: i0__namespace, template: "<rx-read-only-field\n  *ngFor=\"let field of fields\"\n  class=\"d-block form-group\"\n  label=\"{{ field.label }}\"\n  value=\"{{ field.value }}\"\n></rx-read-only-field>\n", styles: [":host ::ng-deep rx-read-only-field .read-only-content{max-height:11em;overflow-y:auto;word-break:break-all;white-space:pre-wrap}\n"], components: [{ type: ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }], directives: [{ type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldsComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-read-only-fields',
                        templateUrl: './read-only-fields.component.html',
                        styleUrls: ['./read-only-fields.component.scss']
                    }]
            }], propDecorators: { fields: [{
                    type: i0.Input
                }] } });

    var ReadOnlyFieldsModule = /** @class */ (function () {
        function ReadOnlyFieldsModule() {
        }
        return ReadOnlyFieldsModule;
    }());
    ReadOnlyFieldsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ReadOnlyFieldsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldsModule, declarations: [ReadOnlyFieldsComponent], imports: [i1.CommonModule, ReadOnlyFieldModule], exports: [ReadOnlyFieldsComponent] });
    ReadOnlyFieldsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldsModule, imports: [[i1.CommonModule, ReadOnlyFieldModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ReadOnlyFieldsComponent],
                        imports: [i1.CommonModule, ReadOnlyFieldModule],
                        exports: [ReadOnlyFieldsComponent]
                    }]
            }] });

    var ReadOnlyFieldsModalComponent = /** @class */ (function () {
        function ReadOnlyFieldsModalComponent(activeModalRef) {
            this.activeModalRef = activeModalRef;
            this.fields = this.activeModalRef.getData().fields;
        }
        ReadOnlyFieldsModalComponent.prototype.close = function () {
            this.activeModalRef.close();
        };
        return ReadOnlyFieldsModalComponent;
    }());
    ReadOnlyFieldsModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldsModalComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ReadOnlyFieldsModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ReadOnlyFieldsModalComponent, selector: "rx-read-only-fields-modal", ngImport: i0__namespace, template: "<div class=\"modal-body\">\n  <rx-read-only-fields [fields]=\"fields\"></rx-read-only-fields>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"close()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":host ::ng-deep rx-read-only-field .read-only-content{max-height:11em;overflow-y:auto;word-break:break-all;white-space:pre-wrap}\n"], components: [{ type: ReadOnlyFieldsComponent, selector: "rx-read-only-fields", inputs: ["fields"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "translate": i1__namespace$2.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldsModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-read-only-fields-modal',
                        templateUrl: './read-only-fields-modal.component.html',
                        styleUrls: ['./read-only-fields-modal.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }]; } });

    var ReadOnlyFieldsModalModule = /** @class */ (function () {
        function ReadOnlyFieldsModalModule() {
        }
        return ReadOnlyFieldsModalModule;
    }());
    ReadOnlyFieldsModalModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldsModalModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ReadOnlyFieldsModalModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldsModalModule, declarations: [ReadOnlyFieldsModalComponent], imports: [i1.CommonModule, ReadOnlyFieldModule, i1$2.TranslateModule, ReadOnlyFieldsModule, i1$1.AdaptButtonModule], exports: [ReadOnlyFieldsModalComponent] });
    ReadOnlyFieldsModalModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldsModalModule, imports: [[i1.CommonModule, ReadOnlyFieldModule, i1$2.TranslateModule, ReadOnlyFieldsModule, i1$1.AdaptButtonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ReadOnlyFieldsModalModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ReadOnlyFieldsModalComponent],
                        imports: [i1.CommonModule, ReadOnlyFieldModule, i1$2.TranslateModule, ReadOnlyFieldsModule, i1$1.AdaptButtonModule],
                        exports: [ReadOnlyFieldsModalComponent]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ProgressIndicatorModalComponent = ProgressIndicatorModalComponent;
    exports.ProgressIndicatorModalModule = ProgressIndicatorModalModule;
    exports.RX_MODAL = RX_MODAL;
    exports.ReadOnlyFieldComponent = ReadOnlyFieldComponent;
    exports.ReadOnlyFieldModule = ReadOnlyFieldModule;
    exports.ReadOnlyFieldsComponent = ReadOnlyFieldsComponent;
    exports.ReadOnlyFieldsModalComponent = ReadOnlyFieldsModalComponent;
    exports.ReadOnlyFieldsModalModule = ReadOnlyFieldsModalModule;
    exports.ReadOnlyFieldsModule = ReadOnlyFieldsModule;
    exports.RxBladeComponent = RxBladeComponent;
    exports.RxBladeModule = RxBladeModule;
    exports.RxBreadcrumbBarComponent = RxBreadcrumbBarComponent;
    exports.RxBreadcrumbBarModule = RxBreadcrumbBarModule;
    exports.RxBusyIndicatorComponent = RxBusyIndicatorComponent;
    exports.RxBusyIndicatorModule = RxBusyIndicatorModule;
    exports.RxConnectionTesterComponent = RxConnectionTesterComponent;
    exports.RxConnectionTesterModule = RxConnectionTesterModule;
    exports.RxCustomValidatorsDirective = RxCustomValidatorsDirective;
    exports.RxDirectivesModule = RxDirectivesModule;
    exports.RxHumanizedDateModule = RxHumanizedDateModule;
    exports.RxHumanizedDatePipe = RxHumanizedDatePipe;
    exports.RxJsonViewerComponent = RxJsonViewerComponent;
    exports.RxJsonViewerModule = RxJsonViewerModule;
    exports.RxLineLoaderComponent = RxLineLoaderComponent;
    exports.RxLineLoaderModule = RxLineLoaderModule;
    exports.RxModalClass = RxModalClass;
    exports.RxModalComponent = RxModalComponent;
    exports.RxModalModule = RxModalModule;
    exports.RxModalService = RxModalService;
    exports.RxNameValuePairsEditorComponent = RxNameValuePairsEditorComponent;
    exports.RxNameValuePairsEditorModule = RxNameValuePairsEditorModule;
    exports.RxUtilityModalsService = RxUtilityModalsService;
    exports.RxValidationIssuesComponent = RxValidationIssuesComponent;
    exports.RxValidationIssuesModule = RxValidationIssuesModule;
    exports.RxVerticalTextTruncateDirective = RxVerticalTextTruncateDirective;
    exports.RxVerticalTextTruncateModule = RxVerticalTextTruncateModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-ui-kit.umd.js.map
