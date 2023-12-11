import * as i6 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, NgModule, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i4 from '@bmc-ux/adapt-angular';
import { AdaptCodeViewerModule, AdaptRxFormsModule, AdaptSidebarModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import * as i3 from '@helix/platform/shared/components';
import { CustomizationOptionsModule, RxDefinitionPickerModule, RxDesignerHeaderModule, RxFormBuilderModule, RxRevertCustomizationModule } from '@helix/platform/shared/components';
import * as i1$1 from '@helix/platform/ui-kit';
import { ValidationIssueType, RxJsonViewerModule, RxValidationIssuesModule } from '@helix/platform/ui-kit';
import * as i2 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, ReplaySubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { filter } from 'lodash';
import * as i1 from '@helix/platform/shared/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import * as i4$1 from '@angular/router';

class RxEventDesignerComponent {
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
        this.hasValidationErrors$ = this.validationIssues$.pipe(map((validationIssues) => Boolean(filter(validationIssues, {
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
RxEventDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxEventDesignerComponent, selector: "rx-event-designer", inputs: { eventDefinitionName: "eventDefinitionName" }, outputs: { eventDefinitionSaved: "eventDefinitionSaved", eventDefinitionErrorLoading: "eventDefinitionErrorLoading", closeDesigner: "closeDesigner" }, ngImport: i0, template: "<rx-designer-header\n  [bundleName]=\"bundleFriendlyName$ | async\"\n  [breadcrumbItems]=\"breadcrumbItems$ | async\"\n  [isDesignMode]=\"isDesignMode\"\n  [isSaveButtonDisabled]=\"isSaveButtonDisabled$ | async\"\n  (toggleDesignMode)=\"toggleDesignMode()\"\n  (save)=\"saveDefinition()\"\n  (closeDesigner)=\"closeDesigner.emit()\"\n>\n</rx-designer-header>\n\n<div class=\"rx-component-designer\" [hidden]=\"!isDesignMode\">\n  <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\">\n    <adapt-sidebar-item\n      headerTitle=\"{{ 'com.bmc.arsys.rx.client.common.properties.label' | translate }}\"\n      tooltipText=\"{{ 'com.bmc.arsys.rx.client.common.properties.label' | translate }}\"\n      iconClass=\"d-icon-pencil\"\n    >\n      <!-- <rx-form-builder\n                [config]=\"propertiesConfig\"\n                [focusEditor$]=\"inspectorFocusEditor$\"\n                [model]=\"documentModel\"\n                (modelChange)=\"onModelChange($event)\"\n                [isReadOnly]=\"isReadOnly$ | async\"\n              ></rx-form-builder> -->\n    </adapt-sidebar-item>\n\n    <adapt-sidebar-item iconClass=\"d-icon-gear\"> </adapt-sidebar-item>\n\n    <adapt-sidebar-item\n      headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      [iconClass]=\"\n        (hasValidationErrors$ | async) ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\n      \"\n    >\n      <rx-validation-issues\n        [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.common.event-definition.label' | translate\"\n        (correctIssue)=\"onCorrectIssue($event)\"\n        [issueSections]=\"validationIssues$ | async\"\n      >\n      </rx-validation-issues>\n    </adapt-sidebar-item>\n\n    <div class=\"main rx-designer-container h-100\">\n      <h1 class=\"mt-0\">\n        {{\n          isExistingEvent\n            ? ('com.bmc.arsys.rx.client.event-designer.edit-event.title' | translate)\n            : ('com.bmc.arsys.rx.client.event-designer.create-event.title' | translate)\n        }}\n      </h1>\n    </div>\n  </adapt-sidebar>\n</div>\n\n<adapt-code-viewer\n  *ngIf=\"!isDesignMode\"\n  [code]=\"eventDefinition$ | async | json\"\n  [lang]=\"'javascript'\"\n  [hasToolbar]=\"false\"\n  [theme]=\"'light'\"\n  class=\"full-size\"\n></adapt-code-viewer>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-component-designer{display:flex;flex-grow:1;height:calc(100% - 50px);overflow:hidden}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;overflow:auto;padding:1rem}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}\n"], components: [{ type: i3.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i4.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i4.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i1$1.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i4.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i6.AsyncPipe, "translate": i2.TranslatePipe, "json": i6.JsonPipe } });
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

class RxEventDesignerModule {
}
RxEventDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxEventDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerModule, declarations: [RxEventDesignerComponent], imports: [AdaptCodeViewerModule,
        AdaptRxFormsModule,
        AdaptSidebarModule,
        AdaptTabsModule,
        CommonModule,
        CustomizationOptionsModule,
        FormsModule,
        ReactiveFormsModule,
        RxDefinitionPickerModule,
        RxDesignerHeaderModule,
        RxFormBuilderModule,
        RxJsonViewerModule,
        RxRevertCustomizationModule,
        RxValidationIssuesModule,
        TranslateModule], exports: [RxEventDesignerComponent] });
RxEventDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerModule, imports: [[
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
            RxFormBuilderModule,
            RxJsonViewerModule,
            RxRevertCustomizationModule,
            RxValidationIssuesModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxEventDesignerComponent],
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
                        RxFormBuilderModule,
                        RxJsonViewerModule,
                        RxRevertCustomizationModule,
                        RxValidationIssuesModule,
                        TranslateModule
                    ],
                    exports: [RxEventDesignerComponent]
                }]
        }] });

