import { RxProcessShapeViewMixin } from '../shared/process-shape/process-shape-view.mixin';
export class RxStartEventView extends RxProcessShapeViewMixin(joint.dia.ElementView) {
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
//# sourceMappingURL=start-event-view.class.js.map