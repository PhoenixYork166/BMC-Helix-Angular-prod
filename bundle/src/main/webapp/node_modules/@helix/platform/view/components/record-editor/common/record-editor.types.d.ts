import { RxViewComponentType } from '@helix/platform/view/api';
export declare const RECORD_EDITOR: {
    type: RxViewComponentType;
    fieldTypes: {
        [x: string]: RxViewComponentType;
    };
};
export declare enum RecordEditorMode {
    Create = "CREATE",
    Edit = "EDIT",
    BulkEdit = "BULK EDIT",
    Temporary = "TEMPORARY"
}
export declare enum RecordEditorState {
    Read = "READ",
    Edit = "EDIT"
}
