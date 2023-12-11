import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, ViewChild, NgModule } from '@angular/core';
import * as i1$1 from '@angular/router';
import * as i2 from '@helix/platform/shared/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import * as i3$1 from '@helix/platform/ui-kit';
import { ValidationIssueType, RxJsonViewerModule, RxValidationIssuesModule } from '@helix/platform/ui-kit';
import * as i4 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import * as i10 from '@angular/forms';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i7 from '@bmc-ux/adapt-angular';
import { AdaptSidebarComponent, AdaptCodeViewerModule, AdaptRxLabelModule, AdaptSidebarModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import * as i6 from '@helix/platform/shared/components';
import { RX_REVERT_CUSTOMIZATION, TextFormControlComponent, TextareaFormControlComponent, RxRevertCustomizationComponent, CustomizationOptionsComponent, RxDesignerHeaderModule, RxFormBuilderModule } from '@helix/platform/shared/components';
import * as i3 from '@helix/platform/utils';
import * as i1 from '@ngrx/store';
import { createAction, props, createFeatureSelector, createSelector, createReducer, on, StoreModule } from '@ngrx/store';
import { some, isEmpty, trim, isUndefined, last } from 'lodash';
import { ReplaySubject, Subject, combineLatest, of } from 'rxjs';
import { switchMap, map, shareReplay, withLatestFrom, filter, tap, startWith, takeUntil, skip, take, catchError } from 'rxjs/operators';
import * as i9 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2$1 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';
import * as i6$1 from '@helix/platform/document/api';

class DocumentDesignerService {
    getDefinitionFromDefinitionModel(model, bundleId) {
        return {
            lastUpdateTime: model.lastUpdateTime,
            lastChangedBy: model.lastChangedBy,
            owner: model.owner,
            name: `${bundleId}:${model.name}`,
            description: model.description,
            overlayGroupId: model.overlayGroupId,
            scope: model.customizationOptions.scope,
            guid: model.guid,
            allowOverlay: model.customizationOptions.allowOverlay,
            overlayDescriptor: model.overlayDescriptor,
            documentSchema: model.documentSchema
        };
    }
}
DocumentDesignerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DocumentDesignerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

const init = createAction('[Document Designer] Init', props());
const loadDefinition = createAction('[Document Designer] Load Definition');
const loadDefinitionSuccess = createAction('[Document Designer] Load Definition Success', props());
const initDefinitionData = createAction('[Document Designer] Init Definition Model', props());
const markDesignerPristine = createAction('[Document Designer] Mark Designer Pristine');
const markDesignerDirty = createAction('[Document Designer] Mark Designer Dirty');
const updateDefinitionModelFromDesigner = createAction('[Document Designer] Update Definition Model From Designer', props());
const toggleDesignMode = createAction('[Document Designer] Toggle Design Mode');
const revertCustomization = createAction('[Document Designer] Revert Customization');
const saveDefinition = createAction('[Document Designer] Save Definition');
const saveDefinitionSuccess = createAction('[Document Designer] Save Definition Success', props());
const saveDefinitionError = createAction('[Document Designer] Save Definition Error');
const destroy = createAction('[Document Designer] Destroy');

const RX_DOCUMENT_DESIGNER = {
    featureSelector: 'documentDesigner'
};

const documentDesignerStateSelector = createFeatureSelector(RX_DOCUMENT_DESIGNER.featureSelector);
const documentDesignerModelSelector = createSelector(documentDesignerStateSelector, (documentDesignerState) => documentDesignerState.model);
const bundleIdSelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.bundleId);
const definitionNameSelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.definitionName);
const isDesignModeSelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.isDesignMode);
const definitionModelFromDefinitionSelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.definitionModelFromDefinition);
const definitionModelSelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.definitionModel);
const isDirtySelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.isDirty);
const savedDefinitionNameSelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.savedDefinitionName);
const originalDefinitionSelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.originalDefinition);

