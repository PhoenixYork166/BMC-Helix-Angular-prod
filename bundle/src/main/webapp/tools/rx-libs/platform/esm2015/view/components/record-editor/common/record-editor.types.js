import { RxViewComponentType } from '@helix/platform/view/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
export const RECORD_EDITOR = {
    type: RxViewComponentType.RecordEditor,
    fieldTypes: {
        [RX_RECORD_DEFINITION.resourceTypes.character]: RxViewComponentType.Character,
        [RX_RECORD_DEFINITION.resourceTypes.dateTime]: RxViewComponentType.DateTime,
        [RX_RECORD_DEFINITION.resourceTypes.selection]: RxViewComponentType.Selection,
        [RX_RECORD_DEFINITION.resourceTypes.timeOnly]: RxViewComponentType.Time,
        [RX_RECORD_DEFINITION.resourceTypes.dateOnly]: RxViewComponentType.Date,
        [RX_RECORD_DEFINITION.resourceTypes.boolean]: RxViewComponentType.Boolean,
        [RX_RECORD_DEFINITION.resourceTypes.attachment]: RxViewComponentType.Attachment,
        [RX_RECORD_DEFINITION.resourceTypes.integer]: RxViewComponentType.Integer,
        [RX_RECORD_DEFINITION.resourceTypes.real]: RxViewComponentType.Floating,
        [RX_RECORD_DEFINITION.resourceTypes.decimal]: RxViewComponentType.Decimal,
        [RX_RECORD_DEFINITION.resourceTypes.localizedCharacter]: RxViewComponentType.LocalizedCharacter
    }
};
export var RecordEditorMode;
(function (RecordEditorMode) {
    RecordEditorMode["Create"] = "CREATE";
    RecordEditorMode["Edit"] = "EDIT";
    RecordEditorMode["BulkEdit"] = "BULK EDIT";
    RecordEditorMode["Temporary"] = "TEMPORARY";
})(RecordEditorMode || (RecordEditorMode = {}));
export var RecordEditorState;
(function (RecordEditorState) {
    RecordEditorState["Read"] = "READ";
    RecordEditorState["Edit"] = "EDIT";
})(RecordEditorState || (RecordEditorState = {}));
//# sourceMappingURL=record-editor.types.js.map