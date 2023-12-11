import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { AdaptDockedPanelService, AdaptModalService, AdaptNavigationComponent } from '@bmc-ux/adapt-angular';
import { DevelopmentMode, RX_APPLICATION, RX_OVERLAY, RxOverlayService, RxPreviousStateService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { includes } from 'lodash';
import { noop, of } from 'rxjs';
import { DevelopmentModeSelectorComponent } from './development-mode-selector/development-mode-selector.component';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import { ShellBase } from './shell-base.class';
import { GainsightOptInComponent } from './gainsight/gainsight-opt-in/gainsight-opt-in.component';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "./user-messages/user-messages.component";
import * as i5 from "@angular/common";
import * as i6 from "@angular/router";
export class RxInnovationStudioShellComponent extends ShellBase {
    constructor(injector, adaptDockedPanelService, adaptModalService, rxSystemConfigurationService, rxOverlayService, rxPreviousStateService, rxModalService) {
        super(injector);
        this.injector = injector;
        this.adaptDockedPanelService = adaptDockedPanelService;
        this.adaptModalService = adaptModalService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.rxOverlayService = rxOverlayService;
        this.rxPreviousStateService = rxPreviousStateService;
        this.rxModalService = rxModalService;
        this.flattenedMenuItems = [
            {
                name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.page.label'),
                id: 0,
                action: () => {
                    this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'workspace']);
                }
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.administration.label'),
                id: 1,
                action: () => {
                    this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'settings']);
                }
            }
        ];
        this.npsSurveyBaseUrl = 'NPS-Survey-Base-URL';
        this.currentOverlayContext = this.rxOverlayService.getCurrentOverlayContext();
    }
    getActiveNavigationMenuItem() {
        const url = this.router.url;
        if (includes(url, `${RX_APPLICATION.innovationStudioBundleId}/workspace`)) {
            return this.flattenedMenuItems[0];
        }
        else if (includes(url, `${RX_APPLICATION.innovationStudioBundleId}/settings`)) {
            return this.flattenedMenuItems[1];
        }
    }
    getUserMenuItems() {
        const userMenu = [];
        const currentOverlayContext = this.rxOverlayService.getCurrentOverlayContext();
        if (this.isEligibleForFeedback()) {
            userMenu.push({
                name: this.translateService.instant('com.bmc.arsys.rx.client.shell.provide-feedback.label'),
                className: 'd-icon-heart',
                id: 1,
                action: () => {
                    this.openFeedback();
                }
            });
        }
        if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
            userMenu.push({
                name: this.translateService.instant('com.bmc.arsys.rx.client.shell.analytics.label'),
                id: 0,
                className: 'd-icon-app_chart_bar',
                action: () => {
                    this.openGainsightPreferences();
                }
            });
        }
        return of(userMenu);
    }
    isEligibleForFeedback() {
        return (this.currentOverlayContext.overlayGroupId !== RX_OVERLAY.overlayGroupIds.base &&
            !this.currentOverlayContext.isShared);
    }
    openFeedback() {
        let bundleDescriptorVersion;
        this.applicationDescriptor$.subscribe((applicationDescriptor) => {
            bundleDescriptorVersion = applicationDescriptor.version;
        });
        this.rxSystemConfigurationService.getConfiguration(this.npsSurveyBaseUrl).subscribe((feedbackUrl) => {
            this.adaptDockedPanelService.open({
                title: this.translateService.instant('com.bmc.arsys.rx.client.shell.provide-feedback.label'),
                content: FeedbackDialogComponent,
                size: 'md',
                data: { feedbackUrl, bundleDescriptorVersion }
            });
        });
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
    getNavigationMenuItems() {
        return of(this.flattenedMenuItems);
    }
    getNavigationActionItems() {
        const currentDevelopmentMode = this.rxOverlayService.getDevelopmentMode();
        return of([
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.shell.development-mode.title'),
                className: 'd-icon-field_custom',
                tooltip: this.translateService.instant(currentDevelopmentMode === DevelopmentMode.Base
                    ? 'com.bmc.arsys.rx.client.shell.development-mode.base.tooltip'
                    : 'com.bmc.arsys.rx.client.shell.development-mode.best-practice.tooltip'),
                action: () => {
                    this.adaptModalService
                        .open({
                        title: this.translateService.instant('com.bmc.arsys.rx.client.shell.development-mode.title'),
                        content: DevelopmentModeSelectorComponent,
                        size: 'sm',
                        data: { developmentMode: currentDevelopmentMode }
                    })
                        .then((developmentMode) => {
                        this.rxOverlayService.setDevelopmentMode(developmentMode);
                        this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'workspace']).then(() => {
                            window.location.reload();
                        });
                    }, () => { });
                }
            }
        ]);
    }
    getShellConfig() {
        return of({ allowAppSwitching: true });
    }
}
RxInnovationStudioShellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxInnovationStudioShellComponent, deps: [{ token: i0.Injector }, { token: i1.AdaptDockedPanelService }, { token: i1.AdaptModalService }, { token: i2.RxSystemConfigurationService }, { token: i2.RxOverlayService }, { token: i2.RxPreviousStateService }, { token: i3.RxModalService }], target: i0.ɵɵFactoryTarget.Component });
RxInnovationStudioShellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxInnovationStudioShellComponent, selector: "rx-innovation-studio-shell", viewQueries: [{ propertyName: "adaptNavigation", first: true, predicate: ["adaptNavigation"], descendants: true, static: true }, { propertyName: "userMessagesPopover", first: true, predicate: ["userMessagesPopover"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<ng-template #userMessagesPopover>\n  <rx-user-messages></rx-user-messages>\n</ng-template>\n\n<adapt-navigation\n  #adaptNavigation\n  [class.invisible]=\"!isShellInitialized\"\n  [metadata]=\"brandingInfo$ | async\"\n  [menu]=\"(navigationMenuItems$ | async) || []\"\n  [actions]=\"navigationActionItems$ | async\"\n  [profile]=\"userProfileMenu$ | async\"\n></adapt-navigation>\n\n<adapt-alert\n  *ngIf=\"hasBanner$ | async\"\n  [config]=\"{\n    title: 'Note:',\n    type: 'page',\n    variant: 'info',\n    content: ''\n  }\"\n  (onClose)=\"closeBanner()\"\n>\n  <span class=\"alert-content\">\n    <span>\n      {{ alertText }}\n    </span>\n\n    <a href=\"#\" class=\"alert-link\" (click)=\"openGainsightPreferences(); $event.preventDefault()\">\n      {{ alertLinkText }}\n    </a>\n  </span>\n</adapt-alert>\n\n<div [class.invisible]=\"!isShellInitialized\" class=\"busy-indicator position-relative\">\n  <rx-busy-indicator\n    [options]=\"{\n      busy: busySubscription,\n      loaderType: 'lineLoader',\n      delay: 250,\n      backdrop: false,\n      message: null\n    }\"\n  >\n  </rx-busy-indicator>\n</div>\n\n<div\n  [class.invisible]=\"!isShellInitialized\"\n  class=\"outlet-content\"\n  [ngClass]=\"{\n    'has-banner': hasBanner$ | async\n  }\"\n>\n  <router-outlet></router-outlet>\n</div>\n", styles: [":host{height:100%}.outlet-content{height:calc(100% - 52px)}.has-banner{height:calc(100% - 96px)}.busy-indicator{bottom:2px}.busy-indicator ::ng-deep .ng-busy{z-index:1}\n"], components: [{ type: i4.RxUserMessagesComponent, selector: "rx-user-messages" }, { type: i1.AdaptNavigationComponent, selector: "adapt-navigation", inputs: ["menu", "metadata", "config", "kebabView", "gapWidth", "container", "actions", "profile", "customProfile", "appSwitcherEnabled", "appSwitcherMetaData", "theme", "checkForHamburger", "selectMenuItem", "closeHamburger"], outputs: ["alertClosed"] }, { type: i1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i3.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i6.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate"], exportAs: ["outlet"] }], pipes: { "async": i5.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxInnovationStudioShellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-innovation-studio-shell',
                    templateUrl: './shell.component.html',
                    styleUrls: ['./shell.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.AdaptDockedPanelService }, { type: i1.AdaptModalService }, { type: i2.RxSystemConfigurationService }, { type: i2.RxOverlayService }, { type: i2.RxPreviousStateService }, { type: i3.RxModalService }]; }, propDecorators: { adaptNavigation: [{
                type: ViewChild,
                args: ['adaptNavigation', { static: true }]
            }], userMessagesPopover: [{
                type: ViewChild,
                args: ['userMessagesPopover', { static: true }]
            }] } });
//# sourceMappingURL=innovation-studio-shell.component.js.map