import * as i0 from '@angular/core';
import { Injectable, NgModule, Component } from '@angular/core';
import * as i3 from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import * as i1$1 from '@helix/platform/shared/api';
import { RX_DESIGNER, RX_DESIGNER_ELEMENT_SHAPE, RxRootInjector } from '@helix/platform/shared/api';
import * as i2 from '@helix/platform/process/api';
import { RX_PROCESS_DEFINITION } from '@helix/platform/process/api';
import { RxProcessAction, RxProcessActionService, RxExpressionInputMapInspectorWidgetComponent, RxProcessActionView, RxExpressionInputMapInspectorWidgetModule, RxProcessActionExpressionConfigurator } from '@helix/platform/process/elements';
import { ReplaySubject, of } from 'rxjs';
import { pluck, takeUntil, map, distinctUntilChanged, take, switchMap } from 'rxjs/operators';
import { reduce, isEqual, chain, isEmpty, assign } from 'lodash';
import * as i2$1 from '@helix/platform/utils';
import * as i3$1 from '@helix/platform/record/api';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i1 from '@helix/platform/shared/components';
import { InspectorWidgetBase, RxDefinitionPickerType, RxDefinitionPickerModule, ExpressionFormControlModule, RX_SELECT_EXPRESSION_DROPDOWN } from '@helix/platform/shared/components';
import { RxModalService, RX_MODAL } from '@helix/platform/ui-kit';

class RxCreateListProcessAction extends RxProcessAction {
    initialize(config) {
        // @ts-ignore
        super.initialize(config);
    }
}

class RxCreateListProcessActionService extends RxProcessActionService {
    constructor(rxProcessDefinitionService, injector) {
        super(injector);
        this.rxProcessDefinitionService = rxProcessDefinitionService;
        this.injector = injector;
    }
    getInputMapInspectorWidgetConfig() {
        return {
            component: RxExpressionInputMapInspectorWidgetComponent,
            options: {
                expressionConfigurator: this.getExpressionConfigurator(),
                expressionInputMapInspectorOptions: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.designer.server-actions.create-list.source-list.label'),
                        name: 'Source List'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.designer.server-actions.create-list.item-to-add.label'),
                        name: 'Item To Add'
                    }
                ]
            }
        };
    }
    getElementType(actionTypeName) {
        return this.rxProcessDefinitionService.getServerActionModelType(actionTypeName);
    }
    getClass() {
        return joint.shapes.rx.ProcessActions.createList;
    }
}
RxCreateListProcessActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreateListProcessActionService, deps: [{ token: i2.RxProcessDefinitionService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxCreateListProcessActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreateListProcessActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreateListProcessActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i2.RxProcessDefinitionService }, { type: i0.Injector }]; } });

class RxCreateListRegistrationModule {
    constructor(rxCreateListProcessActionService, rxProcessElementRegistryService, translateService) {
        rxProcessElementRegistryService.register({
            displayName: translateService.instant('com.bmc.arsys.rx.client.designer.server-actions.create-list.name.label'),
            elementService: rxCreateListProcessActionService,
            group: RX_PROCESS_DEFINITION.standardProcessElementGroups.platformActions.name,
            paletteItem: {
                border: RX_DESIGNER.paletteItemBorder.solid,
                icon: {
                    path: RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.gear,
                    position: RX_DESIGNER.paletteIconPosition.top
                },
                label: RX_DESIGNER.paletteItemLabel.inner,
                shape: RX_DESIGNER.paletteItemShape.rectangle
            },
            resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.processAction,
            shapeClass: RxCreateListProcessAction,
            shapeType: 'ProcessActions.createList',
            type: 'rx.ProcessActions.createList',
            viewShapeClass: RxProcessActionView,
            viewShapeType: 'ProcessActions.createListView'
        });
    }
}
RxCreateListRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreateListRegistrationModule, deps: [{ token: RxCreateListProcessActionService }, { token: i2.RxProcessElementRegistryService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.NgModule });
RxCreateListRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreateListRegistrationModule, imports: [RxExpressionInputMapInspectorWidgetModule] });
RxCreateListRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreateListRegistrationModule, imports: [[RxExpressionInputMapInspectorWidgetModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreateListRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RxExpressionInputMapInspectorWidgetModule]
                }]
        }], ctorParameters: function () { return [{ type: RxCreateListProcessActionService }, { type: i2.RxProcessElementRegistryService }, { type: i3.TranslateService }]; } });

