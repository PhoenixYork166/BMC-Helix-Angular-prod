import * as i0 from '@angular/core';
import { Injectable, Inject, InjectionToken, isDevMode, LOCALE_ID, Injector, NgModule, ɵmakeDecorator, Component, Pipe, ErrorHandler } from '@angular/core';
import * as i1 from '@angular/common/http';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { of, BehaviorSubject, ReplaySubject, forkJoin, Observable, iif, combineLatest, Subject, throwError, EMPTY, concat, timer, from } from 'rxjs';
import { find, isString, includes, words, upperFirst, last, isUndefined, intersection, defaults, camelCase, findKey, some, head, isEmpty, isNil, values, toNumber, get, isNull, forOwn, isEqual, debounce, isNaN, noop, endsWith, forEach, flow, flatten, map as map$1, uniq, compact, sortBy, filter as filter$1, truncate, reject, cloneDeep, isRegExp, chain, startsWith, isArray, every, has, clone, assign } from 'lodash';
import { map, tap, shareReplay, switchMap, filter, take, mapTo, catchError, first, switchMapTo, takeUntil, startWith } from 'rxjs/operators';
import * as i3$1 from '@angular/common';
import { DOCUMENT, registerLocaleData, CommonModule } from '@angular/common';
import moment from 'moment-es6';
import * as i4 from '@bmc-ux/adapt-angular';
import { AdaptToastModule, AdaptButtonModule } from '@bmc-ux/adapt-angular';
import * as i2 from '@ngx-translate/core';
import { TranslateModule, TranslateLoader, MissingTranslationHandler, TranslateService } from '@ngx-translate/core';
import localeDa from '@angular/common/locales/da';
import localeDe from '@angular/common/locales/de';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localeJa from '@angular/common/locales/ja';
import localeKo from '@angular/common/locales/ko';
import localeNb from '@angular/common/locales/nb';
import localeNl from '@angular/common/locales/nl';
import localePt from '@angular/common/locales/pt';
import localeRu from '@angular/common/locales/ru';
import localeSv from '@angular/common/locales/sv';
import localeZhHans from '@angular/common/locales/zh-Hans';
import * as i3 from '@angular/router';
import { NavigationEnd, DefaultUrlSerializer, NavigationCancel } from '@angular/router';
import * as i2$1 from '@helix/platform/ui-kit';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import * as i2$2 from '@helix/platform/utils';
import { RxError, RxStringService } from '@helix/platform/utils';
import * as i1$1 from '@angular/platform-browser';

const RX_DATA_PAGE = {
    defaultPageSize: 50,
    emptyDataPage: {
        data: [],
        totalSize: 0
    }
};

const DATA_PAGE_API_URL = '/api/rx/application/datapage';
class DataPage {
    constructor(injector, dataPageType, defaultDataPageRequestConfiguration = {}) {
        this.requiredRequestParams = {
            pageSize: -1,
            startIndex: 0
        };
        this.http = injector.get(HttpClient);
        this.dataPageType = dataPageType;
        this.configuration = defaultDataPageRequestConfiguration;
    }
    get(dataPageRequestConfiguration = {}) {
        const requestParams = Object.assign(Object.assign(Object.assign({}, this.requiredRequestParams), this.configuration.params), dataPageRequestConfiguration.params);
        const requestHeaders = Object.assign(Object.assign({}, this.configuration.headers), dataPageRequestConfiguration.headers);
        let params = new HttpParams().set('dataPageType', this.dataPageType);
        Object.keys(requestParams).forEach((name) => {
            params = params.set(name, String(requestParams[name]));
        });
        return this.http.get(DATA_PAGE_API_URL, {
            headers: new HttpHeaders(requestHeaders),
            params
        });
    }
    getEmptyDataPage() {
        return of(RX_DATA_PAGE.emptyDataPage);
    }
    post(dataPageRequestConfiguration = {}) {
        const requestParams = Object.assign(Object.assign(Object.assign({}, this.requiredRequestParams), this.configuration.params), dataPageRequestConfiguration.params);
        const requestHeaders = Object.assign(Object.assign({}, this.configuration.headers), dataPageRequestConfiguration.headers);
        const requestBody = { values: { dataPageType: this.dataPageType } };
        Object.keys(requestParams).forEach((name) => {
            requestBody.values[name] = String(requestParams[name]);
        });
        return this.http.post(DATA_PAGE_API_URL, requestBody, {
            headers: new HttpHeaders(requestHeaders)
        });
    }
}

class RxActionTypeDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.action.datapage.ActionTypeDataPageQuery');
        this.injector = injector;
    }
}
RxActionTypeDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionTypeDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxActionTypeDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionTypeDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionTypeDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxDefinitionNameService {
    getDisplayName(definitionName) {
        const name = definitionName || '';
        return name.substring(name.lastIndexOf(':') + 1);
    }
    getDisplayNameForValidation(definitionName) {
        const name = definitionName || '';
        return name.substring(name.indexOf(':') + 1);
    }
    getDefinitionName(bundleId, displayName) {
        return `${bundleId}:${displayName}`;
    }
    getBundleId(definitionName) {
        const name = definitionName || '';
        const matches = name.match(/(.+):/);
        return (matches && matches.pop()) || '';
    }
}
RxDefinitionNameService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionNameService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDefinitionNameService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionNameService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionNameService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxActionTypeUtilsService {
    constructor(rxDefinitionNameService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
    }
    getActionTypeBundleFriendlyName(bundleDescriptors, actionType) {
        var _a;
        const bundleId = this.rxDefinitionNameService.getBundleId(actionType.actionTypeName);
        return (bundleId && ((_a = find(bundleDescriptors, { id: bundleId })) === null || _a === void 0 ? void 0 : _a.friendlyName)) || '';
    }
    isActionParameterArrayOrList(actionParameter) {
        return isString(actionParameter.dataType) && /^java\.util\.List.*|.*\[.*].*/.test(actionParameter.dataType);
    }
    prettifyActionTypeName(actionTypeName) {
        let result = this.rxDefinitionNameService.getDisplayName(actionTypeName);
        if (!includes(actionTypeName, ' ')) {
            result = words(result, /[a-z|A-Z|0-9]+?([A-Z|0-9]*)+?([-_a-z|0-9]*)+/g)
                .map((value, index) => (index === 0 ? upperFirst(value) : value))
                .join(' ');
        }
        return result;
    }
}
RxActionTypeUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionTypeUtilsService, deps: [{ token: RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Injectable });
RxActionTypeUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionTypeUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionTypeUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxDefinitionNameService }]; } });

class Command {
    constructor(resourceType, httpClient) {
        this.resourceType = resourceType;
        this.httpClient = httpClient;
    }
    execute(data, options) {
        const payload = data instanceof FormData
            ? data
            : Object.assign(Object.assign({}, data), { resourceType: this.resourceType });
        return this.httpClient.post('/api/rx/application/command', payload, options);
    }
}

class RxCommandFactoryService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    forResourceType(resourceType) {
        return new Command(resourceType, this.httpClient);
    }
}
RxCommandFactoryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCommandFactoryService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxCommandFactoryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCommandFactoryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCommandFactoryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });

const API_URL = '/api/rx/application/admin-settings/local';
const SETTINGS_API_URL = '/api/rx/application/admin-settings/component';
class RxAdminSettingsService {
    constructor(httpClient, rxCommandFactoryService) {
        this.httpClient = httpClient;
        this.rxCommandFactoryService = rxCommandFactoryService;
    }
    getComponentGridData(componentName, customHeaders) {
        return this.httpClient.get(`${API_URL}/component-griddata/${componentName}`, {
            headers: new HttpHeaders(customHeaders || {})
        });
    }
    getComponentDefinition(componentName, customHeaders) {
        return this.httpClient.get(`${API_URL}/component-definition/${componentName}`, {
            headers: new HttpHeaders(customHeaders || {})
        });
    }
    getAdminNavigationMenuItems() {
        return this.httpClient
            .get(`${API_URL}/navigation-menu`)
            .pipe(map((navigationMenu) => navigationMenu.AdminNavigationMenu.items));
    }
    getComponentSettings(componentName, customHeaders) {
        return this.httpClient.get(`${API_URL}/component-settings/${componentName}`, {
            headers: new HttpHeaders(customHeaders || {})
        });
    }
    deleteComponentSettings(componentName, customHeaders) {
        return this.httpClient.delete(`${API_URL}/component-settings/${componentName}`, {
            headers: new HttpHeaders(customHeaders || {})
        });
    }
    createComponentSettings(componentName, data, customHeaders) {
        return this.httpClient
            .post(`${API_URL}/component-settings/${componentName}`, data, {
            headers: new HttpHeaders(customHeaders || {}),
            observe: 'response'
        })
            .pipe(map((response) => { var _a; return last((_a = response.headers.get('location')) === null || _a === void 0 ? void 0 : _a.split('/')) || ''; }));
    }
    updateComponentSettings(componentName, data, customHeaders) {
        return this.httpClient.put(`${API_URL}/component-settings/${componentName}`, data, {
            headers: new HttpHeaders(customHeaders || {})
        });
    }
    getAdminSetting(componentName, customHeaders) {
        return this.httpClient.get(`${SETTINGS_API_URL}/${componentName}`, {
            headers: new HttpHeaders(customHeaders || {})
        });
    }
    createAdminSetting(data) {
        return this.httpClient.post(SETTINGS_API_URL, data);
    }
    updateAdminSetting(data) {
        return this.httpClient.put(`${SETTINGS_API_URL}/${data.componentName}`, data);
    }
    deleteAdminSetting(definitionNames) {
        return this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.admin.command.DeleteAdminSettingsComponentDefinitionsCommand')
            .execute({ definitionNames });
    }
}
RxAdminSettingsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminSettingsService, deps: [{ token: i1.HttpClient }, { token: RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAdminSettingsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminSettingsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminSettingsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: RxCommandFactoryService }]; } });

const RX_ADMINISTRATION = {
    settingNames: {
        newApplicationUiOptOut: 'New application UI opt out',
        newViewDesignerOptOut: 'New view designer opt out'
    },
    systemConfigurationUrl: '/api/rx/application/systemconfiguration',
    submitterModes: {
        locked: 1
    },
    configurationSettingTypes: {
        shared: {
            configurationType: 'shared-settings',
            value: 'shared'
        },
        inbundle: {
            configurationType: 'in-bundle-settings',
            value: 'inBundle'
        },
        external: {
            configurationType: 'external-settings',
            value: 'external'
        }
    },
    settingAccessOptions: {
        application: {
            value: 'Application'
        },
        innovationStudio: {
            value: 'InnovationStudio'
        },
        both: {
            value: 'Both'
        },
        none: {
            value: 'None'
        }
    }
};

class RxSystemConfigurationService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.systemConfigurations = {};
    }
    initialize() {
        return this.queryConfiguration(['Submitter-Mode']).pipe(tap((systemConfigurations) => {
            this.systemConfigurations = systemConfigurations.reduce((configs, systemConfiguration) => {
                configs[systemConfiguration.id] = systemConfiguration.value;
                return configs;
            }, {});
        }));
    }
    getConfigurationSync(identifier) {
        if (this.systemConfigurations) {
            const configValue = this.systemConfigurations[identifier];
            if (isUndefined(configValue)) {
                throw new Error(`System configuration ${identifier} is not available.`);
            }
            return configValue;
        }
        else {
            throw new Error('System configuration service is not initialized.');
        }
    }
    getConfiguration(configurationName) {
        return this.httpClient.get(`${RX_ADMINISTRATION.systemConfigurationUrl}/${configurationName}`);
    }
    setConfiguration(configurationName, configurationValue) {
        return this.httpClient.put(`${RX_ADMINISTRATION.systemConfigurationUrl}/${configurationName}`, {
            name: configurationName,
            value: isString(configurationValue) ? configurationValue : JSON.stringify(configurationValue)
        });
    }
    queryConfiguration(identifiers) {
        const queryString = identifiers.map((identifier) => `identifier=${encodeURIComponent(identifier)}`).join('&');
        return this.httpClient.get(`${RX_ADMINISTRATION.systemConfigurationUrl}/query?${queryString}`);
    }
}
RxSystemConfigurationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSystemConfigurationService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxSystemConfigurationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSystemConfigurationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSystemConfigurationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });

class RxDataPageFactoryService {
    constructor(injector) {
        this.injector = injector;
    }
    withType(dataPageType, defaultDataPageRequestConfiguration) {
        return new DataPage(this.injector, dataPageType, defaultDataPageRequestConfiguration);
    }
}
RxDataPageFactoryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataPageFactoryService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxDataPageFactoryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataPageFactoryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataPageFactoryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxAdminComponentDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.admin.datapage.AdminComponentDataPageQuery');
        this.injector = injector;
    }
}
RxAdminComponentDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminComponentDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxAdminComponentDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminComponentDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminComponentDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

const RX_APPLICATION = {
    platformBundleId: 'com.bmc.arsys.rx.client',
    platformBundleIdPrefix: 'com.bmc.arsys.',
    platformBundleIds: {
        approvalCoreService: 'com.bmc.dsom.approval-core-service',
        foundation: 'com.bmc.arsys.rx.foundation'
    },
    chatbotBundleId: 'com.bmc.dsm.chatbot',
    settingsBundleId: 'com.bmc.arsys.rx.settings',
    shellDefinitionName: 'BMC Modern Shell',
    environmentConfigurationBundleId: 'com.bmc.arsys.rx.environment-configuration',
    innovationStudioBundleId: 'com.bmc.arsys.rx.innovationstudio',
    standardlib: 'standardlib',
    approvalBundleId: 'com.bmc.arsys.rx.approval',
    dataloadBundleId: 'com.bmc.arsys.rx.dataload',
    angularJsApplicationBundleIds: [
        'com.bmc.arsys.rx.settings',
        'com.bmc.bsm.chatops',
        'com.bmc.dsm.chatbot',
        'com.bmc.dsm.comaroundMigration',
        'com.example.taskmanager',
        'com.example.taskmanager-lib'
    ],
    angularJsViewDesignerBundleIds: ['com.example.taskmanager', 'com.example.taskmanager-lib'],
    ipaasJitterbitBundleId: 'com.bmc.dsm.ipaas-jitterbit',
    ipaasMulesoftBundleId: 'com.bmc.dsm.ipaas-mulesoft',
    routeReuseStrategies: {
        checkParentParams: 'checkParentParams'
    }
};

class RxBundleDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.bundle.datapage.BundleDescriptorDataPageQuery', {
            params: {
                includeNonLicensedBundles: true
            }
        });
        this.injector = injector;
    }
}
RxBundleDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxBundleDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxCurrentUserService {
    constructor() {
        this.userSubject$ = new BehaviorSubject(null);
        this.user$ = this.userSubject$.asObservable().pipe(shareReplay(1));
    }
    getPreferredLocale() {
        var _a, _b;
        return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.preferredLocale) !== null && _b !== void 0 ? _b : '';
    }
    getPreferredUserLocale() {
        var _a, _b;
        return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.preferredUserLocale) !== null && _b !== void 0 ? _b : '';
    }
    getName() {
        var _a, _b;
        return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.loginName) !== null && _b !== void 0 ? _b : '';
    }
    set(user) {
        this.userSubject$.next(user);
    }
    get() {
        return this.userSubject$.getValue();
    }
    isBusinessAnalyst() {
        var _a, _b;
        return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.isBusinessAnalyst) !== null && _b !== void 0 ? _b : false;
    }
    isAdministrator() {
        var _a, _b;
        return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.isAdministrator) !== null && _b !== void 0 ? _b : false;
    }
    getEditableBundles() {
        var _a;
        return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.editableBundles) || [];
    }
    isSupportStaff() {
        var _a, _b;
        return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.supportStaff) !== null && _b !== void 0 ? _b : false;
    }
    isAvailableForAssignment() {
        var _a, _b;
        return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.assignmentAvailable) !== null && _b !== void 0 ? _b : false;
    }
    setAssignmentAvailability(assignmentAvailable) {
        const user = this.get();
        if (user) {
            user.assignmentAvailable = assignmentAvailable;
        }
    }
}
RxCurrentUserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCurrentUserService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxCurrentUserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCurrentUserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCurrentUserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

var LogCategory;
(function (LogCategory) {
    LogCategory["Sql"] = "sql";
    LogCategory["Api"] = "api";
    LogCategory["Rule"] = "rule";
    LogCategory["Process"] = "process";
    LogCategory["Bundle"] = "bundle";
    LogCategory["Cli"] = "cli";
    LogCategory["All"] = "all";
})(LogCategory || (LogCategory = {}));
const RX_LOG = {
    serverLogCategories: [LogCategory.Sql, LogCategory.Api, LogCategory.Rule, LogCategory.Process, LogCategory.Bundle],
    clientLogCategories: [LogCategory.Cli]
};

const sessionLogCategoriesKey = 'RX_LOG_CATEGORIES';
// tslint:disable:no-console
class RxLogService {
    constructor(rxCurrentUserService) {
        this.rxCurrentUserService = rxCurrentUserService;
        this.serverCategories = '';
        this.shouldLogEverything = false;
        try {
            const storedCategories = sessionStorage.getItem(sessionLogCategoriesKey);
            this.categories = storedCategories ? JSON.parse(storedCategories) : [];
        }
        catch (e) {
            this.categories = [];
        }
        this.configure(this.categories);
    }
    get logCategories() {
        return this.categories || [];
    }
    get serverLogCategories() {
        return this.serverCategories;
    }
    configure(categories) {
        this.shouldLogEverything = includes(categories, LogCategory.All);
        this.serverCategories = this.shouldLogEverything
            ? RX_LOG.serverLogCategories.join(',')
            : intersection(categories, RX_LOG.serverLogCategories).join(',');
        this.categories = this.shouldLogEverything ? [LogCategory.All] : categories;
        this.categories.length
            ? sessionStorage.setItem(sessionLogCategoriesKey, JSON.stringify(this.categories))
            : sessionStorage.removeItem(sessionLogCategoriesKey);
    }
    error(message) {
        console.error(this.prepareLogMessage(message, 'E'));
    }
    warning(message) {
        console.warn(this.prepareLogMessage(message, 'W'));
    }
    info(message) {
        if (this.shouldLogEverything || includes(this.logCategories, LogCategory.Cli)) {
            console.info(this.prepareLogMessage(message, 'I'));
        }
    }
    debug(message) {
        if (this.shouldLogEverything || includes(this.logCategories, LogCategory.Cli)) {
            console.debug(this.prepareLogMessage(message, 'D'));
        }
    }
    log(message) {
        if (this.logCategories.length) {
            console.log(message);
        }
    }
    // tslint:disable:no-trailing-whitespace
    prepareLogMessage(text, type) {
        const currentUser = this.rxCurrentUserService.get();
        return (`<CLI${type}> ` +
            '<TID: 0000000000> ' +
            '<RPC ID: 0000000000> ' +
            '<Queue:           > ' +
            `<USER: ${currentUser ? currentUser.loginName : ''}                                        > ` +
            '<Tenant-ID:                                             > ' +
            `<Overlay-Group: ${currentUser ? currentUser.defaultOverlayGroupId : ''}         > ` +
            `/* ${moment().format('ddd MMM DD YYYY HH:mm:ss.SSSS')} */ ${text}`);
    }
}
RxLogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLogService, deps: [{ token: RxCurrentUserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxCurrentUserService }]; } });

var RxBundleLoadType;
(function (RxBundleLoadType) {
    RxBundleLoadType["always"] = "always";
    RxBundleLoadType["lazy"] = "lazy";
    RxBundleLoadType["never"] = "never";
})(RxBundleLoadType || (RxBundleLoadType = {}));

class RxFunctionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.workflow.datapage.FunctionDescriptorDataPageQuery');
        this.injector = injector;
    }
}
RxFunctionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFunctionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxFunctionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFunctionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFunctionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxGlobalCacheService {
    constructor(rxBundleDataPageService, rxFunctionDataPageService, rxLogService) {
        this.rxBundleDataPageService = rxBundleDataPageService;
        this.rxFunctionDataPageService = rxFunctionDataPageService;
        this.rxLogService = rxLogService;
        this.bundleDescriptorsById = {};
        this.bundleDescriptors = null;
        this.functionDescriptors = null;
        this.applicationIdValue = '';
        this.applicationIdSubject = new ReplaySubject(1);
        this.applicationId$ = this.applicationIdSubject.asObservable();
    }
    get applicationId() {
        return this.applicationIdValue;
    }
    set applicationId(value) {
        if (this.applicationIdValue !== value) {
            this.applicationIdValue = value;
            this.applicationIdSubject.next(value);
            this.rxLogService.debug(`RxGlobalCacheService: application ID set to ${value}`);
        }
    }
    getBundleDescriptors() {
        if (!this.bundleDescriptors) {
            this.bundleDescriptors = this.rxBundleDataPageService.get().pipe(map((bundleDescriptors) => bundleDescriptors.data.map((dataPageData) => {
                var _a;
                const defaultUiOptions = {
                    options: {
                        loadJs: RxBundleLoadType.always,
                        loadCss: RxBundleLoadType.always
                    }
                };
                let uiOptions;
                try {
                    uiOptions = (_a = JSON.parse(dataPageData.uiOptions)) !== null && _a !== void 0 ? _a : defaultUiOptions;
                    if (Boolean(uiOptions.options) && typeof uiOptions.options === 'object') {
                        defaults(uiOptions.options, defaultUiOptions.options);
                    }
                    else {
                        this.rxLogService.warning(`Invalid structure of uiOptions in bundle ${dataPageData.name}.`);
                        uiOptions = defaultUiOptions;
                    }
                }
                catch (e) {
                    this.rxLogService.warning(`Cannot parse uiOptions in bundle ${dataPageData.name}.`);
                    uiOptions = defaultUiOptions;
                }
                return Object.assign(Object.assign({}, dataPageData), { uiOptions });
            })), shareReplay(1));
        }
        return this.bundleDescriptors;
    }
    getFunctionDescriptors() {
        if (!this.functionDescriptors) {
            this.functionDescriptors = this.rxFunctionDataPageService.get().pipe(map((dataPage) => dataPage.data), shareReplay(1));
        }
        return this.functionDescriptors;
    }
    getLicensedBundleDescriptors() {
        return this.getBundleDescriptors().pipe(map((bundleDescriptors) => bundleDescriptors.filter((bundleDescriptor) => bundleDescriptor.isLicensed)));
    }
    getBundleDescriptor(bundleId) {
        if (!this.bundleDescriptorsById[bundleId]) {
            this.bundleDescriptorsById[bundleId] = this.getBundleDescriptors().pipe(map((bundleDescriptors) => bundleDescriptors.find((bundleDescriptor) => bundleDescriptor.id === bundleId)), shareReplay(1));
        }
        return this.bundleDescriptorsById[bundleId];
    }
    getApplicationBundleDescriptor() {
        return this.applicationIdSubject.pipe(switchMap((applicationId) => this.getBundleDescriptor(applicationId)));
    }
    _getBundleFriendlyName(descriptor, defaultValue) {
        return (descriptor === null || descriptor === void 0 ? void 0 : descriptor.friendlyName) || (descriptor === null || descriptor === void 0 ? void 0 : descriptor.id) || defaultValue || '';
    }
    getBundleFriendlyName(bundleId, defaultValue) {
        return this.getBundleDescriptor(bundleId).pipe(map((bundleDescriptor) => this._getBundleFriendlyName(bundleDescriptor, defaultValue)));
    }
    getBundleDisplayName(bundleId) {
        return this.getBundleDescriptor(bundleId).pipe(map((bundleDescriptor) => (this.applicationId !== RX_APPLICATION.innovationStudioBundleId && (bundleDescriptor === null || bundleDescriptor === void 0 ? void 0 : bundleDescriptor.localizedDisplayName)) ||
            this._getBundleFriendlyName(bundleDescriptor)));
    }
    clear() {
        this.bundleDescriptorsById = {};
        this.bundleDescriptors = null;
        this.functionDescriptors = null;
        this.rxLogService.debug('RxGlobalCacheService: cleared.');
    }
}
RxGlobalCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGlobalCacheService, deps: [{ token: RxBundleDataPageService }, { token: RxFunctionDataPageService }, { token: RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxGlobalCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGlobalCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGlobalCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxBundleDataPageService }, { type: RxFunctionDataPageService }, { type: RxLogService }]; } });

