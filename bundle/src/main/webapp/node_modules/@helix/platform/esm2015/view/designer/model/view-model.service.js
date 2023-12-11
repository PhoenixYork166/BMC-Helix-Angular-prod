import { Injectable, Injector } from '@angular/core';
import { concatMapTo, distinctUntilChanged, filter, first, map, shareReplay, skip, switchMap, switchMapTo, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { compact, find, findIndex, flatten, flow, isEmpty, isEqual, map as _map, uniq } from 'lodash';
import { RX_VIEW_DEFINITION, RxViewComponentRegistryService, RxViewComponentType, RxViewDefinitionCacheService, RxViewDefinitionParserService } from '@helix/platform/view/api';
import { RxGuidService, RxStringService } from '@helix/platform/utils';
import { validateCssClassName, validateCssClassNames } from '../core/validation-helpers';
import { ListFormControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType, RxPermissionEditorComponent, SelectFormControlComponent, TagsFormControlComponent, TextareaFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RxBundleCacheService, RxDefinitionNameService, RxOverlayService, Tooltip } from '@helix/platform/shared/api';
import { ViewDesignerFacade } from '../+state/view-designer.facade';
import { getChildGuidsFromModel } from '../core/layout-helpers';
import * as ViewComponentActions from '../+state/view-component.actions';
import { ViewDesignerDispatcher } from '../+state/view-designer-dispatcher.service';
import { combineLatest, of, ReplaySubject } from 'rxjs';
import { RxViewExpressionValidatorService } from '../validation/view-expression-validator.service';
import { RxViewComponentExpressionConfigurator } from '../expression-configurator/view-component-expression-configurator.class';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxViewCustomizationOptionsComponent } from '../form-controls/view-customization-options-widget/view-customization-options.component';
import { RxViewRevertCustomizationComponent } from '../form-controls/view-revert-customization';
import * as i0 from "@angular/core";
import * as i1 from "../+state/view-designer.facade";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/view/api";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "../+state/view-designer-dispatcher.service";
import * as i7 from "../validation/view-expression-validator.service";
export class RxViewModel {
    constructor(injector, viewDesignerFacade, rxStringService, rxOverlayService, rxViewComponentRegistryService, rxBundleCacheService, rxModalService, rxViewDefinitionCacheService, rxViewDefinitionParserService, rxGuidService, viewDesignerDispatcher, rxDefinitionNameService, rxViewExpressionValidatorService) {
        this.injector = injector;
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxStringService = rxStringService;
        this.rxOverlayService = rxOverlayService;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxModalService = rxModalService;
        this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
        this.rxViewDefinitionParserService = rxViewDefinitionParserService;
        this.rxGuidService = rxGuidService;
        this.viewDesignerDispatcher = viewDesignerDispatcher;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxViewExpressionValidatorService = rxViewExpressionValidatorService;
        this.expressionConfigurator = new RxViewComponentExpressionConfigurator(this.injector, null, this);
        this.destroyed$ = new ReplaySubject(1);
        this.allViewDefinitionNamesByBundleId$ = this.viewDesignerFacade.currentBundleId$.pipe(filter(Boolean), switchMap((bundleId) => this.rxViewDefinitionCacheService
            .getViewDefinitionNames(bundleId)
            .pipe(map((names) => names.map((name) => this.rxDefinitionNameService.getDisplayNameForValidation(name))))));
        this.targetExtensionContainerOptions$ = this.viewDesignerFacade
            .getViewPropertyValue('targetViewDefinitionName')
            .pipe(switchMap((targetViewDefinitionName) => targetViewDefinitionName
            ? this.getTargetExtensionContainerOptions(targetViewDefinitionName).pipe(take(1))
            : of(null)), shareReplay(1));
        this.targetViewDefinition$ = this.viewDesignerFacade.getViewPropertyValue('targetViewDefinitionName').pipe(filter(Boolean), switchMap((targetViewDefinitionName) => this.rxViewDefinitionCacheService.getViewDefinition(targetViewDefinitionName)));
        this.init();
    }
    init() {
        // Initial model and inspector configuration.
        this.viewDesignerFacade.initViewDesigner$
            .pipe(concatMapTo(this.viewDesignerFacade.viewModelsInitialized$.pipe(switchMapTo(combineLatest([
            this.viewDesignerFacade.viewComponentModels$.pipe(map((viewComponentModels) => {
                const pageComponentModel = Object.values(viewComponentModels).find((model) => model.type === RxViewComponentType.Page);
                return pageComponentModel
                    ? viewComponentModels[pageComponentModel.childDataComponentGuids[0]].type
                    : null;
            })),
            this.viewDesignerFacade.viewModel$,
            this.targetExtensionContainerOptions$
        ]).pipe(take(1))))), takeUntil(this.destroyed$))
            .subscribe(([componentType, viewModel, targetExtensionContainerOptions]) => {
            this.viewDesignerFacade.updateViewProperties({
                pageComponent: componentType
            });
            this.viewDesignerFacade.setViewInspectorConfig(this.getInspector(Object.assign(Object.assign({}, viewModel), { pageComponent: componentType }), targetExtensionContainerOptions));
        });
        this.viewDesignerFacade.initViewDesigner$
            .pipe(switchMapTo(this.targetExtensionContainerOptions$.pipe(
        // Ignore initial property change.
        skip(1), withLatestFrom(this.viewDesignerFacade.viewModel$))), takeUntil(this.destroyed$))
            .subscribe(([options, viewModel]) => this.onTargetExtensionContainerOptionsChange(options, viewModel));
        this.viewDesignerFacade.initViewDesigner$
            .pipe(switchMapTo(this.viewDesignerFacade.getViewPropertyValue('pageComponent').pipe(
        // Ignore initial property change.
        skip(1), switchMapTo(combineLatest([
            this.viewDesignerFacade.viewModel$,
            this.viewDesignerFacade.viewComponentModels$,
            this.targetExtensionContainerOptions$
        ]).pipe(take(1))))), takeUntil(this.destroyed$))
            .subscribe(([viewModel, viewComponentModels, targetExtensionContainerOptions]) => this.onPageComponentChange(viewModel, viewComponentModels, targetExtensionContainerOptions));
        this.viewDesignerFacade.initViewDesigner$
            .pipe(switchMapTo(this.viewDesignerFacade.getViewPropertyValue('targetViewDefinitionName').pipe(skip(1))), switchMap(() => this.viewDesignerFacade.viewComponentModels$.pipe(first())), takeUntil(this.destroyed$))
            .subscribe((viewComponentModels) => {
            if (!isEmpty(viewComponentModels)) {
                this.viewDesignerFacade.clearCanvas();
            }
        });
        this.viewDesignerFacade.initViewDesigner$
            .pipe(switchMapTo(combineLatest([
            this.viewDesignerFacade.getViewPropertyValue('styles').pipe(map(validateCssClassNames)),
            this.validateDisplayName(),
            this.validateInputParams(),
            this.validateOutputParamExpressions(),
            this.validateExtensionContainer()
        ]).pipe(map(flatten), map(compact), withLatestFrom(this.viewDesignerFacade.viewModelGuid$))), takeUntil(this.destroyed$))
            .subscribe(([issues, guid]) => {
            this.viewDesignerFacade.setValidationIssues(guid, issues);
        });
        this.viewDesignerFacade.initViewDesigner$
            .pipe(switchMapTo(this.viewDesignerFacade.getViewPropertyValue('inputParams')), takeUntil(this.destroyed$))
            .subscribe((inputParams) => this.viewDesignerFacade.setViewCommonDataDictionaryBranch(this.getViewCommonDataDictionary(inputParams)));
        this.viewDesignerFacade
            .getViewPropertyValue('targetExtensionContainerGuid')
            .pipe(withLatestFrom(this.targetViewDefinition$), map(([targetExtensionContainerGuid, targetViewDefinition]) => this.getTargetRecordDefinitionName(targetViewDefinition, targetExtensionContainerGuid)), distinctUntilChanged(), switchMapTo(this.viewDesignerFacade.viewComponentModels$.pipe(take(1))), filter((viewComponentModels) => !isEmpty(viewComponentModels)), takeUntil(this.destroyed$))
            .subscribe(() => this.viewDesignerFacade.clearCanvas());
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    getTargetExtensionContainerOptions(targetViewDefinitionName) {
        return this.rxViewDefinitionCacheService.getViewDefinition(targetViewDefinitionName).pipe(map((viewDefinition) => this.rxViewDefinitionParserService
            .getComponents(viewDefinition)
            .filter(({ componentDefinition }) => componentDefinition.type === RxViewComponentType.ExtensionContainer)
            .map(({ componentDefinition }) => ({
            id: componentDefinition.guid,
            name: componentDefinition.propertiesByName.name || componentDefinition.name
        }))));
    }
    onTargetExtensionContainerOptionsChange(options, viewModel) {
        this.viewDesignerFacade.setViewInspectorConfig(this.getInspector(viewModel, options));
        // targetViewDefinitionName is not selected when options are not defined.
        if (!options) {
            this.viewDesignerFacade.updateViewProperties({
                targetExtensionContainerGuid: null
            });
        }
        else if (options.length === 1) {
            this.viewDesignerFacade.updateViewProperties({
                targetExtensionContainerGuid: options[0].id
            });
        }
    }
    onPageComponentChange(viewModel, componentModels, options) {
        const pageComponentModel = find(componentModels, { type: RxViewComponentType.Page });
        this.viewDesignerFacade.setViewInspectorConfig(this.getInspector(viewModel, options));
        const actions = [];
        if (viewModel.pageComponent) {
            if (pageComponentModel) {
                this.viewDesignerFacade.updateComponentModel(pageComponentModel.childDataComponentGuids[0], {
                    type: viewModel.pageComponent
                });
            }
            else {
                const pageComponentGuid = this.rxGuidService.generate();
                if (!isEmpty(componentModels)) {
                    this.viewDesignerFacade.removeViewComponents(getChildGuidsFromModel(viewModel));
                }
                actions.push(ViewComponentActions.initializeComponentModels({
                    payload: [
                        {
                            componentModel: {
                                guid: pageComponentGuid,
                                resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                                type: RxViewComponentType.Page,
                                propertiesByName: {},
                                parentGuid: viewModel.guid
                            },
                            insertIndex: 0,
                            columnIndex: 0,
                            outletName: RX_VIEW_DEFINITION.defaultOutletName
                        }
                    ]
                }), ViewComponentActions.initializeDataComponentModels({
                    payload: [
                        {
                            componentModel: {
                                guid: this.rxGuidService.generate(),
                                type: viewModel.pageComponent,
                                resourceType: RX_VIEW_DEFINITION.resourceTypes.viewComponent,
                                propertiesByName: {},
                                parentGuid: pageComponentGuid
                            }
                        }
                    ]
                }));
            }
            this.viewDesignerFacade.updateViewProperties({
                inputParams: [],
                outputParams: []
            });
        }
        else if (pageComponentModel) {
            this.viewDesignerFacade.removeViewComponents([pageComponentModel.guid]);
        }
        actions.forEach((action) => this.viewDesignerDispatcher.dispatch(action));
    }
    getInspector(viewDesignModel, targetExtensionContainerOptions = []) {
        const isExistingView = Boolean(viewDesignModel.lastUpdateTime);
        const isCustomizationAllowed = isExistingView
            ? this.rxOverlayService.isCustomizationEnabled('allowOverlay', viewDesignModel)
            : true;
        const availablePageComponents = this.rxViewComponentRegistryService
            .getBundlePageComponents(this.rxBundleCacheService.bundleId)
            .map((pageComponent) => ({
            id: pageComponent.type,
            name: pageComponent.name
        }));
        if (viewDesignModel.pageComponent && !this.rxViewComponentRegistryService.get(viewDesignModel.pageComponent)) {
            availablePageComponents.unshift({
                name: RX_VIEW_DEFINITION.unknownPageComponent.name,
                id: viewDesignModel.pageComponent
            });
        }
        const pageComponentControl = {
            name: 'pageComponent',
            component: SelectFormControlComponent,
            options: {
                label: 'Page component',
                options: availablePageComponents,
                beforeValueChange: (oldValue, newValue) => this.viewDesignerFacade.viewModel$
                    .pipe(take(1), withLatestFrom(this.viewDesignerFacade.viewComponentModels$), map(([viewModel, viewComponentModels]) => !(oldValue === null || oldValue === void 0 ? void 0 : oldValue.length) &&
                    newValue.length &&
                    (viewModel.inputParams.length || viewModel.outputParams.length || !isEmpty(viewComponentModels))))
                    .toPromise()
                    .then((isConfirmationRequired) => isConfirmationRequired
                    ? this.rxModalService.confirm({
                        title: 'Warning',
                        modalStyle: RX_MODAL.modalStyles.warning,
                        message: 'The view canvas, input and output parameters will be cleared. Do you want to continue?'
                    })
                    : true),
                emptyOption: true
            }
        };
        const extensionContainerControl = {
            name: 'targetExtensionContainerGuid',
            component: SelectFormControlComponent,
            options: {
                label: 'Extension container',
                tooltip: new Tooltip(`Select an extension container in the view to extend where record editor fields from this view will be injected.
            The records defined for the view to extend and for this view must be associated one-to-one.`),
                options: targetExtensionContainerOptions || [],
                required: true,
                beforeValueChange: (oldValue, newValue) => {
                    return this.isTargetRecordDefinitionChanged(oldValue, newValue)
                        .pipe(withLatestFrom(this.viewDesignerFacade.viewComponentModels$), map(([isRecordDefinitionChanged, viewComponentModels]) => !isEmpty(viewComponentModels) && isRecordDefinitionChanged), take(1))
                        .toPromise()
                        .then((isConfirmationRequired) => isConfirmationRequired
                        ? this.rxModalService.confirm({
                            title: 'Warning',
                            modalStyle: RX_MODAL.modalStyles.warning,
                            message: 'The view canvas will be cleared. Do you want to continue?'
                        })
                        : true);
                }
            }
        };
        const layout = [
            {
                label: 'General',
                controls: [
                    {
                        name: 'displayName',
                        component: TextFormControlComponent,
                        isDisabled: Boolean(viewDesignModel.lastUpdateTime),
                        options: {
                            required: true,
                            label: 'Name'
                        }
                    },
                    {
                        name: 'description',
                        component: TextareaFormControlComponent,
                        isDisabled: !isCustomizationAllowed,
                        options: {
                            label: 'Description',
                            rows: 3
                        }
                    },
                    {
                        name: 'layoutName',
                        component: TextFormControlComponent,
                        isDisabled: true,
                        options: {
                            label: 'Layout template'
                        }
                    },
                    {
                        name: 'targetViewDefinitionName',
                        component: RxDefinitionPickerComponent,
                        isDisabled: !isCustomizationAllowed,
                        options: {
                            label: 'View to extend',
                            tooltip: new Tooltip(`Select a view to extend in order to inject this view into it.
                The view to extend may be read-only, but must contain at least one Record editor with an Extension container.`),
                            definitionType: RxDefinitionPickerType.View,
                            beforeValueChange: (oldValue, newValue) => this.viewDesignerFacade.viewComponentModels$
                                .pipe(first(), withLatestFrom(this.viewDesignerFacade.viewModel$))
                                .toPromise()
                                .then(([components, viewModel]) => {
                                const isViewParametersPresent = Boolean(!(oldValue === null || oldValue === void 0 ? void 0 : oldValue.length) &&
                                    newValue.length &&
                                    (viewModel.inputParams.length || viewModel.outputParams.length));
                                let message;
                                if (!isEmpty(components) && isViewParametersPresent) {
                                    message =
                                        'The view canvas, input and output parameters will be cleared. Do you want to continue?';
                                }
                                else if (!isEmpty(components)) {
                                    message = 'The view canvas will be cleared. Do you want to continue?';
                                }
                                else if (isViewParametersPresent) {
                                    message = 'The input and output parameters will be cleared. Do you want to continue?';
                                }
                                return message
                                    ? this.rxModalService.confirm({
                                        title: 'Warning',
                                        modalStyle: RX_MODAL.modalStyles.warning,
                                        message: message
                                    })
                                    : true;
                            })
                        }
                    },
                    {
                        name: 'styles',
                        component: TagsFormControlComponent,
                        isDisabled: !isCustomizationAllowed,
                        options: {
                            label: 'CSS classes',
                            placeholder: 'Add CSS classes',
                            tooltip: new Tooltip('Enter CSS class names to apply to this view.'),
                            errorCheck: validateCssClassName
                        }
                    },
                    {
                        name: 'permissions',
                        component: RxPermissionEditorComponent,
                        isDisabled: !isCustomizationAllowed,
                        options: {
                            label: 'Permissions',
                            type: 'view'
                        }
                    },
                    {
                        component: RxViewRevertCustomizationComponent
                    },
                    {
                        component: RxViewCustomizationOptionsComponent
                    }
                ]
            },
            {
                label: 'Input parameters',
                controls: [
                    {
                        name: 'inputParams',
                        component: ListFormControlComponent,
                        isDisabled: !isCustomizationAllowed,
                        options: {
                            addItemText: 'Add',
                            emptyListText: 'No input parameters added.',
                            items: [
                                {
                                    label: 'Name',
                                    propertyName: 'name'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                label: 'Output parameters',
                controls: [
                    {
                        name: 'outputParams',
                        component: ListFormControlComponent,
                        isDisabled: !isCustomizationAllowed,
                        options: {
                            addItemText: 'Add',
                            emptyListText: 'No output parameters added.',
                            items: [
                                {
                                    label: 'Name',
                                    propertyName: 'name'
                                },
                                {
                                    label: 'Source',
                                    propertyName: 'source',
                                    dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                                    operators: this.expressionConfigurator.getOperators()
                                }
                            ]
                        }
                    }
                ]
            }
        ];
        if (availablePageComponents.length) {
            layout[0].controls.splice(2, 0, pageComponentControl);
        }
        // hide 'View to extend' and 'Extention container' controls if a page component is selected
        if (viewDesignModel.pageComponent) {
            layout.splice(1, 2);
            layout[0].controls.splice(findIndex(layout[0].controls, { name: 'targetViewDefinitionName' }), 1);
        }
        if (viewDesignModel.targetViewDefinitionName) {
            const targetViewDefinitionNameControlIndex = findIndex(layout[0].controls, { name: 'targetViewDefinitionName' });
            layout[0].controls.splice(targetViewDefinitionNameControlIndex + 1, 0, extensionContainerControl);
            // hide 'Page component' control if 'View to extend' is selected
            layout[0].controls.splice(findIndex(layout[0].controls, { name: 'pageComponent' }), 1);
            // hide 'Input parameters' and 'Output parameters' control if 'View to extend' is selected
            layout.splice(1, 2);
            this.viewDesignerFacade.updateViewProperties({
                inputParams: [],
                outputParams: []
            });
        }
        return {
            inspectorSectionConfigs: layout
        };
    }
    validateDisplayName() {
        // View definition names for validation will be loaded only in case if user changes view name.
        return this.viewDesignerFacade
            .getViewPropertyValue('displayName')
            .pipe(switchMap((displayName) => combineLatest([
            of(displayName
                ? RX_RECORD_DEFINITION.validDefinitionNameRegex.test(displayName)
                    ? null
                    : {
                        type: 'error',
                        propertyName: 'displayName',
                        description: 'View name can only contain letters, numbers, spaces, dashes, and underscores.'
                    }
                : {
                    type: 'error',
                    propertyName: 'displayName',
                    description: 'View name cannot be blank.'
                }),
            this.viewDesignerFacade.getViewPropertyValue('lastUpdateTime').pipe(switchMap((lastUpdateTime) => displayName && !lastUpdateTime
                ? this.allViewDefinitionNamesByBundleId$.pipe(map((viewDefinitionNames) => {
                    const isNameAlreadyExists = !lastUpdateTime &&
                        (viewDefinitionNames === null || viewDefinitionNames === void 0 ? void 0 : viewDefinitionNames.some((name) => this.rxStringService.caseInsensitiveIsEqual(displayName, name)));
                    return isNameAlreadyExists
                        ? {
                            type: 'error',
                            propertyName: 'displayName',
                            description: 'View definition with this name already exists.'
                        }
                        : null;
                }), take(1))
                : of(null)), take(1))
        ])))
            .pipe(map(compact));
    }
    validateInputParams() {
        return this.viewDesignerFacade.getViewPropertyValue('inputParams').pipe(map((inputParams) => {
            const notBlankInputParams = flow((params) => _map(params, (param) => param.name), compact)(inputParams);
            const uniqueInputParams = uniq(notBlankInputParams);
            const validationIssues = [];
            if (inputParams.length && notBlankInputParams.length !== inputParams.length) {
                validationIssues.push({
                    type: 'error',
                    propertyName: 'inputParams',
                    description: 'Input parameter name cannot be blank.'
                });
            }
            if (notBlankInputParams.length !== uniqueInputParams.length) {
                validationIssues.push({
                    type: 'error',
                    propertyName: 'inputParams',
                    description: 'Input parameter names must be unique.'
                });
            }
            return validationIssues;
        }));
    }
    validateOutputParamExpressions() {
        return this.viewDesignerFacade.getViewPropertyValue('outputParams').pipe(map((outputParams) => _map(outputParams, (param) => param.source).filter(Boolean)), distinctUntilChanged(isEqual), switchMap((sourceValues) => sourceValues.length
            ? combineLatest(sourceValues.map((value) => this.rxViewExpressionValidatorService.validate(value, 'source', 'Output parameter source'))).pipe(map(flatten))
            : of([])));
    }
    validateExtensionContainer() {
        return combineLatest([
            this.viewDesignerFacade.getViewPropertyValue('targetViewDefinitionName'),
            this.viewDesignerFacade.getViewPropertyValue('targetExtensionContainerGuid')
        ]).pipe(map(([targetViewDefinitionName, targetExtensionContainerGuid]) => targetViewDefinitionName && !targetExtensionContainerGuid
            ? {
                type: 'error',
                propertyName: 'targetExtensionContainerGuid',
                description: 'Extension container cannot be blank.'
            }
            : null));
    }
    getViewCommonDataDictionary(inputParams) {
        return {
            label: 'View',
            expression: '${view.api}',
            icon: 'd-icon-file_o',
            expanded: true,
            children: [
                ...(isEmpty(inputParams)
                    ? []
                    : [
                        {
                            label: 'Input parameters',
                            expanded: true,
                            children: inputParams
                                .filter((param) => param.name)
                                .map((param) => ({
                                label: param.name,
                                expression: `$\{view.inputParams.${param.name}}`,
                                icon: 'd-icon-arrow_right_square_input'
                            }))
                        }
                    ]),
                {
                    label: 'Properties',
                    expanded: true,
                    children: [
                        {
                            label: 'Is valid',
                            expression: '${view.isValid}',
                            icon: 'd-icon-arrow_right_square_input'
                        }
                    ]
                }
            ]
        };
    }
    isTargetRecordDefinitionChanged(previousTargetExtensionContainerGuid, currentTargetExtensionContainerGuid) {
        return this.targetViewDefinition$.pipe(map((viewDefinition) => {
            const previousTargetRecordDefinitionName = this.getTargetRecordDefinitionName(viewDefinition, previousTargetExtensionContainerGuid);
            const currentTargetRecordDefinitionName = this.getTargetRecordDefinitionName(viewDefinition, currentTargetExtensionContainerGuid);
            return previousTargetRecordDefinitionName !== currentTargetRecordDefinitionName;
        }));
    }
    getTargetRecordDefinitionName(viewDefinition, targetExtensionContainerGuid) {
        const targetRecordEditor = this.rxViewDefinitionParserService.findParentComponentDefinition(viewDefinition, { guid: targetExtensionContainerGuid }, (definition) => definition.type === RxViewComponentType.RecordEditor);
        return targetRecordEditor === null || targetRecordEditor === void 0 ? void 0 : targetRecordEditor.propertiesByName.recordDefinitionName;
    }
}
RxViewModel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewModel, deps: [{ token: i0.Injector }, { token: i1.ViewDesignerFacade }, { token: i2.RxStringService }, { token: i3.RxOverlayService }, { token: i4.RxViewComponentRegistryService }, { token: i3.RxBundleCacheService }, { token: i5.RxModalService }, { token: i4.RxViewDefinitionCacheService }, { token: i4.RxViewDefinitionParserService }, { token: i2.RxGuidService }, { token: i6.ViewDesignerDispatcher }, { token: i3.RxDefinitionNameService }, { token: i7.RxViewExpressionValidatorService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewModel.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewModel });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewModel, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.ViewDesignerFacade }, { type: i2.RxStringService }, { type: i3.RxOverlayService }, { type: i4.RxViewComponentRegistryService }, { type: i3.RxBundleCacheService }, { type: i5.RxModalService }, { type: i4.RxViewDefinitionCacheService }, { type: i4.RxViewDefinitionParserService }, { type: i2.RxGuidService }, { type: i6.ViewDesignerDispatcher }, { type: i3.RxDefinitionNameService }, { type: i7.RxViewExpressionValidatorService }]; } });
//# sourceMappingURL=view-model.service.js.map