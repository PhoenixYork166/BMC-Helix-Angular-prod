import * as i0 from '@angular/core';
import { Injectable, NgModule, ElementRef, Component, ViewChild } from '@angular/core';
import * as i3 from '@ngx-translate/core';
import * as i1$2 from '@helix/platform/shared/api';
import { RxRootInjector, RxCommandManagerService, RX_DESIGNER, Tooltip, RxServerActionExpressionConfigurator, RxServerActionService, RxActionTypeUtilsService, RxServerActionMixin, RxServerActionViewMixin, RX_DESIGNER_ELEMENT_SHAPE, RxOverlayModule } from '@helix/platform/shared/api';
import * as i1$1 from '@helix/platform/process/api';
import { RX_PROCESS_DEFINITION, RxProcessDataDictionaryService, RxProcessElementRegistryService, RxProcessDefinitionCacheService, RxProcessElementSearchService } from '@helix/platform/process/api';
import { of, ReplaySubject } from 'rxjs';
import { isEmpty, some, chain, omit, truncate, escape, isFunction, filter, min, map, max, isEqual, isArray, transform, reduce, startsWith, size, reject, isUndefined, sortBy, forEach, cloneDeep, defaults, extend, result, assign, compact, includes, find, debounce } from 'lodash';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import * as i1 from '@helix/platform/utils';
import { RxIdService, RX_GUID } from '@helix/platform/utils';
import * as i2 from '@helix/platform/shared/components';
import { TextFormControlComponent, TextareaFormControlComponent, RxRevertCustomizationComponent, CustomizationOptionsComponent, SwitchFormControlComponent, SelectFormControlComponent, RxPermissionEditorComponent, InspectorWidgetBase, LabelFormControlComponent, AssignmentExpressionListFormControlComponent, AssignmentExpressionListTargetFieldType, ExpressionFormControlModule, RxFormBuilderModule, RxInspectorModule } from '@helix/platform/shared/components';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { pluck, takeUntil, take, map as map$1 } from 'rxjs/operators';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as Backbone from 'backbone';

class RxEndEventService {
    constructor(rxStringService, translateService) {
        this.rxStringService = rxStringService;
        this.translateService = translateService;
    }
    getDefinitionFromModel(model) {
        return {
            description: model.description,
            guid: model.guid,
            name: model.name,
            resourceType: model.resourceType
        };
    }
    // TODO-VS: add position and size inspector groups
    getInspectorConfig() {
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                controls: [
                    {
                        name: 'label',
                        component: TextFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.label.label')
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
                    }
                ]
            }
        ];
    }
    // TODO-VS: update logic and types
    getModelFromDefinition(definition) {
        let elementModel = {
            description: '',
            guid: null,
            label: '',
            name: RX_PROCESS_DEFINITION.processElementDisplayNames.endEvent,
            resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.endEvent,
            type: RX_PROCESS_DEFINITION.processElementTypes.endEvent
        };
        if (definition) {
            elementModel = Object.assign(Object.assign({}, elementModel), { description: definition.description, guid: definition.guid, label: definition.name, name: definition.name, resourceType: definition.resourceType });
        }
        return elementModel;
    }
    getShape(options) {
        return new joint.shapes.rx.EndEvent({
            elementModel: this.getModelFromDefinition(),
            position: options.position
        });
    }
    setCommonDataDictionaryBranch(guid, dataDictionaryBranch) { }
    validate(model, availableCells) {
        const validationIssues = [];
        const inboundLinks = availableCells.filter((cell) => cell.prop('targetNode') === model.guid);
        if (inboundLinks.length < 1) {
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
        const outboundLinks = availableCells.filter((cell) => cell.prop('sourceNode') === model.guid);
        if (!isEmpty(outboundLinks)) {
            validationIssues.push({
                type: ValidationIssueType.Warning,
                description: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.end-event.validation.outbound-sequence-flow.message'),
                data: {
                    guid: model.guid,
                    inspectorTabIndex: 1
                }
            });
        }
        if (this.rxStringService.isEmptySafe(model.label)) {
            if (some(availableCells, (cell) => cell.prop('label') === model.label)) {
                validationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.must-be-unique.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.label.label')
                    }),
                    data: {
                        guid: model.guid,
                        inspectorTabIndex: 1,
                        propertyName: 'label'
                    }
                });
            }
        }
        return of(validationIssues);
    }
}
RxEndEventService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEndEventService, deps: [{ token: i1.RxStringService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxEndEventService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEndEventService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEndEventService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxStringService }, { type: i3.TranslateService }]; } });

function RxProcessShapeMixin(Base) {
    return class RxProcessShape extends Base {
        constructor() {
            super(...arguments);
            this.labelPath = 'content';
        }
        initialize(config) {
            // @ts-ignore
            super.initialize(config);
            // @ts-ignore
            this.on('change:size', this.onSizeChange);
            // @ts-ignore
            this.on('change:position', this.onPositionChange);
            // @ts-ignore
            this.on('change:id', this.onIdChange);
            // @ts-ignore
            this.on('change:elementModel', this.onElementModelChange);
            // @ts-ignore
            this.prop('elementModel/guid', RxRootInjector.injector.get(RxIdService).get(this.get('id')));
            // @ts-ignore
            const labelPath = this.get('labelPath') || 'content';
            // @ts-ignore
            this.prop('elementModel/label', this.prop(labelPath));
        }
        getCommandManager() {
            return RxRootInjector.injector.get(RxCommandManagerService).get();
        }
        canBeEmbedded(parentView, paper) {
            const hasNeighbors = !isEmpty(paper.model.getNeighbors(this));
            // @ts-ignore
            const hasBoundaryElementsWithNeighbors = chain(this.getEmbeddedCells())
                .filter({ isBoundaryEvent: true })
                .some((embeddedCell) => !isEmpty(paper.model.getNeighbors(embeddedCell)));
            return !hasNeighbors && !hasBoundaryElementsWithNeighbors;
        }
        canEmbedElement(childView, paper) {
            return false;
        }
        getLabel() {
            // @ts-ignore
            return this.prop('elementModel/label');
        }
        getLayout() {
            // @ts-ignore
            return omit(this.toJSON(), [
                'elementModel',
                'embeds',
                'layout',
                'parentProcessDefinition',
                'ownerProcessDefinitionName',
                'localizableProperties',
                'inputMapFields'
            ]);
        }
        getParentId() {
            // @ts-ignore
            return this.get('parent');
        }
        onActivityTypeChange(element, type) {
            switch (type) {
                case 'task':
                    element.attr({
                        '.inner': {
                            visibility: 'hidden'
                        },
                        '.outer': {
                            'stroke-width': 2,
                            'stroke-dasharray': 'none'
                        },
                        path: {
                            ref: '.outer'
                        },
                        image: {
                            ref: '.outer'
                        },
                        rect: {
                            rx: 4,
                            ry: 4
                        }
                    });
                    break;
                case 'event-sub-process':
                    element.attr({
                        '.inner': {
                            visibility: 'hidden'
                        },
                        '.outer': {
                            'stroke-width': 2,
                            'stroke-dasharray': '1,2'
                        },
                        path: {
                            ref: '.outer'
                        },
                        image: {
                            ref: '.outer'
                        },
                        rect: {
                            rx: 4,
                            ry: 4
                        }
                    });
                    break;
                case 'call-activity':
                    element.attr({
                        '.inner': {
                            visibility: 'hidden'
                        },
                        '.outer': {
                            'stroke-width': 4,
                            'stroke-dasharray': 'none'
                        },
                        path: {
                            ref: '.outer'
                        },
                        image: {
                            ref: '.outer'
                        },
                        rect: {
                            rx: 4,
                            ry: 4
                        }
                    });
                    break;
            }
        }
        updateContent() {
            // @ts-ignore
            const content = this.get('content');
            // @ts-ignore
            const label = this.id ? content : truncate(content, { length: 20 });
            const tooltip = label === content ? '' : content;
            if (joint.env.test('svgforeignobject')) {
                // Content element is a <div> element.
                // @ts-ignore
                this.attr({
                    '.content': {
                        // escape the label to patch XSS vulnerability (http://clientio.freshdesk.com/helpdesk/tickets/522)
                        html: escape(label),
                        title: tooltip
                    }
                });
            }
            else {
                // Content element is a <text> element.
                // SVG elements don't have innerHTML attribute.
                // @ts-ignore
                this.attr({
                    '.content': {
                        text: label,
                        title: tooltip
                    }
                });
            }
        }
        updateName() {
            // @ts-ignore
            this.prop('elementModel/name', this.getLabel() || this.get('defaultName'));
        }
        onIdChange(element, id) {
            const guid = element.prop('elementModel/guid');
            if (guid) {
                element.prop('lastId', RxRootInjector.injector.get(RxIdService).getBase(guid), { silent: true });
            }
            element.prop('elementModel/guid', RxRootInjector.injector.get(RxIdService).get(id), { silent: true });
        }
        onElementModelChange(element, elementModel, options) {
            if (options.propertyPath === 'elementModel/label') {
                // @ts-ignore
                const labelPath = this.get('labelPath') || 'content';
                if (labelPath) {
                    element.prop(labelPath, this.getLabel());
                }
            }
            this.updateName();
        }
        onPositionChange(element, position, options) {
            if (!options.translateBy && options.propertyValue) {
                // @ts-ignore
                const previousPosition = this.previous('position');
                const parentMovedBy = {
                    cx: previousPosition.x - position.x,
                    cy: previousPosition.y - position.y
                };
                // @ts-ignore
                this.getEmbeddedCells().forEach((embeddedCell) => {
                    if (embeddedCell._snapToParentBorder) {
                        embeddedCell._snapToParentBorder(this, parentMovedBy);
                    }
                });
            }
        }
        onSizeChange(element) {
            element.getEmbeddedCells().forEach((embeddedCell) => {
                if (embeddedCell.isBoundaryEvent && embeddedCell._snapToParentBorder) {
                    embeddedCell._snapToParentBorder(embeddedCell);
                }
            });
        }
    };
}

