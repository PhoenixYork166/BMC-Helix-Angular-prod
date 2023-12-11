import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdaptModalService, AdaptNavigationComponent, AdaptNavigationService } from '@bmc-ux/adapt-angular';
import { RxNotificationService, RxSmartReportingService, RxUpgradeTrackerService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RX_SHELL, RX_VIEW_ACTION, RxShellService, RxViewActionService } from '@helix/platform/view/api';
import { find, noop } from 'lodash';
import { Subscription } from 'rxjs';
import { map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { RxUserPreferencesComponent } from '../user-preferences/user-preferences.component';
import { ShellBase } from './shell-base.class';
import { RxUserAvailabilityComponent } from '../user-availability/user-availability.component';
import { GainsightOptInComponent } from './gainsight/gainsight-opt-in/gainsight-opt-in.component';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/router";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@helix/platform/view/api";
import * as i6 from "./user-messages/user-messages.component";
import * as i7 from "@angular/common";
export class RxShellComponent extends ShellBase {
    constructor(adaptModalService, route, rxModalService, rxNotificationService, rxShellService, rxSmartReportingService, rxUpgradeTrackerService, rxViewActionService, injector, adaptNavigationService) {
        super(injector);
        this.adaptModalService = adaptModalService;
        this.route = route;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.rxShellService = rxShellService;
        this.rxSmartReportingService = rxSmartReportingService;
        this.rxUpgradeTrackerService = rxUpgradeTrackerService;
        this.rxViewActionService = rxViewActionService;
        this.injector = injector;
        this.adaptNavigationService = adaptNavigationService;
        this.subscriptions = new Subscription();
        this.rxShellService.resetMenuItemCount();
    }
    ngOnInit() {
        super.ngOnInit();
        this.subscriptions.add(this.rxShellService.navigateToSmartReporting$
            .pipe(switchMap(() => this.rxSmartReportingService.openSmartReporting()))
            .subscribe((isSmartReportingConfigured) => {
            if (!isSmartReportingConfigured) {
                this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.shell.smart-reporting-not-configured'));
            }
        }));
        this.subscriptions.add(this.rxShellService.navigateToView$.subscribe((menuItem) => this.openView(menuItem)));
        this.subscriptions.add(this.rxShellService.openUserPreferences$.subscribe(() => this.openUserPreferences()));
        this.subscriptions.add(this.rxShellService.openGainsightPreferences$.subscribe(() => this.openGainsightPreferences()));
        this.subscriptions.add(this.rxShellService.openUserAvailability$.subscribe(() => this.openUserAvailability()));
    }
    onNavigationCanceled() {
        if (this.currentMenuItemId !== null) {
            this.adaptNavigation.selectMenuItem(this.currentMenuItemId);
        }
    }
    openView(menuItem) {
        this.rxViewActionService
            .execute(RX_VIEW_ACTION.viewActionNames.openView, menuItem.openViewParams)
            .pipe(take(1))
            .subscribe({
            error: () => {
                this.onNavigationCanceled();
            }
        });
    }
    openUserPreferences() {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.shell.my-preferences.label'),
            content: RxUserPreferencesComponent,
            size: 'sm'
        })
            .then(() => {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.shell.user-preferences-dialog.signout.confirmation.message')
            })
                .then((isLogoutRequested) => {
                if (isLogoutRequested) {
                    this.logout();
                }
            });
        })
            .catch(noop);
    }
    openGainsightPreferences() {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.shell.analytics.label'),
            content: GainsightOptInComponent,
            size: 'sm'
        })
            .catch(noop);
    }
    openUserAvailability() {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.shell.my-availability.label'),
            content: RxUserAvailabilityComponent,
            size: 'sm'
        })
            .catch(noop);
    }
    getNavigationActionItems() {
        return this.shellConfig$.pipe(map((shellConfig) => {
            const actions = [];
            shellConfig.navigationActions.forEach((item) => {
                actions.push({
                    action: item.action,
                    className: item.className,
                    name: item.name,
                    tooltip: item.name,
                    hide: item.hide
                });
            });
            if (!shellConfig.globalSearchDisabled) {
                actions.push({
                    name: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label'),
                    tooltip: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label'),
                    className: 'd-icon-search',
                    route: `/${this.rxGlobalCacheService.applicationId}/search`
                });
            }
            const showUpgradeTrackerAction = {
                action: () => {
                    this.rxUpgradeTrackerService.displayUpgradeNotification(true);
                },
                className: 'd-icon-clock_alert',
                hide: !this.rxUpgradeTrackerService.isUpgradeInProgress,
                name: ''
            };
            this.subscriptions.add(this.rxUpgradeTrackerService.isUpgradeInProgress$.subscribe(() => {
                showUpgradeTrackerAction.hide = !this.rxUpgradeTrackerService.isUpgradeInProgress;
            }));
            actions.push(showUpgradeTrackerAction);
            return actions;
        }));
    }
    getActiveNavigationMenuItem() {
        return find(this.flattenedMenuItems, (menuItem) => menuItem.hide !== true &&
            menuItem.type === RX_SHELL.actions.navigateToView &&
            decodeURIComponent(`/${this.rxGlobalCacheService.applicationId}/view/${menuItem.viewUrl}`) ===
                decodeURIComponent(this.router.url));
    }
    getNavigationMenuItems() {
        return this.shellConfig$.pipe(map((shellConfig) => shellConfig.navigationBarItems));
    }
    getUserMenuItems() {
        return this.shellConfig$.pipe(map((shellConfig) => shellConfig.userMenu.subMenu));
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.subscriptions.unsubscribe();
    }
    getShellConfig() {
        return this.applicationDescriptor$.pipe(switchMap((currentBundleDescriptor) => this.rxShellService.getShellConfig(currentBundleDescriptor.id)), tap((shellConfig) => {
            this.flattenedMenuItems = shellConfig.flattenedMenuItems;
        }), shareReplay(1));
    }
}
RxShellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellComponent, deps: [{ token: i1.AdaptModalService }, { token: i2.ActivatedRoute }, { token: i3.RxModalService }, { token: i4.RxNotificationService }, { token: i5.RxShellService }, { token: i4.RxSmartReportingService }, { token: i4.RxUpgradeTrackerService }, { token: i5.RxViewActionService }, { token: i0.Injector }, { token: i1.AdaptNavigationService }], target: i0.ɵɵFactoryTarget.Component });
RxShellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellComponent, selector: "rx-shell", viewQueries: [{ propertyName: "adaptNavigation", first: true, predicate: ["adaptNavigation"], descendants: true, static: true }, { propertyName: "userMessagesPopover", first: true, predicate: ["userMessagesPopover"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<ng-template #userMessagesPopover>\n  <rx-user-messages></rx-user-messages>\n</ng-template>\n\n<adapt-navigation\n  #adaptNavigation\n  [class.invisible]=\"!isShellInitialized\"\n  [metadata]=\"brandingInfo$ | async\"\n  [menu]=\"(navigationMenuItems$ | async) || []\"\n  [actions]=\"navigationActionItems$ | async\"\n  [profile]=\"userProfileMenu$ | async\"\n></adapt-navigation>\n\n<adapt-alert\n  *ngIf=\"hasBanner$ | async\"\n  [config]=\"{\n    title: 'Note:',\n    type: 'page',\n    variant: 'info',\n    content: ''\n  }\"\n  (onClose)=\"closeBanner()\"\n>\n  <span class=\"alert-content\">\n    <span>\n      {{ alertText }}\n    </span>\n\n    <a href=\"#\" class=\"alert-link\" (click)=\"openGainsightPreferences(); $event.preventDefault()\">\n      {{ alertLinkText }}\n    </a>\n  </span>\n</adapt-alert>\n\n<div [class.invisible]=\"!isShellInitialized\" class=\"busy-indicator position-relative\">\n  <rx-busy-indicator\n    [options]=\"{\n      busy: busySubscription,\n      loaderType: 'lineLoader',\n      delay: 250,\n      backdrop: false,\n      message: null\n    }\"\n  >\n  </rx-busy-indicator>\n</div>\n\n<div\n  [class.invisible]=\"!isShellInitialized\"\n  class=\"outlet-content\"\n  [ngClass]=\"{\n    'has-banner': hasBanner$ | async\n  }\"\n>\n  <router-outlet></router-outlet>\n</div>\n", styles: [":host{height:100%}.outlet-content{height:calc(100% - 52px)}.has-banner{height:calc(100% - 96px)}.busy-indicator{bottom:2px}.busy-indicator ::ng-deep .ng-busy{z-index:1}\n"], components: [{ type: i6.RxUserMessagesComponent, selector: "rx-user-messages" }, { type: i1.AdaptNavigationComponent, selector: "adapt-navigation", inputs: ["menu", "metadata", "config", "kebabView", "gapWidth", "container", "actions", "profile", "customProfile", "appSwitcherEnabled", "appSwitcherMetaData", "theme", "checkForHamburger", "selectMenuItem", "closeHamburger"], outputs: ["alertClosed"] }, { type: i1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i3.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate"], exportAs: ["outlet"] }], pipes: { "async": i7.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell',
                    templateUrl: './shell.component.html',
                    styleUrls: ['./shell.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptModalService }, { type: i2.ActivatedRoute }, { type: i3.RxModalService }, { type: i4.RxNotificationService }, { type: i5.RxShellService }, { type: i4.RxSmartReportingService }, { type: i4.RxUpgradeTrackerService }, { type: i5.RxViewActionService }, { type: i0.Injector }, { type: i1.AdaptNavigationService }]; }, propDecorators: { adaptNavigation: [{
                type: ViewChild,
                args: ['adaptNavigation', { static: true }]
            }], userMessagesPopover: [{
                type: ViewChild,
                args: ['userMessagesPopover', { static: true }]
            }] } });
//# sourceMappingURL=shell.component.js.map