class RxBundleService {
    constructor(document, compiler, httpClient, injector, rxGlobalCacheService, rxLogService) {
        this.document = document;
        this.compiler = compiler;
        this.httpClient = httpClient;
        this.injector = injector;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxLogService = rxLogService;
        this.baseUrl = '/api/rx/application/bundle/bundledescriptor/';
        this.bundleJs = {};
        this.bundleCss = {};
    }
    get(bundleId, options) {
        const url = this.baseUrl + bundleId;
        return this.httpClient.get(url, options);
    }
    // During login we issue a call to bundle descriptor rest api to get the current bundle
    // information. If the user is not logged in yet we have to call the jsonp
    // version that does not return an object but a method passing the object:
    // rxLoadBundles({...}).
    // Since we do not have this method in Angular (not in bootstrap.js), the workaround is to
    // read the jsonp answer as text, extract the content withing the method call using regexp
    // and then parse the bundle descriptor object.
    getFromJsonp(bundleId) {
        return this.httpClient.get(this.baseUrl + bundleId + '/jsonp', { responseType: 'text' }).pipe(map((jsonpResult) => {
            return JSON.parse(/\(([^)]+)\)/.exec(jsonpResult)[1]);
        }));
    }
    loadBundles(bundleIds, force) {
        const loaders$ = bundleIds.map((bundleId) => this.rxGlobalCacheService.getBundleDescriptor(bundleId).pipe(tap((bundleDescriptor) => {
            if (force ||
                bundleDescriptor.uiOptions.options.loadCss === RxBundleLoadType.always ||
                includes(bundleDescriptor.uiOptions.applicationInitializers, this.rxGlobalCacheService.applicationId)) {
                this.loadBundleCss(bundleDescriptor);
            }
        }), switchMap((bundleDescriptor) => force ||
            bundleDescriptor.uiOptions.options.loadJs === RxBundleLoadType.always ||
            includes(bundleDescriptor.uiOptions.applicationInitializers, this.rxGlobalCacheService.applicationId)
            ? this.loadBundle(bundleDescriptor)
            : of({ bundleId: bundleDescriptor.id, isBundleCompiled: false, isFileLoaded: false }))));
        return forkJoin(loaders$);
    }
    loadBundle(bundleDescriptor) {
        if (!this.bundleJs[bundleDescriptor.id]) {
            this.bundleJs[bundleDescriptor.id] = this.loadBundleJs(bundleDescriptor).pipe(switchMap((bundleContext) => this.compileBundle(bundleContext)), shareReplay(1));
        }
        return this.bundleJs[bundleDescriptor.id];
    }
    compileBundle(bundleContext) {
        return new Observable((observer) => {
            var _a, _b;
            if (bundleContext.isFileLoaded) {
                bundleContext.module.then((module) => {
                    const moduleName = `${upperFirst(camelCase(bundleContext.bundleId))}Module`;
                    try {
                        const factory = this.compiler.compileModuleSync(module[moduleName]);
                        if (factory) {
                            factory.create(this.injector);
                            bundleContext.isBundleCompiled = true;
                            this.rxLogService.debug(`${bundleContext.bundleId}: loaded successfully.`);
                        }
                        else {
                            this.rxLogService.error(`ERROR! ${bundleContext.bundleId}: cannot find module factory for ${moduleName}.`);
                        }
                    }
                    catch (error) {
                        this.rxLogService.error(`ERROR! ${bundleContext.bundleId}:\n${error}`);
                    }
                    observer.next(bundleContext);
                    observer.complete();
                });
            }
            else {
                this.rxLogService.error(`ERROR! ${bundleContext.bundleId}:\n${(_b = (_a = bundleContext.message) === null || _a === void 0 ? void 0 : _a.stack) !== null && _b !== void 0 ? _b : bundleContext.message}`);
                observer.next(bundleContext);
                observer.complete();
            }
        });
    }
    loadBundleJs(bundleDescriptor) {
        const dasherizedBundleId = bundleDescriptor.id.replace(/\./g, '-');
        const cacheBuster = new Date(bundleDescriptor.lastDeployedTime).getTime();
        const fileName = `../${bundleDescriptor.id}/scripts/libs_${dasherizedBundleId}_src_index_ts.js?_v=${cacheBuster}`;
        const modulePathMapping = `./libs/${dasherizedBundleId}/src/index.ts`;
        this.rxLogService.debug(`${bundleDescriptor.id}: loading from ${fileName}.`);
        // WARNING! webpackIgnore comment below is critical for dynamic imports to work, DO NOT REMOVE!
        const module = import(/* webpackIgnore: true */ `${fileName}`).then(
        // WARNING! comment below is critical for dynamic imports to work, DO NOT REMOVE!
        // @ts-ignore
        __webpack_require__.bind(null, `${modulePathMapping}`));
        return new Observable((observer) => {
            module.then(() => {
                observer.next({
                    bundleId: bundleDescriptor.id,
                    isBundleCompiled: false,
                    isFileLoaded: true,
                    module: module
                });
                observer.complete();
            }, (error) => {
                observer.next({
                    bundleId: bundleDescriptor.id,
                    isBundleCompiled: false,
                    isFileLoaded: false,
                    message: error
                });
                observer.complete();
            });
        });
    }
    loadBundleCss(bundleDescriptor) {
        if (!this.bundleCss[bundleDescriptor.id]) {
            const cacheBuster = new Date(bundleDescriptor.lastDeployedTime).getTime();
            const link = document.createElement('link');
            link.id = bundleDescriptor.id;
            link.href = `/${bundleDescriptor.id}/scripts/${bundleDescriptor.id.replace(/\./g, '-')}.css?_v=${cacheBuster}`;
            link.type = 'text/css';
            link.rel = 'stylesheet';
            this.document.head.appendChild(link);
            this.bundleCss[bundleDescriptor.id] = true;
        }
    }
}
RxBundleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleService, deps: [{ token: DOCUMENT }, { token: i0.Compiler }, { token: i1.HttpClient }, { token: i0.Injector }, { token: RxGlobalCacheService }, { token: RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxBundleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Compiler }, { type: i1.HttpClient }, { type: i0.Injector }, { type: RxGlobalCacheService }, { type: RxLogService }]; } });

const bundleTypes = {
    application: 'Application',
    library: 'Library'
};
const definitionScopeNames = {
    application: bundleTypes.application,
    library: bundleTypes.library,
    public: 'Public'
};
const definitionScopeTypes = {
    bundle: 'BUNDLE',
    public: 'PUBLIC'
};
const RX_BUNDLE = {
    bundleTypes,
    definitionScopeNames,
    definitionScopeTypes,
    definitionScopes: {
        application: {
            displayName: definitionScopeNames.application,
            type: definitionScopeTypes.bundle
        },
        library: {
            displayName: definitionScopeNames.library,
            type: definitionScopeTypes.bundle
        },
        public: {
            displayName: definitionScopeNames.public,
            type: definitionScopeTypes.public
        }
    },
    applicationDefinitionScopeSelectionOptions: [
        {
            id: definitionScopeTypes.bundle,
            name: definitionScopeNames.application
        },
        {
            id: definitionScopeTypes.public,
            name: definitionScopeNames.public
        }
    ],
    libraryDefinitionScopeSelectionOptions: [
        {
            id: definitionScopeTypes.bundle,
            name: definitionScopeNames.library
        },
        {
            id: definitionScopeTypes.public,
            name: definitionScopeNames.public
        }
    ]
};

class RxDefinitionService {
    getScopeName(definitionScopeType, bundleDescriptor) {
        return definitionScopeType === RX_BUNDLE.definitionScopeTypes.bundle
            ? bundleDescriptor.isApplication
                ? RX_BUNDLE.definitionScopeNames.application
                : RX_BUNDLE.definitionScopeNames.library
            : RX_BUNDLE.definitionScopeNames.public;
    }
}
RxDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxBundleCacheService {
    constructor(rxActionTypeDataPageService, rxLogService, rxGlobalCacheService, rxDefinitionService) {
        this.rxActionTypeDataPageService = rxActionTypeDataPageService;
        this.rxLogService = rxLogService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxDefinitionService = rxDefinitionService;
        this.actionTypes$ = this.rxActionTypeDataPageService
            .get({ params: { requireDependent: true } })
            .pipe(map((actionTypes) => actionTypes.data), shareReplay(1));
        this.bundleIdSubject$ = new ReplaySubject(1);
        this.bundleId$ = this.bundleIdSubject$.asObservable();
    }
    get bundleId() {
        return this.bundleIdValue;
    }
    set bundleId(value) {
        this.bundleIdValue = value;
        this.bundleIdSubject$.next(value);
        this.rxLogService.debug(`RxBundleCacheService: bundle ID set to ${value}`);
    }
    getActionTypes() {
        return this.actionTypes$;
    }
    getCurrentBundleDescriptor() {
        return this.bundleId$.pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleDescriptor(bundleId)));
    }
    getDefinitionScopeName(definitionScopeType) {
        return this.getCurrentBundleDescriptor().pipe(map((bundleDescriptor) => this.rxDefinitionService.getScopeName(definitionScopeType, bundleDescriptor)));
    }
    getDefinitionScopeSelectionOptions() {
        return this.getCurrentBundleDescriptor().pipe(map((bundleDescriptor) => bundleDescriptor.isApplication
            ? RX_BUNDLE.applicationDefinitionScopeSelectionOptions
            : RX_BUNDLE.libraryDefinitionScopeSelectionOptions));
    }
}
RxBundleCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleCacheService, deps: [{ token: RxActionTypeDataPageService }, { token: RxLogService }, { token: RxGlobalCacheService }, { token: RxDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxBundleCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxActionTypeDataPageService }, { type: RxLogService }, { type: RxGlobalCacheService }, { type: RxDefinitionService }]; } });

const RX_DEFAULT_STRINGS = new InjectionToken('RX_DEFAULT_STRINGS');

const RX_BUILD_ENVIRONMENT = new InjectionToken('buildEnvironment');

class RxRssoDebugService {
    constructor(rxBuildEnvironment) {
        this.rxBuildEnvironment = rxBuildEnvironment;
    }
    isRssoDebugEnabled() {
        return isDevMode() && Boolean(this.rxBuildEnvironment.isRssoDebugEnabled);
    }
}
RxRssoDebugService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRssoDebugService, deps: [{ token: RX_BUILD_ENVIRONMENT }], target: i0.ɵɵFactoryTarget.Injectable });
RxRssoDebugService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRssoDebugService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRssoDebugService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [RX_BUILD_ENVIRONMENT]
                }] }]; } });

const SUPPORTED_LOCALES = {
    de: { adapt: 'de-de' },
    en: { adapt: 'en-us' },
    es: { adapt: 'es-es' },
    fr: { adapt: 'fr-fr' },
    it: { adapt: 'it-it' },
    ja: { adapt: 'ja-jp' },
    ko: { adapt: 'ko-kr' },
    nl: { adapt: 'nl-nl' },
    pt: { adapt: 'pt-br' },
    ru: { adapt: 'ru-ru' },
    sv: { adapt: 'sv-se' },
    da: { adapt: 'da-dk' },
    no: { moment: 'nb', angular: 'nb', adapt: 'no-no', similar: ['nb', 'nn'] },
    'zh-Hans': { moment: 'zh-CN', adapt: 'zh-cn', similar: ['zh-CN'] }
};
const LOGIN_LOCALE = 'login';
const DEFAULT_LOCALE = 'en';
class RxLocalizationService {
    constructor(httpClient, translateService, rxCurrentUserService, adaptTranslateService, rxRssoDebugService, document, defaultStrings) {
        this.httpClient = httpClient;
        this.translateService = translateService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.adaptTranslateService = adaptTranslateService;
        this.rxRssoDebugService = rxRssoDebugService;
        this.document = document;
        this.defaultStrings = defaultStrings;
        this.currentLocale = DEFAULT_LOCALE;
        this.angularLocale = DEFAULT_LOCALE;
        this.onTranslationsLoaded$ = this.translateService.onLangChange.pipe(shareReplay(1));
        this.loginLocalizedStrings$ = this.getLocalizedStringsForLoginPage().pipe(shareReplay(1));
        this.preferredLocale$ = this.rxCurrentUserService.user$.pipe(filter(Boolean), take(1), map(() => this.rxCurrentUserService.getPreferredLocale() || this.rxCurrentUserService.getPreferredUserLocale()), switchMap((preferredLocale) => preferredLocale
            ? of(preferredLocale)
            : this.loginLocalizedStrings$.pipe(map((response) => Object.keys(response.body)[0]))), map((locale) => this.normalizeLocale(locale)), shareReplay(1));
    }
    getDefaultApplicationStrings() {
        return this.defaultStrings;
    }
    setDefaultApplicationStrings(defaultApplicationStrings) {
        this.defaultStrings = Object.assign(Object.assign({}, this.defaultStrings), defaultApplicationStrings);
    }
    initLoginTranslations() {
        return this.loginLocalizedStrings$.pipe(map((response) => response.body), tap((payload) => {
            const localeKey = Object.keys(payload)[0];
            this.setLocale(this.normalizeLocale(localeKey));
            this.translateService.setTranslation(LOGIN_LOCALE, payload[localeKey], true);
        }), switchMap(() => this.translateService.use(LOGIN_LOCALE)));
    }
    initTranslations(useDefault = false) {
        return (useDefault ? of(DEFAULT_LOCALE) : this.preferredLocale$).pipe(switchMap((locale) => this.translateService.use(locale).pipe(mapTo(locale))), tap((locale) => {
            this.setLocale(locale);
            const adaptLocale = this.getCurrentLocaleDescriptor().adapt;
            Object.assign(this.adaptTranslateService.languages[adaptLocale], {
                'adapt.rx.error.min': this.translateService.instant('com.bmc.arsys.rx.client.error.min'),
                'adapt.rx.error.max': this.translateService.instant('com.bmc.arsys.rx.client.error.max'),
                'adapt.rx.error.required': this.translateService.instant('com.bmc.arsys.rx.client.view-components.validation.required.message'),
                'adapt.select.emptyStateDescription': ''
            });
        }));
    }
    setLocale(locale) {
        this.currentLocale = locale;
        this.setDocumentLang(this.currentLocale);
        const descriptor = this.getCurrentLocaleDescriptor();
        this.adaptTranslateService.useLanguage(descriptor.adapt);
        moment.locale(descriptor.moment);
        this.angularLocale = descriptor.angular;
    }
    getCurrentLocaleDescriptor() {
        const locale = findKey(SUPPORTED_LOCALES, (localeInfo, key) => {
            const language = this.currentLocale.split('-')[0];
            return (key === this.currentLocale ||
                key === language ||
                some(localeInfo.similar, (item) => item === this.currentLocale || item === language));
        });
        return {
            angular: locale ? SUPPORTED_LOCALES[locale].angular || locale : DEFAULT_LOCALE,
            moment: (SUPPORTED_LOCALES[locale] && SUPPORTED_LOCALES[locale].moment) || this.currentLocale,
            adapt: (SUPPORTED_LOCALES[locale] && SUPPORTED_LOCALES[locale].adapt) || SUPPORTED_LOCALES[DEFAULT_LOCALE].adapt
        };
    }
    getLocalizedStringsForLoginPage() {
        // When debugging on an RSSO environment, this (/api/rx/application/logincontent/login.json) call fails
        // repeatedly with a http 401 error,so we have bypassed it. This call is only useful for the Innovation
        // Studio login page which is not accessed in RSSO environment.
        return this.rxRssoDebugService.isRssoDebugEnabled()
            ? of()
            : this.httpClient.get('/api/rx/application/logincontent/login.json', {
                observe: 'response'
            });
    }
    setDocumentLang(lang) {
        this.document.documentElement.setAttribute('lang', lang);
    }
    // Safari returns the web browser locale information Region in lowercase
    // en-us instead of en-US which causes issues with localized field.
    normalizeLocale(locale) {
        const localeInformation = locale.split('-');
        if (localeInformation.length > 1) {
            localeInformation[1] = localeInformation[1].toUpperCase();
        }
        return localeInformation.join('-');
    }
}
RxLocalizationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizationService, deps: [{ token: i1.HttpClient }, { token: i2.TranslateService }, { token: RxCurrentUserService }, { token: i4.AdaptTranslateService }, { token: RxRssoDebugService }, { token: DOCUMENT }, { token: RX_DEFAULT_STRINGS }], target: i0.ɵɵFactoryTarget.Injectable });
RxLocalizationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.TranslateService }, { type: RxCurrentUserService }, { type: i4.AdaptTranslateService }, { type: RxRssoDebugService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [RX_DEFAULT_STRINGS]
                }] }]; } });

class RxLoginLocalizationResolver {
    constructor(rxLocalizationService) {
        this.rxLocalizationService = rxLocalizationService;
    }
    resolve(route, state) {
        return this.rxLocalizationService.initLoginTranslations();
    }
}
RxLoginLocalizationResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoginLocalizationResolver, deps: [{ token: RxLocalizationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLoginLocalizationResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoginLocalizationResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoginLocalizationResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxLocalizationService }]; } });

class RxLocalizedStringsLoaderService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = '/api/rx/application/localizedstrings';
    }
    getTranslation(locale) {
        return locale === 'login' ? of({}) : this.httpClient.get(`${this.baseUrl}?locale=${locale}`);
    }
    uploadTranslation(bundleId, locale, translations) {
        return this.httpClient.post(`${this.baseUrl}/${bundleId}?locale=${locale}`, translations);
    }
}
RxLocalizedStringsLoaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedStringsLoaderService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxLocalizedStringsLoaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedStringsLoaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedStringsLoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });

class RxMissingTranslationHandler {
    constructor(injector) {
        this.injector = injector;
    }
    handle(params) {
        this.rxLocalizationService = this.rxLocalizationService || this.injector.get(RxLocalizationService);
        const defaultApplicationStrings = this.rxLocalizationService.getDefaultApplicationStrings();
        return defaultApplicationStrings.hasOwnProperty(params.key)
            ? params.translateService.parser.interpolate(defaultApplicationStrings[params.key], params.interpolateParams)
            : params.key;
    }
}
RxMissingTranslationHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMissingTranslationHandler, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxMissingTranslationHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMissingTranslationHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMissingTranslationHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

// AoT requires an exported function for factories
function LocalizedStringsLoaderFactory(http) {
    return new RxLocalizedStringsLoaderService(http);
}
// https://stackoverflow.com/questions/44287827/dynamically-change-locale-for-datepipe-in-angular-2/49675774#49675774
// https://github.com/angular/angular/issues/15039
class DynamicLocaleId extends String {
    constructor(rxLocalizationService) {
        super();
        this.rxLocalizationService = rxLocalizationService;
    }
    toString() {
        return this.rxLocalizationService.angularLocale;
    }
}
class RxLocalizationModule {
    constructor() {
        [
            localeDe,
            localeEs,
            localeFr,
            localeIt,
            localeJa,
            localeKo,
            localeNb,
            localeNl,
            localeRu,
            localeSv,
            localePt,
            localeDa,
            localeZhHans
        ].forEach((locale) => registerLocaleData(locale));
    }
}
RxLocalizationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxLocalizationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizationModule, imports: [CommonModule, i2.TranslateModule] });
RxLocalizationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizationModule, providers: [
        {
            provide: LOCALE_ID,
            deps: [RxLocalizationService],
            useClass: DynamicLocaleId
        }
    ], imports: [[
            CommonModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: LocalizedStringsLoaderFactory,
                    deps: [HttpClient, Injector]
                },
                missingTranslationHandler: {
                    provide: MissingTranslationHandler,
                    useClass: RxMissingTranslationHandler,
                    deps: [Injector]
                }
            })
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        TranslateModule.forRoot({
                            loader: {
                                provide: TranslateLoader,
                                useFactory: LocalizedStringsLoaderFactory,
                                deps: [HttpClient, Injector]
                            },
                            missingTranslationHandler: {
                                provide: MissingTranslationHandler,
                                useClass: RxMissingTranslationHandler,
                                deps: [Injector]
                            }
                        })
                    ],
                    providers: [
                        {
                            provide: LOCALE_ID,
                            deps: [RxLocalizationService],
                            useClass: DynamicLocaleId
                        }
                    ]
                }]
        }], ctorParameters: function () { return []; } });

class RxComponentCanDeactivateGuard {
    constructor(router, rxModalService, rxUtilityModalsService) {
        this.router = router;
        this.rxModalService = rxModalService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.isEnabled = true;
        window.addEventListener('beforeunload', (event) => {
            var _a;
            if (this.isEnabled &&
                (((_a = this.pageComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) === false ||
                    this.rxModalService.isAnyDockedPanelDirty() ||
                    this.rxModalService.isAnyModalDirty())) {
                event.returnValue = true;
            }
        });
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => this.enable());
    }
    canDeactivate(component) {
        var _a;
        if (this.isEnabled && (this.rxModalService.isAnyDockedPanelDirty() || this.rxModalService.isAnyModalDirty())) {
            return this.rxUtilityModalsService.confirmUnsavedChanges();
        }
        else if (this.isEnabled && ((_a = this.pageComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) === false) {
            return this.pageComponent.confirmDeactivation();
        }
        else {
            return true;
        }
    }
    setPageComponent(component) {
        this.pageComponent = component;
    }
    enable() {
        this.isEnabled = true;
    }
    disable() {
        this.isEnabled = false;
    }
}
RxComponentCanDeactivateGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentCanDeactivateGuard, deps: [{ token: i3.Router }, { token: i2$1.RxModalService }, { token: i2$1.RxUtilityModalsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxComponentCanDeactivateGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentCanDeactivateGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentCanDeactivateGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i3.Router }, { type: i2$1.RxModalService }, { type: i2$1.RxUtilityModalsService }]; } });

class RxApplicationLoaderService {
    constructor(document) {
        this.document = document;
    }
    removeApplicationLoader() {
        const applicationLoaderId = 'rx-application-loader-container';
        const applicationLoaderElement = this.document.getElementById(applicationLoaderId);
        if (applicationLoaderElement) {
            applicationLoaderElement.remove();
        }
    }
}
RxApplicationLoaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationLoaderService, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplicationLoaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationLoaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationLoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });

class RxApplicationResolver {
    constructor(document, rxBuildEnvironment, injector, compiler, rxBundleService, rxLogService, rxBundleCacheService, rxComponentCanDeactivateGuard, rxGlobalCacheService, rxApplicationLoaderService, rxLocalizationService) {
        this.document = document;
        this.rxBuildEnvironment = rxBuildEnvironment;
        this.injector = injector;
        this.compiler = compiler;
        this.rxBundleService = rxBundleService;
        this.rxLogService = rxLogService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxApplicationLoaderService = rxApplicationLoaderService;
        this.rxLocalizationService = rxLocalizationService;
        const prodBundleDescriptors$ = this.rxGlobalCacheService
            .getBundleDescriptors()
            .pipe(map((bundleDescriptors) => bundleDescriptors.filter((bundleDescriptor) => bundleDescriptor.containsAngular)));
        const devBundleDescriptors$ = prodBundleDescriptors$.pipe(map((bundleDescriptors) => bundleDescriptors.filter((bundleDescriptor) => bundleDescriptor.id !== this.rxBuildEnvironment.bundleId)));
        this.devResolver$ = iif(() => isUndefined(this.rxBuildEnvironment.bundleId), of([]), devBundleDescriptors$);
        this.prodResolver$ = prodBundleDescriptors$;
    }
    resolve(route) {
        const applicationId = head(route.url).path;
        if (this.rxGlobalCacheService.applicationId && applicationId !== this.rxGlobalCacheService.applicationId) {
            this.rxComponentCanDeactivateGuard.disable();
            window.location.reload();
        }
        this.rxGlobalCacheService.applicationId = applicationId;
        const bundleId = route.params['bundleId'];
        if (bundleId !== RX_APPLICATION.innovationStudioBundleId) {
            this.rxBundleCacheService.bundleId = bundleId;
        }
        const useDefaultLang = this.rxGlobalCacheService.applicationId === RX_APPLICATION.innovationStudioBundleId;
        const initTranslations$ = this.rxLocalizationService.initTranslations(useDefaultLang);
        return combineLatest([initTranslations$, this.getResolver()]);
    }
    getResolver() {
        return iif(() => isDevMode(), this.devResolver$, this.prodResolver$).pipe(switchMap((bundles) => {
            if (isEmpty(bundles)) {
                return of(bundles);
            }
            const bundleIds = bundles.map((bundleDescriptor) => bundleDescriptor.id);
            return this.rxBundleService.loadBundles(bundleIds, false);
        }), tap(() => this.rxApplicationLoaderService.removeApplicationLoader()), shareReplay(1));
    }
}
RxApplicationResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationResolver, deps: [{ token: DOCUMENT }, { token: RX_BUILD_ENVIRONMENT }, { token: i0.Injector }, { token: i0.Compiler }, { token: RxBundleService }, { token: RxLogService }, { token: RxBundleCacheService }, { token: RxComponentCanDeactivateGuard }, { token: RxGlobalCacheService }, { token: RxApplicationLoaderService }, { token: RxLocalizationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplicationResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [RX_BUILD_ENVIRONMENT]
                }] }, { type: i0.Injector }, { type: i0.Compiler }, { type: RxBundleService }, { type: RxLogService }, { type: RxBundleCacheService }, { type: RxComponentCanDeactivateGuard }, { type: RxGlobalCacheService }, { type: RxApplicationLoaderService }, { type: RxLocalizationService }]; } });

