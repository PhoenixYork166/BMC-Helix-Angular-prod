import * as i7 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, NgModule, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i5 from '@bmc-ux/adapt-angular';
import { AdaptCodeViewerModule, AdaptRxFormsModule, AdaptSidebarModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import * as i4 from '@helix/platform/shared/components';
import { CustomizationOptionsModule, RxDefinitionPickerModule, RxDesignerHeaderModule, RxRevertCustomizationModule } from '@helix/platform/shared/components';
import * as i1$1 from '@helix/platform/ui-kit';
import { ValidationIssueType, RxValidationIssuesModule } from '@helix/platform/ui-kit';
import * as i3 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, ReplaySubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { filter } from 'lodash';
import * as i1 from '@helix/platform/shared/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import * as i2 from '@helix/platform/web-api/api';
import * as i4$1 from '@angular/router';

class RxWebApiDesignerComponent {
    constructor(rxGlobalCacheService, rxBundleCacheService, rxWebApiDefinitionService, rxDefinitionNameService, translateService, rxOverlayService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxWebApiDefinitionService = rxWebApiDefinitionService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.translateService = translateService;
        this.rxOverlayService = rxOverlayService;
        this.webApiDefinitionSaved = new EventEmitter();
        this.webApiDefinitionErrorLoading = new EventEmitter();
        this.closeDesigner = new EventEmitter();
        this.isDesignMode = true;
        this.isExistingWebApi = false;
        this.isCustomizationEnabled = true;
        this.bundleFriendlyName$ = this.rxGlobalCacheService.getBundleFriendlyName(this.rxBundleCacheService.bundleId);
        this.validationIssues$ = new BehaviorSubject([]);
        this.hasValidationErrors$ = this.validationIssues$.pipe(map((validationIssues) => Boolean(filter(validationIssues, {
            issues: [{ type: ValidationIssueType.Error }]
        }).length)), distinctUntilChanged());
        this.webApiDefinition$ = new BehaviorSubject(null);
        this.isSavingInProgress$ = new BehaviorSubject(false);
        this.bundleId = this.rxBundleCacheService.bundleId;
        this.isBundleEditable = this.rxOverlayService.isBundleEditable(this.bundleId);
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        if (this.webApiDefinitionName) {
        }
        else {
        }
        this.breadcrumbItems$ = this.webApiDefinition$.pipe(map((webApiDefinition) => {
            const definitionName = this.rxDefinitionNameService.getDisplayName(webApiDefinition === null || webApiDefinition === void 0 ? void 0 : webApiDefinition.name);
            return [
                {
                    label: definitionName || `<${this.translateService.instant('com.bmc.arsys.rx.client.web-api-designer.new-web-api.label')}>`,
                    data: {}
                }
            ];
        }));
        this.isSaveButtonDisabled$ = combineLatest([
            this.validationIssues$,
            this.isSavingInProgress$
        ]).pipe(map(([[validationIssueSection], isSavingInProgress]) => Boolean(validationIssueSection === null || validationIssueSection === void 0 ? void 0 : validationIssueSection.issues) || !this.isBundleEditable || isSavingInProgress));
    }
    canDeactivate() {
        return true;
    }
    toggleDesignMode() {
        this.isDesignMode = !this.isDesignMode;
    }
    onCorrectIssue(validationIssue) {
    }
    validate(value) {
        const validationIssues = [];
        return validationIssues.length ? [{
                title: this.translateService.instant('com.bmc.arsys.rx.client.web-api-designer.new-web-api.label'),
                issues: validationIssues
            }] : [];
    }
    onRevertCustomization(event) {
    }
    saveDefinition() {
    }
}
RxWebApiDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerComponent, deps: [{ token: i1.RxGlobalCacheService }, { token: i1.RxBundleCacheService }, { token: i2.RxWebApiDefinitionService }, { token: i1.RxDefinitionNameService }, { token: i3.TranslateService }, { token: i1.RxOverlayService }], target: i0.ɵɵFactoryTarget.Component });
RxWebApiDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxWebApiDesignerComponent, selector: "rx-web-api-designer", inputs: { webApiDefinitionName: "webApiDefinitionName" }, outputs: { webApiDefinitionSaved: "webApiDefinitionSaved", webApiDefinitionErrorLoading: "webApiDefinitionErrorLoading", closeDesigner: "closeDesigner" }, ngImport: i0, template: "<rx-designer-header\n  [bundleName]=\"bundleFriendlyName$ | async\"\n  [breadcrumbItems]=\"breadcrumbItems$ | async\"\n  [isDesignMode]=\"isDesignMode\"\n  [isSaveButtonDisabled]=\"isSaveButtonDisabled$ | async\"\n  (toggleDesignMode)=\"toggleDesignMode()\"\n  (save)=\"saveDefinition()\"\n  (closeDesigner)=\"closeDesigner.emit()\"\n></rx-designer-header>\n\n<div class=\"rx-component-designer\" [hidden]=\"!isDesignMode\">\n  <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\">\n    <adapt-sidebar-item\n      headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      [iconClass]=\"\n        (hasValidationErrors$ | async) ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\n      \"\n    >\n      <rx-validation-issues\n        [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.common.web-api-definition.label' | translate\"\n        (correctIssue)=\"onCorrectIssue($event)\"\n        [issueSections]=\"validationIssues$ | async\"\n      ></rx-validation-issues>\n    </adapt-sidebar-item>\n  </adapt-sidebar>\n\n  <div class=\"main rx-designer-container h-100\">\n    <h3 class=\"mt-0\">\n      {{\n        isExistingWebApi\n          ? ('com.bmc.arsys.rx.client.web-api-designer.edit-web-api.title' | translate)\n          : ('com.bmc.arsys.rx.client.web-api-designer.new-web-api.label' | translate)\n      }}\n    </h3>\n\n    <h4 class=\"mt-0\">{{ 'com.bmc.arsys.rx.client.web-api-designer.collection-details.title' | translate }}</h4>\n  </div>\n</div>\n\n<adapt-code-viewer\n  *ngIf=\"!isDesignMode\"\n  [code]=\"webApiDefinition$ | async | json\"\n  [lang]=\"'javascript'\"\n  [hasToolbar]=\"false\"\n  [theme]=\"'light'\"\n  class=\"full-size\"\n></adapt-code-viewer>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-component-designer{display:flex;flex-grow:1;height:calc(100% - 50px);overflow:hidden}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;overflow:auto;padding:1rem}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}\n"], components: [{ type: i4.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i5.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i5.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i1$1.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i5.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i7.AsyncPipe, "translate": i3.TranslatePipe, "json": i7.JsonPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-web-api-designer',
                    templateUrl: './web-api-designer.component.html',
                    styleUrls: ['./web-api-designer.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalCacheService }, { type: i1.RxBundleCacheService }, { type: i2.RxWebApiDefinitionService }, { type: i1.RxDefinitionNameService }, { type: i3.TranslateService }, { type: i1.RxOverlayService }]; }, propDecorators: { webApiDefinitionName: [{
                type: Input
            }], webApiDefinitionSaved: [{
                type: Output
            }], webApiDefinitionErrorLoading: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }] } });

