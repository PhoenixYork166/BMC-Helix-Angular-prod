import { RxServerActionViewMixin } from '@helix/platform/shared/api';
import { RxProcessShapeViewMixin } from '../shared/process-shape/process-shape-view.mixin';
export class RxProcessActionView extends RxServerActionViewMixin(RxProcessShapeViewMixin(joint.shapes.bpmn.ActivityView)) {
    initialize(config) {
        // @ts-ignore
        super.initialize(config);
    }
}
//# sourceMappingURL=process-action-view.class.js.map