class RxEventDesignerPageComponent {
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
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.activatedRoute.params.pipe(takeUntil(this.destroyed$)).subscribe(({ definitionName, bundleId }) => {
            this.rxBundleCacheService.bundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
            this.isInitialized = true;
            this.isNewEvent = !definitionName;
            this.eventDefinitionName = definitionName;
            this.rxPageTitleService.set([
                this.rxDefinitionNameService.getDisplayName(definitionName),
                this.translateService.instant('com.bmc.arsys.rx.client.event-designer.title')
            ]);
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    onCloseDesigner() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            'event-definitions'
        ]);
    }
    confirmDeactivation() {
        return this.rxUtilityModalService.confirmUnsavedChanges();
    }
    canDeactivate() {
        var _a, _b;
        return (_b = (_a = this.eventDesignerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
    }
    onEventDefinitionSaved(eventDefinitionName) {
        if (this.isNewEvent) {
            this.router.navigate(['edit2', eventDefinitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
    onEventDefinitionErrorLoading() {
        this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
}
RxEventDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerPageComponent, deps: [{ token: i1$1.RxUtilityModalsService }, { token: i1.RxBundleCacheService }, { token: i1.RxDefinitionNameService }, { token: i1.RxPageTitleService }, { token: i1.RxComponentCanDeactivateGuard }, { token: i2.TranslateService }, { token: i4$1.ActivatedRoute }, { token: i4$1.Router }], target: i0.ɵɵFactoryTarget.Component });
RxEventDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxEventDesignerPageComponent, selector: "rx-event-designer-page", viewQueries: [{ propertyName: "eventDesignerComponent", first: true, predicate: RxEventDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-event-designer\n  *ngIf=\"isInitialized\"\n  [eventDefinitionName]=\"eventDefinitionName\"\n  (eventDefinitionSaved)=\"onEventDefinitionSaved($event)\"\n  (eventDefinitionErrorLoading)=\"onEventDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-event-designer>\n", components: [{ type: RxEventDesignerComponent, selector: "rx-event-designer", inputs: ["eventDefinitionName"], outputs: ["eventDefinitionSaved", "eventDefinitionErrorLoading", "closeDesigner"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-event-designer-page',
                    templateUrl: './event-designer-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxUtilityModalsService }, { type: i1.RxBundleCacheService }, { type: i1.RxDefinitionNameService }, { type: i1.RxPageTitleService }, { type: i1.RxComponentCanDeactivateGuard }, { type: i2.TranslateService }, { type: i4$1.ActivatedRoute }, { type: i4$1.Router }]; }, propDecorators: { eventDesignerComponent: [{
                type: ViewChild,
                args: [RxEventDesignerComponent]
            }] } });

class RxEventDesignerPageModule {
}
RxEventDesignerPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxEventDesignerPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerPageModule, declarations: [RxEventDesignerPageComponent], imports: [CommonModule, RxEventDesignerModule], exports: [RxEventDesignerPageComponent] });
RxEventDesignerPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerPageModule, imports: [[CommonModule, RxEventDesignerModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxEventDesignerPageComponent],
                    imports: [CommonModule, RxEventDesignerModule],
                    exports: [RxEventDesignerPageComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { RxEventDesignerComponent, RxEventDesignerModule, RxEventDesignerPageComponent, RxEventDesignerPageModule };
//# sourceMappingURL=helix-platform-event-designer.js.map