const RX_RECORD_SERVER_ACTION = {
    dynamicRecordDefinitionNameRegex: /\${.*}/
};

function RxRecordServerActionServiceMixin(Base) {
    return class RxRecordServerActionService extends Base {
        constructor(...args) {
            super(...args);
        }
        getRecordDefinitionInputMapParam(inputParamName, inputParamValue) {
            if (inputParamName === 'recordDefinitionName') {
                if (inputParamValue.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                    return {
                        assignTarget: inputParamName,
                        expression: inputParamValue
                    };
                }
                else {
                    return {
                        assignTarget: inputParamName,
                        expression: '"' + inputParamValue + '"'
                    };
                }
            }
            else if (inputParamName === 'sampleRecordDefinitionName') {
                return {
                    assignTarget: inputParamName,
                    expression: '"' + inputParamValue + '"'
                };
            }
            else {
                return super.getDefinitionInputMapParam(inputParamName, inputParamValue);
            }
        }
        getRecordDefinitionNameFromInputMap(inputMap) {
            let recordDefinitionNameFromInputMap = null;
            if (inputMap.recordDefinitionName) {
                if (inputMap.recordDefinitionName.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                    if (inputMap.sampleRecordDefinitionName) {
                        recordDefinitionNameFromInputMap = inputMap.sampleRecordDefinitionName;
                    }
                }
                else {
                    recordDefinitionNameFromInputMap = inputMap.recordDefinitionName;
                }
            }
            return recordDefinitionNameFromInputMap;
        }
        // TODO-VS: update definition type to use "IServiceTaskDefinition | ICustomRuleAction"
        getRecordInputMapModel(definition) {
            return reduce((definition === null || definition === void 0 ? void 0 : definition.inputMap) || [], (inputMap, inputMapField) => {
                const assignTarget = inputMapField.assignTarget;
                if (assignTarget === 'recordDefinitionName') {
                    if (inputMapField.expression.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                        inputMap[assignTarget] = inputMapField.expression;
                    }
                    else {
                        inputMap[assignTarget] = inputMapField.expression.replace(/^"|"$/g, '');
                    }
                }
                else if (assignTarget === 'sampleRecordDefinitionName') {
                    inputMap[assignTarget] = inputMapField.expression.replace(/^"|"$/g, '');
                }
                else {
                    inputMap[assignTarget] = inputMapField.expression;
                }
                return inputMap;
            }, {
                recordDefinitionName: null,
                sampleRecordDefinitionName: null,
                recordID: null
            });
        }
    };
}

function RxGetRecordServerActionServiceMixin(Base) {
    return class RxGetRecordServerActionService extends Base {
        constructor(...args) {
            super(...args);
        }
        getDefinitionInputMapParam(inputParamName, inputParamValue) {
            return super.getRecordDefinitionInputMapParam(inputParamName, inputParamValue);
        }
        // TODO-VS: update definition type to use "IServiceTaskDefinition | ICustomRuleAction"
        getInputMapFromDefinition(definition) {
            return super.getRecordInputMapModel(definition);
        }
    };
}