class RxEndEvent extends RxProcessShapeMixin(joint.shapes.bpmn.Event) {
    initialize(config) {
        // @ts-ignore
        super.initialize(config);
    }
    defaults() {
        return joint.util.deepSupplement({
            attrs: {
                '.label': {
                    fill: 'gray'
                }
            },
            defaultName: RX_PROCESS_DEFINITION.processElementDisplayNames.endEvent,
            eventType: 'end',
            icon: 'transparent',
            labelPath: 'attrs/.label/text',
            size: {
                width: 30,
                height: 30
            },
            type: RX_PROCESS_DEFINITION.processElementTypes.endEvent
        }, joint.shapes.bpmn.Event.prototype.defaults);
    }
}

function RxProcessShapeViewMixin(Base) {
    return class RxProcessShapeView extends Base {
        initialize(config) {
            // @ts-ignore
            super.initialize(config);
        }
        canInteract() {
            // @ts-ignore
            return isFunction(this.paper.options.interactive)
                ? // @ts-ignore
                    this.paper.options.interactive(this)
                : // @ts-ignore
                    this.paper.options.interactive;
        }
        prepareEmbedding() {
            // @ts-ignore
            const hasNeighbors = !isEmpty(this.paper.model.getNeighbors(this.model));
            // @ts-ignore
            const hasBoundaryElementsWithNeighbors = chain(this.model.getEmbeddedCells())
                .filter({ isBoundaryEvent: true })
                .some(function (embeddedCell) {
                return !isEmpty(this.paper.model.getNeighbors(embeddedCell));
            });
            // @ts-ignore
            if (this.model.get('parent') && !hasNeighbors && !hasBoundaryElementsWithNeighbors) {
                joint.dia.ElementView.prototype.prepareEmbedding.apply(this, arguments);
            }
        }
        getEmbeddedBBox() {
            let result;
            // @ts-ignore
            const embeddedCellModels = filter(this.model.getEmbeddedCells(), (cellModel) => {
                return cellModel && cellModel.get('type') !== 'rx.SequenceFlow' && !cellModel.isBoundaryEvent;
            });
            if (embeddedCellModels.length) {
                const bboxes = chain(embeddedCellModels)
                    .map((cellModel) => {
                    // @ts-ignore
                    var view = this.paper.findViewByModel(cellModel);
                    // @ts-ignore
                    return new joint.V(view.el).bbox(false, this.paper.viewport);
                })
                    .value();
                const minX = min(map(bboxes, (bbox) => bbox.x));
                const minY = min(map(bboxes, (bbox) => bbox.y));
                const maxX = max(map(bboxes, (bbox) => bbox.x + bbox.width));
                const maxY = max(map(bboxes, (bbox) => bbox.y + bbox.height));
                result = joint.g.rect(minX, minY, maxX - minX, maxY - minY);
            }
            else {
                result = joint.g.rect(0, 0, 0, 0);
            }
            return result;
        }
    };
}

class RxEndEventView extends RxProcessShapeViewMixin(joint.dia.ElementView) {
    initialize(config) {
        // @ts-ignore
        super.initialize(config);
    }
    // TODO-VS: remove
    sgResize(opt) {
        // @ts-ignore
        const scalable = this.scalableNode;
        scalable.attr('transform', `scale(${0.5},${0.5})`);
        // @ts-ignore
        super.update();
        // // @ts-ignore
        // var model = this.model;
        // var angle = model.angle();
        // var size = model.size();
        // // @ts-ignore
        // var scalable = this.scalableNode;
        //
        // var recursive = false;
        // if (scalable.node.getElementsByTagName('path').length > 0) {
        //   // If scalable has at least one descendant that is a path, we need to switch to recursive bbox calculation.
        //   // If there are no path descendants, group bbox calculation works and so we can use the (faster) native function directly.
        //   recursive = true;
        // }
        //
        // var scalableBBox = scalable.getBBox({ recursive: recursive });
        //
        // var sx = size.width / (60 || 1);
        // var sy = size.height / (60 || 1);
        //
        // scalable.attr('transform', 'scale(' + sx + ',' + sy + ')');
        //
        // // @ts-ignore
        // super.update();
    }
}

class RxEndEventRegistrationModule {
    constructor(rxEndEventService, rxProcessElementRegistryService, translateService) {
        rxProcessElementRegistryService.register({
            displayName: translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.end-event.display-name.label'),
            elementService: rxEndEventService,
            group: RX_PROCESS_DEFINITION.standardProcessElementGroups.events.name,
            paletteItem: {
                border: RX_DESIGNER.paletteItemBorder.bold,
                label: RX_DESIGNER.paletteItemLabel.outer,
                shape: RX_DESIGNER.paletteItemShape.circle
            },
            resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.endEvent,
            shapeClass: RxEndEvent,
            shapeType: 'EndEvent',
            type: RX_PROCESS_DEFINITION.processElementTypes.endEvent,
            viewShapeClass: RxEndEventView,
            viewShapeType: 'EndEventView'
        });
    }
}
RxEndEventRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEndEventRegistrationModule, deps: [{ token: RxEndEventService }, { token: i1$1.RxProcessElementRegistryService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.NgModule });
RxEndEventRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEndEventRegistrationModule });
RxEndEventRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEndEventRegistrationModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEndEventRegistrationModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: RxEndEventService }, { type: i1$1.RxProcessElementRegistryService }, { type: i3.TranslateService }]; } });

