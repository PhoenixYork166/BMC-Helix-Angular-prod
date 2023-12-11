import { Injectable, Injector } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { chain, isArray, isEmpty, reduce, transform } from 'lodash';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { RxActionTypeUtilsService, RxServerActionService, Tooltip } from '@helix/platform/shared/api';
import { AssignmentExpressionListFormControlComponent, AssignmentExpressionListTargetFieldType, LabelFormControlComponent, SelectFormControlComponent, TextareaFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { RX_PROCESS_DEFINITION, RxProcessDataDictionaryService } from '@helix/platform/process/api';
import { RxExpressionInputMapInspectorWidgetComponent } from '../shared/components/expression-input-map-inspector-widget/expression-input-map-inspector-widget.component';
import { RxProcessActionExpressionConfigurator } from './process-action-expression-configurator.class';
import * as i0 from "@angular/core";
export class RxProcessActionService extends RxServerActionService {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.rxActionTypeUtilsService = injector.get(RxActionTypeUtilsService);
        this.rxProcessDataDictionaryService = injector.get(RxProcessDataDictionaryService);
    }
    // PUBLIC
    // TODO-VS: eliminate Partial (new IProcessDefinitionLight to eliminate overlayDescriptor form IDefinitionLight?)
    getDefinitionFromModel(model) {
        return {
            actionTypeName: model.actionTypeName,
            description: model.description,
            guid: model.guid,
            inputMap: this.getInputMapFromModel(model),
            multiInstanceLoopDefinition: model.multiInstanceLoopDefinition,
            name: model.name,
            outputMap: model.outputMap,
            resourceType: model.resourceType,
            runAsUser: RX_PROCESS_DEFINITION.runAsUser[model.runAsUser].definitionValue
        };
    }
    getExpressionConfigurator() {
        var _a;
        return ((_a = this.expressionConfigurator) !== null && _a !== void 0 ? _a : (this.expressionConfigurator = new (this.getExpressionConfiguratorClass())(this.injector)));
    }
    getInspectorConfig(model, options) {
        const generalConfigControls = [
            {
                name: 'actionTypeName',
                component: TextFormControlComponent,
                isDisabled: true,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.server-action-properties.action-type-name.label')
                }
            },
            {
                name: 'label',
                component: TextFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.label.label'),
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
                name: 'guid',
                component: TextFormControlComponent,
                isDisabled: true,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label')
                }
            },
            {
                name: 'runAsUser',
                component: SelectFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.run-as.label'),
                    tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.inspector.run-as.tooltip')),
                    options: [
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.common.administrator.label'),
                            id: RX_PROCESS_DEFINITION.runAsUser.administrator.modelValue
                        },
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.common.current-user.label'),
                            id: RX_PROCESS_DEFINITION.runAsUser.currentUser.modelValue
                        },
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.process-action.inherit-from-process.label'),
                            id: RX_PROCESS_DEFINITION.runAsUser.inheritFromProcess.modelValue
                        }
                    ]
                }
            }
        ];
        if (model.isDeprecated) {
            generalConfigControls.unshift({
                name: 'isDeprecated',
                component: LabelFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.server-action-properties.deprecated.label', {
                        definitionType: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.process.label')
                    })
                }
            });
        }
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                controls: generalConfigControls
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.element-properties.input-map.label'),
                controls: [this.getInputMapInspectorWidgetConfig(model)]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.element-properties.output-map.label'),
                controls: [
                    {
                        name: 'outputMap',
                        component: AssignmentExpressionListFormControlComponent,
                        options: {
                            confirmationMessage: 'com.bmc.arsys.rx.client.designer.inspector.delete-output-map-item-confirmation.message',
                            sourceFieldOptions: {
                                expressionConfigurator: this.getExpressionConfigurator(),
                                options: {
                                    dataDictionary$: this.getExpressionConfigurator().getDataDictionary('outputMap'),
                                    operators: this.getExpressionConfigurator().getOperators('outputMap')
                                }
                            },
                            targetFieldOptions: {
                                type: AssignmentExpressionListTargetFieldType.Select,
                                options: {
                                    options: chain([
                                        ...options.processDefinitionModel.inputParams,
                                        ...options.processDefinitionModel.outputParams,
                                        ...options.processDefinitionModel.localVariables
                                    ])
                                        .map('name')
                                        .uniq()
                                        .map((name) => ({
                                        name,
                                        id: name
                                    }))
                                        .value()
                                }
                            }
                        }
                    }
                ]
            }
        ];
    }
    getModelFromDefinition(definition) {
        const actionType = super.getActionTypeByName(definition.actionTypeName);
        const name = actionType.displayName || this.rxActionTypeUtilsService.prettifyActionTypeName(actionType.actionTypeName);
        return definition.guid
            ? {
                actionTypeName: definition.actionTypeName,
                deprecatedText: actionType.deprecatedText,
                description: definition.description,
                guid: definition.guid,
                inputMap: this.getInputMapFromDefinition(definition),
                isDeprecated: actionType.isDeprecated,
                label: definition.name,
                multiInstanceLoopDefinition: definition.multiInstanceLoopDefinition,
                name: definition.name,
                outputMap: definition.outputMap,
                resourceType: definition.resourceType,
                runAsUser: this.getRunAsUserFromDefinition(definition),
                type: this.getElementType(actionType.actionTypeName)
            }
            : {
                actionTypeName: actionType.actionTypeName,
                deprecatedText: actionType.deprecatedText,
                description: '',
                guid: '',
                inputMap: {},
                isDeprecated: actionType.isDeprecated,
                label: name,
                multiInstanceLoopDefinition: null,
                name,
                outputMap: [],
                resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.processAction,
                runAsUser: RX_PROCESS_DEFINITION.runAsUser.inheritFromProcess.modelValue,
                type: this.getElementType(actionType.actionTypeName)
            };
    }
    // TODO-VS: update types
    getShape(options) {
        const ProcessActionClass = this.getClass();
        const classConfig = super.getClassConfig(options);
        return new ProcessActionClass(classConfig);
    }
    setCommonDataDictionaryBranch(guid, dataDictionaryBranch) {
        this.rxProcessDataDictionaryService.setCommonActivitiesDataDictionaryBranch(guid, dataDictionaryBranch);
    }
    // TODO-VS: update types
    validate(model, availableCells) {
        return super.validateServerAction(model, availableCells).pipe(map((serverActionValidationIssues) => {
            const validationIssues = [...serverActionValidationIssues];
            const inboundLinks = availableCells.filter((cell) => cell.prop('targetNode') === model.guid);
            const outboundLinks = availableCells.filter((cell) => cell.prop('sourceNode') === model.guid);
            if (isEmpty(inboundLinks)) {
                validationIssues.push({
                    type: ValidationIssueType.Warning,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.is-required.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.inbound-sequence-flow.label')
                    }),
                    data: {
                        guid: model.guid,
                        inspectorTabIndex: 1
                    }
                });
            }
            if (outboundLinks.length !== 1) {
                validationIssues.push({
                    type: ValidationIssueType.Warning,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.is-required.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.outbound-sequence-flow.label')
                    }),
                    data: {
                        guid: model.guid,
                        inspectorTabIndex: 1
                    }
                });
            }
            return validationIssues;
        }));
    }
    // OVERRIDES
    buildDataDictionaryBranch(model) {
        const outputParams = super.getActionTypeByName(model.actionTypeName).outputParams;
        return isEmpty(outputParams)
            ? of(null)
            : this.buildOutputDataDictionaryBranch(model, outputParams).pipe(map((outputDataDictionaryBranch) => {
                const isArrayOrListDataType = this.rxActionTypeUtilsService.isActionParameterArrayOrList(outputParams[0]);
                if (isArray(outputDataDictionaryBranch)) {
                    let children = outputDataDictionaryBranch;
                    if (isEmpty(outputDataDictionaryBranch)) {
                        children = this.buildDefaultOutputDataDictionaryBranch(outputParams[0].dataTypeDetail);
                    }
                    return {
                        label: model.label,
                        icon: 'd-icon-arrow_chart',
                        children: [
                            {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.output.label'),
                                icon: 'd-icon-arrow_chart',
                                expression: '${activityResults.' + model.guid + '.output' + (isArrayOrListDataType ? '[0]}' : '}'),
                                children: this.updateOutputDataDictionaryBranch(children, model.guid, isArrayOrListDataType)
                            }
                        ]
                    };
                }
                else {
                    return null;
                }
            }));
    }
    buildOutputDataDictionaryBranch(model, outputParams) {
        return of([]);
    }
    getClass() {
        return joint.shapes.rx.ProcessAction;
    }
    getDefinitionInputMapParam(inputParamName, inputParamValue) {
        return {
            assignTarget: inputParamName,
            expression: inputParamValue
        };
    }
    getElementType(actionTypeName) {
        return RX_PROCESS_DEFINITION.processElementTypes.processAction;
    }
    getExpressionConfiguratorClass() {
        return RxProcessActionExpressionConfigurator;
    }
    getInputMapInspectorWidgetConfig(model) {
        const actionType = this.getActionTypeByName(model.actionTypeName);
        return {
            component: RxExpressionInputMapInspectorWidgetComponent,
            options: {
                expressionConfigurator: this.getExpressionConfigurator(),
                expressionInputMapInspectorOptions: actionType.inputParams.map((inputParam) => ({
                    name: inputParam.name,
                    label: inputParam.displayName || this.rxStringService.prettify(inputParam.name)
                }))
            }
        };
    }
    getInputMapFromDefinition(definition) {
        const actionType = super.getActionTypeByName(definition.actionTypeName);
        const initialInputMap = actionType
            ? transform(actionType.inputParams, (inputMap, inputParam) => (inputMap[inputParam.name] = ''), {})
            : {};
        return transform((definition === null || definition === void 0 ? void 0 : definition.inputMap) || [], (inputMap, inputMapField) => (inputMap[inputMapField.assignTarget] = inputMapField.expression), initialInputMap);
    }
    // HELPERS
    buildDefaultOutputDataDictionaryBranch(outputParams, outputPropertyPathOpener) {
        return isEmpty(outputParams)
            ? null
            : outputParams.map((outputParam) => {
                const isArrayOrListDataType = this.rxActionTypeUtilsService.isActionParameterArrayOrList(outputParam);
                const outputPropertyPath = (outputPropertyPathOpener ? outputPropertyPathOpener + '.' + outputParam.name : outputParam.name) +
                    (isArrayOrListDataType ? '[0]' : '');
                return {
                    label: this.rxStringService.prettify(outputParam.name),
                    outputPropertyPath: outputPropertyPath,
                    children: this.buildDefaultOutputDataDictionaryBranch(outputParam.dataTypeDetail, outputPropertyPath)
                };
            });
    }
    getInputMapFromModel(model) {
        return reduce(model.inputMap, (inputMap, propertyValue, propertyName) => {
            let inputMapParam;
            if (!isEmpty(propertyValue)) {
                inputMapParam = this.getDefinitionInputMapParam(propertyName, propertyValue);
                if (inputMapParam) {
                    inputMap.push(inputMapParam);
                }
            }
            return inputMap;
        }, []);
    }
    getOutputDataDictionaryExpression(flowElementGuid, isArrayOrListDataType, outputPropertyPath) {
        return ('${activityResults.' +
            flowElementGuid +
            '.output' +
            (isArrayOrListDataType ? '[0].' : '.') +
            outputPropertyPath +
            '}');
    }
    getRunAsUserFromDefinition(definition) {
        let runAsUser;
        switch (definition.runAsUser) {
            case true: {
                runAsUser = RX_PROCESS_DEFINITION.runAsUser.currentUser.modelValue;
                break;
            }
            case false: {
                runAsUser = RX_PROCESS_DEFINITION.runAsUser.administrator.modelValue;
                break;
            }
            default: {
                runAsUser = RX_PROCESS_DEFINITION.runAsUser.inheritFromProcess.modelValue;
                break;
            }
        }
        return runAsUser;
    }
    updateOutputDataDictionaryBranch(children, flowElementGuid, isArrayOrListDataType) {
        return isEmpty(children)
            ? null
            : children.map((child) => {
                let expression = child.expression;
                if (child.outputPropertyPath) {
                    if (isArray(child.outputPropertyPath)) {
                        expression = child.outputPropertyPath.map((outputPropertyPath) => this.getOutputDataDictionaryExpression(flowElementGuid, isArrayOrListDataType, outputPropertyPath));
                    }
                    else {
                        expression = this.getOutputDataDictionaryExpression(flowElementGuid, isArrayOrListDataType, child.outputPropertyPath);
                    }
                }
                return {
                    label: child.label,
                    icon: expression ? 'd-icon-arrow_chart' : null,
                    expression,
                    children: this.updateOutputDataDictionaryBranch(child.children, flowElementGuid, isArrayOrListDataType)
                };
            });
    }
}
RxProcessActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessActionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=process-action.service.js.map