class RxGetRecordInputMapInspectorWidgetComponent extends InspectorWidgetBase {
    constructor(rxExpressionEditorService, rxIdService, translateService, injector) {
        super(injector);
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxIdService = rxIdService;
        this.translateService = translateService;
        this.injector = injector;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.elementModel$ = this.designerItemModel.pipe(pluck('elementModel'), takeUntil(this.destroyed$));
        this.isDynamicRecordDefinitionName$ = this.elementModel$.pipe(map((elementModel) => elementModel === null || elementModel === void 0 ? void 0 : elementModel.inputMap.recordDefinitionName), distinctUntilChanged(), map((recordDefinitionName) => {
            return RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex.test(recordDefinitionName);
        }));
        this.graph$ = this.designerItemModel.pipe(pluck('graph'), takeUntil(this.destroyed$));
        this.patchOptions(this.options);
    }
    ngOnChanges(changes) {
        if (!isEqual(changes.options.currentValue, changes.options.previousValue)) {
            this.patchOptions(changes.options.currentValue);
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    onRecordDefinitionChange(recordDefinitionName, elementModel) {
        this.graph$.pipe(take(1)).subscribe((graph) => {
            const selectedElementCell = graph.getCell(this.rxIdService.getBase(elementModel.guid));
            selectedElementCell.prop(`elementModel/inputMap/recordDefinitionName`, recordDefinitionName);
        });
    }
    onSampleRecordDefinitionChange(sampleRecordDefinitionName, elementModel) {
        this.graph$.pipe(take(1)).subscribe((graph) => {
            const selectedElementCell = graph.getCell(this.rxIdService.getBase(elementModel.guid));
            selectedElementCell.prop(`elementModel/inputMap/sampleRecordDefinitionName`, sampleRecordDefinitionName);
        });
    }
    openExpressionEditor(elementModel) {
        this.graph$.pipe(take(1)).subscribe((graph) => {
            this.rxExpressionEditorService
                .openEditor({
                expressionConfigurator: this.options.expressionConfigurator,
                isReadOnly: false,
                legend: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field-name.label'),
                        icon: 'd-icon-arrow_right_square_input'
                    }
                ],
                property: {
                    path: 'inputMap/recordID',
                    value: elementModel.inputMap.recordID,
                    label: 'Record ID'
                }
            })
                .pipe(takeUntil(this.destroyed$))
                .subscribe((expression) => {
                const selectedElementCell = graph.getCell(this.rxIdService.getBase(elementModel.guid));
                selectedElementCell.prop(`elementModel/inputMap/recordID`, expression.value);
            });
        });
    }
    patchOptions(options) {
        this.recordDefinitionPickerOptions = {
            label: 'Record definition name',
            definitionType: RxDefinitionPickerType.Record,
            required: true
        };
        this.sampleRecordDefinitionPickerOptions = {
            label: 'Sample record definition name',
            definitionType: RxDefinitionPickerType.Record,
            required: true
        };
        this.recordIDExpressionOptions = {
            label: 'Record ID',
            dataDictionary$: options.expressionConfigurator.getDataDictionary('inputMap/recordID'),
            operators: options.expressionConfigurator.getOperators('inputMap/recordID'),
            isRequired: true
        };
    }
}
RxGetRecordInputMapInspectorWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordInputMapInspectorWidgetComponent, deps: [{ token: i1.RxExpressionEditorService }, { token: i2$1.RxIdService }, { token: i3.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RxGetRecordInputMapInspectorWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxGetRecordInputMapInspectorWidgetComponent, selector: "rx-get-record-input-map-inspector-widget", usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"elementModel$ | async as elementModel\">\n  <rx-definition-picker\n    name=\"recordDefinition\"\n    rx-id=\"record-definition\"\n    [options]=\"recordDefinitionPickerOptions\"\n    [ngModel]=\"elementModel.inputMap.recordDefinitionName\"\n    (ngModelChange)=\"onRecordDefinitionChange($event, elementModel)\"\n  >\n  </rx-definition-picker>\n\n  <rx-definition-picker\n    *ngIf=\"isDynamicRecordDefinitionName$ | async\"\n    name=\"sampleRecordDefinition\"\n    rx-id=\"sample-record-definition\"\n    [options]=\"sampleRecordDefinitionPickerOptions\"\n    [ngModel]=\"elementModel.inputMap.sampleRecordDefinitionName\"\n    (ngModelChange)=\"onSampleRecordDefinitionChange($event, elementModel)\"\n  >\n  </rx-definition-picker>\n\n  <rx-expression-form-control\n    rx-id=\"record-id\"\n    [options]=\"recordIDExpressionOptions\"\n    [propertyPath]=\"'inputMap/recordID'\"\n    [ngModel]=\"elementModel.inputMap.recordID\"\n    (events)=\"openExpressionEditor(elementModel)\"\n  >\n  </rx-expression-form-control>\n</div>\n", styles: [":host::ng-deep rx-definition-picker .dropdown{margin-bottom:15px}\n"], components: [{ type: i1.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i1.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordInputMapInspectorWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-get-record-input-map-inspector-widget',
                    templateUrl: './get-record-input-map-inspector-widget.component.html',
                    styleUrls: ['./get-record-input-map-inspector-widget.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxExpressionEditorService }, { type: i2$1.RxIdService }, { type: i3.TranslateService }, { type: i0.Injector }]; } });

class RxGetRecordInputMapInspectorWidgetModule {
}
RxGetRecordInputMapInspectorWidgetModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordInputMapInspectorWidgetModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxGetRecordInputMapInspectorWidgetModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordInputMapInspectorWidgetModule, declarations: [RxGetRecordInputMapInspectorWidgetComponent], imports: [CommonModule, RxDefinitionPickerModule, FormsModule, ExpressionFormControlModule], exports: [RxGetRecordInputMapInspectorWidgetComponent] });
RxGetRecordInputMapInspectorWidgetModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordInputMapInspectorWidgetModule, imports: [[CommonModule, RxDefinitionPickerModule, FormsModule, ExpressionFormControlModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordInputMapInspectorWidgetModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxGetRecordInputMapInspectorWidgetComponent],
                    imports: [CommonModule, RxDefinitionPickerModule, FormsModule, ExpressionFormControlModule],
                    exports: [RxGetRecordInputMapInspectorWidgetComponent]
                }]
        }] });

