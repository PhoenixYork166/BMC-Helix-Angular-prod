import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { BaseRecordEditorFieldDesign } from '../../base-record-editor-field/design';
export class DateFieldDesignModel extends BaseRecordEditorFieldDesign {
    constructor() {
        super(...arguments);
        this.fieldResourceTypes = [RX_RECORD_DEFINITION.resourceTypes.dateOnly];
    }
}
//# sourceMappingURL=date-field-design.model.js.map