class RxProcess extends joint.dia.Element {
    constructor(options) {
        super(options);
        this.markup = '<g></g>';
    }
    defaults() {
        return joint.util.defaultsDeep({
            position: { x: 0, y: 0 },
            size: { width: 1, height: 1 },
            type: 'rx.Process'
        }, super.defaults);
    }
}

class RxProcessService {
    constructor(rxDefinitionNameService, rxStringService, translateService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxStringService = rxStringService;
        this.translateService = translateService;
    }
    // TODO-VS: update when variable editor is implemented
    getDefinitionFromModel(definitionModel) {
        return {
            allowOverlay: definitionModel.customizationOptions.allowOverlay,
            contextKeyParam: definitionModel.contextKeyParam,
            description: definitionModel.description,
            guid: definitionModel.guid,
            inputParams: definitionModel.inputParams,
            isEnabled: definitionModel.isEnabled,
            localVariables: definitionModel.localVariables,
            name: this.rxDefinitionNameService.getDefinitionName(definitionModel.bundleId, definitionModel.name),
            outputParams: definitionModel.outputParams,
            overlayDescriptor: definitionModel.overlayDescriptor,
            overlayGroupId: definitionModel.overlayGroupId,
            permissions: definitionModel.permissions,
            runAsUser: RX_PROCESS_DEFINITION.runAsUser[definitionModel.runAsUser].definitionValue,
            scope: definitionModel.customizationOptions.scope
        };
    }
    getInspectorConfig(definitionModel) {
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
                        name: 'guid',
                        component: TextFormControlComponent,
                        isDisabled: true,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label')
                        }
                    },
                    {
                        name: 'owner',
                        component: TextFormControlComponent,
                        hidden: !Boolean(definitionModel.owner),
                        isDisabled: true,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.owner.label')
                        }
                    },
                    {
                        name: 'lastUpdateTime',
                        component: TextFormControlComponent,
                        hidden: !Boolean(definitionModel.lastUpdateTime),
                        isDisabled: true,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-date.label')
                        }
                    },
                    {
                        name: 'lastChangedBy',
                        component: TextFormControlComponent,
                        hidden: !Boolean(definitionModel.lastChangedBy),
                        isDisabled: true,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-by.label')
                        }
                    },
                    {
                        component: RxRevertCustomizationComponent,
                        options: {
                            overlayGroupId: definitionModel.overlayGroupId,
                            overlayDescriptor: definitionModel.overlayDescriptor
                        }
                    },
                    {
                        name: 'customizationOptions',
                        component: CustomizationOptionsComponent,
                        options: {
                            definitionTypeDisplayName: this.translateService
                                .instant('com.bmc.arsys.rx.client.process-definition.label')
                                .toLowerCase(),
                            allowOverlay: definitionModel.customizationOptions.allowOverlay,
                            scope: definitionModel.customizationOptions.scope,
                            overlayGroupId: definitionModel.overlayGroupId,
                            overlayDescriptor: definitionModel.overlayDescriptor
                        }
                    },
                    {
                        name: 'isEnabled',
                        component: SwitchFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.process-enabled.label')
                        }
                    },
                    {
                        name: 'runAsUser',
                        component: SelectFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.run-as.label'),
                            tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.run-as.tooltip')),
                            options: [
                                {
                                    name: this.translateService.instant('com.bmc.arsys.rx.client.common.administrator.label'),
                                    id: RX_PROCESS_DEFINITION.runAsUser.administrator.modelValue
                                },
                                {
                                    name: this.translateService.instant('com.bmc.arsys.rx.client.common.current-user.label'),
                                    id: RX_PROCESS_DEFINITION.runAsUser.currentUser.modelValue
                                }
                            ]
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.variables.label'),
                controls: [
                // TODO-VS: add variables editor
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                controls: [
                    {
                        name: 'permissions',
                        component: RxPermissionEditorComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                            type: 'process'
                        }
                    }
                ]
            }
        ];
    }
    // TODO-VS: update when variable editor is implemented
    getModelFromDefinition(definition, bundleId) {
        return {
            bundleId,
            contextKeyParam: definition.contextKeyParam,
            customizationOptions: {
                allowOverlay: definition.allowOverlay,
                scope: definition.scope
            },
            description: definition.description,
            guid: definition.guid,
            inputParams: definition.inputParams,
            isEnabled: definition.isEnabled,
            lastChangedBy: definition.lastChangedBy,
            lastUpdateTime: definition.lastUpdateTime,
            localVariables: definition.localVariables,
            name: Boolean(definition.lastUpdateTime)
                ? this.rxDefinitionNameService.getDisplayName(definition.name)
                : definition.name,
            outputParams: definition.outputParams,
            overlayDescriptor: null,
            overlayGroupId: definition.overlayGroupId,
            owner: definition.owner,
            permissions: definition.permissions,
            runAsUser: definition.runAsUser
                ? RX_PROCESS_DEFINITION.runAsUser.currentUser.modelValue
                : RX_PROCESS_DEFINITION.runAsUser.administrator.modelValue
        };
    }
    getShape(options) {
        return new RxProcess(options);
    }
    validate(definitionModel, availableCells) {
        const validationIssues = [];
        if (this.rxStringService.isEmptySafe(definitionModel.name)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
                }),
                data: {
                    propertyName: 'name',
                    inspectorTabIndex: 0
                }
            });
        }
        if (definitionModel.name && !RX_RECORD_DEFINITION.validDefinitionNameRegex.test(definitionModel.name)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
                }),
                data: {
                    propertyName: 'name',
                    inspectorTabIndex: 0
                }
            });
        }
        const startEvents = availableCells.filter((cell) => cell.prop('type') === RX_PROCESS_DEFINITION.processElementTypes.startEvent);
        if (startEvents.length != 1) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.validation.single-start-event.message'),
                data: {
                    inspectorTabIndex: 0
                }
            });
        }
        const endEvents = availableCells.filter((cell) => cell.prop('type') === RX_PROCESS_DEFINITION.processElementTypes.endEvent);
        if (isEmpty(endEvents)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.validation.no-end-event.label'),
                data: {
                    inspectorTabIndex: 0
                }
            });
        }
        return of(validationIssues);
    }
}
RxProcessService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessService, deps: [{ token: i1$2.RxDefinitionNameService }, { token: i1.RxStringService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.RxDefinitionNameService }, { type: i1.RxStringService }, { type: i3.TranslateService }]; } });