function RxRecordServerActionExpressionConfiguratorMixin(Base) {
    return class RxRecordServerActionExpressionConfigurator extends Base {
        constructor(...args) {
            super(...args);
        }
        validateInputMapExpression(propertyName, expression) {
            let isValid = true;
            if (propertyName === 'recordDefinitionName' &&
                expression &&
                !expression.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                isValid = false;
            }
            return of(isValid);
        }
    };
}

class RxGetRecordProcessActionExpressionConfiguratorClass extends RxRecordServerActionExpressionConfiguratorMixin(RxProcessActionExpressionConfigurator) {
    constructor(injector) {
        super(injector);
        this.injector = injector;
    }
}

class RxGetRecordProcessActionService extends RxGetRecordServerActionServiceMixin(RxRecordServerActionServiceMixin(RxProcessActionService)) {
    constructor(rxDefinitionNameService, rxProcessDefinitionService, rxRecordDefinitionCacheService, rxTreeService, injector) {
        super(injector);
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxProcessDefinitionService = rxProcessDefinitionService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxTreeService = rxTreeService;
        this.injector = injector;
    }
    buildOutputDataDictionaryBranch(model) {
        const recordDefinitionName = super.getRecordDefinitionNameFromInputMap(model.inputMap);
        return recordDefinitionName
            ? this.rxRecordDefinitionCacheService.getRecordAssociationTree(recordDefinitionName).pipe(switchMap((recordAssociationTrees) => {
                const recordDefinitionNames = chain(recordAssociationTrees)
                    .map('value')
                    .compact()
                    .map('recordDefinitionName')
                    .push(recordDefinitionName)
                    .value();
                return this.rxRecordDefinitionCacheService
                    .getRecordDefinitions(recordDefinitionNames)
                    .pipe(map((recordDefinitions) => this.getOutputChildrenBranch(recordDefinitionName, recordAssociationTrees, recordDefinitions)));
            }))
            : of(null);
    }
    getClass() {
        return joint.shapes.rx.ProcessActions.getRecord;
    }
    getElementType(actionTypeName) {
        return this.rxProcessDefinitionService.getServerActionModelType(actionTypeName);
    }
    getExpressionConfiguratorClass() {
        return RxGetRecordProcessActionExpressionConfiguratorClass;
    }
    getInputMapInspectorWidgetConfig() {
        return {
            component: RxGetRecordInputMapInspectorWidgetComponent,
            options: {
                expressionConfigurator: this.getExpressionConfigurator()
            }
        };
    }
    getAssociationsBranch(recordAssociationTree, recordDefinitions, prefix) {
        return isEmpty(recordAssociationTree)
            ? null
            : {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.associations.label'),
                children: recordAssociationTree.map((association) => {
                    let newPrefix = `_associations.${association.value.associationDefintionGuid}.${association.value.nodeSide}[0]`;
                    const recordDefinitionName = association.value.recordDefinitionName;
                    newPrefix = prefix ? `${prefix}.${newPrefix}` : newPrefix;
                    const associationNodeLabel = association.value.nodeName !== recordDefinitionName
                        ? `${this.rxDefinitionNameService.getDisplayName(recordDefinitionName)} (${this.rxDefinitionNameService.getDisplayName(association.value.nodeName)})`
                        : this.rxDefinitionNameService.getDisplayName(recordDefinitionName);
                    return {
                        label: associationNodeLabel,
                        outputPropertyPath: newPrefix,
                        children: this.getAssociationChildren(recordDefinitionName, association.children, recordDefinitions, newPrefix)
                    };
                })
            };
    }
    getAssociationChildren(recordDefinitionName, recordAssociationTree, recordDefinitions, prefix) {
        const associationsBranch = this.getAssociationsBranch(recordAssociationTree, recordDefinitions, prefix);
        const children = chain(recordDefinitions)
            .find({ name: recordDefinitionName })
            .get('fieldDefinitions')
            .map(function (fieldDefinition) {
            return {
                label: fieldDefinition.name,
                outputPropertyPath: `${prefix}.${fieldDefinition.id}`
            };
        })
            .value();
        if (!isEmpty(associationsBranch)) {
            children.push(associationsBranch);
        }
        return children;
    }
    getOutputChildrenBranch(recordDefinitionName, recordAssociationTree, recordDefinitions) {
        const associationsBranch = this.getAssociationsBranch(recordAssociationTree, recordDefinitions);
        const children = chain(recordDefinitions)
            .find({ name: recordDefinitionName })
            .get('fieldDefinitions')
            .map((fieldDefinition) => ({
            label: fieldDefinition.name,
            outputPropertyPath: [fieldDefinition.id, fieldDefinition.name]
        }))
            .value();
        if (!isEmpty(associationsBranch)) {
            children.push(associationsBranch);
        }
        return children;
    }
}
RxGetRecordProcessActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordProcessActionService, deps: [{ token: i1$1.RxDefinitionNameService }, { token: i2.RxProcessDefinitionService }, { token: i3$1.RxRecordDefinitionCacheService }, { token: i2$1.RxTreeService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxGetRecordProcessActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordProcessActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordProcessActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxDefinitionNameService }, { type: i2.RxProcessDefinitionService }, { type: i3$1.RxRecordDefinitionCacheService }, { type: i2$1.RxTreeService }, { type: i0.Injector }]; } });

