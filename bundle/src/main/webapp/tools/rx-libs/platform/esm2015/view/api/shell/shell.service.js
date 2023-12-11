import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { find, forEach, get, has, isEmpty } from 'lodash';
import { of, ReplaySubject, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RX_APPLICATION, RxCurrentUserService, RxNotificationService, RxFeatureService } from '@helix/platform/shared/api';
import { RxJsonParserService, RxObjectUtilsService, RxUrlUtilsService } from '@helix/platform/utils';
import { RxExpressionEvaluatorService } from '../expressions/expression-evaluator.service';
import { RX_SHELL } from './shell.constant';
import { RxViewDefinitionCacheService } from '../services/view-definition-cache.service';
import { RxViewDefinitionParserService } from '../services/view-definition-parser.service';
import { RxOldViewLayoutAdapterService } from '../layout/old-view-layout-adapter.service';
import { RxViewLayout } from '../layout/view-layout.class';
import { RX_LEGACY_ICONS } from '../icons/icon.constant';
import { RX_VIEW_DEFINITION } from '../domain/view-definition.constant';
import { OpenViewActionLaunchBehavior, OpenViewActionType } from '../view-action/view-action.types';
import { RX_LAUNCH_BEHAVIOR } from '../view-action/common/launch-behavior.constant';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "../expressions/expression-evaluator.service";
import * as i4 from "@helix/platform/utils";
import * as i5 from "../services/view-definition-cache.service";
import * as i6 from "../services/view-definition-parser.service";
import * as i7 from "../layout/old-view-layout-adapter.service";
export class RxShellService {
    constructor(translateService, rxCurrentUserService, rxExpressionEvaluatorService, rxJsonParserService, rxNotificationService, rxObjectUtilsService, rxUrlUtilsService, rxViewDefinitionCacheService, rxViewDefinitionParserService, rxOldViewLayoutAdapterService, rxFeatureService) {
        this.translateService = translateService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxExpressionEvaluatorService = rxExpressionEvaluatorService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxNotificationService = rxNotificationService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.rxUrlUtilsService = rxUrlUtilsService;
        this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
        this.rxViewDefinitionParserService = rxViewDefinitionParserService;
        this.rxOldViewLayoutAdapterService = rxOldViewLayoutAdapterService;
        this.rxFeatureService = rxFeatureService;
        this.menuItemId = 0;
        this.navigateToSmartReportingSubject = new Subject();
        this.navigateToViewSubject = new Subject();
        this.openUserPreferencesSubject = new Subject();
        this.openUserAvailabilitySubject = new Subject();
        this.shellConfigSubject = new ReplaySubject(1);
        this.openGainsightPreferencesSubject = new Subject();
        this.navigateToSmartReporting$ = this.navigateToSmartReportingSubject.asObservable();
        this.navigateToView$ = this.navigateToViewSubject.asObservable();
        this.openUserPreferences$ = this.openUserPreferencesSubject.asObservable();
        this.openUserAvailability$ = this.openUserAvailabilitySubject.asObservable();
        this.shellConfig$ = this.shellConfigSubject.asObservable();
        this.openGainsightPreferences$ = this.openGainsightPreferencesSubject.asObservable();
    }
    resetMenuItemCount() {
        this.menuItemId = 0;
    }
    updateMenuItemCount() {
        return this.menuItemId++;
    }
    getChildGuids(layout, outletName = RX_VIEW_DEFINITION.defaultOutletName) {
        return RxViewLayout.getViewLayoutChildGuids(layout, outletName);
    }
    getIconClass(icon, left = true) {
        const iconId = get(RX_LEGACY_ICONS, icon, icon);
        return iconId ? `d-icon-${left ? 'left-' : ''}` + iconId : '';
    }
    getShellConfig(bundleId) {
        const navigationBarItems = [];
        const flattenedMenuItems = [];
        const navigationActions = [];
        const preferenceMenuItem = {
            name: this.translateService.instant('com.bmc.arsys.rx.client.shell.my-preferences.label'),
            action: this.openUserPreferences.bind(this),
            className: 'd-icon-wrench_o',
            hide: false,
            subMenu: []
        };
        const gainsightPreferenceMenuItem = {
            name: this.translateService.instant('com.bmc.arsys.rx.client.shell.analytics.label'),
            action: this.openGainsightPreferences.bind(this),
            className: 'd-icon-app_chart_bar',
            hide: false,
            id: 0,
            subMenu: []
        };
        const myAvailabilityMenuItem = {
            name: this.translateService.instant('com.bmc.arsys.rx.client.shell.my-availability.label'),
            action: this.openUserAvailability.bind(this),
            hide: false,
            className: 'd-icon-user_clock_o',
            subMenu: []
        };
        let navBarProperties;
        let userMenu = null;
        this.currentUser = this.rxCurrentUserService.get();
        return this.rxViewDefinitionCacheService
            .getViewDefinition(`${bundleId}:${RX_APPLICATION.shellDefinitionName}`)
            .pipe(switchMap((shellDefinition) => {
            this.rxViewDefinitionParserService
                .getComponents(shellDefinition)
                .forEach((definition) => this.rxOldViewLayoutAdapterService.convertLayout(definition));
            if (shellDefinition && shellDefinition.componentDefinitions[0]) {
                const navBar = shellDefinition.componentDefinitions[0];
                const layout = this.rxJsonParserService.tryParseJson(navBar.layout);
                navBarProperties = navBar.propertiesByName || {
                    allowAppSwitching: null,
                    globalSearchUseDefault: null,
                    globalSearchDisabled: null,
                    globalSearchRecords: null,
                    globalSearchCustomSearchState: null
                };
                forEach(this.getChildGuids(layout), (guid) => {
                    const menuItemDefinition = find(navBar.componentDefinitions, {
                        guid
                    });
                    if (menuItemDefinition) {
                        let menuItem;
                        switch (menuItemDefinition.type) {
                            case RX_SHELL.navBar.menuGroup:
                            case RX_SHELL.navBar.userMenu:
                                const subMenu = [];
                                const childLayout = this.rxJsonParserService.tryParseJson(menuItemDefinition.layout) ||
                                    RxViewLayout.getViewLayoutForDefaultOutlet(menuItemDefinition.componentDefinitions.map((item) => item.guid));
                                forEach(this.getChildGuids(childLayout), (childGuid) => {
                                    const subItemDefinition = find(menuItemDefinition.componentDefinitions, {
                                        guid: childGuid
                                    });
                                    if (subItemDefinition) {
                                        const subItem = this.getMenuProperties(subItemDefinition);
                                        if (!isEmpty(subItem)) {
                                            // concatenating className with listClassName, as listClassName not available for subMenu
                                            if (menuItemDefinition.type === RX_SHELL.navBar.userMenu) {
                                                subItem.className += ' ' + subItem.listClassName;
                                            }
                                            else {
                                                flattenedMenuItems.push(subItem);
                                            }
                                            subMenu.push(subItem);
                                        }
                                    }
                                });
                                if (subMenu.length > 0) {
                                    // LMA:: TODO:: Even if we set the className in a first level menu the icon is not displayed
                                    menuItem = {
                                        hide: has(menuItemDefinition.propertiesByName, 'hidden')
                                            ? this.rxJsonParserService.tryParseJson(menuItemDefinition.propertiesByName.hidden)
                                            : false,
                                        listClassName: get(menuItemDefinition.propertiesByName, 'styles'),
                                        className: this.getIconClass(get(menuItemDefinition.propertiesByName, 'menuItemIcon')),
                                        name: menuItemDefinition.propertiesByName.menuGroupName,
                                        subMenu: subMenu,
                                        id: this.updateMenuItemCount()
                                    };
                                }
                                break;
                            case RX_SHELL.navBar.menuItem:
                                menuItem = this.getMenuProperties(menuItemDefinition);
                                break;
                        }
                        if (!isEmpty(menuItem)) {
                            if (menuItemDefinition.type === RX_SHELL.navBar.userMenu) {
                                userMenu = menuItem;
                            }
                            else {
                                flattenedMenuItems.push(menuItem);
                                navigationBarItems.push(menuItem);
                            }
                        }
                    }
                });
                forEach(this.getChildGuids(layout, RX_SHELL.outlets.actions), (guid) => {
                    const menuItemDefinition = navBar.componentDefinitions.find((definition) => definition.guid === guid);
                    if (menuItemDefinition) {
                        navigationActions.push(this.getMenuProperties(menuItemDefinition));
                    }
                });
            }
            if (this.rxCurrentUserService.isSupportStaff()) {
                myAvailabilityMenuItem.id = this.updateMenuItemCount();
                if (!userMenu) {
                    userMenu = {
                        subMenu: []
                    };
                }
                userMenu.subMenu.push(myAvailabilityMenuItem);
            }
            if (this.currentUser.fullName) {
                preferenceMenuItem.id = this.updateMenuItemCount();
                if (!userMenu) {
                    userMenu = {
                        subMenu: []
                    };
                }
                userMenu.subMenu.push(preferenceMenuItem);
            }
            if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
                userMenu.subMenu.push(gainsightPreferenceMenuItem);
            }
            const rxData = {
                flattenedMenuItems,
                navigationBarItems,
                navigationActions,
                userMenu: userMenu || [],
                allowAppSwitching: has(navBarProperties, 'allowAppSwitching')
                    ? this.rxJsonParserService.tryParseJson(navBarProperties.allowAppSwitching)
                    : false,
                globalSearchUseDefault: has(navBarProperties, 'globalSearchUseDefault')
                    ? this.rxJsonParserService.tryParseJson(navBarProperties.globalSearchUseDefault)
                    : true,
                globalSearchCustomSearchState: navBarProperties.globalSearchCustomSearchState || '',
                globalSearchDisabled: has(navBarProperties, 'globalSearchDisabled')
                    ? this.rxJsonParserService.tryParseJson(navBarProperties.globalSearchDisabled)
                    : true,
                globalSearchRecords: has(navBarProperties, 'globalSearchRecords')
                    ? this.rxJsonParserService.tryParseJson(navBarProperties.globalSearchRecords)
                    : [],
                // LMA:: TODO:: Later... See:
                // standardlib/src/main/webapp/scripts/view-components/shell/shell-config.resource.js
                // ,
                // globalSearchState: rxSearchResultsState.get(),
                // administrationSettingsState: rxAdministrationSettingsState.get()
                globalSearchState: 'globalSearchState',
                administrationSettingsState: 'adminSettingsState'
            };
            // In case server already had previously saved shell config with global search not configured,
            // we want to disable global search by default
            if (!rxData.globalSearchDisabled &&
                ((rxData.globalSearchUseDefault && rxData.globalSearchRecords.length === 0) ||
                    (!rxData.globalSearchUseDefault && rxData.globalSearchCustomSearchState.length === 0))) {
                rxData.globalSearchDisabled = true;
            }
            this.shellConfigSubject.next(rxData);
            return of(rxData);
        }));
    }
    openUserPreferences() {
        this.openUserPreferencesSubject.next();
    }
    openGainsightPreferences() {
        this.openGainsightPreferencesSubject.next();
    }
    openUserAvailability() {
        this.openUserAvailabilitySubject.next();
    }
    navigateToView(viewParams) {
        this.navigateToViewSubject.next(viewParams);
    }
    navigateToState() {
        this.rxNotificationService.addWarningMessage('This feature is not supported.');
    }
    navigateToSmartReporting() {
        this.navigateToSmartReportingSubject.next();
    }
    getMenuProperties(itemDefinition) {
        const menuItem = {};
        const properties = this.rxObjectUtilsService.expandProperties(itemDefinition.propertiesByName);
        menuItem.type = properties.actionName;
        menuItem.id = this.updateMenuItemCount();
        menuItem.closeOnClick = true;
        switch (properties.actionName) {
            case RX_SHELL.actions.launchURL:
                menuItem.name = properties.menuItemName;
                menuItem.target =
                    RX_LAUNCH_BEHAVIOR[properties.launchBehavior || OpenViewActionLaunchBehavior.NewWindow].target;
                if (itemDefinition.type === RX_SHELL.navBar.action) {
                    menuItem.action = () => {
                        window.open(properties.url, menuItem.target);
                    };
                }
                else {
                    menuItem.link = properties.url;
                }
                break;
            case RX_SHELL.actions.navigateToView:
                const viewParams = properties.viewParams;
                forEach(viewParams, (expression, parameterName) => {
                    const paramValue = this.rxExpressionEvaluatorService.tryEvaluate(expression, {
                        keywords: {
                            userId: this.currentUser.userId,
                            personId: this.currentUser.personInstanceId
                        }
                    });
                    viewParams[parameterName] = paramValue;
                    return paramValue;
                });
                const url = this.rxUrlUtilsService.buildUrl(`${properties.viewDefinitionName}`, viewParams);
                menuItem.name = properties.menuItemName;
                menuItem.viewUrl = url;
                menuItem.action = this.navigateToView.bind(this, menuItem);
                menuItem.openViewParams = {
                    viewDefinitionName: properties.viewDefinitionName,
                    presentation: Object.assign({ type: OpenViewActionType.FullWidth, launchBehavior: OpenViewActionLaunchBehavior.SameWindow }, get(properties, 'presentation', {})),
                    viewParams
                };
                break;
            case RX_SHELL.actions.navigateToState:
                // LMA:: TODO:: Implement it later
                // if (!isRuntime || rxAuthorization.isStateAuthorized(properties.state)) {
                menuItem.name = properties.menuItemName;
                const stateParameters = {
                    state: properties.state,
                    menuItemId: menuItem.id
                };
                menuItem.stateParameters = stateParameters;
                menuItem.action = this.navigateToState.bind(this, stateParameters);
                break;
            case RX_SHELL.actions.navigateToSmartReporting:
                menuItem.name = properties.menuItemName;
                menuItem.action = this.navigateToSmartReporting.bind(this);
                break;
        }
        menuItem.hide = has(properties, 'hidden') ? this.rxJsonParserService.tryParseJson(properties.hidden) : false;
        menuItem.listClassName = properties.styles;
        menuItem.className = this.getIconClass(properties.menuItemIcon, itemDefinition.type !== RX_SHELL.navBar.action);
        return menuItem;
    }
}
RxShellService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellService, deps: [{ token: i1.TranslateService }, { token: i2.RxCurrentUserService }, { token: i3.RxExpressionEvaluatorService }, { token: i4.RxJsonParserService }, { token: i2.RxNotificationService }, { token: i4.RxObjectUtilsService }, { token: i4.RxUrlUtilsService }, { token: i5.RxViewDefinitionCacheService }, { token: i6.RxViewDefinitionParserService }, { token: i7.RxOldViewLayoutAdapterService }, { token: i2.RxFeatureService }], target: i0.ɵɵFactoryTarget.Injectable });
RxShellService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxCurrentUserService }, { type: i3.RxExpressionEvaluatorService }, { type: i4.RxJsonParserService }, { type: i2.RxNotificationService }, { type: i4.RxObjectUtilsService }, { type: i4.RxUrlUtilsService }, { type: i5.RxViewDefinitionCacheService }, { type: i6.RxViewDefinitionParserService }, { type: i7.RxOldViewLayoutAdapterService }, { type: i2.RxFeatureService }]; } });
//# sourceMappingURL=shell.service.js.map