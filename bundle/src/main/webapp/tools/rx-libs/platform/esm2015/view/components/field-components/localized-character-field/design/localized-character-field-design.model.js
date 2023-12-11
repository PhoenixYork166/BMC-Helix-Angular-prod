import { BaseRecordEditorFieldDesign } from '../../base-record-editor-field/design';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
export class LocalizedCharacterFieldDesignModel extends BaseRecordEditorFieldDesign {
    constructor() {
        super(...arguments);
        this.fieldResourceTypes = [RX_RECORD_DEFINITION.resourceTypes.localizedCharacter];
    }
}
//# sourceMappingURL=localized-character-field-design.model.js.map