// @dynamic
class RxRootInjector {
}

var NotificationType;
(function (NotificationType) {
    NotificationType["Success"] = "rx-messageduration-success";
    NotificationType["Info"] = "rx-messageduration-info";
    NotificationType["Warning"] = "rx-messageduration-warn";
    NotificationType["Error"] = "rx-messageduration-error";
})(NotificationType || (NotificationType = {}));
const RX_DEFAULT_NOTIFICATION_SETTINGS = {
    [NotificationType.Success]: { ttl: 3000 },
    [NotificationType.Info]: { ttl: 3000 },
    [NotificationType.Warning]: { ttl: 6000 },
    [NotificationType.Error]: { ttl: 6000 }
};

class RxNotificationService {
    constructor(rxLogService, translateService, rxAdminSettingsService, rxCurrentUserService) {
        this.rxLogService = rxLogService;
        this.translateService = translateService;
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.issuesToReportSubject$ = new Subject();
        this.notificationSettings = RX_DEFAULT_NOTIFICATION_SETTINGS;
        this.componentName = 'InnovationSuiteServerSetting';
        this.messagesSubject = new Subject();
        this.messages$ = this.messagesSubject.asObservable();
        this.issuesToReport$ = this.issuesToReportSubject$.asObservable();
    }
    addErrorMessage(message, title, config = {}) {
        if (isNil(title)) {
            title = this.translateService.instant('com.bmc.arsys.rx.client.common.error.label');
        }
        this.messagesSubject.next({
            severity: 'error',
            summary: title,
            detail: message,
            life: config.ttl || this.notificationSettings[NotificationType.Error].ttl,
            sticky: this.isSticky(config.ttl, NotificationType.Error),
            data: config.issue
        });
        if (!config.suppressLog) {
            this.rxLogService.error(`${title}: ${message}`);
        }
    }
    addWarningMessage(message, title, config = {}) {
        if (isNil(title)) {
            title = this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label');
        }
        this.messagesSubject.next({
            severity: 'warn',
            summary: title,
            detail: message,
            life: config.ttl || this.notificationSettings[NotificationType.Warning].ttl,
            sticky: this.isSticky(config.ttl, NotificationType.Warning),
            data: config.issue
        });
        this.rxLogService.warning(`${title}: ${message}`);
    }
    addInfoMessage(message, title, config = {}) {
        if (isNil(title)) {
            title = this.translateService.instant('com.bmc.arsys.rx.client.common.info.label');
        }
        this.messagesSubject.next({
            severity: 'info',
            summary: title,
            detail: message,
            life: config.ttl || this.notificationSettings[NotificationType.Info].ttl,
            sticky: this.isSticky(config.ttl, NotificationType.Info)
        });
        this.rxLogService.info(`${title}: ${message}`);
    }
    addSuccessMessage(message, title, config = {}) {
        if (isNil(title)) {
            title = this.translateService.instant('com.bmc.arsys.rx.client.common.success.label');
        }
        this.messagesSubject.next({
            severity: 'success',
            summary: title,
            detail: message,
            life: config.ttl || this.notificationSettings[NotificationType.Success].ttl,
            sticky: this.isSticky(config.ttl, NotificationType.Success)
        });
        this.rxLogService.debug(`${title}: ${message}`);
    }
    reportIssue(issue) {
        this.issuesToReportSubject$.next(issue);
    }
    initialize() {
        this.rxCurrentUserService.user$
            .pipe(filter((user) => Boolean(user)), switchMap(() => {
            if (this.rxCurrentUserService.isAdministrator()) {
                return this.rxAdminSettingsService.getComponentSettings(this.componentName).pipe(tap((settings) => {
                    values(NotificationType).forEach((notificationType) => {
                        const notificationSettings = find(settings.values, ['settingName', notificationType]);
                        if (notificationSettings && notificationSettings.settingValue) {
                            this.notificationSettings[notificationType].ttl =
                                toNumber(notificationSettings.settingValue) * 1000;
                        }
                    });
                }), catchError((err) => {
                    this.rxLogService.warning('Notification Message Preferences cannot be applied. Default values will be used.');
                    return throwError(err);
                }));
            }
            else {
                this.rxLogService.debug('Notification Message Preferences cannot be applied since the current user is not a administrator.');
                return EMPTY;
            }
        }))
            .subscribe();
    }
    isSticky(ttl, messageType) {
        return isUndefined(ttl) ? this.notificationSettings[messageType].ttl === 0 : ttl === 0;
    }
}
RxNotificationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationService, deps: [{ token: RxLogService }, { token: i2.TranslateService }, { token: RxAdminSettingsService }, { token: RxCurrentUserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxNotificationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxLogService }, { type: i2.TranslateService }, { type: RxAdminSettingsService }, { type: RxCurrentUserService }]; } });

class RxUpgradeTrackerService {
    constructor(rxLocalizationService, rxNotificationService, rxSystemConfigurationService) {
        this.rxLocalizationService = rxLocalizationService;
        this.rxNotificationService = rxNotificationService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this._isUpgradeInProgress = false;
        this._upgradeMessage = '';
        this.isUpgradeInProgressSubject = new Subject();
        this.isUpgradeInProgress$ = this.isUpgradeInProgressSubject.asObservable();
    }
    set upgradeMessage(message) {
        this._upgradeMessage = message;
    }
    get upgradeMessage() {
        return this._upgradeMessage;
    }
    set isUpgradeInProgress(isUpgradeInProgress) {
        const hasStatusChanged = this._isUpgradeInProgress !== isUpgradeInProgress;
        this._isUpgradeInProgress = isUpgradeInProgress;
        if (!this._isUpgradeInProgress) {
            this._upgradeMessage = '';
        }
        if (hasStatusChanged) {
            this.isUpgradeInProgressSubject.next(isUpgradeInProgress);
        }
    }
    get isUpgradeInProgress() {
        return this._isUpgradeInProgress;
    }
    getUpgradeNotification() {
        let upgradeNotification;
        if (!this._upgradeMessage) {
            upgradeNotification = this.rxSystemConfigurationService.getConfiguration('Upgrade-Notification-Text');
        }
        else {
            upgradeNotification = of({
                id: '',
                name: '',
                value: this._upgradeMessage
            });
        }
        return upgradeNotification;
    }
    displayUpgradeNotification(forceNotification) {
        if (this.isUpgradeInProgress && (!this.upgradeMessage || forceNotification)) {
            combineLatest([this.getUpgradeNotification(), this.rxLocalizationService.onTranslationsLoaded$])
                .pipe(first())
                .subscribe(([upgradeMessage]) => {
                this.upgradeMessage = upgradeMessage.value;
                this.rxNotificationService.addWarningMessage(this.upgradeMessage);
            });
        }
    }
}
RxUpgradeTrackerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUpgradeTrackerService, deps: [{ token: RxLocalizationService }, { token: RxNotificationService }, { token: RxSystemConfigurationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxUpgradeTrackerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUpgradeTrackerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUpgradeTrackerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxLocalizationService }, { type: RxNotificationService }, { type: RxSystemConfigurationService }]; } });

class RxApplicationConfiguratorService {
    constructor(injector, rxUpgradeTrackerService, rxGlobalCacheService, document, router, adaptModalService, adaptDockedPanelService) {
        this.rxUpgradeTrackerService = rxUpgradeTrackerService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.document = document;
        this.router = router;
        this.adaptModalService = adaptModalService;
        this.adaptDockedPanelService = adaptDockedPanelService;
        RxRootInjector.injector = injector;
    }
    configure() {
        this.patchCkEditor();
        this.rxGlobalCacheService.applicationId$
            .pipe(filter(Boolean), take(1))
            .subscribe((applicationId) => this.document.body.parentNode.setAttribute('rx-app', applicationId));
        this.rxUpgradeTrackerService.isUpgradeInProgress$.subscribe(() => {
            this.rxUpgradeTrackerService.displayUpgradeNotification(false);
        });
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.adaptModalService.closeAllModals();
            for (let i = this.adaptDockedPanelService.openedPanels.length - 1; i >= 0; i--) {
                this.adaptDockedPanelService.close(this.adaptDockedPanelService.openedPanels[i].id);
            }
        });
    }
    // monkey patch CKEDITOR.dialog.add method to remove 'popup' option from Link -> Target dropdown
    patchCkEditor() {
        const ckEditorDialogAdd = CKEDITOR.dialog.add.bind(CKEDITOR.dialog);
        CKEDITOR.dialog.add = function (name, dialogDefinition) {
            if (typeof dialogDefinition === 'string') {
                ckEditorDialogAdd(name, dialogDefinition);
            }
            else {
                const patchedDialogDefinitionFunc = function (editor) {
                    const dialogDefinitionObj = dialogDefinition(editor);
                    if (name === 'link') {
                        const linkTargetConfig = dialogDefinitionObj.contents.find((item) => item.id === 'target');
                        get(linkTargetConfig, 'elements[0].children[0].items').splice(2, 1);
                    }
                    return dialogDefinitionObj;
                };
                ckEditorDialogAdd(name, patchedDialogDefinitionFunc);
            }
        };
    }
}
RxApplicationConfiguratorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationConfiguratorService, deps: [{ token: i0.Injector }, { token: RxUpgradeTrackerService }, { token: RxGlobalCacheService }, { token: DOCUMENT }, { token: i3.Router }, { token: i4.AdaptModalService }, { token: i4.AdaptDockedPanelService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplicationConfiguratorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationConfiguratorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationConfiguratorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: RxUpgradeTrackerService }, { type: RxGlobalCacheService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i3.Router }, { type: i4.AdaptModalService }, { type: i4.AdaptDockedPanelService }]; } });

const RxApplicationInitializer = ɵmakeDecorator('RxApplicationInitializer');

class RxApplicationRegistryService {
    constructor(rxGlobalCacheService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
    }
    register(applicationId, initializer) {
        this.rxGlobalCacheService
            .getApplicationBundleDescriptor()
            .pipe(take(1))
            .subscribe((bundleDescriptor) => {
            if ((bundleDescriptor === null || bundleDescriptor === void 0 ? void 0 : bundleDescriptor.id) === applicationId) {
                initializer.initialize();
            }
        });
    }
}
RxApplicationRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationRegistryService, deps: [{ token: RxGlobalCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplicationRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxGlobalCacheService }]; } });

const RX_OVERLAY = {
    bundleCustomizationOperationTypes: {
        createdInThisOverlayGroup: 'CREATED_IN_THIS_OVERLAY_GROUP'
    },
    operationTypes: {
        createdInThisOverlayGroup: 'N/A',
        notCustomizedInThisOverlayGroup: 'Not Customized',
        customizedInThisOverlayGroup: 'Customized'
    },
    customizationPerspective: {
        createdInThisOverlayGroup: 'CREATED_IN_THIS_OVERLAY_GROUP',
        notCustomizedInThisOverlayGroup: 'NOT_CUSTOMIZED_IN_THIS_OVERLAY_GROUP',
        customizedInThisOverlayGroup: 'CUSTOMIZED_IN_THIS_OVERLAY_GROUP'
    },
    overlayTypes: {
        overwrite: 'OVERWRITE',
        additive: 'ADDITIVE',
        unmodified: 'UNMODIFIED'
    },
    overlayAllowedLabels: {
        allowed: 'Allowed',
        notAllowed: 'Not allowed'
    },
    overlayGroupIds: {
        base: '0',
        overlay: '1'
    }
};

var DevelopmentMode;
(function (DevelopmentMode) {
    DevelopmentMode["Base"] = "0";
    DevelopmentMode["BestPractice"] = "1";
})(DevelopmentMode || (DevelopmentMode = {}));
var OverlayType;
(function (OverlayType) {
    OverlayType["Additive"] = "ADDITIVE";
    OverlayType["Overwrite"] = "OVERWRITE";
    OverlayType["Unmodified"] = "UNMODIFIED";
})(OverlayType || (OverlayType = {}));

class RxOverlayService {
    constructor(rxTreeService, rxLogService, rxBundleService, rxCurrentUserService, rxGlobalCacheService) {
        this.rxTreeService = rxTreeService;
        this.rxLogService = rxLogService;
        this.rxBundleService = rxBundleService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxGlobalCacheService = rxGlobalCacheService;
    }
    areNewDefinitionsAllowed(bundleId) {
        return this.rxGlobalCacheService
            .getBundleDescriptor(bundleId)
            .pipe(map((bundleDescriptor) => this.areNewDefinitionsAllowedSync(bundleDescriptor)));
    }
    areNewDefinitionsAllowedSync(bundleDescriptor) {
        return (this.isBundleEditable(bundleDescriptor.id) &&
            !(bundleDescriptor.platformBundle && this.getCurrentOverlayGroupId() === RX_OVERLAY.overlayGroupIds.overlay));
    }
    setCurrentOverlayContextOnSessionInit(user) {
        const userOverlayGroupDescriptors = user.userOverlayGroupDescriptors;
        const defaultOverlayGroupId = user.defaultOverlayGroupId;
        if (!this.userHasAccessToMultipleOverlays(userOverlayGroupDescriptors)) {
            return;
        }
        const savedOverlayGroupId = localStorage.getItem('rx-overlay-group-id');
        const contextDescriptors = this.rxTreeService.flattenTree(userOverlayGroupDescriptors[0], 'userOverlayGroupDescriptorChildren');
        if (savedOverlayGroupId) {
            this.overlay = find(contextDescriptors, { overlayGroupId: savedOverlayGroupId });
            // use default defaultOverlayGroupId if the saved overlay context is missing in contextDescriptors
            if (!this.overlay) {
                this.overlay = find(contextDescriptors, { overlayGroupId: defaultOverlayGroupId });
                this.rxLogService.debug(`Invalid Overlay Group ID: ${savedOverlayGroupId}. The Overlay Group ID has been set to the default value: ${defaultOverlayGroupId}`);
            }
        }
        else {
            this.overlay = find(contextDescriptors, { overlayGroupId: defaultOverlayGroupId });
        }
    }
    getOverlayOperation(overlayGroupId, parentOverlayGroupId) {
        const currentOverlayGroupId = this.getCurrentOverlayGroupId();
        let operationType = RX_OVERLAY.operationTypes.notCustomizedInThisOverlayGroup;
        if (currentOverlayGroupId === overlayGroupId) {
            operationType = parentOverlayGroupId
                ? RX_OVERLAY.operationTypes.customizedInThisOverlayGroup
                : RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
        }
        return operationType;
    }
    isCustomizationEnabled(type, definition) {
        if (definition.lastUpdateTime) {
            const overlayDescriptor = definition.overlayDescriptor || { parentOverlayGroupId: null };
            const overlayOperation = this.getOverlayOperation(definition.overlayGroupId, overlayDescriptor.parentOverlayGroupId);
            if (overlayOperation === RX_OVERLAY.operationTypes.createdInThisOverlayGroup) {
                return true;
            }
            return isNull(type) ? false : definition[type];
        }
        else {
            return true;
        }
    }
    isBundleEditable(bundleId) {
        return (this.isCurrentOverlayGroupWritable() &&
            (!this.rxCurrentUserService.isBusinessAnalyst() ||
                includes(this.rxCurrentUserService.getEditableBundles(), bundleId)));
    }
    isCurrentOverlayGroupWritable() {
        const user = this.rxCurrentUserService.get();
        const contextDescriptors = [
            ...user.userOverlayGroupDescriptors,
            ...user.userOverlayGroupDescriptors[0].userOverlayGroupDescriptorChildren
        ];
        const currentOverlayGroupId = this.getCurrentOverlayGroupId();
        return find(contextDescriptors, { overlayGroupId: currentOverlayGroupId }).isWritable;
    }
    getCurrentOverlayContext() {
        return this.overlay;
    }
    setDevelopmentMode(developmentMode) {
        const overlayGroupId = developmentMode === DevelopmentMode.Base ? RX_OVERLAY.overlayGroupIds.base : RX_OVERLAY.overlayGroupIds.overlay;
        localStorage.setItem('rx-overlay-group-id', overlayGroupId);
    }
    getDevelopmentMode() {
        const overlayGroupId = this.getCurrentOverlayContext().overlayGroupId;
        return overlayGroupId === RX_OVERLAY.overlayGroupIds.base ? DevelopmentMode.Base : DevelopmentMode.BestPractice;
    }
    userHasAccessToMultipleOverlays(overlayGroup) {
        return get(overlayGroup, '[0].userOverlayGroupDescriptorChildren.length') >= 1;
    }
    getCurrentOverlayGroupId() {
        return this.overlay.overlayGroupId || this.rxCurrentUserService.get().defaultOverlayGroupId;
    }
    getUserDefaultOverlayGroupId() {
        var _a, _b;
        return (_b = (_a = this.getCurrentOverlayContext()) === null || _a === void 0 ? void 0 : _a.overlayGroupId) !== null && _b !== void 0 ? _b : this.rxCurrentUserService.get().defaultOverlayGroupId;
    }
}
RxOverlayService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayService, deps: [{ token: i2$2.RxTreeService }, { token: RxLogService }, { token: RxBundleService }, { token: RxCurrentUserService }, { token: RxGlobalCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxOverlayService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i2$2.RxTreeService }, { type: RxLogService }, { type: RxBundleService }, { type: RxCurrentUserService }, { type: RxGlobalCacheService }]; } });

class RxFeatureService {
    enableFeatures(featureIds) {
        this.enabledFeatures = featureIds;
    }
    isFeatureEnabled(featureId) {
        if (this.enabledFeatures) {
            return this.enabledFeatures.includes(featureId);
        }
    }
}
RxFeatureService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFeatureService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxFeatureService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFeatureService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFeatureService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxUserService {
    constructor(httpClient, rxFeatureService, router, rxUrlUtilsService) {
        this.httpClient = httpClient;
        this.rxFeatureService = rxFeatureService;
        this.router = router;
        this.rxUrlUtilsService = rxUrlUtilsService;
    }
    getUser(id, bundleId) {
        return this.httpClient
            .get(`/api/rx/application/user/${id}`, {
            headers: new HttpHeaders({
                'default-bundle-scope': bundleId !== null && bundleId !== void 0 ? bundleId : ''
            }),
            observe: 'response'
        })
            .pipe(map((response) => {
            this.rxFeatureService.enableFeatures((response.headers.get('Enabled-Features') || '').split(','));
            return Object.assign(Object.assign({}, response.body), { modifiedDate: new Date(response.body.modifiedDate), ssoProviderType: response.headers.get('sso-provider-type') });
        }));
    }
    getCurrentUser() {
        return this.getUser('$USER$', this.rxUrlUtilsService.getBundleIdFromUrl());
    }
}
RxUserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserService, deps: [{ token: i1.HttpClient }, { token: RxFeatureService }, { token: i3.Router }, { token: i2$2.RxUrlUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxUserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: RxFeatureService }, { type: i3.Router }, { type: i2$2.RxUrlUtilsService }]; } });

const RX_USER = {
    userProfileRecordDefinitionName: 'CTM:People',
    userProfilePictureFieldId: 1000003962
};

class RxSessionService {
    constructor(rxCurrentUserService, rxUserService, rxOverlayService, rxSystemConfigurationService) {
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxUserService = rxUserService;
        this.rxOverlayService = rxOverlayService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.ssoProviderType = null;
        this.sessionActive$ = concat(this.initCurrentUser(), this.rxSystemConfigurationService.initialize()).pipe(mapTo(true), shareReplay(1));
    }
    initSession() {
        return this.isAlive() ? of(true) : this.sessionActive$;
    }
    isAlive() {
        return Boolean(this.rxCurrentUserService.get());
    }
    getSsoProviderType() {
        return this.ssoProviderType;
    }
    initCurrentUser() {
        return this.rxUserService.getCurrentUser().pipe(tap((user) => {
            this.rxCurrentUserService.set(user);
            this.rxOverlayService.setCurrentOverlayContextOnSessionInit(user);
            this.ssoProviderType = user.ssoProviderType;
        }));
    }
}
RxSessionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionService, deps: [{ token: RxCurrentUserService }, { token: RxUserService }, { token: RxOverlayService }, { token: RxSystemConfigurationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxSessionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxCurrentUserService }, { type: RxUserService }, { type: RxOverlayService }, { type: RxSystemConfigurationService }]; } });

const activeColor = '--active-color';
const dropdownBorder = '--dropdown-border';
const dropdownBorderRadius = '--dropdown-border-radius';
const dropdownBoxShadow = '--dropdown-box-shadow';
const dropdownFontSize = '--dropdown-font-size';
const dropdownItemActiveBgColor = '--dropdown-item-active-bg-color';
const dropdownMenuColor = '--dropdown-menu-color';
const dropdownPadding = '--dropdown-padding';
const fontFamilyBase = '--font-family-base';
const lineHeightBase = '--line-height-base';
const selectOptionPadding = '--select-option-padding';
const cssVariables = [
    activeColor,
    dropdownBorder,
    dropdownBorderRadius,
    dropdownBoxShadow,
    dropdownFontSize,
    dropdownItemActiveBgColor,
    dropdownMenuColor,
    dropdownPadding,
    fontFamilyBase,
    lineHeightBase,
    selectOptionPadding
];
const RX_THEMING = {
    cssVariablesForCkEditor: cssVariables,
    cssVariableLocator: {
        body: {
            'line-height': lineHeightBase
        },
        '.text-active': {
            color: activeColor
        },
        '.dropdown-menu': {
            border: dropdownBorder,
            'border-radius': dropdownBorderRadius,
            'box-shadow': dropdownBoxShadow,
            color: dropdownMenuColor,
            'font-size': dropdownFontSize,
            padding: dropdownPadding
        },
        '.rx-select__option': {
            padding: selectOptionPadding
        },
        '.dropdown_select__menu .dropdown-item.active': {
            'background-color': dropdownItemActiveBgColor
        },
        '.font-sans': {
            'font-family': fontFamilyBase
        }
    }
};

class RxThemingService {
    setCssVariables() {
        Array.from(document.querySelector('link[href*="application/theme"]').sheet.cssRules).forEach((cssStyleRule) => {
            forOwn(RX_THEMING.cssVariableLocator[cssStyleRule.selectorText] || {}, (cssVariableName, cssProperty) => {
                const cssValue = cssStyleRule.style.getPropertyValue(cssProperty);
                if (cssValue) {
                    document.documentElement.style.setProperty(cssVariableName, cssValue);
                }
            });
        });
    }
    copyCssVariables(variables, targetDocument) {
        const sourceStyle = document.documentElement.style;
        const targetStyle = targetDocument.documentElement.style;
        variables.forEach((variableName) => {
            targetStyle.setProperty(variableName, sourceStyle.getPropertyValue(variableName));
        });
    }
}
RxThemingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxThemingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxThemingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxThemingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxThemingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxThemeResolver {
    constructor(document, rxSessionService, rxThemingService) {
        this.document = document;
        this.rxSessionService = rxSessionService;
        this.rxThemingService = rxThemingService;
        this.themeLoaded$ = new Observable((observer) => {
            const link = this.document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/api/rx/application/theme/adapt-css-bs4.css';
            link.onload = () => {
                this.rxThemingService.setCssVariables();
                observer.next();
                observer.complete();
            };
            link.onerror = () => {
                observer.next();
                observer.complete();
            };
            this.document.head.appendChild(link);
        }).pipe(shareReplay(1));
    }
    canActivate() {
        return this.rxSessionService.sessionActive$.pipe(switchMapTo(this.themeLoaded$), mapTo(true));
    }
}
RxThemeResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxThemeResolver, deps: [{ token: DOCUMENT }, { token: RxSessionService }, { token: RxThemingService }], target: i0.ɵɵFactoryTarget.Injectable });
RxThemeResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxThemeResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxThemeResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: RxSessionService }, { type: RxThemingService }]; } });

