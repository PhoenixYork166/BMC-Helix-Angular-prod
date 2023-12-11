import { Injectable, Injector, Renderer2 } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AdaptTranslateService } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceService } from '@helix/platform/record/api';
import { RX_APPLICATION, RX_USER, RxAngularApplicationService, RxAuthService, RxComponentCanDeactivateGuard, RxCurrentUserService, RxFeatureService, RxGlobalCacheService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { filter as _filter, find, get, includes, isBoolean, isEmpty, lowerCase, noop, remove, sortBy } from 'lodash';
import { combineLatest, forkJoin, from, merge, NEVER, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, defaultIfEmpty, filter, map, shareReplay, skip, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { RxGainsightConfiguratorService } from './gainsight/gainsight-configurator.service';
import { RX_USER_MESSAGE } from './user-messages/user-message.constants';
import { RxUserMessageService } from './user-messages/user-message.service';
import * as i0 from "@angular/core";
export class ShellBase {
    constructor(injector) {
        this.injector = injector;
        this.isShellInitialized = false;
        this.currentMenuItemId = null;
        this.translateService = this.injector.get(TranslateService);
        this.flattenedMenuItems = [];
        this.rxComponentCanDeactivateGuard = this.injector.get(RxComponentCanDeactivateGuard);
        this.rxUserMessageService = this.injector.get(RxUserMessageService);
        this.rxAuthService = this.injector.get(RxAuthService);
        this.rxCurrentUserService = this.injector.get(RxCurrentUserService);
        this.rxRecordInstanceService = this.injector.get(RxRecordInstanceService);
        this.rxGlobalCacheService = this.injector.get(RxGlobalCacheService);
        this.rxAngularApplicationService = this.injector.get(RxAngularApplicationService);
        this.rxSystemConfigurationService = this.injector.get(RxSystemConfigurationService);
        this.rxFeatureService = this.injector.get(RxFeatureService);
        this.adaptTranslateService = this.injector.get(AdaptTranslateService);
        this.rxGainsightConfiguratorService = this.injector.get(RxGainsightConfiguratorService);
        this.router = this.injector.get(Router);
        this.applicationDescriptor$ = this.rxGlobalCacheService.getApplicationBundleDescriptor();
        this.destroyed$ = new ReplaySubject(1);
        this.navigationEnd$ = this.router.events.pipe(filter((event) => event instanceof NavigationEnd), filter((event) => event.url !== '/unknown-application'));
        this.closeBannerSubject = new Subject();
        this.hasBanner$ = merge(this.rxGainsightConfiguratorService.gainsightInitConfiguration$.pipe(filter((gainsightConfiguration) => Boolean(gainsightConfiguration)), map((gainsightConfiguration) => gainsightConfiguration.displayBanner), defaultIfEmpty(false)), this.closeBannerSubject.pipe(map((value) => !value))).pipe(shareReplay(1));
        this.translations = this.adaptTranslateService.getCurrentLanguage();
        this.alertText = this.translations['adapt.agreement.navigation.alertText'];
        this.alertLinkText = this.translations['adapt.agreement.navigation.alertLinkText'];
        this.shellConfig$ = this.getShellConfig();
        this.applicationSwitcherActionItems$ = combineLatest([
            this.applicationDescriptor$,
            this.rxGlobalCacheService.getBundleDescriptors(),
            this.shellConfig$,
            this.rxSystemConfigurationService.queryConfiguration(['Helix-Portal-URL']).pipe(map((value) => get(value, '[0].value')), catchError(() => of(null)))
        ]).pipe(take(1), switchMap(([currentBundleDescriptor, bundleDescriptors, shellConfig, helixPortalUrl]) => {
            if (shellConfig.allowAppSwitching) {
                const applicationList = _filter(bundleDescriptors, { isApplication: true, isLicensed: true });
                this.bundleDescriptors = bundleDescriptors;
                this.helixPortalUrl = helixPortalUrl;
                remove(applicationList, currentBundleDescriptor);
                remove(applicationList, { id: RX_APPLICATION.settingsBundleId });
                if (!this.rxCurrentUserService.isAdministrator()) {
                    remove(applicationList, { id: RX_APPLICATION.dataloadBundleId });
                }
                if (!this.rxCurrentUserService.isAdministrator() && !this.rxCurrentUserService.isBusinessAnalyst()) {
                    remove(applicationList, { id: RX_APPLICATION.innovationStudioBundleId });
                }
                remove(applicationList, { showInAppLauncher: false });
                const optedInApplications = applicationList.map((app) => this.rxAngularApplicationService.isAngularJsApplication(app.id).pipe(map((isAngularJsApplication) => ({
                    id: app.id,
                    friendlyName: app.localizedDisplayName || app.friendlyName,
                    isAngularJsApplication
                }))));
                return forkJoin(optedInApplications);
            }
            else {
                return of([]);
            }
        }), map((applicationList) => {
            if (includes(['Fixed', 'Floating', 'Bundled'], this.rxCurrentUserService.get().licenseType) &&
                this.helixPortalUrl) {
                applicationList.push({
                    friendlyName: this.translateService.instant('com.bmc.arsys.rx.client.shell.application-launcher.bmc-helix-dashboard.label'),
                    url: `${this.helixPortalUrl}/dashboards`
                });
            }
            if (applicationList.length) {
                return {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.shell.application-launcher.label'),
                    tooltip: this.translateService.instant('com.bmc.arsys.rx.client.shell.application-launcher.label'),
                    className: 'd-icon-tiles',
                    switcher: {
                        allItems: {
                            items: sortBy(applicationList
                                .filter((app) => app.id !== this.rxGlobalCacheService.applicationId)
                                .map((app) => {
                                return {
                                    name: app.friendlyName,
                                    action: this.launchApplication.bind(this, app.id, app.isAngularJsApplication, app.url)
                                };
                            }), (application) => lowerCase(application.name))
                        },
                        recentItems: {}
                    }
                };
            }
            else {
                return {};
            }
        }));
        this.showUserMessagesAction = {
            name: this.translateService.instant(RX_USER_MESSAGE.title),
            tooltip: this.translateService.instant(RX_USER_MESSAGE.title),
            count: 0,
            action: noop,
            className: 'd-icon-bell_o'
        };
        this.administrationSettingsAction = {
            name: this.translateService.instant('com.bmc.arsys.rx.client.common.settings.label'),
            tooltip: this.translateService.instant('com.bmc.arsys.rx.client.common.settings.label'),
            route: `/${this.rxGlobalCacheService.applicationId}/settings`,
            className: 'd-icon-gear'
        };
        this.brandingInfo$ = this.applicationDescriptor$.pipe(map((applicationDescriptor) => ({
            logoClass: 'logo-helix',
            productName: applicationDescriptor.localizedDisplayName || applicationDescriptor.friendlyName,
            hideMobileLogo: false,
            switcher: {
                filter: {
                    placeholder: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label')
                }
            }
        })));
        this.navigationEnd$.pipe(skip(1), takeUntil(this.destroyed$)).subscribe({
            next: () => {
                this.highlightMenuItem(this.getActiveNavigationMenuItem());
            },
            complete: () => {
                this.rxUserMessageService.cancelMessagePolling();
            }
        });
        // ADAPT dropdowns listen to the click events and close themselves when the event is fired.
        // When user clicks inside an iframe though, the event is not propagated to the main window and the
        // dropdowns remain open.
        // Here we simulate the click on the document of the main window to close the dropdowns.
        this.removeWindowBlurListener = injector.get(Renderer2).listen('window', 'blur', () => {
            document.body.click();
        });
    }
    ngOnInit() {
        this.showUserMessagesAction.popover = this.userMessagesPopover;
        this.rxUserMessageService.messageCount$.subscribe((messageCount) => {
            this.showUserMessagesAction.count = messageCount;
        });
        this.navigationMenuItems$ = this.getNavigationMenuItems().pipe(tap(() => {
            // We perform a setTimeout according to Adapt documentation.
            // Else on smaller screens the menus might be displayed horizontally
            // in the shell rather than vertically for smaller screens.
            // https://github.bmc.com/pages/bmc-ux/adapt-angular/#/components/navigation
            setTimeout(() => {
                this.adaptNavigation.checkForHamburger();
                this.isShellInitialized = true;
                const activeNavigationMenuItem = this.getActiveNavigationMenuItem();
                this.highlightMenuItem(activeNavigationMenuItem);
            });
        }));
        this.navigationActionItems$ = combineLatest([
            this.shellConfig$,
            this.getNavigationActionItems(),
            this.applicationSwitcherActionItems$
        ]).pipe(map(([shellConfig, navigationActionItems, applicationSwitcherActionItems]) => [
            ...navigationActionItems,
            this.showUserMessagesAction,
            ...(shellConfig.administrationSettingsState ? [this.administrationSettingsAction] : []),
            applicationSwitcherActionItems
        ]), takeUntil(this.destroyed$));
        const isGainsightFeatureEnabled = this.rxFeatureService.isFeatureEnabled('DRD21-11744');
        this.userProfileMenu$ = combineLatest([this.rxGainsightConfiguratorService.gainsightInitConfiguration$, this.getUserMenuItems()]).pipe(tap(([gainsightConfig, userMenuItems]) => {
            const analyticsMenuItem = find(userMenuItems, { id: 0 });
            if (analyticsMenuItem) {
                const shouldHideAnalyticsMenuItem = !isGainsightFeatureEnabled ||
                    !gainsightConfig.settings.enableGainsight ||
                    isEmpty(gainsightConfig.productTag);
                analyticsMenuItem.hide = shouldHideAnalyticsMenuItem;
            }
        }), map(([gainsightConfig, userMenuItems]) => {
            const currentUser = this.rxCurrentUserService.get();
            const userAvatarUrl = currentUser.personInstanceId
                ? this.rxRecordInstanceService.getAttachmentDownloadUrl(RX_USER.userProfileRecordDefinitionName, RX_USER.userProfilePictureFieldId, currentUser.personInstanceId)
                : '';
            return {
                desc: this.translateService.instant('com.bmc.arsys.rx.client.shell.user-profile.signedin.label'),
                userName: currentUser.fullName,
                image: userAvatarUrl,
                typeLong: true,
                inverted: false,
                signOut: {
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.sign-out.label'),
                    action: this.logout.bind(this)
                },
                menu: userMenuItems
            };
        }));
        this.router.events.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
            var _a;
            switch (true) {
                case event instanceof NavigationStart: {
                    this.busySubscription = NEVER.subscribe();
                    break;
                }
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    (_a = this.busySubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }
    highlightMenuItem(menuItem) {
        if (menuItem) {
            this.currentMenuItemId = menuItem.id;
            this.adaptNavigation.selectMenuItem(this.currentMenuItemId);
        }
        else {
            const lastMenuItem = this.adaptNavigation.searchTree(this.adaptNavigation.menuModel, this.currentMenuItemId);
            if (lastMenuItem) {
                lastMenuItem.active = false;
                if (lastMenuItem.parent) {
                    lastMenuItem.parent.active = false;
                }
            }
            this.currentMenuItemId = null;
            this.adaptNavigation.currentActiveId = null;
        }
    }
    logout() {
        let canDeactivate = this.rxComponentCanDeactivateGuard.canDeactivate();
        if (isBoolean(canDeactivate)) {
            canDeactivate = of(canDeactivate);
        }
        from(canDeactivate)
            .pipe(filter(Boolean), tap(() => {
            this.rxComponentCanDeactivateGuard.disable();
        }), switchMap(() => this.rxAuthService.logout()))
            .subscribe();
    }
    launchApplication(bundleId, isAngularJsApplication, portalUrl) {
        let url;
        if (portalUrl) {
            url = portalUrl;
        }
        else {
            const application = find(this.bundleDescriptors, { id: bundleId });
            if (application.hasCustomEntryPoint && application.id !== RX_APPLICATION.innovationStudioBundleId) {
                url = `/${bundleId}/index.html`;
            }
            else if (isAngularJsApplication) {
                url = `/innovationsuite/index.html#/${bundleId}`;
            }
            else {
                url = `/helix/index.html#/${bundleId}`;
            }
        }
        window.open(url);
    }
    closeBanner() {
        this.closeBannerSubject.next(true);
    }
    ngOnDestroy() {
        this.removeWindowBlurListener();
        this.rxUserMessageService.cancelMessagePolling();
        this.closeBannerSubject.complete();
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
ShellBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ShellBase, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
ShellBase.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ShellBase });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ShellBase, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=shell-base.class.js.map