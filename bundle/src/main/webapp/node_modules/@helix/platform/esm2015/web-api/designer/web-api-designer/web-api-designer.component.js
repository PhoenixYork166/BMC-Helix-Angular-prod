import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { filter as _filter } from 'lodash';
import { RxBundleCacheService, RxDefinitionNameService, RxGlobalCacheService, RxOverlayService, } from '@helix/platform/shared/api';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { RxWebApiDefinitionService } from '@helix/platform/web-api/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/web-api/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@angular/common";
export class RxWebApiDesignerComponent {
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
        this.hasValidationErrors$ = this.validationIssues$.pipe(map((validationIssues) => Boolean(_filter(validationIssues, {
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
RxWebApiDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxWebApiDesignerComponent, selector: "rx-web-api-designer", inputs: { webApiDefinitionName: "webApiDefinitionName" }, outputs: { webApiDefinitionSaved: "webApiDefinitionSaved", webApiDefinitionErrorLoading: "webApiDefinitionErrorLoading", closeDesigner: "closeDesigner" }, ngImport: i0, template: "<rx-designer-header\n  [bundleName]=\"bundleFriendlyName$ | async\"\n  [breadcrumbItems]=\"breadcrumbItems$ | async\"\n  [isDesignMode]=\"isDesignMode\"\n  [isSaveButtonDisabled]=\"isSaveButtonDisabled$ | async\"\n  (toggleDesignMode)=\"toggleDesignMode()\"\n  (save)=\"saveDefinition()\"\n  (closeDesigner)=\"closeDesigner.emit()\"\n></rx-designer-header>\n\n<div class=\"rx-component-designer\" [hidden]=\"!isDesignMode\">\n  <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\">\n    <adapt-sidebar-item\n      headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      [iconClass]=\"\n        (hasValidationErrors$ | async) ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\n      \"\n    >\n      <rx-validation-issues\n        [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.common.web-api-definition.label' | translate\"\n        (correctIssue)=\"onCorrectIssue($event)\"\n        [issueSections]=\"validationIssues$ | async\"\n      ></rx-validation-issues>\n    </adapt-sidebar-item>\n  </adapt-sidebar>\n\n  <div class=\"main rx-designer-container h-100\">\n    <h3 class=\"mt-0\">\n      {{\n        isExistingWebApi\n          ? ('com.bmc.arsys.rx.client.web-api-designer.edit-web-api.title' | translate)\n          : ('com.bmc.arsys.rx.client.web-api-designer.new-web-api.label' | translate)\n      }}\n    </h3>\n\n    <h4 class=\"mt-0\">{{ 'com.bmc.arsys.rx.client.web-api-designer.collection-details.title' | translate }}</h4>\n  </div>\n</div>\n\n<adapt-code-viewer\n  *ngIf=\"!isDesignMode\"\n  [code]=\"webApiDefinition$ | async | json\"\n  [lang]=\"'javascript'\"\n  [hasToolbar]=\"false\"\n  [theme]=\"'light'\"\n  class=\"full-size\"\n></adapt-code-viewer>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-component-designer{display:flex;flex-grow:1;height:calc(100% - 50px);overflow:hidden}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;overflow:auto;padding:1rem}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}\n"], components: [{ type: i4.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i5.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i5.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i6.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i5.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i7.AsyncPipe, "translate": i3.TranslatePipe, "json": i7.JsonPipe } });
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
//# sourceMappingURL=web-api-designer.component.js.map