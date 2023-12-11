import { RxRootInjector, RxServerActionMixin } from '@helix/platform/shared/api';
import { RX_PROCESS_DEFINITION, RxProcessElementRegistryService } from '@helix/platform/process/api';
import { RxProcessShapeMixin } from '../shared/process-shape/process-shape.mixin';
export class RxProcessAction extends RxServerActionMixin(RxProcessShapeMixin(joint.shapes.bpmn.Activity)) {
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
//# sourceMappingURL=process-action.class.js.map