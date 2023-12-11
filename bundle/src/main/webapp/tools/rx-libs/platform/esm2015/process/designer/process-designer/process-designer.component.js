import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AdaptSidebarComponent } from '@bmc-ux/adapt-angular';
import { BehaviorSubject, combineLatest, forkJoin, merge, of, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, startWith, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { find, forEach, isEmpty, isEqual, reject, some } from 'lodash';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { RxGuidService, RxIdService } from '@helix/platform/utils';
import { RxBundleCacheService, RxCommandManagerService, RxDesignerCacheService, RxGlobalCacheService, RxOverlayService } from '@helix/platform/shared/api';
import { RxProcessDataDictionaryService, RxProcessDefinitionService, RxProcessElementRegistryService, RxProcessElementSearchService } from '@helix/platform/process/api';
import { RxProcessService } from '@helix/platform/process/elements';
import { RxProcessDesignerService } from './process-designer.service';
import { RxProcessDesignerGraph } from './process-designer-graph.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/process/api";
import * as i4 from "./process-designer.service";
import * as i5 from "@helix/platform/process/elements";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@helix/platform/shared/components";
import * as i8 from "@bmc-ux/adapt-angular";
import * as i9 from "@helix/platform/ui-kit";
import * as i10 from "@angular/common";
export class ProcessDesignerComponent {
    constructor(injector, rxBundleCacheService, rxCommandManagerService, rxDesignerCacheService, rxGlobalCacheService, rxGuidService, rxIdService, rxOverlayService, rxProcessDataDictionaryService, rxProcessDefinitionService, rxProcessDesignerService, rxProcessElementRegistryService, rxProcessElementSearchService, rxProcessService, translateService) {
        this.injector = injector;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxCommandManagerService = rxCommandManagerService;
        this.rxDesignerCacheService = rxDesignerCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxGuidService = rxGuidService;
        this.rxIdService = rxIdService;
        this.rxOverlayService = rxOverlayService;
        this.rxProcessDataDictionaryService = rxProcessDataDictionaryService;
        this.rxProcessDefinitionService = rxProcessDefinitionService;
        this.rxProcessDesignerService = rxProcessDesignerService;
        this.rxProcessElementRegistryService = rxProcessElementRegistryService;
        this.rxProcessElementSearchService = rxProcessElementSearchService;
        this.rxProcessService = rxProcessService;
        this.translateService = translateService;
        this.closeDesigner = new EventEmitter();
        this.definitionErrorLoading = new EventEmitter();
        this.definitionSaved = new EventEmitter();
        this.bundleIdSubject = new BehaviorSubject(null);
        this.definitionModelChangeSubject = new Subject();
        this.selectedElementModelChangeSubject = new Subject();
        this.definitionNameSubject = new BehaviorSubject(null);
        this.destroyed$ = new ReplaySubject(1);
        this.focusDefinitionInspectorSubject = new BehaviorSubject(null);
        this.focusSelectedElementInspectorSubject = new BehaviorSubject(null);
        this.graph = new RxProcessDesignerGraph({
            injector: this.injector,
            options: {
                processId: this.rxGuidService.generate()
            }
        });
        this.graphChangeSubject = new Subject();
        this.graphChange$ = this.graphChangeSubject.pipe(shareReplay(1));
        this.isDesignModeSubject = new BehaviorSubject(true);
        this.selectedElementGuidSubject = new BehaviorSubject(null);
        this.selectedElementGuid$ = this.selectedElementGuidSubject.pipe(distinctUntilChanged(isEqual), shareReplay(1));
        this.paletteElementsTree$ = forkJoin([
            this.rxBundleCacheService.getActionTypes(),
            this.rxGlobalCacheService.getBundleDescriptors(),
            this.rxGlobalCacheService.getFunctionDescriptors()
        ]).pipe(tap(([actionTypes, bundleDescriptors, functionDescriptors]) => {
            this.rxDesignerCacheService.setActionTypes(actionTypes);
            this.rxDesignerCacheService.setFunctionDescriptors(functionDescriptors);
        }), map(([actionTypes, bundleDescriptors]) => this.rxProcessDesignerService.buildPalette(actionTypes, bundleDescriptors)), shareReplay(1));
        this.definition$ = combineLatest([this.definitionNameSubject, this.paletteElementsTree$]).pipe(switchMap(([definitionName]) => definitionName ? this.rxProcessDefinitionService.get(definitionName) : this.rxProcessDefinitionService.getNew()), shareReplay(1));
        this.isReadOnly$ = combineLatest([
            this.definition$,
            this.bundleIdSubject.pipe(switchMap((bundleId) => this.rxOverlayService.areNewDefinitionsAllowed(bundleId)))
        ]).pipe(map(([definition, areNewDefinitionsAllowed]) => !areNewDefinitionsAllowed || !this.rxOverlayService.isCustomizationEnabled('allowOverlay', definition)), distinctUntilChanged(), shareReplay(1));
        this.definitionModelFromDefinition$ = this.definition$.pipe(map((definition) => this.rxProcessService.getModelFromDefinition(definition, this.configuration.bundleId)));
        this.graph$ = combineLatest([this.definition$, this.definitionModelFromDefinition$, this.isReadOnly$]).pipe(tap(([definition, definitionModelFromDefinition, isReadOnly]) => {
            if (!isReadOnly) {
                this.graph.on('add', (element, elements, options) => {
                    this.graphChangeSubject.next(this.graph);
                });
                this.graph.on('change', (element, elementModel, changedProperty) => {
                    if (!element.changed.position) {
                        this.graphChangeSubject.next(this.graph);
                    }
                });
            }
            this.graph.loadGraphFromDefinition(definition);
            this.graph.addDefaultElements(definitionModelFromDefinition);
        }), map(() => this.graph), shareReplay(1));
        this.definitionModelFromGraph$ = this.graphChange$.pipe(map((graph) => graph.getCell(graph.get('processId')).prop('definitionModel')), distinctUntilChanged(isEqual));
        this.definitionModel$ = merge(this.definitionModelFromDefinition$, this.definitionModelFromGraph$).pipe(shareReplay(1));
        this.definitionInspectorConfig$ = this.definitionModel$.pipe(map((definitionModel) => this.rxProcessService.getInspectorConfig(definitionModel)));
        this.selectedElementModelFromDefinition$ = combineLatest([this.definition$, this.selectedElementGuid$]).pipe(map(([definition, selectedElementGuid]) => {
            let selectedElementModel = null;
            if (selectedElementGuid) {
                const flowElement = this.rxProcessElementSearchService.find(definition, {
                    guid: selectedElementGuid
                });
                if (flowElement) {
                    const selectedElement = find(JSON.parse(definition.layout).cells, {
                        id: this.rxIdService.getBase(selectedElementGuid)
                    });
                    const elementService = this.rxProcessElementRegistryService.get(selectedElement.type).elementService;
                    selectedElementModel = elementService.getModelFromDefinition(flowElement);
                }
            }
            return selectedElementModel;
        }));
        this.selectedElementModelFromGraph$ = combineLatest([this.graphChange$, this.selectedElementGuid$]).pipe(map(([graph, selectedElementGuid]) => {
            let selectedElementModel = null;
            if (selectedElementGuid) {
                const selectedElementCell = graph.getCell(this.rxIdService.getBase(selectedElementGuid));
                selectedElementModel = selectedElementCell.prop('elementModel');
            }
            return selectedElementModel;
        }));
        this.selectedElementModel$ = merge(this.selectedElementModelFromDefinition$, this.selectedElementModelFromGraph$).pipe(tap((selectedElementModel) => {
            var _a;
            if ((_a = this.inspectorSidebar) === null || _a === void 0 ? void 0 : _a.isPanelOpened) {
                if (isEmpty(selectedElementModel)) {
                    this.openInspectorSidebarPanel(0);
                }
                else {
                    this.openInspectorSidebarPanel(1);
                }
            }
        }), shareReplay(1));
        this.selectedElementInspectorConfig$ = combineLatest([this.selectedElementModel$, this.definitionModel$]).pipe(map(([selectedElementModel, definitionModel]) => {
            let selectedElementInspectorConfig = null;
            if (selectedElementModel) {
                const elementService = this.rxProcessElementRegistryService.get(selectedElementModel.type).elementService;
                selectedElementInspectorConfig = elementService.getInspectorConfig(selectedElementModel, {
                    processDefinitionModel: definitionModel
                });
            }
            return selectedElementInspectorConfig;
        }));
        this.definitionForCodeViewer$ = this.isDesignModeSubject.pipe(switchMap((isDesignMode) => {
            return isDesignMode
                ? of(null)
                : this.graph$.pipe(take(1), map((graph) => graph.getDefinitionFromGraph()));
        }));
        this.bundleFriendlyName$ = this.bundleIdSubject.pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleFriendlyName(bundleId)));
        // TODO-VS: update canvas configuration (interactive property)
        this.canvasConfiguration$ = this.isReadOnly$.pipe(map((isReadOnly) => {
            return {
                elementRegistry: this.rxProcessElementRegistryService,
                enableMultiSelection: true,
                interactive: !isReadOnly,
                isReadOnly,
                showToolbar: true
            };
        }));
        this.breadcrumbItems$ = combineLatest([this.definitionModel$, this.selectedElementModel$]).pipe(map(([definitionModel, selectedElementModel]) => {
            const breadcrumbItems = [
                {
                    label: definitionModel.name ||
                        `<${this.translateService.instant('com.bmc.arsys.rx.client.process-designer.new-process.label')}>`,
                    data: {}
                }
            ];
            if (selectedElementModel) {
                breadcrumbItems.push({
                    label: selectedElementModel.label,
                    data: {}
                });
            }
            return breadcrumbItems;
        }));
        this.elementValidationIssueSections$ = this.graphChange$.pipe(switchMap((graph) => {
            const cells = reject(graph.getCells(), { id: graph.get('processId') });
            return forkJoin(cells.map((cell) => {
                const elementModel = cell.prop('elementModel');
                const cellType = cell.prop('type');
                const elementRegistry = this.rxProcessElementRegistryService.get(cellType);
                return elementRegistry.elementService.validate(elementModel, reject(cells, { id: elementModel.id })).pipe(map((elementValidationIssues) => ({
                    title: cell.prop('elementModel').label || this.translateService.instant(elementRegistry.displayName),
                    issues: elementValidationIssues
                })));
            }));
        }));
        this.processValidationIssueSection$ = this.graphChange$.pipe(switchMap((graph) => {
            const processCell = graph.getCell(graph.get('processId'));
            return this.rxProcessService.validate(processCell.prop('definitionModel'), reject(graph.getCells(), { id: processCell.id }));
        }), map((processValidationIssues) => ({
            title: this.translateService.instant('com.bmc.arsys.rx.client.process-definition.label'),
            issues: processValidationIssues
        })));
        this.validationIssueSections$ = combineLatest([
            this.processValidationIssueSection$,
            this.elementValidationIssueSections$
        ]).pipe(map(([processValidationIssueSection, elementValidationIssueSections]) => {
            const validationIssueSections = [];
            if (!isEmpty(processValidationIssueSection.issues)) {
                validationIssueSections.push(processValidationIssueSection);
            }
            elementValidationIssueSections.forEach((elementValidationIssueSection) => {
                if (!isEmpty(elementValidationIssueSection.issues)) {
                    validationIssueSections.push(elementValidationIssueSection);
                }
            });
            return validationIssueSections;
        }), shareReplay(1));
        this.hasValidationErrors$ = this.validationIssueSections$.pipe(map((sections) => some(sections, (section) => find(section.issues, { type: ValidationIssueType.Error }))), distinctUntilChanged(), shareReplay(1));
        // TODO-VS: update the logic to rely on command manager
        this.isSaveButtonDisabled$ = combineLatest([this.hasValidationErrors$, this.isReadOnly$]).pipe(map(([hasValidationErrors, isReadOnly]) => hasValidationErrors || isReadOnly), startWith(true));
        this.selectedElementInspectorDesignerItemModel$ = combineLatest([this.selectedElementModel$, this.graph$]).pipe(map(([selectedElementModel, graph]) => ({
            elementModel: selectedElementModel,
            graph
        })));
        this.focusDefinitionInspector$ = this.focusDefinitionInspectorSubject.asObservable();
        this.focusSelectedElementInspector$ = this.focusSelectedElementInspectorSubject.asObservable();
        this.vm$ = combineLatest([
            this.breadcrumbItems$,
            this.bundleFriendlyName$,
            this.canvasConfiguration$,
            this.definitionForCodeViewer$,
            this.definitionInspectorConfig$,
            this.definitionModel$,
            this.graph$,
            this.hasValidationErrors$,
            this.isReadOnly$,
            this.isSaveButtonDisabled$,
            this.paletteElementsTree$,
            this.selectedElementInspectorConfig$,
            this.selectedElementModel$,
            this.validationIssueSections$
        ]).pipe(map(([breadcrumbItems, bundleFriendlyName, canvasConfiguration, definitionForCodeViewer, definitionInspectorConfig, definitionModel, graph, hasValidationErrors, isReadOnly, isSaveButtonDisabled, paletteElementsTree, selectedElementInspectorConfig, selectedElementModel, validationIssueSections]) => ({
            breadcrumbItems,
            bundleFriendlyName,
            canvasConfiguration,
            definitionForCodeViewer,
            definitionInspectorConfig,
            definitionModel,
            graph,
            hasValidationErrors,
            isReadOnly,
            isSaveButtonDisabled,
            paletteElementsTree,
            selectedElementInspectorConfig,
            selectedElementModel,
            validationIssueSections
        })));
    }
    ngOnInit() {
        // TODO-VS: update logic not to debounce model change here
        this.definitionModelChangeSubject
            .pipe(debounceTime(300), withLatestFrom(this.graph$), takeUntil(this.destroyed$))
            .subscribe(([definitionModel, graph]) => {
            const processCell = graph.getCell(graph.get('processId'));
            const commandManager = this.rxCommandManagerService.get();
            commandManager.initBatchCommand();
            forEach(definitionModel, (propertyValue, propertyName) => {
                processCell.prop(`definitionModel/${propertyName}`, propertyValue);
            });
            commandManager.storeBatchCommand();
        });
        // TODO-VS: update logic not to debounce model change here
        this.selectedElementModelChangeSubject
            .pipe(debounceTime(300), withLatestFrom(this.graph$), takeUntil(this.destroyed$))
            .subscribe(([selectedElementModel, graph]) => {
            const selectedElementCell = graph.getCell(this.rxIdService.getBase(selectedElementModel.guid));
            const commandManager = this.rxCommandManagerService.get();
            commandManager.initBatchCommand();
            forEach(selectedElementModel, (propertyValue, propertyName) => {
                selectedElementCell.prop(`elementModel/${propertyName}`, propertyValue);
            });
            commandManager.storeBatchCommand();
        });
    }
    ngOnChanges(changes) {
        if (changes.configuration.currentValue.definitionName) {
            this.graph.reset();
            this.rxProcessDataDictionaryService.clear();
            this.isDesignModeSubject.next(true);
            this.definitionNameSubject.next(changes.configuration.currentValue.definitionName);
        }
        if (changes.configuration.currentValue.bundleId) {
            this.bundleIdSubject.next(changes.configuration.currentValue.bundleId);
        }
    }
    ngOnDestroy() {
        this.rxProcessDataDictionaryService.clear();
        this.bundleIdSubject.complete();
        this.definitionModelChangeSubject.complete();
        this.definitionNameSubject.complete();
        this.focusDefinitionInspectorSubject.complete();
        this.focusSelectedElementInspectorSubject.complete();
        this.graphChangeSubject.complete();
        this.isDesignModeSubject.complete();
        this.selectedElementGuidSubject.complete();
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    canDeactivate() {
        return true;
    }
    onBreadcrumbSelected(guid) {
        if (guid) {
            this.openInspectorSidebarPanel(1);
        }
        else {
            this.openInspectorSidebarPanel(0);
        }
    }
    onCanvasElementSelected(guid) {
        if (!guid) {
            this.openInspectorSidebarPanel(0);
        }
        this.selectedElementGuidSubject.next(guid);
    }
    onCorrectIssue(validationIssue) {
        this.openInspectorSidebarPanel(validationIssue.data.inspectorTabIndex);
        if (validationIssue.data.inspectorTabIndex === 0) {
            setTimeout(() => this.focusDefinitionInspectorSubject.next({
                editorName: validationIssue.data.propertyName,
                data: validationIssue.data
            }), 10);
        }
        else if (validationIssue.data.inspectorTabIndex === 1) {
            this.selectedElementGuidSubject.next(validationIssue.data.guid);
            setTimeout(() => this.focusSelectedElementInspectorSubject.next({
                editorName: validationIssue.data.propertyName,
                data: validationIssue.data
            }), 10);
        }
    }
    onDefinitionInspectorInitialized() {
        this.focusDefinitionInspectorSubject.next({
            editorName: 'name',
            data: {}
        });
    }
    onDefinitionModelChange(definitionModel) {
        this.definitionModelChangeSubject.next(definitionModel);
    }
    // TODO-VS: update types
    onPaletteElementDropped(dropData) {
        this.droppedElement = dropData;
    }
    onSelectedElementModelChange(selectedElementModel) {
        this.selectedElementModelChangeSubject.next(selectedElementModel);
    }
    saveDefinition() {
        this.graph$
            .pipe(take(1), map((graph) => graph.getDefinitionFromGraph()))
            .subscribe();
    }
    toggleDesignMode() {
        this.isDesignModeSubject.next(!this.isDesignModeSubject.value);
    }
    openInspectorSidebarPanel(id) {
        this.inspectorSidebar.openPanel(id);
    }
}
ProcessDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerComponent, deps: [{ token: i0.Injector }, { token: i1.RxBundleCacheService }, { token: i1.RxCommandManagerService }, { token: i1.RxDesignerCacheService }, { token: i1.RxGlobalCacheService }, { token: i2.RxGuidService }, { token: i2.RxIdService }, { token: i1.RxOverlayService }, { token: i3.RxProcessDataDictionaryService }, { token: i3.RxProcessDefinitionService }, { token: i4.RxProcessDesignerService }, { token: i3.RxProcessElementRegistryService }, { token: i3.RxProcessElementSearchService }, { token: i5.RxProcessService }, { token: i6.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
ProcessDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessDesignerComponent, selector: "rx-process-designer", inputs: { configuration: "configuration" }, outputs: { closeDesigner: "closeDesigner", definitionErrorLoading: "definitionErrorLoading", definitionSaved: "definitionSaved" }, viewQueries: [{ propertyName: "inspectorSidebar", first: true, predicate: ["inspectorSidebar"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (breadcrumbSelected)=\"onBreadcrumbSelected($event.data.guid)\"\n    (toggleDesignMode)=\"toggleDesignMode()\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n    (save)=\"saveDefinition()\"\n  ></rx-designer-header>\n\n  <div class=\"rx-designer-component\" [hidden]=\"vm.definitionForCodeViewer\">\n    <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\" #inspectorSidebar>\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.process-designer.inspector.process-properties.title' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.process-designer.inspector.process-properties.title' | translate }}\"\n        iconClass=\"d-icon-pencil\"\n      >\n        <rx-form-builder\n          [config]=\"vm.definitionInspectorConfig\"\n          [model]=\"vm.definitionModel\"\n          [focusEditor$]=\"focusDefinitionInspector$\"\n          (formInitialized)=\"onDefinitionInspectorInitialized()\"\n          [isReadOnly]=\"vm.isReadOnly\"\n          (modelChange)=\"onDefinitionModelChange($event)\"\n        ></rx-form-builder>\n      </adapt-sidebar-item>\n\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.process-designer.inspector.element-properties.title' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.process-designer.inspector.element-properties.title' | translate }}\"\n        iconClass=\"d-icon-gear\"\n      >\n        <rx-form-builder\n          *ngIf=\"vm.selectedElementInspectorConfig; else missingElementAlert\"\n          rxInspector\n          [config]=\"vm.selectedElementInspectorConfig\"\n          [model]=\"vm.selectedElementModel\"\n          [designerItemModel]=\"selectedElementInspectorDesignerItemModel$\"\n          [focusEditor$]=\"focusSelectedElementInspector$\"\n          [isReadOnly]=\"vm.isReadOnly\"\n          (modelChange)=\"onSelectedElementModelChange($event)\"\n        ></rx-form-builder>\n\n        <ng-template #missingElementAlert>\n          <adapt-alert\n            class=\"p-3 definition-valid-message\"\n            [config]=\"{\n              content: 'com.bmc.arsys.rx.client.process-designer.inspector.missing-element.label' | translate,\n              variant: 'info',\n              type: 'inline'\n            }\"\n          ></adapt-alert>\n        </ng-template>\n      </adapt-sidebar-item>\n\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        [iconClass]=\"vm.hasValidationErrors ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\"\n      >\n        <rx-validation-issues\n          [issueSections]=\"vm.validationIssueSections\"\n          [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.common.process-definition.label' | translate\"\n          (correctIssue)=\"onCorrectIssue($event)\"\n        ></rx-validation-issues>\n      </adapt-sidebar-item>\n\n      <div class=\"main\">\n        <!-- TODO-VS: remove blade in favour of adapt sidebar -->\n        <rx-blade [title]=\"'Palette'\" rx-id=\"palette\" [isExpanded]=\"true\">\n          <rx-designer-palette\n            [tree]=\"vm.paletteElementsTree\"\n            (elementDropped)=\"onPaletteElementDropped($event)\"\n          ></rx-designer-palette>\n        </rx-blade>\n\n        <rx-designer-canvas\n          [configuration]=\"vm.canvasConfiguration\"\n          [graph]=\"vm.graph\"\n          [droppedElement]=\"droppedElement\"\n          (elementSelected)=\"onCanvasElementSelected($event)\"\n        ></rx-designer-canvas>\n      </div>\n    </adapt-sidebar>\n  </div>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForCodeViewer\"\n    class=\"full-size\"\n    theme=\"light\"\n    lang=\"javascript\"\n    [hasToolbar]=\"false\"\n    [code]=\"vm.definitionForCodeViewer | json\"\n  ></adapt-code-viewer>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}:host ::ng-deep rx-blade .content{z-index:100}:host ::ng-deep .adapt-sidebar-main{padding:0}:host ::ng-deep .adapt-sidebar-main .main{height:100%}:host ::ng-deep adapt-sidebar .adapt-sidebar-panel-content{padding:0}:host ::ng-deep adapt-accordion-tab>.card:first-child{border:0}:host ::ng-deep .joint-element .body{stroke:#626668}:host ::ng-deep .joint-element polygon{stroke-width:2}:host ::ng-deep .joint-element path{stroke:#626668}.rx-designer-component{height:calc(100% - 50px)}.rx-designer-component rx-designer-canvas{position:absolute;top:0;right:0;bottom:0;left:0}\n"], components: [{ type: i7.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i8.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i8.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i7.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i8.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i9.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i9.RxBladeComponent, selector: "rx-blade", inputs: ["title", "isExpanded", "dockTo"], outputs: ["toggle"] }, { type: i7.RxDesignerPaletteComponent, selector: "rx-designer-palette", inputs: ["tree"], outputs: ["elementDropped"] }, { type: i7.RxDesignerCanvasComponent, selector: "rx-designer-canvas", inputs: ["configuration", "graph", "droppedElement"], outputs: ["elementSelected"] }, { type: i8.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.InspectorDirective, selector: "[rxInspector]", inputs: ["designerItemModel"] }], pipes: { "async": i10.AsyncPipe, "translate": i6.TranslatePipe, "json": i10.JsonPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-process-designer',
                    templateUrl: './process-designer.component.html',
                    styleUrls: ['./process-designer.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxBundleCacheService }, { type: i1.RxCommandManagerService }, { type: i1.RxDesignerCacheService }, { type: i1.RxGlobalCacheService }, { type: i2.RxGuidService }, { type: i2.RxIdService }, { type: i1.RxOverlayService }, { type: i3.RxProcessDataDictionaryService }, { type: i3.RxProcessDefinitionService }, { type: i4.RxProcessDesignerService }, { type: i3.RxProcessElementRegistryService }, { type: i3.RxProcessElementSearchService }, { type: i5.RxProcessService }, { type: i6.TranslateService }]; }, propDecorators: { configuration: [{
                type: Input
            }], closeDesigner: [{
                type: Output
            }], definitionErrorLoading: [{
                type: Output
            }], definitionSaved: [{
                type: Output
            }], inspectorSidebar: [{
                type: ViewChild,
                args: ['inspectorSidebar', { static: false }]
            }] } });
//# sourceMappingURL=process-designer.component.js.map