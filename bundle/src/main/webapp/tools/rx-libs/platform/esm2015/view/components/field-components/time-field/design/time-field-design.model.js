import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { BaseRecordEditorFieldDesign } from '../../base-record-editor-field/design';
export class TimeFieldDesignModel extends BaseRecordEditorFieldDesign {
    constructor() {
        super(...arguments);
        this.fieldResourceTypes = [RX_RECORD_DEFINITION.resourceTypes.timeOnly];
    }
}
//# sourceMappingURL=time-field-design.model.js.map