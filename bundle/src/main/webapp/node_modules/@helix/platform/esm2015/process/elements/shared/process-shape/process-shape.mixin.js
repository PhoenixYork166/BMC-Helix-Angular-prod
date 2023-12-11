import { chain, escape, isEmpty, omit, truncate } from 'lodash';
import { RxIdService } from '@helix/platform/utils';
import { RxCommandManagerService, RxRootInjector } from '@helix/platform/shared/api';
export function RxProcessShapeMixin(Base) {
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
//# sourceMappingURL=process-shape.mixin.js.map