class RxValidApplicationGuard {
    constructor(rxGlobalCacheService, router, rxSessionService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.router = router;
        this.rxSessionService = rxSessionService;
        this.unknownApplicationUrlTree = this.router.parseUrl('/unknown-application');
    }
    canActivate(route, state) {
        return this.rxSessionService.sessionActive$.pipe(switchMap(() => this.checkBundleState(route)));
    }
    checkBundleState(route) {
        const bundleId = route.paramMap.get('bundleId');
        if (bundleId) {
            return this.rxGlobalCacheService.getBundleDescriptor(bundleId).pipe(map((bundleDescriptor) => bundleDescriptor.isApplication || this.unknownApplicationUrlTree), catchError(() => of(this.unknownApplicationUrlTree)));
        }
        else {
            return of(this.unknownApplicationUrlTree);
        }
    }
}
RxValidApplicationGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidApplicationGuard, deps: [{ token: RxGlobalCacheService }, { token: i3.Router }, { token: RxSessionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxValidApplicationGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidApplicationGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidApplicationGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxGlobalCacheService }, { type: i3.Router }, { type: RxSessionService }]; } });

class RxAngularApplicationService {
    constructor(rxAdminSettingsService, rxStringService) {
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.rxStringService = rxStringService;
        this.angularJsApplicationBundleIds$ = this.rxAdminSettingsService
            .getComponentGridData(RX_ADMINISTRATION.settingNames.newApplicationUiOptOut, {
            'default-bundle-scope': RX_APPLICATION.environmentConfigurationBundleId
        })
            .pipe(map((gridComponentSettings) => gridComponentSettings.rows
            .filter((newApplicationUiOptOutSetting) => newApplicationUiOptOutSetting['Use old application UI'] === 'true')
            .map((newApplicationUiOptOutSetting) => newApplicationUiOptOutSetting['Application ID'])
            .concat(RX_APPLICATION.angularJsApplicationBundleIds)), shareReplay(1));
        this.angularJsViewDesignerBundleIds$ = this.rxAdminSettingsService
            .getComponentGridData(RX_ADMINISTRATION.settingNames.newViewDesignerOptOut, {
            'default-bundle-scope': RX_APPLICATION.environmentConfigurationBundleId
        })
            .pipe(map((gridComponentSettings) => gridComponentSettings.rows
            .filter((newViewDesignerOptOutSetting) => newViewDesignerOptOutSetting['Use old view designer'] === 'true')
            .map((newViewDesignerOptOutSetting) => newViewDesignerOptOutSetting['Application ID'])
            .concat(RX_APPLICATION.angularJsViewDesignerBundleIds)), shareReplay(1));
    }
    isAngularJsApplication(bundleId) {
        return this.angularJsApplicationBundleIds$.pipe(map((angularJsApplicationBundleIds) => includes(angularJsApplicationBundleIds, bundleId)));
    }
    isAngularJsViewDesignerBundle(bundleId) {
        return this.angularJsViewDesignerBundleIds$.pipe(map((angularJsViewDesignerBundleIds) => this.rxStringService.isIncluded(bundleId, angularJsViewDesignerBundleIds)));
    }
}
RxAngularApplicationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAngularApplicationService, deps: [{ token: RxAdminSettingsService }, { token: i2$2.RxStringService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAngularApplicationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAngularApplicationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAngularApplicationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxAdminSettingsService }, { type: i2$2.RxStringService }]; } });

class RxApplicationLoaderResolver {
    constructor(rxApplicationLoaderService) {
        this.rxApplicationLoaderService = rxApplicationLoaderService;
    }
    resolve(route, state) {
        this.rxApplicationLoaderService.removeApplicationLoader();
    }
}
RxApplicationLoaderResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationLoaderResolver, deps: [{ token: RxApplicationLoaderService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplicationLoaderResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationLoaderResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationLoaderResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxApplicationLoaderService }]; } });

const RX_SESSION = {
    minutesBeforeLogout: 2,
    keepAliveCommand: 'com.bmc.arsys.rx.application.user.command.KeepAliveCommand',
    userInteractionThrottleTimeMs: 1000,
    userInteractionEvents: ['click', 'keypress'],
    expirationModes: {
        idle: 'idleSessionExpirationMode',
        absolute: 'absoluteSessionExpirationMode'
    },
    expirationHeaders: {
        idle: 'Session-Expiration',
        absolute: 'Absolute-Session-Expiration'
    },
    ssoProviderTypes: {
        rsso: 'RSSO'
    }
};

class RxLoginPageGuard {
    constructor(rxLocalizationService, router) {
        this.rxLocalizationService = rxLocalizationService;
        this.router = router;
    }
    canActivate(next, state) {
        return this.rxLocalizationService.loginLocalizedStrings$.pipe(map((response) => {
            const ssoProviderType = response.headers.get('sso-provider-type');
            if (ssoProviderType === RX_SESSION.ssoProviderTypes.rsso) {
                const bundleId = next.paramMap.get('bundleId');
                return this.router.parseUrl(bundleId);
            }
            else {
                return true;
            }
        }));
    }
}
RxLoginPageGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoginPageGuard, deps: [{ token: RxLocalizationService }, { token: i3.Router }], target: i0.ɵɵFactoryTarget.Injectable });
RxLoginPageGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoginPageGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoginPageGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxLocalizationService }, { type: i3.Router }]; } });

// Customize shouldReuseRoute, use default implementation for other methods.
class ShellRouteReuseStrategy {
    shouldReuseRoute(current, next) {
        var _a, _b, _c, _d, _e, _f;
        if (((_a = next.data) === null || _a === void 0 ? void 0 : _a.routeReuseStrategy) === RX_APPLICATION.routeReuseStrategies.checkParentParams &&
            current.parent &&
            current.parent.routeConfig === ((_b = next.parent) === null || _b === void 0 ? void 0 : _b.routeConfig)) {
            return isEqual(next.parent.params, current.parent.params);
        }
        else {
            return (current.routeConfig === next.routeConfig ||
                (((_d = (_c = current.routeConfig) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.routerGroup) &&
                    current.routeConfig.data.routerGroup === ((_f = (_e = next.routeConfig) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.routerGroup)));
        }
    }
    shouldAttach(route) {
        return false;
    }
    shouldDetach(route) {
        return false;
    }
    retrieve(route) {
        return null;
    }
    store(route, handle) { }
}

const RX_RESOURCE_URLS = {
    command: '/api/rx/application/command'
};

class RxAuthService {
    constructor(location, httpClient, router, rxGlobalCacheService, rxLocalizationService, rxSessionService, rxLogService, rxUrlUtilsService, rxRssoDebugService) {
        this.location = location;
        this.httpClient = httpClient;
        this.router = router;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxLocalizationService = rxLocalizationService;
        this.rxSessionService = rxSessionService;
        this.rxLogService = rxLogService;
        this.rxUrlUtilsService = rxUrlUtilsService;
        this.rxRssoDebugService = rxRssoDebugService;
        // URL to redirect after login
        this.targetUrl = '';
        this.defaultUrlSerializer = new DefaultUrlSerializer();
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationCancel || event instanceof NavigationEnd) {
                const bundleId = this.rxUrlUtilsService.getBundleIdFromUrl(event.url);
                const bundleLoginRoute = `/${bundleId}/login`;
                if (event.url !== bundleLoginRoute) {
                    this.targetUrl = event.url;
                }
                else if (event.url === bundleLoginRoute && !this.targetUrl) {
                    this.targetUrl = `/${bundleId}`;
                }
            }
        });
    }
    login(userName, password) {
        return this.httpClient
            .post('/api/rx/authentication/loginrequest', {
            userName,
            password,
            locale: this.rxLocalizationService.currentLocale
        }, { responseType: 'text' })
            .pipe(tap((res) => {
            // This is to avoid having additional url encoding when using router.navigate:
            // for example a space %20 would be encoded to %2520
            // https://stackoverflow.com/questions/46440887/url-encoding-breaking-angular-2-navigation
            this.router.navigateByUrl(this.targetUrl);
        }));
    }
    redirectToLoginPage() {
        this.rxLogService.debug('Redirecting to login page.');
        if (this.rxSessionService.getSsoProviderType() === RX_SESSION.ssoProviderTypes.rsso) {
            this.redirectToRssoLogoutPage();
        }
        else {
            if (this.rxRssoDebugService.isRssoDebugEnabled()) {
                this.redirectToRssoDebugLoginPage();
            }
            else {
                this.redirectToApplicationLoginPage();
            }
        }
    }
    logout() {
        const onRequestEnd = () => {
            this.rxLogService.debug('Destroying session after logout.');
            localStorage.removeItem('lastUserInteraction');
            localStorage.removeItem('idleTimeout');
            localStorage.removeItem('rx-overlay-group-id');
            this.redirectToLoginPage();
        };
        this.rxLogService.debug('Before logout.');
        return this.httpClient
            .post('/api/rx/authentication/logoutrequest', {}, {
            headers: new HttpHeaders({
                'default-bundle-scope': this.rxGlobalCacheService.applicationId
            })
        })
            .pipe(tap(() => {
            this.rxLogService.debug('Logout succeeded.');
            onRequestEnd();
        }), catchError((err) => {
            this.rxLogService.debug('Logout failed.');
            onRequestEnd();
            return throwError(err);
        }));
    }
    redirectToRssoLogoutPage() {
        window.location.href = '/api/rsso-logout';
    }
    redirectToRssoDebugLoginPage() {
        this.router.navigate(['rsso-debug/login'], {
            state: {
                shouldReloadPage: this.rxSessionService.isAlive()
            }
        });
    }
    redirectToApplicationLoginPage() {
        const url = this.location.path();
        // Trying to deduce the bundleId from the url. This can happen if the user tried to directly access a view
        // while not logged in. In this case the application resolver does not kick in and does not set
        // the application ID rxGlobalCacheService.
        const bundleId = this.rxGlobalCacheService.applicationId || this.rxUrlUtilsService.getBundleIdFromUrl(url);
        // The login page should be reloaded in case of session timeout but
        // not if the user connects the first time.
        // auth.interceptor.ts detects if a a rest calls returns http 401 and
        // calls the login page redirection.
        // In the case of a session timeout the session object is still 'alive'.
        if (bundleId) {
            // Post PR #776 the event NavigationCancel / NavigationEnd is not triggered anymore.
            // This was used when the user was directly accessing a url (DRIST-21802).
            // The logic has been added here.
            const bundleLoginRoute = `${bundleId}/login`;
            const isLoginRoute = url === `/${bundleLoginRoute}`;
            if (!isLoginRoute) {
                this.targetUrl = url;
            }
            else if (isLoginRoute && !this.targetUrl) {
                this.targetUrl = `/${bundleId}`;
            }
            // The login page should be reloaded in case of session timeout but
            // not if the user connects the first time.
            // auth.interceptor.ts detects if a a rest calls returns http 401 and
            // calls the login page redirection.
            // In the case of a session timeout the session object is still 'alive'.
            this.router.navigate([bundleLoginRoute], {
                state: {
                    shouldReloadPage: this.rxSessionService.isAlive()
                }
            });
        }
        else {
            this.router.navigate(['unknown-application']);
        }
    }
}
RxAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthService, deps: [{ token: i3$1.Location }, { token: i1.HttpClient }, { token: i3.Router }, { token: RxGlobalCacheService }, { token: RxLocalizationService }, { token: RxSessionService }, { token: RxLogService }, { token: i2$2.RxUrlUtilsService }, { token: RxRssoDebugService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i3$1.Location }, { type: i1.HttpClient }, { type: i3.Router }, { type: RxGlobalCacheService }, { type: RxLocalizationService }, { type: RxSessionService }, { type: RxLogService }, { type: i2$2.RxUrlUtilsService }, { type: RxRssoDebugService }]; } });

var SessionExpirationType;
(function (SessionExpirationType) {
    SessionExpirationType["Absolute"] = "Absolute";
    SessionExpirationType["Idle"] = "Idle";
})(SessionExpirationType || (SessionExpirationType = {}));

class RxSessionExpirationComponent {
    constructor(context, translateService, ngZone) {
        this.context = context;
        this.translateService = translateService;
        this.ngZone = ngZone;
        this.isLoading = false;
        this.SessionExpirationType = SessionExpirationType;
        this.destroyed$ = new ReplaySubject(1);
        const data = context.getData();
        this.mode = data.mode;
        this.expirationDate = data.expirationDate;
        this.keepSessionAlive = data.keepSessionAlive;
        this.logout = data.logout;
    }
    ngOnInit() {
        if (this.mode === SessionExpirationType.Idle) {
            this.ngZone.runOutsideAngular(() => {
                timer(0, 1000)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
                    this.ngZone.run(this.checkTime.bind(this));
                });
            });
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    keepAlive() {
        this.isLoading = true;
        this.keepSessionAlive().subscribe(() => {
            this.isLoading = false;
            this.close();
        }, () => {
            this.isLoading = false;
        });
    }
    close() {
        this.context.close();
    }
    checkTime() {
        if (moment().isBefore(this.expirationDate)) {
            const counter = moment.utc(this.expirationDate.getTime() - Date.now()).format('m:ss');
            this.remainingTime = this.translateService.instant('com.bmc.arsys.rx.client.session-expiration-dialog.timer', {
                time: counter
            });
        }
        else {
            this.remainingTime = '0:00';
            this.logout();
        }
    }
}
RxSessionExpirationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationComponent, deps: [{ token: i4.ActiveModalRef }, { token: i2.TranslateService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
RxSessionExpirationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxSessionExpirationComponent, selector: "rx-session-expiration", ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ 'com.bmc.arsys.rx.client.common.alert.label' | translate }}</h5>\n\n  <button\n    *ngIf=\"mode === SessionExpirationType.Absolute\"\n    class=\"close dp-close\"\n    aria-label=\"Close\"\n    data-dismiss=\"modal\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    (click)=\"close()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\" [ngSwitch]=\"mode\">\n  <div *ngSwitchCase=\"SessionExpirationType.Idle\">\n    <p>{{ 'com.bmc.arsys.rx.client.session-expiration-dialog.idle-session-message1' | translate }}</p>\n    <p>{{ 'com.bmc.arsys.rx.client.session-expiration-dialog.idle-session-message2' | translate }}</p>\n  </div>\n\n  <div *ngSwitchCase=\"SessionExpirationType.Absolute\">\n    <p>{{ 'com.bmc.arsys.rx.client.session-expiration-dialog.expiring-session-message1' | translate }}</p>\n    <p>{{ 'com.bmc.arsys.rx.client.session-expiration-dialog.expiring-session-message2' | translate }}</p>\n  </div>\n</div>\n\n<div class=\"modal-footer\" [ngSwitch]=\"mode\">\n  <div\n    class=\"rx-session-expiration-countdown text-primary d-icon-left-clock_o\"\n    *ngSwitchCase=\"SessionExpirationType.Idle\"\n    rx-id=\"timer\"\n  >\n    {{ remainingTime }}\n  </div>\n\n  <button\n    *ngSwitchCase=\"SessionExpirationType.Idle\"\n    adapt-button\n    btn-type=\"primary\"\n    size=\"small\"\n    type=\"button\"\n    rx-id=\"continue-button\"\n    [disabled]=\"isLoading\"\n    (click)=\"keepAlive()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.continue.label' | translate }}\n  </button>\n\n  <button\n    *ngSwitchCase=\"SessionExpirationType.Idle\"\n    adapt-button\n    btn-type=\"secondary\"\n    size=\"small\"\n    type=\"button\"\n    rx-id=\"logout-button\"\n    [disabled]=\"isLoading\"\n    (click)=\"logout()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.sign-out.label' | translate }}\n  </button>\n\n  <button\n    *ngSwitchCase=\"SessionExpirationType.Absolute\"\n    adapt-button\n    btn-type=\"primary\"\n    size=\"small\"\n    type=\"button\"\n    rx-id=\"ok-button\"\n    (click)=\"close()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.ok.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-session-expiration-countdown{font-weight:var(--font-weight-bold);margin-right:auto}\n"], components: [{ type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-session-expiration',
                    templateUrl: './session-expiration.component.html',
                    styleUrls: ['./session-expiration.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i4.ActiveModalRef }, { type: i2.TranslateService }, { type: i0.NgZone }]; } });

class RxSessionExpirationService {
    constructor(httpClient, adaptModalService, rxAuthService, ngZone, rxSessionService, rxComponentCanDeactivateGuard) {
        this.httpClient = httpClient;
        this.adaptModalService = adaptModalService;
        this.rxAuthService = rxAuthService;
        this.ngZone = ngZone;
        this.rxSessionService = rxSessionService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.trackUserInteractionDebounced = debounce(this.trackUserInteraction, RX_SESSION.userInteractionThrottleTimeMs, { leading: true, trailing: false });
        this.sessionExpirationInfos = {
            [SessionExpirationType.Absolute]: {},
            [SessionExpirationType.Idle]: {}
        };
        RX_SESSION.userInteractionEvents.forEach((e) => window.addEventListener(e, this.trackUserInteractionDebounced.bind(this)));
    }
    setTimeout(type, time) {
        const mDate = moment(time);
        const isValid = this.isValidTimeout(mDate);
        if (isValid && mDate.isAfter(this.sessionExpirationInfos[type].timeout)) {
            this.sessionExpirationInfos[type].timeout = mDate.toDate();
            if (this.isIdleTimeout(type)) {
                localStorage.setItem('idleTimeout', this.sessionExpirationInfos[type].timeout.toString());
                localStorage.removeItem('lastUserInteraction');
            }
            this.updateTimeoutHandler(type, this.sessionExpirationInfos[type].timeout);
        }
    }
    keepSessionAlive() {
        const lastUserInteraction = this.getLastUserInteraction();
        return this.httpClient.post(RX_RESOURCE_URLS.command, {
            resourceType: RX_SESSION.keepAliveCommand
        }, {
            headers: {
                'AR-JWT-Refresh-From': lastUserInteraction
                    ? new Date(lastUserInteraction).toUTCString()
                    : new Date().toUTCString()
            }
        });
    }
    logout() {
        this.rxComponentCanDeactivateGuard.disable();
        this.sessionExpirationModal.reject();
        this.rxAuthService.logout().subscribe();
    }
    trackUserInteraction() {
        if (this.rxSessionService.isAlive()) {
            localStorage.setItem('lastUserInteraction', Date.now().toString());
        }
    }
    getLastUserInteraction() {
        const lastUserInteraction = Number(localStorage.getItem('lastUserInteraction'));
        return !isNaN(lastUserInteraction) ? lastUserInteraction : null;
    }
    getIdleSessionTimeout() {
        const idleTimeout = new Date(localStorage.getItem('idleTimeout'));
        return moment(idleTimeout).isValid() ? idleTimeout : null;
    }
    updateTimeoutHandler(type, expirationDate) {
        const showWarnInMs = this.getTimeToSessionExpirationWarning(expirationDate);
        this.clearTimer(type);
        this.sessionExpirationInfos[type].timeout = expirationDate;
        if (showWarnInMs > 0) {
            // run outside angular to keep app 'stable' as required by QA automation
            this.ngZone.runOutsideAngular(() => {
                this.sessionExpirationInfos[type].timer = setTimeout(() => {
                    this.ngZone.run(() => {
                        if (this.isIdleTimeout(type)) {
                            this.showIdleTimeoutWarning(expirationDate);
                        }
                        else if (type === SessionExpirationType.Absolute) {
                            this.showAbsoluteTimeoutWarning();
                        }
                    });
                }, showWarnInMs);
            });
        }
    }
    isIdleTimeout(type) {
        return (type === SessionExpirationType.Idle &&
            !moment(this.sessionExpirationInfos[SessionExpirationType.Idle].timeout).isSame(moment(this.sessionExpirationInfos[SessionExpirationType.Absolute].timeout)));
    }
    getTimeToSessionExpirationWarning(timeout) {
        return moment(timeout).subtract(RX_SESSION.minutesBeforeLogout, 'minutes').diff(moment());
    }
    showIdleTimeoutWarning(expirationDate) {
        if (this.rxSessionService.isAlive() && !this.getLastUserInteraction()) {
            const idleSessionTimeout = new Date(this.getIdleSessionTimeout());
            if (idleSessionTimeout &&
                moment(idleSessionTimeout).isAfter(this.sessionExpirationInfos[SessionExpirationType.Idle].timeout)) {
                this.updateTimeoutHandler(SessionExpirationType.Idle, idleSessionTimeout);
            }
            else {
                this.openModal(SessionExpirationType.Idle, {
                    expirationDate,
                    keepSessionAlive: this.keepSessionAlive.bind(this),
                    logout: this.logout.bind(this)
                });
            }
        }
        else {
            this.keepSessionAlive().subscribe();
        }
    }
    showAbsoluteTimeoutWarning() {
        this.openModal(SessionExpirationType.Absolute);
        // run outside angular to keep app 'stable' as required by QA automation
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.ngZone.run(() => {
                    this.logout();
                });
            }, RX_SESSION.minutesBeforeLogout * 60 * 1000);
        });
    }
    openModal(mode, data) {
        this.sessionExpirationModal = this.adaptModalService.open({
            content: RxSessionExpirationComponent,
            beforeDismiss: () => false,
            size: 'sm',
            data: Object.assign({ mode }, data)
        });
        // should be removed after ADAPT issue is resolved:
        // https://github.bmc.com/bmc-ux/adapt-angular/issues/2746
        this.sessionExpirationModal.then(noop, noop);
    }
    isValidTimeout(date) {
        return this.rxSessionService.isAlive() && date.isValid() && date.isAfter(moment());
    }
    clearTimer(type) {
        if (this.sessionExpirationInfos[type].timer) {
            clearTimeout(this.sessionExpirationInfos[type].timer);
            this.sessionExpirationInfos[type].timer = null;
        }
    }
}
RxSessionExpirationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationService, deps: [{ token: i1.HttpClient }, { token: i4.AdaptModalService }, { token: RxAuthService }, { token: i0.NgZone }, { token: RxSessionService }, { token: RxComponentCanDeactivateGuard }], target: i0.ɵɵFactoryTarget.Injectable });
RxSessionExpirationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i4.AdaptModalService }, { type: RxAuthService }, { type: i0.NgZone }, { type: RxSessionService }, { type: RxComponentCanDeactivateGuard }]; } });

class RxKeepSessionAliveResolver {
    constructor(rxSessionExpirationService) {
        this.rxSessionExpirationService = rxSessionExpirationService;
    }
    resolve() {
        return this.rxSessionExpirationService.keepSessionAlive();
    }
}
RxKeepSessionAliveResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxKeepSessionAliveResolver, deps: [{ token: RxSessionExpirationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxKeepSessionAliveResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxKeepSessionAliveResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxKeepSessionAliveResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxSessionExpirationService }]; } });

class RxFeatureGuard {
    constructor(rxFeatureService) {
        this.rxFeatureService = rxFeatureService;
    }
    canActivate(route, state) {
        return of(this.rxFeatureService.isFeatureEnabled(route.data['featureId']));
    }
}
RxFeatureGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFeatureGuard, deps: [{ token: RxFeatureService }], target: i0.ɵɵFactoryTarget.Injectable });
RxFeatureGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFeatureGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFeatureGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxFeatureService }]; } });

var JustificationRequirement;
(function (JustificationRequirement) {
    JustificationRequirement["RequiredForApproval"] = "TO_APPROVE";
    JustificationRequirement["RequiredForRejection"] = "TO_REJECT";
    JustificationRequirement["RequiredForApprovalOrRejection"] = "TO_APPROVE_OR_REJECT";
    JustificationRequirement["NotRequired"] = "NO";
})(JustificationRequirement || (JustificationRequirement = {}));

class RxMetadataService {
    setMetadataLastUpdateTime(metadataLastUpdateTime) {
        this.metadataLastUpdateTime = new Date(metadataLastUpdateTime);
    }
    getMetadataLastUpdateTime() {
        return this.metadataLastUpdateTime;
    }
    isLocalizedStringsRequest(request) {
        return request.method === 'GET' && /\/api\/rx\/application\/localizedstrings/.test(request.url);
    }
    isMetadataDataPageQueryRequest(request) {
        return request.method === 'GET' &&
            /\/api\/rx\/application\/datapage/.test(request.url) &&
            (endsWith(request.params.get('dataPageType'), 'DefinitionDataPageQuery') ||
                endsWith(request.params.get('dataPageType'), 'LocalizedStringsDataPageQuery'));
    }
    isMetadataRequest(request) {
        return request.method === 'GET' &&
            (this.isMetadataDataPageQueryRequest(request) || /\/api\/rx\/application\/[a-zA-Z]+\/[a-zA-Z]+definition/.test(request.url));
    }
}
RxMetadataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxMetadataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxDesignerCacheService {
    getActionTypeByNameSync(actionTypeName) {
        return find(this.actionTypes, { actionTypeName });
    }
    getFunctionDescriptorsSync() {
        return this.functionDescriptors;
    }
    setActionTypes(actionTypes) {
        this.actionTypes = actionTypes;
    }
    setFunctionDescriptors(functionDescriptors) {
        this.functionDescriptors = functionDescriptors;
    }
}
RxDesignerCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCacheService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDesignerCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxMetadataLastUpdateTimeInterceptor {
    constructor(rxMetadataService) {
        this.rxMetadataService = rxMetadataService;
    }
    intercept(request, next) {
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse) {
                const metadataLastUpdateTime = event.headers.get('metadata-last-update-time');
                if (metadataLastUpdateTime) {
                    this.rxMetadataService.setMetadataLastUpdateTime(metadataLastUpdateTime);
                }
            }
        }));
    }
}
RxMetadataLastUpdateTimeInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataLastUpdateTimeInterceptor, deps: [{ token: RxMetadataService }], target: i0.ɵɵFactoryTarget.Injectable });
RxMetadataLastUpdateTimeInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataLastUpdateTimeInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataLastUpdateTimeInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: RxMetadataService }]; } });

