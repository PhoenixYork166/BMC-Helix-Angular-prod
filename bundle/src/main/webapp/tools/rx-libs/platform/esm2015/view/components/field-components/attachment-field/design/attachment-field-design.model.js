import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { map } from 'rxjs/operators';
import { BaseRecordEditorFieldDesign } from '../../base-record-editor-field/design/base-record-editor-field-design.class';
export class AttachmentFieldDesignModel extends BaseRecordEditorFieldDesign {
    constructor() {
        super(...arguments);
        this.fieldResourceTypes = [RX_RECORD_DEFINITION.resourceTypes.attachment];
    }
    static getInitialProperties(initialProperties) {
        const result = BaseRecordEditorFieldDesign.getInitialProperties(initialProperties);
        delete result.value;
        return result;
    }
    getInspectorConfig() {
        return super.getInspectorConfig().pipe(map((inspectorConfig) => {
            inspectorConfig.inspectorSectionConfigs[0].controls =
                inspectorConfig.inspectorSectionConfigs[0].controls.filter((field) => field.name !== 'value');
            return inspectorConfig;
        }));
    }
}
//# sourceMappingURL=attachment-field-design.model.js.map