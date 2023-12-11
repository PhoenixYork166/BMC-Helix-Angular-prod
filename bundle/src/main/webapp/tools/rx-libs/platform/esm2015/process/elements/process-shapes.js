import { cloneDeep, defaults, forEach, isUndefined, reject, size, sortBy } from 'lodash';
import { RxProcessDefinitionCacheService, RxProcessElementSearchService } from '@helix/platform/process/api';
import { RX_DESIGNER_ELEMENT_SHAPE, RxRootInjector } from '@helix/platform/shared/api';
import { RxProcessElementService } from './process-element.service';
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
export var rx;
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
//# sourceMappingURL=process-shapes.js.map