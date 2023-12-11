import { chain, filter, isEmpty, isFunction, map, max, min } from 'lodash';
export function RxProcessShapeViewMixin(Base) {
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
//# sourceMappingURL=process-shape-view.mixin.js.map