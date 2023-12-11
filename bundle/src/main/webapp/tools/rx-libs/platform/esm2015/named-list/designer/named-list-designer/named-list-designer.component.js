import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { RX_NAMED_LIST_DEFINITION } from '@helix/platform/named-list/api';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { ExpressionOperatorGroup, ExpressionOperatorRowsByGroup, RxFeatureService, RxGlobalCacheService, RxNotificationService, RxOverlayService, Tooltip } from '@helix/platform/shared/api';
import { CustomizationOptionsComponent, ExpressionFormControlComponent, RX_EXPRESSION_EDITOR, RX_REVERT_CUSTOMIZATION, RxDefinitionPickerComponent, RxDefinitionPickerType, RxExpressionEditorService, RxRevertCustomizationComponent, SelectFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService, ValidationIssueType } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { isEmpty, isNil, some, trim } from 'lodash';
import { combineLatest, of, ReplaySubject, Subject } from 'rxjs';
import { filter, map, shareReplay, skip, startWith, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { RxNamedListExpressionConfigurator } from './named-list-expression-configurator.class';
import { bundleIdSelector, definitionModelFromDefinitionSelector, definitionModelSelector, isDesignModeSelector, isDirtySelector, originalDefinitionSelector, savedDefinitionNameSelector } from './+state/named-list-designer.selectors';
import { Store } from '@ngrx/store';
import * as NamedListDesignerActions from './+state/named-list-designer.actions';
import { NamedListDesignerService } from '../named-list-designer.service';
import { ContextualLabelFieldsComponent } from './contextual-label-fields/contextual-label-fields.component';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../named-list-designer.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@helix/platform/record/api";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@helix/platform/shared/components";
import * as i8 from "@bmc-ux/adapt-angular";
import * as i9 from "@angular/common";
export class RxNamedListDesignerComponent {
    constructor(injector, store$, namedListDesignerService, rxGlobalCacheService, rxModalService, rxRecordDefinitionCacheService, translateService, rxOverlayService, rxNotificationService, rxExpressionEditorService, rxFeatureService) {
        this.injector = injector;
        this.store$ = store$;
        this.namedListDesignerService = namedListDesignerService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxModalService = rxModalService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.translateService = translateService;
        this.rxOverlayService = rxOverlayService;
        this.rxNotificationService = rxNotificationService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxFeatureService = rxFeatureService;
        this.definitionSaved = new EventEmitter();
        this.definitionErrorLoading = new EventEmitter();
        this.closeDesigner = new EventEmitter();
        this.bundleId$ = this.store$.select(bundleIdSelector);
        this.bundleFriendlyName$ = this.bundleId$.pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleFriendlyName(bundleId)));
        this.destroyed$ = new ReplaySubject(1);
        this.expressionConfigurator = new RxNamedListExpressionConfigurator(this.injector);
        this.isFormInitialized = false;
        this.definitionModel$ = this.store$.select(definitionModelSelector);
        this.isDirty$ = this.store$.select(isDirtySelector);
        this.originalDefinition$ = this.store$.select(originalDefinitionSelector);
        this.definitionModelFromDefinition$ = this.store$.select(definitionModelFromDefinitionSelector);
        this.definitionFromDefinitionModel$ = this.definitionModel$.pipe(withLatestFrom(this.bundleId$), map(([definitionModel, bundleId]) => this.namedListDesignerService.getDefinitionFromDefinitionModel(definitionModel, bundleId)));
        this.recordDefinition$ = this.definitionModel$.pipe(switchMap((definitionModel) => definitionModel.recordDefinitionName
            ? this.rxRecordDefinitionCacheService.getRecordDefinition(definitionModel.recordDefinitionName)
            : of(null)), shareReplay(1));
        this.textFieldNameOptions$ = this.recordDefinition$.pipe(map((recordDefinition) => recordDefinition
            ? recordDefinition.fieldDefinitions
                .filter(({ resourceType }) => [
                RX_RECORD_DEFINITION.resourceTypes.character,
                RX_RECORD_DEFINITION.resourceTypes.localizedCharacter
            ].includes(resourceType))
                .map(({ id, name }) => ({ id, name }))
            : []));
        this.validationIssues$ = combineLatest([
            this.definitionModel$,
            this.textFieldNameOptions$
        ]).pipe(map(([definitionModel, textFieldNameOptions]) => this.validate(definitionModel, textFieldNameOptions)), shareReplay(1));
        this.hasValidationErrors$ = this.validationIssues$.pipe(map((issueSections) => some(issueSections, {
            issues: [{ type: ValidationIssueType.Error }]
        })));
        this.areNewDefinitionsAllowed$ = this.bundleId$.pipe(switchMap((bundleId) => this.rxOverlayService.areNewDefinitionsAllowed(bundleId)));
        this.isReadOnly$ = this.definitionFromDefinitionModel$.pipe(filter((definition) => !!definition.lastUpdateTime), withLatestFrom(this.areNewDefinitionsAllowed$), map(([definition, areNewDefinitionsAllowed]) => !areNewDefinitionsAllowed || !this.rxOverlayService.isCustomizationEnabled('allowOverlay', definition)), tap((isReadOnly) => {
            if (isReadOnly) {
                this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.read-only-definition-warning.message'));
            }
        }), startWith(false), shareReplay(1));
        this.isSaveButtonDisabled$ = combineLatest([
            this.hasValidationErrors$,
            this.isReadOnly$,
            this.isDirty$
        ]).pipe(map(([hasValidationErrors, isReadOnly, isDirty]) => hasValidationErrors || isReadOnly || !isDirty));
        this.inspectorFocusEditorSubject = new Subject();
        this.inspectorFocusEditor$ = this.inspectorFocusEditorSubject.asObservable();
        this.isExistingDefinition$ = this.definitionModelFromDefinition$.pipe(map((model) => Boolean(model.lastUpdateTime)));
        this.breadcrumbItems$ = this.definitionModel$.pipe(map((model) => [
            {
                label: model.name ||
                    `<${this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.new-named-list.label')}>`,
                data: {}
            }
        ]));
        this.definitionInspectorConfig$ = combineLatest([
            this.definitionModel$,
            this.recordDefinition$,
            this.textFieldNameOptions$,
            this.isReadOnly$
        ]).pipe(map(([definitionModel, recordDefinition, textFieldNameOptions, isReadOnly]) => this.getFormBuilderConfig(definitionModel, recordDefinition, textFieldNameOptions, isReadOnly)));
        this.isDesignMode$ = this.store$.select(isDesignModeSelector);
        this.definitionForJsonViewer$ = this.isDesignMode$.pipe(switchMap((isDesignMode) => isDesignMode
            ? of(null)
            : combineLatest([this.definitionFromDefinitionModel$, this.originalDefinition$]).pipe(map(([definitionFromDefinitionModel, originalDefinition]) => (Object.assign(Object.assign({}, originalDefinition), definitionFromDefinitionModel))))));
        this.vm$ = combineLatest([
            this.breadcrumbItems$,
            this.bundleFriendlyName$,
            this.hasValidationErrors$,
            this.isExistingDefinition$,
            this.isSaveButtonDisabled$,
            this.definitionForJsonViewer$,
            this.definitionModel$,
            this.definitionInspectorConfig$,
            this.validationIssues$
        ]).pipe(map(([breadcrumbItems, bundleFriendlyName, hasValidationErrors, isExistingDefinition, isSaveButtonDisabled, definitionForJsonViewer, definitionModel, definitionInspectorConfig, validationIssues]) => ({
            breadcrumbItems,
            bundleFriendlyName,
            hasValidationErrors,
            isExistingDefinition,
            isSaveButtonDisabled,
            definitionForJsonViewer,
            definitionModel,
            definitionInspectorConfig,
            validationIssues
        })));
    }
    ngOnChanges(changes) {
        if (changes.configuration.currentValue) {
            this.store$.dispatch(NamedListDesignerActions.init({ payload: this.configuration }));
        }
    }
    ngOnInit() {
        this.store$
            .select(savedDefinitionNameSelector)
            .pipe(skip(1), filter(Boolean), takeUntil(this.destroyed$))
            .subscribe((savedDefinitionName) => {
            this.definitionSaved.emit(savedDefinitionName);
        });
        this.expressionConfigurator.configureForProperty({
            propertyPath: 'queryCriteria',
            dataDictionary$: this.definitionModel$.pipe(switchMap((definitionModel) => this.expressionConfigurator.namedListExpressionDataDictionary(definitionModel))),
            operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.All)
        });
    }
    canDeactivate() {
        let canDeactivate = true;
        this.isDirty$.pipe(take(1)).subscribe((isDirty) => {
            canDeactivate = !isDirty;
        });
        return canDeactivate;
    }
    onToggleDesignMode() {
        this.store$.dispatch(NamedListDesignerActions.toggleDesignMode());
    }
    onCorrectIssue(validationIssue) {
        this.inspectorFocusEditorSubject.next({
            editorName: validationIssue.data.propertyName,
            data: validationIssue.data.data
        });
    }
    onModelChange(newDefinitionModel) {
        if (this.isFormInitialized) {
            this.store$.dispatch(NamedListDesignerActions.updateDefinitionModelFromDesigner({
                definitionModelFromDesigner: newDefinitionModel
            }));
        }
    }
    onFormInitialized() {
        this.isFormInitialized = true;
    }
    onEditorEvent(event) {
        if (event.type === RX_REVERT_CUSTOMIZATION.events.revertCustomization) {
            this.revertCustomization();
        }
        if (event.type === RX_EXPRESSION_EDITOR.events.openExpressionEditor) {
            this.openExpressionEditor(event);
        }
    }
    openExpressionEditor(event) {
        this.definitionModel$.pipe(take(1)).subscribe((definitionModel) => {
            this.rxExpressionEditorService
                .openEditor({
                property: {
                    path: event.payload.propertyPath,
                    value: definitionModel.queryCriteria,
                    label: event.payload.propertyLabel
                },
                isReadOnly: event.payload.isReadOnly,
                expressionConfigurator: this.expressionConfigurator,
                legend: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field-name.label'),
                        icon: 'd-icon-arrow_right_square_input'
                    }
                ]
            })
                .subscribe((expression) => {
                this.store$.dispatch(NamedListDesignerActions.updateDefinitionModelFromDesigner({
                    definitionModelFromDesigner: { queryCriteria: expression.value }
                }));
            });
        });
    }
    revertCustomization() {
        this.store$.dispatch(NamedListDesignerActions.revertCustomization());
    }
    onSave() {
        this.store$.dispatch(NamedListDesignerActions.saveDefinition());
    }
    validate(definitionModel, textFieldNameOptions) {
        var _a;
        const validationIssues = [];
        if (isEmpty(trim(definitionModel.name))) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
                }),
                data: {
                    propertyName: 'name'
                }
            });
        }
        else if (!RX_RECORD_DEFINITION.validDefinitionNameRegex.test(definitionModel.name)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.name-validation.message'),
                data: {
                    propertyName: 'name'
                }
            });
        }
        if (isEmpty(trim(definitionModel.recordDefinitionName))) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.record-definition-field.label')
                }),
                data: {
                    propertyName: 'recordDefinitionName'
                }
            });
        }
        if (isNil(definitionModel.labelFieldId)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.display-name-field.label')
                }),
                data: {
                    propertyName: 'labelFieldId'
                }
            });
        }
        if (isNil(definitionModel.valueFieldId)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.value-field.label')
                }),
                data: {
                    propertyName: 'valueFieldId'
                }
            });
        }
        if (definitionModel.recordDefinitionName) {
            (_a = definitionModel.fields) === null || _a === void 0 ? void 0 : _a.forEach((field, index) => {
                if (!textFieldNameOptions.some(({ id }) => id === field.id)) {
                    validationIssues.push({
                        type: ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.unknown-field.message'),
                        data: {
                            propertyName: 'fields',
                            data: {
                                fieldIndex: index
                            }
                        }
                    });
                }
            });
        }
        return validationIssues.length
            ? [
                {
                    title: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.new-named-list.label'),
                    issues: validationIssues
                }
            ]
            : [];
    }
    getFieldNameOptions(recordDefinition) {
        return recordDefinition.fieldDefinitions.map(({ id, name }) => ({ id, name }));
    }
    getFormBuilderConfig(definitionModel, recordDefinition, textFieldNameOptions, isReadOnly) {
        return [
            {
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
                        name: 'recordDefinitionName',
                        component: RxDefinitionPickerComponent,
                        isDisabled: isReadOnly,
                        options: {
                            definitionType: RxDefinitionPickerType.Record,
                            label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.record-definition-field.label'),
                            required: true,
                            beforeValueChange: (oldValue) => {
                                var _a;
                                if (Boolean(oldValue) &&
                                    (definitionModel.labelFieldId ||
                                        definitionModel.valueFieldId ||
                                        ((_a = definitionModel.fields) === null || _a === void 0 ? void 0 : _a.length) ||
                                        definitionModel.queryCriteria)) {
                                    const message = this.rxFeatureService.isFeatureEnabled('DRD21-43103')
                                        ? this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.clear-values-confirmation.message')
                                        : 'Display name field, Value field, and Filter expression will be cleared. Do you want to continue?';
                                    return this.rxModalService
                                        .confirm({
                                        title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                                        modalStyle: RX_MODAL.modalStyles.warning,
                                        message
                                    })
                                        .then((isConfirmed) => {
                                        if (isConfirmed) {
                                            setTimeout(() => {
                                                this.store$.dispatch(NamedListDesignerActions.clearFields());
                                            });
                                        }
                                        return isConfirmed;
                                    });
                                }
                                return Promise.resolve(true);
                            }
                        }
                    },
                    {
                        name: 'queryCriteria',
                        component: ExpressionFormControlComponent,
                        isDisabled: !definitionModel.recordDefinitionName || isReadOnly,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.filter-expression-field.label'),
                            tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.filter-expression-field.tooltip')),
                            dataDictionary$: this.expressionConfigurator.getDataDictionary('queryCriteria'),
                            operators: this.expressionConfigurator.getOperators()
                        }
                    },
                    {
                        name: 'searchBehavior',
                        component: SelectFormControlComponent,
                        isDisabled: isReadOnly,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior-field.label'),
                            tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior-field.tooltip')),
                            required: true,
                            options: [
                                {
                                    id: RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.contains,
                                    name: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior.contains.label')
                                },
                                {
                                    id: RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.startsWith,
                                    name: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior.starts-with.label')
                                },
                                {
                                    id: RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.exactMatch,
                                    name: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior.exact-match.label')
                                }
                            ],
                            emptyOption: false,
                            sortAlphabetically: false
                        },
                        hidden: !this.rxFeatureService.isFeatureEnabled('DRD21-43015')
                    },
                    {
                        name: 'labelFieldId',
                        component: SelectFormControlComponent,
                        isDisabled: !definitionModel.recordDefinitionName || isReadOnly,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.display-name-field.label'),
                            required: true,
                            tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.display-name-field.tooltip')),
                            emptyOption: true,
                            options: recordDefinition ? this.getFieldNameOptions(recordDefinition) : []
                        }
                    },
                    {
                        name: 'valueFieldId',
                        component: SelectFormControlComponent,
                        isDisabled: !definitionModel.recordDefinitionName || isReadOnly,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.value-field.label'),
                            required: true,
                            tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.value-field.tooltip')),
                            emptyOption: true,
                            options: recordDefinition ? this.getFieldNameOptions(recordDefinition) : []
                        }
                    },
                    {
                        name: 'fields',
                        component: ContextualLabelFieldsComponent,
                        isDisabled: !definitionModel.recordDefinitionName || isReadOnly,
                        options: {
                            options: textFieldNameOptions
                        },
                        hidden: !this.rxFeatureService.isFeatureEnabled('DRD21-43103')
                    },
                    {
                        component: RxRevertCustomizationComponent,
                        options: {
                            allowOverlay: definitionModel.customizationOptions.allowOverlay,
                            scope: definitionModel.customizationOptions.scope,
                            overlayGroupId: definitionModel.customizationOptions.overlayGroupId,
                            overlayDescriptor: definitionModel.customizationOptions.overlayDescriptor
                        }
                    },
                    {
                        name: 'customizationOptions',
                        component: CustomizationOptionsComponent,
                        isDisabled: isReadOnly,
                        options: {
                            definitionTypeDisplayName: this.translateService
                                .instant('com.bmc.arsys.rx.client.named-list-definition.label')
                                .toLowerCase(),
                            allowOverlay: definitionModel.customizationOptions.allowOverlay,
                            scope: definitionModel.customizationOptions.scope,
                            overlayGroupId: definitionModel.customizationOptions.overlayGroupId,
                            overlayDescriptor: definitionModel.customizationOptions.overlayDescriptor
                        }
                    }
                ]
            }
        ];
    }
    ngOnDestroy() {
        this.inspectorFocusEditorSubject.complete();
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.store$.dispatch(NamedListDesignerActions.destroy());
    }
}
RxNamedListDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerComponent, deps: [{ token: i0.Injector }, { token: i1.Store }, { token: i2.NamedListDesignerService }, { token: i3.RxGlobalCacheService }, { token: i4.RxModalService }, { token: i5.RxRecordDefinitionCacheService }, { token: i6.TranslateService }, { token: i3.RxOverlayService }, { token: i3.RxNotificationService }, { token: i7.RxExpressionEditorService }, { token: i3.RxFeatureService }], target: i0.ɵɵFactoryTarget.Component });
RxNamedListDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxNamedListDesignerComponent, selector: "rx-named-list-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n    (save)=\"onSave()\"\n    (toggleDesignMode)=\"onToggleDesignMode()\"\n    [isDesignMode]=\"!vm.definitionForJsonViewer\"\n  ></rx-designer-header>\n\n  <div class=\"rx-designer-component\" [hidden]=\"vm.definitionForJsonViewer\">\n    <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\">\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        rx-id=\"validation-issues\"\n        [iconClass]=\"vm.hasValidationErrors ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\"\n      >\n        <rx-validation-issues\n          [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.common.named-list-definition.label' | translate\"\n          [issueSections]=\"vm.validationIssues\"\n          (correctIssue)=\"onCorrectIssue($event)\"\n        ></rx-validation-issues>\n      </adapt-sidebar-item>\n\n      <div class=\"main rx-designer-container h-100\">\n        <h1 class=\"mt-0\">\n          {{\n            vm.isExistingDefinition\n              ? ('com.bmc.arsys.rx.client.named-list-designer.edit-named-list.title' | translate)\n              : ('com.bmc.arsys.rx.client.named-list-designer.create-named-list.title' | translate)\n          }}\n        </h1>\n\n        <rx-form-builder\n          [config]=\"vm.definitionInspectorConfig\"\n          [model]=\"vm.definitionModel\"\n          (editorEvent)=\"onEditorEvent($event)\"\n          [focusEditor$]=\"inspectorFocusEditor$\"\n          (formInitialized)=\"onFormInitialized()\"\n          (modelChange)=\"onModelChange($event)\"\n        ></rx-form-builder>\n      </div>\n    </adapt-sidebar>\n  </div>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  ></adapt-code-viewer>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-designer-component{height:calc(100% - 50px)}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;padding:1rem}rx-form-builder{max-width:400px}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}:host ::ng-deep .adapt-sidebar-main{overflow:auto}\n"], components: [{ type: i7.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i8.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i8.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i4.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i7.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i8.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i9.AsyncPipe, "translate": i6.TranslatePipe, "json": i9.JsonPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-named-list-designer',
                    templateUrl: './named-list-designer.component.html',
                    styleUrls: ['./named-list-designer.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.Store }, { type: i2.NamedListDesignerService }, { type: i3.RxGlobalCacheService }, { type: i4.RxModalService }, { type: i5.RxRecordDefinitionCacheService }, { type: i6.TranslateService }, { type: i3.RxOverlayService }, { type: i3.RxNotificationService }, { type: i7.RxExpressionEditorService }, { type: i3.RxFeatureService }]; }, propDecorators: { configuration: [{
                type: Input
            }], definitionSaved: [{
                type: Output
            }], definitionErrorLoading: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }] } });
//# sourceMappingURL=named-list-designer.component.js.map