class DocumentDesignerComponent {
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
            this.store$.dispatch(updateDefinitionModelFromDesigner({
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
            this.store$.dispatch(init({ payload: this.configuration }));
        }
    }
    onEditorEvent(event) {
        if (event.type === RX_REVERT_CUSTOMIZATION.events.revertCustomization) {
            this.store$.dispatch(revertCustomization());
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
        this.store$.dispatch(saveDefinition());
    }
    onToggleDesignMode() {
        this.store$.dispatch(toggleDesignMode());
    }
    onDefinitionModelChange(definitionModel) {
        this.store$.dispatch(updateDefinitionModelFromDesigner({ definitionModelFromDesigner: definitionModel }));
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
        this.store$.dispatch(destroy());
    }
}
DocumentDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerComponent, deps: [{ token: i1.Store }, { token: i0.Renderer2 }, { token: i2.RxGlobalCacheService }, { token: i3.RxJsonParserService }, { token: i2.RxNotificationService }, { token: i2.RxOverlayService }, { token: i4.TranslateService }, { token: DocumentDesignerService }], target: i0.ɵɵFactoryTarget.Component });
DocumentDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DocumentDesignerComponent, selector: "rx-document-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, viewQueries: [{ propertyName: "inspectorSidebar", first: true, predicate: AdaptSidebarComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    [isDesignMode]=\"!vm.definitionForJsonViewer\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (toggleDesignMode)=\"onToggleDesignMode()\"\n    (save)=\"onSave()\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n  ></rx-designer-header>\n\n  <div class=\"rx-designer-component\" [hidden]=\"!!vm.definitionForJsonViewer\">\n    <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\">\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.common.properties.label' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.common.properties.label' | translate }}\"\n        iconClass=\"d-icon-pencil\"\n      >\n        <rx-form-builder\n          [config]=\"vm.definitionInspectorConfig\"\n          [focusEditor$]=\"inspectorFocusEditor$\"\n          (editorEvent)=\"onEditorEvent($event)\"\n          [isReadOnly]=\"vm.isReadOnly\"\n          [model]=\"vm.definitionModel\"\n          (formInitialized)=\"onDefinitionInspectorInitialized()\"\n          (modelChange)=\"onDefinitionModelChange($event)\"\n        ></rx-form-builder>\n      </adapt-sidebar-item>\n\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        [iconClass]=\"vm.hasValidationErrors ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\"\n      >\n        <rx-validation-issues\n          [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.document-definition.label' | translate\"\n          [issueSections]=\"vm.validationIssues\"\n          (correctIssue)=\"onCorrectIssue($event)\"\n        ></rx-validation-issues>\n      </adapt-sidebar-item>\n\n      <div class=\"main rx-designer-container h-100\">\n        <adapt-rx-control-label\n          [label]=\"'com.bmc.arsys.rx.client.document-designer.document-schema.label' | translate\"\n          [showRequiredLabel]=\"true\"\n        >\n        </adapt-rx-control-label>\n\n        <textarea\n          [formControl]=\"schemaFormControl\"\n          [readonly]=\"vm.isReadOnly\"\n          class=\"form-control h-100\"\n          name=\"documentSchema\"\n          required\n          id=\"document-schema\"\n          rx-id=\"document-schema\"\n        ></textarea>\n      </div>\n    </adapt-sidebar>\n  </div>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  >\n  </adapt-code-viewer>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-designer-component{height:calc(100% - 50px)}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;padding:1rem}textarea{resize:none}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}:host ::ng-deep .adapt-sidebar-main{overflow:auto}\n"], components: [{ type: i6.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i7.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i7.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i6.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i3$1.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i7.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i7.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i10.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i10.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "async": i9.AsyncPipe, "translate": i4.TranslatePipe, "json": i9.JsonPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-document-designer',
                    templateUrl: './document-designer.component.html',
                    styleUrls: ['./document-designer.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i0.Renderer2 }, { type: i2.RxGlobalCacheService }, { type: i3.RxJsonParserService }, { type: i2.RxNotificationService }, { type: i2.RxOverlayService }, { type: i4.TranslateService }, { type: DocumentDesignerService }]; }, propDecorators: { configuration: [{
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

class DocumentDesignerPageComponent {
    constructor(activatedRoute, router, rxBundleCacheService, rxComponentCanDeactivateGuard, rxDefinitionNameService, rxPageTitleService, rxUtilityModalsService, translateService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.translateService = translateService;
        this.isInitialized = false;
        this.definitionsRoute = 'document-definitions';
        this.pageTitle = this.translateService.instant('com.bmc.arsys.rx.client.document-designer.title');
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.subscription = this.activatedRoute.params.subscribe(({ definitionName, bundleId }) => {
            this.rxBundleCacheService.bundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
            this.isInitialized = true;
            this.isNewDefinition = !definitionName;
            this.configuration = Object.assign(Object.assign({}, this.configuration), { bundleId: this.rxBundleCacheService.bundleId, definitionName });
            this.rxPageTitleService.set([this.rxDefinitionNameService.getDisplayName(definitionName), this.pageTitle]);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    canDeactivate() {
        var _a, _b;
        return (_b = (_a = this.designerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges();
    }
    onCloseDesigner() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            this.definitionsRoute
        ]);
    }
    onDefinitionSaved(definitionName) {
        if (this.isNewDefinition) {
            this.router.navigate(['edit2', definitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
    onDefinitionErrorLoading() {
        this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
}
DocumentDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerPageComponent, deps: [{ token: i1$1.ActivatedRoute }, { token: i1$1.Router }, { token: i2.RxBundleCacheService }, { token: i2.RxComponentCanDeactivateGuard }, { token: i2.RxDefinitionNameService }, { token: i2.RxPageTitleService }, { token: i3$1.RxUtilityModalsService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
DocumentDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DocumentDesignerPageComponent, selector: "rx-document-designer-page", viewQueries: [{ propertyName: "designerComponent", first: true, predicate: DocumentDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-document-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-document-designer>\n", components: [{ type: DocumentDesignerComponent, selector: "rx-document-designer", inputs: ["configuration"], outputs: ["definitionSaved", "definitionErrorLoading", "closeDesigner"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-document-designer-page',
                    templateUrl: './document-designer-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActivatedRoute }, { type: i1$1.Router }, { type: i2.RxBundleCacheService }, { type: i2.RxComponentCanDeactivateGuard }, { type: i2.RxDefinitionNameService }, { type: i2.RxPageTitleService }, { type: i3$1.RxUtilityModalsService }, { type: i4.TranslateService }]; }, propDecorators: { designerComponent: [{
                type: ViewChild,
                args: [DocumentDesignerComponent]
            }] } });

const initialModel = {
    name: null,
    documentSchema: null,
    customizationOptions: { allowOverlay: null, scope: null }
};
const initialState = {
    bundleId: null,
    definitionName: null,
    isDesignMode: true,
    definitionModel: initialModel,
    definitionModelFromDefinition: initialModel,
    isDirty: false,
    savedDefinitionName: null,
    originalDefinition: null
};
const reducer = createReducer(initialState, on(init, (state, { payload }) => (Object.assign(Object.assign({}, initialState), { bundleId: payload.bundleId, definitionName: payload.definitionName }))), on(initDefinitionData, (state, { definition, definitionModel }) => (Object.assign(Object.assign({}, state), { definitionModel, definitionModelFromDefinition: definitionModel, originalDefinition: definition }))), on(markDesignerPristine, (state) => (Object.assign(Object.assign({}, state), { isDirty: false }))), on(markDesignerDirty, (state) => (Object.assign(Object.assign({}, state), { isDirty: true }))), on(toggleDesignMode, (state) => (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode }))), on(updateDefinitionModelFromDesigner, (state, { definitionModelFromDesigner }) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner) }))), on(saveDefinitionSuccess, (state, { savedDefinitionName }) => (Object.assign(Object.assign({}, state), { savedDefinitionName }))), on(destroy, (state) => (Object.assign({}, initialState))));
function documentDesignerModelReducer(state, action) {
    return reducer(state, action);
}

class DocumentDesignerEffects {
    constructor(store$, actions$, errorHandler, rxDefinitionUpdateService, documentDesignerService, rxNotificationService, translateService, rxDocumentDefinitionService, rxDefinitionNameService) {
        this.store$ = store$;
        this.actions$ = actions$;
        this.errorHandler = errorHandler;
        this.rxDefinitionUpdateService = rxDefinitionUpdateService;
        this.documentDesignerService = documentDesignerService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.rxDocumentDefinitionService = rxDocumentDefinitionService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.initDocumentDesigner$ = createEffect(() => this.actions$.pipe(ofType(init), map((action) => loadDefinition())));
        this.loadDefinition$ = createEffect(() => this.actions$.pipe(ofType(loadDefinition), withLatestFrom(this.store$.select(definitionNameSelector)), switchMap(([action, definitionName]) => definitionName
            ? this.rxDocumentDefinitionService.get(definitionName)
            : this.rxDocumentDefinitionService.getNew()), map((definition) => loadDefinitionSuccess({
            definition
        }))));
        this.loadDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(loadDefinitionSuccess), map((action) => {
            let definitionModelFromDefinition = {
                customizationOptions: {
                    scope: action.definition.scope,
                    allowOverlay: action.definition.allowOverlay
                },
                description: action.definition.description,
                documentSchema: action.definition.documentSchema,
                guid: action.definition.guid,
                lastChangedBy: action.definition.lastChangedBy,
                lastUpdateTime: action.definition.lastUpdateTime,
                name: this.rxDefinitionNameService.getDisplayName(action.definition.name),
                overlayDescriptor: action.definition.overlayDescriptor,
                overlayGroupId: action.definition.overlayGroupId,
                owner: action.definition.owner
            };
            return initDefinitionData({
                definition: action.definition,
                definitionModel: definitionModelFromDefinition
            });
        })));
        this.revertCustomization$ = createEffect(() => this.actions$.pipe(ofType(revertCustomization), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(bundleIdSelector)), switchMap(([_, definitionModel, bundleId]) => this.rxDocumentDefinitionService.revertCustomization(`${bundleId}:${definitionModel.name}`)), map(() => loadDefinition())));
        this.markPristine$ = createEffect(() => this.actions$.pipe(ofType(initDefinitionData, saveDefinition), map(() => markDesignerPristine())));
        this.markDirty$ = createEffect(() => this.actions$.pipe(ofType(updateDefinitionModelFromDesigner, saveDefinitionError), map(() => markDesignerDirty())));
        this.saveDefinition$ = createEffect(() => this.actions$.pipe(ofType(saveDefinition), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(originalDefinitionSelector), this.store$.select(bundleIdSelector)), switchMap(([_, definitionModel, originalDefinition, bundleId]) => {
            const definition = this.documentDesignerService.getDefinitionFromDefinitionModel(definitionModel, bundleId);
            return (definition.lastUpdateTime
                ? this.rxDefinitionUpdateService.execute(this.rxDocumentDefinitionService.update.bind(this.rxDocumentDefinitionService, Object.assign(Object.assign({}, originalDefinition), definition)))
                : this.rxDocumentDefinitionService.create(definition)).pipe(map((response) => {
                const definitionName = decodeURIComponent(last(response === null || response === void 0 ? void 0 : response.headers.get('location').split('/')) || '') ||
                    this.rxDefinitionNameService.getDefinitionName(bundleId, definitionModel.name);
                return saveDefinitionSuccess({
                    savedDefinitionName: definitionName
                });
            }), catchError((error) => {
                this.errorHandler.handleError(error);
                return of(saveDefinitionError());
            }));
        })));
        this.saveDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(saveDefinitionSuccess), withLatestFrom(this.store$.select(definitionNameSelector)), tap(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-saved-successfully.message', {
                definitionTypeDisplayName: this.translateService.instant('com.bmc.arsys.rx.client.document-definition.label')
            }));
        }), filter(([action, definitionName]) => !!definitionName), map(() => loadDefinition())));
    }
}
DocumentDesignerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerEffects, deps: [{ token: i1.Store }, { token: i2$1.Actions }, { token: i0.ErrorHandler }, { token: i2.RxDefinitionUpdateService }, { token: DocumentDesignerService }, { token: i2.RxNotificationService }, { token: i4.TranslateService }, { token: i6$1.RxDocumentDefinitionService }, { token: i2.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Injectable });
DocumentDesignerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2$1.Actions }, { type: i0.ErrorHandler }, { type: i2.RxDefinitionUpdateService }, { type: DocumentDesignerService }, { type: i2.RxNotificationService }, { type: i4.TranslateService }, { type: i6$1.RxDocumentDefinitionService }, { type: i2.RxDefinitionNameService }]; } });

