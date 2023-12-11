import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { BaseRecordEditorFieldDesign } from '../../base-record-editor-field/design';
export class DateTimeFieldDesignModel extends BaseRecordEditorFieldDesign {
    constructor() {
        super(...arguments);
        this.fieldResourceTypes = [RX_RECORD_DEFINITION.resourceTypes.dateTime];
    }
}
//# sourceMappingURL=date-time-field-design.model.js.map