function RxRecordServerActionMixin(Base) {
    return class RxRecordServerAction extends Base {
        initialize(config) {
            // @ts-ignore
            super.initialize(config);
            this.lastRecordDefinitionName = this.getRecordDefinitionName();
            this.lastSampleRecordDefinitionName = this.getSampleRecordDefinitionName();
            if (this.lastRecordDefinitionName) {
                if (this.lastRecordDefinitionName.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                    this.selectExpressionDropdownValue = RX_SELECT_EXPRESSION_DROPDOWN.dropDownOptionsValue.expression;
                }
                else {
                    this.selectExpressionDropdownValue = RX_SELECT_EXPRESSION_DROPDOWN.dropDownOptionsValue.select;
                }
            }
        }
        afterRecordDefinitionNameChange(recordDefinitionName) {
            this.lastRecordDefinitionName = recordDefinitionName;
            // @ts-ignore
            this.getCommandManager().storeBatchCommand();
        }
        afterSampleRecordDefinitionNameChange(sampleRecordDefinitionName) {
            this.lastSampleRecordDefinitionName = sampleRecordDefinitionName;
            // @ts-ignore
            this.getCommandManager().storeBatchCommand();
        }
        getRecordDefinitionName() {
            // @ts-ignore
            const recordDefinitionName = this.getInputMap().recordDefinitionName;
            return recordDefinitionName ? recordDefinitionName.replace(/^"|"$/g, '') : null;
        }
        getRecordDefinitionNameChangeConfirmationMessageKey() {
            return 'com.bmc.arsys.rx.client.process-designer.inspector.clear-input-output-maps-confirmation.message';
        }
        getSampleRecordDefinitionName() {
            // @ts-ignore
            const sampleRecordDefinitionName = this.getInputMap().sampleRecordDefinitionName;
            return sampleRecordDefinitionName ? sampleRecordDefinitionName.replace(/^"|"$/g, '') : null;
        }
        onInputMapChanged(element, inputMap, inputMapPropertyPath, inputMapPropertyValue, isCommandManagerOperation) {
            if (inputMapPropertyPath === 'recordDefinitionName') {
                if (isCommandManagerOperation) {
                    this.lastRecordDefinitionName = inputMapPropertyValue;
                }
                else if (inputMapPropertyValue !== this.lastRecordDefinitionName) {
                    // @ts-ignore
                    this.getCommandManager().initBatchCommand();
                    // @ts-ignore
                    if (this.lastRecordDefinitionName) {
                        RxRootInjector.injector
                            .get(RxModalService)
                            .confirm({
                            title: RxRootInjector.injector
                                .get(TranslateService)
                                .instant('com.bmc.arsys.rx.client.common.warning.label'),
                            modalStyle: RX_MODAL.modalStyles.warning,
                            message: RxRootInjector.injector
                                .get(TranslateService)
                                .instant(this.getRecordDefinitionNameChangeConfirmationMessageKey())
                        })
                            .then((context) => {
                            if (context) {
                                this.afterRecordDefinitionNameChange(inputMapPropertyValue);
                            }
                            else {
                                // @ts-ignore
                                this.getCommandManager().storeBatchCommand();
                                // @ts-ignore
                                this.getCommandManager().cancel();
                            }
                        })
                            .catch(() => {
                            // @ts-ignore
                            this.getCommandManager().storeBatchCommand();
                            // @ts-ignore
                            this.getCommandManager().cancel();
                        });
                    }
                    else {
                        this.afterRecordDefinitionNameChange(inputMapPropertyValue);
                    }
                }
                if (inputMapPropertyValue) {
                    if (inputMapPropertyValue.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                        this.selectExpressionDropdownValue = RX_SELECT_EXPRESSION_DROPDOWN.dropDownOptionsValue.expression;
                    }
                    else {
                        this.selectExpressionDropdownValue = RX_SELECT_EXPRESSION_DROPDOWN.dropDownOptionsValue.select;
                    }
                }
            }
            if (inputMapPropertyPath === 'sampleRecordDefinitionName') {
                if (isCommandManagerOperation) {
                    this.lastSampleRecordDefinitionName = inputMapPropertyValue;
                }
                else if (inputMapPropertyValue !== this.lastSampleRecordDefinitionName) {
                    // @ts-ignore
                    this.getCommandManager().initBatchCommand();
                    if (this.lastSampleRecordDefinitionName) {
                        RxRootInjector.injector
                            .get(RxModalService)
                            .confirm({
                            title: RxRootInjector.injector
                                .get(TranslateService)
                                .instant('com.bmc.arsys.rx.client.common.warning.label'),
                            modalStyle: RX_MODAL.modalStyles.warning,
                            message: RxRootInjector.injector
                                .get(TranslateService)
                                .instant(this.getRecordDefinitionNameChangeConfirmationMessageKey())
                        })
                            .then(() => {
                            this.afterSampleRecordDefinitionNameChange(inputMapPropertyValue);
                        })
                            .catch(() => {
                            // @ts-ignore
                            this.getCommandManager().storeBatchCommand();
                            // @ts-ignore
                            this.getCommandManager().cancel();
                        });
                    }
                    else {
                        this.afterSampleRecordDefinitionNameChange(inputMapPropertyValue);
                    }
                }
            }
        }
    };
}