class RxMetadataRequestInterceptor {
    constructor(bundleCacheService, rxMetadataService, rxCurrentUserService, rxLocalizationService) {
        this.bundleCacheService = bundleCacheService;
        this.rxMetadataService = rxMetadataService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxLocalizationService = rxLocalizationService;
    }
    intercept(request, next) {
        const isLocalizedStringsRequest = this.rxMetadataService.isLocalizedStringsRequest(request);
        const isMetadataDataPageQueryRequest = this.rxMetadataService.isMetadataDataPageQueryRequest(request);
        const isMetadataRequest = this.rxMetadataService.isMetadataRequest(request);
        if (isMetadataRequest || isLocalizedStringsRequest) {
            const user = this.rxCurrentUserService.get();
            const metaDataLastUpdateTime = this.rxMetadataService.getMetadataLastUpdateTime();
            let params;
            // duplicate the 'default-bundle-scope' request header as a request parameter
            // in order to have a separate cache for requests with different bundle scope
            const bundleId = isMetadataDataPageQueryRequest
                ? request.headers.get('default-bundle-scope')
                : this.bundleCacheService.bundleId;
            if (isMetadataDataPageQueryRequest && bundleId) {
                request = request.clone({
                    params: request.params.set('bundleId', bundleId)
                });
            }
            if (metaDataLastUpdateTime) {
                const cacheKey = [
                    user.userId,
                    user.modifiedDate.getTime(),
                    metaDataLastUpdateTime.getTime(),
                    this.rxLocalizationService.currentLocale
                ].join('');
                params = request.params.append('_v', cacheKey);
                request = request.clone({
                    headers: request.headers.delete('Cache-Control').delete('Pragma').delete('If-Modified-Since'),
                    params: params
                });
            }
        }
        return next.handle(request);
    }
}
RxMetadataRequestInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataRequestInterceptor, deps: [{ token: RxBundleCacheService }, { token: RxMetadataService }, { token: RxCurrentUserService }, { token: RxLocalizationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxMetadataRequestInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataRequestInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataRequestInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: RxBundleCacheService }, { type: RxMetadataService }, { type: RxCurrentUserService }, { type: RxLocalizationService }]; } });

class RxRequestInterceptor {
    constructor(rxBundleCacheService, rxGlobalCacheService) {
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
    }
    intercept(request, next) {
        const bundleId = this.rxBundleCacheService.bundleId;
        const applicationId = this.rxGlobalCacheService.applicationId;
        // LMA:: Check if those headers are still necessary. Test with IE11.
        request = request.clone({
            headers: request.headers
                .set('X-Requested-By', 'XMLHttpRequest')
                .set('If-Modified-Since', 'Mon, 26 Jul 1997 05:00:00 GMT')
                .set('Cache-Control', 'no-cache')
                .set('Pragma', 'no-cache')
        });
        if (bundleId && !request.headers.has('default-bundle-scope')) {
            request = request.clone({
                headers: request.headers.set('default-bundle-scope', bundleId)
            });
        }
        if (applicationId === RX_APPLICATION.innovationStudioBundleId) {
            request = request.clone({
                headers: request.headers.set('Design-Time', 'true')
            });
        }
        return next.handle(request);
    }
}
RxRequestInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRequestInterceptor, deps: [{ token: RxBundleCacheService }, { token: RxGlobalCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRequestInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRequestInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRequestInterceptor, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxBundleCacheService }, { type: RxGlobalCacheService }]; } });

class RxUpgradeTrackerInterceptor {
    constructor(rxMetadataService, rxUpgradeTrackerService) {
        this.rxMetadataService = rxMetadataService;
        this.rxUpgradeTrackerService = rxUpgradeTrackerService;
    }
    intercept(request, next) {
        return next.handle(request).pipe(tap((httpEvent) => {
            const isCachedRequest = this.rxMetadataService.isMetadataRequest(request) || this.rxMetadataService.isLocalizedStringsRequest(request);
            // Exclude resource calls since they never have the upgrade-mode header in the response.
            // Exclude API calls that may be cached by browser with an outdated value of the header.
            if (!isCachedRequest && httpEvent instanceof HttpResponse && /\/api\/rx/.test(request.url)) {
                this.rxUpgradeTrackerService.isUpgradeInProgress = httpEvent.headers.has('upgrade-mode');
            }
        }));
    }
}
RxUpgradeTrackerInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUpgradeTrackerInterceptor, deps: [{ token: RxMetadataService }, { token: RxUpgradeTrackerService }], target: i0.ɵɵFactoryTarget.Injectable });
RxUpgradeTrackerInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUpgradeTrackerInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUpgradeTrackerInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: RxMetadataService }, { type: RxUpgradeTrackerService }]; } });

class RxCachingModule {
    static forRoot() {
        return {
            ngModule: RxCachingModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxRequestInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxMetadataRequestInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxMetadataLastUpdateTimeInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxUpgradeTrackerInterceptor,
                    multi: true
                }
            ]
        };
    }
}
RxCachingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCachingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxCachingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCachingModule, imports: [CommonModule] });
RxCachingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCachingModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCachingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule]
                }]
        }] });

const RX_CHATBOT = {
    defaultChatbotId: 'AGGADGG8ECDC0AP0PA6EPJSIGS75QX',
    chatbotLocales: {
        recordDefinitionName: 'Chatbot Locale',
        fieldIds: {
            providerPassword: 123,
            chatbotName: 1772,
            locale: 1775,
            botConfigurationId: 536870913
        }
    }
};

const botDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.chat.datapage.ChatbotConfigurationDataPageQuery';
class RxChatbotDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, botDefinitionDataPageQuery);
        this.injector = injector;
    }
    get(dataPageRequestConfiguration = {}) {
        return super.get(dataPageRequestConfiguration).pipe(tap((result) => {
            forEach(result.data, (entity) => {
                entity.name = entity.chatbotName;
                entity.lastUpdateTime = entity.modifiedDate;
                entity.lastChangedBy = entity.modifiedBy;
            });
        }));
    }
}
RxChatbotDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxChatbotDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxChatbotDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxChatbotDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxChatbotDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxLiveAgentSettingsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.chatbotConfigurationUrl = '/api/rx/application/chat/chatbotconfiguration';
    }
    getAvailableTopics() {
        return this.httpClient.get(`${this.chatbotConfigurationUrl}/virtualchattopics`);
    }
}
RxLiveAgentSettingsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLiveAgentSettingsService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxLiveAgentSettingsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLiveAgentSettingsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLiveAgentSettingsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });

var MachineLearningProviderNames;
(function (MachineLearningProviderNames) {
    MachineLearningProviderNames["Helix"] = "HELIX";
    MachineLearningProviderNames["Native"] = "NATIVE";
    MachineLearningProviderNames["Watson"] = "WATSON";
})(MachineLearningProviderNames || (MachineLearningProviderNames = {}));

const RX_DESIGNER = {
    messageTypes: {
        closeDesigner: 'closeDesigner',
        afterSave: 'afterSave',
        designerLoaded: 'designerLoaded',
        designerLoadFailed: 'designerLoadFailed',
        waitingForDesignerOptions: 'waitingForDesignerOptions',
        definitionStatusChanged: 'definitionStatusChanged'
    },
    paletteIconPosition: {
        top: 'top',
        bottom: 'bottom'
    },
    paletteItemBorder: {
        solid: 'solid',
        bold: 'bold',
        dashed: 'dashed',
        double: 'double'
    },
    paletteItemLabel: {
        inner: 'inner',
        outer: 'outer',
        none: 'none'
    },
    paletteItemShape: {
        rectangle: 'rectangle',
        circle: 'circle',
        square: 'square',
        annotation: 'annotation'
    }
};

const RX_DEFINITION = {
    scopes: {
        bundle: 'BUNDLE',
        public: 'PUBLIC'
    }
};

class RxDefinitionAdapterRegistryService {
    constructor() {
        this.runtimeAdapters = new Map();
        this.designAdapters = new Map();
    }
    registerRuntimeAdapter(type, adapter) {
        this.runtimeAdapters.set(type, adapter);
    }
    registerDesignAdapter(type, adapter) {
        this.designAdapters.set(type, adapter);
    }
    getRuntimeAdapter(type) {
        return this.runtimeAdapters.get(type);
    }
    getDesignAdapter(type) {
        return this.designAdapters.get(type);
    }
}
RxDefinitionAdapterRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionAdapterRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDefinitionAdapterRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionAdapterRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionAdapterRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxDefinitionScopePipe {
    constructor(rxDefinitionService) {
        this.rxDefinitionService = rxDefinitionService;
    }
    transform(value, bundleDescriptor) {
        return this.rxDefinitionService.getScopeName(value, bundleDescriptor);
    }
}
RxDefinitionScopePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionScopePipe, deps: [{ token: RxDefinitionService }], target: i0.ɵɵFactoryTarget.Pipe });
RxDefinitionScopePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionScopePipe, name: "rxDefinitionScopePipe" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionScopePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxDefinitionScopePipe'
                }]
        }], ctorParameters: function () { return [{ type: RxDefinitionService }]; } });

class RxDefinitionNamePipe {
    constructor(rxDefinitionNameService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
    }
    transform(value) {
        return this.rxDefinitionNameService.getDisplayName(value);
    }
}
RxDefinitionNamePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionNamePipe, deps: [{ token: RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Pipe });
RxDefinitionNamePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionNamePipe, name: "rxDefinitionNamePipe" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionNamePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxDefinitionNamePipe'
                }]
        }], ctorParameters: function () { return [{ type: RxDefinitionNameService }]; } });

class RxDefinitionModule {
}
RxDefinitionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxDefinitionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionModule, declarations: [RxDefinitionNamePipe, RxDefinitionScopePipe], imports: [CommonModule], exports: [RxDefinitionNamePipe, RxDefinitionScopePipe] });
RxDefinitionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxDefinitionNamePipe, RxDefinitionScopePipe],
                    exports: [RxDefinitionNamePipe, RxDefinitionScopePipe],
                    imports: [CommonModule]
                }]
        }] });

const RX_ERROR_HANDLING = {
    optimisticLockErrorHttpStatus: 412,
    ignoredErrors: [
        { status: 404, contains: '/resources/i18n/locale' },
        { status: 404, contains: RX_APPLICATION.shellDefinitionName },
        { status: 412, contains: '"messageNumber":309' },
        { status: 412, contains: '"messageNumber":9965' }
    ],
    maxErrorMessageLength: 500,
    maxArMessageLength: 500,
    arMessagesHeader: 'x-ar-messages',
    arNoteLogInfo: 8914,
    arGuestUserMessageNo: 59,
    messageTypes: {
        warning: 'WARNING',
        success: 'SUCCESS',
        info: 'INFO',
        error: 'ERROR'
    }
};

class RxDefinitionUpdateService {
    constructor(rxUtilityModalsService) {
        this.rxUtilityModalsService = rxUtilityModalsService;
    }
    execute(updateFn) {
        return updateFn().pipe(catchError((error) => {
            if (error.status === RX_ERROR_HANDLING.optimisticLockErrorHttpStatus) {
                return from(this.rxUtilityModalsService.confirmExternalChange(error.error[0].messageText)).pipe(switchMap((isConfirmed) => {
                    if (isConfirmed) {
                        return updateFn({
                            headers: {
                                'Override-Optimistic-Lock': 'true'
                            }
                        });
                    }
                    else {
                        return throwError(error);
                    }
                }));
            }
            else {
                return throwError(error);
            }
        }));
    }
}
RxDefinitionUpdateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionUpdateService, deps: [{ token: i2$1.RxUtilityModalsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDefinitionUpdateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionUpdateService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionUpdateService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i2$1.RxUtilityModalsService }]; } });

// TODO-VS: do not provide in root
class RxCommandManagerService {
    // TODO-VS: update types
    get() {
        return this.commandManager;
    }
    // TODO-VS: update types
    set(commandManager) {
        this.commandManager = commandManager;
    }
}
RxCommandManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCommandManagerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxCommandManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCommandManagerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCommandManagerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

