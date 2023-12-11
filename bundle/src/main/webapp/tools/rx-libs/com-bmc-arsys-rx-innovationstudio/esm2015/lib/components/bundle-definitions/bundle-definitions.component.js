import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RxBundleCacheService, RxGlobalCacheService, RxOverlayService, RxPageTitleService } from '@helix/platform/shared/api';
import { findIndex } from 'lodash';
import { map, pluck, take, tap } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../bundle-details/bundle-details.constant';
import { BundleDefinitionTab } from '../bundle-details/bundle-details.types';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "../record-definition-tab/record-definition-tab.component";
import * as i6 from "../view-definition-tab/view-definition-tab.component";
import * as i7 from "../process-definition-tab/process-definition-tab.component";
import * as i8 from "../rule-definition-tab/rule-definition-tab.component";
import * as i9 from "../association-definition-tab/association-definition-tab.component";
import * as i10 from "../named-list-definition-tab/named-list-definition-tab.component";
import * as i11 from "../document-definition-tab/document-definition-tab.component";
import * as i12 from "../web-api-definition-tab/web-api-definition-tab.component";
import * as i13 from "../event-definition-tab/event-definition-tab.component";
import * as i14 from "../event-statistics-definition-tab/event-statistics-definition-tab.component";
import * as i15 from "../chatbot-definition-tab/chatbot-definition-tab.component";
import * as i16 from "../configuration-definition-tab/configuration-definition-tab.component";
import * as i17 from "@angular/common";
export class BundleDefinitionsComponent {
    constructor(activatedRoute, rxBundleCacheService, rxGlobalCacheService, rxOverlayService, rxPageTitleService, translateService, router) {
        this.activatedRoute = activatedRoute;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxOverlayService = rxOverlayService;
        this.rxPageTitleService = rxPageTitleService;
        this.translateService = translateService;
        this.router = router;
        this.tabs = AX_BUNDLE_DETAILS.tabs.map((tab) => (Object.assign(Object.assign({}, tab), { isVisited: false })));
        this.bundleDescriptor$ = this.rxBundleCacheService.getCurrentBundleDescriptor();
        this.activeTabIndex$ = this.activatedRoute.params.pipe(pluck('tab'), map((tabId) => findIndex(AX_BUNDLE_DETAILS.tabs, { id: tabId })), tap((index) => {
            if (index === -1) {
                this.router.navigate([BundleDefinitionTab.Records], { relativeTo: this.activatedRoute.parent });
            }
            else {
                this.tabs[index].isVisited = true;
                this.setPageTitle(AX_BUNDLE_DETAILS.tabs[index].titleKey);
            }
        }));
    }
    onTabChanged(tabChangeEvent) {
        const nextActiveTab = AX_BUNDLE_DETAILS.tabs[tabChangeEvent.index];
        this.router.navigate([nextActiveTab.id], { relativeTo: this.activatedRoute.parent });
    }
    setPageTitle(titleKey) {
        this.rxGlobalCacheService
            .getBundleFriendlyName(this.rxBundleCacheService.bundleId)
            .pipe(take(1))
            .subscribe((bundleFriendlyName) => {
            this.rxPageTitleService.set([this.translateService.instant(titleKey), bundleFriendlyName], this.rxGlobalCacheService.applicationId);
        });
    }
}
/** @nocollapse */ BundleDefinitionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDefinitionsComponent, deps: [{ token: i1.ActivatedRoute }, { token: i2.RxBundleCacheService }, { token: i2.RxGlobalCacheService }, { token: i2.RxOverlayService }, { token: i2.RxPageTitleService }, { token: i3.TranslateService }, { token: i1.Router }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ BundleDefinitionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: BundleDefinitionsComponent, selector: "ax-bundle-definitions", ngImport: i0, template: "<adapt-tabset\n  *ngIf=\"bundleDescriptor$ | async as bundleDescriptor\"\n  [tab-active]=\"activeTabIndex$ | async\"\n  [fullHeight]=\"true\"\n  (tab-active-changed)=\"onTabChanged($event)\"\n>\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[0].titleKey | translate\">\n    <ax-record-definition-tab\n      *ngIf=\"tabs[0].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-record-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[1].titleKey | translate\">\n    <ax-view-definition-tab *ngIf=\"tabs[1].isVisited\" [bundleDescriptor]=\"bundleDescriptor\"></ax-view-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[2].titleKey | translate\">\n    <ax-process-definition-tab\n      *ngIf=\"tabs[2].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-process-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[3].titleKey | translate\">\n    <ax-rule-definition-tab *ngIf=\"tabs[3].isVisited\" [bundleDescriptor]=\"bundleDescriptor\"></ax-rule-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[4].titleKey | translate\">\n    <ax-association-definition-tab\n      *ngIf=\"tabs[4].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-association-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[5].titleKey | translate\">\n    <ax-named-list-definition-tab\n      *ngIf=\"tabs[5].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-named-list-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[6].titleKey | translate\">\n    <ax-document-definition-tab\n      *ngIf=\"tabs[6].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-document-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[7].titleKey | translate\">\n    <ax-web-api-definition-tab\n      *ngIf=\"tabs[7].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-web-api-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[8].titleKey | translate\">\n    <ax-event-definition-tab *ngIf=\"tabs[8].isVisited\" [bundleDescriptor]=\"bundleDescriptor\"></ax-event-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[9].titleKey | translate\">\n    <ax-event-statistics-definition-tab\n      *ngIf=\"tabs[9].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-event-statistics-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[10].titleKey | translate\">\n    <ax-chatbot-definition-tab\n      *ngIf=\"tabs[10].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-chatbot-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[11].titleKey | translate\">\n    <ax-configuration-definition-tab *ngIf=\"tabs[11].isVisited\"></ax-configuration-definition-tab>\n  </adapt-tab-panel>\n</adapt-tabset>\n", styles: [":host{height:100%}:host ::ng-deep adapt-tabset .tab-content{padding:0}\n"], components: [{ type: i4.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i4.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i5.RecordDefinitionTabComponent, selector: "ax-record-definition-tab", inputs: ["bundleDescriptor"] }, { type: i6.ViewDefinitionTabComponent, selector: "ax-view-definition-tab", inputs: ["bundleDescriptor"] }, { type: i7.ProcessDefinitionTabComponent, selector: "ax-process-definition-tab", inputs: ["bundleDescriptor"] }, { type: i8.RuleDefinitionTabComponent, selector: "ax-rule-definition-tab", inputs: ["bundleDescriptor"] }, { type: i9.AssociationDefinitionTabComponent, selector: "ax-association-definition-tab", inputs: ["bundleDescriptor"] }, { type: i10.NamedListDefinitionTabComponent, selector: "ax-named-list-definition-tab", inputs: ["bundleDescriptor"] }, { type: i11.DocumentDefinitionTabComponent, selector: "ax-document-definition-tab", inputs: ["bundleDescriptor"] }, { type: i12.WebApiDefinitionTabComponent, selector: "ax-web-api-definition-tab", inputs: ["bundleDescriptor"] }, { type: i13.EventDefinitionTabComponent, selector: "ax-event-definition-tab", inputs: ["bundleDescriptor"] }, { type: i14.EventStatisticsDefinitionTabComponent, selector: "ax-event-statistics-definition-tab", inputs: ["bundleDescriptor"] }, { type: i15.ChatbotDefinitionTabComponent, selector: "ax-chatbot-definition-tab", inputs: ["bundleDescriptor"] }, { type: i16.ConfigurationDefinitionTabComponent, selector: "ax-configuration-definition-tab" }], directives: [{ type: i17.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i17.AsyncPipe, "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDefinitionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-bundle-definitions',
                    templateUrl: './bundle-definitions.component.html',
                    styleUrls: ['./bundle-definitions.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }, { type: i2.RxBundleCacheService }, { type: i2.RxGlobalCacheService }, { type: i2.RxOverlayService }, { type: i2.RxPageTitleService }, { type: i3.TranslateService }, { type: i1.Router }]; } });
//# sourceMappingURL=bundle-definitions.component.js.map