function RxGetRecordServerActionMixin(Base) {
    return class RxGetRecordServerAction extends Base {
        initialize(config) {
            // @ts-ignore
            super.initialize(config);
        }
        afterRecordDefinitionNameChange(inputMapPropertyValue) {
            // @ts-ignore
            this.lastRecordDefinitionName = inputMapPropertyValue;
            // @ts-ignore
            this.clearOutputMap();
            // @ts-ignore
            this.setInputMap(
            // @ts-ignore
            assign(this.getInputMap(), {
                // @ts-ignore
                recordDefinitionName: this.lastRecordDefinitionName,
                sampleRecordDefinitionName: null,
                attachmentFieldID: ''
            }));
            // @ts-ignore
            this.getCommandManager().storeBatchCommand();
        }
        afterSampleRecordDefinitionNameChange(inputMapPropertyValue) {
            // @ts-ignore
            this.lastSampleRecordDefinitionName = inputMapPropertyValue;
            // @ts-ignore
            this.clearOutputMap();
            // @ts-ignore
            this.setInputMap(
            // @ts-ignore
            assign(this.getInputMap(), {
                // @ts-ignore
                recordDefinitionName: this.lastRecordDefinitionName,
                // @ts-ignore
                sampleRecordDefinitionName: this.lastSampleRecordDefinitionName
            }));
            // @ts-ignore
            this.getCommandManager().storeBatchCommand();
        }
        getRecordDefinitionNameChangeConfirmationMessageKey() {
            return 'com.bmc.arsys.rx.client.process-designer.inspector.clear-output-map-confirmation.message';
        }
    };
}

