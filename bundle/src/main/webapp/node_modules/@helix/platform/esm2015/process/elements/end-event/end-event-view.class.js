import { RxProcessShapeViewMixin } from '../shared/process-shape/process-shape-view.mixin';
export class RxEndEventView extends RxProcessShapeViewMixin(joint.dia.ElementView) {
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
//# sourceMappingURL=end-event-view.class.js.map