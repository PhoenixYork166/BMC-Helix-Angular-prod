import { Component, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdaptSidebarComponent } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxGlobalCacheService, RxNotificationService, RxOverlayService } from '@helix/platform/shared/api';
import { CustomizationOptionsComponent, RX_REVERT_CUSTOMIZATION, RxRevertCustomizationComponent, TextareaFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { RxJsonParserService } from '@helix/platform/utils';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { isEmpty, isUndefined, some, trim } from 'lodash';
import { combineLatest, of, ReplaySubject, Subject } from 'rxjs';
import { filter, map, shareReplay, skip, startWith, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { DocumentDesignerService } from '../document-designer.service';
import * as DocumentDesignerActions from './+state/document-designer.actions';
import { bundleIdSelector, definitionModelFromDefinitionSelector, definitionModelSelector, isDesignModeSelector, isDirtySelector, originalDefinitionSelector, savedDefinitionNameSelector } from './+state/document-designer.selectors';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@ngx-translate/core";
import * as i5 from "../document-designer.service";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@helix/platform/ui-kit";
import * as i9 from "@angular/common";
import * as i10 from "@angular/forms";
export class DocumentDesignerComponent {
    constructor(store$, renderer, rxGlobalCacheService, rxJsonParserService, rxNotificationService, rxOverlayService, translateService, documentDesignerService) {
        this.store$ = store$;
        this.renderer = renderer;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxNotificationService = rxNotificationService;
        this.rxOverlayService = rxOverlayService;
        this.translateService = translateService;
        this.documentDesignerService = documentDesignerService;
        this.definitionSaved = new EventEmitter();
        this.definitionErrorLoading = new EventEmitter();
        this.closeDesigner = new EventEmitter();
        this.schemaFormControl = new FormControl('', { updateOn: 'blur' });
        this.isDirty$ = this.store$.select(isDirtySelector);
        this.definitionModel$ = this.store$.select(definitionModelSelector);
        this.isDesignMode$ = this.store$.select(isDesignModeSelector);
        this.bundleId$ = this.store$.select(bundleIdSelector);
        this.destroyed$ = new ReplaySubject(1);
        this.originalDefinition$ = this.store$.select(originalDefinitionSelector);
        this.inspectorFocusEditorSubject = new Subject();
        this.inspectorFocusEditor$ = this.inspectorFocusEditorSubject.asObservable();
        this.bundleFriendlyName$ = this.bundleId$.pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleFriendlyName(bundleId)));
        this.validationIssues$ = this.definitionModel$.pipe(map((definitionModel) => this.validate(definitionModel)), shareReplay(1));
        this.hasValidationErrors$ = this.validationIssues$.pipe(map((issueSections) => some(issueSections, {
            issues: [{ type: ValidationIssueType.Error }]
        })));
        this.definitionFromDefinitionModel$ = this.definitionModel$.pipe(withLatestFrom(this.bundleId$), map(([definitionModel, bundleId]) => this.documentDesignerService.getDefinitionFromDefinitionModel(definitionModel, bundleId)));
        this.areNewDefinitionsAllowed$ = this.store$
            .select(bundleIdSelector)
            .pipe(switchMap((bundleId) => this.rxOverlayService.areNewDefinitionsAllowed(bundleId)));
        this.isReadOnly$ = this.definitionFromDefinitionModel$.pipe(filter((definition) => !!definition.lastUpdateTime), withLatestFrom(this.areNewDefinitionsAllowed$), map(([definition, areNewDefinitionsAllowed]) => !areNewDefinitionsAllowed || !this.rxOverlayService.isCustomizationEnabled('allowOverlay', definition)), tap((isReadOnly) => {
            if (isReadOnly) {
                this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.read-only-definition-warning.message'));
            }
        }), startWith(false), shareReplay(1));
        this.isSaveButtonDisabled$ = combineLatest([
            this.hasValidationErrors$,
            this.isDirty$,
            this.isReadOnly$
        ]).pipe(map(([hasValidationErrors, isDirty, isReadOnly]) => hasValidationErrors || !isDirty || isReadOnly), startWith(true));
        this.definitionForJsonViewer$ = this.isDesignMode$.pipe(switchMap((isDesignMode) => isDesignMode
            ? of(null)
            : combineLatest([this.definitionFromDefinitionModel$, this.originalDefinition$]).pipe(map(([definitionFromDefinitionModel, originalDefinition]) => (Object.assign(Object.assign({}, originalDefinition), definitionFromDefinitionModel))))));
        this.breadcrumbItems$ = this.definitionModel$.pipe(map((definitionModel) => [
            {
                label: definitionModel.name ||
                    `<${this.translateService.instant('com.bmc.arsys.rx.client.document-designer.new-document.label')}>`,
                data: {}
            }
        ]));
        this.definitionInspectorConfig$ = this.definitionModel$.pipe(map((definitionModel) => {
            const isCustomizationAllowed = Boolean(definitionModel.lastUpdateTime)
                ? this.rxOverlayService.isCustomizationEnabled('allowOverlay', definitionModel)
                : true;
            return this.getFormBuilderConfig(definitionModel, isCustomizationAllowed);
        }));
        this.vm$ = combineLatest([
            this.breadcrumbItems$,
            this.bundleFriendlyName$,
            this.definitionModel$,
            this.hasValidationErrors$,
            this.isReadOnly$,
            this.definitionForJsonViewer$,
            this.isSaveButtonDisabled$,
            this.definitionInspectorConfig$,
            this.validationIssues$
        ]).pipe(map(([breadcrumbItems, bundleFriendlyName, definitionModel, hasValidationErrors, isReadOnly, definitionForJsonViewer, isSaveButtonDisabled, definitionInspectorConfig, validationIssues]) => ({
            breadcrumbItems,
            bundleFriendlyName,
            definitionModel,
            hasValidationErrors,
            isReadOnly,
            definitionForJsonViewer,
            isSaveButtonDisabled,
            definitionInspectorConfig,
            validationIssues
        })));
    }
    ngOnInit() {
        this.schemaFormControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((documentSchema) => {
            this.store$.dispatch(DocumentDesignerActions.updateDefinitionModelFromDesigner({
                definitionModelFromDesigner: { documentSchema }
            }));
        });
        this.store$
            .select(definitionModelFromDefinitionSelector)
            .pipe(takeUntil(this.destroyed$))
            .subscribe((definitionModel) => {
            this.schemaFormControl.patchValue(definitionModel.documentSchema, { emitEvent: false });
        });
        this.store$
            .select(savedDefinitionNameSelector)
            .pipe(skip(1), takeUntil(this.destroyed$), filter(Boolean))
            .subscribe((savedDefinitionName) => {
            this.definitionSaved.emit(savedDefinitionName);
        });
    }
    ngOnChanges(changes) {
        if (changes.configuration.currentValue) {
            this.store$.dispatch(DocumentDesignerActions.init({ payload: this.configuration }));
        }
    }
    onEditorEvent(event) {
        if (event.type === RX_REVERT_CUSTOMIZATION.events.revertCustomization) {
            this.store$.dispatch(DocumentDesignerActions.revertCustomization());
        }
    }
    canDeactivate() {
        let canDeactivate = true;
        this.isDirty$.pipe(take(1)).subscribe((isDirty) => {
            canDeactivate = !isDirty;
        });
        return canDeactivate;
    }
    onCorrectIssue(validationIssue) {
        if (validationIssue.data.propertyName === 'documentSchema') {
            this.renderer.selectRootElement('#document-schema').focus();
        }
        else {
            this.inspectorSidebar.openPanel(0);
            // need to wait until inspector will be visible
            // there are no way to focus to invisible elements
            setTimeout(() => this.inspectorFocusEditorSubject.next({
                editorName: validationIssue.data.propertyName,
                data: validationIssue.data.data
            }), 10);
        }
    }
    onSave() {
        this.store$.dispatch(DocumentDesignerActions.saveDefinition());
    }
    onToggleDesignMode() {
        this.store$.dispatch(DocumentDesignerActions.toggleDesignMode());
    }
    onDefinitionModelChange(definitionModel) {
        this.store$.dispatch(DocumentDesignerActions.updateDefinitionModelFromDesigner({ definitionModelFromDesigner: definitionModel }));
    }
    onDefinitionInspectorInitialized() {
        setTimeout(() => this.inspectorFocusEditorSubject.next({
            editorName: 'name',
            data: {}
        }), 10);
    }
    getFormBuilderConfig(definitionModel, isCustomizationAllowed) {
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                controls: [
                    {
                        name: 'name',
                        component: TextFormControlComponent,
                        isDisabled: Boolean(definitionModel.lastUpdateTime),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                            required: true
                        }
                    },
                    {
                        name: 'description',
                        component: TextareaFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                            rows: 3
                        }
                    },
                    {
                        component: RxRevertCustomizationComponent,
                        options: {
                            allowOverlay: definitionModel.customizationOptions.allowOverlay,
                            scope: definitionModel.customizationOptions.scope,
                            overlayGroupId: definitionModel.overlayGroupId,
                            overlayDescriptor: definitionModel.overlayDescriptor
                        }
                    },
                    {
                        name: 'customizationOptions',
                        component: CustomizationOptionsComponent,
                        isDisabled: !isCustomizationAllowed,
                        options: {
                            definitionTypeDisplayName: this.translateService
                                .instant('com.bmc.arsys.rx.client.document-definition.label')
                                .toLowerCase(),
                            allowOverlay: definitionModel.customizationOptions.allowOverlay,
                            scope: definitionModel.customizationOptions.scope,
                            overlayGroupId: definitionModel.overlayGroupId,
                            overlayDescriptor: definitionModel.overlayDescriptor
                        }
                    }
                ]
            }
        ];
    }
    validate(definitionModel) {
        const validationIssues = [];
        if (isEmpty(trim(definitionModel.name))) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.document-designer.document-name.label')
                }),
                data: {
                    propertyName: 'name'
                }
            });
        }
        if (definitionModel.name && !RX_RECORD_DEFINITION.validDefinitionNameRegex.test(definitionModel.name)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.document-designer.document-name.label')
                }),
                data: {
                    propertyName: 'name'
                }
            });
        }
        if (isEmpty(trim(definitionModel.documentSchema))) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.document-designer.document-schema.label')
                }),
                data: {
                    propertyName: 'documentSchema'
                }
            });
        }
        else if (isUndefined(this.rxJsonParserService.tryParseJson(definitionModel.documentSchema))) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.document-designer.validation.json-is-not-valid.message'),
                data: {
                    propertyName: 'documentSchema'
                }
            });
        }
        return validationIssues.length
            ? [
                {
                    title: this.translateService.instant('com.bmc.arsys.rx.client.document-designer.title'),
                    issues: validationIssues
                }
            ]
            : [];
    }
    ngOnDestroy() {
        this.inspectorFocusEditorSubject.complete();
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.store$.dispatch(DocumentDesignerActions.destroy());
    }
}
DocumentDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerComponent, deps: [{ token: i1.Store }, { token: i0.Renderer2 }, { token: i2.RxGlobalCacheService }, { token: i3.RxJsonParserService }, { token: i2.RxNotificationService }, { token: i2.RxOverlayService }, { token: i4.TranslateService }, { token: i5.DocumentDesignerService }], target: i0.ɵɵFactoryTarget.Component });
DocumentDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DocumentDesignerComponent, selector: "rx-document-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, viewQueries: [{ propertyName: "inspectorSidebar", first: true, predicate: AdaptSidebarComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    [isDesignMode]=\"!vm.definitionForJsonViewer\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (toggleDesignMode)=\"onToggleDesignMode()\"\n    (save)=\"onSave()\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n  ></rx-designer-header>\n\n  <div class=\"rx-designer-component\" [hidden]=\"!!vm.definitionForJsonViewer\">\n    <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\">\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.common.properties.label' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.common.properties.label' | translate }}\"\n        iconClass=\"d-icon-pencil\"\n      >\n        <rx-form-builder\n          [config]=\"vm.definitionInspectorConfig\"\n          [focusEditor$]=\"inspectorFocusEditor$\"\n          (editorEvent)=\"onEditorEvent($event)\"\n          [isReadOnly]=\"vm.isReadOnly\"\n          [model]=\"vm.definitionModel\"\n          (formInitialized)=\"onDefinitionInspectorInitialized()\"\n          (modelChange)=\"onDefinitionModelChange($event)\"\n        ></rx-form-builder>\n      </adapt-sidebar-item>\n\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        [iconClass]=\"vm.hasValidationErrors ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\"\n      >\n        <rx-validation-issues\n          [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.document-definition.label' | translate\"\n          [issueSections]=\"vm.validationIssues\"\n          (correctIssue)=\"onCorrectIssue($event)\"\n        ></rx-validation-issues>\n      </adapt-sidebar-item>\n\n      <div class=\"main rx-designer-container h-100\">\n        <adapt-rx-control-label\n          [label]=\"'com.bmc.arsys.rx.client.document-designer.document-schema.label' | translate\"\n          [showRequiredLabel]=\"true\"\n        >\n        </adapt-rx-control-label>\n\n        <textarea\n          [formControl]=\"schemaFormControl\"\n          [readonly]=\"vm.isReadOnly\"\n          class=\"form-control h-100\"\n          name=\"documentSchema\"\n          required\n          id=\"document-schema\"\n          rx-id=\"document-schema\"\n        ></textarea>\n      </div>\n    </adapt-sidebar>\n  </div>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  >\n  </adapt-code-viewer>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-designer-component{height:calc(100% - 50px)}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;padding:1rem}textarea{resize:none}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}:host ::ng-deep .adapt-sidebar-main{overflow:auto}\n"], components: [{ type: i6.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i7.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i7.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i6.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i8.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i7.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i7.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i10.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i10.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "async": i9.AsyncPipe, "translate": i4.TranslatePipe, "json": i9.JsonPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-document-designer',
                    templateUrl: './document-designer.component.html',
                    styleUrls: ['./document-designer.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i0.Renderer2 }, { type: i2.RxGlobalCacheService }, { type: i3.RxJsonParserService }, { type: i2.RxNotificationService }, { type: i2.RxOverlayService }, { type: i4.TranslateService }, { type: i5.DocumentDesignerService }]; }, propDecorators: { configuration: [{
                type: Input
            }], definitionSaved: [{
                type: Output
            }], definitionErrorLoading: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }], inspectorSidebar: [{
                type: ViewChild,
                args: [AdaptSidebarComponent, { static: false }]
            }] } });
//# sourceMappingURL=document-designer.component.js.map