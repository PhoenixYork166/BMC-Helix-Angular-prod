import { RX_PROCESS_DEFINITION } from '@helix/platform/process/api';
import { RxProcessShapeMixin } from '../shared/process-shape/process-shape.mixin';
export class RxEndEvent extends RxProcessShapeMixin(joint.shapes.bpmn.Event) {
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
//# sourceMappingURL=end-event.class.js.map