class RxExpressionInputMapInspectorWidgetComponent extends InspectorWidgetBase {
    constructor(renderer, rxDesignerCacheService, rxExpressionEditorService, rxIdService, injector) {
        super(injector);
        this.renderer = renderer;
        this.rxDesignerCacheService = rxDesignerCacheService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxIdService = rxIdService;
        this.injector = injector;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.elementModel$ = this.designerItemModel.pipe(pluck('elementModel'), takeUntil(this.destroyed$));
        this.graph$ = this.designerItemModel.pipe(pluck('graph'), takeUntil(this.destroyed$));
        this.patchConfig(this.options);
    }
    ngOnChanges(changes) {
        if (!isEqual(changes.options.currentValue, changes.options.previousValue)) {
            this.patchConfig(changes.options.currentValue);
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    openExpressionEditor(section, elementModel, inspectorElementRef) {
        this.graph$.pipe(take(1)).subscribe((graph) => {
            this.rxExpressionEditorService
                .openEditor({
                expressionConfigurator: this.options.expressionConfigurator,
                expressionPropertyNavigator: {
                    getProperties: this.getExpressionProperties.bind(this, elementModel, inspectorElementRef)
                },
                isReadOnly: false,
                property: {
                    path: `inputMap/${section.name}`,
                    value: elementModel.inputMap[section.name],
                    label: section.options.label
                }
            })
                .pipe(takeUntil(this.destroyed$))
                .subscribe((expression) => {
                const selectedElementCell = graph.getCell(this.rxIdService.getBase(elementModel.guid));
                selectedElementCell.prop(`elementModel/${expression.path}`, expression.value);
            });
        });
    }
    getExpressionProperties(elementModel, inspectorElementRef) {
        return of(elementModel.inputMap).pipe(map$1((modelProperties) => Array.from(this.renderer
            .selectRootElement(inspectorElementRef.nativeElement, true)
            .querySelectorAll('rx-expression-form-control')).map((element) => {
            const propertyPath = element.getAttribute('property-path');
            return {
                path: `inputMap/${propertyPath}`,
                value: modelProperties[propertyPath],
                label: element.getAttribute('property-label')
            };
        })));
    }
    patchConfig(options) {
        this.config = options.expressionInputMapInspectorOptions.map((expressionInputMapInspectorOption) => ({
            name: expressionInputMapInspectorOption.name,
            options: {
                label: expressionInputMapInspectorOption.label,
                dataDictionary$: options.expressionConfigurator.getDataDictionary(`inputMap/${expressionInputMapInspectorOption.name}`),
                operators: options.expressionConfigurator.getOperators(`inputMap/${expressionInputMapInspectorOption.name}`)
            }
        }));
    }
}
RxExpressionInputMapInspectorWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionInputMapInspectorWidgetComponent, deps: [{ token: i0.Renderer2 }, { token: i1$2.RxDesignerCacheService }, { token: i2.RxExpressionEditorService }, { token: i1.RxIdService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RxExpressionInputMapInspectorWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxExpressionInputMapInspectorWidgetComponent, selector: "rx-expression-input-map-inspector-widget", viewQueries: [{ propertyName: "expressionInputMapInspectorElementRef", first: true, predicate: ["expressionInputMapInspector"], descendants: true, read: ElementRef }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"elementModel$ | async as elementModel\" #expressionInputMapInspector>\n  <rx-expression-form-control\n    *ngFor=\"let section of config\"\n    [options]=\"section.options\"\n    [propertyPath]=\"section.name\"\n    [ngModel]=\"elementModel.inputMap[section.name]\"\n    (events)=\"openExpressionEditor(section, elementModel, expressionInputMapInspectorElementRef)\"\n  >\n  </rx-expression-form-control>\n</div>\n", styles: [":host ::ng-deep rx-expression-form-control:not(:last-child) button{margin-bottom:5px}\n"], components: [{ type: i2.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionInputMapInspectorWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-expression-input-map-inspector-widget',
                    templateUrl: './expression-input-map-inspector-widget.component.html',
                    styleUrls: ['./expression-input-map-inspector-widget.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1$2.RxDesignerCacheService }, { type: i2.RxExpressionEditorService }, { type: i1.RxIdService }, { type: i0.Injector }]; }, propDecorators: { expressionInputMapInspectorElementRef: [{
                type: ViewChild,
                args: ['expressionInputMapInspector', { read: ElementRef }]
            }] } });

class RxProcessActionExpressionConfigurator extends RxServerActionExpressionConfigurator {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.configureForProperty({
            propertyPath: /outputMap\/.*/,
            dataDictionary$: this.getOutputMapDataDictionary()
        });
    }
    getDataDictionaryService() {
        return this.injector.get(RxProcessDataDictionaryService);
    }
    getOutputMapDataDictionary() {
        return this.commonDataDictionary$;
    }
}

class RxProcessActionService extends RxServerActionService {
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
        return super.validateServerAction(model, availableCells).pipe(map$1((serverActionValidationIssues) => {
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
            : this.buildOutputDataDictionaryBranch(model, outputParams).pipe(map$1((outputDataDictionaryBranch) => {
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

class RxProcessAction extends RxServerActionMixin(RxProcessShapeMixin(joint.shapes.bpmn.Activity)) {
    defaults() {
        return joint.util.deepSupplement({
            attrs: {
                '.icon': {
                    width: 12,
                    height: 12,
                    'ref-x': 3,
                    'ref-y': 3
                },
                rect: {
                    rx: 4,
                    ry: 4
                }
            },
            icon: 'gear',
            size: {
                width: 90,
                height: 60
            },
            type: RX_PROCESS_DEFINITION.processElementTypes.processAction
        }, 
        // @ts-ignore
        super.defaults);
    }
    initialize(config) {
        // @ts-ignore
        super.initialize(config);
    }
    getElementService(type) {
        return RxRootInjector.injector.get(RxProcessElementRegistryService).get(type).elementService;
    }
}

class RxProcessActionView extends RxServerActionViewMixin(RxProcessShapeViewMixin(joint.shapes.bpmn.ActivityView)) {
    initialize(config) {
        // @ts-ignore
        super.initialize(config);
    }
}

class RxProcessActionRegistrationModule {
    constructor(rxProcessElementRegistryService, rxProcessActionService) {
        rxProcessElementRegistryService.register({
            elementService: rxProcessActionService,
            group: RX_PROCESS_DEFINITION.standardProcessElementGroups.platformActions.name,
            paletteItem: {
                border: RX_DESIGNER.paletteItemBorder.bold,
                icon: {
                    path: RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.gear,
                    position: RX_DESIGNER.paletteIconPosition.top
                },
                label: RX_DESIGNER.paletteItemLabel.outer,
                shape: RX_DESIGNER.paletteItemShape.rectangle
            },
            resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.processAction,
            shapeClass: RxProcessAction,
            shapeType: 'ProcessAction',
            type: RX_PROCESS_DEFINITION.processElementTypes.processAction,
            viewShapeClass: RxProcessActionView,
            viewShapeType: 'ProcessActionView'
        });
    }
}
RxProcessActionRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessActionRegistrationModule, deps: [{ token: i1$1.RxProcessElementRegistryService }, { token: RxProcessActionService }], target: i0.ɵɵFactoryTarget.NgModule });
RxProcessActionRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessActionRegistrationModule });
RxProcessActionRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessActionRegistrationModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessActionRegistrationModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1$1.RxProcessElementRegistryService }, { type: RxProcessActionService }]; } });

// TODO-VS: move to "@helix/platform/process/components"
class RxExpressionInputMapInspectorWidgetModule {
}
RxExpressionInputMapInspectorWidgetModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionInputMapInspectorWidgetModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxExpressionInputMapInspectorWidgetModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionInputMapInspectorWidgetModule, declarations: [RxExpressionInputMapInspectorWidgetComponent], imports: [CommonModule, ExpressionFormControlModule, FormsModule, RxFormBuilderModule, RxInspectorModule], exports: [RxExpressionInputMapInspectorWidgetComponent] });
RxExpressionInputMapInspectorWidgetModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionInputMapInspectorWidgetModule, imports: [[CommonModule, ExpressionFormControlModule, FormsModule, RxFormBuilderModule, RxInspectorModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionInputMapInspectorWidgetModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxExpressionInputMapInspectorWidgetComponent],
                    imports: [CommonModule, ExpressionFormControlModule, FormsModule, RxFormBuilderModule, RxInspectorModule],
                    exports: [RxExpressionInputMapInspectorWidgetComponent]
                }]
        }] });