const RX_DESIGNER_ELEMENT_SHAPE = {
    bpmnIcons: {
        gear: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsSAAALEgHS3X78AAAAw0lEQVQoz22SwRGCQAxF3zIUQAnSAXSAHUgHcslZK3CswPu/YAeUQAlQgp3oJThhNTM7s8lPfv783UQWZtYAC4CklOMpNE3AAHTAzfErsAIj0EtaSwcm4ADMGeEj3CegLjwZssaXnxgDwDbQREBSLanOiBqAZGbvUFwltZkJSyQssrUrv7GTVrh1V89P7li0uNsck5TKjLkCZjN7en722rdnGxjD1gq4/JE2Rlt719oGeQB34OhY/33pP99jc66VtDPiA3vHNpWAb5BUAAAAAElFTkSuQmCC',
        user: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsSAAALEgHS3X78AAAAgUlEQVQoz5WQwRFAMBBFn4wClKAEOlCCDtz2qhbXvdCBlKAEHVCKS8ywMsi7bfa/7CYZBhFpgT6Ug6r6az8z4RLYzB21qq5n4Uyz5cntzAoFH1hhTxV8JDO9CVVkSnn7JREpwsP6IMRYgQHwOTADzcfqFTACnfsRvtI4EsmBJUU4ANvZFcko+HmJAAAAAElFTkSuQmCC',
        message: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAACXBIWXMAAAsSAAALEgHS3X78AAAAnUlEQVQY042RwQ3CMBAEh8gF0Al0QEpIOuA+90XpADrgfZ+kA9xBWgidUAKfDTKCSL6XfZrdldc7d38Ae+rmlYBOlww8N8DDyiUtFqAFbhGxlKS7H4ELMAHnRntTwuzubQF3wAzkiLBPglzN3ZHIpBmBe0QMq0lTxsvFBI6AlfCPQKIJ6IFe569J/yqJiLzVa9LjrpX/QFI7p0o+vwFVmjBfid8AeAAAAABJRU5ErkJggg==',
        plus: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAD1BMVEUAAABmZmZmZmZmZmb////rTs6DAAAAA3RSTlMAgMBakZ4lAAAAAWJLR0QEj2jZUQAAACZJREFUGNNjYMAAwob05TAKAoGyEYgUYGA2hgMDVA6KsgFxKDIAALWJCwe6ztRNAAAAAElFTkSuQmCC',
        cross: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAVFBMVEUAAABmZmZVVVVgYGBxcXFnZ2dlZWVnZ2dlZWVlZWVnZ2dmZmZmZmZlZWVmZmZnZ2dmZmZnZ2dmZmZmZmZmZmZnZ2dmZmZlZWVmZmZmZmZmZmb///8fAoMMAAAAGnRSTlMABQYICUVHSElRUqOoq62ur7O0tre4ubr3+qfgKgYAAAABYktHRBsCYNSkAAAAnklEQVQoz51SyxKDIAwkgvahFkrVav7/QxuCg0nxJAdIdsmwu4MxV9a9B9lCf8vFc8OPPXA74fbgyiPiq8wAt0c57TN2psaDuDQz4xaBExOoXVyFF8Z96QhKIklBfEfapMAyU91PqwnnuIExEWNF8CNnTyQrMaoMhF+VgfIrMvjLoWTAuPQrGa/EsLwce7sqXzSztrnsBiWxGbpLP+QHwMkPHpwyEy0AAAAASUVORK5CYII=',
        multiInstanceParallel: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACxJREFUeNpilJOT+c+AAIwPHz5mkJeXBbGJEmdioBCMGjBqwKgBg8UAgAADADERCXj6SL6VAAAAAElFTkSuQmCC',
        multiInstanceSequential: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACtJREFUeNpilJOTYaAEsADxf0oMYGKgEFBsAMgLjEPfC6OxMBoLFBsAEGAAje8DgZ8/t18AAAAASUVORK5CYII=',
        action: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAAnUlEQVQokY2OsQ3CQBAE596P6IKABsiIoQ1kRHZN0Ik/QbgRyAkJKQQhmSUysl7y25vtavb2zN2vwAGoKKszszYCNWATMEAl6RRmwr0sZMFH0q3UyAvPlNJe0g54TBbMTAAppXvTNFtJNfAuLfzl7hFYAt9hHodGUnD3haQjcDazdX4oZn4DvMxsNbacvxSAUbgHVAIyKQCX2bTU/gAVMS805tVavgAAAABJRU5ErkJggg==',
        clock: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA/1BMVEUAAAAAAABgYGBxcXFdXV1qampiYmJpaWlra2tmZmZoaGhqampmZmZkZGRqampoaGhpaWlmZmZjY2NnZ2dlZWVpaWlmZmZkZGRnZ2dnZ2dmZmZnZ2dlZWVnZ2dmZmZnZ2dmZmZmZmZmZmZlZWVmZmZlZWVmZmZnZ2dmZmZnZ2dlZWVmZmZnZ2dlZWVlZWVlZWVmZmZnZ2dmZmZnZ2dmZmZmZmZmZmZlZWVmZmZmZmZnZ2dmZmZlZWVnZ2dmZmZnZ2dmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmb///8tfJx5AAAAU3RSTlMAAQgJCwwNERMUFhgZHB0gIiMkJSYnKCkqTVBSU1daXl9kaWpsb3Bydnd5e3x+iI2bn6Okp6iqq6ytrq+ws7a4udbX2Nrb3evx8vP09/j5+vz9/rXGk28AAAABYktHRFTkA4ilAAABCElEQVQoz2WS11rCQBCFBxugKDE2ROxixBIbxi7EAlKC2Zz3fxe3JNkNOTeTzD/7ze6ZIVKqHHf9ft/vHC2RKdtjiMU8W+cbIwR3O1axaDXuJxjWk7wT4bGa/FjPYKfqs87CpoiHrZKqC9m2iMsDODLhY0tVnuG3wsMtXikLCu+4IaqyyeoUoLW/cIWaaNM0IA8n1MFuHuzhg35g58EGvmiI+TxYwIBGmEvBdYurFINvrKdAShzbxKfR3HGlFuPm+rqGxHX1A7XkA7klb4VsXlkiTLzIgitlIrc9OjfrLyNluxzUkx7USzooNdr2fm1mtnbwYI6WqOyOk2UYu+VMQ74+vSDo6fX5B1EWNtYbmlVlAAAAAElFTkSuQmCC',
        qualification: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOtSURBVFiFtZddaBxVGIafb2a6STfRKo1QxYhGqQWtRWxjjCD+YFHaKxHpTSSQ7MSdgHS9qlBipFjJVQohG+cwpMFIBaN31YuIRaoXLfFCgxcWsfYn8Zc0pSa7ITtnjhfNwsY07uy0eWHh/HznfV6WnbPfCDHV0dHRkE6n90dR9LSItAF3A1sBB7gKXBCR76MoOqW1/nx0dPSfOL5SrSCbzbZEUXTIGHMAuC1m3oIx5mPLsgZ83/85UYDOzs76VCr1DpAD6mKC/6sScGx5eblvbGxsKXYAz/OaS6XSpyLSmhC8GiJyxhjzilLq96oBMpnMIyLyNdB0K+AVmomiaF8QBNPrBujq6nrItu3TXP+BbYRmHMfZk8/n/ygvWOWB67qbbNs+sYFwgHu11idzudzmNQGMMUeAPRsIL3OeKBQKh1YFcF33PhE5GNPjb+CwZVk7gQallNi2/aCIvAlcjhniLc/ztsH1SwRjzNsiEudRuwI8o5T6qXJxZGTkPDDked7xMAw/A/ZW8WkMw7AP8CSXy21eXFz8C2iMEeANpZQP4LpukzHmNRHRwLhSqgDQ29u7tVQqnQdur+K16DjONmthYeGlmPBisVj8CKC/v98BvhGRYeAD4GS5aHh4eA44FcOvQWu9z6L611XWpfHx8UWA2dnZVmBHxd5zrutuqZgvxDE0xjzviMijMQM87LquWWfv4vz8fCX0sZieuyxge8zi9XQliqIDExMTGsB13SdrCPCAA6RvAv5LFEUvBkHw6wp8BzBRw/ktFrApIXwJ2F+Gd3d3twGngeYaPLQFzCUMcK58H2Qyme2WZX0J3FWjx5wFXEgY4GJ5ICKvEu9RXiURmXWMMdMi0p4gwE7XdT9ZGT+e4DzAWQuYTHjYEpEWEWkBGhJ6fGvV19d/RcyLo1IictT3/d2+7+8GVAL4VWPMF9bQ0NA1YCyBwU1JRE4opQrOyvwYkKGG5tMY05TNZlsAtNZ31sgvGmMGoKIl6+npedcY01ejUVK9p5Q6DBUdUSqVOgpMr3vk1mmqrq7uSHmyqin1PK85DMMzwD0bBP8TaFVKXSovWJW7+Xz+chRFLwO/bQB8Fni2Er4mAEAQBNOO47QBP9xC+He2ba9p5QDsG1VPTU1da29vP6611sBTrPSOCbQEDACv+75/w/+cWC+nYRgeFJFO4r+cLojIh1rr94MgmPm/wqoByvI8r1Fr/QKwN4qiXSJyP3AHsLzyOSciPwKT6XR6cnBwsBjH919eHFLEJsIcUwAAAABJRU5ErkJggg==',
        connector: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAtklEQVQokYWRUQ2DQBBEHw0GsEAlYIFKoBJuJGChFgYJxQIWsICEVkL7AZce7ZFecj+bN5OZ3SKE8ACe/H81sJTA0/Y5R0jqNzB+yiM7SXegS0YD0J4O4AZov8YVQFZgewaufLqNwPQjkNRI6iW1tqdNNNq+RqZM4PsWYwRmScH2EJ13Akm3pGAH1LYvubgxUvVVrsqwO0G6kRHIugMUIYQX6zYG1uNMB2wNdCWwJNkBmiN3YHkDS8QzErkLgz8AAAAASUVORK5CYII=',
        errorEnd: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAABzUlEQVRYhe2WzXHCMBCFv2RSgEsgHYQOSAXBFQCXPeMKUgKc9xJSAaQC6AA6wCW4hBwszyiyZEkZxsOBd/LPev3NeyvZ8NCd6mnsF4pIAVyBAnhV1RrgeWwQYG8g6g5idBAR2QAzc3qw740GIiJzYG1d+rbvJ8+IyXYJXFT1lAnxBhxpI8H0mNo1OY4sgQ1wNI1TIQrgy4IAx41ckIV1nAOzAdzag1uUBCIiE6dZkQIjImtaJ22d7NWSBeJpFoURkRmtG656seSALALXvTBmLvaBZ3qxJIGYl0wGSnww9gr5A6Gqja/JSwyEsBsuzF5EpsAn/eHs9BNqkAKyTKiB1rUzYfcaVd2FHh6MxuyGPouHYELyzkYSCPCRARFTMJYUkPnAvToDolHV/zkiIkvCsWyBaQbMLlYw5EgolouqVmYZloB3OTrybmJRELMh+WJpgPfuRFUv5nwIpjZ1+SABCIDS3ZASYKJuDIH4NrEq9B8SgdmlgPR+jMyX9uo2U9VVrFnKD1BIPkfcWC5AldLMcqZTUiwhEDuWBliFPlQRmIrEWMCJxlh7ti6VsY3oVnIdsd3YjgXhA+nm46SqSXNxcxCzWia0c1GOCfHQXesXYhiZ69pK0h4AAAAASUVORK5CYII=',
        errorBoundary: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAACR0lEQVRYhe2Wz3XiQAyHv90KTAcuATpIKlioYMlF14VKIFddMBXAVhA6gA7iDkIJexhNUAaP/+Tt88shusDYsvz5p5E08G1f1H6M/UIRKYBXoAAmqnoF+Dk2CHAwiDpCjA4iIhvgwZZHf280EBGZAyt3ae/v994jltslcFHV00CIKfBCSAkWY+Z9hiiyBDbAiwXuC1EAO4Oo7fI+9RsC8tv9HwKzAaaEPRE35zF16gUiIqUFuwBPhK/rhBGRFZZO4NlinFS1/hSIBQPYq2rVB0ZEHghqXM3/V4zR5N8XJKalAjCYdQ7G9sXBlmtVvQBzW9+lpReIvaQEjr4BqerWwJpgYoVsVbXKxRgEwk2Nv+kNVX1yMAcRKaxpTQklujbXP7kYQ0CW9tsoqYMpgTOhaV2BR+c2B66W0uEg1g0LoPKSikjpU5HAXIFF9HcxGj+kFwi3nf4uqVXDGTiLyC6BmQGzpPPexWiy1hYvIm/2komt/QivCQpUBtH0fAG8EdIyaXtXVhERWXIv6Xs1EL6+BpZemcRiyVZtEK0g3CR9NrAP1WB7YEHYEzmY1ibWCWKSzgmHl4upc1cN1qgeHcwqF+NTILguaNWxsfUibUgJzMagwY2FLog2EN/E4ghf584hCczOYD6MhS67qxqbtK+EiVkT1MlWRvJs5wEoZ02KxLTEHF8IA67TnDLReqUlBxIlLbERnhtUHTBreqYFktSYtGd3aaGqra35f1mqiD8ObseCaAKJ++PkRvi4INaASmx6jgnxbV/a/gFaCwT89kIjVgAAAABJRU5ErkJggg==',
        webRequest: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAtklEQVQokYWRUQ2DQBBEHw0GsEAlYIFKoBJuJGChFgYJxQIWsICEVkL7AZce7ZFecj+bN5OZ3SKE8ACe/H81sJTA0/Y5R0jqNzB+yiM7SXegS0YD0J4O4AZov8YVQFZgewaufLqNwPQjkNRI6iW1tqdNNNq+RqZM4PsWYwRmScH2EJ13Akm3pGAH1LYvubgxUvVVrsqwO0G6kRHIugMUIYQX6zYG1uNMB2wNdCWwJNkBmiN3YHkDS8QzErkLgz8AAAAASUVORK5CYII=',
        transparent: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=',
        info: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAz0lEQVQokX2SsQ3CMBBFXzJBRsgIkWsX1G6ACYANwgTABBEbMAI0aQmS6wAbMAIjoB/ZUogMv7Clu/vf/+6cEWDbvgBqYA5UwBvogKN3pot1A8G2vQquQEEaJ+/MRpnctn2ZKD4E9Yi1bftmIABNQlnFr0mslhMRFpPECZgBZcLcKk8En96ZPXBL5KoUofnR+IAU4RFu9aDRfuVEGE9D2OrwzqiXSI64ZGEH9382As7emWXunZGKljJ9fgy5GBY3/hoa4y6MOe5FYvoasgfAB64INJdEFsdVAAAAAElFTkSuQmCC',
        jitterbit: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEwUlEQVR4nO3aeahVVRTH8U83LW00s0GigkpRK8yKCqKiwiyQaKASI5WMoKCBoLKkOQgaiKRSooiIShqsiMoKksrmlGYaoKKSZ5PaYKg59Mc6t3fve/fdd8/Z1/v643xh8/Sx92+tvc8+a629z6OkpKSkpKSkpKSkpIMciAswdKAdGSjOxyb8hH0G0pHKANk9Kvv5Cb4ZIB9aZofNoPcn/sEBbdZuO+PxPca1UfNqsf0faqPmZuNSbMQSDG6D3mj8LRbgyDbodYSZ2IB50mLGCHwlJr88UavjXC8cf1ixnTAaX2QamzA/0Z/hieNzU8Ei4fynOKHFcYNxkQh6m2ralYn+LMPdiRq5OVjEg+ok3hET2R+DavoNwgRcg2/VT7zapib68obYlR3nKY0ntA4r0IX1ffSpbZMT/XhBmxZgUP9d6ngQpzX4/WDsJCb/qtgdP2b/3xWH4PisD+kl8LYYlqhR2PAavZ/oWtyG3ZqMHYJzxcLMSPRjGRYmahTmXfWTX4ZDc4zfHmMT7I/L7P6JrRN0CvOi7sl/jT06bP/eGvtTOmwbPJEZXyMyQyc5QpwhqgvwsfZUqLl4PTN+c6LO+Jz9x4rXrWf8uSHRj9z8Ip5CytbfGavxgO7M0Iwz8ZvGKXUjpiX4kou9MqOLEnWO0V0k/YTZmXYt2+AUvJb1+0GcIK8T1eUtIhOsF2eV2dgi0a9+uSRzZm6b9A4Tk1qX6X6PD/C57nS7Gudhyz40RoozyiYs1lpcOk6Bcryi+0BzRd7B/bCXeB02qN/eP4tFaoWZukv113AZjsYocQc5GTeJW6iFuDCvk9NrHJuVd3A/VI/Gh+P9Gjt5S+YrNI4T1Vhxn4Kxaw/xNKpi9xQRacI8HJT9uyIuTe8soFMRB6Wek1+FE4s6twPe6yG4pKhYAwaJxf1dBL1UJqn39S+xswoxUu/St9pSytlazlC/TedixwS9ClbWaE4vKjJVHG/7eqeeTHCyynbiWryndhcuVvzUWI0ji/MOrOAkLG3gVKM2s6CDsBWe60d/Fe4XdUOeO8Sq//2+UtXC4WJRmk7KjL4hcvFKkaN3x96ZIwfXjFsvPnHdn8M54tV6BMfmGLNc1AhL8SZe7qNfNaYMFhXnulbEX8IckTP7Y3fcKIJW9Uk9jTEtjN1KLNiv2biPcCvOEgu7Z6a/j7g2Pwd3Zf1qd8YdTWxMzPq81YI//1GkhByOx2uc2igKkFni9meUmMwYkc/vFE9xrQh0eb8K7SfK3y7Nc/lj2hejWuIy9Zelzdrz0j+GNrvGq02BjybaycVVmk98jThHbM7DygT1WeuVzWirIQ/pe/ITC2ruIjJNs4Wr4Gz80cNuV0GbhRmm94XFeo1vkVtlp0znbZyq/iZ4b3HJ2jNA1rajdJjLezgwJ1FvqN4LukKk6tWi4FkggvFCfNej/9OJ9nMzQveRtktaSQv76v1UF+Nkcc3eiJHiVPidhFI4hc8yw7PboDVD98S/FOm1VYbidhEbOvoqPCMc3q8NWoszrWcV303TxCKkfo5rmfn4sA06p4vJz5OePqeIT/QdYZH0P3+piO+LC/R9F/i/ZTmuHWgnWqXdf6YyRHw4ebvNuiUlJSUlJSUlJSUl7eVfZ4yXeU+b+PAAAAAASUVORK5CYII=',
        mulesoft: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAHt0lEQVR4nO2bWWxVVRSGv9JiMbRlLmCUqG2t0ahMFiQKDz4YBRkejCIEKiBBqBAeTFCCCfigMRgRxYgPJkwSjXHGIZoYEASlZSgxoVih4MAgbYGWVtrS68PqsbeHtfY599zbGxL9k520+6691tr77LOmvQ/8x5GRBhn9gPHAHcCtQDEwAOgL9O6guQjUA7XAEeAwUAnsAM6lQceUowhYBZQDbUAsYmsD9gIrgcK0ziACsoCZwA9En3BQ2wXMADLTNKdQyALmA7/SfRP3t2pgHlfBQowCfiJ9E/e3A8C4ZCYQ1Qj2AlYDC0PyaEUWqhIxcNVAE9DQ8XsuYhALEUN5J1CC7K4gtAPrgGeAS6FnkASKgH0EP50GYAPwEJATQU4OMBHYCDSGkFdBGgzlBMQtuRSpQXZGb51FJOQAZcDxANn1iMvtFkwDmh3Ca4EFQM/uUgC4BlgE1Dn0aAamplrwNNz+fDMwKNVCHcgH3nXo00YKF2EC9pNvBpakSlAEzMK2D82k4HUown7nTwEjkxWQAowGTmPbhIKojHsB+w3Gx3Bb3B5RhUZEEWJ8NV3LgewoTN8wGJ7CPflZiL/PiyLUQCbwFfCEg6YIeye8lqjAcUiA4Wd0ERhhjMkFPoqjfTNRoQ4sjeP7KfbijkYCLL/el4ExYYVlYm/9UmPMUCQQiadtB+4PK9SBm7jS0B0CbjDonzR0ryBk7jDfYLDZoB+CnQhVIbYkKjKA7wzeR5GF17DVGDMnSGAm8IsysBbdz+dy5ZP3txeDhDqwMIB3JdBHGZePHixVE5BfzDQELTDorZWOb63YdsOFYcCFEPzfM8aXGfSPu4RqxYwTSAjqx7QQynntAImHyF8mwP8xZXxPdNf4vSWwCN3yL1Roc4EzCSgYA5aFmragNEHef6F7hqcV2naM4GiVQtyAntUtT1DBGBKa3hJi8kNxJztWW6HwykUPlZ/XBJcrhBsUupyICsaA7QRHifGxRCKtrmPCfmxWaPf4ifqhZ3sPKgxnRFTQa085Jv9okrxnKTwfVuha8XmPyQpRC3ol53OHAhXAKwFKnkcPYgZih7JeWwb86fj9C4VvXseE/bST4olWKAS7FGbZSN3NUmACEvj8HDCRzxTervw+BnyLBEbzHDQt6IHXboV2eTyB9p6sUxiNcQivjKMb0aGMa0LT4+gnBdCeR+ICgGtx26Cxit5vKXQboNMgada5SukbpfR52BL3937gJQctSIY2EDkiWx9AuxSJR0C8yYcOWk3Hw0pfMXQuQL5CcEzpu94h2B9gvIAshIVBwBrEZlznoNsGvOPr2+Gg13Q8qvTlQ2dcrBm7C0pfX4fgQ77/W4HZyNmeVZDwPIqFOiS786NS6fPQX+nT5pILnTtA858NSp+Vh7cY9IeQg00XXAcrZcBJpf+sY4ymY+AChIU2SZCnbeFllMAjBD5Aki0NrhMgS0cV3gJog7RdUWvw6Y2eMIFUY0oR4xUWp9FzEA/aNveg6ajtigZwL4A26IxDsKtOWAU85/jdjwVIgmPBlVOcUvq0mkGXBdCE3az0VTgEa/43HmuRXCAIm4CPA2hc9T1NR20uXR6mFghpRc1s4G+FNoaEyEG4EXeR4w8kLwmCFWm2IIGSH+sV2i6BkBb0DFf6LgE/Gko9QGe0ZqEGOcbWEENqdvUBPO4DbjN+241ua+5S+o5AZxxwUCEYjcQHjb7+jehHTlmIy3PV7gHe7lDSH7OfBb4OGAtut7pJ6euDHh12mXNf9HR4ojLQKjLEEIufilK4hbmG3BhyHqAZuykKbSuKkd+rEG40FHnVochJpJafapQgBzOW3NXGOC3L3K0RrlQIG9HD5P64M7KjJHEoqWAM4qkseeeQu4d+5KIvmlY+oxC9KFpmKLXYoVAMMWaPJDJLBRlIQOR68jHsI3pNx3Z0twhIEcQ/4Dh6lNcDqcC4FIsh5e2ouD0E/23o+UQ28JtCb5bFwa73LTLoBxB8b+ebEBO1kIFEdhbvGuybKUuMMdoZwr/IRPyj9o5Z53DFSABjKflswCSDYJXKTiNX6jQMRl5B/5hqQhyQWjU3KzMD9yKEPpY2MEfh+Tvyelh439ClNIzATOx7gHMd4wYj292/c5K9zjrMx3Mn9m4ESaQ03csT0WUsEtT4mTQhEaKFLOSEyascfxJWYACOINHjKtxnjCXoF7ouA3cnKvR1hZH37hUFjC1ATm0XJyrUwGyCb4EWY8cKa6IIzcY++68heBEgfZelirG9kasmGYhCdGvq7QTX65AulGA/+TocQU9Y3IMdiV0NFyUt3ZqQ1DklmIr7quxWxAukC0OwXV0MyfampFroVNyXpeuRvMEqjqYC2ciOc91Yb6IbJu9hPLZN8NoJ5GaGVlWOilzEo2ixvf+dvzeFclUUoF+m8LeLSK1xMtEWIw95klsIzgY9a5+wwYv6yUw2cuBRRjhX14Ys2kGk/liN1Bq8E5s8pO5QhJS8hyNlrLCfzKxF7g6k5ZOZeIxEiqRBT6e72j6Cy/HdjkwkYdEuWHZXq0ISm3TfSnciE7mEuBO9spRsa0eKGdO5Cr4XDEIBchVtD8l9OtuKFDBX0D2F1rR8PN2HKz+e9m6GeAXXRsS3n0Vuc1QhR+vb0Y+2/0eq8A+7eiRd8wqrwQAAAABJRU5ErkJggg=='
    }
};

class RxDesignerStencilBuilder {
    buildElementsTree(elementsSources, elementGroups) {
        return forkJoin(elementsSources).pipe(map((elements) => {
            return flow(flatten, (chainElements) => map$1(chainElements, 'group'), uniq, compact, (groupNames) => sortBy(groupNames, (groupName) => groupName.toLowerCase()), (groupNames) => sortBy(groupNames, (groupName) => (find(elementGroups, { name: groupName }) || elementGroups.default).priority), (groupNames) => map$1(groupNames, (groupName) => {
                return {
                    label: groupName,
                    children: flow(flatten, (chainElements) => filter$1(chainElements, { group: groupName }), (chainElements) => sortBy(chainElements, (element) => element.label.toLowerCase()))(elements)
                };
            }))(elements);
        }));
    }
}
RxDesignerStencilBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerStencilBuilder, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDesignerStencilBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerStencilBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerStencilBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

const tenancyModes = {
    shared: 0,
    dedicated: 1,
    unified: 2
};
const RX_ENVIRONMENT = {
    tenancyModes,
    tenancyModeNames: {
        [tenancyModes.shared]: 'Shared',
        [tenancyModes.dedicated]: 'Dedicated',
        [tenancyModes.unified]: 'Unified'
    }
};

class RxServerErrorHandlerService {
    constructor(translateService, rxNotificationService) {
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
    }
    getServerResponseErrorDetails(responseData) {
        let messages;
        try {
            messages = JSON.parse(responseData);
        }
        catch (ignored) {
            messages = [...responseData];
        }
        if (Array.isArray(messages)) {
            return messages.filter((message) => message.messageType !== RX_ERROR_HANDLING.messageTypes.success &&
                (message.messageText || message.appendedText));
        }
        else {
            return null;
        }
    }
    buildMessageFromRawResponse(response) {
        const errorMessage = {
            title: '',
            message: ''
        };
        if (response.status === 0) {
            errorMessage.title = this.translateService.instant('com.bmc.arsys.rx.client.error-handling.network-error.title');
            errorMessage.message = this.translateService.instant('com.bmc.arsys.rx.client.error-handling.network-error.message');
        }
        else {
            errorMessage.title = this.translateService.instant('com.bmc.arsys.rx.client.error-handling.server-communication-error.title');
            errorMessage.message = this.translateService.instant('com.bmc.arsys.rx.client.error-handling.server-communication-error.message', {
                status: compact([response.status, response.statusText]).join(' ')
            });
        }
        return errorMessage;
    }
    buildMessageFromErrorDetails(error) {
        return {
            title: `${error.messageType} (${error.messageNumber})`,
            message: truncate([error.messageText, error.appendedText].filter(Boolean).join(' '), {
                length: RX_ERROR_HANDLING.maxErrorMessageLength
            })
        };
    }
    handle(error) {
        if (!this.canIgnore(error)) {
            const operationId = error.headers.get('operation-id');
            if (Array.isArray(error.error) || isString(error.error)) {
                const messages = this.getServerResponseErrorDetails(error.error);
                messages.forEach((message) => {
                    const messageDetails = this.buildMessageFromErrorDetails(message);
                    switch (message.messageType) {
                        case RX_ERROR_HANDLING.messageTypes.error:
                            this.rxNotificationService.addErrorMessage(messageDetails.message, messageDetails.title, {
                                issue: Object.assign(Object.assign({}, message), { operationId, enableIssueReporting: true })
                            });
                            break;
                        case RX_ERROR_HANDLING.messageTypes.warning:
                            this.rxNotificationService.addWarningMessage(messageDetails.message, messageDetails.title, {
                                issue: Object.assign(Object.assign({}, message), { operationId, enableIssueReporting: true })
                            });
                            break;
                        case RX_ERROR_HANDLING.messageTypes.info:
                            this.rxNotificationService.addInfoMessage(messageDetails.message, messageDetails.title);
                            break;
                    }
                });
            }
            else {
                const errorMessage = this.buildMessageFromRawResponse(error);
                this.rxNotificationService.addErrorMessage(errorMessage.message, errorMessage.title);
            }
        }
    }
    canIgnore(err) {
        return some(RX_ERROR_HANDLING.ignoredErrors, (ignoredError) => ignoredError.status === err.status && includes(JSON.stringify(err.error), ignoredError.contains));
    }
}
RxServerErrorHandlerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerErrorHandlerService, deps: [{ token: i2.TranslateService }, { token: RxNotificationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxServerErrorHandlerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerErrorHandlerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerErrorHandlerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i2.TranslateService }, { type: RxNotificationService }]; } });

class RxScriptErrorHandler {
    constructor(rxNotificationService, rxLogService, translateService) {
        this.rxNotificationService = rxNotificationService;
        this.rxLogService = rxLogService;
        this.translateService = translateService;
    }
    handle(error) {
        const rxErrorMessage = truncate(`${this.translateService.instant('com.bmc.arsys.rx.client.error-handling.script-error.message')} ${error.message}`, {
            length: RX_ERROR_HANDLING.maxErrorMessageLength
        });
        this.rxNotificationService.addErrorMessage(rxErrorMessage, this.translateService.instant('com.bmc.arsys.rx.client.error-handling.script-error.title'), {
            suppressLog: true
        });
        this.rxLogService.error(error.stack);
    }
}
RxScriptErrorHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxScriptErrorHandler, deps: [{ token: RxNotificationService }, { token: RxLogService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxScriptErrorHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxScriptErrorHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxScriptErrorHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxNotificationService }, { type: RxLogService }, { type: i2.TranslateService }]; } });

class RxErrorHandlerService extends ErrorHandler {
    constructor(rxServerErrorHandler, rxScriptErrorHandler, rxLogService) {
        super();
        this.rxServerErrorHandler = rxServerErrorHandler;
        this.rxScriptErrorHandler = rxScriptErrorHandler;
        this.rxLogService = rxLogService;
    }
    handleError(error) {
        if (error instanceof HttpErrorResponse) {
            this.rxServerErrorHandler.handle(error);
            super.handleError(error);
        }
        else if (error instanceof Error && !(error instanceof RxError)) {
            // Script error is considered when "error" is
            // an instance of Error but not an instance of RxError
            // (RxError's must only be logged in the debug mode).
            this.rxScriptErrorHandler.handle(error);
            super.handleError(error);
        }
        else {
            this.rxLogService.debug(error.message);
        }
    }
}
RxErrorHandlerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorHandlerService, deps: [{ token: RxServerErrorHandlerService }, { token: RxScriptErrorHandler }, { token: RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxErrorHandlerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorHandlerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorHandlerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: RxServerErrorHandlerService }, { type: RxScriptErrorHandler }, { type: RxLogService }]; } });

class RxServerMessageHandlerService {
    constructor(rxNotificationService, rxJsonParserService, rxStringService) {
        this.rxNotificationService = rxNotificationService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxStringService = rxStringService;
    }
    handleServerResponseMessage(serverMessage) {
        const decodedMessage = this.rxStringService.decodeQ(serverMessage);
        const messages = reject(this.rxJsonParserService.tryParseJson(decodedMessage, []), (message) => message.messageNumber === RX_ERROR_HANDLING.arNoteLogInfo);
        messages.forEach(this.addMessage.bind(this));
    }
    addMessage(message) {
        let messageTitle = `${message.messageType}`;
        if (message.messageType !== RX_ERROR_HANDLING.messageTypes.success) {
            messageTitle += ` (${message.messageNumber})`;
        }
        const messageString = truncate(`${[message.appendedText, message.messageText].filter(Boolean).join(' ')}`, {
            length: RX_ERROR_HANDLING.maxArMessageLength
        });
        switch (message.messageType) {
            case RX_ERROR_HANDLING.messageTypes.warning: {
                this.rxNotificationService.addWarningMessage(messageString, messageTitle);
                break;
            }
            case RX_ERROR_HANDLING.messageTypes.success: {
                this.rxNotificationService.addSuccessMessage(messageString, messageTitle);
                break;
            }
            default: {
                this.rxNotificationService.addInfoMessage(messageString, messageTitle);
                break;
            }
        }
    }
}
RxServerMessageHandlerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerMessageHandlerService, deps: [{ token: RxNotificationService }, { token: i2$2.RxJsonParserService }, { token: i2$2.RxStringService }], target: i0.ɵɵFactoryTarget.Injectable });
RxServerMessageHandlerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerMessageHandlerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerMessageHandlerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxNotificationService }, { type: i2$2.RxJsonParserService }, { type: i2$2.RxStringService }]; } });

class RxHttpResponseMessageInterceptor {
    constructor(rxServerMessageHandler) {
        this.rxServerMessageHandler = rxServerMessageHandler;
    }
    intercept(request, next) {
        return next.handle(request).pipe(tap((httpEvent) => {
            if (httpEvent instanceof HttpResponse) {
                const message = httpEvent.headers.get(RX_ERROR_HANDLING.arMessagesHeader);
                if (message) {
                    this.rxServerMessageHandler.handleServerResponseMessage(message);
                }
            }
        }));
    }
}
RxHttpResponseMessageInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpResponseMessageInterceptor, deps: [{ token: RxServerMessageHandlerService }], target: i0.ɵɵFactoryTarget.Injectable });
RxHttpResponseMessageInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpResponseMessageInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpResponseMessageInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: RxServerMessageHandlerService }]; } });

class RxErrorHandlingModule {
    static forRoot() {
        return {
            ngModule: RxErrorHandlingModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxHttpResponseMessageInterceptor,
                    multi: true
                },
                {
                    provide: ErrorHandler,
                    useClass: RxErrorHandlerService
                }
            ]
        };
    }
}
RxErrorHandlingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorHandlingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxErrorHandlingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorHandlingModule, imports: [CommonModule] });
RxErrorHandlingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorHandlingModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorHandlingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule]
                }]
        }] });

var ExpressionOperator;
(function (ExpressionOperator) {
    ExpressionOperator["LeftGrouping"] = "(";
    ExpressionOperator["RightGrouping"] = ")";
    ExpressionOperator["DoubleQuote"] = "\"";
    ExpressionOperator["Add"] = "+";
    ExpressionOperator["Subtract"] = "-";
    ExpressionOperator["Multiply"] = "*";
    ExpressionOperator["Divide"] = "/";
    ExpressionOperator["Remainder"] = "%";
    ExpressionOperator["GreaterThan"] = ">";
    ExpressionOperator["LessThan"] = "<";
    ExpressionOperator["Equal"] = "=";
    ExpressionOperator["NotEqual"] = "!=";
    ExpressionOperator["GreaterThanOrEqual"] = ">=";
    ExpressionOperator["LessThanOrEqual"] = "<=";
    ExpressionOperator["In"] = "IN";
    ExpressionOperator["Like"] = "LIKE";
    ExpressionOperator["Contains"] = "CONTAINS";
    ExpressionOperator["And"] = "AND";
    ExpressionOperator["Or"] = "OR";
    ExpressionOperator["Not"] = "NOT";
    ExpressionOperator["Null"] = "NULL";
    ExpressionOperator["NullExpression"] = "$NULL$";
})(ExpressionOperator || (ExpressionOperator = {}));