class RxWebApiDesignerModule {
}
RxWebApiDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxWebApiDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerModule, declarations: [RxWebApiDesignerComponent], imports: [AdaptCodeViewerModule,
        AdaptRxFormsModule,
        AdaptSidebarModule,
        AdaptTabsModule,
        CommonModule,
        CustomizationOptionsModule,
        FormsModule,
        ReactiveFormsModule,
        RxDefinitionPickerModule,
        RxDesignerHeaderModule,
        RxRevertCustomizationModule,
        RxValidationIssuesModule,
        TranslateModule], exports: [RxWebApiDesignerComponent] });
RxWebApiDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerModule, imports: [[
            AdaptCodeViewerModule,
            AdaptRxFormsModule,
            AdaptSidebarModule,
            AdaptTabsModule,
            CommonModule,
            CustomizationOptionsModule,
            FormsModule,
            ReactiveFormsModule,
            RxDefinitionPickerModule,
            RxDesignerHeaderModule,
            RxRevertCustomizationModule,
            RxValidationIssuesModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxWebApiDesignerComponent],
                    imports: [
                        AdaptCodeViewerModule,
                        AdaptRxFormsModule,
                        AdaptSidebarModule,
                        AdaptTabsModule,
                        CommonModule,
                        CustomizationOptionsModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RxDefinitionPickerModule,
                        RxDesignerHeaderModule,
                        RxRevertCustomizationModule,
                        RxValidationIssuesModule,
                        TranslateModule
                    ],
                    exports: [RxWebApiDesignerComponent]
                }]
        }] });