class RxStartEventService {
    constructor(rxStringService, translateService) {
        this.rxStringService = rxStringService;
        this.translateService = translateService;
    }
    getDefinitionFromModel(model) {
        return {
            description: model.description,
            guid: model.guid,
            name: model.name,
            resourceType: model.resourceType
        };
    }
    // TODO-VS: add position and size inspector groups
    getInspectorConfig() {
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                controls: [
                    {
                        name: 'label',
                        component: TextFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.label.label')
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
                    }
                ]
            }
        ];
    }
    getModelFromDefinition(definition) {
        let elementModel = {
            description: '',
            guid: null,
            label: '',
            name: RX_PROCESS_DEFINITION.processElementDisplayNames.startEvent,
            resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.startEvent,
            type: RX_PROCESS_DEFINITION.processElementTypes.startEvent
        };
        if (definition) {
            elementModel = Object.assign(Object.assign({}, elementModel), { description: definition.description, guid: definition.guid, label: definition.name, name: definition.name, resourceType: definition.resourceType });
        }
        return elementModel;
    }
    getShape(options) {
        return new joint.shapes.rx.StartEvent({
            elementModel: this.getModelFromDefinition(),
            position: options.position
        });
    }
    setCommonDataDictionaryBranch(guid, dataDictionaryBranch) { }
    validate(model, availableCells) {
        const validationIssues = [];
        const inboundLinks = availableCells.filter((cell) => cell.prop('targetNode') === model.guid);
        if (!isEmpty(inboundLinks)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.start-event.validation.inbound-sequence-flow.message'),
                data: {
                    guid: model.guid,
                    inspectorTabIndex: 1
                }
            });
        }
        const outboundLinks = availableCells.filter((cell) => cell.prop('sourceNode') === model.guid);
        if (outboundLinks.length != 1) {
            validationIssues.push({
                type: ValidationIssueType.Warning,
                description: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.start-event.validation.single-outbound-sequence-flow.message'),
                data: {
                    guid: model.guid,
                    inspectorTabIndex: 1
                }
            });
        }
        if (this.rxStringService.isEmptySafe(model.label)) {
            if (some(availableCells, (cell) => cell.prop('label') === model.label)) {
                validationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.must-be-unique.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.label.label')
                    }),
                    data: {
                        guid: model.guid,
                        inspectorTabIndex: 1,
                        propertyName: 'label'
                    }
                });
            }
        }
        return of(validationIssues);
    }
}
RxStartEventService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStartEventService, deps: [{ token: i1.RxStringService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxStartEventService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStartEventService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStartEventService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxStringService }, { type: i3.TranslateService }]; } });

class RxStartEvent extends RxProcessShapeMixin(joint.shapes.bpmn.Event) {
    defaults() {
        return joint.util.deepSupplement({
            attrs: {
                '.label': {
                    fill: 'gray'
                }
            },
            defaultName: RX_PROCESS_DEFINITION.processElementDisplayNames.startEvent,
            eventType: 'start',
            icon: 'transparent',
            labelPath: 'attrs/.label/text',
            size: {
                width: 30,
                height: 30
            },
            type: RX_PROCESS_DEFINITION.processElementTypes.startEvent
        }, 
        // @ts-ignore
        super.defaults);
    }
    initialize(config) {
        // @ts-ignore
        super.initialize(config);
    }
}

class RxStartEventView extends RxProcessShapeViewMixin(joint.dia.ElementView) {
    initialize(config) {
        // @ts-ignore
        super.initialize(config);
    }
    // TODO-VS: remove
    sgResize(opt) {
        // @ts-ignore
        const scalable = this.scalableNode;
        scalable.attr('transform', `scale(${0.5},${0.5})`);
        // @ts-ignore
        super.update();
    }
}

class RxStartEventRegistrationModule {
    constructor(rxProcessElementRegistryService, rxStartEventService, translateService) {
        rxProcessElementRegistryService.register({
            displayName: translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.start-event.display-name.label'),
            elementService: rxStartEventService,
            group: RX_PROCESS_DEFINITION.standardProcessElementGroups.events.name,
            paletteItem: {
                border: RX_DESIGNER.paletteItemBorder.solid,
                label: RX_DESIGNER.paletteItemLabel.outer,
                shape: RX_DESIGNER.paletteItemShape.circle
            },
            resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.startEvent,
            shapeClass: RxStartEvent,
            shapeType: 'StartEvent',
            type: RX_PROCESS_DEFINITION.processElementTypes.startEvent,
            viewShapeClass: RxStartEventView,
            viewShapeType: 'StartEventView'
        });
    }
}
RxStartEventRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStartEventRegistrationModule, deps: [{ token: i1$1.RxProcessElementRegistryService }, { token: RxStartEventService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.NgModule });
RxStartEventRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStartEventRegistrationModule });
RxStartEventRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStartEventRegistrationModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStartEventRegistrationModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1$1.RxProcessElementRegistryService }, { type: RxStartEventService }, { type: i3.TranslateService }]; } });

class RxProcessElementService {
    constructor(rxIdService, rxJsonParserService, rxProcessElementSearchService) {
        this.rxIdService = rxIdService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxProcessElementSearchService = rxProcessElementSearchService;
    }
    // TODO-VS: remove in favour of getJsonObject
    getGraph(definition) {
        const graph = this.rxJsonParserService.tryParseJson(definition.layout, { cells: [] });
        graph.cells.forEach((cell) => {
            const embeddedElementIds = map(filter(graph.cells, { parent: cell.id }), 'id');
            if (startsWith(cell.type, 'rx.CallActivity')) {
                cell.type = 'rx.CallActivity';
            }
            if (startsWith(cell.type, 'rx.ProcessActions')) {
                cell.type = 'rx.ProcessAction';
            }
            if (embeddedElementIds.length) {
                cell.embeds = embeddedElementIds;
            }
            cell.processDefinitionName = definition.name;
            const flowElement = this.rxProcessElementSearchService.find(definition, {
                guid: this.rxIdService.get(cell.id)
            });
            if (flowElement === null || flowElement === void 0 ? void 0 : flowElement.multiInstanceLoopDefinition) {
                cell.multiInstanceLoopDefinition = flowElement.multiInstanceLoopDefinition;
            }
        });
        return graph;
    }
}
RxProcessElementService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementService, deps: [{ token: i1.RxIdService }, { token: i1.RxJsonParserService }, { token: i1$1.RxProcessElementSearchService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessElementService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxIdService }, { type: i1.RxJsonParserService }, { type: i1$1.RxProcessElementSearchService }]; } });

class RxProcessElementsModule {
}
RxProcessElementsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxProcessElementsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementsModule, imports: [CommonModule,
        RxEndEventRegistrationModule,
        RxExpressionInputMapInspectorWidgetModule,
        RxOverlayModule,
        RxProcessActionRegistrationModule,
        RxStartEventRegistrationModule] });
RxProcessElementsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementsModule, imports: [[
            CommonModule,
            RxEndEventRegistrationModule,
            RxExpressionInputMapInspectorWidgetModule,
            RxOverlayModule,
            RxProcessActionRegistrationModule,
            RxStartEventRegistrationModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RxEndEventRegistrationModule,
                        RxExpressionInputMapInspectorWidgetModule,
                        RxOverlayModule,
                        RxProcessActionRegistrationModule,
                        RxStartEventRegistrationModule
                    ]
                }]
        }] });

