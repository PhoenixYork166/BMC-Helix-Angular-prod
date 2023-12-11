import { RX_PROCESS_DEFINITION } from '@helix/platform/process/api';
import { RxProcessShapeMixin } from '../shared/process-shape/process-shape.mixin';
export class RxStartEvent extends RxProcessShapeMixin(joint.shapes.bpmn.Event) {
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
//# sourceMappingURL=start-event.class.js.map