class RxGetRecordProcessAction extends RxGetRecordServerActionMixin(RxRecordServerActionMixin(RxProcessAction)) {
    initialize(config) {
        // @ts-ignore
        super.initialize(config);
    }
}

class RxGetRecordServerActionRegistrationModule {
    constructor(rxGetRecordProcessActionService, rxProcessElementRegistryService, translateService) {
        rxProcessElementRegistryService.register({
            displayName: translateService.instant('com.bmc.arsys.rx.client.designer.server-actions.get-record.name.label'),
            elementService: rxGetRecordProcessActionService,
            group: RX_PROCESS_DEFINITION.standardProcessElementGroups.platformActions.name,
            paletteItem: {
                border: RX_DESIGNER.paletteItemBorder.solid,
                icon: {
                    path: RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.gear,
                    position: RX_DESIGNER.paletteIconPosition.top
                },
                label: RX_DESIGNER.paletteItemLabel.inner,
                shape: RX_DESIGNER.paletteItemShape.rectangle
            },
            resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.processAction,
            shapeClass: RxGetRecordProcessAction,
            shapeType: 'ProcessActions.getRecord',
            type: 'rx.ProcessActions.getRecord',
            viewShapeClass: RxProcessActionView,
            viewShapeType: 'ProcessActions.getRecordView'
        });
    }
}
RxGetRecordServerActionRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordServerActionRegistrationModule, deps: [{ token: RxGetRecordProcessActionService }, { token: i2.RxProcessElementRegistryService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.NgModule });
RxGetRecordServerActionRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordServerActionRegistrationModule, imports: [RxGetRecordInputMapInspectorWidgetModule] });
RxGetRecordServerActionRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordServerActionRegistrationModule, imports: [[RxGetRecordInputMapInspectorWidgetModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordServerActionRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RxGetRecordInputMapInspectorWidgetModule]
                }]
        }], ctorParameters: function () { return [{ type: RxGetRecordProcessActionService }, { type: i2.RxProcessElementRegistryService }, { type: i3.TranslateService }]; } });

class RxRecordServerActionModule {
}
RxRecordServerActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordServerActionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxRecordServerActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordServerActionModule, imports: [RxGetRecordServerActionRegistrationModule] });
RxRecordServerActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordServerActionModule, imports: [[RxGetRecordServerActionRegistrationModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordServerActionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RxGetRecordServerActionRegistrationModule]
                }]
        }] });

class RxServerActionsModule {
}
RxServerActionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerActionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxServerActionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerActionsModule, imports: [RxCreateListRegistrationModule, RxRecordServerActionModule] });
RxServerActionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerActionsModule, imports: [[RxCreateListRegistrationModule, RxRecordServerActionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerActionsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RxCreateListRegistrationModule, RxRecordServerActionModule]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { RX_RECORD_SERVER_ACTION, RxCreateListProcessAction, RxCreateListProcessActionService, RxRecordServerActionExpressionConfiguratorMixin, RxRecordServerActionMixin, RxRecordServerActionModule, RxRecordServerActionServiceMixin, RxServerActionsModule };
//# sourceMappingURL=helix-platform-process-server-actions.js.map