// https://github.com/clientIO/joint/issues/817
// When the size of shape is changed, JointJS resizes shape`s body via scaling.
// IE11 & MS-Edge do not support `vector-effect`, which results in changing stroke-width.
// `refHeight` & `refWidth` attributes allow resizing rectangular sub-elements relative to the referenced element without scaling.
joint.util.deepSupplement(joint.shapes.bpmn.Activity.prototype.defaults, {
    attrs: {
        '.body': {
            refWidth: 1,
            refHeight: 1
        }
    },
    // 1. Removed scalable group (<g class="scalable">) from the original template of Activity element
    // to resolve the issue of restoring the element size after undo/redo operations.
    // http://clientio.freshdesk.com/support/tickets/560
    // https://jira.bmc.com/browse/DRIST-8990
    // 2. Added multi instance icons
    markup: [
        '<g class="rotatable">',
        '<rect class="body outer"/>',
        '<rect class="body inner"/>',
        joint.env.test('svgforeignobject')
            ? '<foreignObject class="fobj"><body xmlns="http://www.w3.org/1999/xhtml"><div class="content"/></body></foreignObject>'
            : '<text class="content"/>',
        '<g class="rx-icon-container">',
        '<image class="icon-multi-instance-sequential"/>',
        '<image class="icon-multi-instance-parallel"/>',
        '<path class="sub-process"/>',
        '</g>',
        '<image class="icon"/>',
        '</g>'
    ].join('')
});
var rx;
(function (rx) {
    class BaseExpandableProcessShape extends joint.shapes.bpmn.Activity {
        initialize(options) {
            super.initialize(options);
            const embeddedCells = this.getEmbeddedCells();
            const embedsWithoutBoundaryEventLength = size(reject(embeddedCells, 'isBoundaryEvent'));
            let modelEmbeds;
            if (embedsWithoutBoundaryEventLength === embeddedCells.length) {
                modelEmbeds = this.get('embeds');
            }
            if (this.collection && this.get('expanded') && !embedsWithoutBoundaryEventLength && isUndefined(modelEmbeds)) {
                RxRootInjector.injector
                    .get(RxProcessDefinitionCacheService)
                    .getProcessDefinition(this.get('processDefinitionName'))
                    .subscribe((processDefinition) => {
                    const flowElement = RxRootInjector.injector
                        .get(RxProcessElementSearchService)
                        .findByGuid(processDefinition, `rx-${this.get('id')}`) || {};
                    this.expand(processDefinition, RxRootInjector.injector.get(RxProcessElementService).getGraph(flowElement));
                });
            }
        }
        expand(definition, graph) {
            graph.cells = sortBy(graph.cells, (cell) => cell.type === 'rx.SequenceFlow' || cell.type === 'rx.TextAnnotationAssociation');
            const cellModels = [];
            forEach(graph.cells, (cell) => {
                const CellModel = joint.util.getByPath(this.collection.cellNamespace, cell.type, '.');
                const cellModel = new CellModel(cell);
                if (cellModel.get('expanded')) {
                    const flowElement = RxRootInjector.injector
                        .get(RxProcessElementSearchService)
                        .findByGuid(definition, `rx-${cellModel.get('id')}`) || {};
                    cellModel.expand.call(this, definition, RxRootInjector.injector.get(RxProcessElementService).getGraph(flowElement));
                }
                cellModels.push(cellModel);
            });
            this.collection.add(cellModels);
            this.attr({
                '.sub-process': {
                    display: 'none',
                    visibility: 'hidden'
                }
            });
        }
    }
    rx.BaseExpandableProcessShape = BaseExpandableProcessShape;
    class BaseCallActivity extends BaseExpandableProcessShape {
        defaults() {
            return joint.util.deepSupplement({
                activityType: 'call-activity',
                expanded: false,
                subProcess: true,
                attrs: {
                    path: {
                        transform: 'scale(0.3, 0.3)',
                        'ref-dy': -15
                    },
                    rect: {
                        rx: 2,
                        ry: 2
                    }
                }
            }, joint.shapes.bpmn.Activity.prototype.defaults);
        }
    }
    rx.BaseCallActivity = BaseCallActivity;
    class BaseStaticMultiInstance extends joint.shapes.bpmn.Activity {
        static initMultiInstanceIcons(model) {
            const attrs = cloneDeep(model.get('attrs'));
            const iconAttr = {
                width: 10,
                height: 10,
                y: 1
            };
            attrs['.sub-process'] = {
                d: 'M 0 0 L 30 0 30 30 0 30 z M 15 4 L 15 26 M 4 15 L 26 15',
                stroke: '#000000',
                fill: 'transparent',
                transform: 'scale(0.3, 0.3) translate(0, 6)'
            };
            attrs['.sub-process'].display = model.prop('subProcess') ? '' : 'none';
            attrs['.icon-multi-instance-sequential'] = cloneDeep(iconAttr);
            attrs['.icon-multi-instance-parallel'] = cloneDeep(iconAttr);
            attrs['.icon-multi-instance-sequential']['xlink:href'] =
                RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.multiInstanceSequential;
            attrs['.icon-multi-instance-parallel']['xlink:href'] = RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.multiInstanceParallel;
            attrs['.rx-icon-container'] = {
                ref: '.body',
                'x-alignment': 'middle',
                'ref-x': 0.5,
                'ref-dy': -15
            };
            defaults(attrs['.icon'], attrs.image);
            delete attrs.image;
            delete attrs.path;
            model.unset('attrs', { silent: true });
            model.set('attrs', attrs);
        }
        static updateMultiInstanceIcons(model) {
            const loopType = model.prop('loopType');
            const attrs = cloneDeep(model.get('attrs'));
            attrs['.icon-multi-instance-sequential'].display = loopType === 'true' ? '' : 'none';
            attrs['.icon-multi-instance-parallel'].display = loopType === 'false' ? '' : 'none';
            if (model.prop('subProcess')) {
                attrs['.sub-process'].transform = loopType
                    ? 'scale(0.3, 0.3) translate(50, 6)'
                    : 'scale(0.3, 0.3) translate(0, 6)';
            }
            model.unset('attrs', { silent: true });
            model.set('attrs', attrs, { rxSilent: true });
        }
    }
    rx.BaseStaticMultiInstance = BaseStaticMultiInstance;
    class BaseMultiInstance extends joint.shapes.bpmn.Activity {
        initialize(options) {
            super.initialize(options);
            if (options.multiInstanceLoopDefinition) {
                this.prop('loopType', String(options.multiInstanceLoopDefinition.isSequential), { silent: true });
            }
            BaseStaticMultiInstance.initMultiInstanceIcons(this);
            BaseStaticMultiInstance.updateMultiInstanceIcons(this);
        }
    }
    rx.BaseMultiInstance = BaseMultiInstance;
    class CallActivity extends BaseCallActivity {
        initialize(options) {
            super.initialize(options);
            if (options.multiInstanceLoopDefinition) {
                this.prop('loopType', String(options.multiInstanceLoopDefinition.isSequential), { silent: true });
            }
            BaseStaticMultiInstance.initMultiInstanceIcons(this);
            BaseStaticMultiInstance.updateMultiInstanceIcons(this);
        }
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.CallActivity'
            }, BaseCallActivity.prototype.defaults());
        }
    }
    rx.CallActivity = CallActivity;
    class Connector extends BaseMultiInstance {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.Connector',
                icon: 'connector',
                attrs: {
                    '.icon': {
                        width: 12,
                        height: 12,
                        'ref-x': 3,
                        'ref-y': 3
                    },
                    rect: {
                        rx: 4,
                        ry: 4
                    }
                }
            }, joint.shapes.bpmn.Activity.prototype.defaults);
        }
    }
    rx.Connector = Connector;
    class EndEvent extends joint.shapes.bpmn.Event {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.EndEvent',
                eventType: 'end',
                attrs: {
                    '.label': {
                        fill: 'gray'
                    }
                }
            }, joint.shapes.bpmn.Event.prototype.defaults);
        }
    }
    rx.EndEvent = EndEvent;
    class ErrorBoundaryEvent extends joint.shapes.bpmn.Event {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.ErrorBoundaryEvent',
                eventType: 'intermediate',
                icon: 'errorBoundary',
                attrs: {
                    '.label': {
                        fill: 'gray'
                    }
                }
            }, joint.shapes.bpmn.Event.prototype.defaults);
        }
    }
    rx.ErrorBoundaryEvent = ErrorBoundaryEvent;
    class ErrorEndEvent extends joint.shapes.bpmn.Event {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.ErrorEndEvent',
                eventType: 'end',
                icon: 'errorEnd',
                attrs: {
                    '.label': {
                        fill: 'gray'
                    }
                }
            }, joint.shapes.bpmn.Event.prototype.defaults);
        }
    }
    rx.ErrorEndEvent = ErrorEndEvent;
    class ExclusiveGateway extends joint.shapes.bpmn.Gateway {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.ExclusiveGateway',
                icon: 'cross',
                attrs: {
                    '.label': {
                        fill: 'gray'
                    }
                }
            }, joint.shapes.bpmn.Gateway.prototype.defaults);
        }
    }
    rx.ExclusiveGateway = ExclusiveGateway;
    class ParallelGateway extends joint.shapes.bpmn.Gateway {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.ParallelGateway',
                icon: 'plus',
                attrs: {
                    '.label': {
                        fill: 'gray'
                    }
                }
            }, joint.shapes.bpmn.Gateway.prototype.defaults);
        }
    }
    rx.ParallelGateway = ParallelGateway;
    class ProcessAction extends joint.shapes.bpmn.Activity {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.ProcessAction',
                icon: 'gear',
                attrs: {
                    '.icon': {
                        width: 12,
                        height: 12,
                        'ref-x': 3,
                        'ref-y': 3
                    },
                    rect: {
                        rx: 4,
                        ry: 4
                    }
                },
                size: {
                    width: 70,
                    height: 60
                }
            }, joint.shapes.bpmn.Activity.prototype.defaults);
        }
    }
    rx.ProcessAction = ProcessAction;
    class ReceiveTask extends BaseMultiInstance {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.ReceiveTask',
                icon: 'message',
                attrs: {
                    '.icon': {
                        width: 12,
                        height: 12,
                        'ref-x': 3,
                        'ref-y': 3
                    },
                    rect: {
                        rx: 4,
                        ry: 4
                    }
                }
            }, joint.shapes.bpmn.Activity.prototype.defaults);
        }
    }
    rx.ReceiveTask = ReceiveTask;
    class SequenceFlow extends joint.shapes.bpmn.Flow {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.SequenceFlow',
                router: {
                    name: 'manhattan',
                    args: {
                        step: 5
                    }
                }
            }, joint.shapes.bpmn.Flow.prototype.defaults);
        }
    }
    rx.SequenceFlow = SequenceFlow;
    class StartEvent extends joint.shapes.bpmn.Event {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.StartEvent',
                eventType: 'start',
                attrs: {
                    '.label': {
                        fill: 'gray'
                    }
                }
            }, joint.shapes.bpmn.Event.prototype.defaults);
        }
    }
    rx.StartEvent = StartEvent;
    class SubProcess extends BaseExpandableProcessShape {
        initialize(options) {
            super.initialize(options);
            if (options.multiInstanceLoopDefinition) {
                this.prop('loopType', String(options.multiInstanceLoopDefinition.isSequential), { silent: true });
            }
            BaseStaticMultiInstance.initMultiInstanceIcons(this);
            BaseStaticMultiInstance.updateMultiInstanceIcons(this);
        }
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.SubProcess',
                activityType: 'event-sub-process',
                expanded: false,
                subProcess: true,
                attrs: {
                    rect: {
                        rx: 4,
                        ry: 4
                    }
                }
            }, joint.shapes.bpmn.Activity.prototype.defaults);
        }
    }
    rx.SubProcess = SubProcess;
    class TextAnnotation extends joint.shapes.bpmn.Annotation {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.TextAnnotation',
                attrs: {
                    rect: {
                        rx: 2,
                        ry: 2
                    }
                }
            }, joint.shapes.bpmn.Annotation.prototype.defaults);
        }
    }
    rx.TextAnnotation = TextAnnotation;
    class TextAnnotationAssociation extends joint.shapes.bpmn.Flow {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.TextAnnotationAssociation',
                flowType: 'association'
            }, joint.shapes.bpmn.Flow.prototype.defaults);
        }
    }
    rx.TextAnnotationAssociation = TextAnnotationAssociation;
    class TimerEvent extends joint.shapes.bpmn.Event {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.TimerEvent',
                eventType: 'intermediate',
                icon: 'clock',
                attrs: {
                    '.label': {
                        fill: 'gray'
                    }
                }
            }, joint.shapes.bpmn.Event.prototype.defaults);
        }
    }
    rx.TimerEvent = TimerEvent;
    class UserTask extends BaseMultiInstance {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.UserTask',
                icon: 'user',
                attrs: {
                    '.icon': {
                        width: 12,
                        height: 12,
                        'ref-x': 3,
                        'ref-y': 3
                    },
                    rect: {
                        rx: 4,
                        ry: 4
                    }
                }
            }, joint.shapes.bpmn.Activity.prototype.defaults);
        }
    }
    rx.UserTask = UserTask;
    class WebRequest extends joint.shapes.bpmn.Activity {
        defaults() {
            return joint.util.deepSupplement({
                type: 'rx.WebRequest',
                icon: 'webRequest',
                attrs: {
                    '.icon': {
                        width: 12,
                        height: 12,
                        'ref-x': 3,
                        'ref-y': 3
                    },
                    rect: {
                        rx: 4,
                        ry: 4
                    }
                }
            }, joint.shapes.bpmn.Activity.prototype.defaults);
        }
    }
    rx.WebRequest = WebRequest;
})(rx || (rx = {}));

