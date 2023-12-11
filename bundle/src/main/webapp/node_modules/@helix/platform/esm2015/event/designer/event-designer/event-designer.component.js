import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { filter as _filter } from 'lodash';
import { RxBundleCacheService, RxDefinitionNameService, RxGlobalCacheService, RxOverlayService } from '@helix/platform/shared/api';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@angular/common";
export class RxEventDesignerComponent {
    constructor(rxGlobalCacheService, rxBundleCacheService, rxDefinitionNameService, translateService, rxOverlayService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.translateService = translateService;
        this.rxOverlayService = rxOverlayService;
        this.eventDefinitionSaved = new EventEmitter();
        this.eventDefinitionErrorLoading = new EventEmitter();
        this.closeDesigner = new EventEmitter();
        this.isDesignMode = true;
        this.isExistingEvent = false;
        this.isCustomizationEnabled = true;
        this.bundleFriendlyName$ = this.rxGlobalCacheService.getBundleFriendlyName(this.rxBundleCacheService.bundleId);
        this.validationIssues$ = new BehaviorSubject([]);
        this.hasValidationErrors$ = this.validationIssues$.pipe(map((validationIssues) => Boolean(_filter(validationIssues, {
            issues: [{ type: ValidationIssueType.Error }]
        }).length)), distinctUntilChanged());
        this.eventDefinition$ = new BehaviorSubject(null);
        this.isSavingInProgress$ = new BehaviorSubject(false);
        this.bundleId = this.rxBundleCacheService.bundleId;
        this.isBundleEditable = this.rxOverlayService.isBundleEditable(this.bundleId);
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        if (this.eventDefinitionName) {
        }
        else {
        }
        this.breadcrumbItems$ = this.eventDefinition$.pipe(map((eventDefinition) => {
            const definitionName = this.rxDefinitionNameService.getDisplayName(eventDefinition === null || eventDefinition === void 0 ? void 0 : eventDefinition.name);
            return [
                {
                    label: definitionName ||
                        `<${this.translateService.instant('com.bmc.arsys.rx.client.event-designer.new-event.label')}>`,
                    data: {}
                }
            ];
        }));
        this.isSaveButtonDisabled$ = combineLatest([this.validationIssues$, this.isSavingInProgress$]).pipe(map(([[validationIssueSection], isSavingInProgress]) => Boolean(validationIssueSection === null || validationIssueSection === void 0 ? void 0 : validationIssueSection.issues) || !this.isBundleEditable || isSavingInProgress));
    }
    canDeactivate() {
        return true;
    }
    toggleDesignMode() {
        this.isDesignMode = !this.isDesignMode;
    }
    onCorrectIssue(validationIssue) { }
    validate(value) {
        const validationIssues = [];
        return validationIssues.length
            ? [
                {
                    title: this.translateService.instant('com.bmc.arsys.rx.client.event-designer.new-event.label'),
                    issues: validationIssues
                }
            ]
            : [];
    }
    onRevertCustomization(event) { }
    saveDefinition() { }
}
RxEventDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerComponent, deps: [{ token: i1.RxGlobalCacheService }, { token: i1.RxBundleCacheService }, { token: i1.RxDefinitionNameService }, { token: i2.TranslateService }, { token: i1.RxOverlayService }], target: i0.ɵɵFactoryTarget.Component });
RxEventDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxEventDesignerComponent, selector: "rx-event-designer", inputs: { eventDefinitionName: "eventDefinitionName" }, outputs: { eventDefinitionSaved: "eventDefinitionSaved", eventDefinitionErrorLoading: "eventDefinitionErrorLoading", closeDesigner: "closeDesigner" }, ngImport: i0, template: "<rx-designer-header\n  [bundleName]=\"bundleFriendlyName$ | async\"\n  [breadcrumbItems]=\"breadcrumbItems$ | async\"\n  [isDesignMode]=\"isDesignMode\"\n  [isSaveButtonDisabled]=\"isSaveButtonDisabled$ | async\"\n  (toggleDesignMode)=\"toggleDesignMode()\"\n  (save)=\"saveDefinition()\"\n  (closeDesigner)=\"closeDesigner.emit()\"\n>\n</rx-designer-header>\n\n<div class=\"rx-component-designer\" [hidden]=\"!isDesignMode\">\n  <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\">\n    <adapt-sidebar-item\n      headerTitle=\"{{ 'com.bmc.arsys.rx.client.common.properties.label' | translate }}\"\n      tooltipText=\"{{ 'com.bmc.arsys.rx.client.common.properties.label' | translate }}\"\n      iconClass=\"d-icon-pencil\"\n    >\n      <!-- <rx-form-builder\n                [config]=\"propertiesConfig\"\n                [focusEditor$]=\"inspectorFocusEditor$\"\n                [model]=\"documentModel\"\n                (modelChange)=\"onModelChange($event)\"\n                [isReadOnly]=\"isReadOnly$ | async\"\n              ></rx-form-builder> -->\n    </adapt-sidebar-item>\n\n    <adapt-sidebar-item iconClass=\"d-icon-gear\"> </adapt-sidebar-item>\n\n    <adapt-sidebar-item\n      headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      [iconClass]=\"\n        (hasValidationErrors$ | async) ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\n      \"\n    >\n      <rx-validation-issues\n        [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.common.event-definition.label' | translate\"\n        (correctIssue)=\"onCorrectIssue($event)\"\n        [issueSections]=\"validationIssues$ | async\"\n      >\n      </rx-validation-issues>\n    </adapt-sidebar-item>\n\n    <div class=\"main rx-designer-container h-100\">\n      <h1 class=\"mt-0\">\n        {{\n          isExistingEvent\n            ? ('com.bmc.arsys.rx.client.event-designer.edit-event.title' | translate)\n            : ('com.bmc.arsys.rx.client.event-designer.create-event.title' | translate)\n        }}\n      </h1>\n    </div>\n  </adapt-sidebar>\n</div>\n\n<adapt-code-viewer\n  *ngIf=\"!isDesignMode\"\n  [code]=\"eventDefinition$ | async | json\"\n  [lang]=\"'javascript'\"\n  [hasToolbar]=\"false\"\n  [theme]=\"'light'\"\n  class=\"full-size\"\n></adapt-code-viewer>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-component-designer{display:flex;flex-grow:1;height:calc(100% - 50px);overflow:hidden}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;overflow:auto;padding:1rem}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}\n"], components: [{ type: i3.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i4.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i4.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i5.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i4.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i6.AsyncPipe, "translate": i2.TranslatePipe, "json": i6.JsonPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-event-designer',
                    templateUrl: './event-designer.component.html',
                    styleUrls: ['./event-designer.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalCacheService }, { type: i1.RxBundleCacheService }, { type: i1.RxDefinitionNameService }, { type: i2.TranslateService }, { type: i1.RxOverlayService }]; }, propDecorators: { eventDefinitionName: [{
                type: Input
            }], eventDefinitionSaved: [{
                type: Output
            }], eventDefinitionErrorLoading: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }] } });
//# sourceMappingURL=event-designer.component.js.map