class DocumentDesignerModule {
}
DocumentDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DocumentDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerModule, declarations: [DocumentDesignerComponent], imports: [AdaptCodeViewerModule,
        AdaptRxLabelModule,
        AdaptSidebarModule,
        AdaptTabsModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        RxDesignerHeaderModule,
        RxFormBuilderModule,
        RxJsonViewerModule,
        RxValidationIssuesModule,
        ReactiveFormsModule, i1.StoreFeatureModule, i2$1.EffectsFeatureModule], exports: [DocumentDesignerComponent] });
DocumentDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerModule, imports: [[
            AdaptCodeViewerModule,
            AdaptRxLabelModule,
            AdaptSidebarModule,
            AdaptTabsModule,
            CommonModule,
            FormsModule,
            TranslateModule,
            RxDesignerHeaderModule,
            RxFormBuilderModule,
            RxJsonViewerModule,
            RxValidationIssuesModule,
            ReactiveFormsModule,
            StoreModule.forFeature(RX_DOCUMENT_DESIGNER.featureSelector, {
                model: documentDesignerModelReducer
            }),
            EffectsModule.forFeature([DocumentDesignerEffects])
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DocumentDesignerComponent],
                    exports: [DocumentDesignerComponent],
                    imports: [
                        AdaptCodeViewerModule,
                        AdaptRxLabelModule,
                        AdaptSidebarModule,
                        AdaptTabsModule,
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        RxDesignerHeaderModule,
                        RxFormBuilderModule,
                        RxJsonViewerModule,
                        RxValidationIssuesModule,
                        ReactiveFormsModule,
                        StoreModule.forFeature(RX_DOCUMENT_DESIGNER.featureSelector, {
                            model: documentDesignerModelReducer
                        }),
                        EffectsModule.forFeature([DocumentDesignerEffects])
                    ]
                }]
        }] });

class DocumentDesignerPageModule {
}
DocumentDesignerPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DocumentDesignerPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerPageModule, declarations: [DocumentDesignerPageComponent], imports: [CommonModule, DocumentDesignerModule, TranslateModule], exports: [DocumentDesignerPageComponent] });
DocumentDesignerPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerPageModule, imports: [[CommonModule, DocumentDesignerModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DocumentDesignerPageComponent],
                    exports: [DocumentDesignerPageComponent],
                    imports: [CommonModule, DocumentDesignerModule, TranslateModule]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DocumentDesignerPageComponent, DocumentDesignerPageModule };
//# sourceMappingURL=helix-platform-document-designer.js.map