var ExpressionOperatorGroup;
(function (ExpressionOperatorGroup) {
    ExpressionOperatorGroup["All"] = "all";
    ExpressionOperatorGroup["AllServer"] = "allServer";
    ExpressionOperatorGroup["AllClient"] = "allClient";
    ExpressionOperatorGroup["Math"] = "math";
    ExpressionOperatorGroup["MathClient"] = "mathClient";
})(ExpressionOperatorGroup || (ExpressionOperatorGroup = {}));
const allOperatorsMap = new Map(Object.values(ExpressionOperator).map((value) => [
    value,
    {
        displayValue: value === ExpressionOperator.NullExpression ? 'NULL' : value,
        value
    }
]));
const allOperatorRows = [
    [
        allOperatorsMap.get(ExpressionOperator.LeftGrouping),
        allOperatorsMap.get(ExpressionOperator.RightGrouping),
        allOperatorsMap.get(ExpressionOperator.DoubleQuote),
        allOperatorsMap.get(ExpressionOperator.Add),
        allOperatorsMap.get(ExpressionOperator.Subtract),
        allOperatorsMap.get(ExpressionOperator.Multiply),
        allOperatorsMap.get(ExpressionOperator.Divide),
        allOperatorsMap.get(ExpressionOperator.Remainder)
    ],
    [
        allOperatorsMap.get(ExpressionOperator.GreaterThan),
        allOperatorsMap.get(ExpressionOperator.LessThan),
        allOperatorsMap.get(ExpressionOperator.Equal),
        allOperatorsMap.get(ExpressionOperator.NotEqual),
        allOperatorsMap.get(ExpressionOperator.GreaterThanOrEqual),
        allOperatorsMap.get(ExpressionOperator.LessThanOrEqual),
        allOperatorsMap.get(ExpressionOperator.Like)
    ],
    [
        allOperatorsMap.get(ExpressionOperator.And),
        allOperatorsMap.get(ExpressionOperator.Or),
        allOperatorsMap.get(ExpressionOperator.Not),
        allOperatorsMap.get(ExpressionOperator.NullExpression)
    ]
];
const allClientOperatorRows = [
    [...allOperatorRows[0]],
    [
        allOperatorsMap.get(ExpressionOperator.GreaterThan),
        allOperatorsMap.get(ExpressionOperator.LessThan),
        allOperatorsMap.get(ExpressionOperator.Equal),
        allOperatorsMap.get(ExpressionOperator.NotEqual),
        allOperatorsMap.get(ExpressionOperator.GreaterThanOrEqual),
        allOperatorsMap.get(ExpressionOperator.LessThanOrEqual),
        allOperatorsMap.get(ExpressionOperator.Contains)
    ],
    [
        allOperatorsMap.get(ExpressionOperator.And),
        allOperatorsMap.get(ExpressionOperator.Or),
        allOperatorsMap.get(ExpressionOperator.Not),
        allOperatorsMap.get(ExpressionOperator.Null)
    ]
];
const mathOperatorRow = [
    allOperatorsMap.get(ExpressionOperator.LeftGrouping),
    allOperatorsMap.get(ExpressionOperator.RightGrouping),
    allOperatorsMap.get(ExpressionOperator.DoubleQuote),
    allOperatorsMap.get(ExpressionOperator.Add),
    allOperatorsMap.get(ExpressionOperator.Subtract),
    allOperatorsMap.get(ExpressionOperator.Multiply),
    allOperatorsMap.get(ExpressionOperator.Divide),
    allOperatorsMap.get(ExpressionOperator.Remainder)
];
const ExpressionOperatorRowsByGroup = new Map([
    [ExpressionOperatorGroup.All, allOperatorRows],
    [ExpressionOperatorGroup.AllServer, allOperatorRows],
    [ExpressionOperatorGroup.AllClient, allClientOperatorRows],
    [ExpressionOperatorGroup.Math, [[...mathOperatorRow, allOperatorsMap.get(ExpressionOperator.NullExpression)]]],
    [ExpressionOperatorGroup.MathClient, [[...mathOperatorRow, allOperatorsMap.get(ExpressionOperator.Null)]]]
]);

class RxExpressionConfigurator {
    constructor() {
        this.expressionConfigs = [];
    }
    getDefaultConfig() {
        return {
            dataDictionary$: this.commonDataDictionary$,
            operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.Math),
            validateExpression: (propertyPath, expression) => of(true)
        };
    }
    configureForProperty(config) {
        this.expressionConfigs.push(Object.assign(Object.assign({}, this.getDefaultConfig()), config));
    }
    getDataDictionary(propertyPath) {
        return this.getExpressionConfig(propertyPath).dataDictionary$.pipe(map((dataDictionary) => this.sortDataDictionary(dataDictionary)));
    }
    getOperators(propertyPath) {
        return flatten(this.getOperatorRows(propertyPath));
    }
    getOperatorRows(propertyPath) {
        return this.getExpressionConfig(propertyPath).operators;
    }
    getOperatorRowsByGroup(group) {
        return cloneDeep(ExpressionOperatorRowsByGroup.get(group));
    }
    getExpressionConfig(propertyPath) {
        return (this.expressionConfigs.find((config) => isRegExp(config.propertyPath) ? config.propertyPath.test(propertyPath) : config.propertyPath === propertyPath) || Object.assign({ propertyPath }, this.getDefaultConfig()));
    }
    validateProperty(propertyPath, propertyValue) {
        return propertyValue
            ? this.getExpressionConfig(propertyPath).validateExpression(propertyPath, propertyValue)
            : of(true);
    }
    sortDataDictionary(dataDictionary) {
        forEach(dataDictionary, (node) => {
            if (node.children) {
                node.children = this.sortDataDictionary(sortBy(node.children, [(child) => !isUndefined(child.expression), 'label']));
            }
        });
        return dataDictionary;
    }
}

var ExpressionParserToken;
(function (ExpressionParserToken) {
    ExpressionParserToken["SingleQuoteRxExpression"] = "__SINGLE_QUOTE_RX_EXPRESSION__";
    ExpressionParserToken["SingleQuoteTextExpression"] = "__SINGLE_QUOTE_TEXT_EXPRESSION__";
    ExpressionParserToken["ArExpression"] = "__AR_EXPRESSION__";
    ExpressionParserToken["RxExpression"] = "__RX_EXPRESSION__";
    ExpressionParserToken["RxStringExpression"] = "__RX_STRING_EXPRESSION__";
    ExpressionParserToken["RxOperator"] = "__RX_OP__";
})(ExpressionParserToken || (ExpressionParserToken = {}));

class RxExpressionParserService {
    constructor() {
        this.tokenRegExpMap = new Map([
            [ExpressionParserToken.SingleQuoteRxExpression, /('\${[^{}$]+}')/g],
            [ExpressionParserToken.SingleQuoteTextExpression, /('[^$']+')/g],
            [ExpressionParserToken.ArExpression, /(\$[A-Z]+\$)|(\$\\[A-Z]+\$)/g],
            [ExpressionParserToken.RxExpression, /(\${[^{}$]+})/g],
            [ExpressionParserToken.RxStringExpression, /("[^"]+")|('[^']+')/g]
        ]);
    }
    parse(expression, replaceFunc, operators = []) {
        if (operators.length) {
            const pattern = operators
                // Sort operators in descending order by length to find a compound operator in an expression.
                // e.g. "${foo} >= ${bar}" has ">=" operator instead of ">" and "=" separately.
                .sort((prevOperator, operator) => operator.value.length - prevOperator.value.length)
                .map((operator) => `\\${operator.value.split('').join('\\')}`)
                .join('|');
            this.tokenRegExpMap.set(ExpressionParserToken.RxOperator, new RegExp(pattern, 'g'));
        }
        const expressionValuesMap = new Map();
        for (const [token] of this.tokenRegExpMap) {
            let expressionValues;
            ({ expression, expressionValues } = this.extractExpressionValues(expression, token, this.tokenRegExpMap.get(token)));
            if (expressionValues) {
                expressionValuesMap.set(token, expressionValues);
            }
        }
        return Array.from(expressionValuesMap.keys())
            .reverse()
            .reduce((result, token) => result.replace(new RegExp(token, 'g'), () => replaceFunc(token, expressionValuesMap.get(token).next().value)), expression);
    }
    // Replaces all spaces with a single space except user inputs
    // ${view.foo} =   "bar" -> ${view.foo} = "bar"
    // ${view.foo} =   "    bar" -> ${view.foo} = "    bar"
    stripSpaces(expression) {
        let result = expression;
        if (!isNil(expression)) {
            const token = ExpressionParserToken.RxStringExpression;
            const extractExpressionsResult = this.extractExpressionValues(expression, token, this.tokenRegExpMap.get(token));
            result = extractExpressionsResult.expression
                .replace(/\s+/g, ' ')
                .replace(new RegExp(ExpressionParserToken.RxStringExpression, 'g'), () => extractExpressionsResult.expressionValues.next().value);
        }
        return result;
    }
    extractExpressionValues(expression, token, regExp) {
        const expressionValues = expression.match(regExp);
        forEach(expressionValues, (value) => (expression = expression.replace(value, token)));
        return {
            expression,
            expressionValues: expressionValues && expressionValues.values()
        };
    }
}
RxExpressionParserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionParserService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxExpressionParserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionParserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionParserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

var FormBuilderEvent;
(function (FormBuilderEvent) {
    FormBuilderEvent[FormBuilderEvent["HideWidget"] = 0] = "HideWidget";
})(FormBuilderEvent || (FormBuilderEvent = {}));

class RxFunctionalRoleDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.functionalrole.datapage.FunctionalRoleDataPageQuery');
        this.injector = injector;
    }
}
RxFunctionalRoleDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFunctionalRoleDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxFunctionalRoleDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFunctionalRoleDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFunctionalRoleDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

var NodeInfoType;
(function (NodeInfoType) {
    NodeInfoType["function"] = "function";
})(NodeInfoType || (NodeInfoType = {}));

class RxDataDictionaryUtils {
    addTooltips(dataDictionary, parentNodeLabel) {
        return map$1(dataDictionary, (node) => {
            const tooltip = parentNodeLabel ? `${parentNodeLabel} > ${node.label}` : node.label;
            return Object.assign(Object.assign({}, node), { tooltip, children: node.children ? this.addTooltips(node.children, tooltip) : null });
        });
    }
    // TODO-VS: refactor to use below method
    getFunctionsDataDictionaryBranch(functionDescriptors) {
        return chain(functionDescriptors)
            .groupBy('category')
            .map((functionDescriptors, category) => ({
            label: category,
            children: map$1(functionDescriptors, (functionDescriptor) => ({
                label: functionDescriptor.name + '()',
                icon: 'd-icon-mathematical_function',
                expression: functionDescriptor.name + '()',
                info: {
                    type: NodeInfoType.function,
                    data: functionDescriptor
                }
            }))
        }))
            .value();
    }
    getFunctionDataDictionaryBranch(functionDescriptors) {
        return chain(functionDescriptors)
            .groupBy('type')
            .map((functionDescriptors, functionType) => ({
            label: functionType,
            children: map$1(functionDescriptors, (functionDescriptor) => ({
                label: functionDescriptor.name + '()',
                icon: 'd-icon-mathematical_function',
                expression: functionDescriptor.name + '()',
                info: {
                    type: NodeInfoType.function,
                    data: functionDescriptor
                }
            }))
        }))
            .value();
    }
}
RxDataDictionaryUtils.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataDictionaryUtils, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDataDictionaryUtils.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataDictionaryUtils, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataDictionaryUtils, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxGlobalEventsService {
    constructor() {
        this.viewActionsCompleted$ = new Subject();
    }
}
RxGlobalEventsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGlobalEventsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxGlobalEventsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGlobalEventsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGlobalEventsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

const groupDataPageQuery = 'com.bmc.arsys.rx.application.group.datapage.GroupDataPageQuery';
class RxGroupDataPageService extends DataPage {
    constructor(injector) {
        super(injector, groupDataPageQuery);
        this.injector = injector;
    }
}
RxGroupDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGroupDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxGroupDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGroupDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGroupDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxHttpParameterCodec {
    encodeKey(key) {
        return encodeURIComponent(key);
    }
    encodeValue(value) {
        return encodeURIComponent(value);
    }
    decodeKey(key) {
        return decodeURIComponent(key);
    }
    decodeValue(value) {
        return decodeURIComponent(value);
    }
}

class RxHttpParamsInterceptor {
    intercept(request, next) {
        const params = new HttpParams({
            encoder: new RxHttpParameterCodec(),
            fromString: request.params.toString()
        });
        return next.handle(request.clone({ params }));
    }
}
RxHttpParamsInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpParamsInterceptor, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxHttpParamsInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpParamsInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpParamsInterceptor, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxHttpModule {
    static forRoot() {
        return {
            ngModule: RxHttpModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxHttpParamsInterceptor,
                    multi: true
                }
            ]
        };
    }
}
RxHttpModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxHttpModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpModule });
RxHttpModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpModule, decorators: [{
            type: NgModule
        }] });

class RxLicenseDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.license.datapage.LicenseDataPageQuery');
        this.injector = injector;
    }
}
RxLicenseDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLicenseDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxLicenseDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLicenseDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLicenseDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxHttpLogInterceptor {
    constructor(rxLogService, rxJsonParserService) {
        this.rxLogService = rxLogService;
        this.rxJsonParserService = rxJsonParserService;
    }
    intercept(request, next) {
        if (this.rxLogService.logCategories.length) {
            const headers = request.headers.set('log-retrieval', this.rxLogService.serverLogCategories);
            this.rxLogService.debug(`${request.method} ${this.getAbsoluteRequestUrl(request.urlWithParams)}`);
            return next.handle(request.clone({ headers })).pipe(tap((httpEvent) => {
                if (httpEvent instanceof HttpResponse) {
                    const serverLog = httpEvent.headers.get(RX_ERROR_HANDLING.arMessagesHeader);
                    if (serverLog) {
                        let serverLogMessages = this.rxJsonParserService.tryParseJson(serverLog, []);
                        serverLogMessages = filter$1(serverLogMessages, 'messageText');
                        forEach(serverLogMessages, (logData) => this.rxLogService.log(logData.messageText));
                    }
                }
            }), catchError((err) => {
                this.rxLogService.warning(`${request.method} ${this.getAbsoluteRequestUrl(request.urlWithParams)} ${err.status} (${err.statusText})`);
                return throwError(err);
            }));
        }
        else {
            return next.handle(request);
        }
    }
    getAbsoluteRequestUrl(url) {
        if (startsWith(url, '/')) {
            return `${location.origin}${url}`;
        }
        else {
            return url;
        }
    }
}
RxHttpLogInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpLogInterceptor, deps: [{ token: RxLogService }, { token: i2$2.RxJsonParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxHttpLogInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpLogInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpLogInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: RxLogService }, { type: i2$2.RxJsonParserService }]; } });

const allowedCategories = Object.values(LogCategory);
class RxConsoleLogger {
    constructor(rxLogService) {
        this.rxLogService = rxLogService;
    }
    setCategories(categories) {
        if (!isArray(categories) || !every(categories, (category) => allowedCategories.includes(category))) {
            const validCategories = allowedCategories.map((category) => `'${category}'`).join(', ');
            throw new Error(`Invalid category specified. Valid categories: [${validCategories}].`);
        }
        else {
            this.rxLogService.configure(categories);
        }
    }
    getCategories() {
        return this.rxLogService.logCategories;
    }
    disable() {
        this.rxLogService.configure([]);
    }
}

class RxLoggingModule {
    constructor(rxLogService) {
        defaults(window, { rx: {} });
        window['rx'].logger = new RxConsoleLogger(rxLogService);
    }
    static forRoot() {
        return {
            ngModule: RxLoggingModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxHttpLogInterceptor,
                    multi: true
                }
            ]
        };
    }
}
RxLoggingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoggingModule, deps: [{ token: RxLogService }], target: i0.ɵɵFactoryTarget.NgModule });
RxLoggingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoggingModule, imports: [CommonModule] });
RxLoggingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoggingModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoggingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule]
                }]
        }], ctorParameters: function () { return [{ type: RxLogService }]; } });

class RxNotificationComponent {
    constructor(rxNotificationService, rxSessionService, translateService, changeDetector, adaptMessageService) {
        this.rxNotificationService = rxNotificationService;
        this.rxSessionService = rxSessionService;
        this.translateService = translateService;
        this.changeDetector = changeDetector;
        this.adaptMessageService = adaptMessageService;
    }
    ngOnInit() {
        this.rxNotificationService.messages$.subscribe((notificationMessage) => {
            const issueData = Object.assign(Object.assign({}, notificationMessage.data), { severity: notificationMessage.severity });
            const link = issueData.enableIssueReporting && this.rxSessionService.isAlive()
                ? this.translateService.instant('com.bmc.arsys.rx.client.issue-reporter.report-issue.label')
                : null;
            this.adaptMessageService.add(Object.assign(Object.assign({}, notificationMessage), { link, linkHandler: () => {
                    this.rxNotificationService.reportIssue(issueData);
                } }));
            this.changeDetector.detectChanges();
        });
    }
}
RxNotificationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationComponent, deps: [{ token: RxNotificationService }, { token: RxSessionService }, { token: i2.TranslateService }, { token: i0.ChangeDetectorRef }, { token: i4.AdaptMessageService }], target: i0.ɵɵFactoryTarget.Component });
RxNotificationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxNotificationComponent, selector: "rx-notification", ngImport: i0, template: "<adapt-toast placement=\"top-right\"></adapt-toast>\n", styles: ["adapt-toast{word-break:break-word}:host::ng-deep .a-toast__detail{white-space:pre-wrap}\n"], components: [{ type: i4.AdaptToastComponent, selector: "adapt-toast", inputs: ["link", "appendToBody", "aria-label", "aria-labelledby", "tabindex", "testID", "id", "placement", "adaptRadarDisableEventSending"], outputs: ["linkClick", "onAnimationEnd"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-notification',
                    templateUrl: './notification.component.html',
                    styleUrls: ['./notification.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: RxNotificationService }, { type: RxSessionService }, { type: i2.TranslateService }, { type: i0.ChangeDetectorRef }, { type: i4.AdaptMessageService }]; } });

class RxNotificationModule {
    constructor(rxNotificationService) {
        this.rxNotificationService = rxNotificationService;
        this.rxNotificationService.initialize();
    }
}
RxNotificationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationModule, deps: [{ token: RxNotificationService }], target: i0.ɵɵFactoryTarget.NgModule });
RxNotificationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationModule, declarations: [RxNotificationComponent], imports: [AdaptToastModule, CommonModule, TranslateModule], exports: [RxNotificationComponent] });
RxNotificationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationModule, imports: [[AdaptToastModule, CommonModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AdaptToastModule, CommonModule, TranslateModule],
                    declarations: [RxNotificationComponent],
                    exports: [RxNotificationComponent]
                }]
        }], ctorParameters: function () { return [{ type: RxNotificationService }]; } });

class RxCustomizationStatusPipe {
    constructor(translateService) {
        this.translateService = translateService;
    }
    transform(value) {
        switch (value) {
            case RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup:
                return this.translateService.instant('com.bmc.arsys.rx.innovation-studio.customization-status.created-in-this-overlay-group.label');
            case RX_OVERLAY.customizationPerspective.customizedInThisOverlayGroup:
                return this.translateService.instant('com.bmc.arsys.rx.innovation-studio.customization-status.customized-in-this-overlay-group.label');
            case RX_OVERLAY.customizationPerspective.notCustomizedInThisOverlayGroup:
                return this.translateService.instant('com.bmc.arsys.rx.innovation-studio.customization-status.not-customized-in-this-overlay-group.label');
            default:
                return '';
        }
    }
}
RxCustomizationStatusPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomizationStatusPipe, deps: [{ token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
RxCustomizationStatusPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomizationStatusPipe, name: "rxCustomizationStatus" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomizationStatusPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxCustomizationStatus'
                }]
        }], ctorParameters: function () { return [{ type: i2.TranslateService }]; } });

class RxOverlayRequestsInterceptor {
    constructor(rxOverlayService) {
        this.rxOverlayService = rxOverlayService;
    }
    intercept(request, next) {
        const currentOverlayContext = this.rxOverlayService.getCurrentOverlayContext();
        if ((currentOverlayContext === null || currentOverlayContext === void 0 ? void 0 : currentOverlayContext.overlayGroupId) && !request.headers.get('request-overlay-group')) {
            request = request.clone({
                headers: request.headers.set('request-overlay-group', currentOverlayContext.overlayGroupId)
            });
        }
        return next.handle(request);
    }
}
RxOverlayRequestsInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayRequestsInterceptor, deps: [{ token: RxOverlayService }], target: i0.ɵɵFactoryTarget.Injectable });
RxOverlayRequestsInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayRequestsInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayRequestsInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: RxOverlayService }]; } });

class RxOverlayModule {
    static forRoot() {
        return {
            ngModule: RxOverlayModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxOverlayRequestsInterceptor,
                    multi: true
                }
            ]
        };
    }
}
RxOverlayModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxOverlayModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayModule, declarations: [RxCustomizationStatusPipe], imports: [CommonModule], exports: [RxCustomizationStatusPipe] });
RxOverlayModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [RxCustomizationStatusPipe],
                    exports: [RxCustomizationStatusPipe]
                }]
        }] });

const publicPermissionType = 'Public';
const viewComponents = {
    menuItem: 'rx-shell-menu-item',
    menuGroup: 'rx-shell-menu-group'
};
const RX_PERMISSION = {
    instancesWithPermissions: [
        'record',
        'field',
        'process',
        'config',
        'runtimeconfig',
        'view',
        'externalconfig',
        viewComponents.menuItem,
        viewComponents.menuGroup
    ],
    editorContexts: {
        view: 'view',
        field: 'field',
        record: 'record',
        process: 'process'
    },
    haveOverlayLogic: ['record', 'field'],
    permissionType: {
        role: 'role',
        group: 'group',
        securityLabel: 'securityLabel'
    },
    administratorGroup: 'Administrator',
    fieldPermissions: {
        view: 'VIEW',
        change: 'CHANGE'
    },
    permissionDialogMetadata: {
        field: {
            headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.field',
            actions: [
                {
                    value: 'VIEW',
                    label: 'com.bmc.arsys.rx.client.permission-editor.column.view.label'
                },
                {
                    value: 'CHANGE',
                    label: 'com.bmc.arsys.rx.client.permission-editor.column.change.label'
                }
            ],
            uniqueAction: true,
            filterPermissionGroupIDs: [1, 2, 5, 7, 8, 9] // these are admin group ids, that cannot be restricted in access. Therefore should be filtered
        },
        record: {
            headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.record',
            actions: [],
            defaultPermittedAction: 'VISIBLE',
            uniqueAction: true,
            filterPermissionGroupIDs: [1, 2, 5, 7, 8, 9] // these are admin group ids, that cannot be restricted in access. Therefore should be filtered
        },
        config: {
            headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.config',
            actions: [
                {
                    value: 'VIEW',
                    label: 'com.bmc.arsys.rx.client.permission-editor.column.view.label'
                },
                {
                    value: 'CHANGE',
                    label: 'com.bmc.arsys.rx.client.permission-editor.column.change.label'
                }
            ],
            uniqueAction: true
        },
        externalconfig: {
            headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.config',
            actions: [],
            defaultPermittedAction: 'VIEW',
            uniqueAction: true
        },
        runtimeconfig: {
            headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.config',
            actions: [],
            defaultPermittedAction: 'VISIBLE',
            uniqueAction: true
        },
        process: {
            headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.process',
            actions: [
                {
                    value: 'EXECUTE',
                    label: 'com.bmc.arsys.rx.client.permission-editor.column.execute.label'
                },
                {
                    value: 'READ',
                    label: 'com.bmc.arsys.rx.client.permission-editor.column.read.label'
                }
            ],
            uniqueAction: true
        },
        view: {
            actions: [],
            defaultPermittedAction: 'VISIBLE',
            uniqueAction: true
        },
        viewComponent: {
            actions: [],
            defaultPermission: {
                value: 0,
                name: publicPermissionType,
                type: 'GROUP'
            },
            defaultPermittedAction: 'VISIBLE',
            uniqueAction: true
        }
    },
    publicPermissionType: publicPermissionType,
    viewComponents: viewComponents,
    viewComponentsContext: 'viewComponent',
    permissionScope: {
        all: 'all'
    },
    groupCategoryFieldId: 120,
    groupIdFieldId: 106,
    restrictedGroupCategoryForNonFieldPermissions: {
        dynamic: 1
    },
    restrictedGroupIdForNonFieldPermissions: {
        subAdministratorGroup: 5
    }
};

class RxBooleanPipe {
    constructor(translateService) {
        this.translateService = translateService;
    }
    transform(value, trueValueParam, falseValueParam) {
        const trueValueTranslation = this.translateService.instant('com.bmc.arsys.rx.client.common.true');
        const falseValueTranslation = this.translateService.instant('com.bmc.arsys.rx.client.common.false');
        let outputValue = value;
        switch (value) {
            case '1':
            case true:
            case 1: {
                outputValue = trueValueParam || trueValueTranslation;
                break;
            }
            case '0':
            case false:
            case 0: {
                outputValue = falseValueParam || falseValueTranslation;
                break;
            }
        }
        return outputValue;
    }
}
RxBooleanPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanPipe, deps: [{ token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
RxBooleanPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanPipe, name: "rxBoolean" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxBoolean'
                }]
        }], ctorParameters: function () { return [{ type: i2.TranslateService }]; } });