var processShapes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get rx () { return rx; }
});

class RxDesignerCellHighlighter extends Backbone.View {
    constructor(cellView) {
        super();
        this.selectors = {
            bpmn: {
                'bpmn.Event': '.scalable circle.outer',
                'bpmn.Annotation': '.rotatable path.stroke',
                link: 'path.connection',
                'bpmn.Flow': 'path.connection',
                'bpmn.Gateway': '.scalable polygon.body',
                'bpmn.Activity': '.scalable rect.outer',
                'basic.Rect': '.scalable rect'
            },
            rx: {
                'rx.TextAnnotation': '.rotatable path.stroke',
                'rx.TextAnnotationAssociation': 'path.connection',
                'rx.SequenceFlow': 'path.connection',
                'rx.ParallelGateway': '.scalable polygon.body',
                'rx.ExclusiveGateway': '.scalable polygon.body',
                'rx.StartEvent': '.scalable circle.outer',
                'rx.EndEvent': '.scalable circle.outer',
                'rx.SubProcess': '.rotatable rect.outer',
                'rx.ReceiveTask': '.rotatable rect.outer',
                'rx.UserTask': '.rotatable rect.outer',
                'rx.Connector': '.rotatable rect.outer',
                'rx.TimerEvent': '.scalable circle.outer',
                'rx.WebRequest': '.rotatable rect.outer'
            }
        };
        this.cellView = cellView;
        this.listenTo(this.cellView.paper, 'scale translate', this.update);
        this.$el = this.cellView.$el;
    }
    init(options) {
        this.options = extend({}, result(this, 'options'), options || {});
        this.cellView.model.on('remove', this.eraseHighlightAndRemove);
        this.update();
    }
    update() {
        this.eraseHighlight();
        this.drawHighlight();
    }
    eraseHighlightAndRemove(evt) {
        this.eraseHighlight();
        Backbone.View.prototype.remove.apply(this, arguments);
    }
    eraseHighlight() {
        if (this.cellViewHighlighter) {
            this.cellViewHighlighter.remove();
        }
    }
    drawHighlight() {
        let selector;
        switch (true) {
            case this.cellView.model instanceof rx.ProcessAction:
            case this.cellView.model instanceof rx.BaseCallActivity:
                selector = '.rotatable rect.outer';
                break;
            default:
                selector =
                    this.selectors.rx[this.cellView.model.prop('type')] || this.selectors.bpmn[this.cellView.model.prop('type')];
        }
        const shape = this.cellView.$el.find(selector).first();
        const highlight = shape[0] ? V(shape[0]).clone() : undefined;
        if (highlight) {
            highlight.attr({
                stroke: this.options.color,
                'stroke-width': this.options.strokeWidth
            });
            if (highlight.node.tagName === 'circle') {
                highlight.attr({
                    r: this.options.circleRadius
                });
            }
            this.cellViewHighlighter = highlight;
            shape.closest('g').prepend(highlight.node);
        }
    }
}

