(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@helix/platform/record/api'), require('rxjs'), require('rxjs/operators'), require('lodash')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/chatbot/api', ['exports', '@angular/core', '@helix/platform/record/api', 'rxjs', 'rxjs/operators', 'lodash'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.chatbot = global.helix.platform.chatbot || {}, global.helix.platform.chatbot.api = {}), global.ng.core, global.helix.platform.record.api, global.rxjs, global.rxjs.operators, global.lodash));
})(this, (function (exports, i0, i1, rxjs, operators, lodash) { 'use strict';

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

    var RX_CHATBOTS = {
        chatbotSettings: {
            defaultBotId: 'AGGADGG8ECDC0AP0PA6EPJSIGS75QX',
            recordDefinitionName: 'Chatbot Configuration',
            recordFieldIds: {
                name: 1770,
                bundleId: 61001
            }
        },
        componentSettings: {
            componentName: 'Global Chatbot Configuration Settings',
            settingNames: {
                displayChatbotsDropdown: 'DisplayChatbotsDropdown'
            }
        },
        sections: {
            chatbotConfigurations: {
                title: 'com.bmc.arsys.rx.client.admin.chatbots.chatbot-configurations.title',
                isExpanded: true
            },
            globalChatbotSettings: {
                title: 'com.bmc.arsys.rx.client.admin.chatbots.global-chatbot-settings.title',
                displayChatbotsDropdown: false,
                isExpanded: false
            }
        }
    };

    var RxChatbotDefinitionService = /** @class */ (function () {
        function RxChatbotDefinitionService(rxRecordInstanceService, rxRecordInstanceUpdateService) {
            this.rxRecordInstanceService = rxRecordInstanceService;
            this.rxRecordInstanceUpdateService = rxRecordInstanceUpdateService;
        }
        RxChatbotDefinitionService.prototype.delete = function (recordInstanceIds) {
            var _this = this;
            return rxjs.forkJoin(lodash.map(recordInstanceIds, function (id) {
                return _this.rxRecordInstanceService.delete(RX_CHATBOTS.chatbotSettings.recordDefinitionName, id);
            }));
        };
        RxChatbotDefinitionService.prototype.create = function (chatbotName, bundleDescriptor) {
            var _this = this;
            return this.rxRecordInstanceService.getNew(RX_CHATBOTS.chatbotSettings.recordDefinitionName).pipe(operators.switchMap(function (recordInstance) {
                recordInstance.setFieldValue(RX_CHATBOTS.chatbotSettings.recordFieldIds.name, chatbotName);
                recordInstance.setFieldValue(RX_CHATBOTS.chatbotSettings.recordFieldIds.bundleId, bundleDescriptor.id);
                recordInstance.setFieldValue(i1.RX_RECORD_DEFINITION.coreFieldIds.description, bundleDescriptor.friendlyName + " Chatbot configuration");
                return _this.rxRecordInstanceService.create(recordInstance);
            }));
        };
        RxChatbotDefinitionService.prototype.rename = function (recordInstanceId, newChatbotName) {
            var _this = this;
            return this.rxRecordInstanceService.get(RX_CHATBOTS.chatbotSettings.recordDefinitionName, recordInstanceId).pipe(operators.switchMap(function (recordInstance) {
                recordInstance.setFieldValue(RX_CHATBOTS.chatbotSettings.recordFieldIds.name, newChatbotName);
                return _this.rxRecordInstanceUpdateService.execute(recordInstance);
            }));
        };
        return RxChatbotDefinitionService;
    }());
    RxChatbotDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxChatbotDefinitionService, deps: [{ token: i1__namespace.RxRecordInstanceService }, { token: i1__namespace.RxRecordInstanceUpdateService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxChatbotDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxChatbotDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxChatbotDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxRecordInstanceService }, { type: i1__namespace.RxRecordInstanceUpdateService }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RX_CHATBOTS = RX_CHATBOTS;
    exports.RxChatbotDefinitionService = RxChatbotDefinitionService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-chatbot-api.umd.js.map