class RxPipesModule {
}
RxPipesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxPipesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPipesModule, declarations: [RxBooleanPipe], exports: [RxBooleanPipe] });
RxPipesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPipesModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPipesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxBooleanPipe],
                    exports: [RxBooleanPipe]
                }]
        }] });

class RxPreviousStateService {
    constructor(router, rxGlobalCacheService) {
        this.router = router;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.currentUrl = this.router.url;
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.url;
            }
        });
    }
    goToPrevState() {
        if (this.previousUrl &&
            this.previousUrl !== this.currentUrl &&
            this.previousUrl !== `${this.rxGlobalCacheService.applicationId}/login`) {
            this.router.navigateByUrl(this.previousUrl);
        }
        else {
            this.router.navigate([this.rxGlobalCacheService.applicationId]);
        }
    }
}
RxPreviousStateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPreviousStateService, deps: [{ token: i3.Router }, { token: RxGlobalCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxPreviousStateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPreviousStateService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPreviousStateService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i3.Router }, { type: RxGlobalCacheService }]; } });

const roleDataPageQuery = 'com.bmc.arsys.rx.application.role.datapage.RoleDataPageQuery';
class RxRoleDataPageService extends DataPage {
    constructor(injector) {
        super(injector, roleDataPageQuery);
        this.injector = injector;
    }
}
RxRoleDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRoleDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxRoleDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRoleDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRoleDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxAuthInterceptor {
    constructor(rxAuthService) {
        this.rxAuthService = rxAuthService;
    }
    intercept(req, next) {
        return next.handle(req).pipe(catchError((err) => {
            if (err.status === 401) {
                this.rxAuthService.redirectToLoginPage();
            }
            return throwError(err);
        }));
    }
}
RxAuthInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthInterceptor, deps: [{ token: RxAuthService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAuthInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: RxAuthService }]; } });

class RxAuthGuard {
    constructor(router, rxAuthService, rxSessionService, rxCurrentUserService, rxGlobalCacheService) {
        this.router = router;
        this.rxAuthService = rxAuthService;
        this.rxSessionService = rxSessionService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxGlobalCacheService = rxGlobalCacheService;
    }
    canActivate(next, state) {
        return this.rxSessionService.initSession().pipe(map(() => {
            const applicationId = head(next.url).path;
            if (applicationId === RX_APPLICATION.innovationStudioBundleId &&
                !(this.rxCurrentUserService.isAdministrator() || this.rxCurrentUserService.isBusinessAnalyst())) {
                this.rxGlobalCacheService.applicationId = RX_APPLICATION.innovationStudioBundleId;
                return this.router.parseUrl('access-denied');
            }
            return true;
        }), catchError((error) => {
            if (error.headers.get('sso-provider-type') === RX_SESSION.ssoProviderTypes.rsso) {
                this.router.navigate(['unsupported-environment']);
                return EMPTY;
            }
            this.rxAuthService.redirectToLoginPage();
            return EMPTY;
        }));
    }
}
RxAuthGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthGuard, deps: [{ token: i3.Router }, { token: RxAuthService }, { token: RxSessionService }, { token: RxCurrentUserService }, { token: RxGlobalCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAuthGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i3.Router }, { type: RxAuthService }, { type: RxSessionService }, { type: RxCurrentUserService }, { type: RxGlobalCacheService }]; } });

class RxAuthModule {
    static forRoot() {
        return {
            ngModule: RxAuthModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxAuthInterceptor,
                    multi: true
                }
            ]
        };
    }
}
RxAuthModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxAuthModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthModule, imports: [CommonModule] });
RxAuthModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule]
                }]
        }] });

class RxSessionExpirationInterceptor {
    constructor(rxSessionExpirationService) {
        this.rxSessionExpirationService = rxSessionExpirationService;
    }
    intercept(request, next) {
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse) {
                const responseDate = new Date(event.headers.get('date'));
                if (!this.lastResponseDate || responseDate >= this.lastResponseDate) {
                    this.lastResponseDate = responseDate;
                    const idleTimeout = event.headers.get(RX_SESSION.expirationHeaders.idle);
                    const absoluteTimeout = event.headers.get(RX_SESSION.expirationHeaders.absolute);
                    this.rxSessionExpirationService.setTimeout(SessionExpirationType.Idle, idleTimeout);
                    this.rxSessionExpirationService.setTimeout(SessionExpirationType.Absolute, absoluteTimeout);
                }
            }
        }));
    }
}
RxSessionExpirationInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationInterceptor, deps: [{ token: RxSessionExpirationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxSessionExpirationInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: RxSessionExpirationService }]; } });

class RxSessionExpirationModule {
    static forRoot() {
        return {
            ngModule: RxSessionExpirationModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxSessionExpirationInterceptor,
                    multi: true
                }
            ]
        };
    }
}
RxSessionExpirationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxSessionExpirationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationModule, declarations: [RxSessionExpirationComponent], imports: [CommonModule, TranslateModule, AdaptButtonModule], exports: [RxSessionExpirationComponent] });
RxSessionExpirationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationModule, imports: [[CommonModule, TranslateModule, AdaptButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxSessionExpirationComponent],
                    entryComponents: [RxSessionExpirationComponent],
                    exports: [RxSessionExpirationComponent],
                    imports: [CommonModule, TranslateModule, AdaptButtonModule]
                }]
        }] });

class RxServerActionService {
    constructor(injector) {
        this.injector = injector;
        this.rxDesignerCacheService = this.injector.get(RxDesignerCacheService);
        this.rxStringService = this.injector.get(RxStringService);
        this.translateService = this.injector.get(TranslateService);
    }
    getActionTypeByName(actionTypeName) {
        return this.rxDesignerCacheService.getActionTypeByNameSync(actionTypeName);
    }
    // TODO-VS: update types
    getClassConfig(options) {
        const model = this.getModelFromDefinition({
            actionTypeName: options.actionTypeName
        });
        return {
            content: model.name,
            elementModel: model,
            icon: model.isDeprecated ? 'info' : null,
            position: options.position,
            type: model.type
        };
    }
    // TODO-VS: update availableCells type
    validateInputMap(model, availableCells) {
        return of([]);
    }
    // TODO-VS: update availableCells type
    validateServerAction(model, availableCells) {
        return this.validateInputMap(model, availableCells).pipe(map((inputMapValidationIssues) => {
            const validationIssues = [...inputMapValidationIssues];
            if (this.rxStringService.isEmptySafe(model.name)) {
                validationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.label.label')
                    }),
                    data: {
                        guid: model.guid,
                        inspectorTabIndex: 1
                    }
                });
            }
            model.outputMap.forEach((output, index) => {
                if (this.rxStringService.isEmptySafe(output.assignTarget)) {
                    validationIssues.push({
                        type: ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.output-map.message', {
                            errorMessage: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                                propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.assignment-expression.target.label')
                            })
                        }),
                        data: {
                            fieldName: 'assignTarget',
                            guid: model.guid,
                            index,
                            inspectorTabIndex: 1,
                            propertyName: 'outputMap'
                        }
                    });
                }
                if (this.rxStringService.isEmptySafe(output.expression)) {
                    validationIssues.push({
                        type: ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.output-map.message', {
                            errorMessage: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                                propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.assignment-expression.source.label')
                            })
                        }),
                        data: {
                            fieldName: 'expression',
                            guid: model.guid,
                            index,
                            inspectorTabIndex: 1,
                            propertyName: 'outputMap'
                        }
                    });
                }
            });
            return validationIssues;
        }));
    }
}
RxServerActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerActionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxServerActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

function RxServerActionMixin(Base) {
    return class RxServerAction extends Base {
        // TODO-VS: add types after rappid update
        initialize(config) {
            // @ts-ignore
            super.initialize(config);
            this.setDataDictionaryBranch();
            // TODO-VS: add types after rappid update
            // @ts-ignore
            this.on('change:elementModel', (element, elementModel, changedProperty) => {
                if (startWith(changedProperty.propertyPath, 'elementModel/inputMap')) {
                    const inputMapPropertyPath = last(changedProperty.propertyPath.split('/'));
                    let inputMapPropertyValue = changedProperty.propertyValue;
                    const isCommandManagerOperation = has(changedProperty, 'commandManager');
                    if (isCommandManagerOperation) {
                        inputMapPropertyValue = elementModel.inputMap[inputMapPropertyPath];
                    }
                    this.setDataDictionaryBranch();
                    this.onInputMapChanged(element, elementModel.inputMap, inputMapPropertyPath, inputMapPropertyValue, isCommandManagerOperation);
                }
            });
        }
        clearOutputMap() {
            // @ts-ignore
            this.prop('elementModel/outputMap', [], {
                rxSilent: true,
                rewrite: true
            });
        }
        getElementService(type) {
            return null;
        }
        getInputMap() {
            // @ts-ignore
            return clone(this.prop('elementModel/inputMap')) || {};
        }
        // TODO-VS: add types after rappid update
        onInputMapChanged(element, inputMap, inputMapPropertyPath, inputMapPropertyValue, isCommandManagerOperation) { }
        setDataDictionaryBranch() {
            // @ts-ignore
            const elementService = this.getElementService(this.prop('type'));
            elementService.setCommonDataDictionaryBranch(
            // @ts-ignore
            this.prop('elementModel/guid'), 
            // @ts-ignore
            elementService.buildDataDictionaryBranch(this.prop('elementModel')));
        }
        setInputMap(inputMap, options) {
            // use 'rewrite' option to prevent the default 'merge' behavior
            // @ts-ignore
            this.prop('elementModel/inputMap', inputMap, {
                rxSilent: true,
                rewrite: true,
                silent: get(options, 'isSilent', false)
            });
        }
    };
}

function RxServerActionViewMixin(Base) {
    return class RxServerActionView extends Base {
        className() {
            const originalClassName = joint.shapes.bpmn.ActivityView.prototype.className.apply(this, arguments);
            // append actionTypeName to element's class to help QA find elements in the DOM
            // @ts-ignore
            return `${originalClassName} ${this.model.get('elementModel').actionTypeName}`;
        }
    };
}

class RxServerActionExpressionConfigurator extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.dataDictionaryService = this.getDataDictionaryService();
        this.commonDataDictionary$ = this.dataDictionaryService.commonDataDictionary$;
        this.configureForProperty({
            propertyPath: /inputMap\/.*/,
            dataDictionary$: this.getInputMapDataDictionary(),
            validateExpression: (propertyPath, expression) => this.validateInputMapExpression(propertyPath, expression),
            operators: this.getOperatorRowsByGroup(ExpressionOperatorGroup.Math)
        });
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { dataDictionary$: this.commonDataDictionary$, operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.AllClient) });
    }
    getInputMapDataDictionary() {
        return this.commonDataDictionary$;
    }
    validateInputMapExpression(propertyPath, expression) {
        return of(true);
    }
}

class RxSmartReportingService {
    constructor(httpClient, rxJsonParserService, rxServerErrorHandlerService) {
        this.httpClient = httpClient;
        this.rxJsonParserService = rxJsonParserService;
        this.rxServerErrorHandlerService = rxServerErrorHandlerService;
        this.smartReportingUrl$ = this._getSmartReportingUrl().pipe(catchError((error) => {
            this.rxServerErrorHandlerService.handle(error);
            return of('');
        }), shareReplay(1));
    }
    // We have to open a blank tab and then or change its url or close it.
    // Sadly there is no other way around it (even forcing a click on a button for example).
    // https://tech.europace.de/how-to-open-async-calls-in-a-new-tab-instead-of-new-window-within-an-angularjs-app/
    openSmartReporting(target = '_blank', queryParams = {}) {
        const smartReportingPopup = window.open('', target);
        return this._getSmartReportingUrl(queryParams).pipe(map((smartReportingUrl) => {
            smartReportingPopup.location.href = smartReportingUrl;
            return true;
        }), catchError((errorResponse) => {
            smartReportingPopup.close();
            if (errorResponse.error === '[]') {
                return of(false);
            }
            throw errorResponse;
        }));
    }
    getSmartReportingUrl() {
        return this.smartReportingUrl$;
    }
    _getSmartReportingUrl(queryParams = {}) {
        return this.httpClient
            .get('/api/rx/application/smartreporting/url', {
            responseType: 'text',
            params: queryParams
        })
            .pipe(map((url) => decodeURIComponent(url)));
    }
}
RxSmartReportingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSmartReportingService, deps: [{ token: i1.HttpClient }, { token: i2$2.RxJsonParserService }, { token: RxServerErrorHandlerService }], target: i0.ɵɵFactoryTarget.Injectable });
RxSmartReportingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSmartReportingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSmartReportingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2$2.RxJsonParserService }, { type: RxServerErrorHandlerService }]; } });

const TITLE_SEPARATOR = ' - ';
class RxPageTitleService {
    constructor(title, rxBundleCacheService, rxGlobalCacheService, rxLogService) {
        this.title = title;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxLogService = rxLogService;
    }
    set(title, bundleId) {
        let currentPageTitle = '';
        if (Array.isArray(title)) {
            currentPageTitle = title
                .reduce((result, part) => {
                if (isString(part) && (part = part.trim())) {
                    result.push(part);
                }
                return result;
            }, [])
                .join(TITLE_SEPARATOR);
        }
        else if (isString(title)) {
            currentPageTitle = title.trim();
        }
        else if (!isUndefined(title)) {
            this.rxLogService.warning('Invalid page title: ' + title);
        }
        const currentBundleId = bundleId || this.rxBundleCacheService.bundleId;
        if (bundleId !== '' && currentBundleId) {
            this.rxGlobalCacheService
                .getBundleDisplayName(currentBundleId)
                .pipe(take(1))
                .subscribe((bundleDisplayName) => {
                this.title.setTitle([currentPageTitle, bundleDisplayName].filter(Boolean).join(TITLE_SEPARATOR));
            });
        }
        else {
            this.title.setTitle(currentPageTitle);
        }
    }
}
RxPageTitleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPageTitleService, deps: [{ token: i1$1.Title }, { token: RxBundleCacheService }, { token: RxGlobalCacheService }, { token: RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxPageTitleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPageTitleService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPageTitleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.Title }, { type: RxBundleCacheService }, { type: RxGlobalCacheService }, { type: RxLogService }]; } });

class Tooltip {
    constructor(tooltipText) {
        this.iconName = 'question_circle_o';
        this.placement = 'auto';
        this.popoverMode = true;
        // default taken from AdaptRxLabelTooltipComponent
        this.maxWidth = 250;
        this.content = tooltipText;
    }
}

const RX_USER_PREFERENCES = {
    componentName: 'UI Preferences',
    fieldPreferences: 'preferences'
};

class RxUserPreferencesService {
    constructor(httpClient, rxJsonParserService) {
        this.httpClient = httpClient;
        this.rxJsonParserService = rxJsonParserService;
        this.settingsByComponentId = new Map();
        this.apiUrl = '/api/rx/application/admin-settings/user-preference/UI Preferences';
    }
    getUiComponentPreferences(guid) {
        return this.httpClient
            .get(this.apiUrl, {
            headers: new HttpHeaders({
                'default-bundle-scope': ''
            }),
            params: {
                componentId: guid
            }
        })
            .pipe(map(({ values }) => {
            this.settingsByComponentId.set(guid, values);
            const preferenceSetting = values.find((value) => value.settingName === RX_USER_PREFERENCES.fieldPreferences);
            const settingValue = preferenceSetting ? preferenceSetting.settingValue : null;
            return this.rxJsonParserService.tryParseJson(settingValue);
        }));
    }
    prepareUiPreferences(data, guid) {
        if (!isEmpty(this.settingsByComponentId.get(guid))) {
            return this.createUpdatedSettings(data, guid);
        }
        const newSettings = map$1(data, (value, name) => ({
            componentName: RX_USER_PREFERENCES.componentName,
            settingName: name,
            settingValue: value,
            assigneeGroupPermission: ''
        }));
        return newSettings;
    }
    setUiComponentPreferences(data, guid) {
        const settings = this.prepareUiPreferences(data, guid);
        const currentSettings = this.settingsByComponentId.get(guid);
        const id = get(currentSettings, '[0].ownerKeyValue1');
        const httpOptions = {
            headers: new HttpHeaders({
                'default-bundle-scope': ''
            })
        };
        return id
            ? this.httpClient.put(`${this.apiUrl}/${id}`, settings, httpOptions)
            : this.httpClient
                .post(this.apiUrl, settings, httpOptions)
                .pipe(tap(() => this.getUiComponentPreferences(data.componentId).subscribe()));
    }
    createUpdatedSettings(data, guid) {
        const newSettings = this.settingsByComponentId.get(guid);
        const preferenceSetting = newSettings.find((element) => element.settingName === RX_USER_PREFERENCES.fieldPreferences);
        const index = newSettings.indexOf(preferenceSetting);
        preferenceSetting.settingValue = data.preferences;
        newSettings[index] = preferenceSetting;
        return newSettings;
    }
}
RxUserPreferencesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesService, deps: [{ token: i1.HttpClient }, { token: i2$2.RxJsonParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxUserPreferencesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2$2.RxJsonParserService }]; } });

class RxWhatfixConfiguratorService {
    constructor(document, rendererFactory, httpClient, rxCurrentUserService, rxLogService, rxGlobalCacheService) {
        this.document = document;
        this.rendererFactory = rendererFactory;
        this.httpClient = httpClient;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxLogService = rxLogService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.isConfigured = false;
        this.renderer = this.rendererFactory.createRenderer(null, null);
        this.defaultConfig$ = combineLatest([
            this.rxGlobalCacheService.getApplicationBundleDescriptor(),
            this.rxCurrentUserService.user$
        ]).pipe(take(1), map(([bundleDescriptor, user]) => {
            const logCategories = this.rxLogService.logCategories;
            return {
                application: {
                    id: this.rxGlobalCacheService.applicationId,
                    version: bundleDescriptor.version
                },
                environment: {
                    isDebug: includes(logCategories, LogCategory.All) || includes(logCategories, LogCategory.Cli)
                },
                user: {
                    id: user.userId,
                    isBusinessAnalyst: this.rxCurrentUserService.isBusinessAnalyst(),
                    isAdministrator: this.rxCurrentUserService.isAdministrator()
                }
            };
        }), shareReplay(1));
        this.isEnabled$ = this.httpClient.get(`${RX_ADMINISTRATION.systemConfigurationUrl}/Whatfix-Disabled`).pipe(map((result) => result.value === 0), shareReplay(1));
    }
    setConfig(accountId, config) {
        if (isEmpty(accountId)) {
            throw new Error('Invalid Whatfix account ID.');
        }
        this.isEnabled$
            .pipe(filter((isEnabled) => Boolean(isEnabled) && !this.isConfigured), tap((isEnabled) => {
            this.rxLogService.debug(isEnabled ? `Whatfix is enabled. Account ID: ${accountId}.` : 'Whatfix is disabled.');
        }), switchMapTo(config ? of(config) : this.defaultConfig$))
            .subscribe((whatfixConfig) => {
            this.isConfigured = true;
            defaults(window, { rx: {} });
            // this global variable will be used by whatfix integration script loaded below
            window['rx'].whatfixConfig = whatfixConfig;
            const url = `//cdn.whatfix.com/prod/${accountId}/embed/embed.nocache.js`;
            this.rxLogService.debug(`Loading whatfix integration script from ${url}.`);
            this.loadScript(url);
        });
    }
    getDefaultConfig() {
        return this.isEnabled$.pipe(filter(Boolean), switchMapTo(this.defaultConfig$));
    }
    loadScript(url) {
        const scriptElement = assign(this.renderer.createElement('script'), {
            type: 'text/javascript',
            async: true,
            src: url
        });
        this.renderer.appendChild(this.document.head, scriptElement);
    }
}
RxWhatfixConfiguratorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWhatfixConfiguratorService, deps: [{ token: DOCUMENT }, { token: i0.RendererFactory2 }, { token: i1.HttpClient }, { token: RxCurrentUserService }, { token: RxLogService }, { token: RxGlobalCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxWhatfixConfiguratorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWhatfixConfiguratorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWhatfixConfiguratorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.RendererFactory2 }, { type: i1.HttpClient }, { type: RxCurrentUserService }, { type: RxLogService }, { type: RxGlobalCacheService }]; } });

class RxAdminComponentDataPageQuery extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.admin.datapage.AdminComponentDataPageQuery');
        this.injector = injector;
    }
}
RxAdminComponentDataPageQuery.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminComponentDataPageQuery, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxAdminComponentDataPageQuery.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminComponentDataPageQuery, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminComponentDataPageQuery, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { DataPage, DevelopmentMode, DynamicLocaleId, ExpressionOperator, ExpressionOperatorGroup, ExpressionOperatorRowsByGroup, ExpressionParserToken, FormBuilderEvent, JustificationRequirement, LocalizedStringsLoaderFactory, LogCategory, MachineLearningProviderNames, NodeInfoType, NotificationType, OverlayType, RX_ADMINISTRATION, RX_APPLICATION, RX_BUILD_ENVIRONMENT, RX_BUNDLE, RX_CHATBOT, RX_DATA_PAGE, RX_DEFAULT_NOTIFICATION_SETTINGS, RX_DEFAULT_STRINGS, RX_DEFINITION, RX_DESIGNER, RX_DESIGNER_ELEMENT_SHAPE, RX_ENVIRONMENT, RX_ERROR_HANDLING, RX_LOG, RX_OVERLAY, RX_PERMISSION, RX_RESOURCE_URLS, RX_THEMING, RX_USER, RX_USER_PREFERENCES, RxActionTypeDataPageService, RxActionTypeUtilsService, RxAdminComponentDataPageQuery, RxAdminComponentDataPageService, RxAdminSettingsService, RxAngularApplicationService, RxApplicationConfiguratorService, RxApplicationInitializer, RxApplicationLoaderResolver, RxApplicationLoaderService, RxApplicationRegistryService, RxApplicationResolver, RxAuthGuard, RxAuthInterceptor, RxAuthModule, RxAuthService, RxBooleanPipe, RxBundleCacheService, RxBundleDataPageService, RxBundleService, RxCachingModule, RxChatbotDefinitionDataPageService, RxCommandFactoryService, RxCommandManagerService, RxComponentCanDeactivateGuard, RxCurrentUserService, RxCustomizationStatusPipe, RxDataDictionaryUtils, RxDataPageFactoryService, RxDefinitionAdapterRegistryService, RxDefinitionModule, RxDefinitionNamePipe, RxDefinitionNameService, RxDefinitionScopePipe, RxDefinitionService, RxDefinitionUpdateService, RxDesignerCacheService, RxDesignerStencilBuilder, RxErrorHandlerService, RxErrorHandlingModule, RxExpressionConfigurator, RxExpressionParserService, RxFeatureGuard, RxFeatureService, RxFunctionDataPageService, RxFunctionalRoleDataPageService, RxGlobalCacheService, RxGlobalEventsService, RxGroupDataPageService, RxHttpLogInterceptor, RxHttpModule, RxHttpResponseMessageInterceptor, RxKeepSessionAliveResolver, RxLicenseDataPageService, RxLiveAgentSettingsService, RxLocalizationModule, RxLocalizationService, RxLocalizedStringsLoaderService, RxLogService, RxLoggingModule, RxLoginLocalizationResolver, RxLoginPageGuard, RxMetadataService, RxNotificationComponent, RxNotificationModule, RxNotificationService, RxOverlayModule, RxOverlayService, RxPageTitleService, RxPipesModule, RxPreviousStateService, RxRequestInterceptor, RxRoleDataPageService, RxRootInjector, RxRssoDebugService, RxServerActionExpressionConfigurator, RxServerActionMixin, RxServerActionService, RxServerActionViewMixin, RxServerErrorHandlerService, RxSessionExpirationComponent, RxSessionExpirationInterceptor, RxSessionExpirationModule, RxSessionExpirationService, RxSessionService, RxSmartReportingService, RxSystemConfigurationService, RxThemeResolver, RxThemingService, RxUpgradeTrackerService, RxUserPreferencesService, RxUserService, RxValidApplicationGuard, RxWhatfixConfiguratorService, ShellRouteReuseStrategy, Tooltip };
//# sourceMappingURL=helix-platform-shared-api.js.map
