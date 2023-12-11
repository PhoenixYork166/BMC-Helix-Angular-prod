(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common/http'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/config/api', ['exports', '@angular/core', 'rxjs', '@angular/common/http', '@ngx-translate/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.config = global.helix.platform.config || {}, global.helix.platform.config.api = {}), global.ng.core, global.rxjs, global.ng.common.http, global.i2));
})(this, (function (exports, i0, rxjs, i1, i2) { 'use strict';

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
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    exports.ShowInLocationOptions = void 0;
    (function (ShowInLocationOptions) {
        ShowInLocationOptions["Application"] = "Application";
        ShowInLocationOptions["InnovationStudio"] = "InnovationStudio";
        ShowInLocationOptions["Both"] = "Both";
        ShowInLocationOptions["None"] = "None";
    })(exports.ShowInLocationOptions || (exports.ShowInLocationOptions = {}));
    exports.ImpactRowVisibility = void 0;
    (function (ImpactRowVisibility) {
        ImpactRowVisibility["User"] = "User";
        ImpactRowVisibility["None"] = "None";
    })(exports.ImpactRowVisibility || (exports.ImpactRowVisibility = {}));

    var RxConfigDefinitionService = /** @class */ (function () {
        function RxConfigDefinitionService(httpClient, translateService) {
            this.httpClient = httpClient;
            this.translateService = translateService;
            this.url = '/api/rx/application/admin-settings/component';
        }
        RxConfigDefinitionService.prototype.getComponents = function () {
            return this.httpClient.get('/api/rx/application/admin-settings/components-list');
        };
        RxConfigDefinitionService.prototype.get = function (componentName) {
            return this.httpClient.get(this.url + "/" + encodeURIComponent(componentName));
        };
        RxConfigDefinitionService.prototype.update = function (componentName, configDefinition) {
            return this.httpClient.put(this.url + "/" + encodeURIComponent(componentName), configDefinition);
        };
        RxConfigDefinitionService.prototype.create = function (configDefinition) {
            return this.httpClient.post("" + this.url, configDefinition);
        };
        RxConfigDefinitionService.prototype.getNew = function (isApplication) {
            return rxjs.of({
                viewToOpen: 'CommonSettings',
                componentName: null,
                externalLink: null,
                impactRowVisibility: exports.ImpactRowVisibility.None,
                localeList: [
                    {
                        componentLabel: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.default-component-label.label'),
                        firstMenu: null,
                        locale: 'en',
                        secondMenu: null
                    }
                ],
                parentComponentName: null,
                permissions: [],
                registeredModuleName: null,
                settingMetaData: [],
                showInLocation: isApplication ? exports.ShowInLocationOptions.Application : exports.ShowInLocationOptions.InnovationStudio,
                supportsMultiple: false,
                viewComponent: false
            });
        };
        return RxConfigDefinitionService;
    }());
    RxConfigDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxConfigDefinitionService, deps: [{ token: i1__namespace.HttpClient }, { token: i2__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxConfigDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxConfigDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxConfigDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }, { type: i2__namespace.TranslateService }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RxConfigDefinitionService = RxConfigDefinitionService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-config-api.umd.js.map
