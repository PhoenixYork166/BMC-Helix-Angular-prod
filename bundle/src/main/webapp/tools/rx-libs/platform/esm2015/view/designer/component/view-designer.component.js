import { Component, ElementRef, EventEmitter, InjectFlags, InjectionToken, Injector, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { RxAssociationDefinitionCacheService } from '@helix/platform/association/api';
import { RxNamedListDefinitionCacheService } from '@helix/platform/named-list/api';
import { RxProcessDefinitionCacheService } from '@helix/platform/process/api';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RX_APPLICATION, RxComponentCanDeactivateGuard, RxDefinitionNameService, RxFeatureService, RxLogService, RxNotificationService } from '@helix/platform/shared/api';
import { RX_EXPRESSION_EDITOR, RX_REVERT_CUSTOMIZATION, RX_VALIDATION_FORM_CONTROL, RxDefinitionPickerCacheService, RxExpressionEditorService, RxGainsightConfiguratorService } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService, RxUtilityModalsService, ValidationIssueType } from '@helix/platform/ui-kit';
import { RxViewComponentType, RxViewDefinitionCacheService, RxViewDefinitionService, ViewDefinitionType } from '@helix/platform/view/api';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, filter as _filter, get, isEqual, isUndefined, pick, set, toPath } from 'lodash';
import { BehaviorSubject, combineLatest, EMPTY, of, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, skip, startWith, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ViewDesignerFacade } from '../+state/view-designer.facade';
import { RxViewDefinitionGeneratorService } from '../core/view-definition-generator.service';
import { RxViewDesignerModels } from '../core/view-designer-models.service';
import { RxViewModel } from '../model/view-model.service';
import { RxViewDesignerHelperService } from './view-designer-helper.service';
import * as i0 from "@angular/core";
import * as i1 from "../+state/view-designer.facade";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@helix/platform/named-list/api";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@ngx-translate/core";
import * as i7 from "./view-designer-helper.service";
import * as i8 from "@helix/platform/view/api";
import * as i9 from "../core/view-definition-generator.service";
import * as i10 from "../core/view-designer-models.service";
import * as i11 from "@helix/platform/record/api";
import * as i12 from "@helix/platform/association/api";
import * as i13 from "@helix/platform/process/api";
import * as i14 from "../components/palette/view-designer-palette.component";
import * as i15 from "@bmc-ux/adapt-angular";
import * as i16 from "../components/view-designer-canvas/view-designer-canvas.component";
import * as i17 from "@angular/common";
export const RX_VIEW_MODEL = new InjectionToken('RX_VIEW_MODEL');
export class RxViewDesignerComponent {
    constructor(viewDesignerFacade, rxNotificationService, rxDefinitionPickerCacheService, rxNamedListDefinitionCacheService, rxModalService, translateService, rxUtilityModalsService, rxViewDesignerHelperService, rxExpressionEditorService, rxViewDefinitionService, rxComponentCanDeactivateGuard, rxViewDefinitionGeneratorService, rxViewDesignerModels, rxLogService, injector, renderer, rxRecordDefinitionCacheService, rxAssociationDefinitionCacheService, rxProcessDefinitionCacheService, rxViewDefinitionCacheService, rxGainsightConfiguratorService, rxDefinitionNameService, rxFeatureService) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxNotificationService = rxNotificationService;
        this.rxDefinitionPickerCacheService = rxDefinitionPickerCacheService;
        this.rxNamedListDefinitionCacheService = rxNamedListDefinitionCacheService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxViewDesignerHelperService = rxViewDesignerHelperService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxViewDefinitionGeneratorService = rxViewDefinitionGeneratorService;
        this.rxViewDesignerModels = rxViewDesignerModels;
        this.rxLogService = rxLogService;
        this.injector = injector;
        this.renderer = renderer;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxAssociationDefinitionCacheService = rxAssociationDefinitionCacheService;
        this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
        this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
        this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxFeatureService = rxFeatureService;
        this.viewDefinitionSaved = new EventEmitter();
        this.viewDefinitionErrorLoading = new EventEmitter();
        this.closeDesigner = new EventEmitter();
        this.destroyed$ = new ReplaySubject(1);
        this.inspectorFocusEditorSubject = new Subject();
        this.isViewDefinitionChanged$ = new BehaviorSubject(false);
        this.validationIssues$ = this.rxViewDesignerHelperService.validationIssues$.pipe(shareReplay(1), takeUntil(this.destroyed$));
        this.breadcrumbItems$ = this.rxViewDesignerHelperService.breadcrumbItems$;
        this.canvasLayout$ = this.rxViewDesignerHelperService.canvasLayout$;
        this.canvasDndListIds = this.rxViewDesignerHelperService.canvasDndListIds;
        this.extensionViewRootComponentType = RxViewComponentType.RecordEditor;
        // Component UI State
        this.isDesignMode = true;
        this.isStencilExpanded = true;
        this.isInspectorExpanded = true;
        this.inspectorFocusEditor$ = this.inspectorFocusEditorSubject.asObservable();
        this.viewComponentInspectorEmptyText$ = this.viewDesignerFacade.selectedComponentInspectorLayout$.pipe(switchMap((selectedComponentLayout) => selectedComponentLayout
            ? of(null)
            : this.viewDesignerFacade.selectedComponentGuid$.pipe(withLatestFrom(this.viewDesignerFacade.viewModel$), map(([selectedComponentGuid, viewModel]) => selectedComponentGuid && selectedComponentGuid !== viewModel.guid
                ? 'Selected component has no properties.'
                : 'Select a component to view its properties here.'))), shareReplay({
            refCount: true,
            bufferSize: 1
        }));
        this.selectedComponentModel$ = this.viewDesignerFacade.selectedComponentGuid$.pipe(map((guid) => this.rxViewDesignerModels.get(guid)));
        this.isReadOnly$ = this.viewDesignerFacade.isViewReadOnly$;
        this.paletteComponents$ = combineLatest([
            this.viewDesignerFacade.isExtensionView$.pipe(tap((isExtensionView) => (this.isExtensionView = isExtensionView))),
            this.viewDesignerFacade.isExtensionContainerSet$.pipe(tap((isExtensionContainerSet) => (this.isExtensionContainerSet = isExtensionContainerSet))),
            this.rxViewDesignerHelperService
                .getLicensedComponents()
                .pipe(map((descriptors) => this.configuration.paletteComponentsPredicate
                ? descriptors.filter((descriptor) => this.configuration.paletteComponentsPredicate(descriptor))
                : descriptors))
        ]).pipe(switchMap(([isExtensionView, isExtensionContainerSet, componentDescriptors]) => isExtensionView
            ? this.viewDesignerFacade.firstViewComponentModelType$.pipe(map((firstViewComponentType) => firstViewComponentType === this.extensionViewRootComponentType
                ? componentDescriptors.filter(({ type }) => type !== this.extensionViewRootComponentType &&
                    this.rxViewDesignerHelperService.extensionViewAllowedComponentTypes.has(type))
                : componentDescriptors.filter(({ type }) => type === this.extensionViewRootComponentType)))
            : of(componentDescriptors)));
        const customViewModel = this.injector.get(RX_VIEW_MODEL, null, InjectFlags.Optional);
        this.rxViewModel = customViewModel || this.injector.get(RxViewModel);
        this.rxDefinitionPickerCacheService.registerConsumer();
        this.rxNamedListDefinitionCacheService.registerConsumer(this.destroyed$);
        this.rxAssociationDefinitionCacheService.registerConsumer(this.destroyed$);
        this.rxProcessDefinitionCacheService.registerConsumer(this.destroyed$);
        this.rxRecordDefinitionCacheService.registerConsumer(this.destroyed$);
        this.rxViewDefinitionCacheService.registerConsumer(this.destroyed$);
    }
    ngOnInit() {
        this.isPreviewAvailable$ = this.viewDesignerFacade.getViewPropertyValue('lastUpdateTime').pipe(map((lastUpdateTime) => !this.configuration.disablePreview &&
            (Boolean(lastUpdateTime) || !isUndefined(this.configuration.viewDefinitionName))), takeUntil(this.destroyed$));
        this.viewDefinitionName$ = this.viewDesignerFacade.getViewPropertyValue('name');
        this.viewDesignerFacade
            .getViewPropertyValue('pageComponent')
            .pipe(takeUntil(this.destroyed$))
            .subscribe((pageComponent) => {
            this.isPageView = Boolean(pageComponent);
        });
        this.viewDesignerFacade.viewDefinitionSaveSuccess$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(({ viewDefinitionName }) => {
            this.rxNotificationService.addSuccessMessage('View definition saved successfully.');
            this.viewDefinitionSaved.emit(viewDefinitionName);
            this.initViewDesigner();
        });
        this.viewDesignerFacade.viewDefinitionLoadError$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.viewDefinitionErrorLoading.emit());
        this.hasValidationErrors$ = this.validationIssues$.pipe(map((validationIssues) => Boolean(_filter(validationIssues, {
            issues: [{ type: ValidationIssueType.Error }]
        }).length)), distinctUntilChanged());
        this.hasValidationWarning$ = this.validationIssues$.pipe(map((validationIssues) => Boolean(_filter(validationIssues, {
            issues: [{ type: ValidationIssueType.Warning }]
        }).length)), distinctUntilChanged());
        this.isSaveButtonDisabled$ = combineLatest([
            this.hasValidationErrors$,
            this.viewDesignerFacade.areViewModelsReady$,
            this.isViewDefinitionChanged$,
            this.isReadOnly$
        ]).pipe(map(([hasValidationErrors, areViewModelsReady, isChanged, isReadOnly]) => hasValidationErrors || !areViewModelsReady || !isChanged || isReadOnly), startWith(true));
        this.isReadOnly$.pipe(takeUntil(this.destroyed$)).subscribe((isReadOnly) => {
            if (isReadOnly) {
                this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.read-only-definition-warning.message'));
            }
        });
        if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
            this.viewDefinitionName$.pipe(take(1)).subscribe((viewDefinitionName) => {
                this.rxGainsightConfiguratorService.updateGlobalContext({
                    subProductLevel1: {
                        name: 'Design'
                    },
                    subProductLevel2: {
                        name: this.rxDefinitionNameService.getDisplayName(viewDefinitionName) == RX_APPLICATION.shellDefinitionName
                            ? 'Shell designer'
                            : 'View designer'
                    }
                });
            });
        }
    }
    ngOnChanges(changes) {
        if (changes.configuration.currentValue) {
            this.initViewDesigner(true);
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.inspectorFocusEditorSubject.complete();
        this.isViewDefinitionChanged$.complete();
        this.rxDefinitionPickerCacheService.unRegisterConsumer();
        this.viewDesignerFacade.destroyViewDesigner();
        this.rxGainsightConfiguratorService.removeGlobalContext(['subProductLevel2', 'subProductLevel3']);
    }
    initViewDesigner(dispatchInitViewDesignerAction = false) {
        var _a;
        // Mark view definition as not changed if it's not. This needs for scenario when view designer
        // will be reinitialized with another view definition name and current view is dirty.
        if (this.isViewDefinitionChanged$.getValue()) {
            this.isViewDefinitionChanged$.next(false);
        }
        (_a = this.viewDefinitionChangeSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        if (dispatchInitViewDesignerAction) {
            this.viewDesignerFacade.initViewDesigner(pick(this.configuration, ['bundleId', 'viewDefinitionName', 'layoutTemplate']));
        }
        this.initViewDefinitionChangeSubscription();
    }
    initViewDefinitionChangeSubscription() {
        this.viewDefinitionChangeSubscription = this.viewDesignerFacade.areViewModelsReady$
            .pipe(
        // Wait until models state will be updated with view and view components data.
        filter(Boolean), take(1), switchMap(() => combineLatest([this.viewDesignerFacade.viewModel$, this.viewDesignerFacade.viewComponentModels$]).pipe(map(([viewModel, viewComponentModels]) => this.rxViewDefinitionGeneratorService.generate(viewModel, viewComponentModels)), distinctUntilChanged(isEqual), 
        // Skip first emit from distinctUntilChanged.
        skip(1), 
        // Complete after first emit, it's considered that view definition gets changed so no needs for further emits.
        take(1), takeUntil(this.destroyed$))), takeUntil(this.destroyed$))
            .subscribe(() => {
            this.isViewDefinitionChanged$.next(true);
        });
    }
    onSelectComponent(guid) {
        this.viewDesignerFacade.selectComponent(guid);
    }
    onDropComponent(data) {
        this.viewDesignerFacade.insertComponent(data);
    }
    onRemoveComponent(guid) {
        this.rxUtilityModalsService
            .confirm('Are you sure you want to delete this view component?')
            .then((isConfirmed) => {
            if (isConfirmed) {
                this.viewDesignerFacade.removeViewComponents([guid], true);
                if (this.isPageView) {
                    this.viewDesignerFacade.updateViewProperties({ pageComponent: null });
                }
            }
        });
    }
    onInspectorTabChange(event) {
        this.viewDesignerFacade.selectInspectorTab({ tabId: event.index });
    }
    toggleDesignMode() {
        if (this.isDesignMode) {
            this.viewDesignerFacade.generateViewDefinition();
        }
        this.isDesignMode = !this.isDesignMode;
    }
    onComponentPropertiesChange(properties) {
        this.viewDesignerFacade.updateSelectedComponentProperties(properties);
    }
    onEditorEvent(event, inspectorElementRef) {
        if (event.type === RX_VALIDATION_FORM_CONTROL.events.correctValidationIssue) {
            this.correctValidationIssue(event.payload.componentGuid, event.payload.propertyName);
        }
        if (event.type === RX_REVERT_CUSTOMIZATION.events.revertCustomization) {
            this.revertCustomization();
        }
        if (event.type === RX_EXPRESSION_EDITOR.events.openExpressionEditor) {
            this.openExpressionEditor(event.payload, inspectorElementRef);
        }
    }
    getExpressionProperties(inspectorElementRef) {
        return (this.viewComponentPropertyInspectorElementRef === inspectorElementRef
            ? this.viewDesignerFacade.selectedComponentProperties$
            : this.viewDesignerFacade.viewModel$).pipe(map((properties) => Array.from(this.renderer
            .selectRootElement(inspectorElementRef.nativeElement, true)
            .querySelectorAll('rx-expression-form-control')).map((element) => {
            const propertyPath = element.getAttribute('property-path');
            return {
                path: propertyPath,
                value: get(properties, propertyPath),
                label: element.getAttribute('property-label')
            };
        })));
    }
    openExpressionEditor(payload, inspectorElementRef) {
        const isComponentInspectorChange = this.viewComponentPropertyInspectorElementRef === inspectorElementRef;
        const props$ = isComponentInspectorChange
            ? this.viewDesignerFacade.selectedComponentProperties$
            : this.viewDesignerFacade.viewModel$;
        combineLatest([this.viewDesignerFacade.selectedComponentGuid$, props$])
            .pipe(take(1), switchMap(([componentGuid, properties]) => {
            const model = isComponentInspectorChange ? this.rxViewDesignerModels.get(componentGuid) : this.rxViewModel;
            const expressionConfigurator = model === null || model === void 0 ? void 0 : model.expressionConfigurator;
            if (expressionConfigurator) {
                return this.rxExpressionEditorService
                    .openEditor({
                    property: {
                        path: payload.propertyPath,
                        value: get(properties, payload.propertyPath),
                        label: payload.propertyLabel
                    },
                    isReadOnly: payload.isReadOnly,
                    expressionConfigurator,
                    legend: [
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.function.label'),
                            icon: 'd-icon-mathematical_function'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                            icon: 'd-icon-dollar'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component.label'),
                            icon: 'd-icon-file_o'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component-property.label'),
                            icon: 'd-icon-file_o_gear'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-input-parameter.label'),
                            icon: 'd-icon-arrow_right_square_input'
                        }
                    ],
                    expressionPropertyNavigator: {
                        getProperties: this.getExpressionProperties.bind(this, inspectorElementRef)
                    }
                })
                    .pipe(withLatestFrom(props$), map(([{ path, value }, props]) => {
                    if (props.hasOwnProperty(path)) {
                        return { [path]: value };
                    }
                    else {
                        // Don't override nested model properties e.g,
                        // when 'path' = "outputParams[1].source" and 'value' = "${bar}", model will be updated from:
                        // {..., outputParams: [{name: 'foo', source: ${foo}}, {name: 'bar', source: null}] } to:
                        // {..., outputParams: [{name: 'foo', source: ${foo}}, {name: 'bar', source: ${bar}}] }
                        const headPropertyName = toPath(path)[0];
                        // clone value because "set" mutates object, otherwise expression
                        // form control component will not be updated with new value.
                        return set({ [headPropertyName]: cloneDeep(props[headPropertyName]) }, path, value);
                    }
                }));
            }
            else {
                this.rxLogService.debug('View designer: Expression editor cannot be opened without expression configurator.');
                return EMPTY;
            }
        }), takeUntil(this.destroyed$))
            .subscribe((value) => isComponentInspectorChange
            ? this.viewDesignerFacade.updateSelectedComponentProperties(value)
            : this.viewDesignerFacade.updateViewProperties(value));
    }
    saveViewDefinition() {
        this.viewDesignerFacade.viewModel$
            .pipe(take(1), switchMap((viewModel) => {
            const message = viewModel.type === ViewDefinitionType.Shell
                ? 'If you save your changes now, you will not be able to run this application using the old UI. Do you want to continue?'
                : 'If you save this view definition, you will not be able to open it in the old view designer. Do you want to continue?';
            if (viewModel.isAngularJsView) {
                return this.rxModalService.confirm({
                    title: 'Warning',
                    modalStyle: RX_MODAL.modalStyles.warning,
                    message
                });
            }
            else {
                return of(true);
            }
        }), filter(Boolean), takeUntil(this.destroyed$))
            .subscribe(() => {
            this.viewDesignerFacade.saveViewDefinition();
        });
    }
    onCorrectIssue(validationIssue) {
        this.correctValidationIssue(validationIssue.data.guid, validationIssue.data.propertyName, validationIssue.data.data);
    }
    correctValidationIssue(guid, propertyName, data) {
        this.viewDesignerFacade.selectComponent(guid);
        // need to wait until inspector will be visible
        // there are no way to focus to invisible elements
        setTimeout(() => this.inspectorFocusEditorSubject.next({ editorName: propertyName, data }), 10);
    }
    revertCustomization() {
        this.viewDefinitionName$
            .pipe(switchMap((viewDefinitionName) => this.rxViewDefinitionService.revertCustomization(viewDefinitionName)), takeUntil(this.destroyed$))
            .subscribe(() => {
            this.rxComponentCanDeactivateGuard.disable();
            window.location.reload();
        });
    }
    onViewPropertiesChange(properties) {
        this.viewDesignerFacade.updateViewProperties(properties);
    }
    showPreview() {
        this.viewDesignerFacade.runPreview();
    }
    canDeactivate() {
        let canDeactivate = true;
        combineLatest([this.isViewDefinitionChanged$, this.isReadOnly$])
            .pipe(map(([isChanged, isReadOnly]) => !isChanged || isReadOnly), take(1))
            .subscribe((isPristineOrReadOnly) => {
            canDeactivate = isPristineOrReadOnly;
        });
        return canDeactivate;
    }
    onBeforeComponentDropInRoot(event) {
        if (this.isExtensionView) {
            if (!this.isExtensionContainerSet) {
                this.rxNotificationService.addWarningMessage('Select Extension container before adding view components.');
                event.preventDrop = true;
            }
            else if (event.draggedViewComponentDescriptor.type !== RxViewComponentType.RecordEditor) {
                this.rxNotificationService.addWarningMessage('This view component can only be added inside a Record editor.');
                event.preventDrop = true;
            }
        }
    }
}
RxViewDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerComponent, deps: [{ token: i1.ViewDesignerFacade }, { token: i2.RxNotificationService }, { token: i3.RxDefinitionPickerCacheService }, { token: i4.RxNamedListDefinitionCacheService }, { token: i5.RxModalService }, { token: i6.TranslateService }, { token: i5.RxUtilityModalsService }, { token: i7.RxViewDesignerHelperService }, { token: i3.RxExpressionEditorService }, { token: i8.RxViewDefinitionService }, { token: i2.RxComponentCanDeactivateGuard }, { token: i9.RxViewDefinitionGeneratorService }, { token: i10.RxViewDesignerModels }, { token: i2.RxLogService }, { token: i0.Injector }, { token: i0.Renderer2 }, { token: i11.RxRecordDefinitionCacheService }, { token: i12.RxAssociationDefinitionCacheService }, { token: i13.RxProcessDefinitionCacheService }, { token: i8.RxViewDefinitionCacheService }, { token: i3.RxGainsightConfiguratorService }, { token: i2.RxDefinitionNameService }, { token: i2.RxFeatureService }], target: i0.ɵɵFactoryTarget.Component });
RxViewDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxViewDesignerComponent, selector: "rx-view-designer", inputs: { configuration: "configuration" }, outputs: { viewDefinitionSaved: "viewDefinitionSaved", viewDefinitionErrorLoading: "viewDefinitionErrorLoading", closeDesigner: "closeDesigner" }, providers: [RxViewModel], viewQueries: [{ propertyName: "viewPropertyInspectorElementRef", first: true, predicate: ["viewPropertyInspector"], descendants: true, read: ElementRef }, { propertyName: "viewComponentPropertyInspectorElementRef", first: true, predicate: ["viewComponentPropertyInspector"], descendants: true, read: ElementRef }], usesOnChanges: true, ngImport: i0, template: "<rx-designer-header\n  [bundleName]=\"viewDesignerFacade.bundleFriendlyName$ | async\"\n  [breadcrumbItems]=\"breadcrumbItems$ | async\"\n  [isDesignMode]=\"isDesignMode\"\n  [isPreviewAvailable]=\"isPreviewAvailable$ | async\"\n  [isSaveButtonDisabled]=\"isSaveButtonDisabled$ | async\"\n  (breadcrumbSelected)=\"onSelectComponent($event.data.guid)\"\n  (toggleDesignMode)=\"toggleDesignMode()\"\n  (showPreview)=\"showPreview()\"\n  (save)=\"saveViewDefinition()\"\n  (closeDesigner)=\"closeDesigner.emit()\"\n></rx-designer-header>\n\n<div class=\"rx-component-view-designer\" [hidden]=\"!isDesignMode\">\n  <rx-blade\n    [title]=\"'Palette'\"\n    rx-id=\"palette\"\n    (toggle)=\"isStencilExpanded = !isStencilExpanded\"\n    [isExpanded]=\"isStencilExpanded\"\n  >\n    <rx-view-designer-palette\n      *ngIf=\"!isPageView && !(isReadOnly$ | async)\"\n      [components]=\"paletteComponents$ | async\"\n      [allowedDropListIds]=\"canvasDndListIds\"\n    ></rx-view-designer-palette>\n\n    <adapt-alert\n      *ngIf=\"isPageView && !(isReadOnly$ | async)\"\n      class=\"p-3\"\n      [config]=\"{\n        content:\n          'There are no view components to display. View with a Page view component cannot contain any other view components.',\n        variant: 'info',\n        type: 'inline'\n      }\"\n    ></adapt-alert>\n\n    <adapt-alert\n      *ngIf=\"!(viewDesignerFacade.isViewDefinitionLoading$ | async) && isReadOnly$ | async\"\n      class=\"p-3\"\n      [config]=\"{\n        content: 'This view is not editable. There are no view components to display.',\n        variant: 'info',\n        type: 'inline'\n      }\"\n    ></adapt-alert>\n  </rx-blade>\n\n  <section class=\"rx-view-designer-container\">\n    <rx-view-designer-canvas\n      class=\"flex-grow-1\"\n      [layout]=\"canvasLayout$ | async\"\n      [isReadOnly]=\"isReadOnly$ | async\"\n      (componentSelect)=\"onSelectComponent($event)\"\n      (componentRemove)=\"onRemoveComponent($event)\"\n      (componentDrop)=\"onDropComponent($event)\"\n      (beforeComponentDropInRoot)=\"onBeforeComponentDropInRoot($event)\"\n    ></rx-view-designer-canvas>\n  </section>\n\n  <rx-blade\n    [title]=\"'Properties'\"\n    dockTo=\"right\"\n    rx-id=\"properties\"\n    (toggle)=\"isInspectorExpanded = !isInspectorExpanded\"\n    [isExpanded]=\"isInspectorExpanded\"\n  >\n    <adapt-tabset\n      [tab-active]=\"viewDesignerFacade.selectedInspectorTabId$ | async\"\n      (tab-active-changed)=\"onInspectorTabChange($event)\"\n      [class.has-validation-warning]=\"hasValidationWarning$ | async\"\n      [class.has-validation-errors]=\"hasValidationErrors$ | async\"\n      customCssTabContent=\"p-0\"\n      justify=\"justified\"\n    >\n      <adapt-tab-panel icon=\"d-icon-pencil\">\n        <rx-form-builder\n          #viewPropertyInspector\n          (modelChange)=\"onViewPropertiesChange($event)\"\n          (editorEvent)=\"onEditorEvent($event, viewPropertyInspectorElementRef)\"\n          [focusEditor$]=\"inspectorFocusEditor$\"\n          [config]=\"viewDesignerFacade.viewInspectorLayout$ | async\"\n          [model]=\"viewDesignerFacade.viewModel$ | async\"\n          [isReadOnly]=\"isReadOnly$ | async\"\n        ></rx-form-builder>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel icon=\"d-icon-gear\">\n        <rx-form-builder\n          rxInspector\n          [designerItemModel]=\"selectedComponentModel$ | async\"\n          #viewComponentPropertyInspector\n          (modelChange)=\"onComponentPropertiesChange($event)\"\n          (editorEvent)=\"onEditorEvent($event, viewComponentPropertyInspectorElementRef)\"\n          [focusEditor$]=\"inspectorFocusEditor$\"\n          [config]=\"viewDesignerFacade.selectedComponentInspectorLayout$ | async\"\n          [model]=\"viewDesignerFacade.selectedComponentProperties$ | async\"\n          [guid]=\"viewDesignerFacade.selectedComponentGuid$ | async\"\n          [isReadOnly]=\"isReadOnly$ | async\"\n        ></rx-form-builder>\n\n        <adapt-alert\n          [hidden]=\"!(viewComponentInspectorEmptyText$ | async)\"\n          class=\"p-3\"\n          [config]=\"{\n            content: viewComponentInspectorEmptyText$ | async,\n            variant: 'info',\n            type: 'inline'\n          }\"\n        ></adapt-alert>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel icon=\"d-icon-exclamation_triangle\">\n        <rx-validation-issues\n          [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.view-definition.label' | translate\"\n          (correctIssue)=\"onCorrectIssue($event)\"\n          [issueSections]=\"validationIssues$ | async\"\n        ></rx-validation-issues>\n      </adapt-tab-panel>\n    </adapt-tabset>\n  </rx-blade>\n</div>\n\n<adapt-code-viewer\n  *ngIf=\"!isDesignMode\"\n  [code]=\"viewDesignerFacade.viewDefinition$ | async | json\"\n  [lang]=\"'javascript'\"\n  [hasToolbar]=\"false\"\n  [theme]=\"'light'\"\n  class=\"full-size\"\n>\n</adapt-code-viewer>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-component-view-designer{display:flex;flex-grow:1;height:calc(100% - 50px);overflow:hidden}.rx-view-designer-container{display:flex;flex-direction:column;flex-grow:1;overflow:auto;padding:2.2rem 1rem 1rem}:host ::ng-deep .has-validation-warning:not(.has-validation-errors) .nav-link .d-icon-exclamation_triangle{color:#f1b521}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}\n"], components: [{ type: i3.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i5.RxBladeComponent, selector: "rx-blade", inputs: ["title", "isExpanded", "dockTo"], outputs: ["toggle"] }, { type: i14.ViewDesignerPaletteComponent, selector: "rx-view-designer-palette", inputs: ["components", "allowedDropListIds"] }, { type: i15.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i16.ViewDesignerCanvasComponent, selector: "rx-view-designer-canvas", inputs: ["layout", "isReadOnly"], outputs: ["componentSelect", "componentDrop", "componentRemove", "beforeComponentDropInRoot"] }, { type: i15.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i15.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i3.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i5.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i15.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i17.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.InspectorDirective, selector: "[rxInspector]", inputs: ["designerItemModel"] }], pipes: { "async": i17.AsyncPipe, "translate": i6.TranslatePipe, "json": i17.JsonPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-view-designer',
                    templateUrl: './view-designer.component.html',
                    styleUrls: ['./view-designer.component.scss'],
                    providers: [RxViewModel]
                }]
        }], ctorParameters: function () { return [{ type: i1.ViewDesignerFacade }, { type: i2.RxNotificationService }, { type: i3.RxDefinitionPickerCacheService }, { type: i4.RxNamedListDefinitionCacheService }, { type: i5.RxModalService }, { type: i6.TranslateService }, { type: i5.RxUtilityModalsService }, { type: i7.RxViewDesignerHelperService }, { type: i3.RxExpressionEditorService }, { type: i8.RxViewDefinitionService }, { type: i2.RxComponentCanDeactivateGuard }, { type: i9.RxViewDefinitionGeneratorService }, { type: i10.RxViewDesignerModels }, { type: i2.RxLogService }, { type: i0.Injector }, { type: i0.Renderer2 }, { type: i11.RxRecordDefinitionCacheService }, { type: i12.RxAssociationDefinitionCacheService }, { type: i13.RxProcessDefinitionCacheService }, { type: i8.RxViewDefinitionCacheService }, { type: i3.RxGainsightConfiguratorService }, { type: i2.RxDefinitionNameService }, { type: i2.RxFeatureService }]; }, propDecorators: { configuration: [{
                type: Input
            }], viewDefinitionSaved: [{
                type: Output
            }], viewDefinitionErrorLoading: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }], viewPropertyInspectorElementRef: [{
                type: ViewChild,
                args: ['viewPropertyInspector', { read: ElementRef }]
            }], viewComponentPropertyInspectorElementRef: [{
                type: ViewChild,
                args: ['viewComponentPropertyInspector', { read: ElementRef }]
            }] } });
//# sourceMappingURL=view-designer.component.js.map