class RxWebApiDesignerPageComponent {
    constructor(rxUtilityModalService, rxBundleCacheService, rxDefinitionNameService, rxPageTitleService, rxComponentCanDeactivateGuard, translateService, activatedRoute, router) {
        this.rxUtilityModalService = rxUtilityModalService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.translateService = translateService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.isInitialized = false;
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.subscription = this.activatedRoute.params.subscribe(({ definitionName, bundleId }) => {
            this.rxBundleCacheService.bundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
            this.isInitialized = true;
            this.isNewWepApi = !definitionName;
            this.webApiDefinitionName = definitionName;
            this.rxPageTitleService.set([
                this.rxDefinitionNameService.getDisplayName(definitionName),
                this.translateService.instant('com.bmc.arsys.rx.client.web-api-designer.title')
            ]);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    onCloseDesigner() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            'web-api-definitions'
        ]);
    }
    confirmDeactivation() {
        return this.rxUtilityModalService.confirmUnsavedChanges();
    }
    canDeactivate() {
        var _a, _b;
        return (_b = (_a = this.webApiDesignerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
    }
    onWebApiDefinitionSaved(webApiDefinitionName) {
        if (this.isNewWepApi) {
            this.router.navigate(['edit2', webApiDefinitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
    onWebApiDefinitionErrorLoading() {
        this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
}
RxWebApiDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerPageComponent, deps: [{ token: i1$1.RxUtilityModalsService }, { token: i1.RxBundleCacheService }, { token: i1.RxDefinitionNameService }, { token: i1.RxPageTitleService }, { token: i1.RxComponentCanDeactivateGuard }, { token: i3.TranslateService }, { token: i4$1.ActivatedRoute }, { token: i4$1.Router }], target: i0.ɵɵFactoryTarget.Component });
RxWebApiDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxWebApiDesignerPageComponent, selector: "rx-web-api-designer-page", viewQueries: [{ propertyName: "webApiDesignerComponent", first: true, predicate: RxWebApiDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-web-api-designer\n  *ngIf=\"isInitialized\"\n  [webApiDefinitionName]=\"webApiDefinitionName\"\n  (webApiDefinitionSaved)=\"onWebApiDefinitionSaved($event)\"\n  (webApiDefinitionErrorLoading)=\"onWebApiDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-web-api-designer>\n", components: [{ type: RxWebApiDesignerComponent, selector: "rx-web-api-designer", inputs: ["webApiDefinitionName"], outputs: ["webApiDefinitionSaved", "webApiDefinitionErrorLoading", "closeDesigner"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-web-api-designer-page',
                    templateUrl: './web-api-designer-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxUtilityModalsService }, { type: i1.RxBundleCacheService }, { type: i1.RxDefinitionNameService }, { type: i1.RxPageTitleService }, { type: i1.RxComponentCanDeactivateGuard }, { type: i3.TranslateService }, { type: i4$1.ActivatedRoute }, { type: i4$1.Router }]; }, propDecorators: { webApiDesignerComponent: [{
                type: ViewChild,
                args: [RxWebApiDesignerComponent]
            }] } });

class RxWebApiDesignerPageModule {
}
RxWebApiDesignerPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxWebApiDesignerPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerPageModule, declarations: [RxWebApiDesignerPageComponent], imports: [CommonModule, RxWebApiDesignerModule], exports: [RxWebApiDesignerPageComponent] });
RxWebApiDesignerPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerPageModule, imports: [[CommonModule, RxWebApiDesignerModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxWebApiDesignerPageComponent],
                    imports: [CommonModule, RxWebApiDesignerModule],
                    exports: [RxWebApiDesignerPageComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { RxWebApiDesignerComponent, RxWebApiDesignerModule, RxWebApiDesignerPageComponent, RxWebApiDesignerPageModule };
//# sourceMappingURL=helix-platform-web-api-designer.js.map