class RxRappidPaperService {
    constructor(rxIdService, rxProcessElementService, rxProcessElementSearchService, rxTreeService) {
        this.rxIdService = rxIdService;
        this.rxProcessElementService = rxProcessElementService;
        this.rxProcessElementSearchService = rxProcessElementSearchService;
        this.rxTreeService = rxTreeService;
        this.green = '#89c341';
        this.gray = '#999999';
        this.red = '#f83200';
        assign(joint.shapes.bpmn.icons, RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons);
    }
    init(element, graph, shouldZoomToFit = false) {
        // : PaperScroller
        // Do not instantiate paper with width or height parameters equal to 0, (e.g element is hidden in the DOM),
        // otherwise it will cause RappidJS issue in the Firefox Browser. See DRIST-18107 for more details.
        const paper = new joint.dia.Paper({
            width: element.width || 1,
            height: element.height || 1,
            model: new joint.dia.Graph({}, {
                cellNamespace: processShapes
            }),
            cellViewNamespace: processShapes,
            interactive: false,
            // specifying a non-existent theme to prevent rappid from overriding our styles
            // due to 'default' theme being applied
            theme: 'rx'
        });
        const paperScroller = new joint.ui.PaperScroller({
            autoResizePaper: true,
            paper: paper,
            padding: {
                padding: 10
            }
        });
        element.appendChild(paperScroller.render().el);
        paperScroller.options.paper.on('blank:pointerdown', paperScroller.startPanning);
        this.resetScroll(paperScroller);
        if (graph) {
            paperScroller.options.paper.model.fromJSON(graph);
            if (shouldZoomToFit) {
                this.zoomToFit(paperScroller);
            }
        }
        return paperScroller;
    }
    setGraph(paperScroller, processDefinition, processInstance, shouldZoomToFit = false) {
        const graph = this.rxProcessElementService.getGraph(processDefinition);
        const paper = paperScroller.options.paper;
        paper.model.fromJSON(graph);
        if (shouldZoomToFit) {
            this.zoomToFit(paperScroller);
        }
        forEach(processInstance.activities, (activity) => {
            const activityId = this.rxIdService.getBase(activity.activityId);
            const cell = paper.findViewByModel(activityId);
            if (cell) {
                if (activity.activities.length && cell.model.get('expanded')) {
                    const subProcessActivities = this.rxTreeService.flattenTree(activity, 'activities');
                    const elements = paper.model.getElements();
                    const graphIds = map(elements, 'id');
                    const originalGraphIds = compact(map(elements, (element) => element.get('originalGuid')));
                    forEach(subProcessActivities, (subProcessActivity) => {
                        // we need to do this check in order to filter inner elements that are in process
                        // instance json but are not present in graph as their parent is not expanded
                        if (includes(graphIds, this.rxIdService.getBase(subProcessActivity.activityId))) {
                            this.highlightActivity(subProcessActivity, paper, processDefinition);
                        }
                        else if (originalGraphIds && includes(originalGraphIds, subProcessActivity.activityId)) {
                            this.highlightActivity(subProcessActivity, paper, processDefinition);
                        }
                    });
                    this.highlightActivity(activity, paper, processDefinition);
                }
                else {
                    this.highlightActivity(activity, paper, processDefinition);
                }
            }
        });
        if (processInstance.exceptionMessage) {
            // exceptionMessage will be like <activityName>(<acitivityGuid>) - [<errorMessage>]
            // RegExp - find guid from exceptionMessage
            const guidPattern = new RegExp('\\((' + RX_GUID.baseIdPattern + ')\\)', 'i');
            const activityId = guidPattern.exec(processInstance.exceptionMessage);
            if (activityId[0]) {
                const activityBaseId = this.rxIdService.getBase(activityId[1]);
                this.highlightCell(activityBaseId, paper, this.red, processDefinition);
            }
        }
        this.resetScroll(paperScroller);
    }
    highlight(cellView, color) {
        if (cellView instanceof joint.dia.CellView) {
            const cellHighlighter = new RxDesignerCellHighlighter(cellView);
            cellHighlighter.init({
                strokeWidth: 10,
                color: color
            });
        }
    }
    highlightActivity(activity, paper, plainProcessDefinition) {
        const activityId = this.rxIdService.getBase(activity.activityId);
        const color = activity.endTime ? this.gray : this.green;
        this.highlightCell(activityId, paper, color, plainProcessDefinition);
    }
    highlightCell(cellId, paper, color, plainProcessDefinition) {
        const elements = paper.model.getElements();
        let cell;
        let cellView;
        if (!includes(map(elements, 'id'), cellId)) {
            cell = find(elements, (element) => element.get('originalGuid') === this.rxIdService.get(cellId));
            cellId = cell ? cell.id : cellId;
        }
        cellView = paper.findViewByModel(cellId);
        if (cellView) {
            this.highlight(cellView, color);
        }
        else {
            this.highlightVisibleErroredCell(cellId, false, paper, plainProcessDefinition);
            // Used to highlight errored cell inside expanded sub-processes
            paper.model.on('change', debounce(() => {
                this.highlightVisibleErroredCell(cellId, true, paper, plainProcessDefinition);
            }, 100));
        }
    }
    highlightVisibleErroredCell(cellId, isFirstEntry, paper, plainProcessDefinition) {
        const owner = this.rxProcessElementSearchService.findOwner(plainProcessDefinition, this.rxIdService.get(cellId));
        let cellView;
        let erroredElement;
        if (isFirstEntry) {
            erroredElement = find(owner.flowElements, { guid: this.rxIdService.get(cellId) });
            cellView = paper.findViewByModel(this.rxIdService.getBase(erroredElement.guid));
        }
        if (!cellView) {
            cellView = paper.findViewByModel(this.rxIdService.getBase(owner.guid));
        }
        if (cellView) {
            this.highlight(cellView, this.red);
        }
        else {
            this.highlightVisibleErroredCell(owner.guid, false, paper, plainProcessDefinition);
        }
    }
    resetScroll(paperScroller) {
        paperScroller.el.scrollTop = 0;
        paperScroller.el.scrollLeft = 0;
    }
    zoomToFit(paperScroller) {
        setTimeout(() => {
            paperScroller.zoomToFit({
                padding: 10
            });
        });
    }
}
RxRappidPaperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRappidPaperService, deps: [{ token: i1.RxIdService }, { token: RxProcessElementService }, { token: i1$1.RxProcessElementSearchService }, { token: i1.RxTreeService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRappidPaperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRappidPaperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRappidPaperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxIdService }, { type: RxProcessElementService }, { type: i1$1.RxProcessElementSearchService }, { type: i1.RxTreeService }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { RxEndEventRegistrationModule, RxEndEventService, RxExpressionInputMapInspectorWidgetComponent, RxExpressionInputMapInspectorWidgetModule, RxProcessAction, RxProcessActionExpressionConfigurator, RxProcessActionRegistrationModule, RxProcessActionService, RxProcessActionView, RxProcessElementService, RxProcessElementsModule, RxProcessService, RxProcessShapeMixin, RxProcessShapeViewMixin, RxRappidPaperService, RxStartEventRegistrationModule, RxStartEventService, rx };
//# sourceMappingURL=helix-platform-process-elements.js.map
