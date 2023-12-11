import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { cloneDeep } from 'lodash';
import { map, withLatestFrom } from 'rxjs/operators';
import { BaseRecordEditorFieldDesign } from '../../base-record-editor-field/design';
export class RichTextareaFieldDesignModel extends BaseRecordEditorFieldDesign {
    constructor() {
        super(...arguments);
        this.fieldResourceTypes = [RX_RECORD_DEFINITION.resourceTypes.character];
    }
    getInspectorConfig() {
        return super.getInspectorConfig().pipe(withLatestFrom(this.availableFieldDefinitions$), map(([inspectorConfig, recordFieldsSelectItems]) => {
            const availableFields = recordFieldsSelectItems
                .filter((field) => !field.maxLength)
                .map((field) => ({
                id: String(field.id),
                name: field.name
            }));
            const newInspectorConfig = cloneDeep(inspectorConfig);
            newInspectorConfig.inspectorSectionConfigs[0].controls[0].options.options = [...availableFields];
            return newInspectorConfig;
        }));
    }
}
//# sourceMappingURL=rich-textarea-field-design.model.js.map