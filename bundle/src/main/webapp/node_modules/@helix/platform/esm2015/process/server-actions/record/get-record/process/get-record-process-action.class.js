import { RxProcessAction } from '@helix/platform/process/elements';
import { RxRecordServerActionMixin } from '../../record-server-action.mixin';
import { RxGetRecordServerActionMixin } from '../get-record-server-action.mixin';
export class RxGetRecordProcessAction extends RxGetRecordServerActionMixin(RxRecordServerActionMixin(RxProcessAction)) {
    initialize(config) {
        // @ts-ignore
        super.initialize(config);
    }
}
//# sourceMappingURL=get-record-process-action.class.js.map